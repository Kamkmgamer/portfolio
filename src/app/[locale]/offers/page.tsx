import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { offers } from "@/data/offers";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { ArrowOut } from "@/components/site/icons";
import { PageHeader } from "@/components/site/layout";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.offers.title,
    description: dict.offers.description,
    openGraph: {
      title: `${dict.offers.title} | Khalil AbdalMageed`,
      description: dict.offers.description,
      url: `https://www.khalil.mageed.net/${locale}/offers`,
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.offers.title} | Khalil AbdalMageed`,
      description: dict.offers.description,
    },
    alternates: {
      canonical: `/${locale}/offers`,
      languages: { en: "/en/offers", ar: "/ar/offers" },
    },
  };
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/\.$/, "");

/** "starting at $1,500" → { label: "Starting at", amount: "$1,500" } so only the figure is set in mono. */
function splitPrice(price: string) {
  const m = price.match(/^(.*?)\s*([$€£][\d.,]+\+?)(.*)$/);
  if (!m) return { label: "", amount: capitalize(price) };
  return { label: capitalize(m[1].trim()), amount: (m[2] + m[3]).replace(/\.$/, "") };
}

export default async function OffersPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const o = dict.offers;

  return (
    <>
      <PageHeader title={o.heading} lead={o.lead} />

      <section aria-label={o.heading} className="container-site pb-[calc(var(--section-y)*0.75)]">
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer, i) => {
            const price = splitPrice(offer.price);
            return (
            <li key={offer.id} className="reveal group relative flex flex-col">
              <div className="media-frame aspect-[3/2] transition-[transform,box-shadow] duration-500 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-card)] motion-reduce:group-hover:translate-y-0">
                <Image
                  src={offer.image}
                  alt=""
                  fill
                  priority={i < 3}
                  sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-5 flex flex-1 items-start justify-between gap-5">
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold tracking-[-0.02em] rtl:tracking-normal">
                    <a href={offer.demo} target="_blank" rel="noopener noreferrer" className="stretched-link">
                      {capitalize(offer.title)}
                    </a>
                  </h2>
                  <p className="mt-1.5 line-clamp-3 leading-relaxed text-ink-2">{offer.description}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
                >
                  <ArrowOut />
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-4">
                <p dir="ltr" className="flex items-baseline gap-2">
                  {price.label && <span className="text-sm text-muted">{price.label}</span>}
                  <span className="font-mono text-[0.9375rem] font-medium text-ink tabular">{price.amount}</span>
                </p>
                <span className="text-sm font-medium text-muted transition-colors group-hover:text-ink">{o.viewDemo}</span>
              </div>
            </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
