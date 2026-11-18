"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { isLocale, type Locale } from "@/i18n.config";
import { ArrowForward } from "@/components/site/icons";
import { stagger } from "@/components/site/layout";

export type NotFoundCopy = {
  title: string;
  description: string;
  home: string;
  suggestions: string;
  links: { href: string; label: string }[];
};

/**
 * not-found.tsx never receives route params, so the server passes both
 * locales' (tiny) copy and the client picks one from the URL.
 */
export function NotFoundView({ copy }: { copy: Record<Locale, NotFoundCopy> }) {
  const params = useParams<{ locale?: string }>();
  const locale: Locale = isLocale(params?.locale) ? params.locale : "en";
  const t = copy[locale];

  return (
    <section className="container-site flex min-h-[70dvh] flex-col justify-center py-[clamp(4rem,10vw,8rem)]">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h1 className="text-display enter max-w-[14ch]" style={stagger(1)}>
            {t.title}
          </h1>
          <p className="text-lead enter mt-6 max-w-[46ch]" style={stagger(2)}>
            {t.description}
          </p>
          <div className="enter mt-10" style={stagger(3)}>
            <Link href={`/${locale}`} className="btn btn-primary btn-lg group">
              <ArrowForward className="rotate-180" />
              {t.home}
            </Link>
          </div>
        </div>

        <nav aria-labelledby="nf-suggestions" className="enter lg:col-span-5" style={stagger(4)}>
          <h2 id="nf-suggestions" className="text-sm font-semibold text-ink">
            {t.suggestions}
          </h2>
          <ul className="mt-4 border-t border-line">
            {t.links.map((link) => (
              <li key={link.href} className="border-b border-line">
                <Link
                  href={`/${locale}${link.href}`}
                  className="group flex items-center justify-between gap-4 py-4 text-lg font-medium text-ink transition-colors hover:text-accent"
                >
                  {link.label}
                  <ArrowForward className="text-muted transition-[color,translate] group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
