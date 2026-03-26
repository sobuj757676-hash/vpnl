import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySessionJwt } from '@/lib/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /api/admin/* routes
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

  return NextResponse.next()
}

// Config indicating where middleware should run
export const config = {
  matcher: ['/api/admin/:path*'],
}
