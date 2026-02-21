"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  Smartphone,
  XCircle,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  MapPin,
  RefreshCw,
} from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "5+ Second Load Time",
    description: "Visitors stare at a blank screen before anything appears",
  },
  {
    icon: AlertTriangle,
    title: "Placeholder Text",
    description: '"Hello World" and "Sample Page" still visible on the site',
  },
  {
    icon: Smartphone,
    title: "Broken on Mobile",
    description: "Buttons cut off, text unreadable on phones",
  },
  {
    icon: XCircle,
    title: "Links Go Nowhere",
    description: "Contact pages, menus, and buttons don't work",
  },
];

const comparison = [
  { feature: "Load Time", cheap: "5+ seconds", good: "Under 1 second" },
  {
    feature: "Mobile Experience",
    cheap: "Broken",
    good: "Perfect on all devices",
  },
  {
    feature: "Customization",
    cheap: "None, generic template",
    good: "Branded to your business",
  },
  {
    feature: "Contact Info",
    cheap: "Maybe correct",
    good: "Clickable phone, map, forms",
  },
  { feature: "SEO", cheap: "None", good: "Optimized for Google" },
  {
    feature: "Trust Factor",
    cheap: "Hurts your reputation",
    good: "Builds credibility",
  },
];

const hiddenCosts = [
  "You buy the $20 site",
  "It doesn't work",
  "Customers complain",
  "You realize you need something better",
  "Now you're paying again, for the website you should have bought in the first place",
];

const whenItMakesSense = [
  "You're testing a business idea before committing",
  "You literally have zero budget and need something today",
  "You're a hobbyist, not a business",
];

export default function WhyNotCheapWebsitesPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[hsl(var(--accent-gold))]/5 via-background to-background" />

      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
            <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">
              Business Advice
            </span>
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-display mb-8">
            Why a $20 Website <br />
            <span className="italic text-text/50">Will Cost You Thousands</span>
          </h1>

          <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-12">
            You found a deal. Someone offered to build your business website for
            $20. Here&apos;s what that $20 actually costs you.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge label="No Jargon" />
            <Badge label="Real Demos" />
            <Badge label="Honest Advice" />
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-display mb-6 text-center">
                See It For Yourself
              </h2>
              <p className="text-lg text-text/60 leading-relaxed mb-8 text-center">
                I built a $20 website intentionally to show you what that money
                buys. Open it on your phone. Wait for it to load. Try to find
                the menu.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://20-dollar-restaurant.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 border border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] hover:bg-[hsl(var(--accent-gold))]/5 transition-all duration-300"
                >
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    Open $20 Restaurant
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="https://20-dollar-ecommerce-app.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <span className="text-sm font-semibold uppercase tracking-wider text-text/70">
                    Open $20 Ecommerce
                  </span>
                  <ExternalLink className="h-4 w-4 text-text/70" />
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              What You{" "}
              <span className="italic text-text/50">Just Experienced</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">
              If you opened the demo, here&apos;s what you saw.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 border-red-500/20 hover:border-red-500/40 transition-all duration-500"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 text-red-400 mb-4">
                  <problem.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-display mb-2">{problem.title}</h3>
                <p className="text-sm text-text/60">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              The Real <span className="italic text-text/50">Cost</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">
              A bad website doesn&apos;t just look cheap, it actively repels
              customers.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="text-[hsl(var(--accent-gold))] font-display text-xl mb-4">
                Trust is Everything
              </div>
              <p className="text-sm text-text/60 leading-relaxed">
                When someone visits your website, they&apos;re asking one
                question:
                <em> Is this a real business?</em> A $20 website answers
                &quot;no&quot; before they read a single word. Broken links,
                placeholder text, slow loading, these aren&apos;t just aesthetic
                problems. They&apos;re trust problems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="text-[hsl(var(--accent-gold))] font-display text-xl mb-4">
                The Mobile Problem
              </div>
              <p className="text-sm text-text/60 leading-relaxed">
                Most web traffic now comes from phones. A $20 website is built
                for desktop, tested once, and never checked again. Your
                customers are browsing on phones during lunch breaks and
                commutes. Broken on mobile means invisible to them.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="text-[hsl(var(--accent-gold))] font-display text-xl mb-4">
                The Speed Problem
              </div>
              <p className="text-sm text-text/60 leading-relaxed">
                Nobody waits anymore. If your site takes 5 seconds to load, most
                visitors have already left. They hit the back button and clicked
                your competitor&apos;s link instead.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              What You&apos;re{" "}
              <span className="italic text-text/50">Paying For</span>
            </h2>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-4 border-b border-white/10 bg-white/5">
              <div className="font-display text-text/80">Feature</div>
              <div className="font-display text-red-400 text-center">
                $20 Website
              </div>
              <div className="font-display text-green-400 text-center">
                $500+ Website
              </div>
            </div>
            {comparison.map((row, idx) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 gap-4 p-4 ${idx % 2 === 0 ? "bg-white/[0.02]" : ""}`}
              >
                <div className="text-text/70">{row.feature}</div>
                <div className="text-red-400/80 text-center text-sm">
                  {row.cheap}
                </div>
                <div className="text-green-400/80 text-center text-sm">
                  {row.good}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-[hsl(var(--accent-gold))]/5 border border-[hsl(var(--accent-gold))]/20 rounded-lg text-center">
            <p className="text-text/70 mb-4">
              Want to see every tier from $20 to $10,000? I built them all.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/case-studies/restaurant-websites-tiers"
                className="text-[hsl(var(--accent-gold))] hover:underline font-medium"
              >
                Restaurant Case Study →
              </Link>
              <Link
                href="/case-studies/ecommerce-websites-tiers"
                className="text-[hsl(var(--accent-gold))] hover:underline font-medium"
              >
                Ecommerce Case Study →
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="glass-card p-8 md:p-12 border-l-4 border-l-[hsl(var(--accent-gold))]">
            <div className="flex items-center gap-4 mb-6">
              <RefreshCw className="h-6 w-6 text-[hsl(var(--accent-gold))]" />
              <h2 className="text-2xl font-display">
                The Hidden Problem: You&apos;ll Pay Twice
              </h2>
            </div>
            <div className="space-y-4 mb-8">
              {hiddenCosts.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-text/70">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-lg text-text/80">
                That $20 decision just cost you{" "}
                <strong>$520 instead of $500</strong>.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <h3 className="text-xl font-display">
                  When a $20 Website Makes Sense
                </h3>
              </div>
              <ul className="space-y-4">
                {whenItMakesSense.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-text/60"
                  >
                    <ArrowRight className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-8 border-[hsl(var(--accent-gold))]/20">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                <h3 className="text-xl font-display">
                  A Better Alternative: Google Business Profile
                </h3>
              </div>
              <p className="text-sm text-text/60 leading-relaxed mb-4">
                If budget is tight, don&apos;t buy a $20 website. Set up a
                Google Business Profile instead.
              </p>
              <ul className="space-y-3">
                {[
                  "It's free",
                  "Shows up in local searches",
                  "Displays hours, photos, and reviews",
                  "Customers can call with one tap",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-text/60"
                  >
                    <CheckCircle className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20 text-center">
            <h2 className="text-3xl font-display mb-6">The Bottom Line</h2>
            <div className="text-xl md:text-2xl font-display leading-relaxed mb-8 max-w-2xl mx-auto">
              Your website is often the first thing customers see. It&apos;s
              either{" "}
              <span className="text-[hsl(var(--accent-gold))]">
                working for you
              </span>{" "}
              or
              <span className="text-red-400"> against you</span>.
            </div>
            <p className="text-lg text-text/60 mb-8">
              A $20 website works against you. It tells customers you don&apos;t
              care, you&apos;re not professional, and you might not even be a
              real business.
            </p>
            <div className="p-6 bg-white/5 rounded-lg inline-block">
              <p className="text-lg text-text/80">
                <strong>The real cost isn&apos;t $20.</strong>
                <br />
                It&apos;s every customer who clicked away.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center py-20"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              See For <span className="italic text-text/50">Yourself</span>
            </h2>
            <p className="text-lg text-text/60 mb-10 leading-relaxed">
              Don&apos;t take my word for it. Open the demos on your phone. Time
              how long they take to load. Try to find contact information. Then
              ask yourself: <em>Would I trust this business?</em>
            </p>
            <p className="text-text/80 mb-8">
              If you&apos;re ready to invest in something that actually works,
              <Link
                href="/contact"
                className="text-[hsl(var(--accent-gold))] hover:underline ml-1"
              >
                start here
              </Link>
              .
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://20-dollar-restaurant.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium"
              >
                <span>$20 Restaurant Demo</span>
              </a>
              <a
                href="https://20-dollar-ecommerce-app.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 border-b border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] transition-all duration-500"
              >
                <span className="uppercase tracking-[0.2em] text-xs font-semibold text-text/70 group-hover:text-text">
                  $20 Ecommerce Demo
                </span>
              </a>
            </div>
            <div className="mt-12">
              <Link
                href="/blog"
                className="text-sm text-text/50 hover:text-[hsl(var(--accent-gold))] transition-colors"
              >
                ← Back to Blog
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
