"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowLeft, Shield, Lock, PanelLeftClose, Cog, Globe, Bug, ExternalLink } from "lucide-react"
import { cn } from "@/app/lib/utils"

type Project = {
  id: string
  title: string
  subtitle: string
  summary: string
  type: "AppSec" | "Pentest" | "Cloud" | "DevSecOps"
  stack: string[]
  security: string[]
  metrics: { label: string; value: string; color: string }[]
  details: { heading: string; bullets: string[] }[]
  links?: { label: string; href: string }[]
  badge?: string
}

const projects: Project[] = [
  {
    id: "apex-appsec",
    title: "APEX AI Solutions",
    subtitle: "Securing a Full-Stack SaaS from Day 0",
    summary:
      "Hardened a production-grade SaaS with authentication hardening, strict CSP, API schema validation, and zero-trust data flows.",
    type: "AppSec",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
    security: [
      "Strict CSP & security headers",
      "Zod validation across 40+ endpoints",
      "AuthZ/AuthN hardening",
      "Secrets rotation & key management",
      "Abuse controls & rate limiting"
    ],
    metrics: [
      { label: "Endpoints Secured", value: "40+", color: "text-cyan-400" },
      { label: "A+ Headers", value: "Mozilla", color: "text-green-400" },
      { label: "Vulns Closed", value: ">35", color: "text-purple-400" },
    ],
    details: [
      {
        heading: "Controls Implemented",
        bullets: [
          "Defense-in-depth headers (CSP, HSTS, FEO, CTO, RP, Permissions-Policy)",
          "Server-first data fetching to reduce client attack surface",
          "End-to-end input validation with Zod, safe parsing, and error discipline",
          "Centralized secrets via environment scopes and least privilege",
        ],
      },
      {
        heading: "Threats Addressed",
        bullets: [
          "XSS via DOM sinks & third-party scripts",
          "CSRF on sensitive POST actions (enforced same-site + double-submit where needed)",
          "AuthZ bypass on multi-tenant resources",
          "Abuse/spam on public forms and webhook endpoints",
        ],
      },
    ],
    links: [
      { label: "Security Posture", href: "/security-posture" },
      { label: "Tech Stack", href: "/skills" },
    ],
    badge: "Featured",
  },
  {
    id: "portfolio-meta",
    title: "This Portfolio",
    subtitle: "Meta-Security Showcase",
    summary:
      "The site itself demonstrates best practices: hardened headers, validated APIs, sanitized output, and live posture checks.",
    type: "DevSecOps",
    stack: ["Next.js", "Tailwind", "Zod", "Vercel"],
    security: [
      "A+ security headers",
      "Input sanitization & schema validation",
      "Contact API rate limiting",
      "No client secrets; server-only keys",
    ],
    metrics: [
      { label: "Headers Grade", value: "A+", color: "text-green-400" },
      { label: "APIs Validated", value: "100%", color: "text-cyan-400" },
      { label: "Critical Vulns", value: "0", color: "text-red-400" },
    ],
    details: [
      {
        heading: "Engineering Notes",
        bullets: [
          "RSC-first architecture to minimize client exposure",
          "Contact form uses Zod + sanitization + rate limit",
          "OPTIONS handler and strict method allowlist on APIs",
          "No dangerouslySetInnerHTML; controlled rendering only",
        ],
      },
    ],
    links: [
      { label: "Run Live Check", href: "/security-posture" },
    ],
    badge: "Meta",
  },
  {
    id: "cloud-hardening",
    title: "Cloud Hardening Playbook",
    subtitle: "AWS Baselines for Real-World Teams",
    summary:
      "Codified cloud guardrails: IAM least-privilege, secure SG defaults, S3 policies, and baseline detective controls.",
    type: "Cloud",
    stack: ["AWS", "Terraform", "GuardDuty", "Config"],
    security: [
      "IAM role boundaries & SCPs",
      "GuardDuty & Security Hub baselines",
      "Encrypted-at-rest & in-transit defaults",
      "Least-privilege CI/CD runners",
    ],
    metrics: [
      { label: "Misconfigs Prevented", value: "50+", color: "text-yellow-400" },
      { label: "Accounts Secured", value: "7", color: "text-cyan-400" },
      { label: "Drift Alerts", value: "Zero", color: "text-green-400" },
    ],
    details: [
      {
        heading: "Highlights",
        bullets: [
          "Service control policies to prevent public S3, wide-open SGs",
          "Centralized logs, immutable retention, and alarms",
          "KMS-backed encryption with key rotation policies",
        ],
      },
    ],
  },
  {
    id: "redteam-web",
    title: "Web App Red Team",
    subtitle: "From Recon to Remediation",
    summary:
      "Simulated attacker workflows uncovered chained issues across auth, session handling, and third-party integrations.",
    type: "Pentest",
    stack: ["Burp Suite", "ZAP", "Nmap", "Python"],
    security: [
      "Recon & attack surface mapping",
      "Auth/session weaknesses documented",
      "Exploit proof-of-concepts (safe env)",
      "Guided remediation + retest",
    ],
    metrics: [
      { label: "Findings", value: "23", color: "text-purple-400" },
      { label: "Critical", value: "4", color: "text-red-400" },
      { label: "Time-to-Fix", value: "< 2w", color: "text-green-400" },
    ],
    details: [
      {
        heading: "Impact",
        bullets: [
          "Eliminated token leakage via 3rd-party widget",
          "Upgraded session handling; mitigated fixation",
          "Introduced CSP nonces; removed inline JS",
        ],
      },
    ],
  },
]

const typeOptions = ["All", "AppSec", "Pentest", "Cloud", "DevSecOps"] as const

export default function ProjectsPage() {
  const [typeFilter, setTypeFilter] = useState<(typeof typeOptions)[number]>("All")
  const [stackFilter, setStackFilter] = useState<string>("All")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const allStacks = useMemo(() => {
    const s = new Set<string>()
    projects.forEach(p => p.stack.forEach(t => s.add(t)))
    return ["All", ...Array.from(s)]
  }, [])

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const typeOk = typeFilter === "All" || p.type === typeFilter
      const stackOk = stackFilter === "All" || p.stack.includes(stackFilter)
      return typeOk && stackOk
    })
  }, [typeFilter, stackFilter])

  const TypeIcon = ({ type }: { type: Project["type"] }) => {
    switch (type) {
      case "AppSec":
        return <Lock className="w-4 h-4" />
      case "Pentest":
        return <Bug className="w-4 h-4" />
      case "Cloud":
        return <Globe className="w-4 h-4" />
      case "DevSecOps":
        return <Cog className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen matrix-bg py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-green-400 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-8 h-8 text-cyan-400" />
              <h1 className="text-4xl font-bold">Security Projects</h1>
            </div>

            <p className="text-lg text-gray-400 max-w-3xl">
              Evidence-driven case studies that prioritize measurable security outcomes. No hype—just
              hardened systems, closed vulnerabilities, and repeatable controls.
            </p>
          </div>

          {/* Filters */}
          <div className="security-card p-4 mb-10">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm border transition-colors",
                      typeFilter === t
                        ? "border-cyan-400/40 text-cyan-400 bg-cyan-400/10"
                        : "border-gray-600 text-gray-400 hover:border-cyan-400/40 hover:text-cyan-300"
                    )}
                  >
                    <span className="inline-flex items-center gap-2">
                      <TypeIcon type={(t === "All" ? "DevSecOps" : (t as Project["type"]))} />
                      {t}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <PanelLeftClose className="w-4 h-4 text-gray-500" />
                <select
                  value={stackFilter}
                  onChange={(e) => setStackFilter(e.target.value)}
                  className="bg-gray-900/60 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-400"
                >
                  {allStacks.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {filtered.map((p) => (
              <div key={p.id} className="security-card p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 inline-flex items-center gap-1">
                        <TypeIcon type={p.type} /> {p.type}
                      </span>
                      {p.badge && (
                        <span className="px-2 py-1 text-xs rounded bg-green-400/10 text-green-300 border border-green-400/30">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold">{p.title}</h3>
                    <p className="text-sm text-gray-400">{p.subtitle}</p>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-gray-300 leading-relaxed mb-4">{p.summary}</p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {p.metrics.map(m => (
                    <div key={m.label} className="text-center p-3 bg-gray-800/30 rounded border border-gray-700">
                      <div className={cn("text-lg font-semibold", m.color)}>{m.value}</div>
                      <div className="text-[11px] text-gray-400">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Security Features */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">SECURITY CONTROLS</p>
                  <div className="flex flex-wrap gap-2">
                    {p.security.map(s => (
                      <span key={s} className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded border border-gray-600">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stack */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">TECH STACK</p>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map(s => (
                      <span key={s} className="px-2 py-1 bg-cyan-400/10 text-cyan-300 text-xs rounded border border-cyan-400/30">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                {p.links && p.links.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-3">
                    {p.links.map(l => (
                      <Link key={l.href} href={l.href} className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-green-400 transition-colors">
                        <ExternalLink className="w-4 h-4" /> {l.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Expand */}
                <button
                  onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                  className="mt-2 w-full px-3 py-2 text-sm rounded border border-gray-600 hover:border-cyan-400/40 text-gray-300 hover:text-cyan-300 transition-colors"
                >
                  {expandedId === p.id ? "Hide Case Study" : "View Case Study"}
                </button>

                {expandedId === p.id && (
                  <div className="mt-6 space-y-6 border-t border-gray-700 pt-6">
                    {p.details.map(d => (
                      <div key={d.heading}>
                        <h4 className="text-sm font-semibold text-green-400 mb-2">{d.heading}</h4>
                        <ul className="space-y-2">
                          {d.bullets.map(b => (
                            <li key={b} className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0"></span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="security-card p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-cyan-400">Need a</span> <span className="text-green-400">Security Partner?</span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              I help teams harden systems, reduce attack surface, and build security into the development lifecycle.
              Let’s turn security into a competitive advantage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="terminal-border rounded-md bg-cyan-400 px-6 py-3 text-sm font-semibold text-black shadow-sm hover:bg-green-400 transition-all duration-300">
                Discuss Your Project
              </Link>
              <Link href="/security-posture" className="security-card px-6 py-3 text-sm font-semibold text-cyan-400 hover:text-green-400 transition-colors duration-300">
                See My Security Approach
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
