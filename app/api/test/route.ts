import { NextResponse } from 'next/server'

/**
 * Simple test endpoint to verify API functionality
 */
export async function GET() {
  try {
    return NextResponse.json(
      {
        ok: true,
        message: 'API test successful',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Test API error:', error)
    
    return NextResponse.json(
      {
        error: 'Test API failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}