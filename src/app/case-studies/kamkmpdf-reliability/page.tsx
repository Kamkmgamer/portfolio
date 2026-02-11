"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileCode,
  Layout,
  GitBranch,
  Zap,
  Shield,
  CheckCircle,
  Layers,
  ArrowRight,
} from "lucide-react";

const reasons = [
  {
    icon: FileCode,
    title: "Structured by Design",
    description:
      "HTML is semantic and structured with headings, sections, lists, tables, and metadata. This makes documents machine-readable, accessible, predictable, and easy to transform.",
  },
  {
    icon: Layout,
    title: "Separation of Content and Design",
    description:
      "Content lives in structured markup while design lives in stylesheets. This allows global style updates, brand consistency, and easy redesign without rewriting content.",
  },
  {
    icon: GitBranch,
    title: "Version Control & Reproducibility",
    description:
      "HTML files can be stored in Git, tracked per revision, and rebuilt deterministically. Given the same HTML and rendering engine, you get the same PDF.",
  },
  {
    icon: Zap,
    title: "Automation & Scalability",
    description:
      "HTML-based documents can be templated, data-driven, and generated programmatically. Generate 1 PDF or 10,000 personalized PDFs using the same template system.",
  },
  {
    icon: Shield,
    title: "Long-Term Stability",
    description:
      "HTML is open, standardized, widely supported, and future-proof. Unlike proprietary design formats, HTML will remain readable and convertible across tools and platforms.",
  },
];

const kamkmFeatures = [
  {
    title: "Natural Language to HTML",
    description:
      "Users describe what they need in plain English, and it converts into structured, semantic HTML.",
  },
  {
    title: "Dual Output System",
    description:
      "Users receive both the final PDF and the source HTML for transparency, customization, and future editing.",
  },
  {
    title: "Deterministic Layout",
    description:
      "Structured HTML before rendering ensures predictable pagination, consistent fonts, and controlled spacing.",
  },
];

const benefits = [
  "Faster document creation",
  "Fewer layout errors",
  "Consistent branding",
  "Reduced manual formatting",
  "Scalable document generation",
  "Clear separation between content and presentation",
];

export default function KamkmPDFReliabilityCaseStudyPage() {
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
            <span className="h-1px w-12 bg-[hsl(var(--accent-gold))]" />
            <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">
              Document Architecture
            </span>
            <span className="h-1px w-12 bg-[hsl(var(--accent-gold))]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-display mb-8">
            HTML: The Most Reliable{" "}
            <span className="italic text-text/50">Source of Truth</span>
          </h1>

          <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-12">
            Why HTML-based document authoring is the most reliable, scalable, and
            future-proof method for generating PDFs, and how KamkmPDF connects
            natural language to structured documents.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge label="Structured" />
            <Badge label="Reproducible" />
            <Badge label="Future-Proof" />
          </div>
        </motion.header>

        {/* Executive Summary */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display mb-6">Executive Summary</h2>
              <p className="text-lg text-text/60 leading-relaxed mb-8">
                When organizations need professional PDFs (invoices, proposals,
                reports, ebooks, legal documents), they usually start in tools
                that were never designed for reproducibility or automation.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-[hsl(var(--accent-gold))] font-display text-2xl mb-2">
                    Layout breaks
                  </div>
                  <p className="text-sm text-text/60">
                    Manual exports from design tools
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-[hsl(var(--accent-gold))] font-display text-2xl mb-2">
                    Font issues
                  </div>
                  <p className="text-sm text-text/60">
                    Inconsistent rendering across systems
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-[hsl(var(--accent-gold))] font-display text-2xl mb-2">
                    No source of truth
                  </div>
                  <p className="text-sm text-text/60">
                    PDF is final, not a working format
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Core Problem */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              The Core <span className="italic text-text/50">Problem</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">
              Traditional document workflows treat PDFs as the primary working
              file. This creates a fundamental architectural issue. PDF is a
              final format, not a flexible authoring format.
            </p>
          </div>

          <div className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-display mb-6 flex items-center gap-3">
                  <Layers className="h-5 w-5 text-[hsl(var(--accent-bronze))]" />
                  Traditional Workflow
                </h3>
                <ul className="space-y-4">
                  {[
                    "Designers export from layout tools",
                    'Teams edit Word files and "Save as PDF"',
                    "Developers manually generate PDFs with brittle templates",
                    "Inconsistent formatting across exports",
                    "No clear source of truth",
                    "Limited automation and versioning problems",
                  ].map((item, index) => (
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
              <div>
                <h3 className="text-lg font-display mb-6 flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                  HTML-First Workflow
                </h3>
                <ul className="space-y-4">
                  {[
                    "Structured markup as source of truth",
                    "CSS controls presentation separately",
                    "Programmatic generation with templates",
                    "Deterministic, reproducible output",
                    "Version controlled and auditable",
                    "Scalable to thousands of documents",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-text/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-gold))] mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Why HTML Is Reliable */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Why HTML Is the Most Reliable{" "}
              <span className="italic text-text/50">Source</span>
            </h2>
            <p className="text-lg text-text/60">
              Five fundamental advantages of HTML-based document architecture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] mb-6">
                  <reason.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-display mb-4">{reason.title}</h3>
                <p className="text-sm text-text/60 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* KamkmPDF Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-1px w-12 bg-[hsl(var(--accent-gold))]" />
              <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">
                The Missing Layer
              </span>
              <span className="h-1px w-12 bg-[hsl(var(--accent-gold))]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Introducing <span className="italic text-text/50">KamkmPDF</span>
            </h2>
            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto">
              KamkmPDF builds on the reliability of HTML-based document systems
              and removes the friction of manual markup creation.
            </p>
          </div>

          <div className="glass-card p-8 md:p-12 mb-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] mb-6">
                <span className="text-2xl font-display">1</span>
              </div>
              <h3 className="text-2xl font-display mb-4">What KamkmPDF Does</h3>
              <p className="text-text/60 max-w-2xl mx-auto">
                Converts natural language instructions into structured
                HTML documents, applies intelligent formatting, and generates
                professional, print-ready PDFs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {kamkmFeatures.map((feature, index) => (
                <div key={feature.title} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] flex items-center justify-center mx-auto mb-4 font-display text-lg">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-display mb-3">{feature.title}</h4>
                  <p className="text-sm text-text/60">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dual Output */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-l-2 border-l-[hsl(var(--accent-gold))]"
            >
              <h3 className="text-xl font-display mb-4 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                Immediate Result
              </h3>
              <p className="text-text/60 mb-4">
                A professional, print-ready PDF generated from your natural
                language description.
              </p>
              <div className="font-mono text-xs text-text/40 bg-white/5 p-3 rounded">
                document.pdf
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-l-2 border-l-[hsl(var(--accent-gold))]"
            >
              <h3 className="text-xl font-display mb-4 flex items-center gap-3">
                <FileCode className="h-5 w-5 text-[hsl(var(--accent-gold))]" />
                Long-Term Control
              </h3>
              <p className="text-text/60 mb-4">
                The underlying HTML source code for transparency, customization,
                and future editing.
              </p>
              <div className="font-mono text-xs text-text/40 bg-white/5 p-3 rounded">
                document.html
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Example Use Case */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="glass-card p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-display mb-6">
                  Natural Language Input
                </h3>
                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <p className="text-text/80 italic leading-relaxed">
                    &ldquo;Create a professional invoice for John Doe with 3
                    services, 20% tax, total at the bottom, clean minimal
                    design.&rdquo;
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-display mb-6">
                  What KamkmPDF Delivers
                </h3>
                <ul className="space-y-4">
                  {[
                    "Properly structured HTML content",
                    "Layout best practices applied",
                    "Professional PDF generated",
                    "Editable source HTML returned",
                    "No manual formatting required",
                    "No layout debugging needed",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-sm text-text/60"
                    >
                      <ArrowRight className="h-4 w-4 text-[hsl(var(--accent-gold))]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Real-World Impact */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">
              Real-World <span className="italic text-text/50">Impact</span>
            </h2>
            <p className="text-lg text-text/60">
              Organizations using HTML-first document architecture experience:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 glass-card"
              >
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] flex items-center justify-center shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-text/80">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Key Insight */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="glass-card p-8 md:p-12 border border-[hsl(var(--accent-gold))]/20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display mb-8">Key Insight</h2>
              <div className="text-2xl md:text-3xl font-display leading-relaxed mb-8">
                <span className="text-text/50">PDF should be the output.</span>
                <br />
                <span className="text-[hsl(var(--accent-gold))]">
                  HTML should be the source of truth.
                </span>
              </div>
              <p className="text-text/60 leading-relaxed">
                KamkmPDF connects natural language intent to
                structured, reproducible document architecture, delivering both
                immediate results and long-term reliability.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Conclusion */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-3xl font-display mb-8 text-center">
              Conclusion
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-display mb-4 text-[hsl(var(--accent-gold))]">
                  The Most Reliable Way
                </h3>
                <ol className="space-y-3 text-sm text-text/60">
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[hsl(var(--accent-gold))]">
                      1.
                    </span>
                    Author in structured HTML
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[hsl(var(--accent-gold))]">
                      2.
                    </span>
                    Style with controlled CSS
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[hsl(var(--accent-gold))]">
                      3.
                    </span>
                    Render to PDF with a consistent engine
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-display mb-4 text-[hsl(var(--accent-gold))]">
                  How KamkmPDF Enhances This
                </h3>
                <ul className="space-y-3 text-sm text-text/60">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" />
                    Generates structured HTML from natural language
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" />
                    Produces production-ready PDFs
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-[hsl(var(--accent-gold))] mt-0.5 shrink-0" />
                    Returns the HTML source for transparency and control
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-lg text-text/80 font-display">
                This is not just PDF generation. It is a scalable document
                infrastructure built on open standards.
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
              Ready to Build Your{" "}
              <span className="italic text-text/50">Document System?</span>
            </h2>
            <p className="text-lg text-text/60 mb-10 leading-relaxed">
              This case study demonstrates the power of HTML-first document
              architecture. Let&apos;s discuss how structured document workflows
              can transform your organization.
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
