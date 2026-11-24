import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Capabilities & Disciplines",
  description:
    "Core competencies across systems architecture, applied artificial intelligence, security engineering, and cloud infrastructure.",
  alternates: {
    canonical: "/skills",
  },
};

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
