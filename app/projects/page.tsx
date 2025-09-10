import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
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
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Security Projects</h1>
            </div>
            
            <p className="text-lg text-muted max-w-2xl">
              A comprehensive showcase of cybersecurity implementations, vulnerability assessments, 
              and secure application development projects.
            </p>
          </div>

          {/* Coming Soon Content */}
          <div className="security-card p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Projects Coming Soon</h2>
              
              <p className="text-muted mb-8">
                I'm currently documenting and preparing detailed case studies of my security projects, 
                including the APEX AI Solutions security implementation and other cybersecurity initiatives.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-card/50 rounded border border-border">
                  <h3 className="font-semibold text-primary mb-2">APEX AI Solutions Security</h3>
                  <p className="text-sm text-muted">Complete SaaS security implementation with authentication, API protection, and security headers.</p>
                </div>
                
                <div className="p-4 bg-card/50 rounded border border-border">
                  <h3 className="font-semibold text-secondary mb-2">Portfolio Meta-Security</h3>
                  <p className="text-sm text-muted">This very website as a security showcase with live vulnerability scanning.</p>
                </div>
                
                <div className="p-4 bg-card/50 rounded border border-border">
                  <h3 className="font-semibold text-warning mb-2">Penetration Testing Reports</h3>
                  <p className="text-sm text-muted">Sanitized reports from web application security assessments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
