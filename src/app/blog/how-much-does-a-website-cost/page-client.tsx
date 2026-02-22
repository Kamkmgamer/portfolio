"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
  Smartphone,
  ShoppingCart,
  MapPin,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

const quickAnswer = {
  question: "How much does a website cost?",
  answer:
    "Website costs range from $20 to $10,000+. A basic professional website costs $200-$500. Ecommerce sites start at $500. Custom business websites with advanced features cost $1,000-$5,000. Enterprise solutions start at $10,000.",
};

const priceRanges = [
  {
    range: "$20 - $100",
    label: "Basic Placeholder",
    verdict: "Not recommended for real businesses",
    color: "red",
    description: "Slow loading, broken on mobile, no real functionality. Only for testing ideas or hobbies.",
  },
  {
    range: "$200 - $500",
    label: "Professional",
    verdict: "Recommended starting point",
    color: "green",
    description: "Fast, mobile-friendly, working contact forms. Good for most small businesses.",
  },
  {
    range: "$500 - $1,000",
    label: "Competitive",
    verdict: "For businesses that need to stand out",
    color: "gold",
    description: "Animations, reservations, enhanced features. When you need to win against competitors.",
  },
  {
    range: "$1,000 - $2,000",
    label: "Business Tool",
    verdict: "Website actively generates revenue",
    color: "gold",
    description: "Real-time systems, order management, customer database. The website works for you 24/7.",
  },
  {
    range: "$2,000 - $5,000",
    label: "Multi-Location",
    verdict: "For growing businesses",
    color: "purple",
    description: "Multiple locations, loyalty programs, advanced integrations. For restaurant groups or scaling brands.",
  },
  {
    range: "$5,000 - $10,000+",
    label: "Enterprise Platform",
    verdict: "The website IS your business",
    color: "purple",
    description: "Full online ordering, delivery tracking, custom features. You own the technology.",
  },
];

const restaurantDemos = [
  { price: "$20", url: "https://20-dollar-restaurant.vercel.app", speed: "5+ sec", mobile: "Broken", verdict: "skip" },
  { price: "$100", url: "https://100-dollar-restaurant.vercel.app", speed: "3-4 sec", mobile: "Partial", verdict: "skip" },
  { price: "$200", url: "https://200-dollar-restaurant.vercel.app", speed: "1-2 sec", mobile: "Perfect", verdict: "good" },
  { price: "$500", url: "https://500-dollar-restaurant.vercel.app", speed: "<1 sec", mobile: "Perfect", verdict: "good" },
  { price: "$700", url: "https://700-dollar-restaurant.vercel.app", speed: "<1 sec", mobile: "Perfect", verdict: "good" },
  { price: "$1,000", url: "https://1000-dollar-restaurant.vercel.app", speed: "<1 sec", mobile: "Perfect", verdict: "great" },
  { price: "$2,000", url: "https://2000-dollar-restaurant.vercel.app", speed: "<1 sec", mobile: "Perfect", verdict: "great" },
  { price: "$5,000", url: "https://5000-dollar-restaurant.vercel.app", speed: "<500ms", mobile: "Perfect", verdict: "enterprise" },
  { price: "$10,000", url: "https://10000-dollar-restaurant.vercel.app", speed: "<300ms", mobile: "App-like", verdict: "enterprise" },
];

const ecommerceDemos = [
  { price: "$20", url: "https://20-dollar-ecommerce-app.vercel.app", speed: "5+ sec", mobile: "Broken", verdict: "skip" },
  { price: "$100", url: "https://100-dollar-ecommerce-app.vercel.app", speed: "3-4 sec", mobile: "Partial", verdict: "skip" },
  { price: "$500", url: "https://500-dollar-ecommerce-app.vercel.app", speed: "<1 sec", mobile: "Perfect", verdict: "good" },
  { price: "$1,000", url: "https://1000-dollar-ecommerce-app.vercel.app", speed: "<1 sec", mobile: "Perfect", verdict: "great" },
  { price: "$5,000", url: "https://5000-dollar-ecommerce-app.vercel.app", speed: "<500ms", mobile: "Perfect", verdict: "enterprise" },
  { price: "$10,000", url: "https://10000-dollar-ecommerce-app.vercel.app", speed: "<300ms", mobile: "App-like", verdict: "enterprise" },
];

const faqs = [
  {
    question: "How much does a restaurant website cost?",
    answer:
      "Restaurant websites cost $200-$2,000 for most independent restaurants. A basic site with menu and contact info costs $200-$500. Sites with reservations and online ordering cost $1,000-$2,000. Multi-location restaurants need $5,000+.",
  },
  {
    question: "How much does an ecommerce website cost?",
    answer:
      "Ecommerce websites cost $500-$10,000+. A basic store with checkout costs $500-$1,000. Stores with inventory management and payment processing cost $1,000-$5,000. Custom platforms with advanced features cost $5,000-$10,000+.",
  },
  {
    question: "What is the cheapest way to get a website?",
    answer:
      "The cheapest options are free Google Business Profile for local businesses, or $20 WordPress hosting for basic sites. However, these have significant limitations. For a real business, budget at least $200-$500 for a professional result.",
  },
  {
    question: "Why do some websites cost $10,000?",
    answer:
      "$10,000 websites include custom design, advanced features like real-time ordering, customer accounts, loyalty programs, multi-language support, and payment integrations. You own the technology instead of renting from platforms like Shopify. For high-volume businesses, this investment pays for itself.",
  },
];

const recommendations = [
  {
    type: "Small Business",
    budget: "$200 - $500",
    description: "Professional appearance, mobile-friendly, working contact forms",
  },
  {
    type: "Restaurant",
    budget: "$500 - $1,000",
    description: "Menu display, reservations, mobile-optimized for customers on the go",
  },
  {
    type: "Ecommerce Store",
    budget: "$500 - $2,000",
    description: "Product catalog, shopping cart, payment processing, order management",
  },
  {
    type: "Multi-Location Business",
    budget: "$2,000 - $5,000",
    description: "Location management, customer accounts, centralized dashboard",
  },
  {
    type: "High-Volume Online Business",
    budget: "$5,000 - $10,000+",
    description: "Full ordering system, delivery tracking, loyalty programs, own your tech",
  },
];

export default function HowMuchDoesAWebsiteCostPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[hsl(var(--accent-gold))]/5 via-background to-background" />

      <article className="max-w-4xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
            <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">
              Website Pricing Guide
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 leading-tight">
            How Much Does a Website Cost?
          </h1>

          <p className="text-xl text-text/60 leading-relaxed mb-8">
            See exactly what different budgets buy. I built 15 live demos so you can compare 
            $20 to $10,000 websites side by side.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text/50">
            <span>Updated February 2026</span>
            <span>•</span>
            <span>15 Live Demos</span>
            <span>•</span>
            <span>12 min read</span>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="glass-card p-6 md:p-8 border-[hsl(var(--accent-gold))]/30 bg-[hsl(var(--accent-gold))]/5">
            <h2 className="text-lg font-semibold mb-3 text-[hsl(var(--accent-gold))]">
              Quick Answer
            </h2>
            <p className="text-lg text-text/80 leading-relaxed">
              <strong>{quickAnswer.question}</strong> {quickAnswer.answer}
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
          id="price-ranges"
        >
          <h2 className="text-2xl md:text-3xl font-display mb-8">
            Website Cost by Budget
          </h2>

          <div className="space-y-4">
            {priceRanges.map((tier, index) => (
              <motion.div
                key={tier.range}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`glass-card p-6 border-l-4 ${
                  tier.color === "red"
                    ? "border-l-red-500"
                    : tier.color === "green"
                      ? "border-l-green-500"
                      : tier.color === "gold"
                        ? "border-l-[hsl(var(--accent-gold))]"
                        : "border-l-purple-500"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                  <div>
                    <span className="text-2xl font-display font-bold">{tier.range}</span>
                    <span className="ml-3 text-text/60">{tier.label}</span>
                  </div>
                  <span
                    className={`text-sm ${
                      tier.color === "red"
                        ? "text-red-400"
                        : tier.color === "green"
                          ? "text-green-400"
                          : tier.color === "gold"
                            ? "text-[hsl(var(--accent-gold))]"
                            : "text-purple-400"
                    }`}
                  >
                    {tier.verdict}
                  </span>
                </div>
                <p className="text-text/60">{tier.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
          id="restaurant-demos"
        >
          <h2 className="text-2xl md:text-3xl font-display mb-4">
            Restaurant Website Cost Comparison
          </h2>
          <p className="text-text/60 mb-8">
            9 live restaurant websites from $20 to $10,000. Open them on your phone to see the difference.
          </p>

          <div className="glass-card overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left p-4 font-display">Budget</th>
                    <th className="text-left p-4 font-display">Speed</th>
                    <th className="text-left p-4 font-display">Mobile</th>
                    <th className="text-left p-4 font-display">Demo</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurantDemos.map((demo) => (
                    <tr key={demo.price} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="p-4 font-display font-semibold">{demo.price}</td>
                      <td className={`p-4 ${demo.speed.includes("5+") || demo.speed.includes("3-4") ? "text-red-400" : "text-green-400"}`}>
                        {demo.speed}
                      </td>
                      <td className={`p-4 ${demo.mobile === "Broken" ? "text-red-400" : demo.mobile === "Partial" ? "text-orange-400" : "text-green-400"}`}>
                        {demo.mobile}
                      </td>
                      <td className="p-4">
                        <a
                          href={demo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[hsl(var(--accent-gold))] hover:underline inline-flex items-center gap-1"
                        >
                          Open <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Link
            href="/case-studies/restaurant-websites-tiers"
            className="inline-flex items-center gap-2 text-[hsl(var(--accent-gold))] hover:underline"
          >
            Full Restaurant Case Study with Feature Breakdown <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
          id="ecommerce-demos"
        >
          <h2 className="text-2xl md:text-3xl font-display mb-4">
            Ecommerce Website Cost Comparison
          </h2>
          <p className="text-text/60 mb-8">
            6 live ecommerce stores from $20 to $10,000. Try adding products to cart on each.
          </p>

          <div className="glass-card overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left p-4 font-display">Budget</th>
                    <th className="text-left p-4 font-display">Speed</th>
                    <th className="text-left p-4 font-display">Mobile</th>
                    <th className="text-left p-4 font-display">Demo</th>
                  </tr>
                </thead>
                <tbody>
                  {ecommerceDemos.map((demo) => (
                    <tr key={demo.price} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="p-4 font-display font-semibold">{demo.price}</td>
                      <td className={`p-4 ${demo.speed.includes("5+") || demo.speed.includes("3-4") ? "text-red-400" : "text-green-400"}`}>
                        {demo.speed}
                      </td>
                      <td className={`p-4 ${demo.mobile === "Broken" ? "text-red-400" : demo.mobile === "Partial" ? "text-orange-400" : "text-green-400"}`}>
                        {demo.mobile}
                      </td>
                      <td className="p-4">
                        <a
                          href={demo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[hsl(var(--accent-gold))] hover:underline inline-flex items-center gap-1"
                        >
                          Open <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Link
            href="/case-studies/ecommerce-websites-tiers"
            className="inline-flex items-center gap-2 text-[hsl(var(--accent-gold))] hover:underline"
          >
            Full Ecommerce Case Study with Feature Breakdown <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
          id="recommendations"
        >
          <h2 className="text-2xl md:text-3xl font-display mb-8">
            What Should You Budget?
          </h2>

          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left p-4 font-display">Business Type</th>
                    <th className="text-left p-4 font-display">Recommended Budget</th>
                    <th className="text-left p-4 font-display">What You Get</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendations.map((rec, index) => (
                    <tr key={rec.type} className={`border-b border-white/5 ${index % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                      <td className="p-4 font-semibold">{rec.type}</td>
                      <td className="p-4 text-[hsl(var(--accent-gold))] font-display">{rec.budget}</td>
                      <td className="p-4 text-text/60">{rec.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
          id="faq"
        >
          <h2 className="text-2xl md:text-3xl font-display mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                <p className="text-text/60 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20 text-center">
            <h2 className="text-2xl md:text-3xl font-display mb-6">The Bottom Line</h2>
            <p className="text-lg text-text/60 mb-8 max-w-2xl mx-auto">
              Your website is often the first thing potential customers see. 
              It&apos;s either building trust or destroying it.
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
                  <XCircle className="h-4 w-4" />
                  A Cost
                </div>
                <p className="text-sm text-text/60">$20-$100 websites hurt your reputation</p>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-400 font-semibold mb-2">
                  <CheckCircle className="h-4 w-4" />
                  An Investment
                </div>
                <p className="text-sm text-text/60">$200+ websites build credibility and trust</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <h2 className="text-2xl md:text-3xl font-display mb-4">
            Ready to Build Your Website?
          </h2>
          <p className="text-text/60 mb-8 max-w-lg mx-auto">
            See the full breakdown of what each budget delivers, or get in touch to discuss your project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-premium">
              <span>Get a Quote</span>
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/30 transition-all"
            >
              <span className="text-sm font-semibold uppercase tracking-wider">View Case Studies</span>
            </Link>
          </div>
          <div className="mt-8">
            <Link
              href="/blog"
              className="text-sm text-text/50 hover:text-[hsl(var(--accent-gold))] transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </motion.section>
      </article>
    </main>
  );
}
