import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const adminUserId = req.headers.get('x-admin-user-id') || null;
    const body = await req.json();
    const { order } = body; // Array of { id: string, displayOrder: number }

    if (!order || !Array.isArray(order)) {
      return NextResponse.json({ error: 'Invalid order payload' }, { status: 400 });
    }

    const product = await prisma.vpnProduct.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'VPN product not found' }, { status: 404 });
    }

    await prisma.$transaction(
      order.map((item) =>
        prisma.vpnScreenshot.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        })
      )
    );

    if (adminUserId) {
      await prisma.auditLog.create({
        data: {
          adminUserId,
          actionType: 'update',
          entityType: 'VpnScreenshotOrder',
          entityId: id,
          changes: { reordered: true },
        },
      });
    }

    return NextResponse.json({ success: true, message: 'Screenshots reordered successfully' });
  } catch (error) {
    console.error('Error reordering screenshots:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
