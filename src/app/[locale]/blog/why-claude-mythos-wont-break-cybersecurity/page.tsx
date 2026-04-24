import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { Locale } from "@/i18n.config";
import React from "react";
import { buildLocalizedAbsoluteUrl, buildLocalizedMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: Locale }>;
};

const articlePath = "/blog/why-claude-mythos-wont-break-cybersecurity";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const translations = {
    en: {
      title: "Why Claude Mythos Won't Break Cybersecurity",
      description:
        "People are panicking about Claude Mythos breaking cybersecurity. Here's why the economics of vulnerabilities and open-weight models mean it actually favors defenders.",
    },
    ar: {
      title: "لماذا لن يدمر Claude Mythos الأمن السيبراني",
      description:
        "يشعر الناس بالذعر من أن Claude Mythos سيدمر الأمن السيبراني. إليك السبب في أن اقتصاديات الثغرات ونماذج الأوزان المفتوحة تعني في الواقع أنه يخدم المدافعين.",
    },
  };

  const t = translations[locale] || translations.en;

  return buildLocalizedMetadata(locale, articlePath, {
    title: t.title,
    description: t.description,
    keywords: [
      "AI",
      "cybersecurity",
      "Claude",
      "Mythos",
      "open-weight models",
      "security",
      "vulnerabilities",
    ],
    openGraph: {
      title: t.title,
      description: t.description,
      type: "article",
      authors: ["Khalil AbdalMageed"],
      section: "AI & Cybersecurity",
      tags: ["AI", "cybersecurity", "Claude", "Mythos"],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
  });
}

// ---------------------------------------------------------------------------
// Model link map
// ---------------------------------------------------------------------------

const MODEL_LINKS: { pattern: RegExp; url: string; marker?: "†" | "‡" }[] = [
  { pattern: /\bAnthropic\b/g, url: "https://www.anthropic.com" },
  {
    pattern: /\bClaude\s+Mythos\b/g,
    url: "https://www.anthropic.com/glasswing",
    marker: "†",
  },
  {
    pattern: /\bClaude\s+Opus\b/g,
    url: "https://www.anthropic.com/claude/opus",
  },
  { pattern: /\bClaude\b/g, url: "https://www.anthropic.com/claude" },
  { pattern: /\bOpenBSD\b/g, url: "https://www.openbsd.org" },
  { pattern: /\bArtificial\s+Analysis\b/g, url: "https://artificialanalysis.ai" },
  {
    pattern: /\bGLM[\s-]?5\.1\b/g,
    url: "https://docs.z.ai/guides/llm/glm-5.1",
  },
  { pattern: /\bGLM\b/g, url: "https://open.bigmodel.cn/en" },
  { pattern: /\bKimi\b/g, url: "https://kimi.ai" },
  { pattern: /\bGPT\b/g, url: "https://chatgpt.com" },
];

const MODEL_LINKS_AR: { pattern: RegExp; url: string; marker?: "†" | "‡" }[] = [
  { pattern: /Anthropic/g, url: "https://www.anthropic.com" },
  {
    pattern: /Claude\s+Mythos/g,
    url: "https://www.anthropic.com/glasswing",
    marker: "†",
  },
  {
    pattern: /Claude\s+Opus/g,
    url: "https://www.anthropic.com/claude/opus",
  },
  { pattern: /Claude/g, url: "https://www.anthropic.com/claude" },
  { pattern: /OpenBSD/g, url: "https://www.openbsd.org" },
  { pattern: /Artificial\s+Analysis/g, url: "https://artificialanalysis.ai" },
  {
    pattern: /GLM[\s-]?5\.1/g,
    url: "https://docs.z.ai/guides/llm/glm-5.1",
  },
  { pattern: /GLM/g, url: "https://open.bigmodel.cn/en" },
  { pattern: /Kimi/g, url: "https://kimi.ai" },
  { pattern: /GPT/g, url: "https://chatgpt.com" },
];

const LINK_CLASS =
  "text-[hsl(var(--accent-gold))] underline underline-offset-2 decoration-[hsl(var(--accent-gold))]/40 hover:decoration-[hsl(var(--accent-gold))] transition-all duration-150 font-medium";

// ---------------------------------------------------------------------------
// parseInline
// ---------------------------------------------------------------------------
function parseInline(
  text: string,
  locale: string,
  tokenState: { inserted: boolean }
): React.ReactNode[] {
  const links = locale === "ar" ? MODEL_LINKS_AR : MODEL_LINKS;

  const combined = new RegExp(
    links.map((m) => m.pattern.source).join("|"),
    "g"
  );

  const tokenPattern =
    locale === "ar" ? /(?:ال)?توكنز(?!\*)/g : /\btokens\b(?!\*)/g;

  let processedText = text;
  if (!tokenState.inserted) {
    const replaced = processedText.replace(
      tokenPattern,
      (match) => match + "*"
    );
    if (replaced !== processedText) {
      tokenState.inserted = true;
      processedText = replaced;
    }
  }

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  combined.lastIndex = 0;

  while ((match = combined.exec(processedText)) !== null) {
    const matchedText = match[0];
    const start = match.index;

    if (start > lastIndex) {
      nodes.push(processedText.slice(lastIndex, start));
    }

    const rule = links.find((l) =>
      new RegExp(`^(?:${l.pattern.source})$`).test(matchedText)
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
      </a>
    );

    lastIndex = start + matchedText.length;
  }

  if (lastIndex < processedText.length) {
    nodes.push(processedText.slice(lastIndex));
  }

  return nodes;
}

// ---------------------------------------------------------------------------
// Footnotes
// ---------------------------------------------------------------------------
const TOKEN_FOOTNOTE = {
  en: "* Tokens are the basic units AI models use to process text, roughly 1 token ≈ ¾ of a word. The speed and cost of token generation directly impact the economics of AI-driven attacks and defense.",
  ar: "* التوكنز (Tokens) هي الوحدات الأساسية اللي الموديلات بتستخدمها لمعالجة النصوص. سرعة وتكلفة توليد التوكنز بتأثر بشكل مباشر على اقتصاديات الهجمات والدفاع باستخدام الذكاء الاصطناعي.",
};

const MYTHOS_FOOTNOTE = {
  en: "† Claude Mythos refers to the next-generation frontier models expected to significantly surpass current state-of-the-art capabilities in reasoning and coding.",
  ar: "† يشير Claude Mythos إلى الجيل القادم من الموديلات الرائدة (frontier models) المتوقع إنها تتفوق بشكل كبير على القدرات الحالية في البرمجة والتحليل.",
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function Page({ params }: Props) {
  const { locale } = await params;
  const articleUrl = buildLocalizedAbsoluteUrl(locale, articlePath);

  const fileName =
    locale === "ar"
      ? "Why Claude Mythos Won't Break Cybersecurity.ar.md"
      : "Why Claude Mythos Won't Break Cybersecurity.md";
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
    (line) => line.includes("Category:") || line.includes("الفئة:")
  );
  const category =
    categoryLine?.replace(/.*(?:Category|الفئة):\s*|\s*\|.*/g, "") ||
    (locale === "ar" ? "الذكاء الاصطناعي والأمن السيبراني" : "AI & Cybersecurity");

  const uiT = {
    en: { readTime: "4 min read", date: "April 24, 2026" },
    ar: { readTime: "4 دقائق للقراءة", date: "٢٤ أبريل ٢٠٢٦" },
  };
  const t = uiT[locale] || uiT.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description:
      locale === "ar"
        ? "يشعر الناس بالذعر من أن Claude Mythos سيدمر الأمن السيبراني. إليك السبب في أن اقتصاديات الثغرات ونماذج الأوزان المفتوحة تعني في الواقع أنه يخدم المدافعين."
        : "People are panicking about Claude Mythos breaking cybersecurity. Here's why the economics of vulnerabilities and open-weight models mean it actually favors defenders.",
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
    datePublished: "2026-04-24",
    dateModified: "2026-04-24",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    url: articleUrl,
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
        </p>
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
        </ul>
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
          </h2>
        );
      } else if (line.match(/^!\[(.*?)\]\((.*?)\)$/)) {
        flushParagraph(`p-${i}`);
        flushList(`ul-${i}`);
        const match = line.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (match) {
          elements.push(
            <div key={`img-container-${i}`} className="my-10 rounded-xl overflow-hidden border border-white/10 bg-white/5 relative">
              <img 
                src={match[2]} 
                alt={match[1]} 
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          );
        }
      } else if (line.match(/^@\[iframe\]\((.*?)\)$/)) {
        flushParagraph(`p-${i}`);
        flushList(`ul-${i}`);
        const match = line.match(/^@\[iframe\]\((.*?)\)$/);
        if (match) {
          elements.push(
            <div key={`iframe-container-${i}`} className="my-10 rounded-xl overflow-hidden border border-white/10 bg-white/5 relative h-[600px] w-full">
              <iframe 
                src={match[1]} 
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                frameBorder="0"
                allowFullScreen
                scrolling="no"
              />
            </div>
          );
        }
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
        currentParagraph += (currentParagraph ? " " : "") + line;
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
              <p>{MYTHOS_FOOTNOTE[locale] || MYTHOS_FOOTNOTE.en}</p>
            </footer>
          </div>
        </article>
      </main>
    </>
  );
}
