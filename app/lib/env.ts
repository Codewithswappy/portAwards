import { z } from "zod";

/**
 * Environment variable validation schema
 * Application will crash on startup if any required variables are missing
 * 
 * Usage: Import this at app entry point to validate env vars early
 * import "@/lib/env";
 */

const envSchema = z.object({
  // ============================================
  // Database (Neon PostgreSQL)
  // ============================================
  DATABASE_URL: z
    .string()
    .url()
    .refine(
      (url) => url.includes("neon") || url.includes("postgres") || url.includes("supabase"),
      "DATABASE_URL must be a valid PostgreSQL connection string"
    ),
  
  // Direct URL for migrations (optional for runtime)
  DIRECT_URL: z.string().url().optional(),

  // ============================================
  // Authentication (Auth.js)
  // ============================================
  AUTH_SECRET: z
    .string()
    .min(32, "AUTH_SECRET must be at least 32 characters"),
  
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
  GITHUB_CLIENT_ID: z.string().min(1, "GITHUB_CLIENT_ID is required"),
  GITHUB_CLIENT_SECRET: z.string().min(1, "GITHUB_CLIENT_SECRET is required"),

  // ============================================
  // Upstash Redis
  // ============================================
  UPSTASH_REDIS_REST_URL: z
    .string()
    .url()
    .refine(
      (url) => url.includes("upstash"),
      "UPSTASH_REDIS_REST_URL must be a valid Upstash URL"
    ),
  UPSTASH_REDIS_REST_TOKEN: z
    .string()
    .min(1, "UPSTASH_REDIS_REST_TOKEN is required"),

  // ============================================
  // Cloudinary
  // ============================================
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),

  // ============================================
  // Node Environment
  // ============================================
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

// Type for validated environment
export type Env = z.infer<typeof envSchema>;

/**
 * Validate environment variables
 * This will throw an error if validation fails
 */
function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(JSON.stringify(parsed.error.flatten().fieldErrors, null, 2));
    
    // In development, provide helpful guidance
    if (process.env.NODE_ENV !== "production") {
      console.error("\n📝 Check your .env.local file has all required variables.");
    }
    
    throw new Error("Invalid environment variables. Check server logs for details.");
  }

  return parsed.data;
}

/**
 * Validated environment variables
 * Import this and use instead of process.env for type-safe env access
 */
export const env = validateEnv();
