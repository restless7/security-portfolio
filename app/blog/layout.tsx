import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture & Engineering Notes",
  description:
    "Technical notes, architectural decisions, and applied engineering reflections by Sebastián García.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
