"use client"

import { Shield, ArrowLeft, Lock, Zap, Code, Cloud, Search, Terminal } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/app/lib/utils"
import { openMatrix } from "@/app/lib/openMatrix"

// Skills data structured by security domains
const skillCategories = [
  {
    id: "offensive",
    name: "Offensive Security",
    icon: Zap,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    borderColor: "border-red-400",
    skills: [
      { name: "Penetration Testing", level: 5, tools: ["Nmap", "Metasploit", "Burp Suite", "OWASP ZAP"] },
      { name: "Vulnerability Assessment", level: 5, tools: ["Nessus", "OpenVAS", "Qualys", "Rapid7"] },
      { name: "Web Application Testing", level: 5, tools: ["Burp Suite Pro", "OWASP ZAP", "Nikto", "SQLMap"] },
      { name: "Network Penetration", level: 4, tools: ["Nmap", "Wireshark", "Aircrack-ng", "Hashcat"] },
      { name: "Social Engineering", level: 4, tools: ["SET", "Gophish", "King Phisher"] },
      { name: "Exploit Development", level: 3, tools: ["Metasploit Framework", "Python", "Assembly"] }
    ]
  },
  {
    id: "defensive",
    name: "Defensive Security",
    icon: Shield,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400",
    skills: [
      { name: "Security Monitoring", level: 5, tools: ["Splunk", "ELK Stack", "SIEM", "Wazuh"] },
      { name: "Incident Response", level: 4, tools: ["TheHive", "MISP", "Volatility", "Autopsy"] },
      { name: "Threat Hunting", level: 4, tools: ["Sigma", "YARA", "CrowdStrike", "Carbon Black"] },
      { name: "Malware Analysis", level: 4, tools: ["IDA Pro", "Ghidra", "Wireshark", "Volatility"] },
      { name: "Digital Forensics", level: 3, tools: ["Autopsy", "FTK", "Volatility", "Sleuth Kit"] },
      { name: "Blue Team Operations", level: 4, tools: ["Sigma", "Suricata", "Snort", "Zeek"] }
    ]
  },
  {
    id: "appsec",
    name: "Application Security",
    icon: Code,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400",
    skills: [
      { name: "Secure Code Review", level: 5, tools: ["SonarQube", "Checkmarx", "Veracode", "CodeQL"] },
      { name: "SAST/DAST Implementation", level: 5, tools: ["Checkmarx", "Fortify", "OWASP ZAP", "Burp Suite"] },
      { name: "DevSecOps", level: 4, tools: ["Jenkins", "GitLab CI", "GitHub Actions", "Docker Security"] },
      { name: "API Security", level: 5, tools: ["Postman", "Insomnia", "OWASP API Security", "JWT Analysis"] },
      { name: "Container Security", level: 4, tools: ["Docker Bench", "Clair", "Trivy", "Falco"] },
      { name: "OWASP Top 10", level: 5, tools: ["Burp Suite", "OWASP ZAP", "Custom Scripts"] }
    ]
  },
  {
    id: "cloud",
    name: "Cloud Security",
    icon: Cloud,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400",
    skills: [
      { name: "AWS Security", level: 4, tools: ["IAM", "GuardDuty", "Security Hub", "Config"] },
      { name: "Azure Security", level: 4, tools: ["Azure Security Center", "Key Vault", "Sentinel"] },
      { name: "Kubernetes Security", level: 4, tools: ["Falco", "OPA Gatekeeper", "Aqua Security"] },
      { name: "Infrastructure as Code", level: 4, tools: ["Terraform", "CloudFormation", "Checkov"] },
      { name: "Container Orchestration", level: 3, tools: ["Docker", "Kubernetes", "OpenShift"] },
      { name: "Cloud Compliance", level: 4, tools: ["AWS Config", "Azure Policy", "GCP Security Command Center"] }
    ]
  },
  {
    id: "governance",
    name: "GRC & Compliance",
    icon: Lock,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400",
    skills: [
      { name: "Risk Assessment", level: 4, tools: ["FAIR", "OCTAVE", "NIST Framework"] },
      { name: "Compliance Management", level: 4, tools: ["SOC 2", "ISO 27001", "PCI DSS", "GDPR"] },
      { name: "Security Frameworks", level: 5, tools: ["NIST CSF", "CIS Controls", "OWASP"] },
      { name: "Policy Development", level: 4, tools: ["Security Policies", "Procedures", "Standards"] },
      { name: "Vendor Risk Management", level: 3, tools: ["Security Questionnaires", "Risk Ratings"] },
      { name: "Security Training", level: 4, tools: ["Awareness Programs", "Technical Training"] }
    ]
  },
  {
    id: "threat",
    name: "Threat Intelligence",
    icon: Search,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400",
    skills: [
      { name: "OSINT", level: 4, tools: ["Shodan", "Maltego", "theHarvester", "Recon-ng"] },
      { name: "Threat Hunting", level: 4, tools: ["MITRE ATT&CK", "Sigma Rules", "YARA"] },
      { name: "IOC Analysis", level: 4, tools: ["MISP", "OpenCTI", "ThreatConnect"] },
      { name: "Dark Web Monitoring", level: 3, tools: ["Tor", "I2P", "Custom Tools"] },
      { name: "CTI Platforms", level: 4, tools: ["MISP", "OpenCTI", "ThreatQ"] },
      { name: "Attribution Analysis", level: 3, tools: ["MITRE ATT&CK", "Diamond Model"] }
    ]
  }
]

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const renderSkillLevel = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={cn(
          "w-3 h-3 rounded-sm transition-all duration-300",
          i < level 
            ? "bg-cyan-400 shadow-sm shadow-cyan-400/50" 
            : "bg-gray-700 border border-gray-600"
        )}
      />
    ))
  }

  return (
    <div className="min-h-screen matrix-bg py-16 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-green-400 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <Terminal className="w-10 h-10 text-cyan-400" />
              <div>
                <h1 className="text-5xl font-bold mb-2">
                  <span className="cyber-glow text-cyan-400">Security</span>{" "}
                  <span className="text-green-400">Arsenal</span>
                </h1>
                <p className="text-xl text-gray-400">
                  <span className="text-green-400 font-mono">$</span> ./scan --expertise --tools --experience
                </p>
              </div>
            </div>
            
            <div className="security-card p-6 max-w-4xl relative">
              {/* Matrix Easter Egg - subtle inline */}
              <span 
                onClick={() => openMatrix("skills")}
                className="absolute top-3 right-3 text-[#ffaa00]/30 hover:text-[#ffaa00] transition-all duration-500 text-lg cursor-pointer"
                title="System override"
                aria-label="Override"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openMatrix("skills") }}
              >
                ☢⚠☣
              </span>
              <p className="text-lg text-gray-300 leading-relaxed">
                A comprehensive arsenal of cybersecurity skills, tools, and methodologies developed through 
                hands-on experience in <span className="text-cyan-400 font-semibold">offensive security</span>, 
                <span className="text-green-400 font-semibold"> defensive operations</span>, and 
                <span className="text-blue-400 font-semibold"> application security</span>. 
                Each skill has been battle-tested in real-world scenarios.
              </p>
              
              <div className="flex items-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="w-2 h-2 bg-cyan-400 rounded-sm" />
                    ))}
                  </div>
                  <span className="text-gray-400">Expert (5/5)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-2 h-2 bg-cyan-400 rounded-sm" />
                    ))}
                    <div className="w-2 h-2 bg-gray-700 border border-gray-600 rounded-sm" />
                  </div>
                  <span className="text-gray-400">Advanced (4/5)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-2 h-2 bg-cyan-400 rounded-sm" />
                    ))}
                    {[4, 5].map(i => (
                      <div key={i} className="w-2 h-2 bg-gray-700 border border-gray-600 rounded-sm" />
                    ))}
                  </div>
                  <span className="text-gray-400">Intermediate (3/5)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.id
              
              return (
                <div
                  key={category.id}
                  className={cn(
                    "security-card p-6 cursor-pointer transition-all duration-300 hover:scale-105",
                    isSelected && "ring-2 ring-cyan-400/50 scale-105"
                  )}
                  onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn("p-3 rounded-lg", category.bgColor)}>
                      <Icon className={cn("w-6 h-6", category.color)} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <p className="text-sm text-gray-400">
                        {category.skills.length} specializations
                      </p>
                    </div>
                  </div>
                  
                  {/* Skills Preview */}
                  <div className="space-y-2">
                    {category.skills.slice(0, 3).map((skill) => (
                      <div key={skill.name} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{skill.name}</span>
                        <div className="flex gap-1">
                          {renderSkillLevel(skill.level)}
                        </div>
                      </div>
                    ))}
                    {category.skills.length > 3 && (
                      <p className="text-xs text-gray-500">
                        +{category.skills.length - 3} more skills
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Detailed Skills View */}
          {selectedCategory && (
            <div className="mb-16">
              {skillCategories
                .filter(cat => cat.id === selectedCategory)
                .map((category) => {
                  const Icon = category.icon
                  
                  return (
                    <div key={category.id} className="security-card p-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className={cn("p-4 rounded-lg", category.bgColor, category.borderColor, "border")}>
                          <Icon className={cn("w-8 h-8", category.color)} />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold">{category.name}</h2>
                          <p className="text-gray-400">Detailed expertise breakdown</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {category.skills.map((skill) => (
                          <div 
                            key={skill.name}
                            className={cn(
                              "p-6 rounded-lg border transition-all duration-300",
                              "bg-gray-900/50 border-gray-700 hover:border-cyan-400/50",
                              hoveredSkill === skill.name && "border-cyan-400 shadow-lg shadow-cyan-400/20"
                            )}
                            onMouseEnter={() => setHoveredSkill(skill.name)}
                            onMouseLeave={() => setHoveredSkill(null)}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-lg font-semibold">{skill.name}</h4>
                              <div className="flex gap-1">
                                {renderSkillLevel(skill.level)}
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <p className="text-xs text-gray-400 mb-2">TOOLS & TECHNOLOGIES</p>
                                <div className="flex flex-wrap gap-2">
                                  {skill.tools.map((tool) => (
                                    <span 
                                      key={tool}
                                      className="px-2 py-1 bg-cyan-400/10 text-cyan-300 text-xs rounded border border-cyan-400/30"
                                    >
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="security-card p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">25+</div>
              <p className="text-sm text-gray-400">Security Tools Mastered</p>
            </div>
            <div className="security-card p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
              <p className="text-sm text-gray-400">Vulnerabilities Discovered</p>
            </div>
            <div className="security-card p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">15+</div>
              <p className="text-sm text-gray-400">Security Frameworks</p>
            </div>
            <div className="security-card p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">100+</div>
              <p className="text-sm text-gray-400">Security Assessments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
