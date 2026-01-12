# PortAwards Infrastructure

Production-grade infrastructure for Next.js App Router using Neon PostgreSQL, Upstash Redis, and Cloudinary.

## Services Overview

| Service             | Purpose                              | SDK            |
| ------------------- | ------------------------------------ | -------------- |
| **Neon PostgreSQL** | Primary database                     | Prisma ORM     |
| **Upstash Redis**   | Caching, rate limiting, leaderboards | @upstash/redis |
| **Cloudinary**      | Image & video storage                | cloudinary     |

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file with your credentials:

```env
# Neon PostgreSQL
DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"

# Upstash Redis
UPSTASH_REDIS_REST_URL="https://xxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 3. Generate Prisma Client

```bash
npm run db:generate
```

### 4. Push Schema to Database

```bash
npm run db:push
```

### 5. Start Development Server

```bash
npm run dev
```

### 6. Test Health Endpoint

Visit `http://localhost:3000/api/health` to verify all services are connected.

## Usage

### Database (Prisma)

```typescript
import { db } from "@/server/db";

// Query users
const users = await db.user.findMany();

// Create user
const user = await db.user.create({
  data: {
    email: "user@example.com",
    name: "John Doe",
  },
});
```

### Redis (Upstash)

```typescript
import { redis, cacheKeys, cacheTTL } from "@/server/redis";

// Cache data
await redis.set("key", { data: "value" }, cacheTTL.MEDIUM);

// Get cached data
const cached = await redis.get("key");

// Leaderboard operations
await redis.zadd("leaderboard:global", 100, "user-id");
const top10 = await redis.zrange("leaderboard:global", 0, 9);
```

### Cloudinary

```typescript
import { uploadImage, uploadVideo, deleteAsset } from "@/server/cloudinary";

// Upload image
const result = await uploadImage(base64String);
if (result.success) {
  console.log(result.url); // Optimized URL
  console.log(result.publicId); // For deletion
}

// Upload video
const videoResult = await uploadVideo(videoBase64);

// Delete asset
await deleteAsset(publicId);
```

### Combined Import

```typescript
import { db, redis, uploadImage } from "@/server";
```

## Database Scripts

| Command                   | Description              |
| ------------------------- | ------------------------ |
| `npm run db:generate`     | Generate Prisma client   |
| `npm run db:push`         | Push schema to database  |
| `npm run db:migrate`      | Create migration (dev)   |
| `npm run db:migrate:prod` | Deploy migrations (prod) |
| `npm run db:studio`       | Open Prisma Studio       |

## File Structure

```
├── prisma/
│   └── schema.prisma       # Database schema
├── prisma.config.ts        # Prisma 7 configuration
├── server/
│   ├── index.ts            # All services barrel export
│   ├── db/
│   │   ├── prisma.ts       # Prisma client singleton
│   │   └── index.ts        # DB exports
│   ├── redis/
│   │   ├── upstash.ts      # Redis client + helpers
│   │   └── index.ts        # Redis exports
│   └── cloudinary/
│       ├── client.ts       # Cloudinary client + uploads
│       └── index.ts        # Cloudinary exports
├── app/api/health/
│   └── route.ts            # Health check endpoint
└── env.mjs                 # Environment validation
```

## Environment Validation

The `env.mjs` file validates all required environment variables on startup. If any are missing, the application will crash with a clear error message.

## Security Best Practices

- ✅ No secrets in client code
- ✅ Environment variables validated with Zod
- ✅ Prisma singleton prevents connection exhaustion
- ✅ Redis used as cache only (not source of truth)
- ✅ Cloudinary uploads are signed
- ✅ All `.env*` files are gitignored

## Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy - the `postinstall` script will auto-generate Prisma client

## Troubleshooting

### "Module has no exported member 'PrismaClient'"

Run `npm run db:generate` to generate the Prisma client.

### Database connection timeout

Ensure you're using the **pooled** connection string from Neon (not the direct URL).

### Redis connection failed

Verify your Upstash REST URL and token are correct. The URL should start with `https://`.
