import Link from "next/link";
import { Shield, Github, Linkedin, Mail, Terminal, Lock, Eye, Award } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: "Home", href: "/" },
      { name: "Services", href: "/services" },
      { name: "Skills", href: "/skills" },
      { name: "Projects", href: "/projects" },
      { name: "Blog", href: "/blog" },
      { name: "Certifications", href: "/certifications" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
    security: [
      { name: "Security Posture", href: "/security-posture", icon: Eye },
      { name: "Security Headers", href: "https://securityheaders.com/", external: true, icon: Lock },
      { name: "Mozilla Observatory", href: "https://observatory.mozilla.org/", external: true, icon: Shield },
    ],
    certifications: [
      { name: "CISSP", description: "Certified Information Systems Security Professional" },
      { name: "CEH", description: "Certified Ethical Hacker" },
      { name: "OSCP", description: "Offensive Security Certified Professional" },
      { name: "GSEC", description: "GIAC Security Essentials" },
    ],
  };

  return (
    <footer className="border-t border-[#333333] bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <Shield className="w-8 h-8 text-[#00ffff] group-hover:text-[#00ff88] transition-colors" />
              <span className="text-xl font-bold text-[#00ffff] group-hover:text-[#00ff88] transition-colors">
                SG Security
              </span>
            </Link>
            <p className="text-sm text-[#888888] leading-relaxed mb-4">
              Enterprise-grade cybersecurity expertise for SMBs and startups. 
              Securing applications, cloud infrastructure, and compliance frameworks.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#666666]">
              <Terminal className="w-4 h-4" />
              <span className="font-mono">guardian@security:~$</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#00ffff] uppercase tracking-wide mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#888888] hover:text-[#00ffff] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Security Resources */}
          <div>
            <h3 className="text-sm font-semibold text-[#00ff88] uppercase tracking-wide mb-4">
              Security Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.security.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-2 text-sm text-[#888888] hover:text-[#00ff88] transition-colors group"
                    >
                      <Icon className="w-4 h-4 text-[#00ff88] group-hover:text-[#00ffff]" />
                      <span>{link.name}</span>
                      {link.external && (
                        <span className="text-xs text-[#666666]">↗</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-sm font-semibold text-[#ffaa00] uppercase tracking-wide mb-4 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Certifications
            </h3>
            <ul className="space-y-3">
              {footerLinks.certifications.map((cert) => (
                <li key={cert.name}>
                  <div className="text-sm">
                    <span className="font-semibold text-[#00ffff]">{cert.name}</span>
                    <p className="text-xs text-[#666666] mt-0.5">{cert.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#333333] my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-[#666666] text-center md:text-left">
            <p className="mb-1">
              © {currentYear} Sebastian García. All rights reserved.
            </p>
            <p className="text-xs">
              Built with <span className="text-[#00ffff]">security-first</span> architecture • 
              Deployed on <span className="text-[#00ff88]">Vercel Edge</span>
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/restless7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] hover:text-[#00ffff] transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] hover:text-[#00ffff] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="text-[#888888] hover:text-[#00ffff] transition-colors"
              aria-label="Contact"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 pt-8 border-t border-[#333333]">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-[#666666]">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#00ff88]" />
              <span>HTTPS Enforced</span>
            </div>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00ffff]" />
              <span>A+ Security Headers</span>
            </div>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#ffaa00]" />
              <span>Live Security Monitoring</span>
            </div>
          </div>
        </div>

        {/* Terminal Prompt */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111111] border border-[#333333] rounded-md">
            <Terminal className="w-4 h-4 text-[#00ff88]" />
            <span className="text-xs font-mono text-[#888888]">
              Every line of code is a potential entry point—I make sure it's not.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
