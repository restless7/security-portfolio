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
      subject: "Your SaaS Security Assessment Results",
      content: `Hi ${name},

Thanks for taking the SaaS Security Assessment! 

Here's your detailed assessment report and personalized recommendations:
📊 Download your results: [Assessment Report Link]

Based on your responses, I've identified the top 3 areas where you can improve your security posture immediately:

1. Security Headers Implementation
2. API Authentication Hardening  
3. Infrastructure Security Baseline

Want to discuss your specific situation? Reply to this email - I read every response.

Best regards,
Sebastian Garcia
Cybersecurity Consultant

P.S. I'll be sending you practical security tips over the next few days. Keep an eye on your inbox!`
    },
    
    "whitepaper-download": {
      subject: "Your Security-First SaaS Implementation Guide is ready",
      content: `Hi ${name},

Thank you for downloading the Security-First SaaS Implementation Guide!

📚 Download your whitepaper: [Whitepaper Link]

This comprehensive 20-page guide includes:
• The 7-pillar security framework that enabled $2M+ in enterprise deals
• APEX AI case study with detailed implementation timeline
• 90-day roadmap for security transformation
• ROI calculation templates

Want to see how other companies have transformed their security posture? I'll be sharing real case studies and implementation tips over the next week.

Questions about implementing any of these strategies? Just reply - I'm here to help.

Best,
Sebastian Garcia

P.S. If you're facing urgent security requirements (SOC2, enterprise deals, etc.), I offer implementation consulting. Reply with "URGENT" and I'll prioritize your response.`
    },

    "soc2-starter-kit": {
      subject: "Your SOC2 Starter Kit is ready for download",
      content: `Hi ${name},

Your SOC2 Starter Kit is ready! This has helped dozens of companies get SOC2 certified on their first audit.

🎯 Download your kit: [SOC2 Kit Link]

What's included:
• Complete SOC2 policy templates (13 policies)
• Implementation checklists and timelines
• Audit preparation checklist
• Evidence collection automation scripts

BONUS: I'm including a 30-minute consultation call to help you create your SOC2 roadmap. Book here: [Calendar Link]

Most companies I work with get certified within 90 days using this exact framework. The average cost savings compared to hiring a compliance consultant is $35,000.

Have questions about your specific compliance requirements? Reply to this email with your situation and I'll send personalized recommendations.

Best,
Sebastian Garcia

P.S. Need SOC2 certification fast? I offer done-with-you SOC2 implementation that guarantees first-audit success. Reply with "SOC2 FAST TRACK" for details.`
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
        { error: "Invalid form data", details: error.errors },
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