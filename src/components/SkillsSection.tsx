"use client";

import React from "react";
import {
  motion,
  useReducedMotion,
  cubicBezier,
  type Variants,
} from "framer-motion";
import { skills, type Skill } from "../data/skills";

const ease = cubicBezier(0.22, 1, 0.36, 1);

const SkillsSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [hoveredSkill, setHoveredSkill] = React.useState<string | null>(null);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, delay: i * 0.08, ease },
    }),
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative w-full py-28 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-green-500/10 dark:bg-green-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-green-600 dark:text-green-400 mb-4">
            <span className="w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
            Expertise
            <span className="w-8 h-0.5 bg-gradient-to-l from-green-500 to-blue-500 rounded-full" />
          </span>

          <h2
            id="skills-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            <span className="text-text">My </span>
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Skills & Tools
            </span>
          </h2>

          <p className="mt-4 text-lg text-text/60 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills grid */}
        <motion.ul
          role="list"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill: Skill, index: number) => {
            const level = Math.max(0, Math.min(100, skill.level));
            const isHovered = hoveredSkill === skill.name;

            return (
              <motion.li
                key={skill.name}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.03, y: -4 }}
                  transition={{ duration: 0.25, ease }}
                  className="relative group h-full"
                >
                  {/* Gradient border glow */}
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${
                      skill.color
                    } rounded-2xl blur opacity-0 transition-opacity duration-500 ${
                      isHovered ? "opacity-40" : ""
                    }`}
                  />

                  {/* Card */}
                  <div className="relative h-full glass-card rounded-2xl p-6 flex flex-col items-center text-center">
                    {/* Icon with glow */}
                    <div className="relative mb-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.color} p-3 flex items-center justify-center ring-1 ring-black/5 dark:ring-white/10 shadow-lg`}
                      >
                        <img
                          src={skill.icon}
                          alt=""
                          decoding="async"
                          loading="lazy"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Glow effect */}
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} blur-xl`}
                        animate={{ opacity: isHovered ? 0.4 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Skill name */}
                    <h3 className="text-base font-semibold text-text mb-3">
                      {skill.name}
                    </h3>

                    {/* Animated progress bar */}
                    <div
                      className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"
                      role="progressbar"
                      aria-valuenow={level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${level}%` }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 1.2,
                          ease,
                          delay: index * 0.05,
                        }}
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                      />
                    </div>

                    {/* Level percentage */}
                    <span className="mt-2 text-xs font-medium text-text/50">
                      {level}%
                    </span>

                    {/* Years experience on hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass-card text-xs font-medium text-text"
                    >
                      {skill.years}+ years
                    </motion.div>
                  </div>
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
