"use client";

import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { usePathname } from "next/navigation";
// import { Toaster } from "sonner";
// import { ErrorBoundary } from "@/app/components/ErrorBoundary";

export function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOperacionesRoute = pathname?.startsWith('/operaciones');

  return (
    <>
      <>
        {/* Simplified layout for debugging */}
        <main className={isOperacionesRoute ? "h-full" : "flex-grow"}>
          {children}
        </main>
      </>
      {/* <Toaster 
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#111111',
            color: '#e5e5e5',
            border: '1px solid #333333',
          },
        }}
      /> */}
    </>
  );
}
