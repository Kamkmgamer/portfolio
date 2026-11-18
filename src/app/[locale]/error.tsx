"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { isLocale, type Locale } from "@/i18n.config";
import { stagger } from "@/components/site/layout";

// Error boundaries must be client components and receive no params, so the copy lives here.
const COPY: Record<Locale, { title: string; body: string; retry: string; home: string }> = {
  en: {
    title: "This page didn't load.",
    body: "It's on my side, not yours. Try again, and if it keeps happening, the home page is a safe place to start.",
    retry: "Try again",
    home: "Back to home",
  },
  ar: {
    title: "تعذّر تحميل هذه الصفحة.",
    body: "المشكلة من جهتي وليست من جهتك. حاول مرة أخرى، وإن تكرر الأمر فالصفحة الرئيسية مكان آمن للبدء.",
    retry: "حاول مرة أخرى",
    home: "العودة إلى الرئيسية",
  },
};

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams<{ locale?: string }>();
  const locale: Locale = isLocale(params?.locale) ? params.locale : "en";
  const t = COPY[locale];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section role="alert" className="container-site flex min-h-[70dvh] flex-col justify-center py-[clamp(4rem,10vw,8rem)]">
      <h1 className="text-h1 enter max-w-[18ch]" style={stagger(1)}>
        {t.title}
      </h1>
      <p className="text-lead enter mt-6 max-w-[46ch]" style={stagger(2)}>
        {t.body}
      </p>
      <div className="enter mt-10 flex flex-wrap gap-3" style={stagger(3)}>
        <button type="button" onClick={reset} className="btn btn-primary btn-lg">
          <RotateCcw aria-hidden="true" strokeWidth={1.75} />
          {t.retry}
        </button>
        <Link href={`/${locale}`} className="btn btn-secondary btn-lg">
          {t.home}
        </Link>
      </div>
      {error.digest && (
        <p className="mt-10 font-mono text-xs text-muted" dir="ltr">
          ref: {error.digest}
        </p>
      )}
    </section>
  );
}
