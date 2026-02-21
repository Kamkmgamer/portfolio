import React from "react";
import type { Metadata } from "next";
import OfferList from "@/components/OfferList";
import { offers } from "@/data/offers";

export const metadata: Metadata = {
  title: "Offers",
  description:
    "Current web development offers and packages from Khalil AbdalMageed. Transparent pricing for restaurant websites, ecommerce platforms, and custom web applications.",
  openGraph: {
    title: "Web Development Offers | Khalil AbdalMageed",
    description:
      "Current web development offers with transparent pricing for restaurant websites, ecommerce platforms, and custom applications.",
    url: "https://www.khalil.mageed.net/offers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Offers | Khalil AbdalMageed",
    description:
      "Transparent pricing for restaurant websites, ecommerce platforms, and custom applications.",
  },
  alternates: {
    canonical: "/offers",
  },
};

export default function OffersPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-1800px mx-auto">
        <OfferList offers={offers} />
      </div>
    </main>
  );
}
