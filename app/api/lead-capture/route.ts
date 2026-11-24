/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { z } from "zod"
import rateLimit from "@/app/lib/rate-limit"

// Lead capture validation schema
const leadCaptureSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  company: z.string().optional(),
  role: z.enum(["cto", "vp-engineering", "security-engineer", "developer", "founder", "other"]).optional(),
  companySize: z.enum(["1-10", "11-50", "51-200", "201-1000", "1000+"]).optional(),
  leadMagnet: z.enum(["security-assessment", "whitepaper-download", "newsletter-signup", "devsecops-templates", "soc2-starter-kit"]),
  timestamp: z.string(),
  source: z.string()
})

// Lead scoring function
function calculateLeadScore(data: z.infer<typeof leadCaptureSchema>): number {
  let score = 10 // Base score

  // Lead magnet value
  const magnetValues = {
    "whitepaper-download": 25,
    "soc2-starter-kit": 50,
    "devsecops-templates": 30,
    "security-assessment": 20,
    "newsletter-signup": 10
  }
  score += magnetValues[data.leadMagnet]

  // Role value
  const roleValues = {
    "cto": 30,
    "vp-engineering": 25,
    "security-engineer": 20,
    "founder": 20,
    "developer": 15,
    "other": 10
  }
  if (data.role) {
    score += roleValues[data.role]
  }

  // Company size value
  const sizeValues = {
    "51-200": 25,
    "201-1000": 20,
    "11-50": 15,
    "1000+": 15,
    "1-10": 10
  }
  if (data.companySize) {
    score += sizeValues[data.companySize]
  }

  // Additional data completeness bonus
  if (data.firstName && data.lastName) score += 5
  if (data.company) score += 5

  return Math.min(score, 100) // Cap at 100
}

// Email content templates
function getEmailContent(leadMagnet: string, firstName?: string) {
  const name = firstName ? firstName : "there"

  const templates = {
    "security-assessment": {
      subject: "Your Application Security Review Checklist",
      content: `Hi ${name},

Thanks for requesting the Application Security Review Checklist.

Key architectural areas to verify first:
1. Security Headers & CSP Configuration
2. API Authorization & Input Schema Validation
3. Infrastructure & Secret Isolation Baselines

If you want to discuss a concrete system review, reply directly or reach out via sentineldev.me/contact.

Best regards,
Sebastián García`
    },

    "whitepaper-download": {
      subject: "Architecture & Application Security Reference Notes",
      content: `Hi ${name},

Thank you for your interest in the application security and architecture reference notes.

Key topics covered:
• Tenant isolation and object-level authorization boundaries
• Strict Zod input validation and rate limiting
• Transport security headers and CI regression checks

Questions about implementing any of these patterns? Reply directly or visit sentineldev.me/projects.

Best,
Sebastián García`
    },

    "soc2-starter-kit": {
      subject: "Security & Operational Readiness Checklist",
      content: `Hi ${name},

Thanks for requesting the operational security readiness checklist.

Core areas to document early:
• Access control & role boundaries
• Secret lifecycle & environment isolation
• Audit logging & incident response runbooks
• Automated CI security verification gates

For commercial compliance implementation or consulting engagements, inquiries are handled through APEX AI Solutions (apexaisolutions.dev).

Best,
Sebastián García`
    }
  }

  return templates[leadMagnet as keyof typeof templates] || templates["security-assessment"]
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      "127.0.0.1"
    const { success } = await rateLimit(identifier, 10, 60000)

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = leadCaptureSchema.parse(body)

    // Calculate lead score
    const leadScore = calculateLeadScore(validatedData)

    // Prepare lead data for storage
    const leadData = {
      ...validatedData,
      leadScore,
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || "127.0.0.1",
      userAgent: request.headers.get("user-agent"),
      createdAt: new Date().toISOString()
    }

    // TODO: Store lead data in your database/CRM
    // For now, we'll log it (in production, save to database)
    console.log("New Lead Captured:", {
      email: leadData.email,
      leadMagnet: leadData.leadMagnet,
      leadScore: leadData.leadScore,
      company: leadData.company,
      role: leadData.role
    })

    // TODO: Add to email marketing automation
    // This would integrate with your email service (ConvertKit, Mailchimp, etc.)

    // Send immediate email with lead magnet
    const emailContent = getEmailContent(validatedData.leadMagnet, validatedData.firstName)

    // TODO: Send email via your email service
    // await sendEmail({
    //   to: validatedData.email,
    //   subject: emailContent.subject,
    //   content: emailContent.content
    // })

    // Log successful lead capture for analytics
    console.log(`Lead captured: ${validatedData.email} - Score: ${leadScore} - Magnet: ${validatedData.leadMagnet}`)

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
      leadScore: leadScore
    })

  } catch (error) {
    console.error("Lead capture error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}