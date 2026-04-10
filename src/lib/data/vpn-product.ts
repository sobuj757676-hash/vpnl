import prisma from '@/lib/prisma'
import { VpnProduct, VpnFeature, VpnPricingPlan, VpnLegal, VpnScreenshot, VpnTestimonial } from '@prisma/client'
import { unstable_cache } from 'next/cache'

export type VpnProductWithRelations = VpnProduct & {
  features: VpnFeature[]
  pricingPlans: VpnPricingPlan[]
  legal: VpnLegal[]
  screenshots: VpnScreenshot[]
  testimonials: VpnTestimonial[]
}

async function fetchVpnProductBySlug(slug: string): Promise<VpnProductWithRelations | null> {
  try {
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
  } catch (error) {
    console.warn(`⚠️ Could not fetch VPN product with slug ${slug}. Gracefully falling back to null.`, error);
    return null;
  }
}

export const getVpnProductBySlug = (slug: string) =>
  unstable_cache(
    () => fetchVpnProductBySlug(slug),
    [`vpn-product-${slug}`],
    {
      revalidate: 60, // revalidate every 60 seconds
      tags: [`vpn-product-${slug}`, 'vpn-products']
    }
  )()
