import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { DynamicSpotlight } from "@/lib/dynamic-imports";
import Navbar from "@/components/Navbar";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'optional',
  preload: true,
  adjustFontFallback: true,
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: 'optional',
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "Khalil Abd Almageed | Web Developer & Designer",
    template: "%s | Khalil Abd Almageed",
  },
  description:
    "Portfolio of Khalil Abd Almageed, a web developer and designer specializing in Next.js, React, and modern responsive design. delivering high-performance, SEO-friendly web solutions.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://khalil.mageed.net"
  ),
  alternates: {
    canonical: "/",
  },
  applicationName: "Khalil AbdalMageed Portfolio",
  authors: [{ name: "Khalil AbdalMageed", url: "https://khalil.mageed.net" }],
  generator: "Next.js",
  keywords: [
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Frontend Engineer",
    "UI/UX Designer",
    "Khalil AbdalMageed",
    "Portfolio",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Khalil AbdalMageed",
  publisher: "Khalil AbdalMageed",
  openGraph: {
    title: {
      default: "Khalil AbdalMageed | Web Developer & Designer",
      template: "%s | Khalil AbdalMageed",
    },
    description:
      "Explore Khalil AbdalMageed’s portfolio of SEO-friendly, responsive websites built with React and Next.js.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://khalil.mageed.net",
    siteName: "Khalil AbdalMageed Portfolio",
    images: [
      {
        url: "/images/og-image.png", // Ensure this exists or fallback to a default
        width: 1200,
        height: 630,
        alt: "Khalil AbdalMageed - Web Developer & Designer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Khalil AbdalMageed | Web Developer & Designer",
      template: "%s | Khalil AbdalMageed",
    },
    description:
      "Modern responsive web development and design by Khalil AbdalMageed. Specializing in high-performance web applications.",
    site: "@kamkmgamer",
    creator: "@kamkmgamer",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import JsonLd from "@/components/seo/JsonLd";

// ... existing imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Khalil AbdalMageed",
        url: "https://khalil.mageed.net",
        sameAs: [
          "https://twitter.com/kamkmgamer",
          "https://github.com/Kamkmgamer",
          "https://www.linkedin.com/in/kamkm-gamer/",
        ],
        jobTitle: "Web Developer",
        image: "https://khalil.mageed.net/images/og-image.png",
        worksFor: {
          "@type": "Organization",
          name: "Freelance",
        },
      },
      {
        "@type": "WebSite",
        name: "Khalil AbdalMageed Portfolio",
        url: "https://khalil.mageed.net",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://khalil.mageed.net/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#050505"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-text relative font-sans`}
      >
        <JsonLd data={jsonLdData} />
        <Providers>
          <Navbar />
          <DynamicSpotlight />
          {children}
        </Providers>
      </body>
    </html>
  );
}
