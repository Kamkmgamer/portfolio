import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowForward, ArrowOut } from "./icons";

/* ───────────────────────────────────────────────────────────────────────────
   Work card — large screenshot, title, summary, tags, explicit links.
   The whole card links to the primary destination (stretched link);
   secondary links stay independently focusable above it.
   ─────────────────────────────────────────────────────────────────────────── */
export type WorkItem = {
  title: string;
  description: string;
  image: string;
  tags?: string[];
  demo?: string | null;
  github?: string | null;
};

export function WorkCard({
  item,
  labels,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  aspect = "aspect-[3/2]",
  className,
  headingLevel = "h3",
}: {
  item: WorkItem;
  labels: { live: string; source: string };
  sizes?: string;
  priority?: boolean;
  aspect?: string;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const primary = item.demo || item.github || null;
  const Heading = headingLevel;

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div
        className={cn(
          "media-frame transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-card)] motion-reduce:group-hover:translate-y-0",
          aspect,
        )}
      >
        <Image
          src={item.image}
          alt=""
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <Heading className="text-xl font-semibold tracking-[-0.02em] text-ink md:text-[1.375rem] rtl:tracking-normal">
            {primary ? (
              <a href={primary} target="_blank" rel="noopener noreferrer" className="stretched-link">
                {item.title}
              </a>
            ) : (
              item.title
            )}
          </Heading>
          <p className="mt-1.5 max-w-[52ch] leading-relaxed text-ink-2">{item.description}</p>
        </div>
        {primary && (
          <span
            aria-hidden="true"
            className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-colors duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
          >
            <ArrowOut />
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        {item.tags && item.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 3).map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        )}
        {(item.demo || item.github) && (
          <div className="relative z-10 flex items-center gap-4 text-sm">
            {item.demo && (
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/l inline-flex items-center gap-1 font-medium text-ink-2 transition-colors hover:text-ink"
              >
                {labels.live}
                <ArrowOut className="size-3.5" />
                <span className="sr-only">: {item.title}</span>
              </a>
            )}
            {item.github && (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-ink-2 transition-colors hover:text-ink"
              >
                {labels.source}
                <ArrowOut className="size-3.5" />
                <span className="sr-only">: {item.title}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Index row — editorial list item for case studies, writing, research.
   ─────────────────────────────────────────────────────────────────────────── */
export function IndexRow({
  href,
  external,
  label,
  title,
  summary,
  meta,
  className,
  headingLevel = "h3",
}: {
  href: string;
  external?: boolean;
  /** Plain meta shown in the leading column (category, year). */
  label?: ReactNode;
  title: ReactNode;
  summary?: ReactNode;
  meta?: ReactNode;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const LinkEl = external ? "a" : Link;

  return (
    <li className={cn("group relative border-t border-line last:border-b", className)}>
      <div className="grid gap-x-10 gap-y-3 py-7 md:grid-cols-[minmax(9rem,12rem)_1fr_auto] md:py-9">
        <div className="pt-1 text-sm text-muted tabular">{label}</div>
        <div className="min-w-0">
          <Heading className="text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl rtl:tracking-normal">
            <LinkEl
              href={href}
              {...linkProps}
              className="stretched-link bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px] rtl:bg-[position:100%_100%]"
            >
              {title}
            </LinkEl>
          </Heading>
          {summary && <p className="mt-2 max-w-[64ch] leading-relaxed text-ink-2">{summary}</p>}
          {meta && <div className="mt-4">{meta}</div>}
        </div>
        <span
          aria-hidden="true"
          className="hidden size-11 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-colors duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:grid"
        >
          {external ? <ArrowOut /> : <ArrowForward />}
        </span>
      </div>
    </li>
  );
}

/** Empty / unavailable state used by lists and filters. */
export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[1.25rem] border border-dashed border-line-strong px-6 py-16 text-center", className)}>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="mx-auto size-8 text-muted">
        <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3.5 9h17" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="6.5" cy="7" r=".8" fill="currentColor" />
        <circle cx="9" cy="7" r=".8" fill="currentColor" />
      </svg>
      <p className="mt-4 text-lg font-semibold text-ink">{title}</p>
      {description && <p className="mx-auto mt-2 max-w-[46ch] text-ink-2">{description}</p>}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
