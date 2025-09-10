import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/app/components/Navigation";
import { Toaster } from "sonner";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sebastian García - Cybersecurity & AppSec Specialist",
  description: "Professional cybersecurity portfolio showcasing secure development practices, penetration testing expertise, and application security solutions. Built with security-first architecture.",
  keywords: "cybersecurity, application security, penetration testing, secure coding, OWASP, vulnerability assessment, security audit",
  authors: [{ name: "Sebastian García" }],
  creator: "Sebastian García",
  robots: "index, follow",
  openGraph: {
    title: "Sebastian García - Cybersecurity Professional",
    description: "Secure by Design portfolio demonstrating cybersecurity expertise through practical implementation.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastian García - Cybersecurity Specialist",
    description: "Professional cybersecurity portfolio with security-first architecture",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${jetbrainsMono.variable} h-full antialiased`}>
        <Navigation />
        <main>{children}</main>
        <Toaster 
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--card)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
            },
          }}
        />
      </body>
    </html>
  );
}
