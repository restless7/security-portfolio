import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Security Posture & Headers",
  description:
    "Transparent inspection of HTTP security headers, CSP, and defensive controls operating on sentineldev.me.",
  alternates: {
    canonical: "/security-posture",
  },
};

export default function SecurityPostureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
