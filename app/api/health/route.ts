import { NextRequest, NextResponse } from "next/server";
import { db, checkDBConnection } from "@/server/db";
import { redis, cacheKeys, cacheTTL } from "@/server/redis";
import { uploadImage, deleteAsset, type UploadResult } from "@/server/cloudinary";

/** 
 * Health Check API Route
 *
 * GET /api/health
 *
 * This route demonstrates usage of all three services:
 * - Neon PostgreSQL (via Prisma)
 * - Upstash Redis
 * - Cloudinary
 */
export async function GET(request: NextRequest) {
  const results: {
    database: { connected: boolean; latency?: number };
    redis: { connected: boolean; latency?: number };
    cloudinary: { configured: boolean };
    timestamp: string;
  } = {
    database: { connected: false },
    redis: { connected: false },
    cloudinary: { configured: false },
    timestamp: new Date().toISOString(),
  };

  // Test Database Connection
  const dbStart = Date.now();
  try {
    const connected = await checkDBConnection();
    results.database = {
      connected,
      latency: Date.now() - dbStart,
    };
  } catch (error) {
    console.error("Database health check failed:", error);
    results.database.connected = false;
  }

  // Test Redis Connection
  const redisStart = Date.now();
  try {
    const testKey = "health:check";
    await redis.set(testKey, { timestamp: Date.now() }, cacheTTL.SHORT);
    const value = await redis.get(testKey);
    results.redis = {
      connected: value !== null,
      latency: Date.now() - redisStart,
    };
    await redis.del(testKey);
  } catch (error) {
    console.error("Redis health check failed:", error);
    results.redis.connected = false;
  }

  // Check Cloudinary Configuration
  results.cloudinary.configured = !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );

  // Determine overall status
  const allHealthy =
    results.database.connected &&
    results.redis.connected &&
    results.cloudinary.configured;

  return NextResponse.json(results, {
    status: allHealthy ? 200 : 503,
  });
}

/**
 * Example POST route demonstrating all services working together
 *
 * POST /api/health
 * Body: { action: "demo" }
 *
 * This shows how you would typically use these services together:
 * 1. Cache check with Redis
 * 2. Database query with Prisma
 * 3. Image upload with Cloudinary
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.action !== "demo") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // Example: Check cache first
    const cacheKey = cacheKeys.exploreFeed(1);
    const cached = await redis.get(cacheKey);

    if (cached) {
      return NextResponse.json({
        source: "cache",
        data: cached,
      });
    }

    // Example: Query database if not cached
    // Note: This requires the database to be migrated first
    // const users = await db.user.findMany({ take: 10 });

    // Example: Cache the result
    // await redis.set(cacheKey, users, cacheTTL.MEDIUM);

    return NextResponse.json({
      message: "Demo endpoint - services are ready",
      services: {
        database: "Prisma client ready",
        redis: "Upstash client ready",
        cloudinary: "Cloudinary client ready",
      },
      usage: {
        database: 'import { db } from "@/server/db"',
        redis: 'import { redis } from "@/server/redis"',
        cloudinary: 'import { uploadImage } from "@/server/cloudinary"',
      },
    });
  } catch (error) {
    console.error("Demo endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
