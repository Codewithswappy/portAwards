import path from "node:path";
import { defineConfig } from "prisma/config";

// Load .env files for Prisma CLI
import { config } from "dotenv";
config({ path: ".env.local" });
config();

/**
 * Prisma Configuration for Supabase PostgreSQL
 * 
 * IMPORTANT: For Supabase, use DIRECT_URL for migrations/db push
 * The pooled connection (DATABASE_URL) doesn't support schema changes
 */
export default defineConfig({
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  
  // Use DIRECT_URL for all CLI operations (migrations, db push)
  datasource: {
    url: process.env.DIRECT_URL!,
  },
});
