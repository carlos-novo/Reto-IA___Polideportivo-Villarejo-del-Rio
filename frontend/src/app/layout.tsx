import "./globals.css";
import type { Metadata } from "next";
import { AppShell } from "@/shared/layout/AppShell";

export const metadata: Metadata = {
  title: "Polideportivo | Villarejo del Río",
  description: "Sistema de gestión municipal (demo con datos simulados)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
