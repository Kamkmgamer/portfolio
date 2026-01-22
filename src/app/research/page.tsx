"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { researchPapers, type ResearchPaper } from "@/data/research";
import { ArrowRight, BookOpen, Calendar, MapPin } from "lucide-react";

export default function ResearchPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[hsl(var(--accent-gold))]/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[hsl(var(--accent-bronze))]/5 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto">
        <header className="mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase block mb-6">
              Academic & Industry
            </span>
            <h1 className="text-6xl md:text-8xl font-display leading-1 mb-8 overflow-visible">
              Research <br />
              <span className="italic text-text/50">& Publications</span>
            </h1>
            <p className="max-w-2xl text-lg text-text/60 leading-relaxed">
              Exploring the frontiers of web engineering, user experience, and
              digital architecture. Documenting the journey from theory to
              practical application.
            </p>
          </motion.div>

          <motion.div
            style={{ y }}
            className="absolute -top-20 right-0 hidden lg:block opacity-10 pointer-events-none"
          >
            <BookOpen className="w-96 h-96 text-text" />
          </motion.div>
        </header>

        <div className="grid grid-cols-1 gap-12">
          {researchPapers.map((paper, index) => (
            <ResearchCard key={paper.id} paper={paper} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ResearchCard({
  paper,
  index,
}: {
  paper: ResearchPaper;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-12 border-t border-text/10 hover:border-[hsl(var(--accent-gold))]/30 transition-all duration-500"
    >
      <div className="lg:col-span-4 relative aspect-4/3 lg:aspect-auto lg:h-full overflow-hidden rounded-lg bg-secondary/5">
        <Image
          src={paper.image || "/file.svg"}
          alt={paper.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="lg:col-span-8 flex flex-col justify-center">
        <div className="flex flex-wrap gap-4 mb-6 text-xs uppercase tracking-widest text-text/50">
          {paper.venue && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[hsl(var(--accent-gold))]" />
              <span>{paper.venue}</span>
            </div>
          )}
          {paper.year && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[hsl(var(--accent-gold))]" />
              <span>{paper.year}</span>
            </div>
          )}
        </div>

        <h2 className="text-3xl md:text-4xl font-display mb-6 group-hover:text-[hsl(var(--accent-gold))] transition-colors duration-300">
          <Link href={`/research/${paper.slug || "#"}`}>{paper.title}</Link>
        </h2>

        <p className="text-text/70 mb-8 leading-relaxed line-clamp-3">
          {paper.abstract}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-2">
            {paper.tags?.map((tag: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 text-[10px] uppercase tracking-widest border border-text/10 text-text/60 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={`/research/${paper.slug || "#"}`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[hsl(var(--accent-gold))] group/link"
          >
            <span>Read Paper</span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
