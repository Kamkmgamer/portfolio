"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogGrid from "./BlogGrid";
import { Locale, Dictionary, getDictionarySync } from "@/lib/i18n";

export default function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const [locale, setLocale] = useState<Locale>("en");
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    params.then((p) => {
      setLocale(p.locale);
      setDict(getDictionarySync(p.locale));
    });
  }, [params]);

  if (!dict) return null;

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[hsl(var(--accent-gold))]/5 via-background to-background" />

      <div className="max-w-7xl mx-auto">
        <header className="mb-24 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
              <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">
                {dict.blog.title}
              </span>
              <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
            </div>

            <h1 className="text-5xl md:text-7xl font-display mb-8">
              {dict.blog.heading} <br />
              <span className="italic text-text/50">{dict.blog.headingItalic}</span>
            </h1>

            <p className="text-lg text-text/60 leading-relaxed max-w-2xl mx-auto mb-12">
              {dict.blog.description}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge color="bg-green-500" label={dict.blog.badge1} />
              <Badge color="bg-amber-500" label={dict.blog.badge2} />
              <Badge color="bg-blue-500" label={dict.blog.badge3} />
            </div>
          </motion.div>
        </header>

        <BlogGrid locale={locale} dict={dict} />
      </div>
    </main>
  );
}

function Badge({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-text/80">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      {label}
    </span>
  );
}
