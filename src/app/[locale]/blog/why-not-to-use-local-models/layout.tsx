import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Not to Use Local Models: The Honest Truth",
  description:
    "Local models might seem like a money-saving alternative to Claude Code, but the reality is far more complicated. Here's what those videos aren't telling you.",
  alternates: {
    canonical: "/blog/why-not-to-use-local-models",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
