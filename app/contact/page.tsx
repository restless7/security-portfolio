"use client"

import { Mail, ArrowLeft, Shield, Lock, Eye, AlertTriangle, CheckCircle, Send, MessageSquare, User, Building, FileText } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactFormSchema, type ContactFormData } from "@/app/lib/validations"
import { cn } from "@/app/lib/utils"

// Security features for demonstration
const securityFeatures = [
  {
    icon: Shield,
    title: "Input Validation",
    description: "All form inputs are validated using Zod schemas with strict type checking and malicious pattern detection.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10"
  },
  {
    icon: Lock,
    title: "Data Sanitization",
    description: "User input is sanitized to prevent XSS attacks and injection vulnerabilities before processing.",
    color: "text-green-400",
    bgColor: "bg-green-400/10"
  },
  {
    icon: Eye,
    title: "Rate Limiting",
    description: "Contact form submissions are rate-limited to prevent spam and abuse of the service.",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10"
  },
  {
    icon: AlertTriangle,
    title: "Privacy Protection",
    description: "Your data is processed securely and never shared with third parties without consent.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10"
  }
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange"
  })

  // Watch form values for real-time character count
  const watchedMessage = watch("message", "")
  const watchedSubject = watch("subject", "")

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call - replace with actual endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage('Thank you for your message! I\'ll get back to you within 24 hours.')
        reset()
      } else {
        throw new Error('Failed to send message')
      }
    } catch {
      setSubmitStatus('error')
      setSubmitMessage('Failed to send message. Please try again or contact me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="min-h-screen matrix-bg py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-green-400 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <Mail className="w-10 h-10 text-cyan-400" />
              <div>
                <h1 className="text-5xl font-bold mb-2">
                  <span className="cyber-glow text-cyan-400">Get In</span>{" "}
                  <span className="text-green-400">Touch</span>
                </h1>
                <p className="text-xl text-gray-400">
                  <span className="text-green-400 font-mono">$</span> ./contact --secure --encrypted --verified
                </p>
              </div>
            </div>
            
            <div className="security-card p-6 max-w-4xl">
              <p className="text-lg text-gray-300 leading-relaxed">
                Ready to discuss your cybersecurity needs? Whether you&rsquo;re looking for
                <span className="text-cyan-400 font-semibold"> penetration testing</span>,
                <span className="text-green-400 font-semibold"> security consulting</span>, or
                <span className="text-purple-400 font-semibold"> application security review</span>,
                I&rsquo;m here to help strengthen your digital defenses.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="security-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Send className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-2xl font-bold">Secure Contact Form</h2>
                </div>

                {/* Security Notice */}
                <div className="mb-6 p-4 bg-cyan-400/5 border border-cyan-400/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-cyan-400 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-cyan-400 font-semibold mb-1">Security Notice</p>
                      <p className="text-gray-300">
                        This form implements comprehensive security measures including input validation, 
                        sanitization, and rate limiting. Your data is processed securely and privately.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <input
                        {...register("name")}
                        type="text"
                        id="name"
                        className={cn(
                          "w-full pl-11 pr-4 py-3 bg-gray-900/50 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 text-gray-100",
                          errors.name
                            ? "border-red-400 focus:ring-red-400/50"
                            : "border-gray-600 focus:ring-cyan-400/50 focus:border-cyan-400"
                        )}
                        placeholder="Your full name"
                        maxLength={50}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <input
                        {...register("email")}
                        type="email"
                        id="email"
                        className={cn(
                          "w-full pl-11 pr-4 py-3 bg-gray-900/50 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 text-gray-100",
                          errors.email
                            ? "border-red-400 focus:ring-red-400/50"
                            : "border-gray-600 focus:ring-cyan-400/50 focus:border-cyan-400"
                        )}
                        placeholder="your.email@example.com"
                        maxLength={100}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Company Field */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company/Organization <span className="text-gray-500">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <input
                        {...register("company")}
                        type="text"
                        id="company"
                        className={cn(
                          "w-full pl-11 pr-4 py-3 bg-gray-900/50 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 text-gray-100",
                          errors.company
                            ? "border-red-400 focus:ring-red-400/50"
                            : "border-gray-600 focus:ring-cyan-400/50 focus:border-cyan-400"
                        )}
                        placeholder="Your company or organization"
                        maxLength={100}
                      />
                    </div>
                    {errors.company && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <input
                        {...register("subject")}
                        type="text"
                        id="subject"
                        className={cn(
                          "w-full pl-11 pr-4 py-3 bg-gray-900/50 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 text-gray-100",
                          errors.subject
                            ? "border-red-400 focus:ring-red-400/50"
                            : "border-gray-600 focus:ring-cyan-400/50 focus:border-cyan-400"
                        )}
                        placeholder="Brief subject line"
                        maxLength={200}
                      />
                      <div className="absolute right-3 top-3 text-xs text-gray-500">
                        {watchedSubject?.length || 0}/200
                      </div>
                    </div>
                    {errors.subject && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <textarea
                        {...register("message")}
                        id="message"
                        rows={6}
                        className={cn(
                          "w-full pl-11 pr-16 py-3 bg-gray-900/50 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 text-gray-100 resize-vertical",
                          errors.message
                            ? "border-red-400 focus:ring-red-400/50"
                            : "border-gray-600 focus:ring-cyan-400/50 focus:border-cyan-400"
                        )}
                        placeholder="Describe your cybersecurity needs, project requirements, or questions..."
                        maxLength={2000}
                      />
                      <div className="absolute right-3 bottom-3 text-xs text-gray-500">
                        {watchedMessage?.length || 0}/2000
                      </div>
                    </div>
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Status */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-400/10 border border-green-400/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <p className="text-green-400 font-semibold mb-1">Message Sent Successfully!</p>
                          <p className="text-gray-300 text-sm">{submitMessage}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-400/10 border border-red-400/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                        <div>
                          <p className="text-red-400 font-semibold mb-1">Message Failed to Send</p>
                          <p className="text-gray-300 text-sm">{submitMessage}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      className={cn(
                        "flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300",
                        isValid && !isSubmitting
                          ? "bg-cyan-400 text-black hover:bg-green-400 shadow-lg shadow-cyan-400/25 hover:shadow-green-400/25"
                          : "bg-gray-600 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Secure Message
                        </>
                      )}
                    </button>
                    
                    <div className="text-sm text-gray-400">
                      Form validation: {isValid ? (
                        <span className="text-green-400">✓ Valid</span>
                      ) : (
                        <span className="text-yellow-400">⚠ Incomplete</span>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="security-card p-6">
                <h3 className="text-xl font-bold mb-4 text-green-400">Direct Contact</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <p className="text-gray-300 font-mono text-sm">security@example.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Response Time</p>
                    <p className="text-gray-300">Within 24 hours</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Consultation</p>
                    <p className="text-gray-300">Free initial assessment</p>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="security-card p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Form Security</h3>
                <div className="space-y-4">
                  {securityFeatures.map((feature) => {
                    const Icon = feature.icon
                    
                    return (
                      <div key={feature.title} className="flex gap-3">
                        <div className={cn("p-2 rounded", feature.bgColor)}>
                          <Icon className={cn("w-4 h-4", feature.color)} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{feature.title}</h4>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Privacy Policy */}
              <div className="security-card p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-400">Privacy Commitment</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-purple-400 rounded-full mt-2"></div>
                    <p>Your data is never shared with third parties</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-purple-400 rounded-full mt-2"></div>
                    <p>All communications are encrypted in transit</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-purple-400 rounded-full mt-2"></div>
                    <p>Data is processed according to security best practices</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-purple-400 rounded-full mt-2"></div>
                    <p>Contact information is used solely for communication</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="security-card p-6">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    href="/projects"
                    className="block p-3 bg-gray-800/50 rounded border border-gray-600 hover:border-cyan-400/50 transition-colors text-sm"
                  >
                    <span className="text-cyan-400 font-semibold">View Portfolio</span>
                    <p className="text-gray-400 text-xs">See my security work and case studies</p>
                  </Link>
                  <Link
                    href="/skills"
                    className="block p-3 bg-gray-800/50 rounded border border-gray-600 hover:border-green-400/50 transition-colors text-sm"
                  >
                    <span className="text-green-400 font-semibold">Technical Skills</span>
                    <p className="text-gray-400 text-xs">Explore my cybersecurity expertise</p>
                  </Link>
                  <Link
                    href="/certifications"
                    className="block p-3 bg-gray-800/50 rounded border border-gray-600 hover:border-purple-400/50 transition-colors text-sm"
                  >
                    <span className="text-purple-400 font-semibold">Certifications</span>
                    <p className="text-gray-400 text-xs">Professional credentials and training</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
