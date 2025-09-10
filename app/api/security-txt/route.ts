import { NextResponse } from 'next/server'

/**
 * Security.txt endpoint
 * Provides security contact and policy information
 * RFC 9116 compliant
 */

export async function GET() {
  const securityTxt = `# Security Policy for Security Portfolio
# This file complies with RFC 9116 - https://tools.ietf.org/rfc/rfc9116.txt

Contact: security@your-domain.com
Contact: https://github.com/your-username/security-portfolio/security/advisories/new

Expires: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()}

Preferred-Languages: en, es

Policy: https://your-domain.com/security-policy

Acknowledgments: https://your-domain.com/security-acknowledgments

# Canonical URL
Canonical: https://your-domain.com/.well-known/security.txt

# Encryption key for secure communication
Encryption: https://keybase.io/your-username/pgp_keys.asc

# Hiring information
Hiring: https://your-domain.com/careers

# Responsible Disclosure Policy:
# - Report security vulnerabilities responsibly
# - Allow reasonable time for fixes before public disclosure
# - Avoid accessing or modifying data without explicit permission
# - Do not perform DoS attacks or spam users
# - Research should be conducted ethically and lawfully
# - We commit to responding within 24 hours for critical issues
`

  return new NextResponse(securityTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-Robots-Tag': 'noindex, nofollow'
    }
  })
}

// Reject other methods
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'GET' } }
  )
}
