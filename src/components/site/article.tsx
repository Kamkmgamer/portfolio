import Link from "next/link";
import type { ReactNode } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { formatPostDate, getRelatedPosts } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import { IndexRow } from "./cards";
import { ArrowForward } from "./icons";
import { MetaRow, ViewAllLink, stagger } from "./layout";

/** Reading-column width shared by article header and body so edges align. */
export const READING = "mx-auto w-full max-w-[44rem]";

/* ───────────────────────────────────────────────────────────────────────────
   Article header — centered reading column, back link, category, meta.
   ─────────────────────────────────────────────────────────────────────────── */
export function ArticleHeader({
  backHref,
  backLabel,
  category,
  title,
  lead,
  meta,
  children,
}: {
  backHref: string;
  backLabel: string;
  category?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  meta?: ReactNode[];
  children?: ReactNode;
}) {
  return (
    <header className="container-site pt-[clamp(2.5rem,6vw,5rem)] pb-10 md:pb-14">
      <div className={READING}>
        <Link
          href={backHref}
          className="group enter inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          style={stagger(0)}
        >
          <ArrowForward className="size-3.5 rotate-180" />
          {backLabel}
        </Link>
        <h1
          className="enter mt-10 text-[clamp(2.25rem,1.6rem+2.6vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.035em] rtl:leading-[1.35] rtl:tracking-normal"
          style={stagger(2)}
        >
          {title}
        </h1>
        {lead && (
          <p className="text-lead enter mt-6" style={stagger(3)}>
            {lead}
          </p>
        )}
        {(category || (meta && meta.length > 0)) && (
          <MetaRow items={[category, ...(meta ?? [])]} className="enter mt-8 border-t border-line pt-5" />
        )}
        {children && (
          <div className="enter mt-6" style={stagger(4)}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}

/** Article body: reading column with long-form typography. */
export function ArticleBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="container-site">
      <div className={cn(READING, "prose-site", className)}>{children}</div>
    </div>
  );
}

/** Wide figure that may break out of the reading column on large screens. */
export function WideFigure({ children, caption, className }: { children: ReactNode; caption?: ReactNode; className?: string }) {
  return (
    <figure className={cn("my-12", className)}>
      {children}
      {caption && <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

/** Footnotes block at the end of an article. */
export function Footnotes({ children }: { children: ReactNode }) {
  return <footer className="mt-14 grid gap-2 border-t border-line pt-6 text-sm leading-relaxed text-muted">{children}</footer>;
}

/* ───────────────────────────────────────────────────────────────────────────
   Keep reading — featured posts other than the current one.
   ─────────────────────────────────────────────────────────────────────────── */
export function RelatedPosts({ slug, locale, dict }: { slug: string; locale: Locale; dict: Dictionary }) {
  const posts = getRelatedPosts(slug, locale);

  return (
    <section aria-labelledby="keep-reading" className="container-site pt-[var(--section-y)]">
      <div className="flex items-end justify-between gap-6">
        <h2 id="keep-reading" className="text-h3">
          {dict.blog.keepReading}
        </h2>
        <ViewAllLink href={`/${locale}/blog`}>{dict.blog.allArticles}</ViewAllLink>
      </div>
      {posts.length > 0 && (
        <ul className="mt-8">
          {posts.map((post) => (
            <IndexRow
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              label={post.category}
              title={post.title}
              summary={post.summary}
              meta={
                <MetaRow
                  items={[
                    <time key="d" dateTime={post.publishedDate.toISOString().slice(0, 10)}>
                      {formatPostDate(post.publishedDate, locale)}
                    </time>,
                    `${post.readTime} ${dict.blog.minRead}`,
                  ]}
                />
              }
            />
          ))}
        </ul>
      )}
    </section>
  );
}
