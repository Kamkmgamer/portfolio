import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What a $100 Website Actually Gets You",
  description:
    "A $100 website works. It's not broken. It just doesn't do much. Here's the honest breakdown of what that budget delivers - nothing more, nothing less.",
  openGraph: {
    title: "What a $100 Website Actually Gets You",
    description:
      "A $100 website works. It's not broken. It just doesn't do much. Here's the honest breakdown.",
    url: "https://www.khalil.mageed.net/blog/what-100-dollar-website-gets-you",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "What a $100 Website Actually Gets You",
    description:
      "A $100 website works. It's not broken. It just doesn't do much. Here's the honest breakdown.",
  },
  alternates: {
    canonical: "/blog/what-100-dollar-website-gets-you",
  },
};

export default function What100DollarWebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
