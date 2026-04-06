import type { Metadata } from "next";
import type { Locale } from "@/i18n.config";

const DEFAULT_SITE_URL = "https://www.khalil.mageed.net";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
).replace(/\/$/, "");

export function buildLocalizedPath(locale: Locale, pathname = ""): string {
  const trimmedPath = pathname.replace(/^\/+|\/+$/g, "");
  return trimmedPath ? `/${locale}/${trimmedPath}` : `/${locale}`;
}

export function buildAbsoluteUrl(pathname = "/"): string {
  return new URL(pathname, `${SITE_URL}/`).toString();
}

export function buildLocalizedAbsoluteUrl(
  locale: Locale,
  pathname = "",
): string {
  return buildAbsoluteUrl(buildLocalizedPath(locale, pathname));
}

export function buildAlternates(
  locale: Locale,
  pathname = "",
): NonNullable<Metadata["alternates"]> {
  const englishPath = buildLocalizedPath("en", pathname);
  const arabicPath = buildLocalizedPath("ar", pathname);

  return {
    canonical: buildLocalizedPath(locale, pathname),
    languages: {
      en: englishPath,
      ar: arabicPath,
      "x-default": englishPath,
    },
  };
}

export function getOpenGraphLocale(locale: Locale): string {
  return locale === "ar" ? "ar_EG" : "en_US";
}

export function buildLocalizedMetadata(
  locale: Locale,
  pathname: string,
  metadata: Metadata,
): Metadata {
  return {
    ...metadata,
    alternates: buildAlternates(locale, pathname),
    openGraph: metadata.openGraph
      ? {
          ...metadata.openGraph,
          url: buildLocalizedAbsoluteUrl(locale, pathname),
          locale: metadata.openGraph.locale ?? getOpenGraphLocale(locale),
        }
      : undefined,
  };
}
