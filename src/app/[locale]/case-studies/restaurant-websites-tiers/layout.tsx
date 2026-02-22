import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant Website Tiers: $20 to $10,000",
  description:
    "I built 9 live restaurant website demos at every price point. See exactly what your money buys, from $20 (hurts your reputation) to $10,000 (the website IS your business).",
  openGraph: {
    title: "Restaurant Website Tiers: $20 to $10,000",
    description:
      "I built 9 live restaurant website demos at every price point. See exactly what your money buys.",
    url: "https://www.khalil.mageed.net/case-studies/restaurant-websites-tiers",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant Website Tiers: $20 to $10,000",
    description:
      "I built 9 live restaurant website demos at every price point. See exactly what your money buys.",
  },
  alternates: {
    canonical: "/case-studies/restaurant-websites-tiers",
  },
};

export default function RestaurantTiersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
