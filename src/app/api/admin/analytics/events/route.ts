import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const vpnProductId = searchParams.get('vpnProductId');
    const eventType = searchParams.get('eventType');

    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (vpnProductId) {
      whereClause.vpnProductId = vpnProductId;
    }
    if (eventType) {
      whereClause.eventType = eventType;
    }

    const [events, total] = await Promise.all([
      prisma.analyticsEvent.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.analyticsEvent.count({ where: whereClause })
    ]);

    // Serialize BigInt `id`
    const serializedEvents = events.map(evt => ({
      ...evt,
      id: evt.id.toString()
    }));

    return NextResponse.json({
      success: true,
      data: serializedEvents,
      pagination: {
        page,
        limit,
        total,
      }
    });

  } catch (error) {
    console.error('Analytics Events API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
