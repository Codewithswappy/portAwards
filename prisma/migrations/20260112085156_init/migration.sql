-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('DEV', 'CLIENT');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('JUNIOR', 'MID', 'SENIOR');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('LIKE', 'SAVE', 'SHARE');

-- CreateEnum
CREATE TYPE "LeaderboardPeriod" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'ALL_TIME');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('LIKE', 'COMMENT', 'FOLLOW', 'MENTION', 'RANK_UP', 'ACHIEVEMENT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "avatarUrl" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "website" TEXT,
    "githubUrl" TEXT,
    "linkedinUrl" TEXT,
    "twitterUrl" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'DEV',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isPro" BOOLEAN NOT NULL DEFAULT false,
    "reputationScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "tagline" TEXT,
    "url" TEXT NOT NULL,
    "story" TEXT,
    "stack" TEXT[],
    "experienceLevel" "ExperienceLevel" NOT NULL DEFAULT 'JUNIOR',
    "yearsOfExp" INTEGER NOT NULL DEFAULT 0,
    "snapshotUrl" TEXT,
    "ogImageUrl" TEXT,
    "rankScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "saveCount" INTEGER NOT NULL DEFAULT 0,
    "shareCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "avgViewDuration" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "bounceRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowcasePost" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "caption" TEXT,
    "mediaUrl" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL DEFAULT 'image',
    "publicId" TEXT,
    "tags" TEXT[],
    "projectUrl" TEXT,
    "sourceUrl" TEXT,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "saveCount" INTEGER NOT NULL DEFAULT 0,
    "shareCount" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShowcasePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioInteraction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "type" "InteractionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortfolioInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostInteraction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "type" "InteractionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "portfolioId" TEXT,
    "postId" TEXT,
    "content" TEXT NOT NULL,
    "parentId" TEXT,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViewEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "portfolioId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "scrollDepth" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "scrolled" BOOLEAN NOT NULL DEFAULT false,
    "sessionId" TEXT,
    "referrer" TEXT,
    "device" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ViewEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaderboardSnapshot" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "period" "LeaderboardPeriod" NOT NULL,
    "deltaRank" INTEGER NOT NULL DEFAULT 0,
    "deltaScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaderboardSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "actorId" TEXT,
    "portfolioId" TEXT,
    "postId" TEXT,
    "commentId" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconUrl" TEXT,
    "color" TEXT,
    "tier" INTEGER NOT NULL DEFAULT 1,
    "points" INTEGER NOT NULL DEFAULT 10,
    "requirement" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "portfolioId" TEXT,
    "postId" TEXT,
    "commentId" TEXT,
    "userId" TEXT,
    "reason" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "resolution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_reputationScore_idx" ON "User"("reputationScore" DESC);

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "User_lastActiveAt_idx" ON "User"("lastActiveAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_userId_key" ON "Portfolio"("userId");

-- CreateIndex
CREATE INDEX "Portfolio_userId_idx" ON "Portfolio"("userId");

-- CreateIndex
CREATE INDEX "Portfolio_rankScore_idx" ON "Portfolio"("rankScore" DESC);

-- CreateIndex
CREATE INDEX "Portfolio_likeCount_idx" ON "Portfolio"("likeCount" DESC);

-- CreateIndex
CREATE INDEX "Portfolio_viewCount_idx" ON "Portfolio"("viewCount" DESC);

-- CreateIndex
CREATE INDEX "Portfolio_experienceLevel_idx" ON "Portfolio"("experienceLevel");

-- CreateIndex
CREATE INDEX "Portfolio_stack_idx" ON "Portfolio"("stack");

-- CreateIndex
CREATE INDEX "Portfolio_createdAt_idx" ON "Portfolio"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "Portfolio_isFeatured_rankScore_idx" ON "Portfolio"("isFeatured", "rankScore" DESC);

-- CreateIndex
CREATE INDEX "Portfolio_isPublished_rankScore_idx" ON "Portfolio"("isPublished", "rankScore" DESC);

-- CreateIndex
CREATE INDEX "ShowcasePost_userId_idx" ON "ShowcasePost"("userId");

-- CreateIndex
CREATE INDEX "ShowcasePost_tags_idx" ON "ShowcasePost"("tags");

-- CreateIndex
CREATE INDEX "ShowcasePost_likeCount_idx" ON "ShowcasePost"("likeCount" DESC);

-- CreateIndex
CREATE INDEX "ShowcasePost_createdAt_idx" ON "ShowcasePost"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "ShowcasePost_isPublished_createdAt_idx" ON "ShowcasePost"("isPublished", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "ShowcasePost_isFeatured_likeCount_idx" ON "ShowcasePost"("isFeatured", "likeCount" DESC);

-- CreateIndex
CREATE INDEX "PortfolioInteraction_userId_idx" ON "PortfolioInteraction"("userId");

-- CreateIndex
CREATE INDEX "PortfolioInteraction_portfolioId_idx" ON "PortfolioInteraction"("portfolioId");

-- CreateIndex
CREATE INDEX "PortfolioInteraction_type_idx" ON "PortfolioInteraction"("type");

-- CreateIndex
CREATE INDEX "PortfolioInteraction_portfolioId_type_idx" ON "PortfolioInteraction"("portfolioId", "type");

-- CreateIndex
CREATE INDEX "PortfolioInteraction_createdAt_idx" ON "PortfolioInteraction"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioInteraction_userId_portfolioId_type_key" ON "PortfolioInteraction"("userId", "portfolioId", "type");

-- CreateIndex
CREATE INDEX "PostInteraction_userId_idx" ON "PostInteraction"("userId");

-- CreateIndex
CREATE INDEX "PostInteraction_postId_idx" ON "PostInteraction"("postId");

-- CreateIndex
CREATE INDEX "PostInteraction_type_idx" ON "PostInteraction"("type");

-- CreateIndex
CREATE INDEX "PostInteraction_postId_type_idx" ON "PostInteraction"("postId", "type");

-- CreateIndex
CREATE INDEX "PostInteraction_createdAt_idx" ON "PostInteraction"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "PostInteraction_userId_postId_type_key" ON "PostInteraction"("userId", "postId", "type");

-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "Comment"("userId");

-- CreateIndex
CREATE INDEX "Comment_portfolioId_idx" ON "Comment"("portfolioId");

-- CreateIndex
CREATE INDEX "Comment_postId_idx" ON "Comment"("postId");

-- CreateIndex
CREATE INDEX "Comment_parentId_idx" ON "Comment"("parentId");

-- CreateIndex
CREATE INDEX "Comment_createdAt_idx" ON "Comment"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "ViewEvent_portfolioId_idx" ON "ViewEvent"("portfolioId");

-- CreateIndex
CREATE INDEX "ViewEvent_userId_idx" ON "ViewEvent"("userId");

-- CreateIndex
CREATE INDEX "ViewEvent_createdAt_idx" ON "ViewEvent"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "ViewEvent_portfolioId_createdAt_idx" ON "ViewEvent"("portfolioId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "ViewEvent_sessionId_idx" ON "ViewEvent"("sessionId");

-- CreateIndex
CREATE INDEX "LeaderboardSnapshot_portfolioId_idx" ON "LeaderboardSnapshot"("portfolioId");

-- CreateIndex
CREATE INDEX "LeaderboardSnapshot_period_createdAt_idx" ON "LeaderboardSnapshot"("period", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "LeaderboardSnapshot_period_rank_idx" ON "LeaderboardSnapshot"("period", "rank");

-- CreateIndex
CREATE INDEX "LeaderboardSnapshot_createdAt_idx" ON "LeaderboardSnapshot"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardSnapshot_portfolioId_period_createdAt_key" ON "LeaderboardSnapshot"("portfolioId", "period", "createdAt");

-- CreateIndex
CREATE INDEX "Follow_followerId_idx" ON "Follow"("followerId");

-- CreateIndex
CREATE INDEX "Follow_followingId_idx" ON "Follow"("followingId");

-- CreateIndex
CREATE INDEX "Follow_createdAt_idx" ON "Follow"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_followingId_key" ON "Follow"("followerId", "followingId");

-- CreateIndex
CREATE INDEX "Notification_userId_isRead_idx" ON "Notification"("userId", "isRead");

-- CreateIndex
CREATE INDEX "Notification_userId_createdAt_idx" ON "Notification"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_slug_key" ON "Achievement"("slug");

-- CreateIndex
CREATE INDEX "Achievement_slug_idx" ON "Achievement"("slug");

-- CreateIndex
CREATE INDEX "Achievement_tier_idx" ON "Achievement"("tier");

-- CreateIndex
CREATE INDEX "UserAchievement_userId_idx" ON "UserAchievement"("userId");

-- CreateIndex
CREATE INDEX "UserAchievement_achievementId_idx" ON "UserAchievement"("achievementId");

-- CreateIndex
CREATE INDEX "UserAchievement_earnedAt_idx" ON "UserAchievement"("earnedAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");

-- CreateIndex
CREATE INDEX "Report_status_idx" ON "Report"("status");

-- CreateIndex
CREATE INDEX "Report_createdAt_idx" ON "Report"("createdAt" DESC);

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowcasePost" ADD CONSTRAINT "ShowcasePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioInteraction" ADD CONSTRAINT "PortfolioInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioInteraction" ADD CONSTRAINT "PortfolioInteraction_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostInteraction" ADD CONSTRAINT "PostInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostInteraction" ADD CONSTRAINT "PostInteraction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "ShowcasePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "ShowcasePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewEvent" ADD CONSTRAINT "ViewEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewEvent" ADD CONSTRAINT "ViewEvent_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderboardSnapshot" ADD CONSTRAINT "LeaderboardSnapshot_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
