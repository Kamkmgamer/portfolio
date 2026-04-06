import type { Metadata } from "next";
import { Locale } from "@/i18n.config";
import { buildLocalizedMetadata } from "@/lib/seo";

const articlePath = "/case-studies/restaurant-websites-tiers";

const baseMetadata: Metadata = {
  title: "Restaurant Website Tiers: $20 to $10,000",
  description:
    "I built 9 live restaurant website demos at every price point. See exactly what your money buys, from $20 (hurts your reputation) to $10,000 (the website IS your business).",
  openGraph: {
    title: "Restaurant Website Tiers: $20 to $10,000",
    description:
      "I built 9 live restaurant website demos at every price point. See exactly what your money buys.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant Website Tiers: $20 to $10,000",
    description:
      "I built 9 live restaurant website demos at every price point. See exactly what your money buys.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedMetadata(locale, articlePath, baseMetadata);
}

export default function RestaurantTiersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
