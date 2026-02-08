"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Demo } from "@prisma/client";

interface DemoListProps {
  demos: Demo[];
}

export default function DemoList({ demos }: DemoListProps) {
  const [filter, setFilter] = useState("All");

  const allTags = Array.from(
    new Set(demos.map((d) => d.tags?.[0]).filter(Boolean)),
  );

  const filteredDemos =
    filter === "All" ? demos : demos.filter((d) => d.tags?.includes(filter));

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase block mb-4"
          >
            Live Demos
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-display leading-none">
            Interactive <span className="italic text-text/50">Demos</span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-2 max-w-xl justify-end">
          <button
            onClick={() => setFilter("All")}
            className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-300 ${
              filter === "All"
                ? "border-[hsl(var(--accent-gold))] bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))]"
                : "border-text/10 text-text/50 hover:border-text/30"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-300 ${
                filter === tag
                  ? "border-[hsl(var(--accent-gold))] bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))]"
                  : "border-text/10 text-text/50 hover:border-text/30"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredDemos.map((demo, index) => (
            <DemoCard key={demo.id} demo={demo} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

function DemoCard({ demo, index }: { demo: Demo; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-secondary/5 border border-white/5 overflow-hidden hover:border-[hsl(var(--accent-gold))]/30 transition-colors duration-500"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        {demo.demo ? (
          <a
            href={demo.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <Image
              src={demo.image}
              alt={demo.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="px-6 py-3 border border-white/30 text-white uppercase tracking-widest text-xs backdrop-blur-md hover:bg-white hover:text-black transition-all">
                View Live Demo
              </span>
            </div>
          </a>
        ) : (
          <Image
            src={demo.image}
            alt={demo.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-3xl font-display">{demo.title}</h3>
          {demo.demo && (
            <a href={demo.demo} target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ rotate: 45 }}
                className="p-2 border border-text/10 rounded-full text-text/50 group-hover:text-[hsl(var(--accent-gold))] group-hover:border-[hsl(var(--accent-gold))] transition-colors cursor-pointer"
              >
                <ArrowUpRight className="w-5 h-5" />
              </motion.div>
            </a>
          )}
        </div>
        <p className="text-text/60 line-clamp-2 mb-6">{demo.description}</p>
        <div className="flex flex-wrap gap-2">
          {demo.tags?.slice(0, 1).map((tag: string) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-widest text-text/40 border border-text/10 px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
