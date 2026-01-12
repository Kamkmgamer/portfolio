"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  cubicBezier,
} from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";

const ease = cubicBezier(0.22, 1, 0.36, 1);

// Animated split text reveal
// Animated split text reveal - available for future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SplitText({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const words = children.split(" ");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.05,
              ease,
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Horizontal marquee component
function Marquee({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden py-12 border-y border-[hsl(var(--accent-ember)/0.1)]">
      <div className="marquee-track whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-block mx-12 text-6xl sm:text-7xl lg:text-8xl font-display text-[hsl(var(--accent-ember)/0.1)] hover:text-[hsl(var(--accent-ember)/0.3)] transition-colors duration-500 cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { scrollY: _scrollY } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(heroProgress, [0, 1], [0, 300]);
  const y2 = useTransform(heroProgress, [0, 1], [0, -200]);
  const opacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(heroProgress, [0, 0.5], [1, 0.95]);

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "Node.js",
    "Design",
    "Animation",
    "UI/UX",
  ];

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex flex-col items-center justify-center px-6"
      >
        <motion.div
          style={{ opacity, scale, y: y1 }}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-[hsl(var(--accent-ember))]" />
            <span className="text-xs uppercase tracking-[0.4em] text-[hsl(var(--accent-ember))]">
              The Story
            </span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-[hsl(var(--accent-ember))]" />
          </motion.div>

          {/* Main headline */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display leading-[0.85] tracking-tight mb-10">
            <motion.span
              className="block text-[hsl(var(--text))]"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease }}
            >
              Behind the
            </motion.span>
            <motion.span
              className="block gradient-text-animated italic"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease }}
            >
              Pixel
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-[hsl(var(--text)/0.6)] leading-relaxed"
          >
            I craft digital experiences where{" "}
            <span className="text-[hsl(var(--accent-ember))]">engineering</span>{" "}
            meets <span className="text-[hsl(var(--accent-sand))]">art</span>.
            Every line of code is a brushstroke, every interaction a performed
            note.
          </motion.p>
        </motion.div>

        {/* Decorative background elements */}
        <motion.div
          style={{ y: y2 }}
          className="absolute top-[10%] right-[5%] w-[40vh] h-[40vh] rounded-full bg-gradient-to-br from-[hsl(var(--accent-ember)/0.08)] to-transparent blur-[120px] pointer-events-none"
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute bottom-[10%] left-[5%] w-[50vh] h-[50vh] rounded-full bg-gradient-to-tr from-[hsl(var(--accent-rust)/0.08)] to-transparent blur-[120px] pointer-events-none"
        />

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--accent-ember))]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-4 h-4 text-[hsl(var(--accent-ember))]" />
          </motion.div>
        </motion.div>

        {/* Corner accents */}
        <div className="absolute top-24 left-8 sm:left-16 flex items-center gap-2 text-[hsl(var(--accent-ember)/0.3)]">
          <span className="w-12 h-px bg-current" />
          <span className="text-xs font-mono tracking-widest">ABOUT</span>
        </div>
      </section>

      {/* Skills Marquee */}
      <Marquee items={skills} />

      {/* Philosophy Section */}
      <section className="relative py-32 lg:py-48 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease }}
              className="relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/AboutMe.png"
                  alt="Khalil AbdalMageed"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[hsl(var(--accent-ember)/0.1)] mix-blend-overlay" />
              </div>

              {/* Decorative frame */}
              <motion.div
                className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-[hsl(var(--accent-ember)/0.3)]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[hsl(var(--accent-ember)/0.3)]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              />
            </motion.div>

            {/* Content */}
            <div className="space-y-16">
              <BioBlock
                number="01"
                title="The Vision"
                text="I believe the web is not just a platform for information, but a canvas for emotion. My goal is to break the barrier between the user and the screen, creating interfaces that feel organic, responsive, and alive."
                delay={0}
              />
              <BioBlock
                number="02"
                title="The Craft"
                text="With a foundation in modern full-stack development, I merge performance with aesthetics. I don't just build websites; I engineer digital ecosystems that are scalable, accessible, and stunningly beautiful."
                delay={0.1}
              />
              <BioBlock
                number="03"
                title="The Future"
                text="Pushing the boundaries of what's possible in the browser. Exploring 3D contexts, micro-interactions, and fluid state management to define the next generation of web applications."
                delay={0.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 lg:py-48 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[hsl(var(--surface))]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(hsl(var(--accent-ember)) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="mb-20"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display tracking-tight">
              <span className="italic text-[hsl(var(--text)/0.5)]">
                Journey
              </span>{" "}
              <span className="gradient-text">Through Tech</span>
            </h2>
          </motion.div>

          {/* Experience cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <ExperienceCard
              year="2023 - Present"
              role="Senior Frontend Engineer"
              company="Tech Innovators"
              desc="Leading the frontend architecture for high-scale applications."
              index={0}
            />
            <ExperienceCard
              year="2021 - 2023"
              role="Full Stack Developer"
              company="Creative Agency"
              desc="Delivered award-winning web experiences for global brands."
              index={1}
            />
            <ExperienceCard
              year="2019 - 2021"
              role="UI/UX Designer"
              company="Design Studio"
              desc="Bridging the gap between conceptual design and implementation."
              index={2}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 lg:py-48 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display mb-8">
            Let&apos;s Create{" "}
            <span className="italic text-[hsl(var(--accent-ember))]">
              Together
            </span>
          </h2>
          <p className="text-lg text-[hsl(var(--text)/0.6)] mb-12 max-w-xl mx-auto">
            Ready to transform your digital presence? Let&apos;s discuss how we
            can bring your vision to life.
          </p>
          <motion.a
            href="/contact"
            className="btn-premium inline-flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Start a Conversation</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </section>
    </main>
  );
}

function BioBlock({
  number,
  title,
  text,
  delay,
}: {
  number: string;
  title: string;
  text: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
      className="group"
    >
      <div className="flex items-baseline gap-6 mb-6 pb-4 border-b border-[hsl(var(--text)/0.1)] group-hover:border-[hsl(var(--accent-ember))] transition-colors duration-500">
        <span className="text-3xl font-mono text-[hsl(var(--accent-ember))]">
          {number}
        </span>
        <h3 className="text-3xl lg:text-4xl font-display">{title}</h3>
      </div>
      <p className="text-[hsl(var(--text)/0.6)] leading-relaxed text-lg pl-16">
        {text}
      </p>
    </motion.div>
  );
}

function ExperienceCard({
  year,
  role,
  company,
  desc,
  index,
}: {
  year: string;
  role: string;
  company: string;
  desc: string;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Glow */}
      <motion.div
        className="absolute -inset-px bg-gradient-to-br from-[hsl(var(--accent-ember)/0.2)] to-transparent blur-xl opacity-0"
        animate={{ opacity: isHovered ? 0.5 : 0 }}
      />

      <motion.div
        className="relative h-full p-8 lg:p-10 bg-[hsl(var(--background))] border border-[hsl(var(--accent-ember)/0.1)] hover:border-[hsl(var(--accent-ember)/0.3)] transition-colors duration-500"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
      >
        {/* Year badge */}
        <motion.span
          className="inline-block text-xs font-mono tracking-widest px-3 py-1 mb-6 border border-[hsl(var(--accent-ember)/0.3)] text-[hsl(var(--accent-ember))]"
          animate={{
            backgroundColor: isHovered
              ? "hsl(var(--accent-ember) / 0.1)"
              : "transparent",
          }}
        >
          {year}
        </motion.span>

        <h4 className="text-2xl lg:text-3xl font-display mb-3">{role}</h4>

        <div className="text-xs font-semibold uppercase tracking-[0.2em] mb-6 text-[hsl(var(--text)/0.4)] group-hover:text-[hsl(var(--accent-ember))] transition-colors duration-500">
          {company}
        </div>

        <p className="text-[hsl(var(--text)/0.6)] leading-relaxed">{desc}</p>
      </motion.div>
    </motion.div>
  );
}
