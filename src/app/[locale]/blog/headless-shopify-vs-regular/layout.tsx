import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Headless Shopify vs Regular Shopify: The Honest Difference",
    description:
        "Is headless Shopify actually better? A clear, honest breakdown of when to use headless vs regular Shopify - with no hype, just the real trade-offs.",
    openGraph: {
        title: "Headless Shopify vs Regular Shopify: The Honest Difference",
        description:
            "When headless makes sense and when it doesn't. Clear explanation, honest comparison, practical guidance.",
        url: "https://www.khalil.mageed.net/blog/headless-shopify-vs-regular",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Headless Shopify vs Regular Shopify: The Honest Difference",
        description:
            "When headless makes sense and when it doesn't. Clear explanation, honest comparison, practical guidance.",
    },
    alternates: {
        canonical: "/blog/headless-shopify-vs-regular",
    },
};

export default function HeadlessShopifyVsRegularLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
