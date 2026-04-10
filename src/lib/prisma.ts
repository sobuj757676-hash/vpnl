import { PrismaClient } from '@prisma/client'
import { env } from './env'

const prismaClientSingleton = () => {
  // Use a dummy connection string during Vercel build if DATABASE_URL is not set
  // This prevents PrismaClientInitializationError during next build's static generation
  let dbUrl = env.DATABASE_URL || process.env.DATABASE_URL || 'postgresql://dummy:dummy@localhost:5432/dummy'

  // NOTE ON CONNECTION POOLING:
  // For production deployments on serverless platforms (e.g. Vercel), it is highly recommended
  // to use a connection pooler like PgBouncer or Prisma Accelerate.
  // When using a connection pooler, append `?pgbouncer=true` to your database URL in the environment variables.
  // To avoid PrismaClientInitializationError and ensure reliable connections during traffic spikes,
  // ensure your connection string looks like this in Vercel:
  // DATABASE_URL="postgres://user:password@host:6543/db?pgbouncer=true&connection_limit=1"

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
