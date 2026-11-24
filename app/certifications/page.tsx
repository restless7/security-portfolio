import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, FileCheck2, Github, Shield } from "lucide-react";
import { NextModuleCTA } from "@/app/components/NextModuleCTA";

export const metadata: Metadata = {
  title: "Technical Verification & Credentials",
  description:
    "Verifiable engineering evidence, live application controls, and transparent credential policy for Sebastián García.",
  alternates: {
    canonical: "/certifications",
  },
};

const verificationArtifacts = [
  {
    title: "Live Security Posture & Header Controls",
    source: "sentineldev.me (/api/security-posture & next.config.ts)",
    summary:
      "Inspectable CSP, HSTS preload, X-Frame-Options, Permissions-Policy, Zod schema validation, and rate-limiting controls active on this domain.",
    href: "/security-posture",
    cta: "Inspect Live Controls",
    external: false,
  },
  {
    title: "Source Repositories & Commit History",
    source: "GitHub — github.com/restless7",
    summary:
      "Public repositories, security testing scripts, and architectural implementations authored and maintained directly.",
    href: "https://github.com/restless7",
    cta: "View GitHub",
    external: true,
  },
  {
    title: "System Architecture Catalog",
    source: "APEX Platform, APEX Intelligence, Cyber Core, ICE Colombia",
    summary:
      "Documented system boundaries, ADR decision logs, database isolation patterns, and honest maturity classifications.",
    href: "/projects",
    cta: "Explore Selected Work",
    external: false,
  },
];

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-[#0B1119] text-[#EFF2F2] py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#94A3B8] hover:text-[#EFF2F2] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#8FD3FF]" />
            Back to Home
          </Link>

          <p className="font-mono text-xs uppercase tracking-widest text-[#8FD3FF] mb-2">
            Verification / Evidence Policy
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#EFF2F2] mb-4">
            Technical Verification &amp; Credentials
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed">
            In line with an evidence-first engineering posture, this page presents
            verifiable technical artifacts rather than placeholder certification badges or
            unverified credential IDs.
          </p>
        </div>

        <section className="arch-panel p-6 sm:p-8 mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8FD3FF]">
            <FileCheck2 className="w-4 h-4" />
            <span>Credential Integrity Policy</span>
          </div>
          <h2 className="text-xl font-semibold text-[#EFF2F2]">
            Verifiable work over unverified badges
          </h2>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            Earlier drafts of this portfolio included template industry certification
            placeholders. Those placeholders have been intentionally retired. Only
            credentials with independent public verification links are published here, while
            engineering credibility rests on inspectable architectures, running controls,
            and documented technical decisions.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {verificationArtifacts.map((item) => (
            <div
              key={item.title}
              className="security-card p-6 flex flex-col justify-between"
            >
              <div>
                <p className="font-mono text-[11px] text-[#8FD3FF] mb-2">{item.source}</p>
                <h3 className="text-lg font-semibold text-[#EFF2F2] mb-3">{item.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-5">
                  {item.summary}
                </p>
              </div>

              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#EFF2F2] hover:text-[#8FD3FF] transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-[#8FD3FF]" />
                  {item.cta}
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8FD3FF]" />
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#EFF2F2] hover:text-[#8FD3FF] transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-[#8FD3FF]" />
                  {item.cta}
                  <ArrowRight className="w-3.5 h-3.5 text-[#8FD3FF]" />
                </Link>
              )}
            </div>
          ))}
        </section>

        <NextModuleCTA
          href="/security-posture"
          title="Live Security Posture"
          description="Inspect the active security controls and runtime header configuration on sentineldev.me."
        />
      </div>
    </div>
  );
}
