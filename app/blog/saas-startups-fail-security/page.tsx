import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, CheckCircle, Code2, Lock, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Architectural Security Debt in Early-Stage SaaS Systems",
  description:
    "Five structural boundaries—tenant authorization, cloud baselines, API validation, CI/CD gates, and audit readiness—that prevent costly security retrofits.",
  keywords: [
    "SaaS Architecture",
    "Authorization vs Authentication",
    "Security Debt",
    "API Validation",
    "DevSecOps",
  ],
  alternates: {
    canonical: "/blog/saas-startups-fail-security",
  },
  openGraph: {
    title: "Architectural Security Debt in Early-Stage SaaS Systems",
    description:
      "Structural security patterns for multi-tenant SaaS architectures.",
    type: "article",
  },
};

export default function SaasSecurityDebtNote() {
  return (
    <div className="min-h-screen bg-[#0B1119] text-[#EFF2F2] py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#94A3B8] hover:text-[#EFF2F2] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#8FD3FF]" />
            Back to Engineering Notes
          </Link>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#8FD3FF] mb-4">
            <span>Security Engineering</span>
            <span className="text-[#1E2B3A]">•</span>
            <span className="text-[#94A3B8]">Sebastián García</span>
            <span className="text-[#1E2B3A]">•</span>
            <span className="text-[#94A3B8]">December 2024</span>
            <span className="text-[#1E2B3A]">•</span>
            <span className="text-[#94A3B8]">7 min read</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#EFF2F2] leading-[1.15] mb-5">
            Architectural Security Debt in Early-Stage SaaS Systems
          </h1>

          <p className="text-lg text-[#94A3B8] leading-relaxed">
            Security retrofits become expensive when foundational boundaries—tenant
            ownership, transport headers, schema validation, and secret hygiene—are
            deferred past initial architecture. This note outlines the five structural
            layers worth establishing early.
          </p>
        </div>

        <article className="space-y-10">
          {/* 1 */}
          <section className="security-card p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-[#8FD3FF]" />
              <h2 className="text-xl sm:text-2xl font-semibold text-[#EFF2F2]">
                1. Authentication Without Object-Level Authorization
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Verifying that a caller holds a valid session answers who they are, not which
              tenant resources they are permitted to read or mutate. Confusing authentication
              with authorization is one of the most common causes of cross-tenant data
              exposure (IDOR).
            </p>
            <pre className="p-4 rounded-md bg-[#0B1119] border border-[#1E2B3A] font-mono text-xs text-[#EFF2F2] overflow-x-auto">
              {`// Insufficient: authenticates caller without verifying resource ownership
if (req.user) {
  return database.getCustomerData(req.params.customerId);
}

// Structural boundary: enforce tenant/ownership scope at query time
if (req.user && await canAccessTenantResource(req.user.id, req.params.customerId)) {
  return database.getScopedCustomerData(req.user.tenantId, req.params.customerId);
}`}
            </pre>
            <p className="text-xs font-mono text-[#8FD3FF]">
              Boundary rule: pair server-derived principals with PostgreSQL Row-Level
              Security (RLS) so database queries fail closed.
            </p>
          </section>

          {/* 2 */}
          <section className="security-card p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-[#8FD3FF]" />
              <h2 className="text-xl sm:text-2xl font-semibold text-[#EFF2F2]">
                2. Default Cloud &amp; Infrastructure Baselines
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Managed cloud defaults optimize for fast onboarding rather than minimal blast
              radius. Codifying baseline guardrails early avoids painful migrations once
              customer workloads exist.
            </p>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#8FD3FF] mt-0.5 shrink-0" />
                <span>Enforce encryption at rest for managed databases and object storage.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#8FD3FF] mt-0.5 shrink-0" />
                <span>Block public bucket policies and restrict ingress CIDR ranges.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#8FD3FF] mt-0.5 shrink-0" />
                <span>Use short-lived OIDC federation in CI instead of static IAM keys.</span>
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section className="security-card p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5">
              <Code2 className="w-5 h-5 text-[#8FD3FF]" />
              <h2 className="text-xl sm:text-2xl font-semibold text-[#EFF2F2]">
                3. API Input Discipline &amp; Abuse Controls
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Public and authenticated APIs need deterministic payload boundaries before
              inputs reach business logic, templates, or queues. Combine strict Zod or
              typed runtime schemas with sliding-window rate limits and clean error
              responses that omit stack traces.
            </p>
          </section>

          {/* 4 & 5 */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="arch-panel p-6 space-y-3">
              <h2 className="text-lg font-semibold text-[#EFF2F2]">
                4. CI/CD Security Gates
              </h2>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Integrate dependency audits, secret scanning, TypeScript strictness, and
                regression tests into standard CI runs rather than reserving them for
                pre-launch sprints.
              </p>
            </div>
            <div className="arch-panel p-6 space-y-3">
              <h2 className="text-lg font-semibold text-[#EFF2F2]">
                5. Traceable Operational Readiness
              </h2>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Keep security headers, audit logs, and access boundaries documented as code
                so security reviews become verification exercises rather than emergencies.
              </p>
            </div>
          </section>

          {/* Practical Baseline */}
          <section className="arch-panel p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-semibold text-[#EFF2F2]">
              Practical Next.js Header Baseline
            </h2>
            <p className="text-sm text-[#94A3B8]">
              A minimal starting point in <code className="font-mono text-[#EFF2F2]">next.config.ts</code>{" "}
              alongside CSP and HSTS:
            </p>
            <pre className="p-4 rounded-md bg-[#0B1119] border border-[#1E2B3A] font-mono text-xs text-[#EFF2F2] overflow-x-auto">
              {`const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
];`}
            </pre>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/security-posture"
                className="font-mono text-xs text-[#EFF2F2] underline decoration-[#537E80] underline-offset-4 hover:text-[#8FD3FF]"
              >
                Inspect active headers on sentineldev.me →
              </Link>
              <Link
                href="/projects"
                className="font-mono text-xs text-[#94A3B8] hover:text-[#EFF2F2]"
              >
                View related architecture work →
              </Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
