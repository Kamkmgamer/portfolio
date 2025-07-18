// components/SkillsSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { skills, Skill } from '../data/skills'; // Assuming data is in a 'data' folder at the root

const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative w-full py-20 bg-gradient-to-b from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl font-bold text-center mb-14 text-text-light dark:text-text-dark"
        >
          My{' '}
          <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 dark:from-green-300 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Skills & Tools
          </span>
        </motion.h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill: Skill, index: number) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.15)' }}
              className="relative group rounded-2xl bg-surface-light dark:bg-surface-dark p-5 shadow-lg transition-transform duration-300 cursor-default overflow-hidden cursor-hover" // Added overflow-hidden for the hover effect
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                {/* Simplified the icon wrapper div a bit */}
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${skill.color} p-2 flex items-center justify-center`}>
                  <img
                    src={skill.icon}
                    alt={`${skill.name} icon`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Skill Name */}
              <h3 className="text-lg font-medium text-center text-text-light dark:text-text-dark mb-3">
                {skill.name}
              </h3>

              {/* Proficiency Bar */}
              <div
                className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"
                role="progressbar" // ARIA role for progress bar
                aria-valuenow={skill.level} // Current value
                aria-valuemin={0} // Minimum value
                aria-valuemax={100} // Maximum value
                aria-label={`${skill.name} proficiency`} // Label for screen readers
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                  style={{ width: `${skill.level}%` }} // Ensure initial width is set for consistency
                />
              </div>

              {/* Years of Experience - Adjusted for better visibility and context on hover */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white dark:text-gray-900 bg-black/70 dark:bg-white/70 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 text-center p-4"
              >
                <p>{skill.years}+ Years of Experience</p> {/* More descriptive text */}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;