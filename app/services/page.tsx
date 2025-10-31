"use client"

import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";
import { ServiceCard } from "@/app/components/ServiceCard";
import { servicesData } from "./servicesData";
import { openMatrix } from "@/app/lib/openMatrix";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="w-12 h-12 text-[#00ffff] cyber-glow" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              <span className="text-[#00ffff]">Cybersecurity Services</span>
              <br />
              <span className="text-[#00ff88]">Built for SMBs & Startups</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-[#888888]">
              Enterprise-grade security expertise without enterprise pricing. 
              Protect your applications, secure your cloud infrastructure, and achieve 
              compliance faster with battle-tested security implementations.
            </p>
          </div>

          {/* Value Proposition */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="security-card p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-[#00ffff]">
                Why Companies Choose These Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <div className="text-3xl font-bold text-[#00ff88] mb-2">40%</div>
                  <p className="text-sm text-[#888888]">Faster SOC2 compliance</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#00ffff] mb-2">$2M+</div>
                  <p className="text-sm text-[#888888]">Enterprise deals secured</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#ffaa00] mb-2">95%</div>
                  <p className="text-sm text-[#888888]">Vulnerability remediation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 lg:px-8 bg-[#111111]/50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            <span className="text-[#00ffff]">Ready to Secure</span>{" "}
            <span className="text-[#00ff88]">Your Business?</span>
          </h2>
          <p className="text-lg text-[#888888] mb-8 max-w-2xl mx-auto">
            Schedule a free 30-minute consultation to discuss your security needs and 
            get a customized assessment plan tailored to your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="terminal-border rounded-md bg-[#00ffff] px-8 py-4 text-base font-semibold text-black shadow-sm hover:bg-[#00ff88] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ffff] transition-all duration-300 inline-flex items-center gap-2"
            >
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/projects"
              className="security-card px-8 py-4 text-base font-semibold leading-6 text-[#00ffff] hover:text-[#00ff88] transition-colors duration-300 inline-flex items-center gap-2"
            >
              View Past Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="px-6 py-16 lg:px-8 relative">
        {/* Matrix Easter Egg - subtle corner */}
        <span 
          onClick={() => openMatrix("services")}
          className="absolute bottom-8 left-8 text-[#00ffff]/30 hover:text-[#00ffff] transition-all duration-500 text-xl cursor-pointer"
          title="Access restricted zone"
          aria-label="Hidden access"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openMatrix("services") }}
        >
          ⚡⊛⚡
        </span>
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-[#00ffff] mb-4">
              Backed by Industry Certifications
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="security-card p-6 text-center">
              <div className="text-3xl mb-2">🎓</div>
              <p className="text-sm font-semibold text-[#00ffff]">CISSP</p>
              <p className="text-xs text-[#888888]">Security Professional</p>
            </div>
            <div className="security-card p-6 text-center">
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-sm font-semibold text-[#00ff88]">CEH</p>
              <p className="text-xs text-[#888888]">Ethical Hacker</p>
            </div>
            <div className="security-card p-6 text-center">
              <div className="text-3xl mb-2">⚔️</div>
              <p className="text-sm font-semibold text-[#00ffff]">OSCP</p>
              <p className="text-xs text-[#888888]">Penetration Tester</p>
            </div>
            <div className="security-card p-6 text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <p className="text-sm font-semibold text-[#00ff88]">GSEC</p>
              <p className="text-xs text-[#888888]">Security Essentials</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
