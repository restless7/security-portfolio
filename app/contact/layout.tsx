import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Direct Channels",
  description:
    "Get in touch with Sebastián García for technical advisory, systems architecture consulting, or engineering collaboration.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
