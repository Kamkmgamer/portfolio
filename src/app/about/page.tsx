"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function AboutPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <main className="min-h-screen pt-48 pb-32 overflow-hidden bg-background">
      {/* Hero Section - Cinematic & Minimal */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center max-w-7xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="w-12 h-[1px] bg-ember" />
            <span className="text-ember text-[10px] font-sans font-bold uppercase tracking-[0.5em]">
              The Creative Philosophy
            </span>
            <div className="w-12 h-[1px] bg-ember" />
          </motion.div>

          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-display leading-[0.8] tracking-tighter mb-16 px-4">
            Design <span className="italic text-text/50">Without</span> <br />
            <span className="text-gradient">Compromise</span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl md:text-2xl font-sans text-text-muted leading-relaxed">
            I craft digital experiences where engineering meets visual poetry. A
            firm believer that performance and aesthetics are not mutually
            exclusive, but rather synergistic.
          </p>
        </motion.div>

        {/* Floating Background Effects */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] rounded-full bg-ember/5 blur-[150px] pointer-events-none"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-0 left-[-10%] w-[40vw] h-[40vw] rounded-full bg-rust/5 blur-[120px] pointer-events-none"
        />

        <motion.div
          style={{ opacity }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-ember/40 mb-12"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.3em]">
            Down / Scroll
          </span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* Philosophy Section - Asymmetric Grid */}
      <section className="relative py-48 px-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            {/* Image Container - Grid Breaking */}
            <div className="lg:col-span-5 relative group">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="aspect-[3/4] relative overflow-hidden border border-white/5"
              >
                <Image
                  src="https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/AboutMe.png"
                  alt="Creative Workspace"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-background/20 mix-blend-multiply" />
              </motion.div>

              {/* Floating label */}
              <div className="absolute -bottom-8 -right-8 p-12 bg-surface border border-white/10 hidden md:block">
                <span className="text-ember font-bold text-xs uppercase tracking-widest block mb-2">
                  Established
                </span>
                <span className="text-3xl font-display">MMXIX</span>
              </div>
            </div>

            {/* Bio Blocks - Staggered Content */}
            <div className="lg:col-span-6 lg:col-start-7 space-y-24">
              <BioBlock
                number="01"
                title="The Vision"
                text="The web is my canvas. I strive to break the cold barrier between the user and the digital interface, creating systems that feel organic, evocative, and alive."
              />
              <BioBlock
                number="02"
                title="The Craft"
                text="Engineered for speed, designed for delight. Every pixel is calculated, every animation is choreographed to provide a seamless transition between states."
              />
              <BioBlock
                number="03"
                title="The Future"
                text="Exploring the convergence of WebGL, motion design, and high-performance computing to define the next generation of luxury digital interfaces."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section - Linear / Minimal */}
      <section className="py-48 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
            <h2 className="text-6xl md:text-8xl font-display leading-tight">
              Selected <br />
              <span className="text-gradient italic">Timeline</span>
            </h2>
            <p className="text-text-muted text-lg max-w-sm font-sans">
              A curated selection of professional milestones and institutional
              ventures.
            </p>
          </div>

          <div className="space-y-px bg-white/5 border border-white/5">
            <ExperienceRow
              year="2023 / Now"
              role="Senior Frontend Architect"
              company="Strategic Tech"
              desc="Leading precision engineering for high-fidelity interactive platforms."
            />
            <ExperienceRow
              year="2021 / 2023"
              role="Full Stack Engineer"
              company="Artisan Agency"
              desc="Harmonizing complex backend systems with fluid frontend aesthetics."
            />
            <ExperienceRow
              year="2019 / 2021"
              role="Visual Design Lead"
              company="Neon District"
              desc="Pioneering motion-first design principles for modern digital brands."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function BioBlock({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="flex items-center gap-6 mb-8">
        <span className="text-ember font-bold text-lg font-sans tracking-widest">
          {number}
        </span>
        <div className="h-[1px] w-12 bg-ember/30 group-hover:w-24 transition-all duration-700" />
      </div>
      <h3 className="text-5xl font-display mb-8 group-hover:text-ember transition-colors duration-500">
        {title}
      </h3>
      <p className="text-text-muted text-xl font-sans leading-relaxed max-w-2xl">
        {text}
      </p>
    </motion.div>
  );
}

function ExperienceRow({
  year,
  role,
  company,
  desc,
}: {
  year: string;
  role: string;
  company: string;
  desc: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-12 bg-background hover:bg-surface transition-colors duration-700 group">
      <span className="text-ember font-bold text-xs uppercase tracking-[0.3em]">
        {year}
      </span>
      <div className="md:col-span-2">
        <h4 className="text-3xl font-display mb-2 group-hover:text-ember transition-colors duration-500">
          {role}
        </h4>
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-text/30 group-hover:text-text/60 transition-colors duration-500">
          {company}
        </span>
      </div>
      <p className="text-text-muted font-sans leading-relaxed">{desc}</p>
    </div>
  );
}
