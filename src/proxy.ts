import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySessionJwt } from '@/lib/jwt'
import { logger } from '@/lib/logger'

// In-memory rate limiting since Edge middleware might not easily support Map across requests in the same way,
// but for a single instance / Vercel Edge function, we can use a simple map as a rudimentary approach.
// A better approach for Edge would be Upstash Redis.
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string, max: number, windowMs: number) {
  const now = Date.now();
  const info = rateLimitStore.get(ip);

  // cleanup
  if (rateLimitStore.size > 1000) {
    for (const [key, val] of rateLimitStore.entries()) {
      if (val.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!info || info.resetTime < now) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (info.count >= max) {
    return false;
  }

  info.count++;
  return true;
}

export async function proxy(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

  // Apply rate limiting for authentication endpoints
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    const isAllowed = rateLimit(`auth_${ip}`, 10, 60 * 1000); // 10 requests per minute
    if (!isAllowed) {
      logger.warn('Rate limit exceeded for auth endpoint', { ip, path: request.nextUrl.pathname });
      return NextResponse.json({ error: 'Too many requests, please try again later.' }, { status: 429 });
    }
  }

  // Apply rate limiting for generic API endpoints
  if (request.nextUrl.pathname.startsWith('/api')) {
    const isAllowed = rateLimit(`api_${ip}`, 100, 60 * 1000); // 100 requests per minute
    if (!isAllowed) {
      logger.warn('Rate limit exceeded for API endpoint', { ip, path: request.nextUrl.pathname });
      return NextResponse.json({ error: 'Too many requests, please try again later.' }, { status: 429 });
    }
  }

  const url = request.nextUrl
  const { pathname } = url

  // 1. Protect /api/admin/* routes
  if (pathname.startsWith('/api/admin')) {
    const sessionCookie = request.cookies.get('admin_session')

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifySessionJwt(sessionCookie.value)

    if (!payload || !payload.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!payload.totpVerified) {
      return NextResponse.json({ error: 'TOTP required' }, { status: 403 })
    }

    // Set user info on headers for the API route
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', payload.userId)
    requestHeaders.set('x-user-email', payload.email)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // 2. Host header extraction for wildcard subdomains
  const hostname = request.headers.get('host')

  // We only care about rewriting if we have a hostname and we are not in an API route or static path
  if (
    hostname &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/favicon.ico') &&
    !pathname.match(/\.(.*)$/) // Exclude files like .png, .css, etc.
  ) {
    // Define the main domain (for local testing, we might use localhost:3000, for prod: abcd.com)
    // You could also extract this dynamically or from an environment variable.
    const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'abcd.com'
    const adminDomain = `admin.${mainDomain}`

    // Extract subdomain
    // E.g., laion.abcd.com -> laion
    let subdomain = null

    // Check if it's localhost testing
    if (hostname.includes('localhost')) {
      // laion.localhost:3000 -> laion
      const parts = hostname.split('.')
      if (parts.length >= 2 && parts[0] !== 'www' && parts[0] !== 'admin') {
         subdomain = parts[0]
      }
    } else if (hostname.endsWith('.vercel.app')) {
      // Treat any .vercel.app domain as the main site
      subdomain = null
    } else {
      // laion.abcd.com -> laion
      // abcd.com -> null
      // www.abcd.com -> null
      if (hostname.endsWith(`.${mainDomain}`)) {
        const subdomainPart = hostname.replace(`.${mainDomain}`, '')
        if (subdomainPart !== 'www' && subdomainPart !== 'admin') {
          subdomain = subdomainPart
        }
      } else if (hostname !== mainDomain && hostname !== `www.${mainDomain}` && hostname !== adminDomain) {
        // If it doesn't end with mainDomain, it might be a custom domain for a specific product,
        // but for now, we assume it's just the main domain if it doesn't match our wildcard pattern
        // To prevent 404s on unconfigured domains, we won't rewrite it.
        subdomain = null
      }
    }

    if (subdomain && subdomain !== 'www' && subdomain !== 'admin' && subdomain !== 'localhost:3000') {
      // Rewrite to our dynamic route for subdomains: /subdomain/[slug]
      return NextResponse.rewrite(new URL(`/subdomain/${subdomain}${pathname === '/' ? '' : pathname}`, request.url))
    }
  }

  return NextResponse.next()
}

// Config indicating where middleware should run
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, fonts, etc.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
