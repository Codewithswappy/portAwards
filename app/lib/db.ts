import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

/**
 * Prisma Client singleton for Supabase/Neon PostgreSQL
 * 
 * IMPORTANT: Prisma 7 Breaking Change
 * - prisma.config.ts is ONLY for CLI operations (migrations, db push)
 * - Runtime PrismaClient needs explicit configuration via adapter
 * - Using Neon serverless adapter for optimal performance
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  // Get the database URL from environment
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL environment variable is not set. " +
      "Please ensure it's defined in your .env.local file."
    );
  }

  // Create Neon adapter with the connection string
  const adapter = new PrismaNeon({ connectionString });

  // Initialize PrismaClient with the adapter
  return new PrismaClient({ adapter });
}

// Use singleton pattern to prevent multiple instances during hot reload
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Helper functions
export async function disconnectDB(): Promise<void> {
  await prisma.$disconnect();
}

export async function checkDBConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}
