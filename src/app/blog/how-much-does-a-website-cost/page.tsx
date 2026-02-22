import type { Metadata } from "next";
import HowMuchDoesAWebsiteCostPage from "./page-client";

export const metadata: Metadata = {
  title: "How Much Does a Website Cost? $20 to $10,000 Compared",
  description:
    "See exactly what different website budgets buy. Live demos of $20, $100, $500, $1,000, $5,000, and $10,000 websites for restaurants and ecommerce. Honest comparison with real examples.",
  keywords: [
    "how much does a website cost",
    "website cost",
    "website pricing",
    "how much is a website",
    "website cost 2024",
    "website cost 2025",
    "restaurant website cost",
    "ecommerce website cost",
    "small business website cost",
    "website development cost",
  ],
  openGraph: {
    title: "How Much Does a Website Cost? $20 to $10,000 Compared",
    description:
      "See exactly what different website budgets buy. Live demos comparing $20 to $10,000 websites.",
    url: "https://www.khalil.mageed.net/blog/how-much-does-a-website-cost",
    type: "article",
    authors: ["Khalil AbdalMageed"],
    section: "Web Development",
    tags: [
      "website cost",
      "website pricing",
      "web development",
      "small business",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Much Does a Website Cost? $20 to $10,000 Compared",
    description:
      "See exactly what different website budgets buy. Live demos comparing $20 to $10,000 websites.",
  },
  alternates: {
    canonical: "/blog/how-much-does-a-website-cost",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Much Does a Website Cost? $20 to $10,000 Compared",
  description:
    "See exactly what different website budgets buy. Live demos of $20, $100, $500, $1,000, $5,000, and $10,000 websites for restaurants and ecommerce.",
  author: {
    "@type": "Person",
    name: "Khalil AbdalMageed",
    url: "https://www.khalil.mageed.net",
  },
  publisher: {
    "@type": "Person",
    name: "Khalil AbdalMageed",
    url: "https://www.khalil.mageed.net",
  },
  datePublished: "2026-02-22",
  dateModified: "2026-02-22",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.khalil.mageed.net/blog/how-much-does-a-website-cost",
  },
  image: "https://www.khalil.mageed.net/blog/how-much-does-a-website-cost/og.png",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a website cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Website costs range from $20 to $10,000+ depending on features. A basic professional website costs $200-$500. Ecommerce sites start at $500. Custom business websites with advanced features cost $1,000-$5,000. Enterprise solutions start at $10,000.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a restaurant website cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Restaurant websites cost $200-$2,000 for most independent restaurants. A basic site with menu and contact info costs $200-$500. Sites with reservations and online ordering cost $1,000-$2,000. Multi-location restaurants need $5,000+.",
      },
    },
    {
      "@type": "Question",
      name: "How much does an ecommerce website cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ecommerce websites cost $500-$10,000+. A basic store with checkout costs $500-$1,000. Stores with inventory management and payment processing cost $1,000-$5,000. Custom platforms with advanced features cost $5,000-$10,000+.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cheapest way to get a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cheapest options are free Google Business Profile for local businesses, or $20 WordPress hosting for basic sites. However, these have significant limitations. For a real business, budget at least $200-$500 for a professional result.",
      },
    },
    {
      "@type": "Question",
      name: "Why do some websites cost $10,000?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "$10,000 websites include custom design, advanced features like real-time ordering, customer accounts, loyalty programs, multi-language support, and payment integrations. You own the technology instead of renting from platforms like Shopify. For high-volume businesses, this investment pays for itself.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HowMuchDoesAWebsiteCostPage />
    </>
  );
}
