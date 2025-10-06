// src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsentModal from "@/components/CookieConsentModal"; // Importa il nuovo componente

export const metadata = {
  title: "alfanowski — portfolio",
  description: "Andrea — cybersecurity & dev.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-black text-gray-100 font-mono">
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <CookieConsentModal /> {/* Aggiungi il popup qui */}
      </body>
    </html>
  );
}