import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* PWA: Manifest & Theme */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0f172a" />

        {/* Favicon */}
        <link rel="icon" href="https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/icons/icon-192x192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/icons/icon-512x512.png" />

        {/* SEO Meta */}
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Khalil Abdel Majeed's Portfolio - Web Developer & Designer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Khalil Abdel Majeed | Portfolio" />
        <meta
          property="og:description"
          content="Modern portfolio showcasing Khalil's web development and design skills."
        />
        <meta
          property="og:image"
          content="https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/og-image.png"
        />
        <meta
          property="og:url"
          content="https://khalil-portfolio-qosilljkd.vercel.app"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Khalil Abdel Majeed | Portfolio" />
        <meta
          name="twitter:description"
          content="Modern portfolio showcasing Khalil's web development and design skills."
        />
        <meta
          name="twitter:image"
          content="https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/twitter-image.png"
        />
      </Head>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
