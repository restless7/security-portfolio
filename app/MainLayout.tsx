"use client";

import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { usePathname } from "next/navigation";

export function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChromeHidden =
    pathname?.startsWith("/operaciones") || pathname?.startsWith("/matrix-rain");

  return (
    <>
      {!isChromeHidden && <Navigation />}
      <main className={isChromeHidden ? "h-full" : "flex-grow"}>
        {children}
      </main>
      {!isChromeHidden && <Footer />}
    </>
  );
}
