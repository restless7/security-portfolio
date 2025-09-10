/**
 * Jest Setup for Security Testing
 * Configures the testing environment for security-focused tests
 */

import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return ''
  },
}))

// Mock environment variables for security tests
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'

// Global security test utilities
global.securityTestUtils = {
  maliciousPayloads: [
    '<script>alert("xss")</script>',
    'javascript:alert("xss")',
    'onmouseover="alert("xss")"',
    '<iframe src="javascript:alert(1)"></iframe>',
    'eval("malicious code")',
    'document.cookie',
    'window.location'
  ],
  
  invalidEmails: [
    'invalid-email',
    '@example.com',
    'test@',
    'test..test@example.com',
    'test@example',
    '<script>alert(1)</script>@example.com'
  ],
  
  longString: 'A'.repeat(10000),
  
  // Mock rate limit responses
  mockRateLimitResponse: {
    success: false,
    limit: 5,
    remaining: 0,
    resetTime: Date.now() + 900000,
    retryAfter: 900
  },
  
  // Mock security posture response
  mockSecurityPosture: {
    score: 96,
    grade: 'A+',
    checks: [
      {
        name: 'HTTPS Enforcement',
        status: 'pass',
        description: 'All connections forced over HTTPS with HSTS',
        severity: 'critical'
      }
    ],
    timestamp: new Date().toISOString(),
    scan_duration: 50,
    threats_detected: 0,
    vulnerabilities_count: { critical: 0, high: 0, medium: 0, low: 0 },
    compliance: { owasp: 94, nist: 92, pci_dss: 0 }
  }
}

// Increase timeout for security tests
jest.setTimeout(10000)

// Console spy to capture security logs
global.consoleSpy = {
  log: jest.spyOn(console, 'log').mockImplementation(() => {}),
  warn: jest.spyOn(console, 'warn').mockImplementation(() => {}),
  error: jest.spyOn(console, 'error').mockImplementation(() => {}),
}

// Security test matchers
expect.extend({
  toBeSecureHeader(received, headerName) {
    const pass = received && typeof received === 'string' && received.length > 0
    
    if (pass) {
      return {
        message: () => `Expected ${headerName} header to not be secure, but it was: ${received}`,
        pass: true,
      }
    } else {
      return {
        message: () => `Expected ${headerName} header to be secure, but received: ${received}`,
        pass: false,
      }
    }
  },
  
  toRejectMaliciousInput(received, input) {
    const pass = received && received.success === false
    
    if (pass) {
      return {
        message: () => `Expected validation to allow malicious input: ${input}`,
        pass: true,
      }
    } else {
      return {
        message: () => `Expected validation to reject malicious input: ${input}`,
        pass: false,
      }
    }
  },
})

// Clean up after each test
afterEach(() => {
  // Clear all mocks
  jest.clearAllMocks()
  
  // Reset console spies
  global.consoleSpy.log.mockClear()
  global.consoleSpy.warn.mockClear()
  global.consoleSpy.error.mockClear()
})

// Clean up after all tests
afterAll(() => {
  // Restore console
  global.consoleSpy.log.mockRestore()
  global.consoleSpy.warn.mockRestore()
  global.consoleSpy.error.mockRestore()
})
