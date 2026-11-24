export interface Service {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  deliveryChannel: string;
  packageFeatures: string[];
  outcome: string;
  ctaLink: string;
  ctaLabel: string;
  external?: boolean;
}

export const servicesData: Service[] = [
  {
    id: "systems-architecture",
    label: "01 / Architecture Advisory",
    title: "Systems & Software Architecture Review",
    subtitle: "Clarify domain boundaries, data ownership, and scaling tradeoffs",
    deliveryChannel: "Technical advisory · Individual or via APEX AI Solutions",
    packageFeatures: [
      "Bounded-context and modular monolith boundary review",
      "PostgreSQL isolation, Row-Level Security (RLS), and schema design",
      "API contract and error-discipline alignment",
      "Architecture Decision Records (ADRs) for key technical tradeoffs",
    ],
    outcome:
      "A clear, documented architectural blueprint highlighting structural bottlenecks, boundary risks, and pragmatic next steps.",
    ctaLink: "/contact",
    ctaLabel: "Discuss Architecture",
  },
  {
    id: "applied-ai-governance",
    label: "02 / Applied AI Systems",
    title: "Governed AI & Agentic Orchestration",
    subtitle: "Build retrieval and agent workflows with deterministic boundaries",
    deliveryChannel: "Architecture & implementation · APEX AI Solutions",
    packageFeatures: [
      "Tenant and ACL pre-filtering prior to vector similarity ranking",
      "Citation provenance and abstention policies for RAG systems",
      "Async webhook decoupling and queue-backed model orchestration",
      "Evaluation baselines separating prototype behavior from rollout readiness",
    ],
    outcome:
      "AI integrations engineered around real access controls, observable failure modes, and bounded model permissions.",
    ctaLink: "/contact",
    ctaLabel: "Explore AI Systems",
  },
  {
    id: "security-engineering",
    label: "03 / Security Engineering",
    title: "Application Security & Hardening",
    subtitle: "Treat security as an inherent property of the codebase and runtime",
    deliveryChannel: "Security review · Individual or via APEX AI Solutions",
    packageFeatures: [
      "Authentication vs. object-level authorization boundary review",
      "Strict CSP, HSTS, CORS, and transport header configuration",
      "Schema validation, input sanitization, and rate-limiting controls",
      "CI/CD security checks and environment isolation hygiene",
    ],
    outcome:
      "Actionable code-level remediations and hardened defaults verified against concrete threat paths rather than generic checklists.",
    ctaLink: "/contact",
    ctaLabel: "Request Security Review",
  },
  {
    id: "apex-commercial-delivery",
    label: "04 / Commercial Delivery",
    title: "Custom Software & Enterprise Delivery",
    subtitle: "Full-lifecycle commercial product and infrastructure execution",
    deliveryChannel: "Delivered commercially through APEX AI Solutions",
    packageFeatures: [
      "End-to-end web platforms, client portals, and internal tooling",
      "Production Linux deployment, reverse proxies, and service supervision",
      "Structured project scoping, milestones, and commercial contracting",
      "Dedicated follow-through managed under APEX AI Solutions",
    ],
    outcome:
      "Commercial delivery handled by APEX AI Solutions while keeping sentineldev.me focused on personal engineering work.",
    ctaLink: "https://www.apexaisolutions.dev/",
    ctaLabel: "Visit APEX AI Solutions",
    external: true,
  },
];
