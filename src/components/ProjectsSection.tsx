'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import Image from 'next/image';

const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="relative w-full bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-gray-800 dark:text-gray-100"
        >
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Projects</span>
        </motion.h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl shadow-xl transform hover:scale-[1.03] transition-transform duration-500"
            >
              {/* Project Image */}
              <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                {/* Dynamic Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
              </div>

              {/* Project Info */}
              <div className="absolute bottom-0 left-0 p-6 z-10 text-white">
                <h3 className="text-2xl font-bold drop-shadow-lg">{project.title}</h3>
                <p className="mt-2 text-sm opacity-90">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-white/20 rounded-full backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-4">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline hover:text-blue-400 transition-colors duration-300"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline hover:text-purple-400 transition-colors duration-300"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
