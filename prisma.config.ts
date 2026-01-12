import path from "node:path";
import { defineConfig } from "prisma/config";

// Load .env file for Prisma CLI
import { config } from "dotenv";
config();

/**
 * Prisma Configuration for Neon PostgreSQL
 *
 * Uses pooled connections for serverless environments (Vercel)
 */
export default defineConfig({
  // Prisma schema location
  schema: path.join(__dirname, "prisma", "schema.prisma"),

  // Datasource configuration (required for migrations)
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
