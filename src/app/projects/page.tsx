"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags || [])));

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.tags?.includes(filter));

  return (
    <main className="min-h-screen pt-48 pb-32 px-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-ember text-[10px] font-sans font-bold uppercase tracking-[0.4em] block mb-8"
            >
              Excellence / Selected Works
            </motion.span>
            <h1 className="text-7xl md:text-9xl font-display leading-[0.85] tracking-tight">
              Crafting <span className="italic text-text/50">Digital</span>{" "}
              <br />
              <span className="text-gradient">Masterpieces</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-4 justify-end max-w-xl">
            <FilterButton
              isActive={filter === "All"}
              onClick={() => setFilter("All")}
            >
              All Works
            </FilterButton>
            {allTags.map((tag) => (
              <FilterButton
                key={tag}
                isActive={filter === tag}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}

function FilterButton({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${
        isActive
          ? "bg-text text-background border-text"
          : "border-white/10 text-text/50 hover:border-ember hover:text-ember"
      }`}
    >
      {children}
    </button>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.8,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative bg-background aspect-[4/5] overflow-hidden"
    >
      {/* Content wrapper */}
      <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <span className="text-ember font-sans font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-700">
            {project.tags?.[0] || "Architecture"}
          </span>
          <motion.div
            whileHover={{ rotate: 45, scale: 1.1 }}
            className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-ember/30 rounded-full transition-colors duration-500"
          >
            <ArrowUpRight className="w-5 h-5 text-text/20 group-hover:text-ember transition-colors" />
          </motion.div>
        </div>

        <div>
          <h3 className="text-4xl md:text-5xl font-display mb-6 group-hover:text-ember transition-colors duration-700 leading-tight">
            {project.title}
          </h3>
          <p className="text-text-muted text-sm leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-100">
            {project.description}
          </p>
        </div>
      </div>

      {/* Image Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-20 grayscale group-hover:opacity-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <a
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-20"
      />
    </motion.div>
  );
}
