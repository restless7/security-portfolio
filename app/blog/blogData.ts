export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category:
  | "Architecture Notes"
  | "Applied AI"
  | "Security Engineering"
  | "Application Security"
  | "Infrastructure"
  | "Engineering Decisions";
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "saas-startups-fail-security",
    title: "Architectural Security Debt in Early-Stage SaaS Systems",
    excerpt:
      "Why deferred security boundaries compound engineering cost, and the five structural layers—tenant authorization, cloud baselines, API validation, CI gates, and compliance readiness—that hold up under scrutiny.",
    author: "Sebastián García",
    date: "December 2024",
    readTime: "7 min read",
    category: "Security Engineering",
    tags: ["SaaS Architecture", "Authorization", "Security Debt", "DevSecOps"],
    featured: true,
  },
  {
    slug: "react-lead-capture-security-best-practices",
    title: "Building Secure React Lead Capture Forms with Progressive Disclosure",
    excerpt:
      "Designing lead capture interfaces in React with progressive disclosure, schema validation, input sanitization, rate limiting, and explicit data-handling boundaries.",
    author: "Sebastián García",
    date: "December 2024",
    readTime: "10 min read",
    category: "Application Security",
    tags: ["React", "Zod Validation", "Form Security", "Progressive Disclosure"],
    featured: true,
  },
];
