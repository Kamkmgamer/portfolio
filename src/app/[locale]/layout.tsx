import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter, Noto_Naskh_Arabic, IBM_Plex_Sans_Arabic } from 'next/font/google';
import '../globals.css';
import { Providers } from '../providers';
import { DynamicSpotlight } from '@/lib/dynamic-imports';
import Navbar from '@/components/Navbar';
import JsonLd from '@/components/seo/JsonLd';
import { locales, localeDirections, type Locale } from '@/i18n.config';
import { getDictionary, type Dictionary } from '@/lib/i18n/server';

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'optional',
  preload: true,
  adjustFontFallback: true,
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'optional',
  preload: true,
  adjustFontFallback: true,
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: '--font-display-ar',
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'optional',
  preload: true,
  adjustFontFallback: true,
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: '--font-sans-ar',
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'optional',
  preload: true,
  adjustFontFallback: true,
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
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || 'https://www.khalil.mageed.net'
    ),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
    applicationName: 'Khalil AbdalMageed Portfolio',
    authors: [{ name: 'Khalil AbdalMageed', url: 'https://www.khalil.mageed.net' }],
    generator: 'Next.js',
    keywords: [
      'Web Developer',
      'React Developer',
      'Next.js Developer',
      'Frontend Engineer',
      'UI/UX Designer',
      'Khalil AbdalMageed',
      'Portfolio',
      'JavaScript',
      'TypeScript',
      'Tailwind CSS',
      'مطور ويب',
      'مصمم مواقع',
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
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.khalil.mageed.net',
      siteName: 'Khalil AbdalMageed Portfolio',
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
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
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'Khalil AbdalMageed',
        url: 'https://www.khalil.mageed.net',
        sameAs: [
          'https://twitter.com/kamkmgamer',
          'https://github.com/Kamkmgamer',
          'https://www.linkedin.com/in/kamkm-gamer/',
        ],
        jobTitle: 'Web Developer',
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
          target: 'https://www.khalil.mageed.net/${locale}/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  const fontClasses =
    locale === 'ar'
      ? `${notoNaskhArabic.variable} ${ibmPlexArabic.variable} ${inter.variable}`
      : `${playfair.variable} ${inter.variable}`;

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
        <link rel="alternate" hrefLang="en" href="https://www.khalil.mageed.net/en" />
        <link rel="alternate" hrefLang="ar" href="https://www.khalil.mageed.net/ar" />
        <link rel="alternate" hrefLang="x-default" href="https://www.khalil.mageed.net/en" />
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
        className={`${fontClasses} antialiased bg-background text-text relative font-sans ${locale === 'ar' ? 'font-arabic' : ''}`}
      >
        <JsonLd data={jsonLdData} />
        <Providers>
          <Navbar locale={locale} dict={dict} />
          <DynamicSpotlight />
          {children}
        </Providers>
      </body>
    </html>
  );
}
