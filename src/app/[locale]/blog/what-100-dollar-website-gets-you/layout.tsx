import type { Metadata } from "next";
import { Locale } from "@/i18n.config";
import { buildLocalizedMetadata } from "@/lib/seo";

const articlePath = "/blog/what-100-dollar-website-gets-you";

const baseMetadata: Metadata = {
  title: "What a $100 Website Actually Gets You",
  description:
    "A $100 website works. It's not broken. It just doesn't do much. Here's the honest breakdown of what that budget delivers - nothing more, nothing less.",
  openGraph: {
    title: "What a $100 Website Actually Gets You",
    description:
      "A $100 website works. It's not broken. It just doesn't do much. Here's the honest breakdown.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "What a $100 Website Actually Gets You",
    description:
      "A $100 website works. It's not broken. It just doesn't do much. Here's the honest breakdown.",
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

export default function What100DollarWebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
