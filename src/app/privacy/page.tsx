// src/app/privacy/page.tsx
"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-4xl mx-auto px-6 py-20 font-mono text-gray-100"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-cyan-400">
        Privacy Policy
      </h1>
      <p className="mb-4">
        This Privacy Policy describes how your personal information is collected, used, and shared when you visit or use my portfolio website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Information We Collect
      </h2>
      <p className="mb-4">
        This website does not directly collect any personally identifiable information from its users. The only data collected is non-personal data through cookies for website functionality and traffic analysis (e.g., Google Analytics, if implemented).
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Cookies
      </h2>
      <p className="mb-4">
        Cookies are small text files placed on your device to help the site provide a better user experience. In general, cookies are used to retain user preferences, store information for things like shopping carts, and provide anonymized tracking data to third-party applications like Google Analytics. As a rule, cookies will make your browsing experience better. However, you may prefer to disable cookies on this site and on others. The most effective way to do this is to disable cookies in your browser.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Changes to This Policy
      </h2>
      <p>
        I may update this privacy policy from time to time in order to reflect, for example, changes to my practices or for other operational, legal, or regulatory reasons.
      </p>
    </motion.div>
  );
} 