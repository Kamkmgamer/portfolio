import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reducing Friction: A Premium Web Design Case Study",
  description:
    "How I transformed a client's digital presence by focusing on human experience first. No mockups until clarity was achieved. An emotion-driven design approach.",
  openGraph: {
    title: "Reducing Friction: A Premium Web Design Case Study",
    description:
      "How I transformed a client's digital presence by focusing on human experience first. An emotion-driven design approach.",
    url: "https://www.khalil.mageed.net/case-studies/reducing-friction",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reducing Friction: A Premium Web Design Case Study",
    description:
      "How I transformed a client's digital presence by focusing on human experience first.",
  },
  alternates: {
    canonical: "/case-studies/reducing-friction",
  },
};

export default function ReducingFrictionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
