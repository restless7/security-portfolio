import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Instagram, Lock, Mail, Shield, Terminal } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const primaryLinks = [
    { name: "Home", href: "/" },
    { name: "Selected Work", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Engineering Notes", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const secondaryLinks = [
    { name: "Engineering Expertise", href: "/skills" },
    { name: "Collaboration & Advisory", href: "/services" },
    { name: "Live Security Posture", href: "/security-posture" },
    { name: "Verification & Credentials", href: "/certifications" },
  ];

  return (
    <footer className="border-t border-[#1E2B3A] bg-[#0B1119] mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Personal Identity & Independent APEX Commercial Attribution */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/sg-logo-web.png"
                alt="Sebastián García SG monogram"
                width={30}
                height={30}
                loading="eager"
                className="w-7 h-7 rounded-full shrink-0"
              />
              <div className="flex items-baseline gap-2.5">
                <span className="text-lg font-semibold text-[#EFF2F2]">
                  Sebastián García
                </span>
                <span className="font-mono text-xs text-[#8FD3FF]">sentineldev.me</span>
              </div>
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-md">
              Systems Architect · Applied AI &amp; Security Engineering.{" "}
              <span className="text-[#CBD5E1]">
                Engineering Beyond the Prototype.
              </span>
            </p>

            {/* Distinct APEX AI Solutions Organization Attribution */}
            <div className="pt-1">
              <a
                href="https://www.apexaisolutions.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2.5 p-3 rounded-lg bg-[#101824] border border-[#1E2B3A] hover:border-[#2F8CFF]/60 transition-colors max-w-md"
              >
                <Image
                  src="/images/apex-logo.png"
                  alt="APEX AI Solutions"
                  width={18}
                  height={18}
                  loading="eager"
                  className="w-4 h-4 mt-0.5 object-contain brightness-0 invert opacity-80 shrink-0"
                />
                <div className="text-xs leading-relaxed">
                  <span className="font-semibold text-[#EFF2F2] inline-flex items-center gap-1">
                    Founder, APEX AI Solutions
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8FD3FF]" />
                  </span>
                  <p className="text-[#94A3B8] mt-0.5">
                    We engineer the systems modern businesses depend on.
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Primary Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-4">
              Portfolio
            </h3>
            <ul className="space-y-2.5">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#CBD5E1] hover:text-[#EFF2F2] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Engineering & Verification */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-4">
              Architecture &amp; Verification
            </h3>
            <ul className="space-y-2.5">
              {secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#CBD5E1] hover:text-[#EFF2F2] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1E2B3A] my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-[#94A3B8] text-center sm:text-left space-y-1">
            <p>© {currentYear} Sebastián García · SentinelDev</p>
            <p className="font-mono text-[#8FD3FF]/80">
              Engineering Beyond the Prototype.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 font-mono text-[11px] text-[#94A3B8] pr-4 border-r border-[#1E2B3A]">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#2F8CFF]" />
                HTTPS &amp; HSTS
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#2F8CFF]" />
                CSP Active
              </span>
            </div>

            <Link
              href="https://instagram.com/sebgarcia.systems"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94A3B8] hover:text-[#EFF2F2] transition-colors p-1.5 rounded border border-transparent hover:border-[#1E2B3A]"
              aria-label="Instagram (@sebgarcia.systems)"
            >
              <Instagram className="w-4 h-4" />
            </Link>
            <Link
              href="https://github.com/restless7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94A3B8] hover:text-[#EFF2F2] transition-colors p-1.5 rounded border border-transparent hover:border-[#1E2B3A]"
              aria-label="GitHub Profile (restless7)"
            >
              <Github className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="text-[#94A3B8] hover:text-[#EFF2F2] transition-colors p-1.5 rounded border border-transparent hover:border-[#1E2B3A]"
              aria-label="Contact Sebastián García"
            >
              <Mail className="w-4 h-4" />
            </Link>
            <Link
              href="/security-posture"
              className="text-[#94A3B8] hover:text-[#EFF2F2] transition-colors p-1.5 rounded border border-transparent hover:border-[#1E2B3A]"
              aria-label="Live Security Posture"
            >
              <Terminal className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
