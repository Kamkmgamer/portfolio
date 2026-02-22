import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecommerce Website Tiers: $20 to $10,000",
  description:
    "I built live ecommerce website demos at every price point. See exactly what your money buys, from broken $20 sites to full-featured $10,000 platforms with real checkout.",
  openGraph: {
    title: "Ecommerce Website Tiers: $20 to $10,000",
    description:
      "I built live ecommerce demos at every price point. See exactly what your money buys.",
    url: "https://www.khalil.mageed.net/case-studies/ecommerce-websites-tiers",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecommerce Website Tiers: $20 to $10,000",
    description:
      "I built live ecommerce demos at every price point. See exactly what your money buys.",
  },
  alternates: {
    canonical: "/case-studies/ecommerce-websites-tiers",
  },
};

export default function EcommerceTiersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
