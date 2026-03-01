import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter, Noto_Naskh_Arabic, IBM_Plex_Sans_Arabic } from 'next/font/google';
import '../globals.css';
import { Providers } from '../providers';
import { DynamicSpotlight } from '@/lib/dynamic-imports';
import Navbar from '@/components/Navbar';
import JsonLd from '@/components/seo/JsonLd';
import { locales, localeDirections, type Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/i18n/server';

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
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
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
      'Restaurant Website Developer', 'Ecommerce Website Developer',
      'JavaScript', 'TypeScript',
      'مطور ويب', 'مصمم مواقع', 'مطور مواقع مطاعم',
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
        description: 'Khalil AbdalMageed (also spelled Khalil Mageed, Khalil Majeed, or Khalil AbdalMajeed) is a web developer based in Cairo, Egypt, specializing in restaurant websites, ecommerce stores, and local business web solutions.',
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
