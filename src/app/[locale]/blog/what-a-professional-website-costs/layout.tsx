import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "What a Professional Website Actually Costs ($200-$500)",
    description:
        "The $200-$500 range is where websites stop being costs and start being investments. Here's what each budget delivers, with live demos to prove it.",
    openGraph: {
        title: "What a Professional Website Actually Costs ($200-$500)",
        description:
            "The $200-$500 range is where websites become investments. Live demos, honest comparison, clear guidance.",
        url: "https://www.khalil.mageed.net/blog/what-a-professional-website-costs",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "What a Professional Website Actually Costs ($200-$500)",
        description:
            "The $200-$500 range is where websites become investments. Live demos, honest comparison, clear guidance.",
    },
    alternates: {
        canonical: "/blog/what-a-professional-website-costs",
    },
};

export default function WhatAProfessionalWebsiteCostsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
