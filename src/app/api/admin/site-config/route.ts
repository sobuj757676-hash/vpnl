import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const configs = await prisma.siteConfig.findMany();
    // Convert array to object
    const configObject: Record<string, any> = {};
    configs.forEach((config) => {
      configObject[config.key] = config.value;
    });

    return NextResponse.json({ success: true, configs: configObject });
  } catch (error) {
    console.error('Error fetching site config:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const adminUserId = req.headers.get('x-admin-user-id') || null;
    const body = await req.json();

    const { configs } = body;

    if (!configs || typeof configs !== 'object') {
      return NextResponse.json({ error: 'Invalid configuration payload' }, { status: 400 });
    }

    // Process all updates in a transaction
    await prisma.$transaction(async (tx) => {
      for (const [key, value] of Object.entries(configs)) {
        // Value must be parsed/stringified carefully because Prisma JSON
        // requires passing an object or string for JSONB depending on how it's handled.
        // It's a bit simpler if we just let Prisma handle the object as `any`.

        await tx.siteConfig.upsert({
          where: { key },
          update: {
            value: value !== undefined ? (value as any) : null,
            updatedAt: new Date(),
            updatedBy: adminUserId,
          },
          create: {
            key,
            value: value !== undefined ? (value as any) : null,
            updatedAt: new Date(),
            updatedBy: adminUserId,
          },
        });
      }

      if (adminUserId) {
        await tx.auditLog.create({
          data: {
            adminUserId,
            actionType: 'update',
            entityType: 'SiteConfig',
            changes: { updatedKeys: Object.keys(configs) },
          },
        });
      }
    });

    return NextResponse.json({ success: true, message: 'Site configuration updated successfully' });
  } catch (error) {
    console.error('Error updating site config:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
