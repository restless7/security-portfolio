/**
 * Content Security Policy (CSP) Configuration
 * Production-hardened CSP with nonce support
 */

import crypto from 'crypto'

export interface CSPConfig {
  nonce?: string
  isDevelopment?: boolean
  reportUri?: string
}

/**
 * Generate cryptographically secure nonce for CSP
 */
export function generateNonce(): string {
  return crypto.randomBytes(16).toString('base64')
}

/**
 * Build Content Security Policy string
 * Removes unsafe-inline in production and uses nonces
 */
export function buildCSP(config: CSPConfig = {}): string {
  const { nonce, isDevelopment = false, reportUri } = config

  // Base CSP directives
  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      // Vercel Analytics and Live
      'https://va.vercel-scripts.com',
      'https://vercel.live',
      // Add nonce for inline scripts in production
      ...(nonce && !isDevelopment ? [`'nonce-${nonce}'`] : []),
      // Allow unsafe-inline only in development
      ...(isDevelopment ? ["'unsafe-inline'", "'unsafe-eval'"] : [])
    ],
    'style-src': [
      "'self'",
      // Allow inline styles for Tailwind and styled-components
      "'unsafe-inline'",
      // Google Fonts if needed
      'https://fonts.googleapis.com'
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'blob:',
      // Vercel and CDN images
      'https://*.vercel.app',
      'https://*.vercel.com'
    ],
    'font-src': [
      "'self'",
      'data:',
      'https://fonts.gstatic.com'
    ],
    'connect-src': [
      "'self'",
      // Vercel Analytics
      'https://vitals.vercel-insights.com',
      'https://vercel.live',
      'wss://vercel.live',
      // Add your API domains
      ...(process.env.NEXT_PUBLIC_SITE_URL ? [process.env.NEXT_PUBLIC_SITE_URL] : [])
    ],
    'frame-src': [
      "'self'",
      'https://vercel.live'
    ],
    'media-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'worker-src': ["'self'", 'blob:'],
    'child-src': ["'self'", 'blob:'],
    'manifest-src': ["'self'"],
    // Require HTTPS for all resources
    'upgrade-insecure-requests': []
  }

  // Add report-uri in production for CSP violation monitoring
  if (reportUri && !isDevelopment) {
    directives['report-uri'] = [reportUri]
    directives['report-to'] = ['csp-endpoint']
  }

  // Convert directives to CSP string
  const cspString = Object.entries(directives)
    .map(([directive, sources]) => {
      if (sources.length === 0) {
        return directive
      }
      return `${directive} ${sources.join(' ')}`
    })
    .join('; ')

  return cspString
}

/**
 * Generate CSP report endpoint configuration
 */
export function getCSPReportConfig() {
  return {
    group: 'csp-endpoint',
    max_age: 86400, // 24 hours
    endpoints: [
      {
        url: '/api/security/csp-report',
        priority: 1,
        weight: 100
      }
    ]
  }
}

/**
 * Validate CSP nonce format
 */
export function isValidNonce(nonce: string): boolean {
  // Base64 string, 22 characters for 16 bytes
  return /^[A-Za-z0-9+/]{22}==?$/.test(nonce)
}

/**
 * Get security headers for production
 */
export function getSecurityHeaders(nonce?: string): Record<string, string> {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const reportUri = process.env.CSP_REPORT_URI
  
  return {
    // Content Security Policy
    'Content-Security-Policy': buildCSP({ nonce, isDevelopment, reportUri }),
    
    // HTTP Strict Transport Security
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    
    // Prevent clickjacking
    'X-Frame-Options': 'DENY',
    
    // Prevent MIME sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions Policy - restrict powerful features
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()', // Privacy Sandbox
      'payment=()',
      'usb=()',
      'bluetooth=()',
      'magnetometer=()',
      'accelerometer=()',
      'gyroscope=()',
      'fullscreen=(self)',
      'picture-in-picture=()'
    ].join(', '),
    
    // Cross-Origin Policies
    'Cross-Origin-Embedder-Policy': 'credentialless',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'cross-origin',
    
    // Cache Control for security-sensitive pages
    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0',
    
    // Security headers for API responses
    'X-Robots-Tag': 'noindex, nofollow, nosnippet, noarchive, noimageindex',
    
    // Server identification (security through obscurity)
    'Server': 'Security-First-Architecture'
  }
}

/**
 * Middleware helper to add security headers
 */
export function addSecurityHeaders(
  response: Response, 
  options: { nonce?: string; skipCache?: boolean } = {}
): Response {
  const { nonce, skipCache = false } = options
  const headers = getSecurityHeaders(nonce)
  
  // Add all security headers to response
  Object.entries(headers).forEach(([key, value]) => {
    // Skip cache headers if requested (for static assets)
    if (skipCache && key.toLowerCase().includes('cache')) {
      return
    }
    response.headers.set(key, value)
  })
  
  return response
}
