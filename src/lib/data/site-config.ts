import prisma from '@/lib/prisma'

export async function getSiteConfig() {
  const configs = await prisma.siteConfig.findMany()
  const configObject: Record<string, any> = {}
  configs.forEach((config) => {
    configObject[config.key] = config.value
  })
  return configObject
}
