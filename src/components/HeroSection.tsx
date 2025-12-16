"use client";

import React from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useReducedMotion,
  cubicBezier,
} from "framer-motion";

const ease = cubicBezier(0.22, 1, 0.36, 1);

// Typewriter effect hook
const useTypewriter = (
  texts: string[],
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2000
) => {
  const [displayText, setDisplayText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentText = texts[currentIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    displayText,
    currentIndex,
    isDeleting,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return displayText;
};

// Floating orb component
const FloatingOrb: React.FC<{
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
}> = ({ size, color, initialX, initialY, duration, delay }) => {
  return (
    <motion.div
      className="absolute rounded-full mix-blend-screen blur-3xl will-change-transform"
      style={{
        width: size,
        height: size,
        background: color,
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      animate={{
        x: [0, 50, -30, 20, 0],
        y: [0, -40, 30, -20, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Floating particles
const Particles: React.FC = () => {
  const particles = React.useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 10,
        size: 4 + Math.random() * 4,
      })),
    []
  );

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const HeroSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const [isInside, setIsInside] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const roles = [
    "Web Developer",
    "UI/UX Designer",
    "Creative Coder",
    "Problem Solver",
  ];
  const typedRole = useTypewriter(roles, 100, 60, 2500);

  // Pointer position as MotionValues
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spotlight gradient center
  const spotlightBg = useTransform([x, y], ([mx, my]) => {
    return `radial-gradient(circle 600px at ${mx}px ${my}px, rgba(139, 92, 246, 0.15), transparent 50%)`;
  });

  React.useEffect(() => {
    if (typeof window === "undefined" || reduceMotion) return;

    const initCx = window.innerWidth / 2;
    const initCy = window.innerHeight / 2;
    x.set(initCx);
    y.set(initCy);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onEnter = () => setIsInside(true);
    const onLeave = () => setIsInside(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerenter", onEnter);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("pointerleave", onLeave);
      // window.removeEventListener("resize", onResize); // removed
    };
  }, [x, y, reduceMotion]);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center w-full min-h-screen overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Floating Orbs Background */}
      {mounted && !reduceMotion && (
        <>
          <FloatingOrb
            size={400}
            color="rgba(139, 92, 246, 0.3)"
            initialX={20}
            initialY={20}
            duration={20}
            delay={0}
          />
          <FloatingOrb
            size={350}
            color="rgba(59, 130, 246, 0.25)"
            initialX={70}
            initialY={60}
            duration={25}
            delay={2}
          />
          <FloatingOrb
            size={300}
            color="rgba(236, 72, 153, 0.2)"
            initialX={40}
            initialY={80}
            duration={22}
            delay={4}
          />
          <FloatingOrb
            size={250}
            color="rgba(6, 182, 212, 0.15)"
            initialX={80}
            initialY={20}
            duration={18}
            delay={1}
          />
        </>
      )}

      {/* Floating Particles */}
      {mounted && !reduceMotion && <Particles />}

      {/* Spotlight Glow */}
      <AnimatePresence>
        {!reduceMotion && isInside && (
          <motion.div
            key="spotlight"
            className="pointer-events-none fixed inset-0 z-0 will-change-opacity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, ease } }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease } }}
            style={{ background: spotlightBg }}
          />
        )}
      </AnimatePresence>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Greeting badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-card"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
            Available for new projects
          </span>
        </motion.div>

        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 leading-[1.1] tracking-tight"
        >
          <span className="block text-text">Hi, I&rsquo;m</span>
          <span className="block mt-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 text-transparent bg-clip-text animate-gradient pb-2">
            Khalil Abdel Majeed
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="text-xl sm:text-2xl lg:text-3xl mb-10 h-10 flex items-center justify-center gap-2"
        >
          <span className="text-text/60">A</span>
          <span className="font-semibold bg-gradient-to-r from-cyan-600 to-emerald-600 dark:from-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent">
            {typedRole}
          </span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-0.5 h-8 bg-cyan-500 dark:bg-cyan-400"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
          className="text-lg sm:text-xl text-text/60 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting modern, interactive, and responsive web experiences with a
          passion for clean code and beautiful design.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <motion.a
            href="#projects"
            whileHover={reduceMotion ? undefined : { scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white overflow-hidden shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
            whileHover={reduceMotion ? undefined : { scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold glass-card hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300"
          >
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-100 dark:to-white bg-clip-text text-transparent">
              Get In Touch
            </span>
            <svg
              className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:rotate-12 transition-transform"
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
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <motion.a
            href="#about"
            aria-label="Scroll to about section"
            className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs font-medium uppercase tracking-widest">
              Scroll
            </span>
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
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
