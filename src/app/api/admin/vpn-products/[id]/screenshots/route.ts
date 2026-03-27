import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST: Add new screenshot
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { imageUrl, altText, orientation, displayOrder } = body;

    const product = await prisma.vpnProduct.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'VPN product not found' }, { status: 404 });
    }

    const screenshot = await prisma.vpnScreenshot.create({
      data: {
        vpnProductId: id,
        imageUrl,
        altText,
        orientation: orientation || 'portrait',
        displayOrder: displayOrder || 0,
      },
    });

    return NextResponse.json({ success: true, screenshot });
  } catch (error) {
    console.error('Error adding screenshot:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
