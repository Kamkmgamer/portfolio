"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lightbulb, Rocket, Users, Heart, Zap, Palette } from "lucide-react";

const stats = [
  {
    label: "Project Type",
    value: "Web Design",
    icon: Palette,
    desc: "Premium digital presence",
  },
  {
    label: "Approach",
    value: "Discovery",
    icon: Lightbulb,
    desc: "Ideas to execution",
  },
  {
    label: "Focus",
    value: "Experience",
    icon: Heart,
    desc: "Emotion-driven design",
  },
  {
    label: "Result",
    value: "Confidence",
    icon: Rocket,
    desc: "Proud to share",
  },
];

const approach = [
  {
    step: "01",
    title: "Started with Clarity",
    description:
      "No mockups yet. Just conversations about what feeling they wanted visitors to have. What matters most to their business? What should someone think in those first few seconds?",
  },
  {
    step: "02",
    title: "Designed for Humans",
    description:
      "Static pages are boring. I built an experience with animations that feel natural, spacing that breathes, and interactions that guide without getting in the way.",
  },
  {
    step: "03",
    title: "Built to Last",
    description:
      "Picked tools that prioritize clean code and performance. No need to rebuild in two years. Just room to grow and iterate.",
  },
  {
    step: "04",
    title: "Handled the Hard Stuff",
    description:
      "They ran their business. I handled the tech decisions, explained things in plain English, and didn't overwhelm them with choices they didn't need to make.",
  },
];

const problemPoints = [
  "Site looked generic, like dozens of competitors",
  "Didn&apos;t communicate quality or credibility",
  "Visitors weren&apos;t sticking around",
  "Past dev experiences meant constant back-and-forth",
  "Technical decisions felt overwhelming",
  "No clear vision of what better looked like",
];

const results = [
  "Site actually reflects what they do",
  "Looks professional without being stuffy",
  "First impressions are now positive",
  "People take the brand more seriously",
  "Easy to add features later",
  "They're proud to share the link",
];

const techStack = [
  {
    category: "Frontend",
    techs: ["React/Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Design",
    techs: [
      "Intentional spacing",
      "Typography system",
      "Motion design",
      "Micro-interactions",
    ],
  },
  {
    category: "Performance",
    techs: [
      "Optimized assets",
      "Fast load times",
      "Smooth animations",
      "Responsive design",
    ],
  },
  {
    category: "Process",
    techs: [
      "Discovery sessions",
      "Clear communication",
      "Minimal jargon",
      "Quiet execution",
    ],
  },
];

export default function ReducingFrictionCaseStudyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[hsl(var(--accent-gold))]/5 via-background to-background" />

      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
            <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">
              Product Design
            </span>
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-display mb-8">
            Reducing <br />
            <span className="italic text-text/50">Friction</span>
          </h1>

          <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-12">
            A business had a good product but a weak website. Here&apos;s how we
            fixed that.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge label="Discovery" />
            <Badge label="Design" />
            <Badge label="Development" />
          </div>
        </motion.header>

        {/* Stats Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center group hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] mb-4 group-hover:bg-[hsl(var(--accent-gold))]/20 transition-colors">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="text-3xl font-display font-semibold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-text/80 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-text/50">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* The Situation */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              The <span className="italic text-text/50">Situation</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">
              A founder had a good product but a website that didn&apos;t match.
              They knew their offering was solid, but every time they shared
              their site, they&apos;d wince a little.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* The Problem */}
            <div className="glass-card p-8 border-l-2 border-l-text/20">
              <h3 className="text-xl font-display mb-6 flex items-center gap-3">
                <Users className="h-5 w-5 text-[hsl(var(--accent-bronze))]" />
                What Wasn&apos;t Working
              </h3>
              <ul className="space-y-4">
                {problemPoints.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-text/60"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-bronze))] mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* The Real Issue */}
            <div className="glass-card p-8 border-l-2 border-l-[hsl(var(--accent-gold))]">
              <h3 className="text-xl font-display mb-6 flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                The Real Issue
              </h3>
              <p className="text-sm text-text/60 leading-relaxed mb-4">
                No detailed brief. No moodboard. Just a gut feeling that their
                brand deserved better, without knowing what better actually
                looked like.
              </p>
              <p className="text-sm text-text/60 leading-relaxed">
                The problem wasn&apos;t code or pixels. It was the disconnect
                between what they pictured and what existed.
              </p>
            </div>
          </div>
        </motion.section>

        {/* My Approach */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              My <span className="italic text-text/50">Approach</span>
            </h2>
            <p className="text-lg text-text/60">
              How we got from scattered thoughts to something solid
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {approach.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <span className="shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-xl font-display mb-3">{step.title}</h3>
                    <p className="text-sm text-text/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Technology <span className="italic text-text/50">Stack</span>
            </h2>
            <p className="text-lg text-text/60">
              Tools and approach for lasting results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack, index) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text/40 mb-4">
                  {stack.category}
                </h3>
                <div className="space-y-2">
                  {stack.techs.map((tech, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-sm text-text/70"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-gold))]" />
                      {tech}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* The Results */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
            <div className="text-center mb-8">
              <Rocket className="h-8 w-8 text-[hsl(var(--accent-gold))] mx-auto mb-4" />
              <h2 className="text-3xl font-display mb-2">What Changed</h2>
              <p className="text-text/60">Beyond just a new website</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {results.map((result, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm text-text/70">{result}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-[hsl(var(--accent-gold))]/10">
              <p className="text-center text-lg text-text/80 italic">
                The biggest shift was their confidence. They&apos;re actually
                proud to share their website now.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Why This Matters */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Why This <span className="italic text-text/50">Matters</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 md:p-12">
              <p className="text-lg text-text/70 leading-relaxed mb-6">
                This is the work I enjoy most. It&apos;s not about fancy
                features or trendy animations. It&apos;s about closing the gap
                between what someone pictures in their head and what actually
                shows up on screen.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="text-center p-6 bg-white/5">
                  <Zap className="h-6 w-6 text-[hsl(var(--accent-gold))] mx-auto mb-3" />
                  <p className="text-sm text-text/60">
                    From rough ideas to real products
                  </p>
                </div>
                <div className="text-center p-6 bg-white/5">
                  <Heart className="h-6 w-6 text-[hsl(var(--accent-gold))] mx-auto mb-3" />
                  <p className="text-sm text-text/60">
                    From uncertainty to confidence
                  </p>
                </div>
              </div>

              <p className="text-lg text-text/70 leading-relaxed">
                Good design sense plus solid engineering plus actually listening
                to people. That&apos;s how you turn a headache into something
                you&apos;re genuinely proud of.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center py-20"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Have a Rough Idea?
            </h2>
            <p className="text-lg text-text/60 mb-10 leading-relaxed">
              I help businesses figure out what they actually need and then
              build it. No jargon, no unnecessary complexity. Just a website
              that works and feels right.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-premium">
                <span>Let&apos;s Work Together</span>
              </Link>
              <Link
                href="/case-studies"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 border-b border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] transition-all duration-500"
              >
                <span className="uppercase tracking-[0.2em] text-xs font-semibold text-text/70 group-hover:text-text px-4">
                  View More Case Studies
                </span>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-text/80">
      <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent-gold))]" />
      {label}
    </span>
  );
}
