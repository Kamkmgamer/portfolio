'use client';

import React from 'react';
import { motion, useReducedMotion, cubicBezier } from 'framer-motion';
import Image from 'next/image';
import { projects } from '../data/projects';

const ease = cubicBezier(0.22, 1, 0.36, 1);

const ProjectsSection: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative w-full py-24 bg-gradient-to-b-section-light dark:bg-gradient-to-b-section-dark transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.h2
          id="projects-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease }}
          className="text-5xl sm:text-6xl font-extrabold text-center mb-16 tracking-tight"
        >
          <span className="text-text dark:text-text">My </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Projects
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const href = project.demo || project.github || '#';
            const isExternal = href.startsWith('http');
            const hoverTransform = reduceMotion ? undefined : { scale: 1.03 };

            return (
              <motion.a
                key={project.id}
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                aria-label={`${project.title}${isExternal ? ' (opens in a new tab)' : ''}`}
                title={isExternal ? 'Opens in a new tab' : undefined}
                whileHover={hoverTransform}
                whileFocus={hoverTransform}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.08, ease }}
                className="block group relative overflow-hidden rounded-xl shadow-lg bg-surface transition-all duration-300 border border-gray-200 dark:border-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background-dark"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority={index < 2}
                  />
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 ${project.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
                  />
                  {project.category && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-black/60 text-white text-xs font-semibold rounded-full z-10">
                      {project.category}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-text dark:text-text mb-2 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  {project.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag: string, i: number) => (
                        <span
                          key={`${project.id}-tag-${i}`}
                          className="px-3 py-1 text-xs bg-primary-light/20 text-primary-light dark:bg-primary-dark/20 dark:text-primary-dark rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <motion.div
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease }}
                  aria-hidden="true"
                >
                  <svg
                    className="w-6 h-6 text-primary-light dark:text-primary-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;