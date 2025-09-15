/**
 * Environment Security Management
 * Validates environment variables and prevents client-side exposure
 */

import { z } from 'zod'

// Define required and optional environment variables
const envSchema = z.object({
  // Next.js built-in
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Site configuration (safe for client)
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  
  // Optional production services (server-only)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
  
  // Email service (server-only, if added later)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  
  // Analytics (server-only)
  VERCEL_ANALYTICS_ID: z.string().optional(),
  
  // Security monitoring (server-only)
  SECURITY_WEBHOOK_URL: z.string().url().optional(),
})

export type Environment = z.infer<typeof envSchema>

/**
 * Validate and parse environment variables
 * Throws detailed error if required variables are missing
 */
export function validateEnvironment(): Environment {
  const result = envSchema.safeParse(process.env)
  
  if (!result.success) {
    const errors = result.error.issues.map(err =>
      `${err.path.join('.')}: ${err.message}`
    ).join('\n')
    
    throw new Error(`Environment validation failed:\n${errors}`)
  }
  
  return result.data
}

/**
 * Get client-safe environment variables only
 * Only variables starting with NEXT_PUBLIC_ are safe for client
 */
export function getClientEnvironment(): Record<string, string> {
  return Object.fromEntries(
    Object.entries(process.env)
      .filter(([key]) => key.startsWith('NEXT_PUBLIC_'))
      .filter(([, value]) => value !== undefined)
  ) as Record<string, string>
}

/**
 * Check for accidentally exposed secrets in environment
 */
export function auditEnvironmentSecurity(): {
  safe: boolean
  warnings: string[]
  clientExposed: string[]
} {
  const warnings: string[] = []
  const clientExposed: string[] = []
  
  // Check for sensitive patterns in client-exposed variables
  const sensitivePatterns = [
    /api[_-]?key/i,
    /secret/i,
    /password/i,
    /token/i,
    /private/i,
    /credential/i,
    /auth/i
  ]
  
  const clientEnv = getClientEnvironment()
  
  for (const [key, value] of Object.entries(clientEnv)) {
    // Check key names for sensitive patterns
    if (sensitivePatterns.some(pattern => pattern.test(key))) {
      warnings.push(`Potentially sensitive key exposed to client: ${key}`)
      clientExposed.push(key)
    }
    
    // Check for hardcoded secrets in values (basic heuristics)
    if (value && typeof value === 'string') {
      if (value.length > 20 && /^[a-zA-Z0-9+/]+=*$/.test(value)) {
        warnings.push(`Potential base64-encoded secret in ${key}`)
      }
      if (/^[a-fA-F0-9]{32,}$/.test(value)) {
        warnings.push(`Potential hex-encoded secret in ${key}`)
      }
    }
  }
  
  // Check for missing security configurations in production
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.NEXT_PUBLIC_SITE_URL?.startsWith('https://')) {
      warnings.push('NEXT_PUBLIC_SITE_URL should use HTTPS in production')
    }
  }
  
  return {
    safe: warnings.length === 0,
    warnings,
    clientExposed
  }
}

/**
 * Runtime environment security check
 * Call this during application startup
 */
export function performStartupSecurityCheck(): void {
  try {
    // Validate environment schema
    validateEnvironment()
    console.log('✅ Environment validation passed')
    
    // Audit environment security
    const audit = auditEnvironmentSecurity()
    
    if (audit.safe) {
      console.log('✅ Environment security audit passed')
    } else {
      console.warn('⚠️ Environment security warnings:')
      audit.warnings.forEach(warning => console.warn(`  - ${warning}`))
      
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Environment security issues detected in production')
      }
    }
    
    // Log configuration summary (non-sensitive info only)
    const env = validateEnvironment()
    console.log('🔧 Configuration summary:', {
      nodeEnv: env.NODE_ENV,
      siteUrl: env.NEXT_PUBLIC_SITE_URL,
      hasRedis: !!(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN),
      hasAnalytics: !!env.VERCEL_ANALYTICS_ID,
      hasSecurityWebhook: !!env.SECURITY_WEBHOOK_URL,
    })
    
  } catch (error) {
    console.error('❌ Environment security check failed:', error)
    if (process.env.NODE_ENV === 'production') {
      process.exit(1)
    }
  }
}

/**
 * Get server-only environment variables
 * Never expose these to the client
 */
export function getServerEnvironment() {
  const env = validateEnvironment()
  
  // Return only server-side variables, excluding NEXT_PUBLIC_*
  return {
    NODE_ENV: env.NODE_ENV,
    UPSTASH_REDIS_REST_URL: env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: env.UPSTASH_REDIS_REST_TOKEN,
    SMTP_HOST: env.SMTP_HOST,
    SMTP_PORT: env.SMTP_PORT,
    SMTP_USER: env.SMTP_USER,
    SMTP_PASS: env.SMTP_PASS,
    VERCEL_ANALYTICS_ID: env.VERCEL_ANALYTICS_ID,
    SECURITY_WEBHOOK_URL: env.SECURITY_WEBHOOK_URL,
  }
}

/**
 * Sanitize environment variable for logging
 * Masks sensitive values while preserving structure info
 */
export function sanitizeEnvForLogging(key: string, value: string | undefined): string {
  if (!value) return 'undefined'
  
  const sensitivePatterns = [
    /token/i,
    /key/i,
    /secret/i,
    /pass/i,
    /credential/i
  ]
  
  if (sensitivePatterns.some(pattern => pattern.test(key))) {
    if (value.length <= 8) {
      return '*'.repeat(value.length)
    }
    return `${value.substring(0, 4)}${'*'.repeat(value.length - 8)}${value.substring(value.length - 4)}`
  }
  
  return value
}
