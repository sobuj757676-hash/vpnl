import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

async function fetchSiteConfig() {
  const configObject: Record<string, any> = {}
  try {
    const configs = await prisma.siteConfig.findMany()
    configs.forEach((config) => {
      configObject[config.key] = config.value
    })
  } catch (error) {
    // Graceful fallback if database connection fails (e.g., during static build)
    console.warn('⚠️ Could not fetch site config. Using default fallbacks.', error);
  }
  return configObject
}

// Cache the site config for 60 seconds.
// For Next.js App Router, using `unstable_cache` allows us to cache database queries directly.
export const getSiteConfig = unstable_cache(
  fetchSiteConfig,
  ['site-config'],
  {
    revalidate: 60, // revalidate every 60 seconds
    tags: ['site-config']
  }
)
