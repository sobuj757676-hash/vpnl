import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const actionType = searchParams.get('actionType');

    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (actionType) {
      whereClause.actionType = actionType;
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.auditLog.count({ where: whereClause })
    ]);

    // Serialize BigInt `id`
    const serializedLogs = logs.map(log => ({
      ...log,
      id: log.id.toString()
    }));

    return NextResponse.json({
      success: true,
      data: serializedLogs,
      pagination: {
        page,
        limit,
        total,
      }
    });

  } catch (error) {
    console.error('Audit Log API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
