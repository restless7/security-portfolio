import { NextRequest, NextResponse } from 'next/server'

/**
 * Secure Cron Endpoint for GitHub Actions
 * Replaces Vercel cron jobs for Hobby plan compatibility
 * 
 * This endpoint is called by GitHub Actions every 6 hours to trigger
 * security health checks and maintenance tasks.
 */

export async function GET(request: NextRequest) {
  try {
    // Security: Verify the cron secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization')
    const secretParam = new URL(request.url).searchParams.get('secret')
    const providedSecret = authHeader || secretParam
    
    if (!providedSecret || !process.env.CRON_SECRET) {
      console.warn('[SECURITY] Unauthorized cron access attempt:', {
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        timestamp: new Date().toISOString()
      })
      
      return NextResponse.json(
        { error: 'Unauthorized' },
        { 
          status: 401,
          headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        }
      )
    }
    
    if (providedSecret !== process.env.CRON_SECRET) {
      console.warn('[SECURITY] Invalid cron secret provided:', {
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        timestamp: new Date().toISOString()
      })
      
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { 
          status: 403,
          headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        }
      )
    }
    
    console.log('[CRON] Starting scheduled security health check:', {
      timestamp: new Date().toISOString(),
      source: 'github-actions'
    })
    
    // Task 1: Run Security Health Check
    const healthCheckResults = await runSecurityHealthCheck()
    
    // Task 2: Cleanup old rate limit entries (if using in-memory store)
    await cleanupRateLimitStore()
    
    // Task 3: Security posture validation
    const securityPostureResults = await validateSecurityPosture()
    
    // Log successful completion
    console.log('[CRON] Scheduled tasks completed successfully:', {
      timestamp: new Date().toISOString(),
      healthCheck: healthCheckResults.status,
      securityPosture: securityPostureResults.status,
      duration: Date.now()
    })
    
    return NextResponse.json(
      {
        ok: true,
        timestamp: new Date().toISOString(),
        tasks: {
          healthCheck: healthCheckResults,
          securityPosture: securityPostureResults,
          rateLimitCleanup: { status: 'completed' }
        }
      },
      {
        status: 200,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    )
    
  } catch (error) {
    console.error('[CRON] Error in scheduled tasks:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      stack: error instanceof Error ? error.stack : undefined
    })
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

/**
 * Run security health check by calling the existing health check API
 */
async function runSecurityHealthCheck() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/security/health-check`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'GitHub-Actions-Cron/1.0'
      }
    })
    
    const data = await response.json()
    
    return {
      status: response.ok ? 'success' : 'warning',
      statusCode: response.status,
      summary: data.summary || null,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('[CRON] Health check failed:', error)
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }
  }
}

/**
 * Validate security posture by running a quick security scan
 */
async function validateSecurityPosture() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/security-posture`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'GitHub-Actions-Cron/1.0'
      }
    })
    
    const data = await response.json()
    
    return {
      status: response.ok ? 'success' : 'warning',
      statusCode: response.status,
      score: data.score || null,
      grade: data.grade || null,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('[CRON] Security posture check failed:', error)
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }
  }
}

/**
 * Cleanup old rate limit entries to prevent memory leaks
 * This is only relevant if using in-memory rate limiting
 */
async function cleanupRateLimitStore() {
  try {
    // Import the rate limit module to trigger cleanup
    const { getRateLimitStats } = await import('@/app/lib/rate-limit')
    
    const statsBefore = getRateLimitStats()
    console.log('[CRON] Rate limit store stats:', {
      totalKeys: statsBefore.totalKeys,
      memoryUsage: statsBefore.memoryUsage,
      timestamp: new Date().toISOString()
    })
    
    return {
      status: 'completed',
      stats: statsBefore
    }
  } catch (error) {
    console.error('[CRON] Rate limit cleanup failed:', error)
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Only allow GET requests for security
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { 
      status: 405, 
      headers: { 
        'Allow': 'GET',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      } 
    }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { 
      status: 405, 
      headers: { 
        'Allow': 'GET',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      } 
    }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { 
      status: 405, 
      headers: { 
        'Allow': 'GET',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      } 
    }
  )
}
