import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Cloud, Shield, CheckCircle, Database, Server, Lock } from "lucide-react"
import LeadCaptureForm from "@/app/components/LeadCaptureForm"

export const metadata: Metadata = {
  title: "AWS Cloud Hardening Playbook | Enterprise Security Baseline",
  description: "Download the definitive, Terraform-codified AWS security baseline playbook. Mapped to CIS Foundations Benchmark v1.5 with strict IAM boundaries, SCPs, and detective controls.",
  keywords: [
    "AWS Security Baseline",
    "Terraform Cloud Hardening",
    "CIS Benchmark v1.5",
    "AWS Organizations SCPs",
    "Cloud Native Security",
    "DevSecOps Playbook"
  ],
  authors: [{ name: "Sebastian García" }],
  openGraph: {
    title: "AWS Cloud Hardening Playbook | Free PDF Download",
    description: "Secure your AWS organization from Day 0 with this codified Terraform playbook.",
    type: "article",
  }
}

export default function CloudHardeningFunnel() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 md:p-8 pt-24 selection:bg-green-400/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/projects" 
            className="inline-flex items-center text-cyan-400 hover:text-green-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            cd ../projects
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Sales Copy */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-sm font-semibold mb-6">
                <Cloud className="w-4 h-4" />
                Free Resource for Platform Engineers
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Secure AWS from <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">Day Zero.</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                A codified, opinionated, and production-ready AWS security baseline. Built with Terraform, 
                tightly aligned to the CIS Foundations Benchmark v1.5, and designed for multi-account AWS Organizations.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">What's inside the Playbook?</h3>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <strong className="text-gray-200 block">Zero-Trust Account Boundaries</strong>
                  <span className="text-sm text-gray-500">7-account best-practice architecture with strict Service Control Policies (SCPs) preventing public S3 buckets and Root user usage.</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <strong className="text-gray-200 block">Least Privilege Identities</strong>
                  <span className="text-sm text-gray-500">IAM boundaries, CI/CD GitHub OIDC roles, and enforced MFA via AWS Identity Center.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <strong className="text-gray-200 block">Automated Detective Controls</strong>
                  <span className="text-sm text-gray-500">GuardDuty, Security Hub, multi-region CloudTrail, and Config Rules with SSM Auto-Remediation active from deployment.</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800">
              <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                <Database className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <span className="text-xs text-gray-400 block font-bold">KMS ENCRYPTION</span>
              </div>
              <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                <Server className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <span className="text-xs text-gray-400 block font-bold">VPC FLOW LOGS</span>
              </div>
              <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                <Lock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <span className="text-xs text-gray-400 block font-bold">CIS v1.5 MAPPED</span>
              </div>
            </div>
          </div>

          {/* Right Column - Lead Capture */}
          <div className="relative">
            {/* Decorative background blur */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-green-500 rounded-lg blur opacity-20 hidden lg:block"></div>
            
            <div className="relative">
              <LeadCaptureForm 
                type="whitepaper-download"
                title="Get the Terraform Playbook"
                description="Join our DevSecOps newsletter and grab the complete 35-page PDF playbook and Terraform source code references."
                buttonText="Download Playbook PDF"
                className="shadow-2xl border-gray-700 bg-black/80 backdrop-blur-xl"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
