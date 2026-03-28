import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const whereClause: any = {};
    if (startDate || endDate) {
      whereClause.createdAt = {};
      if (startDate) whereClause.createdAt.gte = new Date(startDate);
      if (endDate) whereClause.createdAt.lte = new Date(endDate);
    }

    const events = await prisma.analyticsEvent.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    // Create CSV string
    const headers = ['ID', 'Event Type', 'VPN Product ID', 'Page URL', 'Referrer', 'User Agent', 'IP Hash', 'Country Code', 'Created At'];
    const rows = events.map(evt => [
      evt.id.toString(),
      evt.eventType || '',
      evt.vpnProductId || '',
      `"${evt.pageUrl || ''}"`,
      `"${evt.referrer || ''}"`,
      `"${evt.userAgent || ''}"`,
      evt.ipHash || '',
      evt.countryCode || '',
      evt.createdAt.toISOString()
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="analytics_export.csv"',
      },
    });

  } catch (error) {
    console.error('Analytics Export API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
