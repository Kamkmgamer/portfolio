import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { Locale } from "@/i18n.config";
import React from "react";

export const metadata: Metadata = {
  title: "Why Not to Use Local Models: The Honest Truth",
  description:
    "Local models might seem like a money-saving alternative to Claude Code, but the reality is far more complicated. Here's what those videos aren't telling you.",
  keywords: [
    "AI",
    "local models",
    "Claude",
    "Ollama",
    "development tools",
    "local LLM",
    "AI coding",
  ],
  openGraph: {
    title: "Why Not to Use Local Models: The Honest Truth",
    description:
      "Local models might seem like a money-saving alternative to Claude Code, but the reality is far more complicated.",
    url: "https://www.khalil.mageed.net/blog/why-not-to-use-local-models",
    type: "article",
    authors: ["Khalil AbdalMageed"],
    section: "AI & Development",
    tags: ["AI", "local models", "Claude", "Ollama"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Not to Use Local Models: The Honest Truth",
    description:
      "Local models might seem like a money-saving alternative to Claude Code, but the reality is far more complicated.",
  },
  alternates: {
    canonical: "/blog/why-not-to-use-local-models",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Not to Use Local Models: The Honest Truth",
  description:
    "Local models might seem like a money-saving alternative to Claude Code, but the reality is far more complicated.",
  author: {
    "@type": "Person",
    name: "Khalil AbdalMageed",
    url: "https://www.khalil.mageed.net",
  },
  publisher: {
    "@type": "Person",
    name: "Khalil AbdalMageed",
    url: "https://www.khalil.mageed.net",
  },
  datePublished: "2026-03-04",
  dateModified: "2026-03-04",
};

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  
  const filePath = path.join(process.cwd(), "content", "blog", "Why not to use local models.md");
  let content = "";
  
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error("Error reading blog post:", error);
  }

  const lines = content.split("\n");
  const title = lines[0]?.replace(/^#\s*/, "") || "";
  const categoryLine = lines.find((line) => line.includes("Category:"));
  const category = categoryLine?.replace(/.*Category:\s*|\s*\|.*/g, "") || "AI & Development";
  
  const renderContent = (): React.ReactNode => {
    const elements: React.ReactNode[] = [];
    let currentParagraph = "";
    let listItems: string[] = [];
    let inList = false;
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith("## ")) {
        if (currentParagraph) {
          elements.push(
            <p key={`p-${i}`} className="mb-6 text-lg text-text/70 leading-relaxed">
              {currentParagraph}
            </p>
          );
          currentParagraph = "";
        }
        if (listItems.length > 0) {
          elements.push(
            <ul key={`ul-${i}`} className="mb-6 space-y-2 list-disc list-inside text-text/70">
              {listItems.map((item, idx) => (
                <li key={idx} className="text-lg">{item}</li>
              ))}
            </ul>
          );
          listItems = [];
          inList = false;
        }
        elements.push(
          <h2 key={`h2-${i}`} className="text-3xl font-display mb-6 mt-12">
            {line.replace(/^##\s*/, "")}
          </h2>
        );
      } else if (line.startsWith("- ")) {
        if (currentParagraph) {
          elements.push(
            <p key={`p-${i}`} className="mb-6 text-lg text-text/70 leading-relaxed">
              {currentParagraph}
            </p>
          );
          currentParagraph = "";
        }
        listItems.push(line.replace(/^-\s*/, ""));
        inList = true;
      } else if (line === "") {
        if (currentParagraph) {
          elements.push(
            <p key={`p-${i}`} className="mb-6 text-lg text-text/70 leading-relaxed">
              {currentParagraph}
            </p>
          );
          currentParagraph = "";
        }
        if (listItems.length > 0) {
          elements.push(
            <ul key={`ul-${i}`} className="mb-6 space-y-2 list-disc list-inside text-text/70">
              {listItems.map((item, idx) => (
                <li key={idx} className="text-lg">{item}</li>
              ))}
            </ul>
          );
          listItems = [];
          inList = false;
        }
      } else if (!line.includes("Category:") && !line.includes("Read Time:")) {
        currentParagraph += (currentParagraph ? " " : "") + line;
      }
    }
    
    if (currentParagraph) {
      elements.push(
        <p key="p-final" className="mb-6 text-lg text-text/70 leading-relaxed">
          {currentParagraph}
        </p>
      );
    }
    if (listItems.length > 0) {
      elements.push(
        <ul key="ul-final" className="mb-6 space-y-2 list-disc list-inside text-text/70">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-lg">{item}</li>
          ))}
        </ul>
      );
    }
    
    return elements;
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[hsl(var(--accent-gold))]/5 via-background to-background" />
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
              <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase">
                {category}
              </span>
              <span className="h-px w-12 bg-[hsl(var(--accent-gold))]" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">
              {title}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-text/80">
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent-gold))]" />
                6 min read
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-text/80">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                March 4, 2026
              </span>
            </div>
          </header>
          
          <div className="glass-card p-8 md:p-12">
            {renderContent()}
          </div>
        </article>
      </main>
    </>
  );
}
