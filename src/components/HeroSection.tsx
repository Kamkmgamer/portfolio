"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  cubicBezier,
} from "framer-motion";
import MagneticButton from "./MagneticButton";

const ease = cubicBezier(0.22, 1, 0.36, 1);

// Typewriter effect with cursor
const useTypewriter = (
  texts: string[],
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDuration = 3000
) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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

// Animated counter for stats
const Counter = ({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// Floating decorative lines
const FloatingLine = ({
  style,
  delay,
}: {
  style: React.CSSProperties;
  delay: number;
}) => (
  <motion.div
    className="absolute h-px bg-gradient-to-r from-transparent via-[hsl(var(--accent-ember)/0.3)] to-transparent"
    style={style}
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{ duration: 1.5, delay, ease }}
  />
);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const roles = [
    "Web Developer",
    "UI/UX Craftsman",
    "Creative Engineer",
    "Digital Architect",
  ];
  const typedRole = useTypewriter(roles, 120, 70, 3500);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 30);
      mouseY.set((clientY / innerHeight - 0.5) * 30);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Decorative floating lines */}
      <FloatingLine
        style={{ width: "40%", top: "15%", left: "5%", rotate: "-5deg" }}
        delay={1.5}
      />
      <FloatingLine
        style={{ width: "30%", top: "25%", right: "10%", rotate: "3deg" }}
        delay={1.7}
      />
      <FloatingLine
        style={{ width: "25%", bottom: "30%", left: "15%", rotate: "8deg" }}
        delay={1.9}
      />

      {/* Main content */}
      <motion.div
        style={{ y: titleY, opacity, scale }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="inline-flex items-center gap-3 px-5 py-2.5 mb-12 glass-card rounded-full"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[hsl(var(--accent-ember))]">
            Open for collaborations
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          id="hero-title"
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tight mb-8"
          style={{ x: mouseXSpring, y: mouseYSpring }}
        >
          <motion.span
            className="block text-[hsl(var(--text))] mb-2"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
          >
            <span className="font-light italic opacity-70">
              Hello, I&lsquo;m
            </span>
          </motion.span>

          <motion.span
            className="block relative"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease }}
          >
            <span className="gradient-text-animated font-medium">Khalil</span>
          </motion.span>

          <motion.span
            className="block gradient-text font-medium"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease }}
          >
            AbdalMageed
          </motion.span>
        </motion.h1>

        {/* Role typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease }}
          className="flex items-center justify-center gap-3 mb-8 text-lg sm:text-xl uppercase tracking-[0.35em] font-light"
          style={{ y: subtitleY }}
        >
          <span className="w-8 h-px bg-[hsl(var(--accent-ember)/0.5)]" />
          <span className="text-[hsl(var(--accent-ember))]">{typedRole}</span>
          <motion.span
            className="w-px h-5 bg-[hsl(var(--accent-ember))]"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <span className="w-8 h-px bg-[hsl(var(--accent-ember)/0.5)]" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease }}
          className="text-lg sm:text-xl text-[hsl(var(--text)/0.6)] max-w-2xl mx-auto leading-relaxed mb-14 font-light"
        >
          Crafting immersive digital experiences at the intersection of
          <span className="text-[hsl(var(--accent-ember))]">
            {" "}
            engineering
          </span>{" "}
          and
          <span className="text-[hsl(var(--accent-sand))]"> artistry</span>.
          Every pixel, every interaction — designed to captivate.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <MagneticButton
            href="/projects"
            className="btn-premium"
            strength={0.3}
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>Explore Work</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </MagneticButton>

          <MagneticButton
            href="/contact"
            className="btn-outline"
            strength={0.3}
          >
            <span className="relative z-10">Get In Touch</span>
          </MagneticButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-20 pt-10 border-t border-[hsl(var(--accent-ember)/0.1)] flex flex-wrap justify-center gap-12 sm:gap-20"
        >
          {[
            { value: 50, suffix: "+", label: "Projects Delivered" },
            { value: 5, suffix: "+", label: "Years Experience" },
            { value: 100, suffix: "%", label: "Client Satisfaction" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 + i * 0.15 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-display gradient-text mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--text)/0.5)]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#services"
          className="flex flex-col items-center gap-3 text-[hsl(var(--text)/0.4)] hover:text-[hsl(var(--accent-ember))] transition-colors duration-500"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">
            Scroll
          </span>
          <motion.div className="w-5 h-8 border border-current rounded-full flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-1.5 bg-current rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Decorative corner elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute top-32 left-8 sm:left-16 text-[hsl(var(--accent-ember)/0.3)] font-mono text-xs tracking-widest"
      >
        <div className="flex items-center gap-2">
          <span className="w-12 h-px bg-current" />
          <span>2026</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute top-32 right-8 sm:right-16 text-[hsl(var(--accent-ember)/0.3)] font-mono text-xs tracking-widest"
      >
        <div className="flex items-center gap-2">
          <span>PORTFOLIO</span>
          <span className="w-12 h-px bg-current" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
