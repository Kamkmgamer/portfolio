import React from "react";
import OfferList from "@/components/OfferList";
import { offers } from "@/data/offers";

export default function OffersPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-1800px mx-auto">
        <OfferList offers={offers} />
      </div>
    </main>
  );
}
