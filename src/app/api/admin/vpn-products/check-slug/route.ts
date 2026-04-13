import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { validateSubdomainSlug } from '@/lib/slug-utils'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    const excludeId = searchParams.get('excludeId')

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const whereClause: any = { subdomainSlug: slug }
    if (excludeId) {
      whereClause.id = { not: excludeId }
    }

    const slugError = validateSubdomainSlug(slug)
    if (slugError) {
      return NextResponse.json({ available: false, error: slugError })
    }

    const existingProduct = await prisma.vpnProduct.findFirst({
      where: whereClause
    })

    return NextResponse.json({ available: !existingProduct })
  } catch (error) {
    console.error('Error checking slug:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
