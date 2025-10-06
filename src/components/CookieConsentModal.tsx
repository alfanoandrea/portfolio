// src/components/CookieConsentModal.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function CookieConsentModal() {
  const [showBanner, setShowBanner] = useState(false);
  const pathname = usePathname();

  // Nome del cookie che usiamo per tracciare il consenso
  const CONSENT_COOKIE_NAME = "my-portfolio-cookie-consent";
  const CONSENT_COOKIE_VALUE = "accepted"; // Valore che indica l'accettazione

  useEffect(() => {
    // Controlla se il cookie esiste e se non siamo già sulla pagina della privacy
    const hasConsent = document.cookie.includes(`${CONSENT_COOKIE_NAME}=${CONSENT_COOKIE_VALUE}`);

    if (!hasConsent && pathname !== "/privacy") {
      setShowBanner(true);
      // Blocca lo scroll per forzare l'interazione
      document.body.style.overflow = "hidden";
    } else {
      // Se il consenso esiste, assicurati che lo scroll sia attivo (utile al caricamento)
      document.body.style.overflow = "auto";
      setShowBanner(false);
    }
  }, [pathname]);

  const handleAccept = () => {
    // *** CORREZIONE CRITICA: SCRIVI IL COOKIE CON UNA SCADENZA ***
    const expiryDate = new Date();
    // Imposta la scadenza a 365 giorni
    expiryDate.setTime(expiryDate.getTime() + (365 * 24 * 60 * 60 * 1000));

    // Scrive il cookie, rendendolo valido su tutto il sito (path=/) e persistente (expires)
    document.cookie = `${CONSENT_COOKIE_NAME}=${CONSENT_COOKIE_VALUE}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax;`;
    
    // Chiude il banner e riabilita lo scroll
    setShowBanner(false);
    document.body.style.overflow = "auto";
  };

  const handleDecline = () => {
    // Al rifiuto, semplicemente chiudiamo il banner senza salvare il consenso.
    // Il banner riapparirà alla prossima sessione/visita finché non viene accettato.
    setShowBanner(false);
    document.body.style.overflow = "auto";
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