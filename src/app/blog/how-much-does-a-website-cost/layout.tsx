import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Much Does a Website Cost? $20 to $10,000 Compared",
  description:
    "See exactly what different website budgets buy. Live demos of $20, $100, $500, $1,000, $5,000, and $10,000 websites for restaurants and ecommerce. Honest comparison with real examples.",
  alternates: {
    canonical: "/blog/how-much-does-a-website-cost",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
