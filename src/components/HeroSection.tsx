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
    return `radial-gradient(circle 600px at ${mx}px ${my}px, hsla(42, 65%, 38%, 0.1), transparent 50%)`;
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
      className="relative flex items-center justify-center w-full min-h-screen overflow-hidden pt-32"
      aria-labelledby="hero-title"
    >
      {/* Floating Orbs Background */}
      {mounted && !reduceMotion && (
        <>
          <FloatingOrb
            size={400}
            color="rgba(212, 175, 55, 0.15)"
            initialX={20}
            initialY={20}
            duration={20}
            delay={0}
          />
          <FloatingOrb
            size={350}
            color="rgba(166, 124, 0, 0.1)"
            initialX={70}
            initialY={60}
            duration={25}
            delay={2}
          />
          <FloatingOrb
            size={300}
            color="rgba(247, 231, 206, 0.08)"
            initialX={40}
            initialY={80}
            duration={22}
            delay={4}
          />
          <FloatingOrb
            size={250}
            color="rgba(212, 175, 55, 0.1)"
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
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
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
          <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-bronze))] bg-clip-text text-transparent">
            Available for new projects
          </span>
        </motion.div>

        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-9xl font-display mb-6 leading-[1.1] tracking-tight"
        >
          <span className="block text-text italic font-normal">
            Hi, I&rsquo;m
          </span>
          <span className="block mt-2 bg-gradient-to-r from-[hsl(var(--accent-gold))] via-[hsl(var(--accent-champagne))] to-[hsl(var(--accent-bronze))] text-transparent bg-clip-text animate-gradient pb-4">
            Khalil Abdel Majeed
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="text-lg sm:text-xl lg:text-2xl mb-10 h-10 flex items-center justify-center gap-2 uppercase tracking-[0.3em] font-light"
        >
          <span className="text-text/40">A</span>
          <span className="text-[hsl(var(--accent-gold))]">{typedRole}</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-[1px] h-6 bg-[hsl(var(--accent-gold))]"
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
          className="flex flex-col sm:flex-row gap-6 items-center justify-center"
        >
          <motion.a
            href="/projects"
            whileHover={reduceMotion ? undefined : { scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn-premium"
          >
            <span>View My Work</span>
          </motion.a>

          <motion.a
            href="/contact"
            whileHover={reduceMotion ? undefined : { scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-2 px-8 py-4 border-b border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] transition-all duration-500"
          >
            <span className="uppercase tracking-[0.2em] text-xs font-semibold text-text/70 group-hover:text-text px-4">
              Get In Touch
            </span>
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
            href="/about"
            aria-label="Go to about page"
            className="flex flex-col items-center gap-2 text-text/30 hover:text-[hsl(var(--accent-gold))] transition-colors duration-500"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs font-medium uppercase tracking-widest">
              About Me
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
