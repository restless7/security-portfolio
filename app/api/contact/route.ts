import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/app/lib/validations'
import { security } from '@/app/lib/utils'

/**
 * Secure Contact Form API Endpoint
 * Demonstrates cybersecurity best practices in API development
 */

// Rate limiting configuration (stub - would use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX = 5 // 5 requests per window

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0] || 'unknown'
  return `contact_${ip}`
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (now > entry.resetTime) {
    // Reset the window
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true
  }

  entry.count++
  return false
}

export async function POST(request: NextRequest) {
  try {
    // Step 1: Rate Limiting
    const rateLimitKey = getRateLimitKey(request)
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many contact form submissions. Please try again later.',
          retryAfter: 900 // 15 minutes
        },
        { 
          status: 429,
          headers: {
            'Retry-After': '900',
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': '0',
          }
        }
      )
    }

    // Step 2: Parse and validate request body
    const body = await request.json()

    // Step 3: Zod validation with comprehensive error handling
    const validationResult = contactFormSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: 'Invalid input data provided',
          details: validationResult.error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code
          }))
        },
        { status: 400 }
      )
    }

    const validatedData = validationResult.data

    // Step 4: Additional security sanitization
    const sanitizedData = {
      name: security.sanitizeInput(validatedData.name).trim(),
      email: validatedData.email.toLowerCase().trim(),
      company: validatedData.company ? security.sanitizeInput(validatedData.company).trim() : undefined,
      subject: security.sanitizeInput(validatedData.subject).trim(),
      message: security.sanitizeInput(validatedData.message).trim(),
      timestamp: new Date().toISOString(),
      ip: getRateLimitKey(request).replace('contact_', ''),
      userAgent: request.headers.get('user-agent')?.substring(0, 200) || 'unknown'
    }

    // Step 5: Security logging (in production, log to secure system)
    console.log(`[SECURITY LOG] Contact form submission:`, {
      timestamp: sanitizedData.timestamp,
      ip: sanitizedData.ip,
      name: sanitizedData.name,
      subject: sanitizedData.subject,
      messageLength: sanitizedData.message.length,
      hasCompany: !!sanitizedData.company,
      userAgent: sanitizedData.userAgent
    })

    // Step 6: Simulate processing delay (prevents timing attacks)
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500))

    // Step 7: In production, this would:
    // - Send email using secure email service (SendGrid, AWS SES, etc.)
    // - Store in database with encryption
    // - Trigger notification workflow
    // - Generate case/ticket ID for tracking

    // Mock success response
    const mockTicketId = `SEC-${Date.now().toString(36).toUpperCase()}`

    // Step 8: Return success response with security headers
    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully. You will receive a confirmation email shortly.',
        ticketId: mockTicketId,
        estimatedResponse: '24 hours'
      },
      {
        status: 200,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    )

  } catch (error) {
    // Step 9: Error handling with security considerations
    console.error(`[SECURITY ERROR] Contact form error:`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      ip: getRateLimitKey(request).replace('contact_', '')
    })

    // Return generic error message (don't leak implementation details)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again later.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
        ? 'https://your-domain.com' 
        : 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    }
  })
}

// Reject all other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed', message: 'GET method not supported for this endpoint' },
    { status: 405, headers: { 'Allow': 'POST, OPTIONS' } }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed', message: 'PUT method not supported for this endpoint' },
    { status: 405, headers: { 'Allow': 'POST, OPTIONS' } }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed', message: 'DELETE method not supported for this endpoint' },
    { status: 405, headers: { 'Allow': 'POST, OPTIONS' } }
  )
}
