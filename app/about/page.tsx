"use client"

import { User, ArrowLeft, Shield, Code, Target, Lightbulb, BookOpen, Users, Award, ChevronRight, Quote } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/app/lib/utils"

// Timeline data
const timeline = [
  {
    year: "2020",
    title: "Cybersecurity Foundation",
    role: "Security Analyst",
    company: "TechCorp Solutions",
    type: "career",
    icon: Shield,
    description: "Started cybersecurity journey focusing on vulnerability assessments and security monitoring. Discovered passion for ethical hacking and defensive security operations.",
    achievements: [
      "Conducted 50+ vulnerability assessments",
      "Implemented first SIEM deployment",
      "Identified critical zero-day vulnerability",
      "Led security awareness training program"
    ],
    technologies: ["Nessus", "Wireshark", "Splunk", "OWASP ZAP"]
  },
  {
    year: "2021",
    title: "Penetration Testing Specialization",
    role: "Junior Penetration Tester",
    company: "SecureNet Consulting",
    type: "career",
    icon: Target,
    description: "Transitioned to offensive security, specializing in web application security testing and network penetration testing for enterprise clients.",
    achievements: [
      "Executed 100+ penetration tests",
      "Developed custom exploitation tools",
      "Mentored 3 junior security analysts",
      "Achieved 98% client satisfaction rating"
    ],
    technologies: ["Burp Suite Pro", "Metasploit", "Nmap", "Custom Python Scripts"]
  },
  {
    year: "2022",
    title: "Application Security Leadership",
    role: "Senior Application Security Engineer",
    company: "FinTech Innovations",
    type: "career",
    icon: Code,
    description: "Led application security initiatives in financial technology, implementing DevSecOps practices and secure code review processes.",
    achievements: [
      "Reduced security vulnerabilities by 85%",
      "Implemented automated security testing",
      "Built secure development lifecycle",
      "Trained 50+ developers in secure coding"
    ],
    technologies: ["SonarQube", "Checkmarx", "Jenkins", "Docker Security"]
  },
  {
    year: "2023",
    title: "CISSP Certification",
    role: "Professional Milestone",
    company: "ISC²",
    type: "milestone",
    icon: Award,
    description: "Achieved CISSP certification, validating expertise across all eight security domains and establishing credibility as a security professional.",
    achievements: [
      "Passed CISSP exam on first attempt",
      "Endorsed by senior security professionals",
      "Committed to continuing education",
      "Joined local CISSP chapter"
    ],
    technologies: ["Security Management", "Risk Assessment", "Compliance Frameworks"]
  },
  {
    year: "2024",
    title: "Cybersecurity Consultant",
    role: "Independent Security Consultant",
    company: "Self-Employed",
    type: "career",
    icon: Lightbulb,
    description: "Launched independent consulting practice, helping organizations build comprehensive security programs and mature their security posture.",
    achievements: [
      "Served 15+ enterprise clients",
      "Developed security strategy frameworks",
      "Led incident response exercises",
      "Speaking at security conferences"
    ],
    technologies: ["NIST Framework", "ISO 27001", "Cloud Security", "Threat Modeling"]
  }
]

const philosophyPrinciples = [
  {
    title: "Security by Design",
    icon: Shield,
    description: "Security isn't an afterthought—it's the foundation. Every system, application, and process should be architected with security as a core principle from day one.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10"
  },
  {
    title: "Continuous Learning",
    icon: BookOpen,
    description: "The threat landscape evolves daily. Staying ahead requires constant learning, experimentation, and adaptation to new attack vectors and defense techniques.",
    color: "text-green-400",
    bgColor: "bg-green-400/10"
  },
  {
    title: "Ethical Responsibility",
    icon: Users,
    description: "With great power comes great responsibility. Security professionals must always act ethically, protecting user privacy and organizational assets with integrity.",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10"
  },
  {
    title: "Practical Excellence",
    icon: Target,
    description: "Theory without practice is useless. Every security measure must be tested, validated, and proven effective in real-world scenarios.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10"
  }
]

const personalStats = [
  { label: "Years in Cybersecurity", value: "4+", color: "text-cyan-400" },
  { label: "Security Assessments", value: "200+", color: "text-green-400" },
  { label: "Vulnerabilities Found", value: "500+", color: "text-red-400" },
  { label: "Developers Trained", value: "100+", color: "text-purple-400" },
  { label: "Certifications Earned", value: "5+", color: "text-yellow-400" },
  { label: "Conference Talks", value: "12+", color: "text-blue-400" }
]

export default function AboutPage() {
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>("journey")

  return (
    <div className="min-h-screen matrix-bg py-16">
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
              <User className="w-10 h-10 text-cyan-400" />
              <div>
                <h1 className="text-5xl font-bold mb-2">
                  <span className="cyber-glow text-cyan-400">About</span>{" "}
                  <span className="text-green-400">Sebastian</span>
                </h1>
                <p className="text-xl text-gray-400">
                  <span className="text-green-400 font-mono">$</span> ./whoami --verbose --philosophy --journey
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-4">
              {["journey", "philosophy", "approach", "stats"].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={cn(
                    "px-6 py-3 rounded-lg font-medium transition-all duration-300",
                    activeSection === section
                      ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/50"
                      : "bg-gray-800/50 text-gray-400 border border-gray-600 hover:border-cyan-400/50 hover:text-cyan-400"
                  )}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Professional Journey */}
          {activeSection === "journey" && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="text-cyan-400">Professional</span>{" "}
                  <span className="text-green-400">Journey</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                  From curious developer to cybersecurity professional—a journey driven by the desire to 
                  protect digital assets and build secure systems that people can trust.
                </p>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-green-400 to-purple-400"></div>
                
                <div className="space-y-8">
                  {timeline.map((item) => {
                    const Icon = item.icon
                    const isSelected = selectedTimelineItem === item.year
                    
                    return (
                      <div
                        key={item.year}
                        className={cn(
                          "relative ml-16 cursor-pointer transition-all duration-300",
                          isSelected && "scale-105"
                        )}
                        onClick={() => setSelectedTimelineItem(isSelected ? null : item.year)}
                      >
                        {/* Timeline Node */}
                        <div className={cn(
                          "absolute -left-20 top-4 w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all duration-300",
                          item.type === "milestone" 
                            ? "bg-yellow-400 border-yellow-400 shadow-lg shadow-yellow-400/50"
                            : "bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50",
                          isSelected && "scale-125"
                        )}>
                          <Icon className="w-4 h-4 text-gray-900" />
                        </div>

                        {/* Content Card */}
                        <div className={cn(
                          "security-card p-6 transition-all duration-300",
                          isSelected && "ring-2 ring-cyan-400/50"
                        )}>
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
                                  {item.year}
                                </span>
                                <h3 className="text-xl font-bold">{item.title}</h3>
                              </div>
                              <p className="text-gray-400">
                                <span className="font-semibold">{item.role}</span>
                                {item.company !== "Self-Employed" && item.company !== "ISC²" && (
                                  <> • {item.company}</>
                                )}
                              </p>
                            </div>
                          </div>

                          <p className="text-gray-300 leading-relaxed mb-4">
                            {item.description}
                          </p>

                          {isSelected && (
                            <div className="space-y-4 border-t border-gray-700 pt-4">
                              <div>
                                <h4 className="text-sm font-semibold text-green-400 mb-2">KEY ACHIEVEMENTS</h4>
                                <ul className="space-y-1">
                                  {item.achievements.map((achievement) => (
                                    <li key={achievement} className="flex items-start gap-2 text-sm text-gray-300">
                                      <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                      {achievement}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-sm font-semibold text-purple-400 mb-2">TECHNOLOGIES</h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.technologies.map((tech) => (
                                    <span 
                                      key={tech}
                                      className="px-2 py-1 bg-purple-400/10 text-purple-300 text-xs rounded border border-purple-400/30"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Security Philosophy */}
          {activeSection === "philosophy" && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="text-cyan-400">Security</span>{" "}
                  <span className="text-green-400">Philosophy</span>
                </h2>
                <div className="max-w-4xl mx-auto">
                  <div className="security-card p-8 mb-8">
                    <Quote className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
                    <blockquote className="text-2xl font-light text-gray-300 leading-relaxed text-center italic">
                      &ldquo;Security is not a product, but a process. It&rsquo;s not a destination, but a journey. 
                      Every line of code is a potential entry point&mdash;my mission is to ensure it&rsquo;s not.&rdquo;
                    </blockquote>
                    <footer className="text-right mt-6">
                      <cite className="text-cyan-400 font-semibold">— Sebastian García</cite>
                    </footer>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {philosophyPrinciples.map((principle) => {
                  const Icon = principle.icon
                  
                  return (
                    <div key={principle.title} className="security-card p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={cn("p-4 rounded-lg", principle.bgColor)}>
                          <Icon className={cn("w-8 h-8", principle.color)} />
                        </div>
                        <h3 className="text-2xl font-bold">{principle.title}</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* My Approach */}
          {activeSection === "approach" && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="text-cyan-400">My</span>{" "}
                  <span className="text-green-400">Approach</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                  How I tackle cybersecurity challenges and deliver value to organizations and clients.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Methodology */}
                <div className="security-card p-8">
                  <h3 className="text-xl font-bold mb-4 text-cyan-400">Methodology</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                      <div>
                        <strong className="text-gray-200">Assessment First:</strong>
                        <p className="text-sm text-gray-400">Understand current security posture before implementing changes</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                      <div>
                        <strong className="text-gray-200">Risk-Based Priority:</strong>
                        <p className="text-sm text-gray-400">Focus on highest-impact vulnerabilities and threats</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                      <div>
                        <strong className="text-gray-200">Iterative Improvement:</strong>
                        <p className="text-sm text-gray-400">Continuous enhancement through monitoring and feedback</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Values */}
                <div className="security-card p-8">
                  <h3 className="text-xl font-bold mb-4 text-green-400">Core Values</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <strong className="text-gray-200">Transparency:</strong>
                        <p className="text-sm text-gray-400">Clear communication about risks, solutions, and progress</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <strong className="text-gray-200">Collaboration:</strong>
                        <p className="text-sm text-gray-400">Work with teams to build security culture, not barriers</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <strong className="text-gray-200">Excellence:</strong>
                        <p className="text-sm text-gray-400">Deliver high-quality results that exceed expectations</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Specializations */}
                <div className="security-card p-8">
                  <h3 className="text-xl font-bold mb-4 text-purple-400">Specializations</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <strong className="text-gray-200">Application Security:</strong>
                        <p className="text-sm text-gray-400">Secure code review, SAST/DAST, API security</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <strong className="text-gray-200">Penetration Testing:</strong>
                        <p className="text-sm text-gray-400">Web apps, networks, social engineering assessments</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <strong className="text-gray-200">DevSecOps:</strong>
                        <p className="text-sm text-gray-400">Integrating security into CI/CD pipelines</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Why Choose Me */}
              <div className="security-card p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  <span className="text-cyan-400">Why Choose</span>{" "}
                  <span className="text-green-400">Sebastian</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-cyan-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Proven Results</h4>
                    <p className="text-sm text-gray-400">Track record of reducing security risks and improving organizational security posture</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="w-8 h-8 text-green-400" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Innovative Solutions</h4>
                    <p className="text-sm text-gray-400">Creative approaches to complex security challenges using latest tools and methodologies</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-purple-400" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Team-Focused</h4>
                    <p className="text-sm text-gray-400">Collaborative approach that builds security culture and empowers development teams</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Personal Stats */}
          {activeSection === "stats" && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="text-cyan-400">By The</span>{" "}
                  <span className="text-green-400">Numbers</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                  Quantified impact and professional achievements in cybersecurity.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
                {personalStats.map((stat) => (
                  <div key={stat.label} className="security-card p-6 text-center">
                    <div className={cn("text-4xl font-bold mb-2", stat.color)}>
                      {stat.value}
                    </div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Experience Highlights */}
              <div className="security-card p-8">
                <h3 className="text-2xl font-bold mb-6 text-center text-cyan-400">Experience Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-gray-800/30 rounded-lg">
                    <Shield className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Enterprise Clients</h4>
                    <p className="text-sm text-gray-400">Fortune 500 companies in finance, healthcare, and technology sectors</p>
                  </div>
                  <div className="text-center p-6 bg-gray-800/30 rounded-lg">
                    <Target className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Critical Findings</h4>
                    <p className="text-sm text-gray-400">Discovered vulnerabilities that could have led to major data breaches</p>
                  </div>
                  <div className="text-center p-6 bg-gray-800/30 rounded-lg">
                    <Code className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Secure Development</h4>
                    <p className="text-sm text-gray-400">Implemented security practices across multiple development teams</p>
                  </div>
                  <div className="text-center p-6 bg-gray-800/30 rounded-lg">
                    <Users className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Training & Mentorship</h4>
                    <p className="text-sm text-gray-400">Developed and delivered security training to hundreds of professionals</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center">
            <div className="security-card p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-cyan-400">Ready to</span>{" "}
                <span className="text-green-400">Collaborate?</span>
              </h3>
              <p className="text-gray-400 mb-6">
                Let&rsquo;s discuss how we can strengthen your organization&rsquo;s security posture and 
                build resilient systems that protect what matters most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="terminal-border rounded-md bg-cyan-400 px-6 py-3 text-sm font-semibold text-black shadow-sm hover:bg-green-400 transition-all duration-300"
                >
                  Get In Touch
                </Link>
                <Link
                  href="/projects"
                  className="security-card px-6 py-3 text-sm font-semibold text-cyan-400 hover:text-green-400 transition-colors duration-300"
                >
                  View My Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
