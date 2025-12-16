"use client";

import React from "react";
import { motion, useReducedMotion, cubicBezier } from "framer-motion";
import Image from "next/image";
import { projects } from "../data/projects";

const ease = cubicBezier(0.22, 1, 0.36, 1);

const ProjectsSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative w-full py-28 overflow-hidden"
    >
      {/* Background gradient elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-4">
            <span className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full" />
            Portfolio
            <span className="w-8 h-0.5 bg-gradient-to-l from-cyan-500 to-emerald-500 rounded-full" />
          </span>

          <h2
            id="projects-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            <span className="text-text">My </span>
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="mt-4 text-lg text-text/60 max-w-2xl mx-auto">
            A showcase of my recent work, featuring modern web applications and
            creative designs.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const href = project.demo || project.github || "#";
            const isExternal = href.startsWith("http");
            const isHovered = hoveredId === project.id;

            return (
              <motion.a
                key={project.id}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={`${project.title}${
                  isExternal ? " (opens in a new tab)" : ""
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.02,
                        y: -8,
                      }
                }
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group relative block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-gray-900"
              >
                <div className="relative h-full rounded-3xl overflow-hidden isolate">
                  {/* Gradient border glow */}
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-3xl blur opacity-0 transition-opacity duration-500 ${
                      isHovered ? "opacity-50" : ""
                    }`}
                  />

                  {/* Card content */}
                  <div className="relative glass-card rounded-3xl overflow-hidden h-full flex flex-col isolate">
                    {/* Image container */}
                    <div className="relative h-56 w-full flex-shrink-0 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={index < 3}
                      />

                      {/* Gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500`}
                      />

                      {/* Category badge */}
                      {project.category && (
                        <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold glass-card text-text z-10 backdrop-blur-md border border-white/20">
                          {project.category}
                        </span>
                      )}

                      {/* Arrow indicator */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={
                          isHovered
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -10 }
                        }
                        transition={{ duration: 0.3 }}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center z-10 text-white"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-text mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm text-text/60 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      {project.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags
                            .slice(0, 3)
                            .map((tag: string, i: number) => (
                              <span
                                key={`${project.id}-tag-${i}`}
                                className="px-2.5 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-emerald-500/10 text-cyan-600 dark:text-cyan-400 ring-1 ring-cyan-500/20"
                              >
                                {tag}
                              </span>
                            ))}
                          {project.tags.length > 3 && (
                            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="text-center mt-12"
        >
          <motion.a
            href="/case-studies"
            whileHover={reduceMotion ? undefined : { scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold glass-card hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300"
          >
            <span className="text-text">View All Case Studies</span>
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
