import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Basic auth check logic could go here if this route wasn't globally protected by middleware
    // We assume middleware/JWT logic handles authentication for `/api/admin/*`

    // KPI 1: Total Page Views (Main Site)
    const mainSiteViews = await prisma.analyticsEvent.count({
      where: { eventType: 'page_view', vpnProductId: null }
    });

    // KPI 2: Total Subdomain Visits (All VPNs)
    const subdomainViews = await prisma.analyticsEvent.count({
      where: { eventType: 'page_view', vpnProductId: { not: null } }
    });

    // KPI 3: App Store Click-throughs
    const appStoreClicks = await prisma.analyticsEvent.count({
      where: { eventType: 'app_store_click' }
    });

    // KPI 4 & 5: Active vs Draft VPN Products
    const activeProducts = await prisma.vpnProduct.count({ where: { status: 'published' } });
    const draftProducts = await prisma.vpnProduct.count({ where: { status: 'draft' } });

    return NextResponse.json({
      success: true,
      data: {
        mainSiteViews,
        subdomainViews,
        appStoreClicks,
        activeProducts,
        draftProducts,
      }
    });
  } catch (error) {
    console.error('Analytics Summary API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
