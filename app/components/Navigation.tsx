"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Terminal, User, Briefcase, Award, Mail, Eye, Menu, X, Wrench, BookOpen } from "lucide-react"
import { useState } from "react"
import { cn } from "@/app/lib/utils"

const navigationItems = [
  { name: "Home", href: "/", icon: Terminal },
  { name: "Services", href: "/services", icon: Wrench },
  { name: "Skills", href: "/skills", icon: Shield },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Certifications", href: "/certifications", icon: Award },
  { name: "Security Posture", href: "/security-posture", icon: Eye },
  { name: "About", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: Mail },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="security-card border-b border-[#333333]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-green-400 transition-colors">
              <Shield className="w-6 h-6" />
              <span className="text-lg font-bold">SG Security</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-[#00ffff]/10 text-[#00ffff] border border-[#00ffff]/30"
                      : "text-[#888888] hover:text-[#00ffff] hover:bg-[#333333]/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#888888] hover:text-[#00ffff] p-2 transition-colors"
              aria-expanded="false"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#333333]">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#111111]">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                    isActive
                      ? "bg-[#00ffff]/10 text-[#00ffff] border border-[#00ffff]/30"
                      : "text-[#888888] hover:text-[#00ffff] hover:bg-[#333333]/50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
