import { z } from "zod";

/**
 * Environment variable validation schema
 * Application will crash on startup if any required variables are missing
 */
const envSchema = z.object({
  // Database (Neon PostgreSQL)
  DATABASE_URL: z
    .string()
    .url()
    .refine(
      (url) => url.includes("neon") || url.includes("postgres"),
      "DATABASE_URL must be a valid Neon PostgreSQL connection string"
    ),

  // Upstash Redis
  UPSTASH_REDIS_REST_URL: z
    .string()
    .url()
    .refine(
      (url) => url.includes("upstash"),
      "UPSTASH_REDIS_REST_URL must be a valid Upstash URL"
    ),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1, "UPSTASH_REDIS_REST_TOKEN is required"),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),

  // Node environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

/**
 * Validate environment variables
 * This will throw an error if validation fails
 */
function validateEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables. Check server logs for details.");
  }

  return parsed.data;
}

export const env = validateEnv();

 