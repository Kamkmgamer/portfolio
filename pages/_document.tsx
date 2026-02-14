import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        {/* PWA: Manifest & Theme */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect for ImageKit */}
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

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/icon-192x192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icons/icon-512x512.png" />

        {/* SEO Meta - Handled by Metadata API in App Router but kept here for Pages Router fallback */}
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Khalil AbdalMageed's Portfolio - Web Developer & Designer. Specializing in Next.js, React, and modern responsive design."
        />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Khalil AbdalMageed | Portfolio" />
        <meta
          property="og:description"
          content="Explore Khalil AbdalMageed's portfolio of SEO-friendly, responsive websites built with React and Next.js."
        />
        <meta property="og:image" content="/images/og-image.png" />
        <meta property="og:url" content="https://www.khalil.mageed.net" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Khalil AbdalMageed | Portfolio" />
        <meta
          name="twitter:description"
          content="Modern responsive web development and design by Khalil AbdalMageed."
        />
        <meta name="twitter:image" content="/images/og-image.png" />
      </Head>
      <body className="antialiased bg-background text-text relative font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
