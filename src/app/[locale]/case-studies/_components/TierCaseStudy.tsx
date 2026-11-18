import type { ReactNode } from "react";
import type { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { getNextCaseStudy } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ArrowOut } from "@/components/site/icons";
import {
  CheckList,
  DetailSection,
  InfoCard,
  NextUp,
  PageHeader,
  SectionHeader,
} from "@/components/site/layout";

/* ───────────────────────────────────────────────────────────────────────────
   Shared renderer for the "$20 to $10,000" tier case studies (restaurant and
   ecommerce). Each page owns its copy; this file owns the layout.
   ─────────────────────────────────────────────────────────────────────────── */

export type Verdict = "skip" | "placeholder" | "good" | "great" | "enterprise";

export type Tier = {
  price: string;
  label: string;
  verdict: Verdict;
  summary: string;
  speed: string;
  mobile: string;
  features: { text: string; good: boolean }[];
  url: string;
};

export type Recommendation = {
  title: string;
  budget: string;
  /** Renders the items with cross marks (the "skip these" group). */
  negative?: boolean;
  items: string[];
};

export type TierContent = {
  h1a: string;
  h1b: string;
  intro: string;
  b1: string;
  b2: string;
  b3: string;
  pTitle: string;
  pDesc: string;
  pC1: string;
  pC1d: string;
  pC2: string;
  pC2d: string;
  pC3: string;
  pC3d: string;
  tTitle: string;
  tItalic: string;
  tDesc: string;
  demoLabel: string;
  tiers: Tier[];
  cTitle: string;
  cItalic: string;
  tHeaders: string[];
  tRows: string[][];
  rTitle: string;
  rItalic: string;
  rDesc: string;
  recs: Recommendation[];
  bTitle: string;
  bDesc: string;
  bCards: { q: string; a: string }[];
};

/** Which comparison-table cell values get a status tone. */
export type CellTones = { danger: string[]; muted: string[]; success: string[] };

const verdictTone: Record<Verdict, { text: string; dot: string }> = {
  skip: { text: "text-danger", dot: "bg-danger" },
  placeholder: { text: "text-muted", dot: "bg-line-strong" },
  good: { text: "text-success", dot: "bg-success" },
  great: { text: "text-accent", dot: "bg-accent" },
  enterprise: { text: "text-accent", dot: "bg-accent" },
};

/** Two-part heading: the second half recedes, replacing the old italic split. */
function SplitTitle({ lead, rest }: { lead: string; rest: string }) {
  return (
    <>
      {lead} <span className="text-muted">{rest}</span>
    </>
  );
}

function hostOf(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

function TierCard({ tier, c }: { tier: Tier; c: TierContent }) {
  const tone = verdictTone[tier.verdict];
  const emphasis = tier.verdict === "great" || tier.verdict === "enterprise";
  const bad = tier.features.filter((f) => !f.good).map((f) => f.text);
  const good = tier.features.filter((f) => f.good).map((f) => f.text);

  return (
    <li
      className={cn(
        "card card-interactive group reveal relative flex min-w-0 flex-col p-6",
        emphasis && "border-[color-mix(in_oklab,var(--accent)_30%,var(--line))]",
      )}
    >
      <p className="text-[2rem] font-semibold leading-none tracking-[-0.03em] text-ink tabular rtl:tracking-normal">
        {tier.price}
      </p>
      <h3 className="mt-2 text-[0.9375rem] font-medium text-ink-2">{tier.label}</h3>

      <p className={cn("mt-5 flex items-center gap-2 text-sm font-medium", tone.text)}>
        <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full", tone.dot)} />
        {tier.summary}
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
        <div className="bg-paper-2 px-3 py-2.5">
          <dt className="text-xs font-medium text-muted">{c.tHeaders[1]}</dt>
          <dd className="mt-1 text-sm font-medium text-ink tabular">{tier.speed}</dd>
        </div>
        <div className="bg-paper-2 px-3 py-2.5">
          <dt className="text-xs font-medium text-muted">{c.tHeaders[2]}</dt>
          <dd className="mt-1 text-sm font-medium text-ink">{tier.mobile}</dd>
        </div>
      </dl>

      <div className="mt-5 grid flex-1 content-start gap-2.5">
        {bad.length > 0 && <CheckList tone="negative" items={bad} className="gap-2.5 text-[0.9375rem]" />}
        {good.length > 0 && <CheckList items={good} className="gap-2.5 text-[0.9375rem]" />}
      </div>

      <a
        href={tier.url}
        target="_blank"
        rel="noopener noreferrer"
        className="stretched-link mt-6 flex items-center justify-between gap-3 border-t border-line pt-4 text-sm font-medium text-ink transition-colors group-hover:text-accent"
      >
        <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap">
          {c.demoLabel}
          <span className="sr-only">
            {" "}
            {tier.price}, {tier.label}
          </span>
          <ArrowOut className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </span>
        <span aria-hidden="true" dir="ltr" className="min-w-0 truncate font-mono text-xs text-muted">
          {hostOf(tier.url)}
        </span>
      </a>
    </li>
  );
}

function WideSection({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="container-site">
      <div className="border-t border-line py-14 md:py-20">{children}</div>
    </section>
  );
}

export async function TierCaseStudy({
  slug,
  locale,
  c,
  cellTones,
}: {
  slug: string;
  locale: Locale;
  c: TierContent;
  cellTones: CellTones;
}) {
  const dict = await getDictionary(locale);
  const next = getNextCaseStudy(slug, locale);

  const cellClass = (cell: string) =>
    cellTones.danger.includes(cell)
      ? "text-danger font-medium"
      : cellTones.success.includes(cell)
        ? "text-success font-medium"
        : cellTones.muted.includes(cell)
          ? "text-muted"
          : undefined;

  const problems = [
    { t: c.pC1, d: c.pC1d },
    { t: c.pC2, d: c.pC2d },
    { t: c.pC3, d: c.pC3d },
  ];

  return (
    <article>
      <PageHeader
        breadcrumb={{ href: `/${locale}/case-studies`, label: dict.caseStudies.all }}
        title={
          <>
            {c.h1a}
            <span className="block text-muted">{c.h1b}</span>
          </>
        }
        lead={c.intro}
      >
        <ul className="flex flex-wrap gap-1.5">
          {[c.b1, c.b2, c.b3].map((b) => (
            <li key={b} className="tag">
              {b}
            </li>
          ))}
        </ul>
      </PageHeader>

      <DetailSection title={c.pTitle} description={c.pDesc}>
        <div className="grid gap-4 md:grid-cols-3">
          {problems.map((p) => (
            <InfoCard key={p.t} title={p.t}>
              <p className="text-[0.9375rem]">{p.d}</p>
            </InfoCard>
          ))}
        </div>
      </DetailSection>

      <WideSection id="tiers">
        <SectionHeader id="tiers" title={<SplitTitle lead={c.tTitle} rest={c.tItalic} />} description={c.tDesc} />
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {c.tiers.map((tier) => (
            <TierCard key={tier.url} tier={tier} c={c} />
          ))}
        </ul>
      </WideSection>

      <WideSection id="comparison">
        <SectionHeader id="comparison" title={<SplitTitle lead={c.cTitle} rest={c.cItalic} />} />
        <div className="reveal relative mt-10 overflow-x-auto rounded-[1.125rem] border border-line bg-card">
          <table className="data-table min-w-[48rem]">
            <thead>
              <tr>
                {c.tHeaders.map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={cn("whitespace-nowrap", i === 0 && "sticky start-0 z-[1] border-e border-line")}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.tRows.map(([budget, ...cells]) => (
                <tr key={budget}>
                  <th
                    scope="row"
                    className="sticky start-0 z-[1] whitespace-nowrap border-e border-b border-line bg-card font-semibold text-ink tabular [tr:last-child>&]:border-b-0"
                  >
                    {budget}
                  </th>
                  {cells.map((cell, i) => (
                    <td key={i} className={cn("whitespace-nowrap", cellClass(cell))}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WideSection>

      <DetailSection title={<SplitTitle lead={c.rTitle} rest={c.rItalic} />} description={c.rDesc}>
        <div className="grid gap-4 sm:grid-cols-2">
          {c.recs.map((rec) => (
            <InfoCard
              key={rec.title}
              note={<span className={rec.negative ? "text-danger" : "text-accent"}>{rec.budget}</span>}
              title={rec.title}
            >
              <CheckList
                tone={rec.negative ? "negative" : "default"}
                items={rec.items}
                className="mt-4 text-[0.9375rem]"
              />
            </InfoCard>
          ))}
        </div>
      </DetailSection>

      <DetailSection title={c.bTitle}>
        <p className="max-w-[34ch] text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] font-medium leading-snug tracking-[-0.02em] text-ink rtl:leading-relaxed rtl:tracking-normal">
          {c.bDesc}
        </p>
        <dl className="mt-10 border-t border-line">
          {c.bCards.map((card) => (
            <div
              key={card.q}
              className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <dt className="text-ink-2">{card.q}</dt>
              <dd className="shrink-0 font-semibold text-ink tabular">{card.a}</dd>
            </div>
          ))}
        </dl>
      </DetailSection>

      <NextUp
        label={dict.caseStudies.next}
        title={next.title}
        description={next.summary}
        href={`/${locale}/case-studies/${next.slug}`}
      />
    </article>
  );
}
