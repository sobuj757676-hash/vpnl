import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  // Use a dummy connection string during Vercel build if DATABASE_URL is not set
  // This prevents PrismaClientInitializationError during next build's static generation
  const dbUrl = process.env.DATABASE_URL || 'postgresql://dummy:dummy@localhost:5432/dummy'
  return new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
