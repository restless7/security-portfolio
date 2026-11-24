"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/app/lib/utils";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Writing", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#1E2B3A] bg-[#0B1119]/92 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Primary Personal Identity + Official SG Monogram */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2F8CFF] rounded"
          >
            <Image
              src="/brand/sg-logo-web.png"
              alt="Sebastián García SG monogram"
              width={32}
              height={32}
              loading="eager"
              priority
              className="w-8 h-8 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-[1.03]"
            />
            <div className="flex items-baseline gap-2.5">
              <span className="text-base sm:text-lg font-semibold tracking-tight text-[#EFF2F2] group-hover:text-white transition-colors">
                Sebastián García
              </span>
              <span className="hidden sm:inline-block font-mono text-xs text-[#94A3B8] border border-[#1E2B3A] bg-[#101824] px-2 py-0.5 rounded">
                sentineldev.me
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const active = isActiveRoute(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F8CFF]",
                    active
                      ? "bg-[#101824] text-[#EFF2F2] border border-[#2F8CFF]/60 shadow-[0_0_12px_rgba(47,140,255,0.12)]"
                      : "text-[#94A3B8] hover:text-[#EFF2F2] hover:bg-[#101824]"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}

            <span aria-hidden="true" className="mx-2 h-4 w-px bg-[#1E2B3A]" />

            <a
              href="https://www.apexaisolutions.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-mono text-xs text-[#CBD5E1] hover:text-[#EFF2F2] border border-[#1E2B3A] hover:border-[#2F8CFF]/60 transition-colors"
            >
              APEX
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8FD3FF]" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="text-[#94A3B8] hover:text-[#EFF2F2] p-2 rounded-md border border-transparent hover:border-[#1E2B3A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2F8CFF]"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#1E2B3A] bg-[#0B1119]">
          <div className="px-4 py-3 space-y-1">
            {navigationItems.map((item) => {
              const active = isActiveRoute(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                    active
                      ? "bg-[#101824] text-[#EFF2F2] border border-[#2F8CFF]/60"
                      : "text-[#94A3B8] hover:text-[#EFF2F2] hover:bg-[#101824]"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <a
              href="https://www.apexaisolutions.dev/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-between px-3 py-2.5 rounded-md font-mono text-xs text-[#CBD5E1] hover:text-[#EFF2F2] border border-[#1E2B3A]"
            >
              <span>APEX AI Solutions</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8FD3FF]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
