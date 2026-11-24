"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  ExternalLink,
  Layers,
  Server,
  Shield,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { NextModuleCTA } from "@/app/components/NextModuleCTA";

type ProjectCategory =
  | "AI & Agentic Engineering"
  | "Enterprise Platforms"
  | "Security Engineering"
  | "Infrastructure & Tools"
  | "Data & Integration";

type MaturityLevel =
  | "Production"
  | "Local Pilot"
  | "Active Architecture"
  | "Internal Service"
  | "R&D Prototype"
  | "Reference Blueprint";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  category: ProjectCategory;
  featured: boolean;
  maturity: MaturityLevel;
  boundary: string;
  role: string;
  stack: string[];
  controls: string[];
  details: { heading: string; bullets: string[] }[];
  links?: { label: string; href: string; external?: boolean }[];
};

const filterCategories: Array<"All" | "Featured Systems" | ProjectCategory> = [
  "All",
  "Featured Systems",
  "AI & Agentic Engineering",
  "Enterprise Platforms",
  "Security Engineering",
  "Infrastructure & Tools",
  "Data & Integration",
];

const projects: Project[] = [
  {
    id: "apex-second-brain",
    title: "APEX Platform & Second Brain",
    subtitle: "Governed Organizational Memory & Dual-Engine Enterprise Architecture",
    summary:
      "Modular platform architecture pairing an institutional Knowledge OS (pgvector retrieval, provenance traversal, claim governance) with an Operations OS, plus a Second Brain subsystem designed for fail-closed tenant and ACL isolation.",
    category: "AI & Agentic Engineering",
    featured: true,
    maturity: "Active Architecture",
    boundary: "Pre-vector database ACL filtering & typed ports",
    role: "Systems Architect & Principal Builder",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "Prisma", "MCP"],
    controls: [
      "Tenant, workspace & ACL filtered in SQL before vector ranking",
      "Server-derived actor principal (never client-declared)",
      "Typed repository/model/audit ports for provider isolation",
      "K0–K8 admission lifecycle & decision lineage records",
    ],
    details: [
      {
        heading: "Context & Engineering Challenge",
        bullets: [
          "Standard RAG pipelines leak restricted documents when access checks run post-retrieval or rely on prompt instructions.",
          "Needed a unified architecture supporting citations, decision memory, and strict multi-workspace boundaries across internal teams first.",
        ],
      },
      {
        heading: "Architecture & Design Choices",
        bullets: [
          "Modular monolith separated into bounded contexts (Identity, Registry, Admission, Processing, Retrieval, Decision Memory, Answer Orchestration) with typed ports.",
          "Separated Knowledge OS (epistemic memory) from Operations OS (heartbeat & incident telemetry) over documented contracts.",
        ],
      },
      {
        heading: "Implementation Evidence & Maturity",
        bullets: [
          "Documented in ADR-SB-0001 through ADR-SB-0006 and SB-001 through SB-090 specifications alongside platform code in packages/apex-website.",
          "Current status: internal architecture and staging implementation baseline (not externally board-certified for commercial production rollout).",
        ],
      },
    ],
    links: [
      { label: "APEX AI Solutions", href: "https://www.apexaisolutions.dev/", external: true },
      { label: "Engineering Expertise", href: "/skills" },
    ],
  },
  {
    id: "apex-intelligence",
    title: "APEX Intelligence Workstation",
    subtitle: "Sovereign Corporate Registry Analysis & Isolated Pilot Runtime",
    summary:
      "Standalone analytical application ingesting and reconciling regional Chamber of Commerce datasets on an isolated PostgreSQL 16 database with Force Row-Level Security and a zero-dependency process supervisor.",
    category: "Data & Integration",
    featured: true,
    maturity: "Local Pilot",
    boundary: "Unix socket Postgres + FORCE RLS + AES-256-GCM",
    role: "Architect & Full-Stack Developer",
    stack: ["Next.js 16", "PostgreSQL 16", "Prisma", "FORCE RLS", "Node.js"],
    controls: [
      "PostgreSQL bound exclusively to Unix domain socket (listen_addresses='')",
      "PostgreSQL Force Row-Level Security (FORCE RLS) & AES-256-GCM data layer",
      "Decoupled from external auth providers and CRM pipelines",
      "Loopback-only web service (127.0.0.1) with strict CSP & dynamic nonces",
    ],
    details: [
      {
        heading: "Context & Engineering Challenge",
        bullets: [
          "Regional registry intelligence requires deterministic entity reconciliation and strict isolation from commercial web properties and third-party auth.",
        ],
      },
      {
        heading: "Architecture & Design Choices",
        bullets: [
          "Implemented an independent Next.js workstation with a dedicated PostgreSQL 16 cluster, background worker daemon, and standalone supervisor script (scripts/pilot.cjs).",
          "Enforced zero network port exposure on the database tier by communicating strictly over Unix domain sockets.",
        ],
      },
      {
        heading: "Implementation Evidence & Maturity",
        bullets: [
          "Implemented and locally validated in packages/apex-intelligence as an active sovereign pilot workstation.",
          "Tradeoff: intentionally single-node and loopback-bound while hardening reconciliation rules before broader deployment.",
        ],
      },
    ],
  },
  {
    id: "apex-cyber-core",
    title: "Apex Cyber Core Engine",
    subtitle: "Rust Security Daemon with eBPF Telemetry, CFG Taint Analysis & gRPC",
    summary:
      "Experimental low-level security engine in Rust exploring Aya eBPF syscall tracepoints, tree-sitter/petgraph AST control-flow taint tracking, Blake3 PII masking, and gRPC over Unix domain sockets.",
    category: "Security Engineering",
    featured: true,
    maturity: "R&D Prototype",
    boundary: "AF_UNIX gRPC IPC & no_std eBPF segregation",
    role: "Systems & Security Researcher",
    stack: ["Rust", "Aya eBPF", "tree-sitter", "petgraph", "Blake3", "Tonic gRPC"],
    controls: [
      "Tracepoint hook on sys_enter_execve with #[cfg(target_arch = \"bpf\")] boundary",
      "Deterministic Directed Graph (petgraph) source-to-sink taint analysis",
      "Irreversible Blake3 PII token masking before upstream telemetry",
      "Local gRPC transport over Unix Domain Sockets (AF_UNIX)",
    ],
    details: [
      {
        heading: "Context & Engineering Challenge",
        bullets: [
          "Regex-based static scanners miss multi-hop data flows, and raw telemetry pipelines risk leaking PII outside local trust boundaries.",
        ],
      },
      {
        heading: "Architecture & Design Choices",
        bullets: [
          "Structured Rust workspace across src/ebpf, src/symbolic, src/crypto, and src/ipc backed by proto/security.proto.",
          "Used petgraph DiGraphs to model AST semantics from entry sources to sensitive execution sinks and Blake3 for deterministic masking.",
        ],
      },
      {
        heading: "Implementation Evidence & Maturity",
        bullets: [
          "Implemented in packages/apex-cyber-core (Cargo.toml, src/*, proto/security.proto) as an R&D systems prototype.",
          "Honest maturity note: performance figures are not claimed without standardized benchmark runs in target production environments.",
        ],
      },
    ],
  },
  {
    id: "ice-ecosystem",
    title: "ICE Colombia Operations & AI Ecosystem",
    subtitle: "Client Portal, Public Web & Decoupled WhatsApp RAG Automation",
    summary:
      "Production client ecosystem combining a Next.js public funnel and administrative program portal with a PostgreSQL/Prisma backend and an asynchronous WhatsApp AI RAG webhook pipeline.",
    category: "Enterprise Platforms",
    featured: true,
    maturity: "Production",
    boundary: "Meta 10s webhook SLA decoupling via setImmediate()",
    role: "Full-Stack & Infrastructure Engineer",
    stack: ["Next.js 15", "PostgreSQL", "Prisma", "Nginx", "systemd", "Cloudflared"],
    controls: [
      "Immediate HTTP 200 webhook ack + setImmediate() macro-task RAG execution",
      "Singleton Prisma client pool management under async API load",
      "Nginx reverse proxy & systemd service supervision",
      "Sanitized architecture presentation protecting client host details",
    ],
    details: [
      {
        heading: "Context & Engineering Challenge",
        bullets: [
          "Meta WhatsApp webhook delivery enforces a strict timeout window (<10s) before retrying and saturating origin servers during LLM/RAG inference.",
        ],
      },
      {
        heading: "Architecture & Design Choices",
        bullets: [
          "Separated ingress acknowledgment from RAG execution using Node.js setImmediate() handoff, paired with a global Prisma singleton to avoid connection exhaustion.",
          "Served behind Nginx and supervised via systemd with tunnel redundancy.",
        ],
      },
      {
        heading: "Implementation Evidence & Maturity",
        bullets: [
          "Production-deployed client system (packages/ice-website and operational runbooks). Private server identifiers, IPs, and credentials are intentionally omitted.",
        ],
      },
    ],
  },
  {
    id: "sentineldev-portfolio",
    title: "SentinelDev Security-First Portfolio",
    subtitle: "Personal Architecture Showcase & Live Security Header Posture",
    summary:
      "The codebase powering sentineldev.me: Next.js App Router site pairing editorial portfolio presentation with CSP, HSTS, Zod input validation, sliding-window rate limiting, and live posture diagnostics.",
    category: "Security Engineering",
    featured: true,
    maturity: "Production",
    boundary: "CSP + HSTS + Zod + Rate-limited API routes",
    role: "Author & Maintainer",
    stack: ["Next.js 15", "React 19", "TypeScript", "Zod", "Tailwind CSS", "Jest"],
    controls: [
      "Strict CSP, HSTS preload, X-Frame-Options: DENY, Permissions-Policy",
      "Zod schema validation and output sanitization on contact & lead routes",
      "Rate limiting with 429 Retry-After responses",
      "Automated Jest security suite and header verification scripts",
    ],
    details: [
      {
        heading: "Architecture & Design Choices",
        bullets: [
          "Security headers enforced centrally in next.config.ts alongside Zod schemas in app/lib/validations.ts and rate-limited API handlers.",
          "Transparently distinguishes live application control checks (/api/security-posture) from external third-party audits.",
        ],
      },
      {
        heading: "Implementation Evidence & Maturity",
        bullets: [
          "Deployed on sentineldev.me and verified locally via TypeScript, Jest security tests, and HTTP header inspection.",
        ],
      },
    ],
    links: [
      { label: "Live Security Posture", href: "/security-posture" },
      { label: "GitHub Repo", href: "https://github.com/restless7", external: true },
    ],
  },
  {
    id: "pdf-generator-service",
    title: "PlanMaestro PDF Document Microservice",
    subtitle: "Queue-Backed Multi-Engine Document Rendering Service",
    summary:
      "Reusable internal microservice rendering structured business and operational documents across Playwright, Handlebars, EJS, and Pug with BullMQ/Redis queuing, S3 presigned URLs, and Prometheus telemetry.",
    category: "Infrastructure & Tools",
    featured: false,
    maturity: "Internal Service",
    boundary: "BullMQ job queue + Zod payloads + S3 presigned delivery",
    role: "Backend & Infrastructure Engineer",
    stack: ["TypeScript", "Express", "Playwright", "BullMQ", "Redis", "AWS S3", "Prometheus"],
    controls: [
      "Zod payload validation prior to template compilation",
      "Asynchronous BullMQ queue decoupling heavy Chromium rendering",
      "Short-lived S3 presigned URLs instead of exposing raw buckets",
      "Prometheus metrics instrumentation via prom-client",
    ],
    details: [
      {
        heading: "Architecture & Design Choices",
        bullets: [
          "Decoupled headless browser PDF generation behind BullMQ/Redis workers so synchronous API callers remain responsive.",
          "Implemented in packages/pdf-generator as a shared ecosystem utility service.",
        ],
      },
    ],
  },
  {
    id: "cloud-hardening",
    title: "AWS Cloud Hardening Reference",
    subtitle: "Multi-Account Guardrails & CIS-Aligned Baseline Blueprint",
    summary:
      "Codified reference playbook covering AWS Organizations SCP boundaries, IAM least privilege, OIDC CI/CD roles, and automated detective controls.",
    category: "Infrastructure & Tools",
    featured: false,
    maturity: "Reference Blueprint",
    boundary: "Organizations SCPs & GitHub OIDC role boundaries",
    role: "Security Architecture Author",
    stack: ["Terraform", "AWS Organizations", "IAM / OIDC", "CloudTrail", "GuardDuty"],
    controls: [
      "Multi-account SCP guardrails blocking public S3 and root usage",
      "Short-lived CI/CD tokens via GitHub OIDC instead of static IAM keys",
      "Centralized detective logging across CloudTrail, Config, and VPC Flow Logs",
    ],
    details: [
      {
        heading: "Scope & Maturity",
        bullets: [
          "Maintained as an architectural reference blueprint and educational resource inside SentinelDev (/projects/cloud-hardening).",
        ],
      },
    ],
    links: [{ label: "View Blueprint Page", href: "/projects/cloud-hardening" }],
  },
  {
    id: "redteam-web",
    title: "Web App Assessment Methodology",
    subtitle: "OWASP ASVS Gray-Box Testing & Remediation Blueprint",
    summary:
      "Structured assessment template covering authorization boundary testing (IDOR), template injection mitigation, session rotation, and regression validation across Next.js and FastAPI services.",
    category: "Security Engineering",
    featured: false,
    maturity: "Reference Blueprint",
    boundary: "Object-level authorization & SSTI sandboxing checks",
    role: "AppSec Engineer",
    stack: ["OWASP ASVS", "FastAPI", "Next.js", "Python Tooling", "CSP Linting"],
    controls: [
      "Centralized object-level authorization checks against verified JWT claims",
      "Template engine sandboxing and strict prototype restrictions",
      "Post-authentication session identifier rotation",
    ],
    details: [
      {
        heading: "Scope & Maturity",
        bullets: [
          "Retained as a structured AppSec methodology walkthrough (/projects/redteam) demonstrating how findings map directly to code-level remediations.",
        ],
      },
    ],
    links: [{ label: "View Methodology Walkthrough", href: "/projects/redteam" }],
  },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filterCategories)[number]>("All");
  const [expandedId, setExpandedId] = useState<string | null>("apex-second-brain");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    if (activeFilter === "Featured Systems") {
      return projects.filter((project) => project.featured);
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const CategoryIcon = ({ category }: { category: ProjectCategory }) => {
    switch (category) {
      case "AI & Agentic Engineering":
        return <Cpu className="w-4 h-4 text-[#8FD3FF]" />;
      case "Enterprise Platforms":
        return <Layers className="w-4 h-4 text-[#8FD3FF]" />;
      case "Security Engineering":
        return <Shield className="w-4 h-4 text-[#8FD3FF]" />;
      case "Infrastructure & Tools":
        return <Server className="w-4 h-4 text-[#8FD3FF]" />;
      case "Data & Integration":
        return <Database className="w-4 h-4 text-[#8FD3FF]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1119] text-[#EFF2F2] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#94A3B8] hover:text-[#EFF2F2] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#8FD3FF]" />
            Back to Home
          </Link>

          <p className="font-mono text-xs uppercase tracking-widest text-[#8FD3FF] mb-2">
            Work / System Catalog
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#EFF2F2] mb-4">
            Architecture &amp; Engineering Work
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed">
            Selected platforms, applied AI architectures, security prototypes, and
            infrastructure tools. Each entry discloses its real maturity level, primary
            system boundary, and verifiable implementation evidence.
          </p>
        </div>

        {/* Category Filters */}
        <div
          role="tablist"
          aria-label="Filter projects by architectural category"
          className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-[#1E2B3A]"
        >
          {filterCategories.map((category) => {
            const active = activeFilter === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "px-3.5 py-1.5 rounded-md font-mono text-xs transition-colors border",
                  active
                    ? "bg-[#EFF2F2] text-[#0B1119] border-[#EFF2F2] font-semibold"
                    : "bg-[#101824] text-[#94A3B8] border-[#1E2B3A] hover:border-[#2F8CFF]/70 hover:text-[#EFF2F2]"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {filteredProjects.map((project) => {
            const isExpanded = expandedId === project.id;
            return (
              <article
                key={project.id}
                className={cn(
                  "security-card p-6 sm:p-7 flex flex-col justify-between",
                  isExpanded && "lg:col-span-2 border-[#2F8CFF]/70"
                )}
              >
                <div>
                  {/* Top Metadata Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8FD3FF]">
                      <CategoryIcon category={project.category} />
                      <span>{project.category}</span>
                    </div>
                    <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[#0B1119] border border-[#1E2B3A] text-[#EFF2F2]">
                      {project.maturity}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-xl sm:text-2xl font-semibold text-[#EFF2F2] mb-1">
                    {project.title}
                  </h2>
                  <p className="text-sm text-[#8FD3FF] font-medium mb-4">
                    {project.subtitle}
                  </p>

                  {/* Summary */}
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-5">
                    {project.summary}
                  </p>

                  {/* Honest Architectural Metadata (replaces unverified numerical cards) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    <div className="p-3 rounded-md bg-[#0B1119] border border-[#1E2B3A]">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#94A3B8] mb-1">
                        Role
                      </p>
                      <p className="text-xs font-medium text-[#EFF2F2]">{project.role}</p>
                    </div>
                    <div className="p-3 rounded-md bg-[#0B1119] border border-[#1E2B3A]">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#94A3B8] mb-1">
                        Key System Boundary
                      </p>
                      <p className="text-xs font-medium text-[#EFF2F2]">
                        {project.boundary}
                      </p>
                    </div>
                  </div>

                  {/* Key Controls */}
                  <div className="mb-5">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#94A3B8] mb-2">
                      Architectural &amp; Security Controls
                    </p>
                    <ul className="space-y-1.5">
                      {project.controls.map((control) => (
                        <li
                          key={control}
                          className="flex items-start gap-2 text-xs text-[#94A3B8]"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2F8CFF] shrink-0" />
                          <span>{control}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#0B1119] border border-[#1E2B3A] text-[#94A3B8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions & Expandable Case Study */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#1E2B3A]">
                    <div className="flex flex-wrap gap-4">
                      {project.links?.map((link) =>
                        link.external ? (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#EFF2F2] hover:text-[#8FD3FF] transition-colors"
                          >
                            {link.label}
                            <ExternalLink className="w-3.5 h-3.5 text-[#8FD3FF]" />
                          </a>
                        ) : (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#EFF2F2] hover:text-[#8FD3FF] transition-colors"
                          >
                            {link.label}
                            <ExternalLink className="w-3.5 h-3.5 text-[#8FD3FF]" />
                          </Link>
                        )
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : project.id)
                      }
                      aria-expanded={isExpanded}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#1E2B3A] bg-[#0B1119] hover:border-[#2F8CFF]/70 font-mono text-xs text-[#EFF2F2] transition-colors ml-auto"
                    >
                      {isExpanded ? (
                        <>
                          Hide Case Study
                          <ChevronUp className="w-3.5 h-3.5 text-[#8FD3FF]" />
                        </>
                      ) : (
                        <>
                          Read Architecture Notes
                          <ChevronDown className="w-3.5 h-3.5 text-[#8FD3FF]" />
                        </>
                      )}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-[#1E2B3A] grid grid-cols-1 md:grid-cols-3 gap-6">
                      {project.details.map((section) => (
                        <div key={section.heading} className="space-y-2.5">
                          <h3 className="font-mono text-xs uppercase tracking-wider text-[#8FD3FF]">
                            {section.heading}
                          </h3>
                          <ul className="space-y-2">
                            {section.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="text-sm text-[#94A3B8] leading-relaxed"
                              >
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Collaboration Callout */}
        <div className="arch-panel p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#EFF2F2]">
              Looking to architect or harden a system?
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Explore personal technical collaboration options or commercial delivery
              through APEX AI Solutions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/contact"
              className="rounded-md bg-[#EFF2F2] px-5 py-2.5 text-sm font-semibold text-[#0B1119] hover:bg-white transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/services"
              className="rounded-md border border-[#1E2B3A] bg-[#0B1119] px-5 py-2.5 text-sm font-medium text-[#EFF2F2] hover:border-[#2F8CFF]/70 transition-colors"
            >
              Collaboration Approach
            </Link>
          </div>
        </div>

        <NextModuleCTA
          href="/skills"
          title="Engineering Expertise"
          description="Explore competencies across systems architecture, applied AI, security engineering, and infrastructure."
        />
      </div>
    </div>
  );
}
