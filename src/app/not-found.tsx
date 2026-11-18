import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

/**
 * Last-resort 404 for paths the locale middleware skips (e.g. URLs containing a dot).
 * The root layout is a pass-through, so this page owns <html> and <body>.
 */
export default function RootNotFound() {
  return (
    <html lang="en" dir="ltr">
      <head>
        <script
          // Match the visitor's OS theme; there is no theme provider outside the locale layout.
          dangerouslySetInnerHTML={{
            __html:
              "try{if(matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-paper font-sans text-ink antialiased">
        <main className="container-site flex flex-1 flex-col justify-center py-24">
          <h1 className="text-display max-w-[14ch]">This page doesn&rsquo;t exist.</h1>
          <p className="text-lead mt-6 max-w-[46ch]">
            The link may be broken, or the page may have moved.
            <span lang="ar" dir="rtl" className="mt-2 block">
              الصفحة غير موجودة.
            </span>
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/en" className="btn btn-primary btn-lg">
              Back to home
            </Link>
            <Link href="/ar" lang="ar" className="btn btn-secondary btn-lg">
              الصفحة الرئيسية
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
