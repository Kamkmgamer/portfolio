import type { Metadata } from "next";
import { Locale } from "@/i18n.config";
import { buildLocalizedMetadata } from "@/lib/seo";

const articlePath = "/case-studies/reducing-friction";

const baseMetadata: Metadata = {
  title: "Reducing Friction: A Premium Web Design Case Study",
  description:
    "How I transformed a client's digital presence by focusing on human experience first. No mockups until clarity was achieved. An emotion-driven design approach.",
  openGraph: {
    title: "Reducing Friction: A Premium Web Design Case Study",
    description:
      "How I transformed a client's digital presence by focusing on human experience first. An emotion-driven design approach.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reducing Friction: A Premium Web Design Case Study",
    description:
      "How I transformed a client's digital presence by focusing on human experience first.",
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

export default function ReducingFrictionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
