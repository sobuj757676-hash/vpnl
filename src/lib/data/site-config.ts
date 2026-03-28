import prisma from '@/lib/prisma'

export async function getSiteConfig() {
  const configObject: Record<string, any> = {}
  try {
    const configs = await prisma.siteConfig.findMany()
    configs.forEach((config) => {
      configObject[config.key] = config.value
    })
  } catch (error) {
    console.warn('Could not fetch site config during static build:', error);
  }
  return configObject
}
