/**
 * Advanced Rate Limiting Implementation
 * Demonstrates enterprise-grade rate limiting for API security
 */

interface RateLimitEntry {
  count: number
  firstRequest: number
  lastRequest: number
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetTime: number
  retryAfter?: number
}

// In-memory store (in production, use Redis or similar)
const rateLimitStore = new Map<string, RateLimitEntry>()

// Cleanup old entries periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now()
  const twoHoursAgo = now - (2 * 60 * 60 * 1000)
  
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.lastRequest < twoHoursAgo) {
      rateLimitStore.delete(key)
    }
  }
}, 60 * 60 * 1000) // Cleanup every hour

/**
 * Sliding window rate limiter
 */
export default async function rateLimit(
  key: string, 
  limit: number, 
  windowMs: number = 60000 // 1 minute default
): Promise<RateLimitResult> {
  const now = Date.now()
  const entry = rateLimitStore.get(key)
  
  if (!entry) {
    // First request
    rateLimitStore.set(key, {
      count: 1,
      firstRequest: now,
      lastRequest: now
    })
    
    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetTime: now + windowMs
    }
  }
  
  // Check if window has expired
  if (now - entry.firstRequest > windowMs) {
    // Reset window
    rateLimitStore.set(key, {
      count: 1,
      firstRequest: now,
      lastRequest: now
    })
    
    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetTime: now + windowMs
    }
  }
  
  // Update last request time
  entry.lastRequest = now
  
  // Check if limit exceeded
  if (entry.count >= limit) {
    const resetTime = entry.firstRequest + windowMs
    const retryAfter = Math.ceil((resetTime - now) / 1000)
    
    return {
      success: false,
      limit,
      remaining: 0,
      resetTime,
      retryAfter
    }
  }
  
  // Increment count
  entry.count++
  rateLimitStore.set(key, entry)
  
  return {
    success: true,
    limit,
    remaining: limit - entry.count,
    resetTime: entry.firstRequest + windowMs
  }
}

/**
 * Advanced rate limiting with multiple tiers
 */
export async function tieredRateLimit(
  key: string,
  limits: Array<{ window: number; limit: number }>
): Promise<RateLimitResult> {
  // Check all tiers, return failure if any tier is exceeded
  for (const tier of limits) {
    const result = await rateLimit(`${key}:${tier.window}`, tier.limit, tier.window)
    if (!result.success) {
      return result
    }
  }
  
  // All tiers passed
  return {
    success: true,
    limit: limits[0].limit,
    remaining: limits[0].limit - 1,
    resetTime: Date.now() + limits[0].window
  }
}

/**
 * Get rate limit status without incrementing
 */
export function getRateLimitStatus(
  key: string, 
  limit: number, 
  windowMs: number = 60000
): RateLimitResult {
  const now = Date.now()
  const entry = rateLimitStore.get(key)
  
  if (!entry || now - entry.firstRequest > windowMs) {
    return {
      success: true,
      limit,
      remaining: limit,
      resetTime: now + windowMs
    }
  }
  
  const remaining = Math.max(0, limit - entry.count)
  const resetTime = entry.firstRequest + windowMs
  
  return {
    success: remaining > 0,
    limit,
    remaining,
    resetTime,
    retryAfter: remaining === 0 ? Math.ceil((resetTime - now) / 1000) : undefined
  }
}

/**
 * Clear rate limit for a key (useful for testing or admin override)
 */
export function clearRateLimit(key: string): boolean {
  return rateLimitStore.delete(key)
}

/**
 * Get current rate limit statistics (for monitoring)
 */
export function getRateLimitStats(): {
  totalKeys: number
  memoryUsage: number
  oldestEntry: number | null
  newestEntry: number | null
} {
  let oldestEntry: number | null = null
  let newestEntry: number | null = null
  
  for (const entry of rateLimitStore.values()) {
    if (oldestEntry === null || entry.firstRequest < oldestEntry) {
      oldestEntry = entry.firstRequest
    }
    if (newestEntry === null || entry.lastRequest > newestEntry) {
      newestEntry = entry.lastRequest
    }
  }
  
  return {
    totalKeys: rateLimitStore.size,
    memoryUsage: JSON.stringify([...rateLimitStore.entries()]).length,
    oldestEntry,
    newestEntry
  }
}
