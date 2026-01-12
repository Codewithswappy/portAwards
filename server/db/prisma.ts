import { PrismaClient } from "@prisma/client";

/**
 * PrismaClient singleton for Vercel serverless environment
 * Prevents connection exhaustion by reusing the client in development
 * and creating a single instance per serverless function in production
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Create Prisma client with Neon connection
 * In Prisma 7, the database URL is passed directly to the constructor
 */
function createPrismaClient() {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    datasourceUrl: process.env.DATABASE_URL,
  });
}

/**
 * Prisma client instance with optimized settings for Neon + Vercel
 */
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// In development, store the client globally to prevent hot-reload issues
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Graceful shutdown handler
 * Important for serverless environments to clean up connections
 */
export async function disconnectDB() {
  await prisma.$disconnect();
}

/**
 * Health check for database connection
 */
export async function checkDBConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}
