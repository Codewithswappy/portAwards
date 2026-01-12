# 🎮 DevRank Developer Commands Guide

> **Welcome, New Developer!** 👋
>
> This guide is written for you - even if you've never coded before. Every command is explained like you're 5 years old. Don't worry, you've got this!

---

## 📚 Table of Contents

1. [Before You Start (The Basics)](#before-you-start-the-basics)
2. [Starting Your App](#starting-your-app)
3. [Prisma Commands (Database Stuff)](#prisma-commands-database-stuff)
4. [Redis Commands (Cache Stuff)](#redis-commands-cache-stuff)
5. [Cloudinary Commands (Image Stuff)](#cloudinary-commands-image-stuff)
6. [Neon Commands (Database Hosting)](#neon-commands-database-hosting)
7. [Daily Workflow](#daily-workflow)
8. [Emergency Commands](#emergency-commands)
9. [Troubleshooting](#troubleshooting)

---

## Before You Start (The Basics)

### 🤔 What is a Terminal?

The terminal (or command line) is like talking to your computer using text instead of clicking buttons.

**How to open it:**

- **VS Code:** Press `` Ctrl + ` `` (the key above Tab)
- **Windows:** Search for "PowerShell" or "Terminal"

### 🤔 What does `npx` mean?

`npx` = "Please run this tool for me"

When you type `npx prisma studio`, you're saying: "Hey computer, please run the Prisma Studio tool for me!"

### 🤔 What does `npm` mean?

`npm` = "Node Package Manager" - it installs and runs JavaScript stuff

| Command         | What You're Saying                  |
| --------------- | ----------------------------------- |
| `npm install`   | "Download all the tools I need"     |
| `npm run dev`   | "Start my app in development mode"  |
| `npm run build` | "Prepare my app for the real world" |

---

## Starting Your App

### 🚀 First Time Setup (Do This Once)

When you first download the project, run these commands IN ORDER:

```bash
# Step 1: Download all the tools the project needs
npm install

# Step 2: Create the JavaScript code for your database
npx prisma generate

# Step 3: Create all the database tables
npx prisma migrate dev --name init

# Step 4: Start the app!
npm run dev
```

**That's it!** Your app should now be running at `http://localhost:3000` 🎉

---

### 🔁 Daily Start (Every Time You Code)

When you come back to code another day:

```bash
# Just start the app
npm run dev
```

**Your app will be at:** `http://localhost:3000`

**To stop it:** Press `Ctrl + C` in the terminal

---

### 📦 If Someone Changed Something

If your teammate updated the code (or you pulled from GitHub):

```bash
# Step 1: Get new tools (if any were added)
npm install

# Step 2: Update database code (if schema changed)
npx prisma generate

# Step 3: Apply database changes (if schema changed)
npx prisma migrate dev

# Step 4: Start the app
npm run dev
```

---

## Prisma Commands (Database Stuff)

### 🧠 What is Prisma?

Prisma is your **database helper**. Instead of writing complicated SQL, you write simple JavaScript.

**Without Prisma:**

```sql
SELECT * FROM users WHERE email = 'john@example.com';
```

**With Prisma:**

```javascript
await prisma.user.findUnique({ where: { email: "john@example.com" } });
```

Much easier, right? 😊

---

### 📋 All Prisma Commands

#### ✅ `npx prisma validate`

**What it does:** Checks if your `schema.prisma` file has any mistakes.

**When to use:** After editing the schema file.

**Example:**

```bash
npx prisma validate
```

**Output if good:** `The schema is valid 🚀`

**Output if bad:** Shows you exactly what's wrong.

**Think of it like:** A teacher checking your homework before you submit it.

---

#### 🎨 `npx prisma format`

**What it does:** Makes your `schema.prisma` look pretty and organized.

**When to use:** After editing the schema (optional, but nice).

**Example:**

```bash
npx prisma format
```

**Think of it like:** Cleaning your room - everything in the right place!

---

#### ⚙️ `npx prisma generate`

**What it does:** Creates JavaScript code from your schema so you can use it in your app.

**When to use:** After any schema changes.

**Example:**

```bash
npx prisma generate
```

**What happens:** Creates code in `node_modules/@prisma/client`

**Think of it like:** Translating a blueprint into actual building instructions.

---

#### 🏗️ `npx prisma migrate dev --name <name>`

**What it does:**

1. Looks at what changed in your schema
2. Creates a SQL file to make those changes
3. Runs that SQL on your database

**When to use:** After adding/removing tables or fields in schema.

**Example:**

```bash
# Added a 'phone' field to User?
npx prisma migrate dev --name add_phone_field

# Created a new 'Comment' table?
npx prisma migrate dev --name add_comments_table
```

**Think of it like:** Telling construction workers to renovate the house based on new blueprints.

---

#### 🖥️ `npx prisma studio`

**What it does:** Opens a visual database browser in your web browser.

**When to use:** When you want to SEE your data.

**Example:**

```bash
npx prisma studio
```

**Opens at:** `http://localhost:5555`

**What you can do:**

- See all your tables
- View data in each table
- Add/edit/delete data manually
- Test things without writing code

**To stop it:** Press `Ctrl + C`

**Think of it like:** Opening Excel to look at your spreadsheet.

---

#### 🚀 `npx prisma migrate deploy`

**What it does:** Runs all pending migrations (for production).

**When to use:** When deploying to Vercel or another server.

**Example:**

```bash
npx prisma migrate deploy
```

**Think of it like:** The quiet worker who just does the job without asking questions.

---

#### ⚡ `npx prisma db push`

**What it does:** Pushes schema changes to database WITHOUT creating migration files.

**When to use:** Quick prototyping only.

**Example:**

```bash
npx prisma db push
```

**⚠️ Warning:** Doesn't save history. Not for real development.

**Think of it like:** A quick fix that no one keeps track of.

---

#### 🔴 `npx prisma migrate reset`

**What it does:** DELETES ALL DATA and recreates the database from scratch.

**When to use:** Only when you want to start completely fresh.

**Example:**

```bash
npx prisma migrate reset
```

**⚠️ DANGER:** This is like burning down the house and rebuilding. All data is GONE!

**Think of it like:** Erasing everything on the whiteboard.

---

## Redis Commands (Cache Stuff)

### 🧠 What is Redis?

Redis is a **super-fast notepad**. It remembers things temporarily so your app doesn't have to ask the slow database every time.

**Example:**

- Someone views a profile → Takes 500ms from database
- Save it to Redis → Next view takes 5ms! ⚡

---

### 📋 Redis in Your Code

You don't run Redis commands in terminal. You use it in your code:

```typescript
import { redis, cacheKeys, cacheTTL } from "@/server/redis";

// Save something (remember for 5 minutes)
await redis.set("user:123", userData, cacheTTL.MEDIUM);

// Get it back (super fast!)
const user = await redis.get("user:123");

// Delete it
await redis.del("user:123");

// Count something (like page views)
await redis.incr("page:home:views");
```

---

### 🔧 Redis Helper Functions

| Function                     | What It Does        | Example                                  |
| ---------------------------- | ------------------- | ---------------------------------------- |
| `redis.get(key)`             | Get a saved value   | `await redis.get("user:123")`            |
| `redis.set(key, value, ttl)` | Save a value        | `await redis.set("user:123", data, 300)` |
| `redis.del(key)`             | Delete a value      | `await redis.del("user:123")`            |
| `redis.incr(key)`            | Add 1 to a number   | `await redis.incr("pageviews")`          |
| `redis.exists(key)`          | Check if key exists | `await redis.exists("user:123")`         |

---

### ⏱️ Cache Time (TTL)

TTL = "Time To Live" = How many seconds before data disappears

```typescript
import { cacheTTL } from "@/server/redis";

cacheTTL.SHORT; // 60 seconds (1 minute)
cacheTTL.MEDIUM; // 300 seconds (5 minutes)
cacheTTL.LONG; // 3600 seconds (1 hour)
cacheTTL.DAY; // 86400 seconds (24 hours)
```

---

### 📛 Cache Key Names

Use the helper to keep names consistent:

```typescript
import { cacheKeys } from "@/server/redis";

cacheKeys.userProfile("user123"); // "user:profile:user123"
cacheKeys.userSkills("user123"); // "user:skills:user123"
cacheKeys.exploreFeed(1); // "feed:explore:1"
cacheKeys.trendingSkills(); // "trending:skills"
```

---

### 🌐 View Redis Data (Upstash Dashboard)

1. Go to [console.upstash.com](https://console.upstash.com)
2. Click on your database
3. Click **"Data Browser"** tab
4. See all your cached data!

---

## Cloudinary Commands (Image Stuff)

### 🧠 What is Cloudinary?

Cloudinary is like **Google Photos for your app**. It stores images and videos in the cloud.

**Why use it?**

- Images don't fill up your server
- Automatically compresses images (smaller = faster)
- Creates thumbnails automatically
- Serves images fast worldwide

---

### 📋 Cloudinary in Your Code

```typescript
import {
  uploadImage,
  uploadVideo,
  deleteAsset,
  getOptimizedImageUrl,
  getThumbnailUrl,
} from "@/server/cloudinary";

// Upload an image
const result = await uploadImage(file);
if (result.success) {
  console.log(result.url); // "https://res.cloudinary.com/..."
  console.log(result.publicId); // "portawards/images/abc123"
}

// Upload a video
const videoResult = await uploadVideo(file);

// Delete an image (when user removes it)
await deleteAsset("portawards/images/abc123");

// Get optimized URL (smaller size)
const smallUrl = getOptimizedImageUrl("abc123", {
  width: 400,
  height: 300,
});

// Get tiny thumbnail
const thumbUrl = getThumbnailUrl("abc123", 150);
```

---

### 🔧 Cloudinary Functions

| Function                            | What It Does                      |
| ----------------------------------- | --------------------------------- |
| `uploadImage(file)`                 | Upload an image, get URL back     |
| `uploadVideo(file)`                 | Upload a video, get URL back      |
| `deleteAsset(publicId)`             | Delete a file from Cloudinary     |
| `getOptimizedImageUrl(id, options)` | Get resized/compressed version    |
| `getThumbnailUrl(id, size)`         | Get tiny thumbnail (for previews) |

---

### 🌐 View Cloudinary Files

1. Go to [cloudinary.com/console](https://cloudinary.com/console)
2. Click **"Media Library"** in the left menu
3. Browse all your uploaded images/videos!

---

## Neon Commands (Database Hosting)

### 🧠 What is Neon?

Neon is where your **actual database lives** in the cloud. It's like renting a filing cabinet in a secure building.

---

### 📋 Neon Dashboard Tasks

You don't run Neon commands in terminal. You manage it from the dashboard:

| Task                      | How to Do It                         |
| ------------------------- | ------------------------------------ |
| **View your data**        | Dashboard → Tables → Browse          |
| **Run SQL queries**       | Dashboard → SQL Editor               |
| **Get connection string** | Dashboard → Connection Details       |
| **Check usage**           | Dashboard → Usage                    |
| **Create backup**         | Dashboard → Branches → Create Branch |

---

### 🔗 Go to Neon Dashboard

1. Go to [console.neon.tech](https://console.neon.tech)
2. Click on your project (`devrank` or `portawards`)
3. You can:
   - See your tables
   - Run SQL queries
   - Monitor connections
   - Check storage usage

---

### 💤 Important: Neon Sleeps!

On the free tier, Neon **suspends your database after 5 minutes of no activity**.

- First query after sleep = 1-2 seconds (waking up)
- After that = Fast as normal

This is normal! Don't worry about it.

---

## Daily Workflow

### 🌅 Starting Your Day

```bash
# 1. Open your project in VS Code
cd c:/Users/codew/OneDrive/Desktop/portawards

# 2. Start the development server
npm run dev

# 3. Open your browser to http://localhost:3000
```

---

### 📝 When You Change the Database Schema

```bash
# 1. Edit prisma/schema.prisma (add new field or table)

# 2. Check for errors
npx prisma validate

# 3. Apply changes to database
npx prisma migrate dev --name describe_your_change

# 4. Update the JavaScript code
npx prisma generate

# 5. Restart your dev server (Ctrl+C then npm run dev)
```

---

### 🔍 When You Want to See Your Data

```bash
# Opens a visual browser for your database
npx prisma studio
```

---

### 🛑 Ending Your Day

```bash
# Stop the development server
Ctrl + C

# That's it! Your code is safe.
```

---

## Emergency Commands

### 🆘 "Something is broken!"

```bash
# Step 1: Stop everything
Ctrl + C

# Step 2: Delete node_modules and reinstall
rm -rf node_modules
npm install

# Step 3: Regenerate Prisma
npx prisma generate

# Step 4: Start again
npm run dev
```

---

### 🆘 "Database is messed up!"

```bash
# WARNING: This deletes ALL your data!
npx prisma migrate reset

# Then start fresh
npm run dev
```

---

### 🆘 "I want to see what's in my database!"

```bash
npx prisma studio
# Opens at http://localhost:5555
```

---

### 🆘 "My cache is showing old data!"

The cache expires automatically, but if you need to clear it now:

```typescript
// In your code, delete specific cache
await redis.del("user:profile:123");

// Or delete multiple
await redis.delMany(["key1", "key2", "key3"]);
```

Or go to Upstash Dashboard → Data Browser → Delete entries.

---

## Troubleshooting

### ❌ "Cannot find module..."

**Run:**

```bash
npm install
npx prisma generate
```

---

### ❌ "DATABASE_URL is invalid"

**Check:**

1. Open `.env` file
2. Make sure `DATABASE_URL` starts with `postgresql://`
3. No extra spaces
4. URL is in quotes: `DATABASE_URL="postgresql://..."`

---

### ❌ "Connection refused" or "Can't reach database"

**Possible causes:**

1. Internet is down
2. Neon is suspended (wait a few seconds, try again)
3. Wrong DATABASE_URL

**Fix:** Copy the connection string from Neon dashboard again.

---

### ❌ "Prisma schema is invalid"

**Run:**

```bash
npx prisma validate
```

It will tell you exactly what's wrong!

---

### ❌ "Port 3000 is already in use"

Another app is using port 3000.

**Fix:**

```bash
# Kill whatever is using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- --port 3001
```

---

## 🎉 Quick Reference Card

Save this for easy access!

| What You Want        | Command                              |
| -------------------- | ------------------------------------ |
| Start the app        | `npm run dev`                        |
| Stop the app         | `Ctrl + C`                           |
| Install packages     | `npm install`                        |
| Check schema         | `npx prisma validate`                |
| Apply DB changes     | `npx prisma migrate dev --name NAME` |
| Generate client      | `npx prisma generate`                |
| View database        | `npx prisma studio`                  |
| Reset database       | `npx prisma migrate reset` ⚠️        |
| Build for production | `npm run build`                      |

---

## 🎓 You Did It!

You now know how to:

- ✅ Start your app
- ✅ Work with the database (Prisma)
- ✅ Use caching (Redis)
- ✅ Handle images (Cloudinary)
- ✅ Access your database host (Neon)

**Happy coding!** 🚀

---

_Last updated: January 2026_
