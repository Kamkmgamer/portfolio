"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from "lucide-react";
import { blogPosts } from "@/lib/blogs";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function BlogGrid() {
  return (
    <section>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {blogPosts.map((post) => {
          const formattedDate = post.publishedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return (
            <motion.article key={post.slug} variants={item}>
              <div className="group relative h-full flex flex-col justify-between p-8 border border-white/5 bg-white/5 backdrop-blur-sm hover:border-[hsl(var(--accent-gold))]/30 hover:bg-[hsl(var(--accent-gold))]/5 transition-all duration-500">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[hsl(var(--accent-gold))] text-xs font-bold uppercase tracking-widest border border-[hsl(var(--accent-gold))]/20 px-3 py-1 bg-[hsl(var(--accent-gold))]/5">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display mb-4 group-hover:text-[hsl(var(--accent-gold))] transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-text/70 text-sm mb-4 leading-relaxed">
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-text/50 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 text-xs text-text/50 mb-8">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime} min read
                    </span>
                  </div>

                  <div className="text-xs text-text/40 mb-4">{formattedDate}</div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[hsl(var(--accent-gold))] group/link"
                  >
                    Read article
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
