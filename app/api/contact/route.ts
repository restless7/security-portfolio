import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/app/lib/validations'
import { UpstashRateLimit } from '@/app/lib/upstash-rate-limit'
import { sendContactEmails } from '@/app/lib/email'
import { getPrismaClient } from '@/app/lib/prisma'

export const dynamic = 'force-dynamic'

const contactRateLimiter = new UpstashRateLimit('sentineldev_contact')
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = '15m'

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request)

  try {
    // Step 1: Distributed Rate Limiting (Upstash Redis with in-memory fallback)
    const rateResult = await contactRateLimiter.limit(clientIp, {
      limit: RATE_LIMIT_MAX,
      window: RATE_LIMIT_WINDOW,
    })

    if (!rateResult.success) {
      const retryAfter = rateResult.retryAfter ?? 900
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many contact form submissions. Please try again later.',
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': rateResult.limit.toString(),
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }

    // Step 2: Parse request body
    const body = await request.json()

    // Step 3: Honeypot anti-spam check
    if (typeof body?.website === 'string' && body.website.trim().length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', message: 'Invalid submission.' },
        { status: 400 }
      )
    }

    // Step 4: Zod schema validation
    const validationResult = contactFormSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: 'Please check your form inputs and try again.',
          details: validationResult.error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code,
          })),
        },
        { status: 400 }
      )
    }

    const validatedData = validationResult.data
    const timestamp = new Date().toISOString()
    const userAgent = request.headers.get('user-agent')?.substring(0, 200) || 'unknown'
    const ticketId = `SEC-${Date.now().toString(36).toUpperCase()}`

    // Step 5: Send email via Resend
    const emailResult = await sendContactEmails({
      ticketId,
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company || undefined,
      subject: validatedData.subject,
      message: validatedData.message,
      timestamp,
      ip: clientIp,
    })

    // Step 6: Persist to Vercel Postgres (if configured)
    let persisted = false
    const prisma = getPrismaClient()
    if (prisma) {
      try {
        await prisma.contactSubmission.create({
          data: {
            ticketId,
            name: validatedData.name,
            email: validatedData.email,
            company: validatedData.company || null,
            subject: validatedData.subject,
            message: validatedData.message,
            ipAddress: clientIp,
            userAgent,
            emailSent: emailResult.sent,
          },
        })
        persisted = true
      } catch (dbError) {
        console.error('[CONTACT DB ERROR] Failed to persist submission:', {
          ticketId,
          error: dbError instanceof Error ? dbError.message : 'Unknown DB error',
        })
      }
    }

    // Fail closed if email delivery failed and nothing was persisted
    if (!emailResult.sent && !persisted) {
      console.error('[CONTACT DELIVERY ERROR]', {
        ticketId,
        error: emailResult.error,
      })
      return NextResponse.json(
        {
          error: 'Delivery unavailable',
          message:
            'Unable to deliver your message right now. Please email aisolutionsapex@gmail.com directly.',
        },
        { status: 503 }
      )
    }

    // Step 7: Return success response with security headers
    return NextResponse.json(
      {
        success: true,
        message: emailResult.confirmationSent
          ? 'Message sent successfully. You will receive a confirmation email shortly.'
          : 'Message received successfully. I will follow up within 24 hours.',
        ticketId,
        estimatedResponse: '24 hours',
      },
      {
        status: 200,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-RateLimit-Limit': rateResult.limit.toString(),
          'X-RateLimit-Remaining': rateResult.remaining.toString(),
        },
      }
    )
  } catch (error) {
    console.error('[SECURITY ERROR] Contact form error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      ip: clientIp,
    })

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again later.',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  const allowedOrigin =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sentineldev.me'
      : 'http://localhost:3000'

  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    }
  )
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed', message: 'GET method not supported for this endpoint' },
    { status: 405, headers: { Allow: 'POST, OPTIONS' } }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed', message: 'PUT method not supported for this endpoint' },
    { status: 405, headers: { Allow: 'POST, OPTIONS' } }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed', message: 'DELETE method not supported for this endpoint' },
    { status: 405, headers: { Allow: 'POST, OPTIONS' } }
  )
}
