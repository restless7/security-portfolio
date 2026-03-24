import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Terminal, FileJson, Bug, Target, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Web App Red Team Engagement | PlanMaestro Ecosystem",
  description: "A comprehensive senior-level penetration testing engagement mapped to OWASP ASVS v4.0. Features custom tooling, exploit PoCs, and remediation for IDOR, SSTI, and XSS.",
  keywords: [
    "Web App Penetration Testing",
    "Red Team Engagement",
    "OWASP ASVS",
    "Gray-box Testing",
    "Pentest Case Study",
    "Cybersecurity Portfolio"
  ],
  authors: [{ name: "Sebastian García" }],
  openGraph: {
    title: "Web App Red Team Engagement | PlanMaestro",
    description: "Detailed case study of a simulated adversary engagement against the PlanMaestro SaaS ecosystem.",
    type: "article",
  }
}

export default function RedTeamCaseStudy() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 md:p-8 pt-24 selection:bg-green-400/30">
      <div className="max-w-4xl mx-auto">
        
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

        {/* Header */}
        <header className="mb-12 border-b border-gray-800 pb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <Target className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Web App Red Team</h1>
              <p className="text-xl text-gray-400">Simulated Adversary Engagement</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm border border-gray-700">OWASP ASVS v4.0</span>
            <span className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm border border-gray-700">Burp Suite Pro</span>
            <span className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm border border-gray-700">Custom Python Tooling</span>
            <span className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm border border-gray-700">Next.js & FastAPI Targets</span>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-3 text-cyan-400" />
            1. Executive Summary
          </h2>
          <div className="security-card p-6 md:p-8 prose prose-invert max-w-none text-gray-300">
            <h3 className="text-xl font-bold text-white mb-4">Engagement Overview</h3>
            <p className="lead text-lg mb-4">
              Between March 1 and March 29, 2024, our security team conducted a comprehensive grey-box penetration test against the PlanMaestro ecosystem. The scope included the APEX AI SaaS platform, the Tools Platform (Next.js/FastAPI), the PDF Generator microservice, and the underlying API infrastructure.
            </p>
            <p>
              The primary objective was to evaluate the resilience of the ecosystem's access controls, session management, 
              and input validation mechanisms under strict gray-box conditions. We operated with the mindset of an 
              authenticated adversary attempting vertical and horizontal privilege escalation.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-8 mb-4">Security Posture Assessment</h3>
            <p>
              The overall security posture of the PlanMaestro ecosystem is <strong className="text-cyan-400">MATURING</strong>. The application demonstrates strong baseline security controls, including excellent Next.js security headers (A+ on Mozilla Observatory), solid password hashing implementations, and comprehensive HTTPS enforcement.
            </p>
            <p>
              However, the assessment revealed significant gaps in <strong className="text-cyan-400">Authorization (Access Control)</strong> and <strong className="text-cyan-400">Session Management</strong>, leading directly to the highest severity findings. Specifically, the absence of resource-level authorization checks on certain API endpoints (IDOR vulnerabilities) presents the most immediate risk to data confidentiality and integrity.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Strategic Recommendations</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Implement Centralized Authorization:</strong> Move away from endpoint-specific permission checks and implement a centralized authorization matrix (e.g., using middleware or Guards in FastAPI/Next.js) that validates resource ownership on every request.</li>
              <li><strong className="text-white">Enhance Session Lifecycle Management:</strong> Implement absolute session timeouts and ensure all access tokens are invalidated upon logout or password changes to prevent session fixation and token replay attacks.</li>
              <li><strong className="text-white">Automate Security Scanning:</strong> Integrate dynamic application security testing (DAST) into the CI/CD pipeline to catch basic injection and misconfiguration issues prior to deployment.</li>
            </ul>
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Terminal className="w-6 h-6 mr-3 text-cyan-400" />
            2. Methodology & Attack Surface
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="security-card p-6">
              <h3 className="text-xl font-bold text-white mb-4">Phased Approach</h3>
              <ol className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">01.</span>
                  <div>
                    <strong className="text-gray-200 block border-b border-gray-800 pb-1 mb-1">Reconnaissance</strong>
                    DNS enumeration, tech fingerprinting, and active spidering via Burp Suite.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">02.</span>
                  <div>
                    <strong className="text-gray-200 block border-b border-gray-800 pb-1 mb-1">Discovery</strong>
                    Fuzzing OAuth flows, JWT entropy analysis, and robust injection testing (SQLi, SSTI, XSS).
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">03.</span>
                  <div>
                    <strong className="text-gray-200 block border-b border-gray-800 pb-1 mb-1">Exploitation</strong>
                    Chaining IDOR flaws to achieve Full Account Takeover (ATO) and leveraging Python for automated token manipulation.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">04.</span>
                  <div>
                    <strong className="text-gray-200 block border-b border-gray-800 pb-1 mb-1">Remediation</strong>
                    Drafting exact code-level patches (FastAPI dependency overrides and Next.js strict headers).
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="security-card p-6 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-4">Custom Tooling Developed</h3>
              <ul className="space-y-4 flex-grow">
                <li className="flex items-center gap-3">
                  <FileJson className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <div>
                    <div className="text-gray-200 font-bold">idor-scanner.py</div>
                    <div className="text-sm text-gray-400">Automated auth boundary enumerator</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <div className="text-gray-200 font-bold">recon-passive.py</div>
                    <div className="text-sm text-gray-400">Cert Transparency log scrapper</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <div className="text-gray-200 font-bold">csp-analyzer.py</div>
                    <div className="text-sm text-gray-400">Strict header and CSP directive linter</div>
                  </div>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-gray-900 rounded border border-gray-800 text-sm font-mono text-cyan-400">
                <span className="text-gray-500">$</span> python idor-scanner.py --base-url api.tools.planmaestro.local --wordlist endpoints.txt
              </div>
            </div>
          </div>
        </section>

        {/* Findings Metrics */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Bug className="w-6 h-6 mr-3 text-cyan-400" />
            3. Vulnerability Metrics
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900/50 border border-red-500/30 p-4 rounded-lg text-center">
              <div className="text-4xl font-bold text-red-500 mb-1">4</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Critical</div>
            </div>
            <div className="bg-gray-900/50 border border-orange-500/30 p-4 rounded-lg text-center">
              <div className="text-4xl font-bold text-orange-500 mb-1">7</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">High</div>
            </div>
            <div className="bg-gray-900/50 border border-yellow-500/30 p-4 rounded-lg text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-1">8</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Medium</div>
            </div>
            <div className="bg-gray-900/50 border border-blue-500/30 p-4 rounded-lg text-center">
              <div className="text-4xl font-bold text-blue-500 mb-1">7</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Low/Info</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="security-card p-5 border-l-4 border-l-red-500">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                    [FINDING-002] Insecure Direct Object Reference (IDOR) on User API
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">CVSS 3.1: 9.1 • CWE-639 • OWASP A01:2021</p>
                </div>
                <span className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-500/30 rounded-full text-xs font-bold">
                  Remediated
                </span>
              </div>
              <div className="mt-4 text-gray-300 text-sm border-t border-gray-800 pt-3">
                <p><strong>Impact:</strong> Allowed any authenticated user to modify the profile data and system roles of any other user—including administrators—by altering the UUID parameter in PUT requests.</p>
                <p className="mt-2"><strong>Fix:</strong> Implemented a FastAPI <code>Depends</code> middleware to explicitly check resource ownership against the JWT <code>sub</code> claim before database commits.</p>
              </div>
            </div>

            <div className="security-card p-5 border-l-4 border-l-red-500">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                    [FINDING-005] Server-Side Template Injection (SSTI)
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">CVSS 3.1: 10.0 • CWE-1336 • OWASP A03:2021</p>
                </div>
                <span className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-500/30 rounded-full text-xs font-bold">
                  Remediated
                </span>
              </div>
              <div className="mt-4 text-gray-300 text-sm border-t border-gray-800 pt-3">
                <p><strong>Impact:</strong> The PDF Generator microservice passed unfiltered user input directly to the Handlebars compilation engine, enabling Remote Code Execution (RCE) on the Docker container via Node.js global objects.</p>
                <p className="mt-2"><strong>Fix:</strong> Disabled strict <code>allowedProtoMethods</code> in the Handlebars compiler and sandboxed template execution inside an isolated <code>vm2</code> context.</p>
              </div>
            </div>

            <div className="security-card p-5 border-l-4 border-l-orange-500">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                    [FINDING-001] CSRF Token Validation Bypass
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">CVSS 3.1: 8.1 • CWE-352 • OWASP A01:2021</p>
                </div>
                <span className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-500/30 rounded-full text-xs font-bold">
                  Remediated
                </span>
              </div>
              <div className="mt-4 text-gray-300 text-sm border-t border-gray-800 pt-3">
                <p><strong>Impact:</strong> Forced authenticated users to perform unwanted actions (like changing their recovery email) via malicious third-party sites by omitting the CSRF token header completely.</p>
                <p className="mt-2"><strong>Fix:</strong> Enforced strict presence-checks for CSRF tokens prior to validation within the API gateway.</p>
              </div>
            </div>

            <div className="security-card p-5 border-l-4 border-l-orange-500">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                    [FINDING-003] Stored Cross-Site Scripting (XSS) in Comment Threads
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">CVSS 3.1: 8.0 • CWE-79 • OWASP A03:2021</p>
                </div>
                <span className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-500/30 rounded-full text-xs font-bold">
                  Remediated
                </span>
              </div>
              <div className="mt-4 text-gray-300 text-sm border-t border-gray-800 pt-3">
                <p><strong>Impact:</strong> Allowed execution of arbitrary JavaScript in the browsers of victim users who viewed collaborative workspace comments, leading to potential session hijacking.</p>
                <p className="mt-2"><strong>Fix:</strong> Implemented strict HTML entity encoding on output rendering using <code>DOMPurify</code> in the React frontend components.</p>
              </div>
            </div>

            <div className="security-card p-5 border-l-4 border-l-yellow-500">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                    [FINDING-004] Session Fixation during OAuth Login Flow
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">CVSS 3.1: 6.8 • CWE-384 • OWASP A07:2021</p>
                </div>
                <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-bold">
                  In Progress
                </span>
              </div>
              <div className="mt-4 text-gray-300 text-sm border-t border-gray-800 pt-3">
                <p><strong>Impact:</strong> The application did not issue a new session identifier upon successful authentication. An attacker who could force a victim to use a known session ID could subsequently hijack their session post-login.</p>
                <p className="mt-2"><strong>Fix:</strong> Requires refactoring of the NextAuth session lifecycle implementation to forcefully rotate the session token upon every successful OAuth callback.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion / CTA */}
        <section className="text-center py-10 border-t border-gray-800 mt-12">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">100% Critical Vulnerabilities Remediated</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            The engineering team resolved all high-severity findings within a two-week SLA. 
            Automated regression testing was introduced in the CI pipeline to prevent future regressions.
          </p>
          <a target="_blank" href="https://github.com/planmaestro/redteam" className="inline-flex items-center justify-center p-[2px] rounded-lg bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 transition-all font-bold group cursor-pointer">
            <span className="flex items-center gap-2 bg-black px-6 py-3 rounded-md group-hover:bg-opacity-80 transition-all text-white">
              View Final Report Payload
            </span>
          </a>
        </section>

      </div>
    </div>
  )
}
