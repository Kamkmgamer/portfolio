import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "What Is Headless Shopify? Meaning, Benefits & SEO Comparison (2026)",
    description:
        "What is headless Shopify meaning explained simply. Compare headless vs regular Shopify for SEO, performance, and design control. Learn which is better for your store.",
    openGraph: {
        title: "What Is Headless Shopify? Complete Meaning & Comparison Guide",
        description:
            "Understand headless Shopify meaning and how it compares to regular Shopify. Covers SEO benefits, performance, and when to choose each option.",
        url: "https://www.khalil.mageed.net/blog/headless-shopify-vs-regular",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "What Is Headless Shopify? Meaning, Benefits & SEO Comparison (2026)",
        description:
            "What is headless Shopify meaning explained simply. Compare headless vs regular Shopify for SEO, performance, and design control.",
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
