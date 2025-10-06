"use client";

import { motion, Variants } from "framer-motion"; // Importiamo Variants
import { FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";
import React, { useState } from "react"; // Importiamo React per la tipizzazione

// Tipizzazione per lo stato del form
interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  // Tipizzazione esplicita per useState
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  // Tipizzazione corretta per l'evento di cambio di input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Tipizzazione corretta per l'evento di submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message successfully sent. I will reply as soon as possible.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("There was a network error. Please try again.");
    }
  };

  // Definizioni delle varianti Framer Motion (SENZA la transizione)
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section 
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 font-mono" 
      style={{ backgroundColor: "#000000", color: "#f3f4f6" }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        // Transizione applicata qui, come prop separata
        transition={{ duration: 0.8, type: "spring" }} 
        className="flex flex-col items-center gap-6 text-center max-w-2xl w-full"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg mb-2" style={{ color: "#22d3ee" }}>
          Contact
        </h1>
        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          // Transizione applicata qui
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg mb-4"
          style={{ color: "#d1d5db" }}
        >
          Sei interessato a collaborare o hai bisogno di un sito web? Contattami!
        </motion.p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        // Transizione applicata qui
        transition={{ delay: 0.4, duration: 0.7 }}
        className="w-full max-w-md bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-md border border-cyan-800 rounded-2xl shadow-2xl p-8 mt-10"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg bg-gray-700/60 border border-cyan-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-lg bg-gray-700/60 border border-cyan-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            className="w-full px-4 py-3 rounded-lg bg-gray-700/60 border border-cyan-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            required
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-6 py-3 rounded-lg font-bold text-center border transition-colors duration-300"
            style={{
              borderColor: "#22d3ee",
              color: "#22d3ee",
              background: "transparent",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#a5f3fc";
              e.currentTarget.style.background = "rgba(22, 78, 99, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#22d3ee";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Send Message
          </button>
        </form>
        {status && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm font-semibold"
            style={{ color: "#a5f3fc" }}
          >
            {status}
          </motion.p>
        )}

        <div className="flex justify-center gap-6 mt-8">
          <a href="https://github.com/alfanoandrea" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-500 transition-colors">
            <FaGithub size={30} />
          </a>
          <a href="mailto:alfanowski@gmail.com" className="text-gray-400 hover:text-cyan-500 transition-colors">
            <FaEnvelope size={30} />
          </a>
          <a href="https://instagram.com/alfanowski.dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-500 transition-colors">
            <FaInstagram size={30} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}