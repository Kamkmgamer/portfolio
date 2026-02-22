import React from "react";
import type { Metadata } from "next";
import ProjectList from "@/components/ProjectList";
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
    title: dict.projects.title,
    description: dict.projects.description,
    openGraph: {
      title: `${dict.projects.title} | Khalil AbdalMageed`,
      description: dict.projects.description,
      url: `https://www.khalil.mageed.net/${locale}/projects`,
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.projects.title} | Khalil AbdalMageed`,
      description: dict.projects.description,
    },
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        en: "/en/projects",
        ar: "/ar/projects",
      },
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: {
        id: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-1800px mx-auto">
        <ProjectList projects={projects} dict={dict} />

        <div className="mt-20 flex justify-center">
          <a
            href={`/${locale}/offers`}
            className="px-8 py-4 border border-white/10 hover:border-[hsl(var(--accent-gold))] text-text/60 hover:text-[hsl(var(--accent-gold))] transition-all duration-300 uppercase tracking-widest text-sm"
          >
            {dict.projects.viewPastOffers}
          </a>
        </div>
      </div>
    </main>
  );
}
