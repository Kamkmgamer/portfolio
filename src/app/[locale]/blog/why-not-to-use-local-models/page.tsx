import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { Locale } from "@/i18n.config";
import React from "react";
import { CopyButton } from "./CopyButton";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const translations = {
    en: {
      title: "Why Not to Use Local Models: The Honest Truth",
      description:
        "Local models might seem like a money-saving alternative to Claude Code, but the reality is far more complicated. Here's what those videos aren't telling you.",
    },
    ar: {
      title:
        "ليه ما المفروض تستخدم الموديلات المحلية للذكاء الاصطناعي: الحقيقة المرة",
      description:
        "قد تبدو الموديلات المحلية بديلاً موفراً للمال لـ Claude Code، لكن الواقع أكثر تعقيداً بكثير. إليك ما لا تخبرك به تلك المقاطع.",
    },
  };

  const t = translations[locale] || translations.en;

  return {
    title: t.title,
    description: t.description,
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
      title: t.title,
      description: t.description,
      url: `https://www.khalil.mageed.net/${locale}/blog/why-not-to-use-local-models`,
      type: "article",
      authors: ["Khalil AbdalMageed"],
      section: "AI & Development",
      tags: ["AI", "local models", "Claude", "Ollama"],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
    alternates: { canonical: "/blog/why-not-to-use-local-models" },
  };
}

// ---------------------------------------------------------------------------
// Model link map — ordered longest-match first to avoid partial replacements
// ---------------------------------------------------------------------------

const MODEL_LINKS: { pattern: RegExp; url: string; marker?: "†" | "‡" }[] = [
  // Anthropic models (footnote marker)
  {
    pattern: /\bClaude\s+Opus\b/g,
    url: "https://www.anthropic.com/claude/opus",
    marker: "†",
  },
  {
    pattern: /\bClaude\s+Sonnet\b/g,
    url: "https://www.anthropic.com/claude/sonnet",
    marker: "†",
  },
  {
    pattern: /\bOpus\b/g,
    url: "https://www.anthropic.com/claude/opus",
    marker: "†",
  },
  {
    pattern: /\bSonnet\b/g,
    url: "https://www.anthropic.com/claude/sonnet",
    marker: "†",
  },
  // Pricing plans (longest match first)
  { pattern: /\$20\s+Pro\s+plan\b/g, url: "https://claude.ai/upgrade" },
  { pattern: /\bPro\s+plan\b/g, url: "https://claude.ai/upgrade" },
  { pattern: /\bOpenCode\s+Zen\s+plan\b/g, url: "https://opencode.ai" },
  { pattern: /\bOpenCode\b/g, url: "https://opencode.ai" },
  { pattern: /\$10\s+plan\b/g, url: "https://open.bigmodel.cn/en/pricing" },
  // MiniMax
  { pattern: /\bMiniMax\s+M[-\s]?2\.5\b/g, url: "https://www.minimaxi.com/en" },
  { pattern: /\bMiniMax\s+M2\.5\b/g, url: "https://www.minimaxi.com/en" },
  { pattern: /\bMiniMax\b/g, url: "https://www.minimaxi.com/en" },
  // GLM
  {
    pattern: /\bGLM[\s-]?5\b/g,
    url: "https://open.bigmodel.cn/en/dev/howuse/introduction",
  },
  {
    pattern: /\bGLM\s+5\b/g,
    url: "https://open.bigmodel.cn/en/dev/howuse/introduction",
  },
  { pattern: /\bGLM\b/g, url: "https://open.bigmodel.cn/en" },
  // Kimi
  { pattern: /\bKimi\s+K2\.5\b/g, url: "https://kimi.ai" },
  { pattern: /\bKimi\b/g, url: "https://kimi.ai" },
  // Qwen
  { pattern: /\bQwen[\d.]+\s*\w*\b/g, url: "https://qwen.ai" },
  { pattern: /\bQwen\b/g, url: "https://qwen.ai" },
  // Ollama
  { pattern: /\bOllama\b/g, url: "https://ollama.com" },
];

// Arabic model name map
const MODEL_LINKS_AR: { pattern: RegExp; url: string; marker?: "†" | "‡" }[] = [
  {
    pattern: /Claude\s+Opus/g,
    url: "https://www.anthropic.com/claude/opus",
    marker: "†",
  },
  {
    pattern: /Claude\s+Sonnet/g,
    url: "https://www.anthropic.com/claude/sonnet",
    marker: "†",
  },
  {
    pattern: /\bOpus\b/g,
    url: "https://www.anthropic.com/claude/opus",
    marker: "†",
  },
  {
    pattern: /\bSonnet\b/g,
    url: "https://www.anthropic.com/claude/sonnet",
    marker: "†",
  },
  // Pricing plans
  { pattern: /خطة\s+Pro\s+بـ\s+20\s+دولار/g, url: "https://claude.ai/upgrade" },
  { pattern: /خطة\s+Pro\b/g, url: "https://claude.ai/upgrade" },
  { pattern: /خطة\s+OpenCode\s+Zen\b/g, url: "https://opencode.ai" },
  { pattern: /\bOpenCode\b/g, url: "https://opencode.ai" },
  {
    pattern: /خطة(?:هم)?\s+(?:البتكلف\s+)?10\s+دولار/g,
    url: "https://open.bigmodel.cn/en/pricing",
  },
  // MiniMax
  { pattern: /MiniMax\s+M[-\s]?2\.5/g, url: "https://www.minimaxi.com/en" },
  { pattern: /MiniMax\s+M2\.5/g, url: "https://www.minimaxi.com/en" },
  { pattern: /MiniMax/g, url: "https://www.minimaxi.com/en" },
  // GLM
  {
    pattern: /GLM[\s-]?5/g,
    url: "https://open.bigmodel.cn/en/dev/howuse/introduction",
  },
  {
    pattern: /GLM\s+5/g,
    url: "https://open.bigmodel.cn/en/dev/howuse/introduction",
  },
  { pattern: /\bGLM\b/g, url: "https://open.bigmodel.cn/en" },
  // Kimi
  { pattern: /Kimi\s+K2\.5/g, url: "https://kimi.ai" },
  { pattern: /\bKimi\b/g, url: "https://kimi.ai" },
  // Qwen
  { pattern: /Qwen[\d.]+\s*\w*/g, url: "https://qwen.ai" },
  // Ollama
  { pattern: /\bOllama\b/g, url: "https://ollama.com" },
];

const LINK_CLASS =
  "text-[hsl(var(--accent-gold))] underline underline-offset-2 decoration-[hsl(var(--accent-gold))]/40 hover:decoration-[hsl(var(--accent-gold))] transition-all duration-150 font-medium";

// ---------------------------------------------------------------------------
// parseInline — splits a raw string into React nodes, replacing:
//   - model names → <a> links (optionally with † marker)
//   - tokens → tokens*
// ---------------------------------------------------------------------------
function parseInline(
  text: string,
  locale: string,
  tokenState: { inserted: boolean },
): React.ReactNode[] {
  const links = locale === "ar" ? MODEL_LINKS_AR : MODEL_LINKS;

  // Build a combined regex that matches all patterns at once
  const combined = new RegExp(
    links.map((m) => m.pattern.source).join("|"),
    "g",
  );

  // Token pattern
  const tokenPattern =
    locale === "ar" ? /الـ tokens(?!\*)/g : /\btokens\b(?!\*)/g;

  // First pass: apply token asterisk to raw text (simple string replace)
  let processedText = text;
  if (!tokenState.inserted) {
    const replaced = processedText.replace(
      tokenPattern,
      (match) => match + "*",
    );
    if (replaced !== processedText) {
      tokenState.inserted = true;
      processedText = replaced;
    }
  }

  // Second pass: split on model names and build nodes
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  combined.lastIndex = 0;

  while ((match = combined.exec(processedText)) !== null) {
    const matchedText = match[0];
    const start = match.index;

    // Push plain text before this match
    if (start > lastIndex) {
      nodes.push(processedText.slice(lastIndex, start));
    }

    // Find which rule matched
    const rule = links.find((l) =>
      new RegExp(`^(?:${l.pattern.source})$`).test(matchedText),
    );
    const url = rule?.url ?? "#";
    const marker = rule?.marker;

    nodes.push(
      <a
        key={`link-${start}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS}
      >
        {matchedText}
        {marker ? <sup>{marker}</sup> : null}
      </a>,
    );

    lastIndex = start + matchedText.length;
  }

  // Push remaining text
  if (lastIndex < processedText.length) {
    nodes.push(processedText.slice(lastIndex));
  }

  return nodes;
}

// ---------------------------------------------------------------------------
// Footnote strings
// ---------------------------------------------------------------------------
const TOKEN_FOOTNOTE = {
  en: "* Tokens are the basic units AI models use to process text, roughly 1 token ≈ ¾ of a word. The speed at which a model generates tokens directly impacts how fast you get a response.",
  ar: "* الـ tokens هي الوحدات الأساسية اللي الموديلات بتستخدمها لمعالجة النصوص، تقريباً كل token يساوي ¾ من كلمة. سرعة الموديل في توليد الـ tokens بتحدد مدى سرعة الردود.",
};

const MODEL_FOOTNOTE = {
  en: "† At the time of writing (March 4, 2026), the current Claude models are Claude Sonnet 4.6 and Claude Opus 4.6.",
  ar: "† وقت كتابة هذا المقال (4 مارس 2026)، الموديلات الحالية من Claude هي Claude Sonnet 4.6 وClaude Opus 4.6.",
};

const FREE_MODEL_FOOTNOTE = {
  en: "‡ As of March 4, 2026, MiniMax M2.5 is completely free to use standalone via Ollama. All three models (MiniMax M2.5, GLM 5, and Kimi K2.5) are also included in the OpenCode Zen plan ($10/month). Availability and pricing may change at any time, always check the provider's current pricing before relying on them.",
  ar: "‡ في 4 مارس 2026، MiniMax M2.5 مجاني بالكامل بشكل مستقل عبر Ollama. الموديلات الثلاث (MiniMax M2.5 وGLM 5 وKimi K2.5) مدرجة كذلك ضمن خطة OpenCode Zen بـ 10 دولار شهرياً. التوفر والتسعير قد يتغيران في أي وقت، دايماً تأكد من صفحة التسعير عند مزوّد الخدمة قبل الاعتماد عليها.",
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function Page({ params }: Props) {
  const { locale } = await params;

  const fileName =
    locale === "ar"
      ? "Why not to use local models.ar.md"
      : "Why not to use local models.md";
  const filePath = path.join(process.cwd(), "content", "blog", fileName);
  let content = "";

  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error("Error reading blog post:", error);
  }

  const lines = content.split("\n");
  const title = lines[0]?.replace(/^#\s*/, "") || "";
  const categoryLine = lines.find(
    (line) => line.includes("Category:") || line.includes("الفئة:"),
  );
  const category =
    categoryLine?.replace(/.*(?:Category|الفئة):\s*|\s*\|.*/g, "") ||
    (locale === "ar" ? "الذكاء الاصطناعي والتطوير" : "AI & Development");

  const uiT = {
    en: { readTime: "6 min read", date: "March 4, 2026" },
    ar: { readTime: "6 دقائق للقراءة", date: "٤ مارس ٢٠٢٦" },
  };
  const t = uiT[locale] || uiT.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description:
      locale === "ar"
        ? "قد تبدو الموديلات المحلية بديلاً موفراً للمال لـ Claude Code، لكن الواقع أكثر تعقيداً بكثير."
        : "Local models might seem like a money-saving alternative to Claude Code, but the reality is far more complicated.",
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

  // Shared mutable state for token footnote insertion
  const tokenState = { inserted: false };

  const inline = (text: string) => parseInline(text, locale, tokenState);

  const renderContent = (): React.ReactNode => {
    const elements: React.ReactNode[] = [];
    let currentParagraph = "";
    let listItems: string[] = [];

    const flushParagraph = (key: string) => {
      if (!currentParagraph) return;
      elements.push(
        <p key={key} className="mb-6 text-lg text-text/70 leading-relaxed">
          {inline(currentParagraph)}
        </p>,
      );
      currentParagraph = "";
    };

    const flushList = (key: string) => {
      if (listItems.length === 0) return;
      elements.push(
        <ul
          key={key}
          className="mb-6 space-y-2 list-disc list-inside text-text/70"
        >
          {listItems.map((item, idx) => (
            <li key={idx} className="text-lg">
              {inline(item)}
            </li>
          ))}
        </ul>,
      );
      listItems = [];
    };

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith("## ")) {
        flushParagraph(`p-${i}`);
        flushList(`ul-${i}`);
        elements.push(
          <h2 key={`h2-${i}`} className="text-3xl font-display mb-6 mt-12">
            {line.replace(/^##\s*/, "")}
          </h2>,
        );
      } else if (line.startsWith("- ")) {
        flushParagraph(`p-${i}`);
        listItems.push(line.replace(/^-\s*/, ""));
      } else if (line === "") {
        flushParagraph(`p-${i}`);
        flushList(`ul-${i}`);
      } else if (
        !line.includes("Category:") &&
        !line.includes("Read Time:") &&
        !line.includes("الفئة:") &&
        !line.includes("وقت القراءة:")
      ) {
        const codeMatch = line.match(/`([^`]+)`/);
        if (codeMatch) {
          flushParagraph(`p-before-${i}`);
          flushList(`ul-before-${i}`);
          const parts = line.split(/`[^`]+`/);
          elements.push(
            <p
              key={`p-inline-code-${i}`}
              className="mb-6 text-lg text-text/70 leading-relaxed"
            >
              {parts[0] ? inline(parts[0]) : null}
              <CopyButton code={codeMatch[1]} locale={locale} />
              {parts[1] ? inline(parts[1]) : null}
            </p>,
          );
        } else {
          currentParagraph += (currentParagraph ? " " : "") + line;
        }
      }
    }

    flushParagraph("p-final");
    flushList("ul-final");
    return elements;
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
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
                {t.readTime}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-text/80">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                {t.date}
              </span>
            </div>
          </header>

          <div className="glass-card p-8 md:p-12">
            {renderContent()}

            {/* Footnotes */}
            <footer className="mt-10 pt-6 border-t border-white/10 space-y-2 text-sm text-text/40 leading-relaxed italic">
              <p>{TOKEN_FOOTNOTE[locale] || TOKEN_FOOTNOTE.en}</p>
              <p>{MODEL_FOOTNOTE[locale] || MODEL_FOOTNOTE.en}</p>
              <p>{FREE_MODEL_FOOTNOTE[locale] || FREE_MODEL_FOOTNOTE.en}</p>
            </footer>
          </div>
        </article>
      </main>
    </>
  );
}
