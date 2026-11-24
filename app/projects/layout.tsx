import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Systems & Architecture Projects",
  description:
    "Selected engineering systems, applied AI platforms, security architectures, and infrastructure projects built by Sebastián García.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
