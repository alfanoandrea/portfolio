"use client";
import { motion } from "framer-motion";
import { FaStar, FaCode, FaExternalLinkAlt } from "react-icons/fa";

type ProjectCardProps = {
  name: string;
  description: string;
  url: string;
  language: string | null;
  stars: number;
};

export default function ProjectCard({
  name,
  description,
  url,
  language,
  stars,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 flex flex-col justify-between h-full"
    >
      <div>
        <h3 className="text-2xl font-bold text-cyan-400 mb-2">{name}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition"
        >
          <span style={{ display: "inline-block" }}>
            <FaExternalLinkAlt size={16} />
          </span>
          <span>Repository</span>
        </a>
        <div className="flex items-center gap-4">
          <span className="flex items-center text-sm text-gray-400">
            <span style={{ marginRight: "0.25rem" }}>
              <FaCode size={16} />
            </span>
            {language ?? "N/A"}
          </span>
          <span className="flex items-center text-sm text-yellow-400">
            <span style={{ marginRight: "0.25rem" }}>
              <FaStar size={16} />
            </span>
            {stars}
          </span>
        </div>
      </div>
    </motion.div>
  );
}