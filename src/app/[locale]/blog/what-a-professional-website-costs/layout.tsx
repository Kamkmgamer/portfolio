import type { Metadata } from "next";
import { Locale } from "@/i18n.config";
import { buildLocalizedMetadata } from "@/lib/seo";

const articlePath = "/blog/what-a-professional-website-costs";

const baseMetadata: Metadata = {
    title: "What a Professional Website Actually Costs ($200-$500)",
    description:
        "The $200-$500 range is where websites stop being costs and start being investments. Here's what each budget delivers, with live demos to prove it.",
    openGraph: {
        title: "What a Professional Website Actually Costs ($200-$500)",
        description:
            "The $200-$500 range is where websites become investments. Live demos, honest comparison, clear guidance.",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "What a Professional Website Actually Costs ($200-$500)",
        description:
            "The $200-$500 range is where websites become investments. Live demos, honest comparison, clear guidance.",
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

export default function WhatAProfessionalWebsiteCostsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
