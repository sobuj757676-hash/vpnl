import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 60;

// Simple in-memory rate limiter for this API
// In a production environment, you should use Redis or an external service.
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(request: Request) {
  try {
    // 1. Get the IP address
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    // 2. Hash the IP using SHA-256 for privacy compliance
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

    // 3. Simple Rate Limiting (60 requests / minute)
    const now = Date.now();
    const rateLimitData = rateLimitMap.get(ipHash);

    if (rateLimitData) {
      if (now - rateLimitData.timestamp < RATE_LIMIT_WINDOW_MS) {
        if (rateLimitData.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { success: false, error: 'Too many requests. Please try again later.' },
            { status: 429 }
          );
        }
        rateLimitData.count += 1;
      } else {
        rateLimitMap.set(ipHash, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(ipHash, { count: 1, timestamp: now });
    }

    // Periodically clean up rateLimitMap (Optional for small scale, but good practice)
    if (rateLimitMap.size > 1000) {
      rateLimitMap.clear(); // naive cleanup
    }

    // 4. Parse request body
    const body = await request.json();
    const { eventType, vpnProductId, pageUrl, referrer, userAgent, countryCode } = body;

    // Basic Validation
    if (!eventType || !['page_view', 'app_store_click', 'play_store_click', 'pricing_click'].includes(eventType)) {
      return NextResponse.json({ success: false, error: 'Invalid eventType' }, { status: 400 });
    }

    // 5. Insert event into database
    // Handle Prisma serialization by ensuring vpnProductId is either a valid UUID or null
    // Avoid Prisma string coercion errors by explicitly casting to undefined if null
    const newEvent = await prisma.analyticsEvent.create({
      data: {
        eventType,
        vpnProductId: vpnProductId || null,
        pageUrl,
        referrer,
        userAgent: userAgent || request.headers.get('user-agent'),
        ipHash,
        countryCode,
      },
    });

    // We must handle BigInt serialization because `id` is a BigInt.
    // Next.js `NextResponse.json` does not support BigInt directly.
    const serializedEvent = {
      ...newEvent,
      id: newEvent.id.toString(),
    };

    return NextResponse.json({ success: true, data: serializedEvent });
  } catch (error) {
    console.error('Analytics Event API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
