import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why a $20 Website Will Cost You Thousands",
  description:
    "A $20 website doesn't just look cheap, it actively repels customers. Here's what that $20 actually costs you in lost trust, lost customers, and paying twice.",
  openGraph: {
    title: "Why a $20 Website Will Cost You Thousands",
    description:
      "A $20 website actively repels customers. Here's what that $20 actually costs you.",
    url: "https://www.khalil.mageed.net/blog/why-not-to-buy-cheap-websites",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why a $20 Website Will Cost You Thousands",
    description:
      "A $20 website actively repels customers. Here's what that $20 actually costs you.",
  },
  alternates: {
    canonical: "/blog/why-not-to-buy-cheap-websites",
  },
};

export default function CheapWebsitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
