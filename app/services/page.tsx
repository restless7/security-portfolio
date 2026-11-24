import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2 } from "lucide-react";
import { ServiceCard } from "@/app/components/ServiceCard";
import { servicesData } from "./servicesData";
import { NextModuleCTA } from "@/app/components/NextModuleCTA";

export const metadata: Metadata = {
  title: "Collaboration & Advisory",
  description:
    "How Sebastián García collaborates on systems architecture, applied AI, and security engineering — and how commercial engagements run through APEX AI Solutions.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0B1119] text-[#EFF2F2] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#94A3B8] hover:text-[#EFF2F2] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#2F8CFF]" />
            Back to Home
          </Link>

          <p className="font-mono text-xs uppercase tracking-widest text-[#8FD3FF] mb-2">
            Collaboration / Engineering Approach
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#EFF2F2] mb-4">
            Collaboration &amp; Advisory
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed">
            How I work with teams on systems architecture, applied AI boundaries, and
            security engineering — alongside the clear distinction between personal
            advisory and commercial delivery through APEX AI Solutions.
          </p>
        </div>

        {/* Boundary Banner: Personal vs APEX */}
        <section className="arch-panel p-6 sm:p-8 mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8FD3FF]">
              <Building2 className="w-4 h-4 text-[#2F8CFF]" />
              <span>Personal Identity vs. Commercial Organization</span>
            </div>
            <h2 className="text-xl font-semibold text-[#EFF2F2]">
              APEX AI Solutions — We engineer the systems modern businesses depend on.
            </h2>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              SentinelDev is my personal engineering portfolio and technical notebook. When
              work moves into scoped commercial delivery, custom enterprise software, or
              managed AI infrastructure, engagements are executed through{" "}
              <strong className="font-semibold text-[#EFF2F2]">APEX AI Solutions</strong>{" "}
              — secure by design, resilient by architecture, built for the real world.
            </p>
          </div>

          <a
            href="https://www.apexaisolutions.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-[#2F8CFF]/60 bg-[#0B1119] px-5 py-2.5 text-sm font-medium text-[#EFF2F2] hover:bg-[#1E2B3A] transition-colors shrink-0"
          >
            apexaisolutions.dev
            <ArrowUpRight className="w-4 h-4 text-[#8FD3FF]" />
          </a>
        </section>

        {/* Engagement Areas Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </section>

        {/* Contact CTA */}
        <section className="arch-panel p-8 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-[#EFF2F2] mb-3">
            Start with a concrete technical problem
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] mb-6 max-w-2xl mx-auto">
            Share the system context, constraints, and goals. Scoping and pricing depend on
            actual architecture complexity and delivery requirements rather than generic
            tiered packages.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[#EFF2F2] px-5 py-2.5 text-sm font-semibold text-[#0B1119] hover:bg-white transition-colors"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md border border-[#1E2B3A] bg-[#0B1119] px-5 py-2.5 text-sm font-medium text-[#EFF2F2] hover:border-[#2F8CFF]/70 transition-colors"
            >
              Review Implemented Work
            </Link>
          </div>
        </section>

        <NextModuleCTA
          href="/contact"
          title="Contact"
          description="Send a direct message or route commercial inquiries to APEX AI Solutions."
        />
      </div>
    </div>
  );
}
