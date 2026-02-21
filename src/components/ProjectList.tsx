"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@prisma/client";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [filter, setFilter] = useState("All");

  const allTags = Array.from(
    new Set(projects.map((p) => p.tags?.[0]).filter(Boolean)),
  );

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.tags?.includes(filter));

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase block mb-4"
          >
            Portfolio
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-display leading-none">
            Selected <span className="italic text-text/50">Works</span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-2 max-w-xl justify-end">
          <button
            onClick={() => setFilter("All")}
            className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-300 ${filter === "All"
                ? "border-[hsl(var(--accent-gold))] bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))]"
                : "border-text/10 text-text/50 hover:border-text/30"
              }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-300 ${filter === tag
                  ? "border-[hsl(var(--accent-gold))] bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))]"
                  : "border-text/10 text-text/50 hover:border-text/30"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-secondary/5 border border-white/5 overflow-hidden hover:border-[hsl(var(--accent-gold))]/30 transition-colors duration-500"
    >
      <div className="aspect-4/3 relative overflow-hidden">
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="px-6 py-3 border border-white/30 text-white uppercase tracking-widest text-xs backdrop-blur-md hover:bg-white hover:text-black transition-all">
                View Case Study
              </span>
            </div>
          </a>
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-3xl font-display">{project.title}</h3>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ rotate: 45 }}
                className="p-2 border border-text/10 rounded-full text-text/50 group-hover:text-[hsl(var(--accent-gold))] group-hover:border-[hsl(var(--accent-gold))] transition-colors cursor-pointer"
              >
                <ArrowUpRight className="w-5 h-5" />
              </motion.div>
            </a>
          )}
        </div>
        <p className="text-text/60 line-clamp-2 mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags?.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-widest text-text/40 border border-text/10 px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
