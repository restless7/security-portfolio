"use client"

import { Award, ArrowLeft, ExternalLink, CheckCircle, Clock, Shield, Zap, Code, Search, Lock, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/app/lib/utils"

// Certifications data
const certifications = [
  {
    id: "cissp",
    name: "Certified Information Systems Security Professional",
    abbreviation: "CISSP",
    issuer: "ISC²",
    status: "Active",
    issueDate: "2023-03-15",
    expiryDate: "2026-03-15",
    credentialId: "123456",
    verificationUrl: "#",
    category: "Security Management",
    icon: Shield,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    level: "Advanced",
    description: "Advanced security professional certification covering security and risk management, asset security, security architecture and engineering.",
    domains: [
      "Security and Risk Management",
      "Asset Security", 
      "Security Architecture and Engineering",
      "Communication and Network Security",
      "Identity and Access Management",
      "Security Assessment and Testing",
      "Security Operations",
      "Software Development Security"
    ]
  },
  {
    id: "ceh",
    name: "Certified Ethical Hacker",
    abbreviation: "CEH",
    issuer: "EC-Council",
    status: "Active",
    issueDate: "2022-11-20",
    expiryDate: "2025-11-20",
    credentialId: "ECC456789",
    verificationUrl: "#",
    category: "Penetration Testing",
    icon: Zap,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    level: "Intermediate",
    description: "Comprehensive ethical hacking methodology and penetration testing certification focusing on offensive security techniques.",
    domains: [
      "Footprinting and Reconnaissance",
      "Scanning Networks",
      "Enumeration",
      "Vulnerability Analysis",
      "System Hacking",
      "Malware Threats",
      "Sniffing",
      "Social Engineering"
    ]
  },
  {
    id: "oscp",
    name: "Offensive Security Certified Professional",
    abbreviation: "OSCP",
    issuer: "Offensive Security",
    status: "In Progress",
    issueDate: null,
    expiryDate: null,
    credentialId: null,
    verificationUrl: null,
    category: "Penetration Testing",
    icon: Code,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    level: "Advanced",
    description: "Hands-on penetration testing certification requiring 24-hour practical exam in a controlled environment.",
    domains: [
      "Information Gathering",
      "Buffer Overflows",
      "Web Application Attacks",
      "Client-Side Attacks",
      "Antivirus Evasion",
      "Password Attacks",
      "Port Redirection",
      "Active Directory Attacks"
    ]
  },
  {
    id: "gsec",
    name: "GIAC Security Essentials",
    abbreviation: "GSEC",
    issuer: "SANS/GIAC",
    status: "Active",
    issueDate: "2023-01-10",
    expiryDate: "2027-01-10",
    credentialId: "GIAC789012",
    verificationUrl: "#",
    category: "Security Foundation",
    icon: Lock,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    level: "Foundation",
    description: "Foundational security certification covering hands-on security skills and practical application of security concepts.",
    domains: [
      "Active Defense",
      "Cryptography",
      "Incident Handling",
      "Linux Security",
      "Network Security",
      "Risk Management",
      "Vulnerability Assessment",
      "Windows Security"
    ]
  },
  {
    id: "ccsp",
    name: "Certified Cloud Security Professional",
    abbreviation: "CCSP",
    issuer: "ISC²",
    status: "Planned",
    issueDate: null,
    expiryDate: null,
    credentialId: null,
    verificationUrl: null,
    category: "Cloud Security",
    icon: Eye,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    level: "Advanced",
    description: "Advanced cloud security certification focusing on cloud architecture, design, operations and service orchestration.",
    domains: [
      "Cloud Concepts & Architecture",
      "Cloud Data Security",
      "Cloud Platform & Infrastructure Security",
      "Cloud Application Security",
      "Cloud Security Operations",
      "Legal Risk & Compliance"
    ]
  }
]

const certificationStats = {
  active: certifications.filter(c => c.status === "Active").length,
  inProgress: certifications.filter(c => c.status === "In Progress").length,
  planned: certifications.filter(c => c.status === "Planned").length,
  totalDomains: certifications.reduce((acc, cert) => acc + cert.domains.length, 0)
}

export default function CertificationsPage() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "In Progress":
        return <Clock className="w-5 h-5 text-yellow-400" />
      case "Planned":
        return <Clock className="w-5 h-5 text-gray-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-400 bg-green-400/10 border-green-400/30"
      case "In Progress":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30"
      case "Planned":
        return "text-gray-400 bg-gray-400/10 border-gray-400/30"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/30"
    }
  }

  const filteredCertifications = filter === "all" 
    ? certifications 
    : certifications.filter(cert => cert.status.toLowerCase().replace(" ", "-") === filter)

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
              <Award className="w-10 h-10 text-yellow-400" />
              <div>
                <h1 className="text-5xl font-bold mb-2">
                  <span className="cyber-glow text-yellow-400">Security</span>{" "}
                  <span className="text-cyan-400">Credentials</span>
                </h1>
                <p className="text-xl text-gray-400">
                  <span className="text-green-400 font-mono">$</span> ./verify --credentials --status --domains
                </p>
              </div>
            </div>
            
            <div className="security-card p-6 max-w-4xl">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Professional cybersecurity certifications demonstrating expertise across multiple security domains. 
                Each certification represents rigorous training, hands-on experience, and validated knowledge in 
                <span className="text-cyan-400 font-semibold"> offensive security</span>,
                <span className="text-green-400 font-semibold"> defensive operations</span>, and
                <span className="text-blue-400 font-semibold"> security management</span>.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{certificationStats.active}</div>
                  <p className="text-xs text-gray-400">Active Certifications</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{certificationStats.inProgress}</div>
                  <p className="text-xs text-gray-400">In Progress</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-400">{certificationStats.planned}</div>
                  <p className="text-xs text-gray-400">Planned</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{certificationStats.totalDomains}</div>
                  <p className="text-xs text-gray-400">Knowledge Domains</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-4">
              {["all", "active", "in-progress", "planned"].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm",
                    filter === filterOption
                      ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/50"
                      : "bg-gray-800/50 text-gray-400 border border-gray-600 hover:border-cyan-400/50 hover:text-cyan-400"
                  )}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1).replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {filteredCertifications.map((cert) => {
              const Icon = cert.icon
              const isSelected = selectedCert === cert.id
              
              return (
                <div
                  key={cert.id}
                  className={cn(
                    "security-card p-8 cursor-pointer transition-all duration-300",
                    isSelected && "ring-2 ring-cyan-400/50 scale-105"
                  )}
                  onClick={() => setSelectedCert(isSelected ? null : cert.id)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={cn("p-3 rounded-lg", cert.bgColor)}>
                        <Icon className={cn("w-8 h-8", cert.color)} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{cert.abbreviation}</h3>
                        <p className="text-sm text-gray-400">{cert.issuer}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className={cn("flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium", getStatusColor(cert.status))}>
                        {getStatusIcon(cert.status)}
                        {cert.status}
                      </div>
                      <span className="text-xs text-gray-500">{cert.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{cert.name}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{cert.description}</p>
                    </div>

                    {/* Dates and Verification */}
                    {cert.status === "Active" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Issue Date:</span>
                          <span className="text-gray-300">{cert.issueDate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Expires:</span>
                          <span className="text-gray-300">{cert.expiryDate}</span>
                        </div>
                        {cert.credentialId && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Credential ID:</span>
                            <span className="font-mono text-cyan-400 text-xs">{cert.credentialId}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Knowledge Domains Preview */}
                    <div>
                      <p className="text-xs text-gray-400 mb-2">KNOWLEDGE DOMAINS</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.domains.slice(0, 4).map((domain) => (
                          <span 
                            key={domain}
                            className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded border border-gray-600"
                          >
                            {domain}
                          </span>
                        ))}
                        {cert.domains.length > 4 && (
                          <span className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded border border-gray-600">
                            +{cert.domains.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Verification Link */}
                    {cert.verificationUrl && cert.status === "Active" && (
                      <div className="pt-4 border-t border-gray-700">
                        <Link
                          href={cert.verificationUrl}
                          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-green-400 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Verify Credential
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Detailed View */}
          {selectedCert && (
            <div className="mb-16">
              {filteredCertifications
                .filter(cert => cert.id === selectedCert)
                .map((cert) => {
                  const Icon = cert.icon
                  
                  return (
                    <div key={cert.id} className="security-card p-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className={cn("p-4 rounded-lg border", cert.bgColor, cert.color.replace("text-", "border-"))}>
                          <Icon className={cn("w-10 h-10", cert.color)} />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold mb-2">{cert.name}</h2>
                          <p className="text-xl text-gray-400">{cert.issuer} • {cert.level} Level</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* All Domains */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-cyan-400">Knowledge Domains</h3>
                          <div className="space-y-3">
                            {cert.domains.map((domain, index) => (
                              <div key={domain} className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-cyan-400/10 rounded border border-cyan-400/30 flex items-center justify-center">
                                  <span className="text-xs text-cyan-400 font-mono">{index + 1}</span>
                                </div>
                                <span className="text-gray-300">{domain}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-6">
                          {cert.status === "Active" && (
                            <div className="p-6 bg-green-400/5 border border-green-400/20 rounded-lg">
                              <h4 className="text-lg font-semibold text-green-400 mb-4">Certification Details</h4>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Status:</span>
                                  <span className="text-green-400 font-semibold">Active & Current</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Issue Date:</span>
                                  <span className="text-gray-300">{cert.issueDate}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Valid Until:</span>
                                  <span className="text-gray-300">{cert.expiryDate}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Credential ID:</span>
                                  <span className="font-mono text-cyan-400">{cert.credentialId}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {cert.status === "In Progress" && (
                            <div className="p-6 bg-yellow-400/5 border border-yellow-400/20 rounded-lg">
                              <h4 className="text-lg font-semibold text-yellow-400 mb-4">Certification Progress</h4>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Status:</span>
                                  <span className="text-yellow-400 font-semibold">In Progress</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Study Phase:</span>
                                  <span className="text-gray-300">Active Preparation</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Target Date:</span>
                                  <span className="text-gray-300">Q2 2024</span>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="p-6 bg-gray-800/30 border border-gray-600 rounded-lg">
                            <h4 className="text-lg font-semibold text-cyan-400 mb-4">Professional Impact</h4>
                            <p className="text-sm text-gray-300 leading-relaxed">
                              This certification demonstrates advanced expertise in {cert.category.toLowerCase()} 
                              and validates the ability to implement, manage, and assess security controls 
                              across complex enterprise environments.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          )}

          {/* Continuous Learning */}
          <div className="security-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-cyan-400">Continuous</span>{" "}
                <span className="text-green-400">Learning</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Cybersecurity is an ever-evolving field. Maintaining current certifications 
                and pursuing advanced credentials ensures cutting-edge expertise.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-800/30 rounded-lg border border-gray-600">
                <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Active Study</h3>
                <p className="text-sm text-gray-400">Currently preparing for OSCP practical examination</p>
              </div>
              
              <div className="text-center p-6 bg-gray-800/30 rounded-lg border border-gray-600">
                <Award className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Renewal</h3>
                <p className="text-sm text-gray-400">Maintaining CPE credits for active certifications</p>
              </div>
              
              <div className="text-center p-6 bg-gray-800/30 rounded-lg border border-gray-600">
                <Search className="w-8 h-8 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Research</h3>
                <p className="text-sm text-gray-400">Staying current with emerging security frameworks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
