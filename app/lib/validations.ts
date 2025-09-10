import { z } from "zod"

/**
 * Contact form validation schema
 * Demonstrates secure input validation practices
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must not exceed 100 characters")
    .toLowerCase(),
  
  company: z
    .string()
    .max(100, "Company name must not exceed 100 characters")
    .regex(/^[a-zA-Z0-9\s&.-]+$/, "Company name contains invalid characters")
    .optional(),
  
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must not exceed 200 characters")
    .regex(/^[a-zA-Z0-9\s.,-?!]+$/, "Subject contains invalid characters"),
  
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters")
    .refine(
      (value) => {
        // Basic check for malicious patterns
        const maliciousPatterns = [
          /<script/i,
          /javascript:/i,
          /on\w+=/i,
          /<iframe/i,
          /eval\(/i,
          /document\./i,
          /window\./i
        ]
        return !maliciousPatterns.some(pattern => pattern.test(value))
      },
      "Message contains potentially unsafe content"
    )
})

export type ContactFormData = z.infer<typeof contactFormSchema>

/**
 * Security headers validation schema
 * For validating security posture API responses
 */
export const securityHeaderSchema = z.object({
  'content-security-policy': z.string().optional(),
  'strict-transport-security': z.string().optional(),
  'x-content-type-options': z.string().optional(),
  'x-frame-options': z.string().optional(),
  'x-xss-protection': z.string().optional(),
  'referrer-policy': z.string().optional(),
  'permissions-policy': z.string().optional(),
})

export type SecurityHeaders = z.infer<typeof securityHeaderSchema>

/**
 * Security check result schema
 */
export const securityCheckSchema = z.object({
  name: z.string(),
  status: z.enum(['pass', 'fail', 'warning']),
  description: z.string(),
  value: z.string().optional(),
  recommendation: z.string().optional()
})

export type SecurityCheck = z.infer<typeof securityCheckSchema>

/**
 * Security posture response schema
 */
export const securityPostureSchema = z.object({
  score: z.number().min(0).max(100),
  grade: z.string(),
  checks: z.array(securityCheckSchema),
  timestamp: z.date(),
  scan_duration: z.number(),
})

export type SecurityPosture = z.infer<typeof securityPostureSchema>

/**
 * Rate limiting schema for API endpoints
 */
export const rateLimitSchema = z.object({
  ip: z.string().ip(),
  endpoint: z.string(),
  limit: z.number().positive(),
  window: z.number().positive(), // in seconds
  remaining: z.number().min(0),
  reset: z.date()
})

export type RateLimit = z.infer<typeof rateLimitSchema>

/**
 * Skill category validation
 */
export const skillCategorySchema = z.object({
  name: z.string().min(1).max(50),
  skills: z.array(z.object({
    name: z.string().min(1).max(50),
    level: z.number().min(1).max(5),
    verified: z.boolean().default(false),
    certification: z.string().optional()
  })),
  icon: z.string().optional()
})

export type SkillCategory = z.infer<typeof skillCategorySchema>

/**
 * Project validation schema
 */
export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  technologies: z.array(z.string()),
  security_features: z.array(z.string()),
  github_url: z.string().url().optional(),
  live_url: z.string().url().optional(),
  featured: z.boolean().default(false),
  completed_date: z.date(),
  security_score: z.number().min(0).max(100).optional()
})

export type Project = z.infer<typeof projectSchema>

/**
 * Certification validation schema
 */
export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  issuer: z.string().min(1).max(100),
  issue_date: z.date(),
  expiry_date: z.date().optional(),
  credential_id: z.string().optional(),
  verification_url: z.string().url().optional(),
  badge_image: z.string().url().optional(),
  skills: z.array(z.string()).optional()
})

export type Certification = z.infer<typeof certificationSchema>
