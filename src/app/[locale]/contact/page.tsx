import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n/server";
import { buildLocalizedMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { ArrowOut } from "@/components/site/icons";
import { stagger } from "@/components/site/layout";
import { LocalTime } from "@/components/site/FooterClient";
import { ContactForm, CopyEmail } from "./contact-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "تواصل" : "Contact";
  const description =
    locale === "ar"
      ? "تواصل مع خليل عبدالمجيد لمشاريع تطوير المواقع والتجارة الإلكترونية ومواقع الأعمال."
      : "Get in touch with Khalil AbdalMageed for web development, ecommerce, and business website projects.";

  return buildLocalizedMetadata(locale, "/contact", {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const c = dict.contact;

  return (
    <div className="container-site pb-[var(--section-y)] pt-[clamp(3rem,8vw,6.5rem)]">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h1 className="text-h1 enter max-w-[14ch]" style={stagger(1)}>
            {c.heading}
          </h1>
          <p className="text-lead enter mt-6 max-w-[44ch]" style={stagger(2)}>
            {c.lead}
          </p>

          <dl className="enter mt-12 divide-y divide-line border-y border-line" style={stagger(3)}>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5">
              <div className="min-w-0">
                <dt className="flex items-center gap-2 text-sm text-muted">
                  <Mail aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  {c.email}
                </dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${site.email}`} dir="ltr" className="link-quiet break-all text-lg font-medium text-ink">
                    {site.email}
                  </a>
                </dd>
              </div>
              <CopyEmail label={c.copy} copiedLabel={c.copied} ariaLabel={c.copyEmail} />
            </div>
            <div className="py-5">
              <dt className="flex items-center gap-2 text-sm text-muted">
                <Phone aria-hidden="true" className="size-4" strokeWidth={1.75} />
                {c.phone}
              </dt>
              <dd className="mt-1.5">
                <a href={site.phoneHref} dir="ltr" className="link-quiet tabular text-lg font-medium text-ink">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div className="py-5">
              <dt className="flex items-center gap-2 text-sm text-muted">
                <MapPin aria-hidden="true" className="size-4" strokeWidth={1.75} />
                {c.location}
              </dt>
              <dd className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="text-lg font-medium text-ink">{c.locationValue}</span>
                <LocalTime locale={locale} label={dict.footer.localTime} />
              </dd>
            </div>
          </dl>

          <div className="enter mt-10" style={stagger(4)}>
            <h2 className="text-sm text-muted">{c.socials}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm group">
                    {s.label}
                    <ArrowOut className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="enter lg:col-span-7 lg:ps-6" style={stagger(2)}>
          <ContactForm t={c.form} />
        </div>
      </div>
    </div>
  );
}
