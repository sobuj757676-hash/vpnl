import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { validateSubdomainSlug } from '@/lib/slug-utils'

export async function GET(req: Request) {
  try {
    const products = await prisma.vpnProduct.findMany({
      orderBy: {
        displayOrder: 'asc',
      },
      include: {
        _count: {
          select: {
            features: true,
            pricingPlans: true,
            screenshots: true,
          }
        }
      }
    })
    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error('Error fetching VPN products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const adminUserId = req.headers.get('x-admin-user-id')
    const body = await req.json()
    const { name, subdomainSlug, status, shortDescription } = body

    if (!name || !subdomainSlug) {
      return NextResponse.json({ error: 'Name and subdomainSlug are required' }, { status: 400 })
    }

    const existingProduct = await prisma.vpnProduct.findUnique({
      where: { subdomainSlug }
    })

    if (existingProduct) {
      return NextResponse.json({ error: 'Subdomain slug already exists' }, { status: 409 })
    }

    const slugError = validateSubdomainSlug(subdomainSlug)
    if (slugError) {
      return NextResponse.json({ error: slugError }, { status: 400 })
    }

    const maxOrderProduct = await prisma.vpnProduct.findFirst({
      orderBy: { displayOrder: 'desc' },
      select: { displayOrder: true }
    })
    const nextOrder = maxOrderProduct ? maxOrderProduct.displayOrder + 1 : 0

    const product = await prisma.vpnProduct.create({
      data: {
        name,
        subdomainSlug,
        shortDescription,
        status: status || 'draft',
        displayOrder: nextOrder,
      }
    })

    if (adminUserId) {
      await prisma.auditLog.create({
        data: {
          adminUserId,
          actionType: 'create',
          entityType: 'VpnProduct',
          entityId: product.id,
          changes: { ...product },
        }
      })
    }

    return NextResponse.json({ success: true, product }, { status: 201 })
  } catch (error) {
    console.error('Error creating VPN product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
