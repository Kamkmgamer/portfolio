"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, cubicBezier } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { ArrowUpRight, Filter } from "lucide-react";

const ease = cubicBezier(0.22, 1, 0.36, 1);

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags || [])));

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.tags?.includes(filter));

  return (
    <main className="min-h-screen pt-32 pb-32 px-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-12"
        >
          {/* Title area */}
          <div className="relative">
            {/* Background number */}
            <motion.span
              className="absolute -top-16 -left-4 text-[12rem] font-display font-bold text-[hsl(var(--accent-ember)/0.03)] leading-none select-none pointer-events-none hidden xl:block"
              initial={{ opacity: 0, x: -50 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease }}
            >
              W
            </motion.span>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="w-12 h-px bg-gradient-to-r from-[hsl(var(--accent-ember))] to-transparent" />
              <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[hsl(var(--accent-ember))]">
                Portfolio
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display leading-none tracking-tight"
              initial={{ opacity: 0, y: 60 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <span className="block">Selected</span>
              <span className="italic text-[hsl(var(--text)/0.5)]">Works</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease }}
              className="mt-6 text-lg text-[hsl(var(--text)/0.5)] max-w-md"
            >
              A curated collection of projects that showcase my passion for
              crafting exceptional digital experiences.
            </motion.p>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="flex flex-wrap gap-2 lg:max-w-lg lg:justify-end"
          >
            <motion.button
              onClick={() => setFilter("All")}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-semibold border transition-all duration-400 ${
                filter === "All"
                  ? "border-[hsl(var(--accent-ember))] bg-[hsl(var(--accent-ember)/0.1)] text-[hsl(var(--accent-ember))]"
                  : "border-[hsl(var(--text)/0.1)] text-[hsl(var(--text)/0.5)] hover:border-[hsl(var(--text)/0.3)]"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              All
            </motion.button>
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-semibold border transition-all duration-400 ${
                  filter === tag
                    ? "border-[hsl(var(--accent-ember))] bg-[hsl(var(--accent-ember)/0.1)] text-[hsl(var(--accent-ember))]"
                    : "border-[hsl(var(--text)/0.1)] text-[hsl(var(--text)/0.5)] hover:border-[hsl(var(--text)/0.3)]"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Projects count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-4 mb-12 text-xs uppercase tracking-widest text-[hsl(var(--text)/0.4)]"
        >
          <Filter className="w-3 h-3" />
          <span>
            Showing {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </span>
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isHovered={hoveredProject === project.title}
                onHoverStart={() => setHoveredProject(project.title)}
                onHoverEnd={() => setHoveredProject(null)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32"
          >
            <p className="text-xl text-[hsl(var(--text)/0.5)]">
              No projects found for this filter.
            </p>
            <button
              onClick={() => setFilter("All")}
              className="mt-6 text-[hsl(var(--accent-ember))] underline underline-offset-4"
            >
              View all projects
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}

function ProjectCard({
  project,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  project: Project;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 80 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 80,
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="group relative h-full"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-4 rounded-lg bg-gradient-to-br from-[hsl(var(--accent-ember)/0.15)] to-transparent blur-2xl opacity-0"
        animate={{ opacity: isHovered ? 0.8 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <motion.div
        className="relative overflow-hidden bg-[hsl(var(--surface))] border border-[hsl(var(--accent-ember)/0.05)] h-full flex flex-col"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease }}
      >
        {/* Image container */}
        <div className="aspect-[16/10] relative overflow-hidden flex-shrink-0">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-transparent"
              animate={{ opacity: isHovered ? 0.3 : 0.8 }}
              transition={{ duration: 0.4 }}
            />

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-[hsl(var(--background)/0.8)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="px-8 py-4 border border-[hsl(var(--accent-ember))] text-[hsl(var(--accent-ember))] uppercase tracking-[0.2em] text-xs font-semibold"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                View Project
              </motion.span>
            </motion.div>
          </a>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <motion.h3
              className="text-2xl lg:text-3xl font-display tracking-tight"
              animate={{ x: isHovered ? 8 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>

            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-[hsl(var(--text)/0.1)] text-[hsl(var(--text)/0.5)] group-hover:text-[hsl(var(--accent-ember))] group-hover:border-[hsl(var(--accent-ember))] transition-colors duration-300 transform-gpu"
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </div>

          <p className="text-[hsl(var(--text)/0.6)] line-clamp-2 mb-8 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags?.slice(0, 4).map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[hsl(var(--text)/0.4)] px-3 py-1.5 border border-[hsl(var(--text)/0.08)] group-hover:border-[hsl(var(--accent-ember)/0.2)] transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Project number */}
        <motion.span
          className="absolute top-6 left-8 text-7xl font-display font-bold text-[hsl(var(--accent-ember)/0.05)]"
          animate={{
            opacity: isHovered ? 0.15 : 0.05,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </motion.div>
    </motion.article>
  );
}
