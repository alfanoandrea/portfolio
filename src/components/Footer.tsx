// src/components/Footer.tsx
"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-black py-8 px-6 mt-20 font-mono text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-5xl mx-auto border-t border-gray-800 pt-8"
      >
        {/* MODIFICA: flex-col rimosso/sostituito per mantenere i link sulla stessa riga ovunque */}
        <div className="flex flex-row justify-center items-center gap-2 mb-4">
          
          {/* Link Privacy Policy Iubenda */}
          <a
            href="https://www.iubenda.com/privacy-policy/78496253"
            className="text-sm hover:underline iubenda-black iubenda-noiframe iubenda-embed iubenda-noiframe"
            style={{ color: "#9ca3af" }}
            title="Privacy Policy"
          >
            Privacy Policy
          </a>

          {/* Link Cookie Policy Iubenda */}
          <a
            href="https://www.iubenda.com/privacy-policy/78496253/cookie-policy"
            className="text-sm hover:underline iubenda-black iubenda-noiframe iubenda-embed iubenda-noiframe"
            style={{ color: "#9ca3af" }}
            title="Cookie Policy"
          >
            Cookie Policy
          </a>
        </div>
        <p className="text-sm" style={{ color: "#d1d5db" }}>
          &copy; 2025 alfanowski. All Rights Reserved.
        </p>
      </motion.div>
    </footer>
  );
}