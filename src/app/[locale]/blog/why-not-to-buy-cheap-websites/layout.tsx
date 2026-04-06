import type { Metadata } from "next";
import { Locale } from "@/i18n.config";
import { buildLocalizedMetadata } from "@/lib/seo";

const articlePath = "/blog/why-not-to-buy-cheap-websites";

const baseMetadata: Metadata = {
  title: "Why a $20 Website Will Cost You Thousands",
  description:
    "A $20 website doesn't just look cheap, it actively repels customers. Here's what that $20 actually costs you in lost trust, lost customers, and paying twice.",
  openGraph: {
    title: "Why a $20 Website Will Cost You Thousands",
    description:
      "A $20 website actively repels customers. Here's what that $20 actually costs you.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why a $20 Website Will Cost You Thousands",
    description:
      "A $20 website actively repels customers. Here's what that $20 actually costs you.",
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

export default function CheapWebsitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
