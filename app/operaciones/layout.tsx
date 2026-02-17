import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Operaciones - Centro Electoral",
    description: "Sistema de control de operaciones electorales",
};

export default function OperacionesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen w-full overflow-hidden">
            {children}
        </div>
    );
}
