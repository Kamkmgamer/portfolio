"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";

export default function Home() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Khalil Abd Almageed | Web Developer & Designer",
    description: "Portfolio of Khalil Abd Almageed...",
    url: "https://khalil.mageed.net",
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <main className="min-h-screen pt-24 pb-20 overflow-hidden">
        {/* Hero Section - Image and Description */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 pb-24">
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
              {/* Left Side - Hero Image - Optimized for LCP (no opacity animation) */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-80 lg:h-80 mx-auto lg:mx-0 lg:mr-4 rounded-full overflow-hidden border-4 border-[hsl(var(--accent-gold))]/30 shadow-2xl shrink-0"
              >
                <Image
                  src="https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/image.png?tr=w-320,h-320,q-85"
                  alt="Khalil Abd Almageed"
                  width={320}
                  height={320}
                  className="object-cover w-full h-full"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 256px, 320px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
              </motion.div>

              {/* Right Side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-center lg:text-left max-w-lg"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-block text-[hsl(var(--accent-gold))] text-sm tracking-[0.2em] uppercase mb-6 font-semibold"
                >
                  Web Developer
                </motion.span>

                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-semibold leading-[0.95] text-text mb-8">
                  Hi, I&apos;m <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-bronze))] italic pr-4">
                    Khalil
                  </span>
                </h1>

                <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-text/70 leading-relaxed font-medium">
                  I&apos;m a 23 Years old Sudanese web developer in Ciro,
                </p>
                <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-text/0 leading-relaxed mb-10 font-medium">
                  I was building websites since young age, and I&apos;ve
                  helped many businesses and individuals creating
                  their online presence.
                </p>
                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center lg:justify-start"
                >
                  <motion.a
                    href="/projects"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-premium w-full sm:w-auto text-center"
                  >
                    <span>View My Work</span>
                  </motion.a>

                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 border-b border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] transition-all duration-500 w-full sm:w-auto"
                  >
                    <span className="uppercase tracking-[0.2em] text-xs font-semibold text-text/70 group-hover:text-text px-4">
                      Get In Touch
                    </span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Decorative Background Elements - CSS Only */}
          <div className="absolute top-[10%] right-[10%] w-[30vh] h-[30vh] rounded-full bg-linear-to-br from-[hsl(var(--accent-gold))]/10 to-transparent blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[10%] left-[10%] w-[40vh] h-[40vh] rounded-full bg-linear-to-tr from-[hsl(var(--accent-bronze))]/10 to-transparent blur-[100px] pointer-events-none" />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[hsl(var(--accent-gold))] z-20 animate-fade-out">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </section>

        {/* Experience Timeline/Grid */}
        <section className="py-32 bg-secondary/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-display font-semibold mb-20 text-center">
              <span className="italic text-text/50 font-medium">Journey</span>{" "}
              Through Tech
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <ExperienceCard
                year="2021 - Present"
                role="Freelance Web Developer"
                company="Self employed"
                desc="Leading the frontend architecture for high-scale applications and delivering custom web solutions for diverse clients."
              />
              <ExperienceCard
                year="2018 - 2021"
                role="Full Stack Developer"
                company="Soft Magic Company Limited"
                desc="Delivered award-winning web experiences for global brands and built robust enterprise applications."
              />
            </div>
          </div>
        </section>

        {/* Projects & Demos Section */}
        <section className="py-32 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase mb-4">
                Explore My Work
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold">
                View My{" "}
                <span className="italic text-text/50 font-medium">
                  Projects
                </span>{" "}
                & Demos
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Projects Card */}
              <motion.a
                href="/projects"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative p-12 border border-[hsl(var(--accent-gold))]/20 bg-linear-to-br from-[hsl(var(--accent-gold))]/5 to-transparent hover:border-[hsl(var(--accent-gold))]/50 transition-all duration-500 cursor-pointer"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[hsl(var(--accent-gold))]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-display font-semibold mb-4 text-[hsl(var(--accent-gold))]">
                    Projects
                  </h3>
                  <p className="text-text/60 mb-8 text-lg">
                    Explore my portfolio of web applications, websites, and
                    digital products built with modern technologies.
                  </p>
                  <div className="flex items-center gap-2 text-[hsl(var(--accent-gold))] group-hover:gap-4 transition-all duration-300">
                    <span className="uppercase tracking-widest text-sm font-semibold">
                      View Projects
                    </span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
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
                  </div>
                </div>
              </motion.a>

              {/* Demos Card */}
              <motion.a
                href="/demos"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative p-12 border border-[hsl(var(--accent-bronze))]/20 bg-linear-to-br from-[hsl(var(--accent-bronze))]/5 to-transparent hover:border-[hsl(var(--accent-bronze))]/50 transition-all duration-500 cursor-pointer"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[hsl(var(--accent-bronze))]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-display font-semibold mb-4 text-[hsl(var(--accent-bronze))]">
                    Demos
                  </h3>
                  <p className="text-text/60 mb-8 text-lg">
                    Check out interactive demos, experiments, and showcase
                    pieces that highlight my creative coding skills.
                  </p>
                  <div className="flex items-center gap-2 text-[hsl(var(--accent-bronze))] group-hover:gap-4 transition-all duration-300">
                    <span className="uppercase tracking-widest text-sm font-semibold">
                      View Demos
                    </span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
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
                  </div>
                </div>
              </motion.a>
            </div>
          </div>
        </section>
      </main>
    </>
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
      <h4 className="text-2xl font-display font-semibold mb-2">{role}</h4>
      <div className="text-sm font-bold uppercase tracking-widest mb-6 text-text/40 group-hover:text-text/80 transition-colors">
        {company}
      </div>
      <p className="text-text/60">{desc}</p>
    </div>
  );
}
