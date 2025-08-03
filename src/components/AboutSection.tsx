'use client';

import React from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValue,
  cubicBezier,
  type Variants,
} from 'framer-motion';

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
  id = 'about',
  heading = 'About',
  name = 'Khalil Abdel Majeed',
  role = 'Web Developer & Designer',
  highlights = ['Next.js', 'React', 'Tailwind CSS'],
  imageSrc = 'https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/AboutMe.png',
  imageAlt = 'Khalil Abdel Majeed working on a project',
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Always use MotionValues to avoid unions like MotionValue<number> | 0
  const zero = useMotionValue(0);

  // Base transforms
  const rawY = useTransform(scrollY, [0, 600], [0, -80]);
  const rawRotateX = useTransform(scrollY, [0, 600], [0, 6]);
  const rawRotateY = useTransform(scrollY, [0, 600], [0, -6]);

  // Respect reduced motion by swapping to zero MotionValues
  const yBase = shouldReduceMotion ? zero : rawY;
  const rotateXBase = shouldReduceMotion ? zero : rawRotateX;
  const rotateYBase = shouldReduceMotion ? zero : rawRotateY;

  // Spring smoothing (input must be MotionValue)
  const y = useSpring(yBase, { stiffness: 80, damping: 20, mass: 0.3 });
  const rotateX = useSpring(rotateXBase, { stiffness: 80, damping: 20 });
  const rotateY = useSpring(rotateYBase, { stiffness: 80, damping: 20 });

  // Use cubicBezier for valid easing typing
  const easeOutExpo = cubicBezier(0.22, 1, 0.36, 1);

  const imgVariants: Variants = {
    hidden: { opacity: 0, x: -40, scale: 0.98 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: easeOutExpo },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: easeOutExpo, delay: 0.1 },
    },
  };

  const containerClass =
    'relative w-full py-24 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-500 overflow-hidden';
  const gridClass =
    'max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center';
  const auraClass =
    'pointer-events-none absolute -inset-40 bg-[radial-gradient(45rem_45rem_at_120%_-10%,rgba(56,189,248,0.10),transparent_50%),radial-gradient(30rem_30rem_at_-10%_120%,rgba(168,85,247,0.10),transparent_50%)] dark:bg-[radial-gradient(45rem_45rem_at_120%_-10%,rgba(59,130,246,0.20),transparent_50%),radial-gradient(30rem_30rem_at_-10%_120%,rgba(192,132,252,0.18),transparent_50%)]';
  const noiseClass =
    'pointer-events-none absolute inset-0 mix-blend-soft-light opacity-[0.06] dark:opacity-[0.08] [background-image:url("/noise.png")] [background-size:200px_200px]';

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${containerClass} ${className ?? ''}`}
    >
      <div aria-hidden="true" className={auraClass} />
      <div aria-hidden="true" className={noiseClass} />

      <div className={gridClass}>
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
          className="relative w-full h-80 md:h-[460px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/30 via-purple-200/20 to-pink-200/20 dark:from-blue-500/30 dark:via-purple-500/20 dark:to-pink-500/20 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15 dark:from-black/30 dark:to-black/40" />
        </motion.div>

        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col justify-center text-center md:text-left"
        >
          <h2
            id={`${id}-title`}
            className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight"
          >
            {heading}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Me
            </span>
          </h2>

          <p className="text-lg sm:text-xl leading-relaxed mb-4 text-balance">
            Hi, I’m{' '}
            <span className="font-semibold text-primary-light dark:text-primary-dark">
              {name}
            </span>
            , a {role} passionate about crafting immersive user experiences.
          </p>

          <p className="text-lg sm:text-xl leading-relaxed mb-6 text-pretty">
            I specialize in{' '}
            <span className="font-medium text-secondary-light dark:text-secondary-dark">
              {highlights.join(', ')}
            </span>{' '}
            and love bringing ideas to life with clean code and beautiful
            design.
          </p>

          <ul
            aria-label="Key skills"
            className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-8"
          >
            {highlights.map((h) => (
              <li key={h}>
                <span className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 px-3 py-1 text-sm text-slate-700 dark:text-slate-200 shadow-sm">
                  {h}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center md:items-start justify-center md:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 text-sm sm:text-base font-semibold shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 transition-all"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-3 text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 bg-white/70 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 transition-all"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;