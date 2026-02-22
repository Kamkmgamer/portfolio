import React from "react";
import type { Metadata } from "next";
import DemoList from "@/components/DemoList";
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
    title: dict.demos.title,
    description: dict.demos.description,
    openGraph: {
      title: `${dict.demos.title} | Khalil AbdalMageed`,
      description: dict.demos.description,
      url: `https://www.khalil.mageed.net/${locale}/demos`,
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.demos.title} | Khalil AbdalMageed`,
      description: dict.demos.description,
    },
    alternates: {
      canonical: `/${locale}/demos`,
      languages: {
        en: "/en/demos",
        ar: "/ar/demos",
      },
    },
  };
}

export default async function DemosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  let demos: Awaited<ReturnType<typeof prisma.demo.findMany>> = [];
  try {
    demos = await prisma.demo.findMany({
      orderBy: {
        id: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch demos:", error);
  }

  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-1800px mx-auto">
        <DemoList demos={demos} dict={dict} />
      </div>
    </main>
  );
}
