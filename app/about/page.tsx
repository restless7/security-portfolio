import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Compass,
  Cpu,
  Github,
  Instagram,
  Layers,
  Mail,
  Shield,
  Terminal,
} from "lucide-react";
import { NextModuleCTA } from "@/app/components/NextModuleCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Authentic engineering background, architectural philosophy, and systems built by Sebastián García — Systems Architect · Applied AI & Security Engineering, and Founder of APEX AI Solutions.",
  alternates: {
    canonical: "/about",
  },
};

const engineeringTrajectory = [
  {
    system: "APEX Platform & Second Brain Architecture",
    role: "Systems Architect & Principal Builder",
    maturity: "Active Architecture · Internal Baseline",
    scope:
      "Architected a dual-engine enterprise platform separating Knowledge OS (pgvector institutional memory, claim governance, provenance traversal) from Operations OS (unified operational heartbeat and incident lifecycle), complemented by Second Brain ADRs defining fail-closed tenant/ACL database pre-filtering.",
  },
  {
    system: "APEX Intelligence Workstation",
    role: "Architect & Full-Stack Engineer",
    maturity: "Local Pilot",
    scope:
      "Built a sovereign corporate registry analysis workstation with Next.js 16, standalone Prisma, Force Row-Level Security (FORCE RLS), AES-256-GCM encryption, dedicated PostgreSQL 16 over Unix domain sockets, and a zero-dependency Node.js supervisor.",
  },
  {
    system: "ICE Colombia Operations Portal & WhatsApp AI RAG",
    role: "Lead Systems & Infrastructure Engineer",
    maturity: "Production System",
    scope:
      "Engineered a client production system pairing a Next.js administrative portal and PostgreSQL/Prisma backend with a WhatsApp RAG assistant. Decoupled webhook acknowledgment from async LLM processing via setImmediate() behind Nginx, systemd, and cloudflared to satisfy Meta's 10-second SLA.",
  },
  {
    system: "Apex Cyber Core Engine",
    role: "Systems & Security Researcher",
    maturity: "R&D Prototype",
    scope:
      "Developed an experimental Rust security daemon using Aya eBPF tracepoint hooks, tree-sitter and petgraph control-flow taint tracking, Blake3 PII masking, and Tonic gRPC over Unix domain sockets.",
  },
  {
    system: "PlanMaestro Shared Infrastructure & SentinelDev",
    role: "Platform & AppSec Engineer",
    maturity: "Internal Service & Production Web",
    scope:
      "Built reusable engineering infrastructure including a BullMQ/Playwright PDF document microservice and hardened sentineldev.me with strict CSP, HSTS, Zod input validation, and rate-limited API endpoints.",
  },
];

const domains = [
  {
    title: "Systems & Software Architecture",
    detail:
      "Modular monoliths, bounded contexts, typed ports and adapters, multi-tenant data isolation, and clean service boundaries.",
  },
  {
    title: "Applied AI & Agentic Orchestration",
    detail:
      "Governed RAG pipelines, citation-backed decision memory, access-filtered vector retrieval, and bounded agent workflows.",
  },
  {
    title: "Security Engineering & AppSec",
    detail:
      "Defense-in-depth web security, Row-Level Security (RLS), static AST/CFG taint analysis, PII masking, and strict transport/header policies.",
  },
  {
    title: "Backend, Data & Integration",
    detail:
      "TypeScript/Node.js, Python, Rust, PostgreSQL/pgvector, Prisma, Redis/BullMQ queues, and deterministic ETL pipelines.",
  },
  {
    title: "Infrastructure & Operations",
    detail:
      "Linux service supervision (systemd, custom supervisors), Nginx reverse proxies, Unix socket isolation, and observable deployments.",
  },
];

const researchInterests = [
  "Governed organizational memory and verifiable AI decision lineage",
  "Self-evolving agent architectures bounded by deterministic checks and safety gates",
  "Low-level security telemetry (eBPF) and static program analysis (AST/CFG)",
  "Resilient local-first and sovereign software infrastructure",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B1119] text-[#EFF2F2] py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* A. Introduction */}
        <section className="border-b border-[#1E2B3A] pb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8FD3FF] mb-3">
            About / Sebastián García
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-5">
              <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#EFF2F2] leading-[1.12]">
                Systems Architect building across software, applied AI, security, and infrastructure.
              </h1>
              <p className="font-mono text-sm text-[#2F8CFF]">
                Engineering Beyond the Prototype. From architectural thinking to disciplined execution.
              </p>
              <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
                I am Sebastián García, a systems architect and technical founder based in
                Colombia. My work centers on designing and implementing dependable software
                systems — where domain architecture, security boundaries, applied
                artificial intelligence, and operational infrastructure reinforce one another.
              </p>
              <p className="text-base text-[#94A3B8] leading-relaxed">
                Rather than treating security, AI orchestration, and infrastructure as
                disconnected afterthoughts, I build end-to-end architectures where failure
                modes are explicit, access control lives at the data layer, and claims are
                backed by working code.
              </p>
            </div>

            {/* Official SG Identity Card */}
            <aside className="lg:col-span-4 arch-panel p-6 space-y-5">
              <div className="flex items-center gap-4">
                <Image
                  src="/brand/sg-logo-web.png"
                  alt="Sebastián García official SG monogram"
                  width={56}
                  height={56}
                  loading="eager"
                  priority
                  className="w-14 h-14 rounded-full shrink-0 shadow-[0_0_20px_rgba(47,140,255,0.2)]"
                />
                <div>
                  <p className="font-semibold text-[#EFF2F2]">Sebastián García</p>
                  <p className="font-mono text-xs text-[#8FD3FF]">Systems Architect</p>
                </div>
              </div>

              <dl className="space-y-3 text-xs border-t border-[#1E2B3A] pt-4">
                <div className="flex justify-between gap-2">
                  <dt className="font-mono text-[#94A3B8]">Location</dt>
                  <dd className="text-[#EFF2F2]">Colombia (UTC-5)</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="font-mono text-[#94A3B8]">Organization</dt>
                  <dd className="text-[#EFF2F2] text-right">Founder, APEX AI Solutions</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="font-mono text-[#94A3B8]">Primary Site</dt>
                  <dd className="font-mono text-[#EFF2F2]">sentineldev.me</dd>
                </div>
              </dl>

              <div className="flex flex-col gap-2 pt-2 border-t border-[#1E2B3A]">
                <a
                  href="https://github.com/restless7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-3 py-2 rounded bg-[#0B1119] border border-[#1E2B3A] hover:border-[#2F8CFF]/70 font-mono text-xs text-[#CBD5E1] hover:text-[#EFF2F2] transition-colors"
                >
                  <span className="inline-flex items-center gap-2">
                    <Github className="w-3.5 h-3.5 text-[#2F8CFF]" />
                    github.com/restless7
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8FD3FF]" />
                </a>
                <a
                  href="https://instagram.com/sebgarcia.systems"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-3 py-2 rounded bg-[#0B1119] border border-[#1E2B3A] hover:border-[#2F8CFF]/70 font-mono text-xs text-[#CBD5E1] hover:text-[#EFF2F2] transition-colors"
                >
                  <span className="inline-flex items-center gap-2">
                    <Instagram className="w-3.5 h-3.5 text-[#2F8CFF]" />
                    @sebgarcia.systems
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8FD3FF]" />
                </a>
                <a
                  href="https://www.apexaisolutions.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-3 py-2 rounded bg-[#0B1119] border border-[#1E2B3A] hover:border-[#2F8CFF]/70 font-mono text-xs text-[#CBD5E1] hover:text-[#EFF2F2] transition-colors"
                >
                  <span className="inline-flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-[#2F8CFF]" />
                    apexaisolutions.dev
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8FD3FF]" />
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* B. My Approach */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-[#2F8CFF]" />
            <h2 className="text-2xl font-semibold text-[#EFF2F2]">My Approach</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="arch-panel p-6 space-y-2">
              <h3 className="text-base font-semibold text-[#EFF2F2]">
                Explicit System Boundaries
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Most system failures happen at blurred boundaries: unvalidated payloads,
                shared databases without tenant isolation, or synchronous pipelines blocking
                on slow AI calls. I design explicit interfaces, fail-closed defaults, and
                decoupled workers from the start.
              </p>
            </div>

            <div className="arch-panel p-6 space-y-2">
              <h3 className="text-base font-semibold text-[#EFF2F2]">
                Evidence Over Narrative
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                I separate R&amp;D prototypes, locally validated pilots, and production
                deployments clearly. Every architectural decision is documented, tested
                against concrete constraints, and evolved incrementally.
              </p>
            </div>
          </div>
        </section>

        {/* C. Selected Work & Engineering Trajectory */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-[#2F8CFF]" />
              <h2 className="text-2xl font-semibold text-[#EFF2F2]">
                Selected Engineering Trajectory
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#CBD5E1] hover:text-[#EFF2F2]"
            >
              Inspect full project catalog
              <ArrowRight className="w-3.5 h-3.5 text-[#2F8CFF]" />
            </Link>
          </div>

          <p className="text-sm text-[#94A3B8] max-w-3xl">
            Organized around documented architectural responsibilities and verifiable
            systems built across the ecosystem rather than an artificial checklist of titles.
          </p>

          <div className="space-y-4">
            {engineeringTrajectory.map((item) => (
              <div key={item.system} className="security-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-[#EFF2F2]">{item.system}</h3>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[#0B1119] border border-[#1E2B3A] text-[#CBD5E1]">
                    {item.maturity}
                  </span>
                </div>
                <p className="font-mono text-xs text-[#8FD3FF] mb-3">{item.role}</p>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{item.scope}</p>
              </div>
            ))}
          </div>
        </section>

        {/* D. Engineering Domains */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#2F8CFF]" />
            <h2 className="text-2xl font-semibold text-[#EFF2F2]">Engineering Domains</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {domains.map((domain) => (
              <div key={domain.title} className="arch-panel p-5 space-y-2">
                <h3 className="text-sm font-semibold text-[#EFF2F2]">{domain.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{domain.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* E. APEX AI Solutions & F. Research Interests */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 security-card p-7 space-y-4">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-[#2F8CFF]" />
              <h2 className="text-xl font-semibold text-[#EFF2F2]">
                Relationship to APEX AI Solutions
              </h2>
            </div>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              I am the Founder of{" "}
              <a
                href="https://www.apexaisolutions.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EFF2F2] underline decoration-[#2F8CFF]/80 underline-offset-4 hover:text-white"
              >
                APEX AI Solutions
              </a>
              . APEX AI Solutions is the commercial engineering organization behind client
              engagements, enterprise AI platforms, and business delivery:{" "}
              <span className="italic text-[#EFF2F2]">
                We engineer the systems modern businesses depend on. Secure by design.
                Resilient by architecture. Built for the real world.
              </span>
            </p>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              SentinelDev remains my distinct personal home — representing my individual
              engineering perspective, architectural writing, and technical prototypes.
            </p>
            <div className="pt-2">
              <a
                href="https://www.apexaisolutions.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[#EFF2F2] hover:text-[#8FD3FF] transition-colors"
              >
                Visit apexaisolutions.dev
                <ArrowUpRight className="w-3.5 h-3.5 text-[#2F8CFF]" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 arch-panel p-7 space-y-4">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-[#2F8CFF]" />
              <h2 className="text-xl font-semibold text-[#EFF2F2]">
                Research &amp; Technical Interests
              </h2>
            </div>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              {researchInterests.map((interest) => (
                <li key={interest} className="flex items-start gap-2.5">
                  <Terminal className="w-3.5 h-3.5 text-[#2F8CFF] mt-1 shrink-0" />
                  <span>{interest}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* G. Contact & Collaboration */}
        <section className="arch-panel p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl font-semibold text-[#EFF2F2]">
              Contact &amp; Collaboration
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              Open to technical conversations around systems architecture, security design,
              and applied AI engineering — or commercial delivery through APEX AI Solutions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[#EFF2F2] px-5 py-2.5 text-sm font-semibold text-[#0B1119] hover:bg-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md border border-[#1E2B3A] bg-[#0B1119] px-5 py-2.5 text-sm font-medium text-[#EFF2F2] hover:border-[#2F8CFF]/70 transition-colors"
            >
              View Work
            </Link>
          </div>
        </section>

        <NextModuleCTA
          href="/projects"
          title="Selected Engineering Work"
          description="Inspect system boundaries, architecture choices, and implementation evidence across the catalog."
        />
      </div>
    </div>
  );
}
