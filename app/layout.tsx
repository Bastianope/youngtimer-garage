import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Youngtimer Garage — Ton garage. Leur histoire.",
  description:
    "Youngtimer Garage est la plateforme française pour les passionnés de voitures youngtimer et classiques modernes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`h-full antialiased ${fraunces.variable}`}>
      <body className="min-h-full flex flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}