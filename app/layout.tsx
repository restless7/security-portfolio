import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MainLayout } from "./MainLayout";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.sentineldev.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sebastián García — Systems Architect · Applied AI & Security Engineering",
    template: "%s | Sebastián García",
  },
  description:
    "Engineering Beyond the Prototype. From architectural thinking to disciplined execution. Personal portfolio of Sebastián García, Systems Architect and Founder of APEX AI Solutions.",
  keywords: [
    "Sebastián García",
    "Systems Architect",
    "Applied AI Engineering",
    "Security Engineering",
    "Software Architecture",
    "Infrastructure Engineering",
    "APEX AI Solutions",
    "SentinelDev",
  ],
  authors: [{ name: "Sebastián García", url: siteUrl }],
  creator: "Sebastián García",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Sebastián García — SentinelDev",
    title: "Sebastián García — Systems Architect · Applied AI & Security Engineering",
    description:
      "Engineering Beyond the Prototype. From architectural thinking to disciplined execution.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastián García — Systems Architect · Applied AI & Security Engineering",
    description:
      "Engineering Beyond the Prototype. Systems Architect and Founder of APEX AI Solutions.",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sebastián García",
  alternateName: "Sebastian Garcia",
  jobTitle: "Systems Architect",
  description:
    "Systems Architect, Applied AI & Security Engineer, and Founder of APEX AI Solutions. Engineering Beyond the Prototype.",
  url: siteUrl,
  image: `${siteUrl}/brand/sg-logo-web.png`,
  sameAs: [
    "https://github.com/restless7",
    "https://instagram.com/sebgarcia.systems",
  ],
  knowsAbout: [
    "Systems Architecture",
    "Applied Artificial Intelligence",
    "Security Engineering",
    "Software Architecture",
    "Infrastructure Engineering",
  ],
  worksFor: {
    "@type": "Organization",
    name: "APEX AI Solutions",
    url: "https://www.apexaisolutions.dev/",
    description:
      "We engineer the systems modern businesses depend on. Secure by design. Resilient by architecture. Built for the real world.",
  },
  founder: {
    "@type": "Organization",
    name: "APEX AI Solutions",
    url: "https://www.apexaisolutions.dev/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="min-h-full bg-[#0B1119] text-[#EFF2F2] font-sans antialiased flex flex-col selection:bg-[#2F8CFF]/30 selection:text-[#EFF2F2]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
