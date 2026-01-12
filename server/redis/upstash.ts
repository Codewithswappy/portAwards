import { Redis } from "@upstash/redis";

/**
 * Upstash Redis client for serverless environments
 * Uses HTTP-based requests - no persistent connections needed
 */
const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/**
 * Redis wrapper with type-safe, error-handled methods
 * All operations fail gracefully to prevent app crashes
 */
export const redis = {
  /**
   * Get a value from Redis
   * @param key - The key to retrieve
   * @returns The value or null if not found/error
   */
  async get<T = string>(key: string): Promise<T | null> {
    try {
      const value = await redisClient.get<T>(key);
      return value;
    } catch (error) {
      console.error(`Redis GET error for key "${key}":`, error);
      return null;
    }
  },

  /**
   * Set a value in Redis
   * @param key - The key to set
   * @param value - The value to store
   * @param ttl - Optional time-to-live in seconds
   * @returns true if successful, false otherwise
   */
  async set<T>(key: string, value: T, ttl?: number): Promise<boolean> {
    try {
      if (ttl) {
        await redisClient.setex(key, ttl, JSON.stringify(value));
      } else {
        await redisClient.set(key, JSON.stringify(value));
      }
      return true;
    } catch (error) {
      console.error(`Redis SET error for key "${key}":`, error);
      return false;
    }
  },

  /**
   * Increment a counter
   * @param key - The key to increment
   * @returns The new value or null on error
   */
  async incr(key: string): Promise<number | null> {
    try {
      const result = await redisClient.incr(key);
      return result;
    } catch (error) {
      console.error(`Redis INCR error for key "${key}":`, error);
      return null;
    }
  },

  /**
   * Increment by a specific amount
   * @param key - The key to increment
   * @param amount - The amount to increment by
   * @returns The new value or null on error
   */
  async incrby(key: string, amount: number): Promise<number | null> {
    try {
      const result = await redisClient.incrby(key, amount);
      return result;
    } catch (error) {
      console.error(`Redis INCRBY error for key "${key}":`, error);
      return null;
    }
  },

  /**
   * Delete a key
   * @param key - The key to delete
   * @returns true if successful, false otherwise
   */
  async del(key: string): Promise<boolean> {
    try {
      await redisClient.del(key);
      return true;
    } catch (error) {
      console.error(`Redis DEL error for key "${key}":`, error);
      return false;
    }
  },

  /**
   * Delete multiple keys
   * @param keys - Array of keys to delete
   * @returns true if successful, false otherwise
   */
  async delMany(keys: string[]): Promise<boolean> {
    try {
      if (keys.length === 0) return true;
      await redisClient.del(...keys);
      return true;
    } catch (error) {
      console.error(`Redis DEL MANY error:`, error);
      return false;
    }
  },

  /**
   * Set expiration on a key
   * @param key - The key to expire
   * @param seconds - TTL in seconds
   * @returns true if successful, false otherwise
   */
  async expire(key: string, seconds: number): Promise<boolean> {
    try {
      await redisClient.expire(key, seconds);
      return true;
    } catch (error) {
      console.error(`Redis EXPIRE error for key "${key}":`, error);
      return false;
    }
  },

  /**
   * Check if a key exists
   * @param key - The key to check
   * @returns true if exists, false otherwise
   */
  async exists(key: string): Promise<boolean> {
    try {
      const result = await redisClient.exists(key);
      return result === 1;
    } catch (error) {
      console.error(`Redis EXISTS error for key "${key}":`, error);
      return false;
    }
  },

  /**
   * Add to a sorted set (for leaderboards)
   * @param key - The sorted set key
   * @param score - The score
   * @param member - The member
   */
  async zadd(key: string, score: number, member: string): Promise<boolean> {
    try {
      await redisClient.zadd(key, { score, member });
      return true;
    } catch (error) {
      console.error(`Redis ZADD error for key "${key}":`, error);
      return false;
    }
  },

  /**
   * Get top members from sorted set (leaderboard)
   * @param key - The sorted set key
   * @param start - Start index
   * @param stop - Stop index
   * @returns Array of members with scores
   */
  async zrange(
    key: string,
    start: number,
    stop: number
  ): Promise<string[] | null> {
    try {
      const result = await redisClient.zrange(key, start, stop, { rev: true });
      return result as string[];
    } catch (error) {
      console.error(`Redis ZRANGE error for key "${key}":`, error);
      return null;
    }
  },

  /**
   * Get rank of a member in sorted set
   * @param key - The sorted set key
   * @param member - The member to check
   * @returns The rank (0-indexed) or null
   */
  async zrank(key: string, member: string): Promise<number | null> {
    try {
      const result = await redisClient.zrevrank(key, member);
      return result;
    } catch (error) {
      console.error(`Redis ZRANK error for key "${key}":`, error);
      return null;
    }
  },

  /**
   * Raw client access for advanced operations
   */
  raw: redisClient,
};

/**
 * Cache key generators for consistent naming
 */
export const cacheKeys = {
  // User-related
  userProfile: (userId: string) => `user:profile:${userId}`,
  userSkills: (userId: string) => `user:skills:${userId}`,

  // Feed caches
  exploreFeed: (page: number) => `feed:explore:${page}`,
  trendingSkills: () => `trending:skills`,

  // Leaderboards
  globalLeaderboard: () => `leaderboard:global`,
  categoryLeaderboard: (category: string) => `leaderboard:category:${category}`,

  // Rate limiting
  rateLimit: (identifier: string, action: string) =>
    `ratelimit:${action}:${identifier}`,

  // Trending signals
  trendingSignal: (skillId: string) => `trending:signal:${skillId}`,
};

/**
 * Cache TTL constants (in seconds)
 */
export const cacheTTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
};
