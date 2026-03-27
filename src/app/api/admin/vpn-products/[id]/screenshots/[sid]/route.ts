import { NextResponse } from 'next/server';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import prisma from '@/lib/prisma';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'auto',
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; sid: string }> }
) {
  try {
    const { id, sid } = await params;
    const adminUserId = req.headers.get('x-admin-user-id') || null;

    const product = await prisma.vpnProduct.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'VPN product not found' }, { status: 404 });
    }

    const screenshot = await prisma.vpnScreenshot.findUnique({
      where: { id: sid },
    });

    if (!screenshot || screenshot.vpnProductId !== id) {
      return NextResponse.json({ error: 'Screenshot not found' }, { status: 404 });
    }

    // Delete from S3
    if (screenshot.imageUrl) {
      try {
        const urlObj = new URL(screenshot.imageUrl);
        // Extract key by removing the leading slash from pathname
        const key = urlObj.pathname.substring(1);

        const command = new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME || '',
          Key: key,
        });
        await s3Client.send(command);
      } catch (s3Error) {
        console.error('Error deleting file from S3:', s3Error);
        // Continue to delete from DB even if S3 delete fails (e.g. file already gone)
      }
    }

    await prisma.vpnScreenshot.delete({
      where: { id: sid },
    });

    if (adminUserId) {
      await prisma.auditLog.create({
        data: {
          adminUserId,
          actionType: 'delete',
          entityType: 'VpnScreenshot',
          entityId: sid,
          changes: { deletedScreenshot: screenshot },
        },
      });
    }

    return NextResponse.json({ success: true, message: 'Screenshot deleted successfully' });
  } catch (error) {
    console.error('Error deleting screenshot:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
