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
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[hsl(var(--accent-gold))]/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[hsl(var(--accent-bronze))]/10 rounded-full blur-3xl opacity-20" />
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
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-[hsl(var(--accent-gold))] mb-6">
            <span className="w-12 h-[1px] bg-gradient-to-r from-[hsl(var(--accent-gold))] to-transparent" />
            Expertise
            <span className="w-12 h-[1px] bg-gradient-to-l from-[hsl(var(--accent-gold))] to-transparent" />
          </span>

          <h2
            id="skills-title"
            className="text-5xl sm:text-6xl lg:text-7xl font-display tracking-tight"
          >
            <span className="text-text italic font-normal">Technical </span>
            <span className="bg-gradient-to-r from-[hsl(var(--accent-gold))] via-[hsl(var(--accent-bronze))] to-[hsl(var(--accent-gold))] bg-clip-text text-transparent">
              Mastery
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
                    className={`absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--accent-gold))] via-[hsl(var(--accent-champagne))] to-[hsl(var(--accent-bronze))] rounded-xl blur-sm opacity-0 transition-opacity duration-500 ${
                      isHovered ? "opacity-30" : ""
                    }`}
                  />

                  {/* Card */}
                  <div className="relative h-full glass-card rounded-2xl p-6 flex flex-col items-center text-center">
                    {/* Icon with glow */}
                    <div className="relative mb-6">
                      <div
                        className={`w-16 h-16 rounded-xl bg-black px-4 py-4 flex items-center justify-center border border-[hsl(var(--accent-gold))]/20 shadow-xl`}
                      >
                        <img
                          src={skill.icon}
                          alt=""
                          decoding="async"
                          loading="lazy"
                          className="w-full h-full object-contain grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>

                      {/* Glow effect */}
                      <motion.div
                        className={`absolute inset-0 rounded-xl bg-[hsl(var(--accent-gold))] blur-xl`}
                        animate={{ opacity: isHovered ? 0.2 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Skill name */}
                    <h3 className="text-sm font-bold uppercase tracking-widest text-text mb-4">
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
                          duration: 1.5,
                          ease,
                          delay: index * 0.05,
                        }}
                        className={`h-full bg-gradient-to-r from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-bronze))]`}
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
