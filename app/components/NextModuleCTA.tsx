"use client"

import Link from "next/link"
import { ArrowRight, Terminal } from "lucide-react"

interface NextModuleCTAProps {
  href: string
  title: string
  description: string
}

export function NextModuleCTA({ href, title, description }: NextModuleCTAProps) {
  return (
    <div className="mt-16 text-center">
      <Link 
        href={href}
        className="inline-block security-card p-6 md:p-8 max-w-2xl mx-auto w-full group hover:border-[#00ffff]/50 transition-all duration-300 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ffff]/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        
        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Terminal className="w-4 h-4 text-[#00ff88]" />
            <span className="text-sm font-mono text-[#00ff88]">./execute --next</span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-100 group-hover:text-[#00ffff] transition-colors flex items-center gap-2">
            Proceed to {title}
            <ArrowRight className="w-6 h-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
          </h3>
          
          <p className="text-gray-400 text-sm md:text-base">
            {description}
          </p>
        </div>
      </Link>
    </div>
  )
}
