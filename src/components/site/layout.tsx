import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowForward } from "./icons";

/** Inline style helper for staggered `.enter` animations. */
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/* ───────────────────────────────────────────────────────────────────────────
   Page header — the single header pattern for every index and detail page.
   ─────────────────────────────────────────────────────────────────────────── */
export function PageHeader({
  title,
  lead,
  children,
  breadcrumb,
  className,
  titleClassName,
}: {
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  breadcrumb?: { href: string; label: string };
  className?: string;
  titleClassName?: string;
}) {
  return (
    <header className={cn("container-site pt-[clamp(3rem,8vw,6.5rem)] pb-[clamp(2.5rem,5vw,4rem)]", className)}>
      {breadcrumb && (
        <Link
          href={breadcrumb.href}
          className="group enter mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          style={stagger(0)}
        >
          <ArrowForward className="size-3.5 rotate-180" />
          {breadcrumb.label}
        </Link>
      )}
      <h1 className={cn("text-h1 enter max-w-[20ch]", titleClassName)} style={stagger(1)}>
        {title}
      </h1>
      {lead && (
        <p className="text-lead enter mt-6 max-w-[62ch]" style={stagger(2)}>
          {lead}
        </p>
      )}
      {children && (
        <div className="enter mt-8" style={stagger(3)}>
          {children}
        </div>
      )}
    </header>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Section header — title, optional description and trailing action.
   ─────────────────────────────────────────────────────────────────────────── */
export function SectionHeader({
  title,
  description,
  action,
  id,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        <h2 id={id} className="text-h2">
          {title}
        </h2>
        {description && <p className="mt-4 max-w-[56ch] text-[1.0625rem] leading-relaxed text-ink-2">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Quiet "View all →" style link. */
export function ViewAllLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group link-quiet text-[0.9375rem]">
      {children}
      <ArrowForward />
    </Link>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Editorial two-column section for long-form pages: heading rail + content.
   ─────────────────────────────────────────────────────────────────────────── */
export function DetailSection({
  title,
  description,
  children,
  id,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={cn("container-site", className)}>
      <div className="grid gap-x-12 gap-y-8 border-t border-line py-14 md:py-20 lg:grid-cols-12">
        <div className="reveal lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <h2 className="text-h3 max-w-[22ch] md:text-[1.75rem] md:leading-[1.15]">{title}</h2>
            {description && <p className="mt-4 max-w-[42ch] leading-relaxed text-ink-2">{description}</p>}
          </div>
        </div>
        <div className="reveal min-w-0 lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Stats — definition-list grid with hairline dividers.
   ─────────────────────────────────────────────────────────────────────────── */
export function StatGrid({
  items,
  className,
}: {
  items: { value: ReactNode; label: ReactNode; note?: ReactNode }[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "not-prose grid grid-cols-2 overflow-hidden rounded-[1.125rem] border border-line bg-line gap-px",
        items.length >= 4 ? "lg:grid-cols-4" : items.length === 3 ? "md:grid-cols-3" : "",
        className,
      )}
    >
      {items.map((item, i) => (
        <div key={i} className="flex flex-col bg-card p-5 md:p-7">
          <dt className="order-2 mt-2 text-sm font-medium text-ink">{item.label}</dt>
          <dd className="order-1 text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-semibold leading-none tracking-[-0.03em] text-ink tabular rtl:tracking-normal">
            {item.value}
          </dd>
          {item.note && <dd className="order-3 mt-1 text-[0.8125rem] leading-snug text-muted">{item.note}</dd>}
        </div>
      ))}
    </dl>
  );
}

/** Check-mark list used for achievements, deliverables, features. */
export function CheckList({ items, className, tone = "default" }: { items: ReactNode[]; className?: string; tone?: "default" | "negative" }) {
  return (
    <ul className={cn("not-prose grid gap-3", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 leading-relaxed text-ink-2">
          {tone === "negative" ? (
            <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-[0.35em] size-4 shrink-0 text-danger">
              <path d="M4.5 4.5l7 7m0-7l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-[0.35em] size-4 shrink-0 text-accent">
              <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Simple bordered card with title and body. */
export function InfoCard({
  title,
  note,
  children,
  className,
}: {
  title?: ReactNode;
  /** Short supporting fact shown under the title (e.g. a budget or date). */
  note?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("not-prose card p-6 md:p-7", className)}>
      {title && <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink rtl:tracking-normal">{title}</h3>}
      {note && <p className="mt-1 text-sm font-medium text-ink-2 tabular">{note}</p>}
      <div className={cn("leading-relaxed text-ink-2", (title || note) && "mt-2")}>{children}</div>
    </div>
  );
}

/** Highlighted note — accent tone for emphasis, neutral otherwise. */
export function Callout({
  children,
  title,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  title?: ReactNode;
  tone?: "accent" | "neutral";
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "not-prose rounded-[1.125rem] border p-6 md:p-7",
        tone === "accent" ? "border-[color-mix(in_oklab,var(--accent)_30%,transparent)] bg-accent-soft" : "border-line bg-paper-2",
        className,
      )}
    >
      {title && <p className="mb-2 font-semibold text-ink">{title}</p>}
      <div className="leading-relaxed text-ink-2">{children}</div>
    </aside>
  );
}

/** Vertical timeline for phased work (weeks, milestones, history). */
export function Timeline({
  items,
  className,
}: {
  items: { label: ReactNode; title?: ReactNode; body?: ReactNode }[];
  className?: string;
}) {
  return (
    <ol className={cn("not-prose relative grid gap-0", className)}>
      {items.map((item, i) => (
        <li key={i} className="relative grid gap-x-6 pb-10 ps-8 last:pb-0 sm:grid-cols-[9rem_1fr] sm:ps-0">
          <span
            aria-hidden="true"
            className="absolute start-[5px] top-2 bottom-0 w-px bg-line sm:start-[9.75rem] [li:last-child>&]:hidden"
          />
          <span
            aria-hidden="true"
            className="absolute start-0 top-[0.45rem] size-[11px] rounded-full border-2 border-accent bg-paper sm:start-[calc(9.75rem-5px)]"
          />
          <p className="pt-0.5 text-sm font-medium text-ink-2 tabular sm:text-end">{item.label}</p>
          <div className="mt-1 sm:mt-0 sm:ps-10">
            {item.title && <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink rtl:tracking-normal">{item.title}</h3>}
            {item.body && <div className={cn("leading-relaxed text-ink-2", item.title && "mt-2")}>{item.body}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Small key/value meta row (category · date · read time). */
export function MetaRow({ items, className }: { items: ReactNode[]; className?: string }) {
  const visible = items.filter(Boolean);
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted", className)}>
      {visible.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-3">
          {i > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-line-strong" />}
          {item}
        </span>
      ))}
    </p>
  );
}

/** "Next up" navigation block at the end of detail pages. */
export function NextUp({
  label,
  title,
  description,
  href,
  className,
}: {
  label: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <div className={cn("container-site", className)}>
      <Link
        href={href}
        className="group reveal relative block border-t border-line py-14 transition-colors md:py-20"
      >
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="text-h2 max-w-[22ch] transition-colors group-hover:text-accent">{title}</p>
            {description && <p className="mt-4 max-w-[56ch] text-ink-2">{description}</p>}
          </div>
          <span className="flex shrink-0 items-center gap-4">
            <span className="sr-only text-[0.9375rem] font-medium text-muted transition-colors group-hover:text-ink sm:not-sr-only">
              {label}
            </span>
            <span className="grid size-14 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:size-16">
              <ArrowForward className="size-5" />
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}
