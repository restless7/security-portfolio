import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sebastián García — Systems Architect · Applied AI & Security Engineering",
  description:
    "Engineering Beyond the Prototype. From architectural thinking to disciplined execution. Personal portfolio of Sebastián García, Systems Architect and Founder of APEX AI Solutions.",
  keywords: [
    "Sebastián García",
    "Systems Architect",
    "Applied AI",
    "Security Engineering",
    "Software Architecture",
    "APEX AI Solutions",
  ],
  authors: [{ name: "Sebastián García", url: "https://www.sentineldev.me" }],
  creator: "Sebastián García",
  robots: "index, follow",
  openGraph: {
    title: "Sebastián García — Systems Architect · Applied AI & Security Engineering",
    description:
      "Engineering Beyond the Prototype. Designing and building dependable systems across software architecture, applied AI, security engineering, and infrastructure.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastián García — Systems Architect",
    description:
      "Engineering Beyond the Prototype. Systems Architect and Founder of APEX AI Solutions.",
  },
};

export default function HomePage({ children }: { children: React.ReactNode }) {
  return children;
}
