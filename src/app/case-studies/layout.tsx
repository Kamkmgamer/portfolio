import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Deep-dives into specific projects that demonstrate architectural complexity, speed of delivery, and measurable business outcomes. See how different budgets translate to different results.",
  openGraph: {
    title: "Case Studies | Khalil AbdalMageed",
    description:
      "Deep-dives into projects demonstrating architectural complexity, speed of delivery, and measurable business outcomes.",
    url: "https://www.khalil.mageed.net/case-studies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Khalil AbdalMageed",
    description:
      "Deep-dives into projects demonstrating architectural complexity and measurable business outcomes.",
  },
  alternates: {
    canonical: "/case-studies",
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
