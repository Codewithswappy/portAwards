/**
 * Server-side services barrel export
 *
 * Clean API for importing all services:
 *
 * import { db, redis, cloudinary } from "@/server"
 */

// Database
export { db, disconnectDB, checkDBConnection } from "./db";

// Redis
export { redis, cacheKeys, cacheTTL } from "./redis";

// Cloudinary
export {
  uploadImage,
  uploadVideo,
  deleteAsset,
  generateSignedUploadParams,
  getOptimizedImageUrl,
  getThumbnailUrl,
} from "./cloudinary";

export type { UploadResult, UploadOptions } from "./cloudinary";
