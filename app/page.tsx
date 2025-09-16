import { Shield, Terminal, Lock, Eye, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { SecurityScorecard } from "@/app/components/SecurityScorecard"
import { AnimatedTerminal } from "@/app/components/AnimatedTerminal"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative px-6 py-20 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Terminal-style greeting */}
          <div className="mb-8">
            <div className="security-card p-4 max-w-2xl mx-auto">
              <div className="flex items-center mb-2">
                <Terminal className="w-4 h-4 text-cyan-400 mr-2" />
                <span className="text-sm text-gray-500">guardian@security:~$</span>
              </div>
              <AnimatedTerminal />
            </div>
          </div>

          {/* Main title */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            <span className="text-[#00ffff] cyber-glow">Sebastian García</span>
            <br />
            <span className="text-[#00ff88]">Cybersecurity</span> &{" "}
            <span className="text-[#00ffff]">AppSec</span> Specialist
          </h1>

          {/* Rotating subtitle */}
          <div className="mx-auto max-w-2xl mb-10">
            <p className="text-lg leading-8 text-[#888888]">
              Securing digital assets through{" "}
              <span className="text-[#00ff88] font-semibold">penetration testing</span>,{" "}
              <span className="text-[#00ffff] font-semibold">secure code review</span>, and{" "}
              <span className="text-[#00ff88] font-semibold">cloud security architecture</span>.
              Every line of code is a potential entry point&mdash;I make sure it&rsquo;s not.
            </p>
          </div>

          {/* Live Security Scorecard */}
          <div className="mb-10">
            <SecurityScorecard />
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-x-6">
            <Link
              href="/projects"
              className="terminal-border rounded-md bg-[#00ffff] px-6 py-3 text-sm font-semibold text-black shadow-sm hover:bg-[#00ff88] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ffff] transition-all duration-300"
            >
              View Security Projects
            </Link>
            <Link
              href="/security-posture"
              className="security-card px-6 py-3 text-sm font-semibold leading-6 text-[#00ffff] hover:text-[#00ff88] transition-colors duration-300 flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Security Analysis <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[#00ffff] mb-4">
              Security-First Approach
            </h2>
            <p className="text-lg text-[#888888] max-w-2xl mx-auto">
              This portfolio itself demonstrates security best practices. Every component
              is hardened, every input validated, every header secured.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="security-card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#00ffff]/10 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#00ffff]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#00ffff]">Secure by Design</h3>
              <p className="text-[#888888] leading-relaxed">
                Built with security headers, CSP policies, input validation, and rate limiting.
                View the live security analysis to see how.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="security-card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#00ff88]/10 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#00ff88]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#00ff88]">Threat Detection</h3>
              <p className="text-[#888888] leading-relaxed">
                Specialized in OWASP Top 10, vulnerability assessment, and penetration testing
                across web applications and cloud infrastructure.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="security-card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#ffaa00]/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[#ffaa00]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#ffaa00]">Risk Mitigation</h3>
              <p className="text-[#888888] leading-relaxed">
                From secure coding practices to incident response planning.
                Every vulnerability is an opportunity to strengthen defenses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Work Preview */}
      <section className="py-16 px-6 lg:px-8 bg-[#111111]/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Recent Security Projects
            </h2>
            <p className="text-lg text-[#888888] max-w-2xl mx-auto">
              A selection of applications and systems I&rsquo;ve secured, analyzed, and hardened.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project 1 - APEX AI */}
            <div className="security-card p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-[#00ffff] mr-2" />
                <span className="text-sm font-medium text-[#00ffff]">FULL-STACK SAAS SECURITY</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">APEX AI Solutions</h3>
              <p className="text-[#888888] mb-4 leading-relaxed">
                Secured a complete SaaS application from the ground up. Implemented authentication
                with Clerk, protected 40+ API endpoints with middleware validation, and established
                comprehensive security headers and CSP policies.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-[#00ffff]/10 text-[#00ffff] text-xs rounded">Zod Validation</span>
                <span className="px-2 py-1 bg-[#00ff88]/10 text-[#00ff88] text-xs rounded">Rate Limiting</span>
                <span className="px-2 py-1 bg-[#00ffff]/10 text-[#00ffff] text-xs rounded">CSP Headers</span>
                <span className="px-2 py-1 bg-[#00ff88]/10 text-[#00ff88] text-xs rounded">Input Sanitization</span>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center text-sm text-[#00ffff] hover:text-[#00ff88] transition-colors"
              >
                View security details <span className="ml-1">→</span>
              </Link>
            </div>

            {/* Project 2 - Portfolio Meta-Security */}
            <div className="security-card p-6">
              <div className="flex items-center mb-4">
                <Terminal className="w-5 h-5 text-[#00ff88] mr-2" />
                <span className="text-sm font-medium text-[#00ff88]">META-SECURITY SHOWCASE</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">This Portfolio Site</h3>
              <p className="text-[#888888] mb-4 leading-relaxed">
                This website itself is a security project. Every header, validation rule,
                and component demonstrates cybersecurity best practices. Click below to see
                the live security analysis.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-[#00ff88]/10 text-[#00ff88] text-xs rounded">Security Headers</span>
                <span className="px-2 py-1 bg-[#00ffff]/10 text-[#00ffff] text-xs rounded">XSS Prevention</span>
                <span className="px-2 py-1 bg-[#00ff88]/10 text-[#00ff88] text-xs rounded">CSRF Protection</span>
                <span className="px-2 py-1 bg-[#00ffff]/10 text-[#00ffff] text-xs rounded">Live Monitoring</span>
              </div>
              <Link
                href="/security-posture"
                className="inline-flex items-center text-sm text-[#00ff88] hover:text-[#00ffff] transition-colors"
              >
                Run security scan <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
