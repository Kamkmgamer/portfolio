"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  ExternalLink,
  ArrowRight,
  ShoppingCart,
  Smartphone,
  Search,
  Zap,
  TrendingUp,
  Target,
  Server,
  DollarSign,
  Crown,
} from "lucide-react";

const whatChanged = [
  {
    icon: ShoppingCart,
    title: "Real Checkout",
    description:
      "Customers add to cart, enter their details, and complete the order. No WhatsApp. No manual follow-up. The website handles it.",
  },
  {
    icon: Smartphone,
    title: "Real Mobile Experience",
    description:
      "Not just &quot;it works on phones.&quot; Actually designed for phones first. Fast, smooth, thumb-friendly. Because that&apos;s where your customers are.",
  },
  {
    icon: Search,
    title: "Real SEO",
    description:
      "Proper page titles, meta descriptions, fast loading, structured data. Google can actually find you. Your competitors without this? Invisible.",
  },
  {
    icon: Server,
    title: "The Backend Difference",
    description:
      "A $100 site is a poster. A $200+ site has logic behind it - order processing, inventory awareness, customer data. The website starts doing work you used to do manually.",
  },
];

const twoHundredGets = [
  "Functional checkout that actually processes orders",
  "Mobile-first design that looks good on every screen",
  "Basic SEO so Google knows you exist",
  "Clean, professional design - not a template",
  "Fast loading - under 2 seconds",
  "Contact forms that actually send emails",
];

const fiveHundredGets = [
  "Everything in $200, plus:",
  "Advanced product filtering and search",
  "Customer accounts and order history",
  "Inventory management with stock tracking",
  "Multiple payment methods",
  "Analytics dashboard to track sales",
  "Optimized for high traffic",
  "Competitive with established businesses",
];

const comparison = [
  { feature: "Load Time", two: "Under 2s", five: "Under 1s" },
  { feature: "Checkout", two: "Basic but functional", five: "Full e-commerce flow" },
  { feature: "Mobile", two: "Responsive", five: "Mobile-first, app-like" },
  { feature: "SEO", two: "Basic optimization", five: "Advanced, structured data" },
  { feature: "Products", two: "Up to ~30", five: "Unlimited, with variants" },
  { feature: "Orders", two: "Email notifications", five: "Dashboard + tracking" },
  { feature: "Design", two: "Clean and professional", five: "Premium and branded" },
  { feature: "Competition", two: "Better than most locals", five: "Matches national brands" },
];

const stopAtTwoHundred = [
  "You sell fewer than 20 products or menu items",
  "Your business is local and reputation-driven",
  "You need a professional presence but not an e-commerce powerhouse",
  "You&apos;re moving from WhatsApp orders to online orders for the first time",
  "Your competitors also have basic websites",
];

const stretchToFiveHundred = [
  "You have a growing catalog with variants (sizes, colors, options)",
  "You&apos;re competing with businesses that already look established online",
  "You need to track inventory, orders, and customer data",
  "You want customers to come back and reorder without messaging you",
  "You&apos;re ready for your website to be a sales channel, not just a brochure",
];

export default function WhatAProfessionalWebsiteCostsPage() {
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
              Smart Investment
            </span>
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-display mb-8">
            What a Professional Website <br />
            <span className="italic text-text/50">Actually Costs</span>
          </h1>

          <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-12">
            Let&apos;s be real: cheap websites are everywhere. You can find someone to build you one for $20 or $100, but usually, they&apos;re either broken or barely functional.
            This post is for when you&apos;re done with that. When you start asking, &quot;Okay, what does a professional website actually look like?&quot;
            This is where a website stops being just a cost and starts becoming an investment in your business.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge label="Live Demos" />
            <Badge label="Honest Comparison" />
            <Badge label="Clear Guidance" />
          </div>
        </motion.header>

        {/* Try All Four Demos */}
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
                See the Difference Yourself
              </h2>
              <p className="text-lg text-text/60 leading-relaxed mb-8 text-center">
                I built three functional demos at two price points. Think of these as mockups of how a real-world site should look and feel at these tiers.
                Open them on your phone, click around, and try the checkout.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-text/50 uppercase tracking-widest mb-3 text-center">
                    $200 Tier
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a
                      href="https://200-dollar-restaurant.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-6 py-3 border border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] hover:bg-[hsl(var(--accent-gold))]/5 transition-all duration-300"
                    >
                      <span className="text-sm font-semibold uppercase tracking-wider">
                        $200 Restaurant
                      </span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-text/30 uppercase tracking-widest">vs</span>
                  <span className="flex-1 h-px bg-white/10" />
                </div>

                <div>
                  <p className="text-sm text-text/50 uppercase tracking-widest mb-3 text-center">
                    $500 Tier
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a
                      href="https://500-dollar-restaurant.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-6 py-3 border border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] hover:bg-[hsl(var(--accent-gold))]/5 transition-all duration-300"
                    >
                      <span className="text-sm font-semibold uppercase tracking-wider">
                        $500 Restaurant
                      </span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href="https://500-dollar-ecommerce-app.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/30 transition-all duration-300"
                    >
                      <span className="text-sm font-semibold uppercase tracking-wider text-text/70">
                        $500 Ecommerce
                      </span>
                      <ExternalLink className="h-4 w-4 text-text/70" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* What Changed */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              What <span className="italic text-text/50">Changed</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">
              Moving from $100 up to $200 or $500 isn&apos;t just about picking better colors. It&apos;s about a fundamental shift in how the site actually works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whatChanged.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 border-l-2 border-l-[hsl(var(--accent-gold))]/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-display">{item.title}</h3>
                </div>
                <p className="text-sm text-text/60">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 p-6 bg-[hsl(var(--accent-gold))]/5 border border-[hsl(var(--accent-gold))]/20 rounded-lg"
          >
            <p className="text-text/70 text-center">
              <strong className="text-[hsl(var(--accent-gold))]">
                Why does it cost more?
              </strong>{" "}
              A $100 site is essentially a template with your content dropped in.
              A $200+ site has actual logic - code that runs on a server,
              processes orders, manages data. You&apos;re not just paying for how
              it looks. You&apos;re paying for what it does.
            </p>
          </motion.div>
        </motion.section>

        {/* $200 vs $500 Comparison */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              $200 vs $500 -{" "}
              <span className="italic text-text/50">The Honest Difference</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">
              Both are real websites. Both work. But they serve different stages
              of business.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-800/10 text-green-500">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-display">$200 - Functional</h3>
                  <p className="text-xs text-text/50">Gets the job done right</p>
                </div>
              </div>
              <ul className="space-y-3">
                {twoHundredGets.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-text/60"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-text/50 mt-6 pt-6 border-t border-white/10">
                Think of $200 as the first website that actually works for your
                business instead of just existing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-[hsl(var(--accent-gold))]/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))]">
                  <Crown className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-display">$500 - Competitive</h3>
                  <p className="text-xs text-text/50">
                    Matches established businesses
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {fiveHundredGets.map((item, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-3 text-sm text-text/60 ${idx === 0 ? "font-semibold text-[hsl(var(--accent-gold))]/80" : ""}`}
                  >
                    {idx === 0 ? (
                      <Zap className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-text/50 mt-6 pt-6 border-t border-white/10">
                $500 is where your website stops being &quot;good enough&quot;
                and starts being a competitive advantage.
              </p>
            </motion.div>
          </div>

          {/* Comparison Table */}
          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-4 border-b border-white/10 bg-white/5">
              <div className="font-display text-text/80">Feature</div>
              <div className="font-display text-green-500 text-center">
                $200
              </div>
              <div className="font-display text-[hsl(var(--accent-gold))] text-center">
                $500
              </div>
            </div>
            {comparison.map((row, idx) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 gap-4 p-4 ${idx % 2 === 0 ? "bg-white/[0.02]" : ""}`}
              >
                <div className="text-text/70">{row.feature}</div>
                <div className="text-green-500/80 text-center text-sm">
                  {row.two}
                </div>
                <div className="text-[hsl(var(--accent-gold))]/80 text-center text-sm">
                  {row.five}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* The Verdict */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              The <span className="italic text-text/50">Verdict</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">
              Look, both of these tiers are solid. But you have to be honest with yourself about where your business is right now.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Target className="h-5 w-5 text-green-500" />
                <h3 className="text-xl font-display">Stop at $200 If</h3>
              </div>
              <ul className="space-y-4">
                {stopAtTwoHundred.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-text/60"
                  >
                    <ArrowRight className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-text/50">
                  $200 is the sweet spot for small businesses that need to look
                  professional and accept orders online. No shame in it - it&apos;s
                  a real website that does real work.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-[hsl(var(--accent-gold))]/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                <h3 className="text-xl font-display">Stretch to $500 If</h3>
              </div>
              <ul className="space-y-4">
                {stretchToFiveHundred.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-text/60"
                  >
                    <ArrowRight className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-text/50">
                  $500 is for businesses that are past the &quot;just getting
                  started&quot; phase and need their website to compete, not just
                  exist.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* What Comes Next */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              What Comes <span className="italic text-text/50">Next</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                <h3 className="text-xl font-display">$1,000+ Tier</h3>
              </div>
              <p className="text-sm text-text/60 leading-relaxed mb-6">
                When $500 isn&apos;t enough. Custom features, advanced
                integrations, multi-language support, and enterprise-level
                performance. For businesses that need their website to be a
                platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://1000-dollar-restaurant.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--accent-gold))] hover:underline text-sm"
                >
                  $1,000 Restaurant Demo →
                </a>
                <a
                  href="https://1000-dollar-ecommerce-app.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--accent-gold))] hover:underline text-sm"
                >
                  $1,000 Ecommerce Demo →
                </a>
              </div>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                <h3 className="text-xl font-display">Full Case Studies</h3>
              </div>
              <p className="text-sm text-text/60 leading-relaxed mb-6">
                See every tier from $20 to $10,000 side by side. Speed tests,
                feature breakdowns, and honest recommendations for every budget.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/case-studies/restaurant-websites-tiers"
                  className="text-[hsl(var(--accent-gold))] hover:underline text-sm"
                >
                  Restaurant Case Study →
                </Link>
                <Link
                  href="/case-studies/ecommerce-websites-tiers"
                  className="text-[hsl(var(--accent-gold))] hover:underline text-sm"
                >
                  Ecommerce Case Study →
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Bottom Line */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20 text-center">
            <h2 className="text-3xl font-display mb-6">The Bottom Line</h2>
            <p className="text-lg text-text/60 mb-8 max-w-2xl mx-auto">
              The $200-$500 range is where websites stop being expenses and start
              paying for themselves. The question isn&apos;t whether you can
              afford it - it&apos;s whether you can afford not to.
            </p>
            <div className="p-6 bg-white/5 rounded-lg inline-block">
              <p className="text-xl text-text/80">
                <span className="text-green-500">
                  $200 gets you functional.
                </span>
                <br />
                <span className="text-[hsl(var(--accent-gold))]">
                  $500 gets you competitive.
                </span>
              </p>
            </div>
            <p className="text-text/60 mt-6">
              Both are investments. Pick the one that matches where your business
              is today.
            </p>
          </div>
        </motion.section>

        {/* Related Posts */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Wondering About{" "}
              <span className="italic text-text/50">Cheaper Options?</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">
              If you&apos;re not sure you need $200+, start here to understand
              what the lower budgets actually deliver.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Link
              href="/blog/why-not-to-buy-cheap-websites"
              className="glass-card p-8 group hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="h-5 w-5 text-red-400" />
                <h3 className="text-xl font-display group-hover:text-[hsl(var(--accent-gold))] transition-colors">
                  Why a $20 Website Will Cost You Thousands
                </h3>
              </div>
              <p className="text-sm text-text/60 leading-relaxed">
                A $20 website doesn&apos;t just look cheap - it actively repels
                customers. See exactly what that money buys with live demos.
              </p>
              <span className="inline-flex items-center gap-2 mt-4 text-sm text-[hsl(var(--accent-gold))]">
                Read Post <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/blog/what-100-dollar-website-gets-you"
              className="glass-card p-8 group hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-5 w-5 text-orange-400" />
                <h3 className="text-xl font-display group-hover:text-[hsl(var(--accent-gold))] transition-colors">
                  What a $100 Website Actually Gets You
                </h3>
              </div>
              <p className="text-sm text-text/60 leading-relaxed">
                A $100 website works. It&apos;s not broken. It just doesn&apos;t
                do much. The honest breakdown of what that budget delivers.
              </p>
              <span className="inline-flex items-center gap-2 mt-4 text-sm text-[hsl(var(--accent-gold))]">
                Read Post <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center py-20"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Ready to{" "}
              <span className="italic text-text/50">Invest?</span>
            </h2>
            <p className="text-lg text-text/60 mb-10 leading-relaxed">
              You&apos;ve seen what each budget delivers. You know which one fits.
              Let&apos;s build something that actually works for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-premium">
                <span>Start Here</span>
              </Link>
              <Link
                href="/blog"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 border-b border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] transition-all duration-500"
              >
                <span className="uppercase tracking-[0.2em] text-xs font-semibold text-text/70 group-hover:text-text">
                  Back to Blog
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
