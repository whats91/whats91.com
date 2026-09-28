import Redis from "ioredis";

// Global Redis connection singleton
declare global {
  var redis: Redis | undefined;
}

// Create Redis connection without password
function createRedisConnection(): Redis {
  const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
  
  const redis = new Redis(redisUrl, {
    maxRetriesPerRequest: 3,
    retryDelayOnFailover: 100,
    lazyConnect: true,
    keepAlive: 10000,
    connectTimeout: 10000,
    commandTimeout: 5000,
  });

  redis.on("connect", () => {
    console.log("[Redis] Connected successfully");
  });

  redis.on("error", (error) => {
    console.error("[Redis] Connection error:", error.message);
  });

  redis.on("close", () => {
    console.log("[Redis] Connection closed");
  });

  return redis;
}

// Use global variable to prevent multiple connections in development
export const redis = globalThis.redis || createRedisConnection();

if (process.env.NODE_ENV !== "production") {
  globalThis.redis = redis;
}

// Helper functions for common Redis operations
export async function setCache<T>(
  key: string,
  value: T,
  ttlSeconds?: number
): Promise<void> {
  const stringValue = JSON.stringify(value);
  if (ttlSeconds) {
    await redis.setex(key, ttlSeconds, stringValue);
  } else {
    await redis.set(key, stringValue);
  }
}

export async function getCache<T>(key: string): Promise<T | null> {
  const value = await redis.get(key);
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return value as unknown as T;
  }
}

export async function deleteCache(key: string): Promise<void> {
  await redis.del(key);
}

export async function deleteCachePattern(pattern: string): Promise<void> {
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}

export default redis;
