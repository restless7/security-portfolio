"use client";

import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

interface NextModuleCTAProps {
  href: string;
  title: string;
  description: string;
}

export function NextModuleCTA({ href, title, description }: NextModuleCTAProps) {
  return (
    <div className="mt-16">
      <Link
        href={href}
        className="block arch-panel p-6 md:p-8 max-w-2xl mx-auto w-full group hover:border-[#2F8CFF]/60 transition-all duration-200"
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8FD3FF]">
            <Terminal className="w-3.5 h-3.5 text-[#2F8CFF]" />
            <span>next_section</span>
          </div>

          <h3 className="text-xl md:text-2xl font-semibold text-[#EFF2F2] group-hover:text-white transition-colors inline-flex items-center gap-2">
            {title}
            <ArrowRight className="w-5 h-5 text-[#2F8CFF] group-hover:translate-x-1 transition-transform duration-200" />
          </h3>

          <p className="text-[#94A3B8] text-sm md:text-base max-w-xl">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}
