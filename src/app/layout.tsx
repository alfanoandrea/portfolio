// src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata = {
  title: "alfanowski — portfolio",
  description: "Andrea — cybersecurity & dev.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it"> 
      <head>
      </head>
      <body className="bg-black text-gray-100 font-mono">
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        
        <Script
          id="iubenda-cookie-solution-widget"
          src="https://embeds.iubenda.com/widgets/15502478-cdbd-4769-b4ff-d41f28600268.js"
          strategy="afterInteractive" 
        />
        
        <Script
          id="iubenda-embed-js"
          src="https://cdn.iubenda.com/iubenda.js"
          strategy="lazyOnload" 
        />
        
      </body>
    </html>
  );
}