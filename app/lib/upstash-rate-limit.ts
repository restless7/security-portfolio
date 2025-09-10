/**
 * Production Rate Limiting with Upstash Redis
 * Distributed rate limiting for serverless environments
 */

interface UpstashRateLimitConfig {
  limit: number
  window: string  // e.g., "60s", "15m", "1h", "1d"
  prefix?: string
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
  retryAfter?: number
}

/**
 * Upstash Redis rate limiter (production-ready)
 * Enable this by setting UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
 */
export class UpstashRateLimit {
  private readonly restUrl: string
  private readonly restToken: string
  private readonly prefix: string

  constructor(prefix = 'rate_limit') {
    this.restUrl = process.env.UPSTASH_REDIS_REST_URL || ''
    this.restToken = process.env.UPSTASH_REDIS_REST_TOKEN || ''
    this.prefix = prefix
    
    if (!this.restUrl || !this.restToken) {
      console.warn('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN not configured. Falling back to in-memory rate limiting.')
    }
  }

  private isConfigured(): boolean {
    return !!(this.restUrl && this.restToken)
  }

  private windowToSeconds(window: string): number {
    const match = window.match(/^(\d+)([smhd])$/)
    if (!match) throw new Error(`Invalid window format: ${window}`)
    
    const value = parseInt(match[1], 10)
    const unit = match[2]
    
    switch (unit) {
      case 's': return value
      case 'm': return value * 60
      case 'h': return value * 3600
      case 'd': return value * 86400
      default: throw new Error(`Unknown time unit: ${unit}`)
    }
  }

  private async redisCommand(command: string[]): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error('Upstash Redis not configured')
    }

    const response = await fetch(`${this.restUrl}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.restToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command)
    })

    if (!response.ok) {
      throw new Error(`Redis command failed: ${response.status}`)
    }

    const result = await response.json()
    return result.result
  }

  async limit(
    identifier: string, 
    config: UpstashRateLimitConfig
  ): Promise<RateLimitResult> {
    if (!this.isConfigured()) {
      // Fall back to in-memory rate limiting
      const { default: fallbackLimit } = await import('./rate-limit')
      const windowMs = this.windowToSeconds(config.window) * 1000
      return fallbackLimit(identifier, config.limit, windowMs)
    }

    const key = `${this.prefix}:${identifier}`
    const windowSeconds = this.windowToSeconds(config.window)
    const now = Math.floor(Date.now() / 1000)
    const windowStart = now - (now % windowSeconds)
    const windowEnd = windowStart + windowSeconds

    try {
      // Use Redis pipeline for atomic operations
      const pipeline = [
        ['MULTI'],
        ['INCR', key],
        ['EXPIRE', key, windowSeconds],
        ['TTL', key],
        ['EXEC']
      ]

      const results = await Promise.all(
        pipeline.map(cmd => this.redisCommand(cmd))
      )

      // Extract results from EXEC response
      const [, , , , execResult] = results
      const [count, , ttl] = execResult

      const remaining = Math.max(0, config.limit - count)
      const reset = now + (ttl > 0 ? ttl : windowSeconds)

      return {
        success: count <= config.limit,
        limit: config.limit,
        remaining,
        reset,
        retryAfter: count > config.limit ? ttl : undefined
      }
    } catch (error) {
      console.error('Redis rate limit error:', error)
      
      // Fall back to in-memory on Redis errors
      const { default: fallbackLimit } = await import('./rate-limit')
      const windowMs = windowSeconds * 1000
      return fallbackLimit(identifier, config.limit, windowMs)
    }
  }

  async reset(identifier: string): Promise<boolean> {
    if (!this.isConfigured()) return false

    try {
      const key = `${this.prefix}:${identifier}`
      await this.redisCommand(['DEL', key])
      return true
    } catch (error) {
      console.error('Redis reset error:', error)
      return false
    }
  }

  async getUsage(identifier: string): Promise<{ count: number; ttl: number } | null> {
    if (!this.isConfigured()) return null

    try {
      const key = `${this.prefix}:${identifier}`
      const [count, ttl] = await Promise.all([
        this.redisCommand(['GET', key]),
        this.redisCommand(['TTL', key])
      ])

      return {
        count: parseInt(count || '0', 10),
        ttl: ttl || 0
      }
    } catch (error) {
      console.error('Redis usage check error:', error)
      return null
    }
  }
}

// Singleton instance
let upstashRateLimit: UpstashRateLimit | null = null

export function getUpstashRateLimit(prefix?: string): UpstashRateLimit {
  if (!upstashRateLimit) {
    upstashRateLimit = new UpstashRateLimit(prefix)
  }
  return upstashRateLimit
}

// Convenience function for common use cases
export async function rateLimit(
  identifier: string,
  limit: number,
  window: string,
  prefix?: string
): Promise<RateLimitResult> {
  const limiter = getUpstashRateLimit(prefix)
  return limiter.limit(identifier, { limit, window })
}

// Multi-tier rate limiting
export async function multiTierRateLimit(
  identifier: string,
  tiers: Array<{ limit: number; window: string }>,
  prefix?: string
): Promise<RateLimitResult> {
  const limiter = getUpstashRateLimit(prefix)
  
  for (const tier of tiers) {
    const result = await limiter.limit(`${identifier}:${tier.window}`, tier)
    if (!result.success) {
      return result
    }
  }
  
  // All tiers passed
  const firstTier = tiers[0]
  return limiter.limit(identifier, firstTier)
}
