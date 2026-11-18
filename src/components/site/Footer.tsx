import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site } from "@/data/site";
import { LogoMark } from "./Logo";
import { ThemeSwitcher } from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ArrowOut } from "./icons";
import { FooterCta, LocalTime } from "./FooterClient";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const explore = [
    { label: dict.nav.projects, href: `/${locale}/projects` },
    { label: dict.nav.caseStudies, href: `/${locale}/case-studies` },
    { label: dict.nav.demos, href: `/${locale}/demos` },
    { label: dict.nav.offers, href: `/${locale}/offers` },
    { label: dict.nav.blog, href: `/${locale}/blog` },
    { label: dict.nav.research, href: `/${locale}/research` },
  ];

  return (
    <footer className="site-footer mt-auto">
      <FooterCta locale={locale} dict={dict} />

      <div className="border-t border-line">
        <div className="container-site grid gap-12 py-14 md:grid-cols-12 md:py-16">
          <div className="md:col-span-5">
            <Link href={`/${locale}`} className="inline-flex items-center gap-2.5 rounded-xl">
              <LogoMark className="h-7 text-ink" />
              <span className="font-semibold tracking-[-0.02em] text-ink rtl:tracking-normal">{site.name[locale]}</span>
            </Link>
            <p className="mt-4 max-w-[38ch] text-[0.9375rem] leading-relaxed text-ink-2">{dict.home.hero.lead}</p>
          </div>

          <nav aria-label={dict.footer.explore} className="md:col-span-2">
            <p className="text-sm font-semibold text-ink">{dict.footer.explore}</p>
            <ul className="mt-4 grid gap-2.5">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[0.9375rem] text-ink-2 transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-ink">{dict.footer.connect}</p>
            <ul className="mt-4 grid gap-2.5">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
                  >
                    {s.label}
                    <ArrowOut className="size-3.5 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm font-semibold text-ink">{dict.footer.contact}</p>
            <ul className="mt-4 grid gap-2.5 text-[0.9375rem]">
              <li>
                <a href={`mailto:${site.email}`} className="text-ink-2 transition-colors hover:text-ink">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} dir="ltr" className="text-ink-2 transition-colors hover:text-ink">
                  {site.phone}
                </a>
              </li>
              <li className="text-ink-2">{dict.contact.locationValue}</li>
              <li className="pt-1">
                <LocalTime locale={locale} label={dict.footer.localTime} />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-4 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name[locale]}. {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <LanguageSwitcher currentLocale={locale} className="btn-secondary" />
            <ThemeSwitcher labels={dict.theme} />
          </div>
        </div>
      </div>
    </footer>
  );
}
