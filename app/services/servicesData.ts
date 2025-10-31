export interface Service {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  priceRange: string;
  packageFeatures: string[];
  outcome: string;
  ctaLink: string;
}

export const servicesData: Service[] = [
  {
    id: "application-security",
    emoji: "🎯",
    title: "Application Security Assessment",
    subtitle: "Find and fix vulnerabilities before attackers do",
    priceRange: "$3,000 – $15,000",
    packageFeatures: [
      "Static and Dynamic code analysis",
      "API security testing and validation",
      "Authentication & authorization review",
      "Security headers and configuration audit",
      "DevSecOps pipeline security recommendations"
    ],
    outcome: "Get a comprehensive security report with prioritized fixes and clear remediation steps. Most clients close critical vulnerabilities within 2 weeks.",
    ctaLink: "/contact"
  },
  {
    id: "cloud-security",
    emoji: "☁️",
    title: "Cloud Security Posture Review",
    subtitle: "Secure your cloud infrastructure before it costs you",
    priceRange: "$5,000 – $20,000",
    packageFeatures: [
      "AWS/Azure/GCP security configuration audit",
      "IAM and access control optimization",
      "Compliance readiness assessment (SOC2, HIPAA, PCI-DSS)",
      "Monitoring and alerting implementation",
      "Incident response plan development"
    ],
    outcome: "Reduce your cloud attack surface by 70%+ and accelerate compliance certification. Includes a detailed roadmap with quick wins and long-term improvements.",
    ctaLink: "/contact"
  },
  {
    id: "penetration-testing",
    emoji: "🔍",
    title: "Penetration Testing",
    subtitle: "See your security through an attacker's eyes",
    priceRange: "$8,000 – $25,000",
    packageFeatures: [
      "External network and web application testing",
      "Internal security assessment",
      "Social engineering simulations (optional)",
      "Detailed findings with proof-of-concept",
      "Executive and technical reports"
    ],
    outcome: "Satisfy compliance requirements and identify real-world attack vectors. Includes step-by-step remediation guidance your team can implement immediately.",
    ctaLink: "/contact"
  },
  {
    id: "devsecops-pipeline",
    emoji: "🚀",
    title: "DevSecOps Pipeline Security",
    subtitle: "Build security into your development workflow",
    priceRange: "$4,000 – $12,000",
    packageFeatures: [
      "CI/CD pipeline security assessment",
      "SAST/DAST tool selection and integration",
      "Infrastructure-as-Code security scanning",
      "Secrets management implementation",
      "Container and Kubernetes hardening"
    ],
    outcome: "Catch vulnerabilities before production and reduce security debt. Most teams see a 60% reduction in production security issues within the first quarter.",
    ctaLink: "/contact"
  },
  {
    id: "security-compliance",
    emoji: "📋",
    title: "Security Compliance Consulting",
    subtitle: "Get SOC2 certified without the headache",
    priceRange: "$2,000 – $8,000/month retainer",
    packageFeatures: [
      "SOC2 Type I/II readiness assessment",
      "Security policies and procedures creation",
      "Employee security training programs",
      "Ongoing compliance monitoring",
      "Audit preparation and support"
    ],
    outcome: "Achieve SOC2 certification 40% faster with our streamlined approach. Win enterprise deals and build a security program that scales with your business.",
    ctaLink: "/contact"
  }
];
