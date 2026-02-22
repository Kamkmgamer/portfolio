import React from "react";
import type { Metadata } from "next";
import OfferList from "@/components/OfferList";
import { offers } from "@/data/offers";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
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
      languages: {
        en: "/en/offers",
        ar: "/ar/offers",
      },
    },
  };
}

export default async function OffersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-1800px mx-auto">
        <OfferList offers={offers} dict={dict} />
      </div>
    </main>
  );
}
