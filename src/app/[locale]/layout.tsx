import type { Metadata, Viewport } from 'next';
import { Mona_Sans, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';
import '../globals.css';
import { Providers } from '../providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/site/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { locales, localeDirections, type Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/i18n/server';
import { SITE_URL, buildLocalizedAbsoluteUrl, getOpenGraphLocale } from '@/lib/seo';

/* Three families: Mona Sans (Latin display + text), IBM Plex Mono (metadata),
   IBM Plex Sans Arabic (Arabic). Arabic glyphs fall through from Mona Sans. */
const mona = Mona_Sans({
  variable: '--font-mona',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  preload: false,
  // No metric fallback: an Arial fallback would capture Arabic glyphs before Plex Arabic.
  adjustFontFallback: false,
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: '--font-plex-ar',
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
  // Arabic subset only: without a metric fallback, Latin glyphs fall through to Mona Sans.
  adjustFontFallback: false,
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: {
      default: dict.metadata.title.default,
      template: dict.metadata.title.template,
    },
    description: dict.metadata.description,
    metadataBase: new URL(SITE_URL),
    applicationName: 'Khalil AbdalMageed Portfolio',
    authors: [{ name: 'Khalil AbdalMageed', url: 'https://www.khalil.mageed.net' }],
    generator: 'Next.js',
    keywords: [
      'Khalil', 'Khaleel', 'Khalil', 'Kalil', 'Halfil', 'Khalill',
      'Mageed', 'Majeed', 'Magid', 'Majid', 'Madjeed', 'Majid', 'Maged',
      'Khalil Mageed', 'Khalil Majeed', 'Khalil Magid', 'Khalil Majid',
      'Khaleel Mageed', 'Khaleel Majeed', 'Khaleel Magid', 'Khaleel Majid',
      'Kalil Mageed', 'Kalil Majeed',
      'Khalil AbdalMageed', 'Khalil AbdalMajeed',
      'Khalil AbdulMageed', 'Khalil AbdulMajeed', 'Khalil AbdulMajid', 'Khalil AbdulMagid',
      'Khalil AbdelMageed', 'Khalil AbdelMajeed', 'Khalil Abdelmageed', 'Khalil Abdelmajeed',
      'Khalil Abdelmagid', 'Khalil Abdelmajid',
      'Khalil Abd Almageed', 'Khalil Abd Almajeed', 'Khalil Abd Al-Mageed', 'Khalil Abd Al-Majeed',
      'Khalil Abd-Al-Mageed', 'Khalil Abd-Almageed',
      'Khalil Abdalmageed', 'Khalil Abdalmajeed',
      'Khaleel AbdalMageed', 'Khaleel AbdalMajeed', 'Khaleel Abd Almageed',
      'Khaleel Abdelmageed', 'Khaleel Abdelmajeed',
      'خليل مجيد', 'خليل عبد المجيد', 'خليل عبدالمجيد',
      'خليل ماجد', 'خليل عبد الماجد', 'خليل عبدالماجد',
      'Web Developer', 'React Developer', 'Next.js Developer',
      'Frontend Engineer', 'UI/UX Designer', 'Portfolio',
      'AI App Interface Developer', 'SaaS Feature Developer',
      'JavaScript', 'TypeScript',
      'Web Developer Cairo', 'Web Developer Egypt', 'React Developer Cairo',
      'Next.js Developer Egypt', 'Frontend Developer Cairo', 'Freelance Web Developer Cairo',
      'Website Developer Cairo', 'Website Developer Egypt', 'Egypt Web Developer',
      'Cairo Web Developer', 'AI Product Demos', 'SaaS Interfaces',
      'مطور ويب القاهرة', 'مصمم مواقع مصر', 'مطور تطبيقات الذكاء الاصطناعي',
    ],
    referrer: 'origin-when-cross-origin',
    creator: 'Khalil AbdalMageed',
    publisher: 'Khalil AbdalMageed',
    openGraph: {
      title: {
        default: dict.metadata.title.default,
        template: dict.metadata.title.template,
      },
      description: dict.metadata.description,
      siteName: 'Khalil AbdalMageed Portfolio',
      locale: getOpenGraphLocale(locale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        default: dict.metadata.title.default,
        template: dict.metadata.title.template,
      },
      description: dict.metadata.description,
      site: '@kamkmgamer',
      creator: '@kamkmgamer',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      // sizes="32x32" on the ICO keeps Chromium from preferring it over the adaptive SVG.
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    },
    manifest: '/site.webmanifest',
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const direction = localeDirections[locale];
  const dict = await getDictionary(locale);
  const localizedHomepageUrl = buildLocalizedAbsoluteUrl(locale);

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://www.khalil.mageed.net/#person',
        name: 'Khalil AbdalMageed',
        alternateName: [
          // Short form — first name + Mageed/Majeed
          'Khalil Mageed', 'Khalil Majeed', 'Khalil Magid', 'Khalil Majid',
          'Khaleel Mageed', 'Khaleel Majeed', 'Khaleel Magid', 'Khaleel Majid',
          'Kalil Mageed', 'Kalil Majeed',
          // Long form — full name with Abd prefix variants
          'Khalil AbdalMageed', 'Khalil AbdalMajeed',
          'Khalil AbdulMageed', 'Khalil AbdulMajeed', 'Khalil AbdulMajid', 'Khalil AbdulMagid',
          'Khalil AbdelMageed', 'Khalil AbdelMajeed',
          'Khalil Abdelmageed', 'Khalil Abdelmajeed', 'Khalil Abdelmagid', 'Khalil Abdelmajid',
          'Khalil Abd Almageed', 'Khalil Abd Almajeed',
          'Khalil Abd Al-Mageed', 'Khalil Abd Al-Majeed',
          'Khalil Abdalmageed', 'Khalil Abdalmajeed',
          // Khaleel first name variants with long form
          'Khaleel AbdalMageed', 'Khaleel AbdalMajeed',
          'Khaleel Abd Almageed', 'Khaleel Abdelmageed',
          // Arabic
          'خليل مجيد', 'خليل عبد المجيد', 'خليل عبدالمجيد',
          'خليل ماجد', 'خليل عبد الماجد', 'خليل عبدالماجد',
        ],
        url: 'https://www.khalil.mageed.net',
        image: 'https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/image.png',
        sameAs: [
          'https://twitter.com/kamkmgamer',
          'https://github.com/Kamkmgamer',
          'https://www.linkedin.com/in/kamkm-gamer/',
        ],
        jobTitle: 'Web Developer',
        description: 'Khalil AbdalMageed (also spelled Khalil Mageed, Khalil Majeed, or Khalil AbdalMajeed) is a web developer based in Cairo, Egypt, specializing in AI app interfaces, product demos, and SaaS features built with Next.js and TypeScript.',
        nationality: { '@type': 'Country', name: 'Sudan' },
        knowsLanguage: ['en', 'ar'],
        worksFor: {
          '@type': 'Organization',
          name: 'Freelance',
        },
      },
      {
        '@type': 'WebSite',
        name: 'Khalil AbdalMageed Portfolio',
        url: 'https://www.khalil.mageed.net',
        inLanguage: locale,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${localizedHomepageUrl}?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.khalil.mageed.net/#business',
        name: 'Khalil AbdalMageed Web Development',
        description: 'Professional web development services in Cairo, Egypt. Specializing in AI app interfaces, product demos, and SaaS features built with Next.js and TypeScript.',
        url: 'https://www.khalil.mageed.net',
        telephone: '+20-15-00-4055-67',
        email: 'khalil@khalil.mageed.net',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Cairo',
          addressCountry: 'EG',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Egypt',
        },
        priceRange: '$$',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'],
          opens: '09:00',
          closes: '18:00',
        },
        sameAs: [
          'https://twitter.com/kamkmgamer',
          'https://github.com/Kamkmgamer',
          'https://www.linkedin.com/in/kamkm-gamer/',
        ],
      },
    ],
  };

  return (
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
      className={`${mona.variable} ${plexMono.variable} ${plexArabic.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
        <meta name="theme-color" content="#f7f6f2" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0e0d0b" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="flex min-h-dvh flex-col bg-paper font-sans text-ink antialiased">
        <JsonLd data={jsonLdData} />
        <Providers>
          <a href="#main" className="skip-link">
            {dict.common.skipToContent}
          </a>
          <Navbar locale={locale} dict={dict} />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer locale={locale} dict={dict} />
        </Providers>
      </body>
    </html>
  );
}
