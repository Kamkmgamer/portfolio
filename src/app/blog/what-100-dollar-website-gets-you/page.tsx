"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  ExternalLink,
  ArrowRight,
  Clock,
  Smartphone,
  MessageCircle,
  TrendingUp,
  AlertCircle,
  Zap,
} from "lucide-react";

const whatWorks = [
  { text: "Products or menu items display correctly" },
  { text: "Basic navigation functions" },
  { text: "Phone number and address are visible" },
  { text: "Looks professional enough at first glance" },
  { text: "Works on desktop, mostly works on mobile" },
];

const whereItBreaks = [
  {
    icon: MessageCircle,
    title: "No Automation",
    description:
      "Orders through WhatsApp. Manual inventory in spreadsheets. Every customer requires your direct involvement.",
  },
  {
    icon: TrendingUp,
    title: "No Scaling",
    description:
      "One viral post and you're drowning in messages. Twenty orders means twenty separate conversations.",
  },
  {
    icon: AlertCircle,
    title: "The Template Problem",
    description:
      "Same colors, same layout as dozens of other sites. Customers won't remember your site an hour later.",
  },
  {
    icon: Clock,
    title: "Performance Issues",
    description:
      "5-8-second page loads. 4-second images. On mobile data, it's worse. Most visitors won't wait.",
  },
];

const itWorksIf = [
  "You're testing a business idea before committing",
  "You sell low volume and don't mind manual work",
  "You need something today and have zero budget",
  "You genuinely prefer the WhatsApp ordering model",
];

const itDoesntWorkIf = [
  "You're trying to look established",
  "You want customers to find you through Google",
  "You're competing with businesses that have real websites",
  "You expect the website to actually do anything",
];

const upgradeSignals = [
  "You're spending more than 2 hours a week managing WhatsApp orders",
  "Customers complain about slow loading",
  "You're losing track of orders",
  "You're spending hours manually following up",
  "You're embarrassed to share your website link",
];

export default function What100DollarWebsiteGetsYouPage() {
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
              Managing Expectations
            </span>
            <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-display mb-8">
            What a $100 Website <br />
            <span className="italic text-text/50">Actually Gets You</span>
          </h1>

          <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-12">
            You know a $20 site won't work. But $100? That feels reasonable.
            Here's what that money actually delivers - nothing more, nothing
            less.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge label="Fair Assessment" />
            <Badge label="Honest Limits" />
            <Badge label="Clear Signals" />
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
                Try It Yourself
              </h2>
              <p className="text-lg text-text/60 leading-relaxed mb-8 text-center">
                I built both so you can see exactly what you're getting. Open
                them on your phone. Browse the menu or products. Try the
                checkout.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://100-dollar-restaurant.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 border border-[hsl(var(--accent-gold))]/30 hover:border-[hsl(var(--accent-gold))] hover:bg-[hsl(var(--accent-gold))]/5 transition-all duration-300"
                >
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    $100 Restaurant
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="https://100-dollar-ecommerce-app.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <span className="text-sm font-semibold uppercase tracking-wider text-text/70">
                    $100 Ecommerce
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
              What You <span className="italic text-text/50">Actually Get</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">
              Here's the fair assessment: a $100 website works. It's not broken.
              It just doesn't do much.
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
              <h3 className="text-xl font-display mb-6 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                What Works
              </h3>
              <ul className="space-y-4">
                {whatWorks.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-text/60"
                  >
                    <ArrowRight className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                    {item.text}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-text/50 mt-6 pt-6 border-t border-white/10">
                For a side hustle or business just starting out, this isn't
                terrible. You have something to show people.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-[hsl(var(--accent-gold))]/20"
            >
              <h3 className="text-xl font-display mb-6 flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                The WhatsApp Model Is Real
              </h3>
              <p className="text-sm text-text/60 leading-relaxed mb-4">
                Many small businesses operate this way. Browse the catalog,
                message on WhatsApp, negotiate price and payment. It's
                legitimate for low-volume sales.
              </p>
              <p className="text-sm text-text/60 leading-relaxed">
                But here's the thing - that model works because it's{" "}
                <em>intentional</em>. A $100 website forces you into it whether
                you want it or not.
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
              Where It <span className="italic text-text/50">Breaks Down</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">
              A $100 site isn't broken. It's just limited. And those limits
              become problems fast.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whereItBreaks.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 border-l-2 border-l-orange-500/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <item.icon className="h-5 w-5 text-orange-400" />
                  <h3 className="text-lg font-display">{item.title}</h3>
                </div>
                <p className="text-sm text-text/60">{item.description}</p>
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
              The Honest <span className="italic text-text/50">Verdict</span>
            </h2>
          </div>

          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20 mb-8">
            <p className="text-xl text-center text-text/80 mb-8">
              A $100 website is a placeholder. It's "something online" - not an
              investment in your business.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="font-semibold text-green-400">
                    It Works If
                  </span>
                </div>
                <ul className="space-y-3">
                  {itWorksIf.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-text/60"
                    >
                      <ArrowRight className="h-4 w-4 text-green-400/50 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="h-4 w-4 text-red-400" />
                  <span className="font-semibold text-red-400">
                    It Doesn't Work If
                  </span>
                </div>
                <ul className="space-y-3">
                  {itDoesntWorkIf.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-text/60"
                    >
                      <ArrowRight className="h-4 w-4 text-red-400/50 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-lg text-center max-w-2xl mx-auto">
            <p className="text-lg text-text/80">
              <strong>Don't expect ROI from a $100 website.</strong> It won't
              bring you customers. It won't save you time. At best, it's a
              digital business card.
            </p>
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
              The Upgrade <span className="italic text-text/50">Moment</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">
              How do you know when you've outgrown a $100 site?
            </p>
          </div>

          <div className="glass-card p-8 md:p-12 border-l-4 border-l-[hsl(var(--accent-gold))]">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <p className="text-xl text-text/80">
                  When you're spending{" "}
                  <strong className="text-[hsl(var(--accent-gold))]">
                    more than 2 hours a week
                  </strong>{" "}
                  managing orders through WhatsApp.
                </p>
              </div>

              <p className="text-center text-text/60 mb-8">
                That's the signal. If customer messages are eating into your
                actual business - making products, serving customers, growing -
                then the money you "saved" is costing you time.
              </p>

              <div className="border-t border-white/10 pt-8">
                <p className="text-sm text-text/50 mb-4 text-center">
                  Other signals:
                </p>
                <ul className="space-y-3">
                  {upgradeSignals.slice(1).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-text/60"
                    >
                      <span className="w-5 h-5 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] flex items-center justify-center text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
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
              What Comes <span className="italic text-text/50">Next</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                <h3 className="text-xl font-display">$500 Tier</h3>
              </div>
              <p className="text-sm text-text/60 leading-relaxed mb-6">
                This is where websites start working <em>for</em> you. Fast
                loading, proper mobile experience, actual checkout. The website
                becomes an employee, not just a poster.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://500-dollar-restaurant.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--accent-gold))] hover:underline text-sm"
                >
                  $500 Restaurant Demo →
                </a>
                <a
                  href="https://500-dollar-ecommerce-app.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--accent-gold))] hover:underline text-sm"
                >
                  $500 Ecommerce Demo →
                </a>
              </div>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                <h3 className="text-xl font-display">Full Case Studies</h3>
              </div>
              <p className="text-sm text-text/60 leading-relaxed mb-6">
                I built every tier from $20 to $10,000 so you can see exactly
                what each budget delivers.
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
              A $100 website gives you exactly what you pay for: something
              online. It's not terrible. It's not great. It just <em>exists</em>
              .
            </p>
            <div className="p-6 bg-white/5 rounded-lg inline-block">
              <p className="text-xl text-text/80">
                <span className="text-orange-400">
                  A $100 website is a cost.
                </span>
                <br />
                <span className="text-[hsl(var(--accent-gold))]">
                  A $500+ website is an investment.
                </span>
              </p>
            </div>
            <p className="text-text/60 mt-6">
              Know the difference before you spend.
            </p>
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
              Ready for Something That{" "}
              <span className="italic text-text/50">Actually Works?</span>
            </h2>
            <p className="text-lg text-text/60 mb-10 leading-relaxed">
              If you've realized a $100 site won't cut it, let's talk about what
              will.
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
