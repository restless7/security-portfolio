import { NextRequest, NextResponse } from 'next/server'

/**
 * Security Health Check Endpoint
 * Monitors security posture and system health
 * Called by Vercel Cron every 6 hours
 */

interface HealthCheckResult {
  status: 'healthy' | 'warning' | 'critical'
  timestamp: string
  checks: {
    name: string
    status: 'pass' | 'fail' | 'warning'
    message: string
    responseTime?: number
  }[]
  summary: {
    total: number
    passed: number
    warnings: number
    failed: number
  }
}

/**
 * Perform individual health checks
 */
async function performHealthChecks(): Promise<HealthCheckResult['checks']> {
  const checks: HealthCheckResult['checks'] = []
  
  // Check 1: Environment Variables
  const envCheck = {
    name: 'Environment Variables',
    status: 'pass' as const,
    message: 'All required environment variables present',
    responseTime: 0
  }
  
  const requiredEnvVars = [
    'NEXT_PUBLIC_SITE_URL',
    'NODE_ENV'
  ]
  
  const optionalEnvVars = [
    'UPSTASH_REDIS_REST_URL',
    'UPSTASH_REDIS_REST_TOKEN',
    'CSP_REPORT_URI',
    'SECURITY_WEBHOOK_URL'
  ]
  
  const missingRequired = requiredEnvVars.filter(env => !process.env[env])
  const missingOptional = optionalEnvVars.filter(env => !process.env[env])
  
  if (missingRequired.length > 0) {
    envCheck.status = 'fail'
    envCheck.message = `Missing required env vars: ${missingRequired.join(', ')}`
  } else if (missingOptional.length > 0) {
    envCheck.status = 'warning'
    envCheck.message = `Missing optional env vars: ${missingOptional.join(', ')}`
  }
  
  checks.push(envCheck)
  
  // Check 2: Security Posture API
  try {
    const startTime = Date.now()
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/security-posture`)
    const responseTime = Date.now() - startTime
    
    if (response.ok) {
      const data = await response.json()
      const score = data.score || 0
      
      checks.push({
        name: 'Security Posture API',
        status: score >= 90 ? 'pass' : score >= 70 ? 'warning' : 'fail',
        message: `Security score: ${score}/100`,
        responseTime
      })
    } else {
      checks.push({
        name: 'Security Posture API',
        status: 'fail',
        message: `API returned ${response.status}`,
        responseTime
      })
    }
  } catch (error) {
    checks.push({
      name: 'Security Posture API',
      status: 'fail',
      message: `API unreachable: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }
  
  // Check 3: Rate Limiting Service
  const rateLimitCheck = {
    name: 'Rate Limiting Service',
    status: 'pass' as const,
    message: 'Rate limiting service operational'
  }
  
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      // Test Redis connection
      const response = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(['PING'])
      })
      
      if (!response.ok) {
        rateLimitCheck.status = 'warning'
        rateLimitCheck.message = 'Redis connection issues - falling back to in-memory'
      }
    } catch (error) {
      rateLimitCheck.status = 'warning'
      rateLimitCheck.message = 'Redis unavailable - using in-memory rate limiting'
    }
  } else {
    rateLimitCheck.status = 'warning'
    rateLimitCheck.message = 'Using in-memory rate limiting (not distributed)'
  }
  
  checks.push(rateLimitCheck)
  
  // Check 4: Security Headers
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
    const headers = response.headers
    
    const requiredHeaders = [
      'content-security-policy',
      'strict-transport-security',
      'x-content-type-options',
      'x-frame-options'
    ]
    
    const missingHeaders = requiredHeaders.filter(header => !headers.get(header))
    
    checks.push({
      name: 'Security Headers',
      status: missingHeaders.length === 0 ? 'pass' : 'fail',
      message: missingHeaders.length === 0 
        ? 'All security headers present' 
        : `Missing headers: ${missingHeaders.join(', ')}`
    })
  } catch (error) {
    checks.push({
      name: 'Security Headers',
      status: 'fail',
      message: 'Unable to check headers'
    })
  }
  
  // Check 5: Memory and Performance
  const memoryUsage = process.memoryUsage()
  const memoryUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024)
  
  checks.push({
    name: 'Memory Usage',
    status: memoryUsedMB > 400 ? 'warning' : 'pass',
    message: `Heap usage: ${memoryUsedMB}MB`
  })
  
  return checks
}

/**
 * Send alert for critical health check failures
 */
async function sendHealthAlert(result: HealthCheckResult) {
  if (result.status === 'healthy' || !process.env.SECURITY_WEBHOOK_URL) {
    return
  }
  
  const failedChecks = result.checks.filter(c => c.status === 'fail')
  const warningChecks = result.checks.filter(c => c.status === 'warning')
  
  const alertMessage = {
    text: `🚨 Security Health Check ${result.status.toUpperCase()}`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `Security Health Check - ${result.status.toUpperCase()}`
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Total Checks:* ${result.summary.total}`
          },
          {
            type: 'mrkdwn',
            text: `*Failed:* ${result.summary.failed}`
          },
          {
            type: 'mrkdwn',
            text: `*Warnings:* ${result.summary.warnings}`
          },
          {
            type: 'mrkdwn',
            text: `*Passed:* ${result.summary.passed}`
          }
        ]
      },
      ...(failedChecks.length > 0 ? [{
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Failed Checks:*\n${failedChecks.map(c => `• ${c.name}: ${c.message}`).join('\n')}`
        }
      }] : []),
      ...(warningChecks.length > 0 ? [{
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Warning Checks:*\n${warningChecks.map(c => `• ${c.name}: ${c.message}`).join('\n')}`
        }
      }] : []),
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Timestamp: ${result.timestamp}`
          }
        ]
      }
    ]
  }
  
  try {
    await fetch(process.env.SECURITY_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alertMessage)
    })
  } catch (error) {
    console.error('Failed to send health alert:', error)
  }
}

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Perform all health checks
    const checks = await performHealthChecks()
    
    // Calculate summary
    const summary = {
      total: checks.length,
      passed: checks.filter(c => c.status === 'pass').length,
      warnings: checks.filter(c => c.status === 'warning').length,
      failed: checks.filter(c => c.status === 'fail').length
    }
    
    // Determine overall status
    let status: 'healthy' | 'warning' | 'critical'
    if (summary.failed > 0) {
      status = 'critical'
    } else if (summary.warnings > 0) {
      status = 'warning'
    } else {
      status = 'healthy'
    }
    
    const result: HealthCheckResult = {
      status,
      timestamp: new Date().toISOString(),
      checks,
      summary
    }
    
    // Send alert if not healthy
    if (status !== 'healthy') {
      await sendHealthAlert(result)
    }
    
    // Log result
    console.log(`Health check completed: ${status} (${Date.now() - startTime}ms)`, {
      passed: summary.passed,
      warnings: summary.warnings,
      failed: summary.failed
    })
    
    return NextResponse.json(result, {
      status: status === 'critical' ? 503 : 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      }
    })
    
  } catch (error) {
    console.error('Health check error:', error)
    
    return NextResponse.json({
      status: 'critical',
      timestamp: new Date().toISOString(),
      checks: [],
      summary: { total: 0, passed: 0, warnings: 0, failed: 0 },
      error: 'Health check failed'
    }, {
      status: 503
    })
  }
}

// Allow POST for manual health checks
export async function POST(request: NextRequest) {
  return GET(request)
}
