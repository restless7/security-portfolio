export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "saas-startups-fail-security",
    title: "Why 90% of SaaS Startups Fail at Security (and the $4.88M Cost)",
    excerpt: "Last month, a 50-person SaaS startup lost a $2M enterprise deal because of a single missing security header. Here's why security debt is killing SaaS companies and exactly how to fix it.",
    author: "Sebastian Garcia",
    date: "December 2024",
    readTime: "8 min read",
    category: "Security Strategy",
    tags: ["SaaS Security", "Startup Security", "Security Debt", "Compliance"],
    featured: true
  },
  {
    slug: "react-lead-capture-security-best-practices",
    title: "Building Secure React Lead Capture Forms with Progressive Disclosure",
    excerpt: "A complete guide to building high-converting lead capture forms that prioritize security, user experience, and GDPR compliance. Includes ready-to-use React components and best practices.",
    author: "Sebastian Garcia",
    date: "December 2024",
    readTime: "12 min read",
    category: "Application Security",
    tags: ["React Security", "Form Security", "GDPR", "Progressive Disclosure"],
    featured: true
  }
];
