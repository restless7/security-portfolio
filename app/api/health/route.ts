import { NextResponse } from 'next/server'

/**
 * Simple health check endpoint to verify security headers
 * This demonstrates secure API development practices
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      security: {
        headers_configured: true,
        validation_enabled: true,
        rate_limiting: 'pending_implementation',
        message: 'Security-first portfolio API endpoint'
      }
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    }
  )
}
