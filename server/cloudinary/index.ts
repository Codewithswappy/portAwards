/**
 * Cloudinary exports
 * Clean API for importing Cloudinary client
 *
 * Usage:
 * import { uploadImage, uploadVideo, deleteAsset } from "@/server/cloudinary"
 */

export {
  uploadImage,
  uploadVideo,
  deleteAsset,
  generateSignedUploadParams,
  getOptimizedImageUrl,
  getThumbnailUrl,
  cloudinary,
} from "./client";

export type { UploadResult, UploadOptions } from "./client";
