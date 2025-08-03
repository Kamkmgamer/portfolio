'use client';

import React from 'react';
import {
  motion,
  useReducedMotion,
  cubicBezier,
  type Variants,
} from 'framer-motion';
import { skills, type Skill } from '../data/skills';

const ease = cubicBezier(0.22, 1, 0.36, 1);

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease },
  },
};

const SkillsSection: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative w-full py-20 bg-gradient-to-b from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="skills-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease }}
          className="text-4xl sm:text-5xl font-bold text-center mb-14 text-text-light dark:text-text-dark"
        >
          My{' '}
          <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 dark:from-green-300 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Skills &amp; Tools
          </span>
        </motion.h2>

        <motion.ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill: Skill, index: number) => {
            const level = Math.max(0, Math.min(100, skill.level));
            const labelId = `skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}`;

            return (
              <motion.li
                key={skill.name}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                <motion.div
                  whileHover={
                    reduceMotion ? undefined : { scale: 1.03, y: -2 }
                  }
                  transition={{ duration: 0.25, ease }}
                  className="relative group rounded-2xl bg-surface-light dark:bg-surface-dark p-5 shadow-lg transition-transform duration-300 overflow-hidden ring-1 ring-black/5 dark:ring-white/10 focus-within:ring-2 focus-within:ring-blue-500"
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${skill.color} p-2 flex items-center justify-center ring-1 ring-black/5 dark:ring-white/10`}
                      aria-hidden="true"
                    >
                      <img
                        src={skill.icon}
                        alt=""
                        decoding="async"
                        loading="lazy"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Skill Name */}
                  <h3
                    id={labelId}
                    className="text-lg font-medium text-center text-text-light dark:text-text-dark mb-3"
                  >
                    {skill.name}
                  </h3>

                  {/* Proficiency Bar */}
                  <div
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"
                    role="progressbar"
                    aria-valuenow={level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-describedby={labelId}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 1.1, ease }}
                      className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                      style={{ width: `${level}%` }}
                    />
                    <span className="sr-only">{level}%</span>
                  </div>

                  {/* Hover/Focus overlay for years */}
                  <motion.div
                    initial={false}
                    animate={
                      reduceMotion
                        ? { opacity: 0 }
                        : undefined
                    }
                    className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white dark:text-gray-900 bg-black/70 dark:bg-white/70 rounded-2xl opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 text-center p-4"
                  >
                    <p aria-hidden="true">
                      {skill.years}+ Years of Experience
                    </p>
                  </motion.div>

                  {/* Focus anchor to enable keyboard focus state */}
                  <a
                    href="#contact"
                    className="absolute inset-0 focus:outline-none"
                    aria-label={`Contact about ${skill.name}`}
                    tabIndex={0}
                  />
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
};

export default SkillsSection;