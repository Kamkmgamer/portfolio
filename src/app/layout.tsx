import type { Metadata, Viewport } from "next";
import { Playfair_Display, Syne } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/three/ParticleField";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/seo/JsonLd";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Khalil Abd Almageed | Web Developer & Designer",
    template: "%s | Khalil Abd Almageed",
  },
  description:
    "Portfolio of Khalil Abd Almageed, a web developer and designer specializing in Next.js, React, and modern responsive design.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://khalil.mageed.net"
  ),
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
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Khalil AbdalMageed",
        url: "https://khalil.mageed.net",
        jobTitle: "Web Developer",
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${playfair.variable} ${syne.variable} antialiased bg-background text-text selection:bg-ember/30 selection:text-white`}
      >
        <div className="noise-overlay" />
        <JsonLd data={jsonLdData} />
        <ParticleField />
        <SmoothScroll>
          <Providers>
            <Navbar />
            <main className="relative z-10">{children}</main>
          </Providers>
        </SmoothScroll>
      </body>
    </html>
  );
}
