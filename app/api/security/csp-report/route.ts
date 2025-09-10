import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

/**
 * CSP Violation Report Endpoint
 * Receives and processes Content Security Policy violation reports
 */

// CSP Report schema validation
const cspReportSchema = z.object({
  'csp-report': z.object({
    'blocked-uri': z.string().optional(),
    'document-uri': z.string(),
    'original-policy': z.string(),
    'referrer': z.string().optional(),
    'script-sample': z.string().optional(),
    'status-code': z.number().optional(),
    'violated-directive': z.string(),
    'source-file': z.string().optional(),
    'line-number': z.number().optional(),
    'column-number': z.number().optional(),
  })
}).or(z.object({
  // New CSP reporting format
  type: z.literal('csp-violation'),
  body: z.object({
    blockedURL: z.string().optional(),
    documentURL: z.string(),
    effectiveDirective: z.string(),
    originalPolicy: z.string(),
    referrer: z.string().optional(),
    sample: z.string().optional(),
    statusCode: z.number().optional(),
    sourceFile: z.string().optional(),
    lineNumber: z.number().optional(),
    columnNumber: z.number().optional(),
  })
}))

interface CSPViolation {
  timestamp: string
  userAgent: string
  ip: string
  documentUri: string
  violatedDirective: string
  blockedUri?: string
  sourceFile?: string
  lineNumber?: number
  scriptSample?: string
  severity: 'low' | 'medium' | 'high' | 'critical'
}

/**
 * Determine violation severity based on the violation details
 */
function calculateSeverity(report: any): 'low' | 'medium' | 'high' | 'critical' {
  const directive = report['violated-directive'] || report.body?.effectiveDirective || ''
  const blockedUri = report['blocked-uri'] || report.body?.blockedURL || ''
  const scriptSample = report['script-sample'] || report.body?.sample || ''
  
  // Critical: Inline script/eval violations (potential XSS)
  if (directive.includes('script-src') && (
    blockedUri === 'eval' || 
    blockedUri === 'inline' ||
    scriptSample.includes('eval(') ||
    scriptSample.includes('Function(')
  )) {
    return 'critical'
  }
  
  // High: Script violations from external sources
  if (directive.includes('script-src') && blockedUri.startsWith('http')) {
    return 'high'
  }
  
  // Medium: Other script or object violations
  if (directive.includes('script-src') || directive.includes('object-src')) {
    return 'medium'
  }
  
  // Low: Style, font, image violations (usually benign)
  return 'low'
}

/**
 * Send security alert for critical violations
 */
async function sendSecurityAlert(violation: CSPViolation) {
  const webhookUrl = process.env.SECURITY_WEBHOOK_URL
  
  if (!webhookUrl || violation.severity === 'low') {
    return // Only alert on medium+ severity
  }
  
  const alertMessage = {
    text: `🚨 CSP Violation Detected`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `CSP Violation - ${violation.severity.toUpperCase()}`
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Page:* ${violation.documentUri}`
          },
          {
            type: 'mrkdwn',
            text: `*Violated Directive:* ${violation.violatedDirective}`
          },
          {
            type: 'mrkdwn',
            text: `*Blocked URI:* ${violation.blockedUri || 'N/A'}`
          },
          {
            type: 'mrkdwn',
            text: `*User Agent:* ${violation.userAgent.substring(0, 50)}...`
          }
        ]
      },
      ...(violation.scriptSample ? [{
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Script Sample:*\n\`\`\`${violation.scriptSample}\`\`\``
        }
      }] : []),
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Timestamp: ${violation.timestamp} | IP: ${violation.ip}`
          }
        ]
      }
    ]
  }
  
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alertMessage)
    })
  } catch (error) {
    console.error('Failed to send security alert:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client information
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const ip = request.ip || 
              request.headers.get('x-forwarded-for')?.split(',')[0] || 
              request.headers.get('x-real-ip') || 
              'unknown'
    
    // Parse and validate the CSP report
    const body = await request.json()
    const validationResult = cspReportSchema.safeParse(body)
    
    if (!validationResult.success) {
      console.warn('Invalid CSP report format:', {
        body,
        errors: validationResult.error.errors
      })
      return NextResponse.json(
        { error: 'Invalid report format' },
        { status: 400 }
      )
    }
    
    const report = validationResult.data
    
    // Extract violation details (handle both old and new CSP report formats)
    const isLegacyFormat = 'csp-report' in report
    const cspData = isLegacyFormat ? report['csp-report'] : report.body
    
    const violation: CSPViolation = {
      timestamp: new Date().toISOString(),
      userAgent,
      ip,
      documentUri: cspData.documentURL || cspData['document-uri'],
      violatedDirective: cspData.effectiveDirective || cspData['violated-directive'],
      blockedUri: cspData.blockedURL || cspData['blocked-uri'],
      sourceFile: cspData.sourceFile || cspData['source-file'],
      lineNumber: cspData.lineNumber || cspData['line-number'],
      scriptSample: cspData.sample || cspData['script-sample'],
      severity: calculateSeverity(isLegacyFormat ? cspData : { body: cspData })
    }
    
    // Log violation (in production, store in database or send to monitoring service)
    console.warn('CSP Violation Detected:', {
      severity: violation.severity,
      directive: violation.violatedDirective,
      blocked: violation.blockedUri,
      page: violation.documentUri,
      ip: violation.ip,
      userAgent: violation.userAgent.substring(0, 100)
    })
    
    // Send alert for high severity violations
    if (violation.severity === 'high' || violation.severity === 'critical') {
      await sendSecurityAlert(violation)
    }
    
    // Return success response
    return NextResponse.json(
      { 
        message: 'Report received',
        severity: violation.severity,
        timestamp: violation.timestamp
      },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    )
    
  } catch (error) {
    console.error('CSP report processing error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Reject other methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'POST' } }
  )
}
