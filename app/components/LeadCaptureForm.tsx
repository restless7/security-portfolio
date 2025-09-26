"use client"

import { useState } from "react"
import { Download, Mail, CheckCircle, ArrowRight } from "lucide-react"
import { cn } from "@/app/lib/utils"

type LeadMagnetType = 
  | "security-assessment" 
  | "whitepaper-download" 
  | "newsletter-signup"
  | "devsecops-templates"
  | "soc2-starter-kit"

interface LeadCaptureFormProps {
  type: LeadMagnetType
  title: string
  description: string
  buttonText: string
  className?: string
  compact?: boolean
}

interface FormData {
  email: string
  firstName?: string
  lastName?: string
  company?: string
  role?: string
  companySize?: string
}

export default function LeadCaptureForm({ 
  type, 
  title, 
  description, 
  buttonText, 
  className,
  compact = false 
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    role: "",
    companySize: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          leadMagnet: type,
          timestamp: new Date().toISOString(),
          source: window.location.pathname
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setIsSubmitted(true)
      
      // Track conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          lead_type: type,
          value: getLeadValue(type)
        })
      }

    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getLeadValue = (type: LeadMagnetType): number => {
    switch (type) {
      case "whitepaper-download": return 25
      case "soc2-starter-kit": return 50
      case "devsecops-templates": return 30
      case "security-assessment": return 20
      default: return 10
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getIcon = () => {
    switch (type) {
      case "whitepaper-download":
      case "devsecops-templates":
      case "soc2-starter-kit":
        return <Download className="w-5 h-5" />
      default:
        return <Mail className="w-5 h-5" />
    }
  }

  if (isSubmitted) {
    return (
      <div className={cn(
        "security-card p-8 text-center max-w-md mx-auto",
        className
      )}>
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-400/10 rounded-full">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-bold mb-2">Thank You!</h3>
        <p className="text-gray-400 mb-6">
          Check your email for the download link. We've sent you the {title.toLowerCase()}.
        </p>
        <div className="text-sm text-gray-500">
          <p>Didn't receive it? Check your spam folder or</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-cyan-400 hover:text-green-400 underline"
          >
            try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "security-card",
      compact ? "p-6" : "p-8",
      className
    )}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-cyan-400/10 rounded-lg">
          {getIcon()}
        </div>
        <div>
          <h3 className={cn(
            "font-bold",
            compact ? "text-lg" : "text-xl"
          )}>
            {title}
          </h3>
          {!compact && (
            <p className="text-sm text-gray-400">{description}</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email - Always Required */}
        <div>
          <label htmlFor={`email-${type}`} className="block text-sm font-medium mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id={`email-${type}`}
            required
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md 
                     focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder="your@email.com"
          />
        </div>

        {/* Progressive Fields Based on Lead Magnet Value */}
        {!compact && (type === "whitepaper-download" || type === "soc2-starter-kit") && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={`firstName-${type}`} className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id={`firstName-${type}`}
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md 
                           focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor={`lastName-${type}`} className="block text-sm font-medium mb-2">
                  Last Name  
                </label>
                <input
                  type="text"
                  id={`lastName-${type}`}
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md 
                           focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor={`company-${type}`} className="block text-sm font-medium mb-2">
                Company
              </label>
              <input
                type="text"
                id={`company-${type}`}
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md 
                         focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="Acme Corp"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={`role-${type}`} className="block text-sm font-medium mb-2">
                  Role
                </label>
                <select
                  id={`role-${type}`}
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md 
                           focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="">Select Role</option>
                  <option value="cto">CTO</option>
                  <option value="vp-engineering">VP Engineering</option>
                  <option value="security-engineer">Security Engineer</option>
                  <option value="developer">Developer</option>
                  <option value="founder">Founder</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor={`companySize-${type}`} className="block text-sm font-medium mb-2">
                  Company Size
                </label>
                <select
                  id={`companySize-${type}`}
                  value={formData.companySize}
                  onChange={(e) => handleInputChange("companySize", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md 
                           focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="">Select Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
            </div>
          </>
        )}

        {error && (
          <div className="text-red-400 text-sm p-3 bg-red-400/10 border border-red-400/30 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold transition-all duration-300",
            "bg-cyan-400 text-black hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed",
            isSubmitting && "animate-pulse"
          )}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              {getIcon()}
              {buttonText}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  )
}