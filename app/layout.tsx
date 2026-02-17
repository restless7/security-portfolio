import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MainLayout } from "./MainLayout";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sebastian García - Cybersecurity & AppSec Specialist",
  description: "Professional cybersecurity portfolio showcasing secure development practices, penetration testing expertise, and application security solutions.",
  keywords: ["cybersecurity", "application security", "penetration testing", "secure coding", "OWASP", "vulnerability assessment", "security audit"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${jetbrainsMono.variable} h-full antialiased flex flex-col`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
