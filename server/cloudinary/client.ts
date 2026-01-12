import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

/**
 * Configure Cloudinary
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload result type
 */
export interface UploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  error?: string;
}

/**
 * Upload options type
 */
export interface UploadOptions {
  folder?: string;
  publicId?: string;
  transformation?: Record<string, unknown>[];
  resourceType?: "image" | "video" | "raw" | "auto";
}

/**
 * Default upload transformations for images
 */
const defaultImageTransformations = [
  { quality: "auto:best" },
  { fetch_format: "auto" },
];

/**
 * Default upload transformations for videos
 */
const defaultVideoTransformations = [
  { quality: "auto" },
  { fetch_format: "auto" },
];

/**
 * Upload an image to Cloudinary
 * @param file - Base64 string, URL, or file path
 * @param options - Upload options
 * @returns Upload result with URL and metadata
 */
export async function uploadImage(
  file: string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  try {
    const result: UploadApiResponse = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      folder: options.folder ?? "portawards/images",
      public_id: options.publicId,
      transformation: options.transformation ?? defaultImageTransformations,
      // Enable responsive breakpoints for different screen sizes
      responsive_breakpoints: {
        create_derived: true,
        bytes_step: 20000,
        min_width: 200,
        max_width: 1200,
      },
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error("Cloudinary image upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Upload a video to Cloudinary
 * @param file - Base64 string, URL, or file path
 * @param options - Upload options
 * @returns Upload result with URL and metadata
 */
export async function uploadVideo(
  file: string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  try {
    const result: UploadApiResponse = await cloudinary.uploader.upload(file, {
      resource_type: "video",
      folder: options.folder ?? "portawards/videos",
      public_id: options.publicId,
      transformation: options.transformation ?? defaultVideoTransformations,
      // Video-specific settings
      eager: [
        { width: 480, height: 270, crop: "fill", format: "mp4" },
        { width: 1280, height: 720, crop: "fill", format: "mp4" },
      ],
      eager_async: true,
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error("Cloudinary video upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Delete an asset from Cloudinary
 * @param publicId - The public ID of the asset to delete
 * @param resourceType - The type of resource (image, video, raw)
 * @returns true if successful, false otherwise
 */
export async function deleteAsset(
  publicId: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result.result === "ok";
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return false;
  }
}

/**
 * Generate a signed upload URL for client-side uploads
 * @param folder - The folder to upload to
 * @param resourceType - The type of resource
 * @returns Signed upload parameters
 */
export function generateSignedUploadParams(
  folder: string = "portawards/uploads",
  resourceType: "image" | "video" | "raw" = "image"
): {
  timestamp: number;
  signature: string;
  cloudName: string;
  apiKey: string;
  folder: string;
} {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const paramsToSign = {
    timestamp,
    folder,
    resource_type: resourceType,
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );

  return {
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    folder,
  };
}

/**
 * Generate optimized image URL with transformations
 * @param publicId - The public ID of the image
 * @param options - Transformation options
 * @returns Optimized URL
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    transformation: [
      {
        width: options.width,
        height: options.height,
        crop: options.crop ?? "fill",
        quality: options.quality ?? "auto",
        fetch_format: options.format ?? "auto",
      },
    ],
    secure: true,
  });
}

/**
 * Generate thumbnail URL
 * @param publicId - The public ID of the image
 * @param size - Thumbnail size (default 150x150)
 * @returns Thumbnail URL
 */
export function getThumbnailUrl(publicId: string, size: number = 150): string {
  return cloudinary.url(publicId, {
    transformation: [
      {
        width: size,
        height: size,
        crop: "thumb",
        gravity: "face",
        quality: "auto",
        fetch_format: "auto",
      },
    ],
    secure: true,
  });
}

/**
 * Raw Cloudinary instance for advanced operations
 */
export { cloudinary };
