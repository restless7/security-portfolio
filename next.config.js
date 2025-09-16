/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers configuration for A+ rating
  async headers() {
    const isDevelopment = process.env.NODE_ENV === 'development'
    
    // Development CSP (more permissive)
    const developmentCSP = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://vitals.vercel-insights.com https://vercel.live wss://vercel.live",
      "frame-src 'self' https://vercel.live",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; ')
    
    // Production CSP (secure but allows necessary Next.js inline scripts)
    const productionCSP = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://vercel.live",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob: https://*.vercel.app https://*.vercel.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://vitals.vercel-insights.com https://vercel.live wss://vercel.live",
      "frame-src 'self' https://vercel.live",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "worker-src 'self' blob:",
      "child-src 'self' blob:",
      "manifest-src 'self'",
      "upgrade-insecure-requests",
      ...(process.env.CSP_REPORT_URI ? [`report-uri ${process.env.CSP_REPORT_URI}`, "report-to csp-endpoint"] : [])
    ].join('; ')
    
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            // Content Security Policy - Environment-aware
            key: 'Content-Security-Policy',
            value: isDevelopment ? developmentCSP : productionCSP
          },
          {
            // HTTP Strict Transport Security - Forces HTTPS
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            // Prevents clickjacking attacks
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            // Prevents MIME type sniffing
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            // Controls referrer information
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            // Controls browser features and APIs
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'interest-cohort=()',
              'payment=()',
              'usb=()',
              'bluetooth=()',
              'magnetometer=()',
              'accelerometer=()',
              'gyroscope=()'
            ].join(', ')
          },
          {
            // Cross-Origin Embedder Policy
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none'
          },
          {
            // Cross-Origin Opener Policy
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            // Cross-Origin Resource Policy
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin'
          },
          {
            // Server identification (security by obscurity)
            key: 'X-Powered-By',
            value: 'Security-First Architecture'
          }
        ]
      },
      {
        // Additional security for API routes
        source: '/api/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
          }
        ]
      }
    ]
  },
  
  // Remove X-Powered-By header for security
  poweredByHeader: false,
  
  // Enable compression for performance
  compress: true,
  
  // Environment variables validation
  env: {
    // Only expose non-sensitive environment variables to client
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  
  // Image optimization with security considerations
  images: {
    domains: [],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Server external packages (moved from experimental)
  serverExternalPackages: ['bcrypt', 'crypto'],
  
  // Skip error page generation to avoid React context issues
  skipTrailingSlashRedirect: true,
  
  // Try to avoid prerendering issues
  trailingSlash: false
}

module.exports = nextConfig
