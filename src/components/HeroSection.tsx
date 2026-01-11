"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CrystallineShards from "./three/CrystallineShards";
import MagneticButton from "./MagneticButton";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {!reduceMotion && <CrystallineShards />}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      </div>

      {/* Content Layer */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 container mx-auto px-6 flex flex-col items-center"
      >
        {/* Subtle Greeting */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-8 h-[1px] bg-ember" />
          <span className="text-ember font-sans font-bold uppercase tracking-[0.4em] text-[10px]">
            Engineering Digital Elegance
          </span>
          <span className="w-8 h-[1px] bg-ember" />
        </motion.div>

        {/* Main Title - Dramatic & Asymmetric */}
        <div className="text-center mb-12 max-w-6xl">
          <motion.div variants={fadeInUp} className="relative">
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-display leading-[0.85] tracking-tight">
              <span className="block text-text/90 italic font-medium -ml-12 md:-ml-24">
                Creative
              </span>
              <span className="block text-gradient mt-4">Architect</span>
            </h1>
          </motion.div>
        </div>

        {/* Description & Social Proof */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end w-full max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-5 text-left space-y-6"
          >
            <p className="text-xl md:text-2xl font-sans text-text-muted leading-relaxed max-w-md">
              A developer & designer specializing in crafting{" "}
              <span className="text-text font-medium">
                bespoke digital systems
              </span>{" "}
              that merge engineering precision with visual artistry.
            </p>
          </motion.div>

          <div className="lg:col-span-2 hidden lg:flex justify-center">
            <motion.div
              variants={fadeInUp}
              className="h-32 w-[1px] bg-gradient-to-b from-ember to-transparent"
            />
          </div>

          <motion.div
            variants={fadeInUp}
            className="lg:col-span-5 flex flex-col sm:flex-row gap-8 items-center justify-end"
          >
            <MagneticButton
              href="/projects"
              className="px-10 py-5 bg-text text-background font-bold tracking-[0.2em] uppercase text-xs"
            >
              View Projects
            </MagneticButton>

            <motion.a
              href="/contact"
              className="group relative flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] overflow-hidden py-4"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-ember">
                Get in Touch
              </span>
              <div className="h-[1px] w-8 bg-text-muted transition-all duration-500 group-hover:w-12 group-hover:bg-ember" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 right-12 h-64 w-[1px] bg-gradient-to-t from-ember to-transparent hidden xl:block"
      />
    </section>
  );
}
