"use client";

import React from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useReducedMotion,
  cubicBezier,
} from "framer-motion";
import { Home, ArrowLeft, Compass } from "lucide-react";

const ease = cubicBezier(0.22, 1, 0.36, 1);

// Floating gold orb component
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
        x: [0, 40, -25, 15, 0],
        y: [0, -35, 25, -15, 0],
        scale: [1, 1.08, 0.96, 1.04, 1],
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

// Floating luxury particles
const LuxuryParticles: React.FC = () => {
  const particles = React.useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 18 + Math.random() * 12,
        size: 3 + Math.random() * 3,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: "hsl(var(--accent-gold))",
            opacity: 0.25,
            filter: "blur(1px)",
          }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.4, 0.4, 0],
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

// Typewriter effect hook
const useTypewriter = (text: string, speed = 50) => {
  const [displayText, setDisplayText] = React.useState("");
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (reduceMotion) {
      setDisplayText(text);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, reduceMotion]);

  return displayText;
};

export default function NotFound() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Pointer tracking for spotlight effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spotlightBg = useTransform([x, y], ([mx, my]) => {
    return `radial-gradient(circle 500px at ${mx}px ${my}px, hsla(42, 65%, 38%, 0.08), transparent 50%)`;
  });

  React.useEffect(() => {
    if (typeof window === "undefined" || reduceMotion) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerenter", onEnter);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y, reduceMotion]);

  const typedMessage = useTypewriter(
    "The page you're looking for has drifted beyond the horizon.",
    45,
  );

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Floating Orbs Background */}
      {mounted && !reduceMotion && (
        <>
          <FloatingOrb
            size={450}
            color="rgba(212, 175, 55, 0.12)"
            initialX={15}
            initialY={15}
            duration={22}
            delay={0}
          />
          <FloatingOrb
            size={380}
            color="rgba(166, 124, 0, 0.08)"
            initialX={75}
            initialY={55}
            duration={26}
            delay={2}
          />
          <FloatingOrb
            size={320}
            color="rgba(247, 231, 206, 0.06)"
            initialX={45}
            initialY={85}
            duration={24}
            delay={4}
          />
          <FloatingOrb
            size={280}
            color="rgba(212, 175, 55, 0.08)"
            initialX={85}
            initialY={25}
            duration={20}
            delay={1}
          />
        </>
      )}

      {/* Luxury Particles */}
      {mounted && !reduceMotion && <LuxuryParticles />}

      {/* Spotlight Effect */}
      <AnimatePresence>
        {!reduceMotion && isHovering && (
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
        className="absolute inset-0 opacity-[0.012] dark:opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main Content */}
      <section className="relative z-10 text-center px-4 max-w-4xl mx-auto py-20">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-10 rounded-full glass-card"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-widest bg-linear-to-r from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-bronze))] bg-clip-text text-transparent">
            Page Not Found
          </span>
        </motion.div>

        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="relative mb-6"
        >
          <h1 className="text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-display leading-none tracking-tighter">
            <span className="bg-linear-to-b from-[hsl(var(--accent-gold))] via-[hsl(var(--accent-champagne))] to-[hsl(var(--accent-bronze))] bg-clip-text text-transparent">
              404
            </span>
          </h1>
          {/* Glow effect behind 404 */}
          <div
            className="absolute inset-0 -z-10 opacity-20 dark:opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at center, hsl(var(--accent-gold)) 0%, transparent 70%)",
            }}
          />
          p
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="text-2xl sm:text-3xl md:text-4xl font-display tracking-tight mb-6"
        >
          <span className="text-text italic">Lost in</span>{" "}
          <span className="bg-linear-to-r from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-bronze))] bg-clip-text text-transparent">
            Elegance
          </span>
        </motion.h2>

        {/* Typewriter Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="text-lg sm:text-xl text-text/60 mb-12 max-w-xl mx-auto leading-relaxed min-h-8"
        >
          {typedMessage}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-[2px] h-5 ml-1 bg-[hsl(var(--accent-gold))] align-middle"
          />
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="w-32 h-px mx-auto mb-12 bg-linear-to-r from-transparent via-[hsl(var(--accent-gold))] to-transparent"
        />

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease }}
          className="flex flex-col sm:flex-row gap-5 items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/"
              className="btn-premium inline-flex items-center gap-3"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => window.history.back()}
              className="group relative inline-flex items-center gap-3 px-8 py-4 border-b border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] transition-all duration-500 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 text-text/60 group-hover:text-[hsl(var(--accent-gold))] transition-colors" />
              <span className="uppercase tracking-[0.2em] text-xs font-semibold text-text/70 group-hover:text-text">
                Go Back
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Explore Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 text-text/30 hover:text-[hsl(var(--accent-gold))] transition-colors duration-500 cursor-pointer"
            animate={reduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Compass className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-medium">
              Explore the portfolio
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-linear-to-t from-background to-transparent" />
    </main>
  );
}
