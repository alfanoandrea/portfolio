// src/components/CookieConsentModal.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function CookieConsentModal() {
  const [showBanner, setShowBanner] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Controlla se il cookie esiste E se non siamo già sulla pagina della privacy
    const hasConsent = document.cookie.includes("my-portfolio-cookie-consent");
    if (!hasConsent && pathname !== "/privacy") {
      setShowBanner(true);
      document.body.style.overflow = "hidden";
    }
  }, [pathname]); // Aggiungi pathname come dipendenza per reagire al cambio di rotta

  const handleAccept = () => {
    setShowBanner(false);
    document.body.style.overflow = "auto";
  };

  const handleDecline = () => {
    setShowBanner(false);
    document.body.style.overflow = "auto";
    // Qui puoi implementare la logica per disabilitare i cookie non essenziali.
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div 
        className="relative z-50 p-8 w-full max-w-sm rounded-lg shadow-xl font-mono text-center"
        style={{
          background: "rgba(10, 10, 10, 0.9)",
          border: "1px solid rgba(22, 78, 99, 0.4)",
        }}
      >
        <h2 className="text-xl font-bold mb-4 text-white">
          Cookie Consent
        </h2>
        <p className="text-sm mb-6 text-gray-400">
          This website uses cookies to enhance the user experience. By continuing, you agree to our use of cookies.
        </p>
        <Link 
          href="/privacy" 
          className="text-sm text-cyan-400 hover:underline transition-colors mb-4 block"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Read Privacy Policy
        </Link>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleAccept}
            className="px-6 py-2 rounded-lg font-bold text-black bg-cyan-400 hover:bg-cyan-500 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="px-6 py-2 rounded-lg font-bold text-gray-400 border border-gray-400 hover:text-gray-200 hover:border-gray-200 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}