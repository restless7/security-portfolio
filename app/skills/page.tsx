"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Cpu,
  Database,
  Layers,
  Server,
  Shield,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { NextModuleCTA } from "@/app/components/NextModuleCTA";

interface Capability {
  name: string;
  summary: string;
  technologies: string[];
  evidenceProject: string;
}

interface DomainCategory {
  id: string;
  name: string;
  summary: string;
  icon: typeof Layers;
  capabilities: Capability[];
}

const domainCategories: DomainCategory[] = [
  {
    id: "architecture",
    name: "Systems & Software Architecture",
    summary:
      "Designing cohesive system boundaries, modular monoliths, and explicit runtime contracts before adding operational complexity.",
    icon: Layers,
    capabilities: [
      {
        name: "Domain & Boundary Modeling",
        summary:
          "Modular monolith design, bounded contexts, typed ports/adapters, and Architecture Decision Records (ADRs).",
        technologies: ["TypeScript", "Ports & Adapters", "ADRs", "REST / RPC Contracts"],
        evidenceProject: "APEX Platform & Second Brain",
      },
      {
        name: "Multi-Tenant Isolation",
        summary:
          "Server-derived principals, database-layer Row-Level Security (FORCE RLS), and explicit workspace scoping.",
        technologies: ["PostgreSQL RLS", "Prisma", "JWT / Session Guards"],
        evidenceProject: "APEX Intelligence & Second Brain",
      },
      {
        name: "API & Schema Discipline",
        summary:
          "Contract-first validation with strict schemas, error hygiene, and fail-closed defaults on invalid state.",
        technologies: ["Zod", "Proto3 / gRPC", "Next.js Route Handlers"],
        evidenceProject: "SentinelDev & Apex Cyber Core",
      },
    ],
  },
  {
    id: "applied-ai",
    name: "Applied AI & Agentic Systems",
    summary:
      "Building governed retrieval, organizational memory, and structured LLM orchestration constrained by deterministic boundaries.",
    icon: Cpu,
    capabilities: [
      {
        name: "Governed RAG & Knowledge Systems",
        summary:
          "Access-filtered retrieval running tenant/ACL predicates before vector similarity ranking, with provenance citations.",
        technologies: ["pgvector", "Hybrid Search", "Citation Lineage"],
        evidenceProject: "APEX Knowledge OS & Second Brain",
      },
      {
        name: "Async AI Pipeline Integration",
        summary:
          "Decoupling slow model inference from strict external webhook latency SLAs via non-blocking handoffs.",
        technologies: ["Node.js Event Loop", "WhatsApp Cloud API", "RAG Pipelines"],
        evidenceProject: "ICE Colombia Automation",
      },
      {
        name: "Agentic & Decision Memory Patterns",
        summary:
          "Structured agent workflows with explicit review gates, telemetry tracking, and bounded tool permissions.",
        technologies: ["MCP Boundaries", "Decision Records", "Audit Logging"],
        evidenceProject: "APEX Platform Architecture",
      },
    ],
  },
  {
    id: "security",
    name: "Security Engineering & AppSec",
    summary:
      "Treating security as an architectural invariant across application layers, transport policies, and low-level telemetry.",
    icon: Shield,
    capabilities: [
      {
        name: "Web & API Hardening",
        summary:
          "Centralized CSP, HSTS preload, clickjacking defenses, input sanitization, and rate-limited endpoints.",
        technologies: ["CSP", "HSTS", "Zod", "Rate Limiting", "Jest Security Tests"],
        evidenceProject: "SentinelDev Portfolio",
      },
      {
        name: "Systems Security & eBPF Research",
        summary:
          "Low-level Linux tracepoint monitoring, deterministic AST/CFG taint graphs, and cryptographic PII masking.",
        technologies: ["Rust", "Aya eBPF", "tree-sitter", "petgraph", "Blake3"],
        evidenceProject: "Apex Cyber Core Engine",
      },
      {
        name: "Access Control & Threat Modeling",
        summary:
          "Evaluating object-level authorization (IDOR), session rotation, template sandboxing, and multi-account guardrails.",
        technologies: ["OWASP ASVS", "IAM / OIDC", "Cloud Guardrails"],
        evidenceProject: "AppSec & Cloud Blueprints",
      },
    ],
  },
  {
    id: "engineering",
    name: "Backend & Full-Stack Engineering",
    summary:
      "Shipping accessible web interfaces and resilient backend services with strong typing and clean state management.",
    icon: Code2,
    capabilities: [
      {
        name: "Modern Web Applications",
        summary:
          "Server-first App Router architectures, responsive editorial layouts, accessible forms, and strict TypeScript.",
        technologies: ["Next.js 15/16", "React 19", "TypeScript", "Tailwind CSS"],
        evidenceProject: "SentinelDev, ICE & APEX",
      },
      {
        name: "Service & Worker Backends",
        summary:
          "Queue-backed document pipelines, async job scheduling, and deterministic API services.",
        technologies: ["Node.js", "Express", "BullMQ", "Playwright", "Python"],
        evidenceProject: "PlanMaestro PDF Microservice",
      },
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure & Deployment",
    summary:
      "Operating self-contained runtimes, reverse proxies, service supervisors, and observable deployments.",
    icon: Server,
    capabilities: [
      {
        name: "Linux Supervision & Proxying",
        summary:
          "Process supervision, Nginx ingress routing, tunnel termination, and custom zero-dependency local supervisors.",
        technologies: ["Linux", "systemd", "Nginx", "Cloudflared", "Node Supervisors"],
        evidenceProject: "ICE Colombia & APEX Intelligence",
      },
      {
        name: "Isolated Runtime Topologies",
        summary:
          "Socket-only database binding, encrypted storage, and strict separation between loopback and public surfaces.",
        technologies: ["AF_UNIX Sockets", "TLS", "Vercel Edge", "Prometheus"],
        evidenceProject: "APEX Intelligence & PDF Service",
      },
    ],
  },
  {
    id: "data",
    name: "Data Systems & Integrations",
    summary:
      "Designing relational schemas, ingestion workflows, and repeatable entity reconciliation pipelines.",
    icon: Database,
    capabilities: [
      {
        name: "Relational & Vector Persistence",
        summary:
          "PostgreSQL schema design, connection pool discipline, migrations, and pgvector embeddings.",
        technologies: ["PostgreSQL 16", "Prisma ORM", "pgvector", "Redis"],
        evidenceProject: "APEX & ICE Ecosystems",
      },
      {
        name: "Ingestion & Document Delivery",
        summary:
          "Corporate registry ingestion, schema validation, S3 presigned object delivery, and structured templates.",
        technologies: ["ETL Pipelines", "AWS S3", "Handlebars / EJS", "Data Hygiene"],
        evidenceProject: "APEX Intelligence & PDF Service",
      },
    ],
  },
];

export default function SkillsPage() {
  const [selectedId, setSelectedId] = useState<string>(domainCategories[0].id);

  const selectedCategory =
    domainCategories.find((cat) => cat.id === selectedId) ?? domainCategories[0];

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
            Expertise / Technical Capabilities
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#EFF2F2] mb-4">
            Engineering Expertise
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed">
            A grounded map of technical domains, implemented patterns, and technologies
            across architecture, applied AI, security engineering, and infrastructure — tied
            directly to built systems rather than self-assigned numerical ratings.
          </p>
        </div>

        {/* Domain Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {domainCategories.map((category) => {
            const Icon = category.icon;
            const active = selectedId === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedId(category.id)}
                aria-pressed={active}
                className={cn(
                  "text-left p-5 rounded-lg border transition-all duration-200",
                  active
                    ? "bg-[#101824] border-[#2F8CFF]/70 shadow-glow-cyan"
                    : "bg-[#101824]/60 border-[#1E2B3A] hover:border-[#2F8CFF]/70/60"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded bg-[#0B1119] border border-[#1E2B3A]">
                    <Icon className="w-4 h-4 text-[#8FD3FF]" />
                  </div>
                  <span className="font-mono text-[11px] text-[#94A3B8]">
                    {category.capabilities.length} areas
                  </span>
                </div>
                <h2 className="text-base font-semibold text-[#EFF2F2] mb-1.5">
                  {category.name}
                </h2>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {category.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Domain Breakdown */}
        <section className="arch-panel p-6 sm:p-8 mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#1E2B3A]">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#8FD3FF] mb-1">
                Selected Discipline
              </p>
              <h2 className="text-2xl font-semibold text-[#EFF2F2]">
                {selectedCategory.name}
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#EFF2F2] hover:text-[#8FD3FF] transition-colors"
            >
              Inspect implementing systems
              <ArrowRight className="w-3.5 h-3.5 text-[#8FD3FF]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCategory.capabilities.map((cap) => (
              <div
                key={cap.name}
                className="p-5 rounded-lg bg-[#0B1119] border border-[#1E2B3A] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-semibold text-[#EFF2F2] mb-2">
                    {cap.name}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
                    {cap.summary}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#1E2B3A]">
                  <div className="flex flex-wrap gap-1.5">
                    {cap.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#101824] border border-[#1E2B3A] text-[#94A3B8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="font-mono text-[11px] text-[#8FD3FF]">
                    Applied in: {cap.evidenceProject}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <NextModuleCTA
          href="/projects"
          title="Selected Engineering Work"
          description="See how these engineering capabilities are applied across concrete platforms and prototypes."
        />
      </div>
    </div>
  );
}
