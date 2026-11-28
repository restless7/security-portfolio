import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Returns a PrismaClient instance if DATABASE_URL or Vercel's POSTGRES_PRISMA_URL is configured.
 * Returns null if no Postgres database is provisioned yet, allowing email-only fallback.
 */
export function getPrismaClient(): PrismaClient | null {
  const connectionUrl = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL
  if (!connectionUrl) {
    return null
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      datasources: {
        db: {
          url: connectionUrl,
        },
      },
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    })
  }

  return globalForPrisma.prisma
}

