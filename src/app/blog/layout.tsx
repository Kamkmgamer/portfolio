import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on web development, design systems, performance optimization, and building products that matter. Insights from Khalil AbdalMageed's experience building web applications.",
  openGraph: {
    title: "Blog | Khalil AbdalMageed",
    description:
      "Articles on web development, design systems, performance optimization, and building products that matter.",
    url: "https://www.khalil.mageed.net/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Khalil AbdalMageed",
    description:
      "Articles on web development, design systems, and building products that matter.",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
