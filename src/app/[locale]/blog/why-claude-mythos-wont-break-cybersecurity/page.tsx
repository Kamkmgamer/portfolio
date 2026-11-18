import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { Locale } from "@/i18n.config";
import React from "react";
import { buildLocalizedAbsoluteUrl, buildLocalizedMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/server";
import { getBlogPostBySlug, formatPostDate } from "@/lib/blogs";
import { ArticleBody, ArticleHeader, Footnotes, RelatedPosts } from "@/components/site/article";

import { ResponsiveEmbed } from "./ResponsiveEmbed";

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

// Links inherit long-form styles from .prose-site.
const LINK_CLASS = undefined;

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

  const dict = await getDictionary(locale);
  const post = getBlogPostBySlug("why-claude-mythos-wont-break-cybersecurity", locale);

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
        <p key={key}>{inline(currentParagraph)}</p>
      );
      currentParagraph = "";
    };

    const flushList = (key: string) => {
      if (listItems.length === 0) return;
      elements.push(
        <ul key={key}>
          {listItems.map((item, idx) => (
            <li key={idx}>{inline(item)}</li>
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
          <h2 key={`h2-${i}`}>{line.replace(/^##\s*/, "")}</h2>
        );
      } else if (line.match(/^@\[responsive-embed\]\((.*?)\|(.*?)\)$/)) {
        flushParagraph(`p-${i}`);
        flushList(`ul-${i}`);
        const match = line.match(/^@\[responsive-embed\]\((.*?)\|(.*?)\)$/);
        if (match) {
          elements.push(
            <ResponsiveEmbed
              key={`responsive-embed-${i}`}
              iframeUrl={match[1]}
              imageUrl={match[2]}
            />
          );
        }
      } else if (line.match(/^!\[(.*?)\]\((.*?)\)$/)) {
        flushParagraph(`p-${i}`);
        flushList(`ul-${i}`);
        const match = line.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (match) {
          elements.push(
            <figure key={`img-container-${i}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={match[2]} alt={match[1]} className="h-auto w-full" loading="lazy" />
            </figure>
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
      <article>
        <ArticleHeader
          backHref={`/${locale}/blog`}
          backLabel={dict.blog.allArticles}
          category={category}
          title={title}
          lead={post?.summary}
          meta={[
            post?.author,
            post && (
              <time key="d" dateTime="2026-04-24">
                {formatPostDate(post.publishedDate, locale)}
              </time>
            ),
            post && `${post.readTime} ${dict.blog.minRead}`,
          ]}
        />
        <ArticleBody>
          {renderContent()}
          <Footnotes>
            <p>{TOKEN_FOOTNOTE[locale] || TOKEN_FOOTNOTE.en}</p>
            <p>{MYTHOS_FOOTNOTE[locale] || MYTHOS_FOOTNOTE.en}</p>
          </Footnotes>
        </ArticleBody>
        <RelatedPosts slug="why-claude-mythos-wont-break-cybersecurity" locale={locale} dict={dict} />
      </article>
    </>
  );
}
