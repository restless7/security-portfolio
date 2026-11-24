import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Cpu,
  Layers,
  Server,
  Shield,
  Terminal,
} from "lucide-react";
import { AnimatedTerminal } from "@/app/components/AnimatedTerminal";
import { SecurityScorecard } from "@/app/components/SecurityScorecard";
import { blogPosts } from "@/app/blog/blogData";

const practiceAreas = [
  {
    number: "01",
    title: "Systems & Software Architecture",
    icon: Layers,
    summary:
      "Modular monoliths, bounded contexts, tenant isolation, typed ports and adapters, and clean API contracts designed to remain maintainable under real operational load.",
    focus: ["Domain Boundaries", "PostgreSQL & RLS", "Typed Contracts"],
  },
  {
    number: "02",
    title: "Applied AI & Agentic Systems",
    icon: Cpu,
    summary:
      "Governed organizational memory, RAG retrieval pipelines with fail-closed access controls, decision lineage, and verifiable AI workflows anchored in deterministic state.",
    focus: ["Governed RAG", "Decision Memory", "Agent Orchestration"],
  },
  {
    number: "03",
    title: "Security Engineering",
    icon: Shield,
    summary:
      "Security treated as a structural property: strict CSP and transport headers, schema validation, rate limiting, kernel/SAST research, and zero-trust boundary verification.",
    focus: ["AppSec & Headers", "Access Control", "Rust / eBPF R&D"],
  },
  {
    number: "04",
    title: "Infrastructure & Integration",
    icon: Server,
    summary:
      "Process supervision, reverse proxies, isolated Unix-socket databases, asynchronous webhook decoupling, and resilient background workers built for real-world constraints.",
    focus: ["Process Supervisors", "Async Pipelines", "Linux & Containers"],
  },
];

const selectedSystems = [
  {
    id: "apex-platform",
    title: "APEX Platform & Second Brain",
    maturity: "Active Architecture · Internal Baseline",
    domain: "Applied AI & Enterprise Architecture",
    summary:
      "Dual-engine architecture separating institutional Knowledge OS (pgvector retrieval, provenance, claim governance) from Operations OS (heartbeat telemetry, incident memory), paired with a modular-monolith Second Brain blueprint enforcing database-level tenant/ACL pre-filtering.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "Prisma"],
  },
  {
    id: "apex-intelligence",
    title: "APEX Intelligence Workstation",
    maturity: "Local Pilot",
    domain: "Data & Sovereign Infrastructure",
    summary:
      "Standalone corporate registry analysis workstation running Next.js 16 against an isolated PostgreSQL 16 instance over Unix domain sockets with Force Row-Level Security, AES-256-GCM encryption, and a zero-dependency process supervisor.",
    stack: ["Next.js 16", "PostgreSQL 16", "FORCE RLS", "Node Supervisor"],
  },
  {
    id: "apex-cyber-core",
    title: "Apex Cyber Core Engine",
    maturity: "R&D Prototype",
    domain: "Security Engineering & Systems",
    summary:
      "Native Rust security daemon combining Aya eBPF syscall tracepoint interception, tree-sitter and petgraph control-flow taint tracking, Blake3 PII masking, and Tonic gRPC over Unix domain sockets.",
    stack: ["Rust", "Aya eBPF", "petgraph", "Blake3", "gRPC / UDS"],
  },
  {
    id: "ice-ecosystem",
    title: "ICE Colombia Automation & Portal",
    maturity: "Production",
    domain: "Infrastructure & Applied AI",
    summary:
      "Client-facing web platform, administrative program portal, and WhatsApp AI RAG pipeline decoupled via immediate HTTP acknowledgment and asynchronous webhook processing behind Nginx, systemd, and PostgreSQL.",
    stack: ["Next.js 15", "Prisma", "PostgreSQL", "Nginx", "systemd"],
  },
  {
    id: "sentineldev-portfolio",
    title: "SentinelDev Security-First Site",
    maturity: "Production",
    domain: "Security Engineering",
    summary:
      "This platform (sentineldev.me): hardened App Router application pairing editorial clarity with strict CSP, HSTS, Zod input validation, sliding-window rate limiting, and live posture diagnostics.",
    stack: ["Next.js 15", "React 19", "TypeScript", "Zod", "Tailwind CSS"],
  },
];

const principles = [
  {
    title: "Architecture before complexity",
    body: "Start with explicit module boundaries, clear ownership, and reversible interfaces before introducing distributed machinery.",
  },
  {
    title: "Security as a system property",
    body: "Enforce authorization, input schemas, and isolation inside the data and runtime boundaries rather than bolting checks onto the edge.",
  },
  {
    title: "Evidence before deployment",
    body: "Distinguish prototypes, local pilots, and production workloads honestly. Validate assumptions with tests, telemetry, and reproducible checks.",
  },
  {
    title: "AI under deliberate control",
    body: "Ground retrieval in access-controlled sources, preserve decision provenance, and keep deterministic validation ahead of model output.",
  },
  {
    title: "Maintainability over spectacle",
    body: "Prefer clear code, durable primitives, and predictable operations over clever abstractions that fail silently under pressure.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B1119] text-[#EFF2F2]">
      {/* 01 — Identity Hero */}
      <section className="border-b border-[#1E2B3A] bg-[radial-gradient(ellipse_at_top,_rgba(47,140,255,0.14),_transparent_58%)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 sm:gap-5 mb-7">
              <Image
                src="/brand/sg-logo-web.png"
                alt="Sebastián García official SG monogram"
                width={64}
                height={64}
                loading="eager"
                priority
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shrink-0 shadow-[0_0_24px_rgba(47,140,255,0.2)]"
              />
              <div>
                <p className="text-lg sm:text-xl font-semibold tracking-tight text-[#EFF2F2]">
                  Sebastián García
                </p>
                <p className="font-mono text-xs sm:text-sm text-[#8FD3FF]">
                  Systems Architect · Applied AI &amp; Security Engineering
                </p>
                <p className="font-mono text-xs text-[#94A3B8] mt-0.5">
                  Founder,{" "}
                  <a
                    href="https://www.apexaisolutions.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#CBD5E1] underline decoration-[#2F8CFF]/70 underline-offset-4 hover:text-white"
                  >
                    APEX AI Solutions
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-7">
              {[
                "Software & Systems Architecture",
                "Applied AI",
                "Security Engineering",
                "Infrastructure",
              ].map((discipline) => (
                <span
                  key={discipline}
                  className="font-mono text-xs px-2.5 py-1 rounded bg-[#101824] border border-[#1E2B3A] text-[#CBD5E1]"
                >
                  {discipline}
                </span>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#EFF2F2] leading-[1.08] mb-5">
              Engineering Beyond the Prototype.
            </h1>

            <p className="text-lg sm:text-xl text-[#CBD5E1] leading-relaxed mb-3 max-w-2xl">
              From architectural thinking to disciplined execution.
            </p>
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-8 max-w-2xl">
              I work across software architecture, applied AI, security engineering, and
              infrastructure — turning complex technical ideas into dependable systems.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-md bg-[#EFF2F2] px-5 py-2.5 text-sm font-semibold text-[#0B1119] hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F8CFF]"
              >
                Explore Selected Work
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md border border-[#1E2B3A] bg-[#101824] px-5 py-2.5 text-sm font-medium text-[#EFF2F2] hover:border-[#2F8CFF]/70 transition-colors"
              >
                About Me
              </Link>

              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#94A3B8] hover:text-[#EFF2F2] transition-colors"
              >
                Engineering Notes
              </Link>

              <a
                href="https://www.apexaisolutions.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-[#CBD5E1] hover:text-[#EFF2F2] transition-colors ml-auto sm:ml-2"
              >
                APEX AI Solutions
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8FD3FF]" />
              </a>
            </div>
          </div>

          {/* Subordinate Technical Signature: Terminal Prompt + Live Posture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch pt-5 border-t border-[#1E2B3A]">
            <div className="lg:col-span-6 arch-panel px-5 py-4 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#2F8CFF]" />
                <span className="font-mono text-xs text-[#94A3B8]">
                  sebastian@sentineldev:~$
                </span>
              </div>
              <AnimatedTerminal />
            </div>

            <div className="lg:col-span-6 flex items-stretch">
              <SecurityScorecard />
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Areas of Practice */}
      <section className="py-16 sm:py-20 border-b border-[#1E2B3A]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#8FD3FF] mb-2">
                02 / Areas of Practice
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#EFF2F2]">
                Disciplines across the full stack
              </h2>
            </div>
            <Link
              href="/skills"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#CBD5E1] hover:text-[#EFF2F2] transition-colors"
            >
              View full capability matrix
              <ArrowRight className="w-3.5 h-3.5 text-[#2F8CFF]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practiceAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.number} className="security-card p-6 sm:p-7 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-[#0B1119] border border-[#1E2B3A]">
                        <Icon className="w-5 h-5 text-[#2F8CFF]" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#EFF2F2]">
                        {area.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-[#8FD3FF]">
                      {area.number}
                    </span>
                  </div>

                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-5 flex-grow">
                    {area.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {area.focus.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#0B1119] border border-[#1E2B3A] text-[#CBD5E1]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 — Selected Engineering Work */}
      <section className="py-16 sm:py-20 border-b border-[#1E2B3A]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#8FD3FF] mb-2">
                03 / Selected Engineering Work
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#EFF2F2]">
                Systems designed, built, and verified
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#CBD5E1] hover:text-[#EFF2F2] transition-colors"
            >
              Browse full catalog
              <ArrowRight className="w-3.5 h-3.5 text-[#2F8CFF]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedSystems.map((project, index) => (
              <article
                key={project.id}
                className={
                  index === 0
                    ? "security-card p-6 sm:p-7 lg:col-span-2 flex flex-col justify-between"
                    : "security-card p-6 sm:p-7 flex flex-col justify-between"
                }
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs text-[#8FD3FF]">
                      {project.domain}
                    </span>
                    <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[#0B1119] border border-[#1E2B3A] text-[#CBD5E1]">
                      {project.maturity}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#EFF2F2] mb-3">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-5">
                    {project.summary}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1E2B3A]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#0B1119] border border-[#1E2B3A] text-[#CBD5E1]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[#EFF2F2] hover:text-[#8FD3FF] transition-colors shrink-0"
                  >
                    Inspect architecture
                    <ArrowRight className="w-3.5 h-3.5 text-[#2F8CFF]" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Engineering Philosophy */}
      <section className="py-16 sm:py-20 border-b border-[#1E2B3A] bg-[#101824]/45">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="font-mono text-xs uppercase tracking-widest text-[#8FD3FF] mb-2">
              04 / Engineering Philosophy
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#EFF2F2]">
              Working principles across every layer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {principles.map((principle, idx) => (
              <div key={principle.title} className="arch-panel p-6">
                <span className="font-mono text-xs text-[#2F8CFF] block mb-2">
                  0{idx + 1}
                </span>
                <h3 className="text-base font-semibold text-[#EFF2F2] mb-2">
                  {principle.title}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Selected Writing / Engineering Notes */}
      <section className="py-16 sm:py-20 border-b border-[#1E2B3A]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#8FD3FF] mb-2">
                05 / Engineering Notes
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#EFF2F2]">
                Notes on architecture, security &amp; implementation
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#CBD5E1] hover:text-[#EFF2F2] transition-colors"
            >
              All engineering notes
              <ArrowRight className="w-3.5 h-3.5 text-[#2F8CFF]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <article key={post.slug} className="security-card p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="font-mono text-xs text-[#8FD3FF]">
                      {post.category}
                    </span>
                    <span className="font-mono text-xs text-[#94A3B8]">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#EFF2F2] mb-3">
                    <Link href={`/blog/${post.slug}`} className="hover:text-white transition-colors">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-5">
                    {post.excerpt}
                  </p>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#EFF2F2] hover:text-[#8FD3FF] transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#2F8CFF]" />
                  Read note
                  <ArrowRight className="w-3.5 h-3.5 text-[#2F8CFF]" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Personal Introduction & 07 — Collaboration / APEX */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 06 — Personal Introduction */}
            <div className="lg:col-span-6 arch-panel p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#8FD3FF] mb-2">
                  06 / Personal Introduction
                </p>
                <h2 className="text-2xl font-semibold text-[#EFF2F2] mb-4">
                  Building cohesive systems end to end
                </h2>
                <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed mb-4">
                  I am a systems architect based in Colombia. My work connects full-stack
                  software architecture, governed AI orchestration, application security, and
                  production infrastructure — moving from architectural thinking to
                  disciplined, verifiable execution.
                </p>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                  SentinelDev serves as my personal engineering notebook and system catalog:
                  a place for architectural experimentation, security demonstrations, and
                  documented work without generic agency packaging.
                </p>
              </div>

              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#EFF2F2] hover:text-[#8FD3FF] transition-colors"
                >
                  Read the complete About narrative
                  <ArrowRight className="w-4 h-4 text-[#2F8CFF]" />
                </Link>
              </div>
            </div>

            {/* 07 — Collaboration / APEX AI Solutions */}
            <div className="lg:col-span-6 security-card p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#8FD3FF] mb-2">
                  07 / Collaboration &amp; APEX AI Solutions
                </p>
                <h2 className="text-2xl font-semibold text-[#EFF2F2] mb-4">
                  We engineer the systems modern businesses depend on.
                </h2>
                <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed mb-3">
                  While <strong className="font-semibold text-[#EFF2F2]">sentineldev.me</strong>{" "}
                  presents my personal engineering judgment and technical work,{" "}
                  <strong className="font-semibold text-[#EFF2F2]">APEX AI Solutions</strong>{" "}
                  is the commercial organization I founded for client delivery and enterprise
                  systems.
                </p>
                <p className="font-mono text-xs text-[#8FD3FF] mb-6">
                  Secure by design. Resilient by architecture. Built for the real world.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-[#EFF2F2] px-4 py-2.5 text-sm font-semibold text-[#0B1119] hover:bg-white transition-colors"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-md border border-[#1E2B3A] bg-[#0B1119] px-4 py-2.5 text-sm font-medium text-[#EFF2F2] hover:border-[#2F8CFF]/70 transition-colors"
                >
                  Collaboration Approach
                </Link>
                <a
                  href="https://www.apexaisolutions.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#CBD5E1] hover:text-[#EFF2F2] transition-colors px-2 py-2"
                >
                  apexaisolutions.dev
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8FD3FF]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
