import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, isLocale } from './src/i18n.config';

const LOCALE_COOKIE = 'NEXT_LOCALE';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/apple-touch-icon') ||
    pathname.startsWith('/site.webmanifest')
  ) {
    return;
  }

  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) {
    const response = NextResponse.next();
    const existingLocale = request.cookies.get(LOCALE_COOKIE)?.value;

    if (existingLocale !== pathnameLocale) {
      response.cookies.set(LOCALE_COOKIE, pathnameLocale, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
        sameSite: 'lax',
      });
    }
    return response;
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    const newUrl = new URL(`/${cookieLocale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  const acceptLanguage = request.headers.get('accept-language');
  let preferredLocale = defaultLocale;

  if (acceptLanguage) {
    const acceptedLocales = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().substring(0, 2));

    for (const lang of acceptedLocales) {
      if (lang === 'ar') {
        preferredLocale = 'ar';
        break;
      }
    }
  }

  const newUrl = new URL(`/${preferredLocale}${pathname}`, request.url);
  const response = NextResponse.redirect(newUrl);
  response.cookies.set(LOCALE_COOKIE, preferredLocale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon|apple-touch-icon|site\\.webmanifest|.*\\..*).*)',
  ],
};
