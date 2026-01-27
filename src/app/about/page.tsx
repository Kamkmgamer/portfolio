"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function AboutPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <main className="min-h-screen pt-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase mb-6"
          >
            The Story
          </motion.span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.9] text-text mb-8">
            Behind the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-bronze))] italic pr-4">
              Pixel
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-text/60 leading-relaxed">
            I craft digital experiences where engineering meets art. Every line
            of code is a brushstroke, every interaction a performed note.
          </p>
        </motion.div>

        {/* Decorative Background Elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[10%] right-[10%] w-[30vh] h-[30vh] rounded-full bg-gradient-to-br from-[hsl(var(--accent-gold))]/10 to-transparent blur-[100px] pointer-events-none"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[10%] left-[10%] w-[40vh] h-[40vh] rounded-full bg-gradient-to-tr from-[hsl(var(--accent-bronze))]/10 to-transparent blur-[100px] pointer-events-none"
        />

        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[hsl(var(--accent-gold))]"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative h-[600px] w-full rounded-full overflow-hidden border border-[hsl(var(--accent-gold))]/20">
            <Image
              src="https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/AboutMe.png"
              alt="Philosophy"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-[hsl(var(--accent-gold))]/10 mix-blend-overlay" />
          </div>
          <div className="space-y-12">
            <BioBlock
              number="01"
              title="The Vision"
              text="I believe the web is not just a platform for information, but a canvas for emotion. My goal is to break the barrier between the user and the screen, creating interfaces that feel organic, responsive, and alive."
            />
            <BioBlock
              number="02"
              title="The Craft"
              text="With a foundation in modern full-stack development, I merge performance with aesthetics. I don't just build websites; I engineer digital ecosystems that are scalable, accessible, and stunningly beautiful."
            />
            <BioBlock
              number="03"
              title="The Future"
              text="Pushing the boundaries of what's possible in the browser. Exploring 3D contexts, micro-interactions, and fluid state management to define the next generation of web applications."
            />
          </div>
        </div>
      </section>

      {/* Experience Timeline/Grid (Abstract) */}
      <section className="py-32 bg-secondary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-display mb-20 text-center">
            <span className="italic text-text/50">Journey</span> Through Tech
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ExperienceCard
              year="2021 - Present"
              role="Freelance Web developer"
              company="Self employed"
              desc="Leading the frontend architecture for high-scale applications."
            />
            <ExperienceCard
              year="2018 - 2021"
              role="Full Stack Developer"
              company="Soft Magic Company Limited"
              desc="Delivered award-winning web experiences for global brands."
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
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group"
    >
      <div className="flex items-baseline gap-4 mb-4 border-b border-text/10 pb-4 group-hover:border-[hsl(var(--accent-gold))] transition-colors duration-500">
        <span className="text-[hsl(var(--accent-gold))] font-mono text-xl">
          {number}
        </span>
        <h3 className="text-3xl font-display">{title}</h3>
      </div>
      <p className="text-text/70 leading-relaxed text-lg">{text}</p>
    </motion.div>
  );
}

function ExperienceCard({
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
    <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-none hover:bg-[hsl(var(--accent-gold))]/5 transition-colors duration-300 group">
      <span className="block text-xs font-mono mb-4 text-[hsl(var(--accent-gold))]">
        {year}
      </span>
      <h4 className="text-2xl font-display mb-2">{role}</h4>
      <div className="text-sm font-bold uppercase tracking-widest mb-6 text-text/40 group-hover:text-text/80 transition-colors">
        {company}
      </div>
      <p className="text-text/60">{desc}</p>
    </div>
  );
}
