import prisma from '@/lib/prisma'
import { VpnProduct, VpnFeature, VpnPricingPlan, VpnLegal, VpnScreenshot, VpnTestimonial } from '@prisma/client'

export type VpnProductWithRelations = VpnProduct & {
  features: VpnFeature[]
  pricingPlans: VpnPricingPlan[]
  legal: VpnLegal[]
  screenshots: VpnScreenshot[]
  testimonials: VpnTestimonial[]
}

export async function getVpnProductBySlug(slug: string): Promise<VpnProductWithRelations | null> {
  const product = await prisma.vpnProduct.findFirst({
    where: {
      subdomainSlug: slug,
      status: 'published',
    },
    include: {
      features: {
        orderBy: { displayOrder: 'asc' },
      },
      pricingPlans: {
        orderBy: { displayOrder: 'asc' },
      },
      legal: true,
      screenshots: {
        orderBy: { displayOrder: 'asc' },
      },
      testimonials: {
        orderBy: { displayOrder: 'asc' },
      },
    },
  })

  return product as VpnProductWithRelations | null
}
