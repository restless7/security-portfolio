import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes
 * Essential for component composition and conditional styling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Security utility functions
 */
export const security = {
  /**
   * Sanitize input to prevent XSS attacks
   * This is a basic implementation - in production, use a library like DOMPurify
   */
  sanitizeInput: (input: string): string => {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  },

  /**
   * Generate a security score based on various factors
   * This is for demonstration purposes in the portfolio
   */
  calculateSecurityScore: (checks: Record<string, boolean>): number => {
    const totalChecks = Object.keys(checks).length
    const passedChecks = Object.values(checks).filter(Boolean).length
    return Math.round((passedChecks / totalChecks) * 100)
  },

  /**
   * Get security grade based on score
   */
  getSecurityGrade: (score: number): string => {
    if (score >= 95) return 'A+'
    if (score >= 90) return 'A'
    if (score >= 85) return 'A-'
    if (score >= 80) return 'B+'
    if (score >= 75) return 'B'
    if (score >= 70) return 'B-'
    if (score >= 65) return 'C+'
    if (score >= 60) return 'C'
    return 'F'
  },

  /**
   * Format security headers for display
   */
  formatSecurityHeader: (key: string, value: string): { key: string; value: string; description: string } => {
    const descriptions: Record<string, string> = {
      'content-security-policy': 'Prevents XSS attacks by controlling resource loading',
      'strict-transport-security': 'Enforces HTTPS connections',
      'x-content-type-options': 'Prevents MIME sniffing attacks',
      'x-frame-options': 'Prevents clickjacking attacks',
      'x-xss-protection': 'Browser XSS filter protection',
      'referrer-policy': 'Controls referrer information sharing',
      'permissions-policy': 'Limits browser feature access'
    }

    return {
      key: key.toLowerCase(),
      value,
      description: descriptions[key.toLowerCase()] || 'Security header'
    }
  }
}

/**
 * Format bytes to human readable format
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * Generate a random delay for rate limiting demonstration
 */
export function randomDelay(min = 100, max = 500): Promise<void> {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min
  return new Promise(resolve => setTimeout(resolve, delay))
}
