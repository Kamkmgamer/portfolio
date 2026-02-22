import React from "react";
import type { Metadata } from "next";
import ResearchList from "@/components/ResearchList";
import { prisma } from "@/lib/db";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.research.title,
    description: dict.research.description,
    openGraph: {
      title: `${dict.research.title} | Khalil AbdalMageed`,
      description: dict.research.description,
      url: `https://www.khalil.mageed.net/${locale}/research`,
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.research.title} | Khalil AbdalMageed`,
      description: dict.research.description,
    },
    alternates: {
      canonical: `/${locale}/research`,
      languages: {
        en: "/en/research",
        ar: "/ar/research",
      },
    },
  };
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  let researchPapers: Awaited<ReturnType<typeof prisma.research.findMany>> = [];
  try {
    researchPapers = await prisma.research.findMany({
      orderBy: {
        year: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch research papers:", error);
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-800px h-800px bg-[hsl(var(--accent-gold))]/5 rounded-full blur-100px translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-600px h-600px bg-[hsl(var(--accent-bronze))]/5 rounded-full blur-80px -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto">
        <ResearchList researchPapers={researchPapers} dict={dict} />
      </div>
    </main>
  );
}
