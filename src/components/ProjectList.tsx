"use client";

import { motion } from "framer-motion";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiPython, SiC, SiCplusplus, SiReact, SiNextdotjs } from "react-icons/si";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
};

const langIcons: { [key: string]: React.ReactNode } = {
  TypeScript: <SiTypescript />,
  JavaScript: <SiJavascript />,
  Python: <SiPython />,
  C: <SiC />,
  'C++': <SiCplusplus />,
  React: <SiReact />,
  'Next.js': <SiNextdotjs />,
};

function ProjectCard({ repo }: { repo: Repo }) {
  const icon = repo.language ? langIcons[repo.language] : <FaCodeBranch />;

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 rounded-2xl border border-cyan-800 bg-gradient-to-br from-gray-900/70 to-gray-800/70 shadow-xl transform transition-all duration-300 ease-in-out cursor-pointer group relative overflow-hidden"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="absolute inset-0 bg-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-cyan-400 truncate">
              {repo.name.replace(/-/g, " ")}
            </h3>
            <span className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300">{icon}</span>
          </div>
          <span className="flex items-center gap-1 text-yellow-400 font-semibold text-sm">
            <FaStar className="drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" />
            {repo.stargazers_count}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {repo.description || "Nessuna descrizione disponibile."}
        </p>
        <div className="flex items-center text-cyan-500 font-semibold gap-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          <FaGithub size={18} />
          <span>Vedi su GitHub</span>
        </div>
      </div>
    </motion.a>
  );
}

export default function ProjectList({ repos }: { repos: Repo[] }) {
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-cyan-400 mb-16 tracking-tight text-center"
      >
        My Projects
      </motion.h2>

      {repos.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-center text-lg mt-10"
        >
          Nessun progetto trovato o limite API raggiunto 😕
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((r, index) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <ProjectCard repo={r} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}