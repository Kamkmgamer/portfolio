"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  Smartphone,
  TrendingUp,
  CheckCircle,
  XCircle,
  ExternalLink,
  ArrowRight,
  Brain,
} from "lucide-react";

const tiers = [
  {
    price: "$20",
    label: "The Problem",
    verdict: "skip",
    summary: "Hurts your reputation",
    color: "red",
    speed: "5+ seconds",
    mobile: "Broken",
    features: [
      { text: "Painfully slow loading", good: false },
      { text: "Placeholder text everywhere", good: false },
      { text: "Broken mobile experience", good: false },
      { text: "WhatsApp only — no checkout", good: false },
      { text: "Looks like a scam", good: false },
    ],
    url: "https://20-dollar-ecommerce-app.vercel.app",
  },
  {
    price: "$100",
    label: "The Template",
    verdict: "placeholder",
    summary: "Forgettable placeholder",
    color: "orange",
    speed: "3-4 seconds",
    mobile: "Partial",
    features: [
      { text: "Works on some phones", good: false },
      { text: "Annoying auto-play carousel", good: false },
      { text: "Generic product photos", good: false },
      { text: "WhatsApp ordering only", good: false },
      { text: "No product details or zoom", good: false },
    ],
    url: "https://100-dollar-ecommerce-app.vercel.app",
  },
  {
    price: "$500",
    label: "Competitive",
    verdict: "good",
    summary: "Win customers from Amazon",
    color: "green",
    speed: "Under 1 sec",
    mobile: "Perfect",
    features: [
      { text: "Loads fast, keeps attention", good: true },
      { text: "Works on all devices", good: true },
      { text: "Smooth scroll animations", good: true },
      { text: "Product gallery with lightbox", good: true },
      { text: "Real customer reviews", good: true },
    ],
    url: "https://500-dollar-ecommerce-app.vercel.app",
  },
  {
    price: "$1,000",
    label: "Revenue Generator",
    verdict: "great",
    summary: "Works for you 24/7",
    color: "gold",
    speed: "Under 1 sec",
    mobile: "Perfect",
    features: [
      { text: "Real-time inventory", good: true },
      { text: "Abandoned cart recovery", good: true },
      { text: "Multiple payment options", good: true },
      { text: "Order tracking", good: true },
      { text: "Automatic tax calculation", good: true },
    ],
    url: "https://1000-dollar-ecommerce-app.vercel.app",
  },
  {
    price: "$5,000",
    label: "Multi-Product",
    verdict: "enterprise",
    summary: "For scaling businesses",
    color: "purple",
    speed: "Under 500ms",
    mobile: "Perfect",
    features: [
      { text: "Advanced search with autocomplete", good: true },
      { text: "Subscribe and save", good: true },
      { text: "Wholesale with special pricing", good: true },
      { text: "Buy now, pay later", good: true },
      { text: "Stock alerts", good: true },
    ],
    url: "https://5000-dollar-ecommerce-app.vercel.app",
  },
  {
    price: "$10,000",
    label: "Revenue Platform",
    verdict: "enterprise",
    summary: "You own the technology",
    color: "purple",
    speed: "Under 300ms",
    mobile: "App-like",
    features: [
      { text: "AI-powered recommendations", good: true },
      { text: "Personalized homepage", good: true },
      { text: "Install as phone app", good: true },
      { text: "Works offline", good: true },
      { text: "No Shopify fees forever", good: true },
    ],
    url: "https://10000-dollar-ecommerce-app.vercel.app",
  },
];

const recommendations = [
  {
    title: "Skip These",
    budget: "$20 - $100",
    icon: XCircle,
    color: "red",
    items: [
      "$20: Hurts your reputation. Use Instagram Shopping or Etsy instead.",
      "$100: Forgettable placeholder. Only if you're desperate.",
    ],
  },
  {
    title: "Start Here",
    budget: "$500",
    icon: CheckCircle,
    color: "green",
    items: [
      "Professional, trustworthy, works on all devices.",
      "This is what your customers expect from online stores.",
    ],
  },
  {
    title: "Drive Revenue",
    budget: "$1,000+",
    icon: TrendingUp,
    color: "gold",
    items: [
      "Abandoned cart recovery, automation, multiple payments.",
      "The backend is now a business tool that pays for itself.",
    ],
  },
  {
    title: "Own Your Tech",
    budget: "$10,000",
    icon: Brain,
    color: "purple",
    items: [
      "AI recommendations, custom infrastructure, no monthly fees.",
      "You own it forever instead of renting from Shopify.",
    ],
  },
];

export default function EcommerceWebsitesTiersCaseStudy() {
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
            <span className="h-1px w-12 bg-[hsl(var(--accent-gold))]" />
            <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">
              Transparency Project
            </span>
            <span className="h-1px w-12 bg-[hsl(var(--accent-gold))]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-display mb-8">
            $20 to $10,000 <br />
            <span className="italic text-text/50">Ecommerce</span>
          </h1>

          <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-12">
            I built every tier to show you exactly what your money buys for
            online stores. Here&apos;s the honest truth.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge label="6 Live Demos" />
            <Badge label="Transparent Pricing" />
            <Badge label="See the Backend" />
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
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display mb-6">The Problem</h2>
              <p className="text-lg text-text/60 leading-relaxed mb-8">
                You&apos;re shopping for an online store. One quote says $20,
                another says $10,000. Are the expensive ones ripping you off?
                Are the cheap ones cutting corners?
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-[hsl(var(--accent-gold))] font-display text-xl mb-2">
                    Unclear Value
                  </div>
                  <p className="text-sm text-text/60">
                    What does each dollar actually buy?
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-[hsl(var(--accent-gold))] font-display text-xl mb-2">
                    80% Is Invisible
                  </div>
                  <p className="text-sm text-text/60">
                    Backend systems you never see
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-[hsl(var(--accent-gold))] font-display text-xl mb-2">
                    No Examples
                  </div>
                  <p className="text-sm text-text/60">
                    How can you compare without seeing?
                  </p>
                </div>
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
              All <span className="italic text-text/50">Six Tiers</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">
              Each tier is a real, working store. Open them on your phone. Try
              to add something to cart. Go through checkout. The difference is
              obvious within seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.price}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`glass-card p-6 flex flex-col ${
                  tier.verdict === "skip"
                    ? "border-red-500/30"
                    : tier.verdict === "placeholder"
                      ? "border-orange-500/30"
                      : tier.verdict === "great" ||
                          tier.verdict === "enterprise"
                        ? "border-[hsl(var(--accent-gold))]/30"
                        : ""
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-3xl font-display font-bold">
                      {tier.price}
                    </div>
                    <div className="text-sm text-text/60">{tier.label}</div>
                  </div>
                  <a
                    href={tier.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[hsl(var(--accent-gold))] hover:text-[hsl(var(--accent-gold))]/80 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>

                <div
                  className={`text-sm mb-4 ${
                    tier.verdict === "skip"
                      ? "text-red-400"
                      : tier.verdict === "placeholder"
                        ? "text-orange-400"
                        : "text-[hsl(var(--accent-gold))]"
                  }`}
                >
                  {tier.summary}
                </div>

                <div className="flex gap-4 text-xs text-text/50 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {tier.speed}
                  </span>
                  <span className="flex items-center gap-1">
                    <Smartphone className="h-3 w-3" />
                    {tier.mobile}
                  </span>
                </div>

                <ul className="space-y-2 flex-1">
                  {tier.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-text/60"
                    >
                      {feature.good ? (
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                      )}
                      {feature.text}
                    </li>
                  ))}
                </ul>
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
              Quick <span className="italic text-text/50">Comparison</span>
            </h2>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 font-display text-text/80">
                      Budget
                    </th>
                    <th className="text-left p-4 font-display text-text/80">
                      Speed
                    </th>
                    <th className="text-left p-4 font-display text-text/80">
                      Mobile
                    </th>
                    <th className="text-left p-4 font-display text-text/80">
                      Shopping Cart
                    </th>
                    <th className="text-left p-4 font-display text-text/80">
                      Checkout
                    </th>
                    <th className="text-left p-4 font-display text-text/80">
                      Advanced Features
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "$20",
                      "5+ seconds",
                      "Broken",
                      "WhatsApp only",
                      "No",
                      "No",
                    ],
                    [
                      "$100",
                      "3-4 seconds",
                      "Partial",
                      "WhatsApp only",
                      "No",
                      "No",
                    ],
                    [
                      "$500",
                      "Under 1 sec",
                      "Perfect",
                      "Smooth",
                      "Smooth",
                      "Filters",
                    ],
                    [
                      "$1,000",
                      "Under 1 sec",
                      "Perfect",
                      "Optimized",
                      "Multi-payment",
                      "Abandoned cart",
                    ],
                    [
                      "$5,000",
                      "Under 500ms",
                      "Perfect",
                      "Advanced",
                      "Advanced",
                      "Subscriptions",
                    ],
                    [
                      "$10,000",
                      "Under 300ms",
                      "App-like",
                      "Enterprise",
                      "Enterprise",
                      "AI/ML",
                    ],
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-white/5">
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          className={`p-4 ${
                            cellIdx === 0
                              ? "font-display font-semibold"
                              : "text-text/60"
                          } ${
                            cell === "No"
                              ? "text-red-400/60"
                              : cell === "Broken"
                                ? "text-red-400"
                                : cell === "Enterprise" ||
                                    cell === "Optimized" ||
                                    cell === "Advanced" ||
                                    cell === "AI/ML" ||
                                    cell === "Subscriptions" ||
                                    cell === "Abandoned cart"
                                  ? "text-green-400"
                                  : ""
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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
              Honest{" "}
              <span className="italic text-text/50">Recommendations</span>
            </h2>
            <p className="text-lg text-text/60">
              Choose based on what the website means to your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <rec.icon
                    className={`h-5 w-5 ${
                      rec.color === "red"
                        ? "text-red-400"
                        : rec.color === "green"
                          ? "text-green-400"
                          : rec.color === "gold"
                            ? "text-[hsl(var(--accent-gold))]"
                            : "text-purple-400"
                    }`}
                  />
                  <h3 className="text-lg font-display">{rec.title}</h3>
                </div>
                <div className="text-sm text-[hsl(var(--accent-gold))] mb-4">
                  {rec.budget}
                </div>
                <ul className="space-y-3">
                  {rec.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-text/60"
                    >
                      <ArrowRight className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
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
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display mb-8">The Bottom Line</h2>
              <div className="text-xl md:text-2xl font-display leading-relaxed mb-8">
                Your ecommerce site is often the first thing potential customers
                see. It&apos;s either building trust or destroying it.
              </div>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-[hsl(var(--accent-gold))] font-display text-lg mb-2">
                    Just need to exist online?
                  </div>
                  <p className="text-sm text-text/60">$500</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-[hsl(var(--accent-gold))] font-display text-lg mb-2">
                    Competing for customers?
                  </div>
                  <p className="text-sm text-text/60">$500 - $1,000</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-[hsl(var(--accent-gold))] font-display text-lg mb-2">
                    Website should drive revenue?
                  </div>
                  <p className="text-sm text-text/60">$1,000 - $5,000</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-[hsl(var(--accent-gold))] font-display text-lg mb-2">
                    Want to own your technology?
                  </div>
                  <p className="text-sm text-text/60">$10,000+</p>
                </div>
              </div>
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
              Ready to Build <span className="italic text-text/50">Yours?</span>
            </h2>
            <p className="text-lg text-text/60 mb-10 leading-relaxed">
              This project demonstrates what different budgets deliver.
              Let&apos;s discuss what your store actually needs — no upselling,
              just honest recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-premium">
                <span>Let&apos;s Talk</span>
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
