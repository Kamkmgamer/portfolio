"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValue,
  cubicBezier,
  type Variants,
} from "framer-motion";

type AboutSectionProps = {
  id?: string;
  heading?: string;
  name?: string;
  role?: string;
  highlights?: string[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

const AboutSection: React.FC<AboutSectionProps> = ({
  id = "about",
  heading = "About",
  name = "Khalil Abdel Majeed",
  role = "Web Developer & Designer",
  highlights = [
    "Next.js",
    "React",
    "Tailwind CSS",
    "TypeScript",
    "Framer Motion",
  ],
  imageSrc = "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/AboutMe.png",
  imageAlt = "Khalil Abdel Majeed working on a project",
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const sectionRef = React.useRef<HTMLElement>(null);

  const zero = useMotionValue(0);

  // Base transforms for 3D effect
  const rawY = useTransform(scrollY, [0, 600], [0, -60]);
  const rawRotateX = useTransform(scrollY, [0, 600], [0, 4]);
  const rawRotateY = useTransform(scrollY, [0, 600], [0, -4]);

  const yBase = shouldReduceMotion ? zero : rawY;
  const rotateXBase = shouldReduceMotion ? zero : rawRotateX;
  const rotateYBase = shouldReduceMotion ? zero : rawRotateY;

  const y = useSpring(yBase, { stiffness: 80, damping: 20, mass: 0.3 });
  const rotateX = useSpring(rotateXBase, { stiffness: 80, damping: 20 });
  const rotateY = useSpring(rotateYBase, { stiffness: 80, damping: 20 });

  const easeOutExpo = cubicBezier(0.22, 1, 0.36, 1);

  const imgVariants: Variants = {
    hidden: { opacity: 0, x: -60, scale: 0.95 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.9, ease: easeOutExpo },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, x: 60 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: easeOutExpo, delay: 0.15 },
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOutExpo,
        delay: 0.3 + i * 0.08,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative w-full py-28 overflow-hidden ${className ?? ""}`}
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image with 3D effect and gradient border */}
        <motion.div
          style={{
            y,
            rotateX,
            rotateY,
            transformPerspective: 1000,
          }}
          variants={imgVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="relative group"
        >
          {/* Gradient border glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

          {/* Image container */}
          <div className="relative w-full h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 transform-gpu">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
              className="object-cover"
            />

            {/* Overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-cyan-500/20 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 dark:to-black/50" />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col justify-center text-center lg:text-left"
        >
          {/* Section label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-4"
          >
            <span className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full" />
            Introduction
          </motion.span>

          <h2
            id={`${id}-title`}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight"
          >
            <span className="text-text">{heading} </span>
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          <p className="text-lg sm:text-xl leading-relaxed mb-4 text-text/70">
            Hi, I&apos;m{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {name}
            </span>
            , a passionate {role} who loves crafting immersive digital
            experiences.
          </p>

          <p className="text-lg leading-relaxed mb-8 text-text/60">
            I specialize in building modern web applications with cutting-edge
            technologies, focusing on clean code, beautiful design, and
            exceptional user experiences.
          </p>

          {/* Skill badges with stagger animation */}
          <ul
            aria-label="Key skills"
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10"
          >
            {highlights.map((h, i) => (
              <motion.li
                key={h}
                custom={i}
                variants={badgeVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.span
                  whileHover={
                    shouldReduceMotion ? undefined : { scale: 1.05, y: -2 }
                  }
                  className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium glass-card cursor-default"
                >
                  <span className="mr-2 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                  <span className="text-text">{h}</span>
                </motion.span>
              </motion.li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start justify-center lg:justify-start">
            <motion.a
              href="#projects"
              whileHover={
                shouldReduceMotion ? undefined : { scale: 1.02, y: -2 }
              }
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white overflow-hidden shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600" />
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
              </span>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={
                shouldReduceMotion ? undefined : { scale: 1.02, y: -2 }
              }
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold glass-card hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-text">Contact Me</span>
              <svg
                className="w-4 h-4 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
