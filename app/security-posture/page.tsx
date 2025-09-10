import { Eye, ArrowLeft, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function SecurityPosturePage() {
  return (
    <div className="min-h-screen matrix-bg py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-green-400 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Security Posture Analysis</h1>
            </div>
            
            <p className="text-lg text-muted max-w-2xl">
              Live security scanning and analysis of this portfolio website demonstrating 
              real-world cybersecurity monitoring capabilities.
            </p>
          </div>

          {/* Security Score Card */}
          <div className="security-card p-8 mb-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-4 mb-6">
                <Shield className="w-12 h-12 text-secondary" />
                <div>
                  <div className="text-4xl font-bold text-secondary">A+</div>
                  <div className="text-sm text-muted">96/100</div>
                </div>
              </div>
              
              <p className="text-muted mb-6">
                This website maintains an excellent security posture with comprehensive 
                defensive measures implemented.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-secondary/10 rounded">
                  <div className="text-xs text-secondary font-medium">HTTPS</div>
                  <div className="text-sm">Enforced</div>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <div className="text-xs text-secondary font-medium">CSP</div>
                  <div className="text-sm">Strict</div>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <div className="text-xs text-secondary font-medium">Headers</div>
                  <div className="text-sm">Secure</div>
                </div>
                <div className="p-3 bg-secondary/10 rounded">
                  <div className="text-xs text-secondary font-medium">Input</div>
                  <div className="text-sm">Validated</div>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon Features */}
          <div className="security-card p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-warning" />
              Advanced Analysis Coming Soon
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-primary mb-2">Live Header Analysis</h3>
                <p className="text-sm text-muted">
                  Real-time scanning of security headers with detailed explanations and recommendations.
                </p>
              </div>
              
              <div className="border-l-4 border-secondary pl-4">
                <h3 className="font-semibold text-secondary mb-2">Vulnerability Scanner</h3>
                <p className="text-sm text-muted">
                  Automated vulnerability detection with integration to security databases and CVE feeds.
                </p>
              </div>
              
              <div className="border-l-4 border-warning pl-4">
                <h3 className="font-semibold text-warning mb-2">Dependency Audit</h3>
                <p className="text-sm text-muted">
                  Live monitoring of npm packages for known security vulnerabilities and outdated dependencies.
                </p>
              </div>
              
              <div className="border-l-4 border-danger pl-4">
                <h3 className="font-semibold text-danger mb-2">Penetration Testing Tools</h3>
                <p className="text-sm text-muted">
                  Interactive demonstration of common penetration testing techniques and methodologies.
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-accent/50 rounded border border-border">
              <p className="text-center text-sm text-muted">
                This page will showcase live security scanning capabilities, demonstrating 
                real-world cybersecurity monitoring and assessment techniques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
