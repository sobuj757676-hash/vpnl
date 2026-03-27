import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await prisma.vpnProduct.findUnique({
      where: { id },
      include: {
        features: { orderBy: { displayOrder: 'asc' } },
        pricingPlans: { orderBy: { displayOrder: 'asc' } },
        legal: true,
        screenshots: { orderBy: { displayOrder: 'asc' } },
        testimonials: { orderBy: { displayOrder: 'asc' } },
      }
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, product })
  } catch (error) {
    console.error('Error fetching VPN product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const adminUserId = req.headers.get('x-admin-user-id')
    const body = await req.json()

    // Extract main product fields to prevent overriding read-only or nested arrays
    const {
      name, subdomainSlug, shortDescription, longDescription,
      logoUrl, faviconUrl, primaryColor, secondaryColor, fontFamily,
      heroBgStyle, heroBgValue, playStoreUrl, appStoreUrl,
      appRating, downloadCountDisplay, showPlayBadge, showAppBadge,
      deviceMockupUrl, metaTitle, metaDescription, status, tags, displayOrder
    } = body

    // Check existing
    const existingProduct = await prisma.vpnProduct.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Check slug collision
    if (subdomainSlug && subdomainSlug !== existingProduct.subdomainSlug) {
      const slugCollision = await prisma.vpnProduct.findUnique({
        where: { subdomainSlug }
      })
      if (slugCollision) {
        return NextResponse.json({ error: 'Subdomain slug already exists' }, { status: 409 })
      }
    }

    const updatedProduct = await prisma.vpnProduct.update({
      where: { id },
      data: {
        name, subdomainSlug, shortDescription, longDescription,
        logoUrl, faviconUrl, primaryColor, secondaryColor, fontFamily,
        heroBgStyle, heroBgValue, playStoreUrl, appStoreUrl,
        appRating, downloadCountDisplay, showPlayBadge, showAppBadge,
        deviceMockupUrl, metaTitle, metaDescription, status, tags, displayOrder
      }
    })

    if (adminUserId) {
      await prisma.auditLog.create({
        data: {
          adminUserId,
          actionType: 'update',
          entityType: 'VpnProduct',
          entityId: updatedProduct.id,
          changes: { old: existingProduct, new: updatedProduct },
        }
      })
    }

    return NextResponse.json({ success: true, product: updatedProduct })
  } catch (error) {
    console.error('Error updating VPN product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const adminUserId = req.headers.get('x-admin-user-id')
    const body = await req.json()
    const { status } = body

    if (!status || !['draft', 'published'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const existingProduct = await prisma.vpnProduct.findUnique({
      where: { id },
      select: { status: true, id: true }
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const updatedProduct = await prisma.vpnProduct.update({
      where: { id },
      data: { status }
    })

    if (adminUserId) {
      await prisma.auditLog.create({
        data: {
          adminUserId,
          actionType: status === 'published' ? 'publish' : 'unpublish',
          entityType: 'VpnProduct',
          entityId: updatedProduct.id,
          changes: { oldStatus: existingProduct.status, newStatus: status },
        }
      })
    }

    return NextResponse.json({ success: true, product: updatedProduct })
  } catch (error) {
    console.error('Error updating VPN product status:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const adminUserId = req.headers.get('x-admin-user-id')

    const existingProduct = await prisma.vpnProduct.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    await prisma.vpnProduct.delete({
      where: { id }
    })

    if (adminUserId) {
      await prisma.auditLog.create({
        data: {
          adminUserId,
          actionType: 'delete',
          entityType: 'VpnProduct',
          entityId: id,
          changes: { ...existingProduct },
        }
      })
    }

    return NextResponse.json({ success: true, message: 'VPN product deleted successfully' })
  } catch (error) {
    console.error('Error deleting VPN product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
