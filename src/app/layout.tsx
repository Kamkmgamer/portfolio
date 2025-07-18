import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Spotlight from "@/components/Spotlight";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khalil Abdel Majeed | Web Developer & Designer",
  description:
    "Portfolio of Khalil Abdel Majeed, a web developer and designer specializing in Next.js, React, and modern responsive design.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "Khalil Abdel Majeed | Web Developer & Designer",
    description:
      "Explore Khalil Abdel Majeed’s portfolio of SEO-friendly, responsive websites built with React and Next.js.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Khalil Abdel Majeed Portfolio",
    images: [
      {
        url: "/images/projects/softmedics.png",
        width: 1200,
        height: 630,
        alt: "Khalil Abdel Majeed Portfolio Homepage",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@kamkmgamer",
    creator: "@kamkmgamer",
    title: "Khalil Abdel Majeed | Web Developer & Designer",
    description:
      "Modern responsive web development and design by Khalil Abdel Majeed.",
    images: ["https://photos.app.goo.gl/wS27crmYAs3ZUi9o7"],
  },
  authors: [
    {
      name: "Khalil Abdel Majeed",
      url: "https://khalil.excellence.sd",
    },
  ],
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="theme-color"
          content="#f9fafb"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#0f172a"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark relative`}
      >
        <Providers>
          <Spotlight />
          {children}
        </Providers>
      </body>
    </html>
  );
}
