import type { Metadata } from "next";
import { Locale } from "@/i18n.config";
import { buildLocalizedMetadata } from "@/lib/seo";

const articlePath = "/case-studies/ecommerce-websites-tiers";

const baseMetadata: Metadata = {
  title: "Ecommerce Website Tiers: $20 to $10,000",
  description:
    "I built live ecommerce website demos at every price point. See exactly what your money buys, from broken $20 sites to full-featured $10,000 platforms with real checkout.",
  openGraph: {
    title: "Ecommerce Website Tiers: $20 to $10,000",
    description:
      "I built live ecommerce demos at every price point. See exactly what your money buys.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecommerce Website Tiers: $20 to $10,000",
    description:
      "I built live ecommerce demos at every price point. See exactly what your money buys.",
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

export default function EcommerceTiersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
