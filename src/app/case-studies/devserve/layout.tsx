import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevServe: Building a Full-Stack Dev Tool in 35 Days",
  description:
    "A solo development case study: building a full-stack developer tool valued at $90k-$130k in just 35 days. Architecture decisions, trade-offs, and lessons learned.",
  openGraph: {
    title: "DevServe: Building a Full-Stack Dev Tool in 35 Days",
    description:
      "A solo development case study: building a full-stack dev tool valued at $90k-$130k in 35 days.",
    url: "https://www.khalil.mageed.net/case-studies/devserve",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevServe: Building a Full-Stack Dev Tool in 35 Days",
    description:
      "Solo development case study: building a dev tool valued at $90k-$130k in 35 days.",
  },
  alternates: {
    canonical: "/case-studies/devserve",
  },
};

export default function DevServeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
