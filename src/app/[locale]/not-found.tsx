import en from "@/lib/i18n/dictionaries/en.json";
import ar from "@/lib/i18n/dictionaries/ar.json";
import { NotFoundView, type NotFoundCopy } from "./not-found-view";

const pick = (d: typeof en): NotFoundCopy => ({
  ...d.notFound,
  links: [
    { href: "/projects", label: d.nav.projects },
    { href: "/case-studies", label: d.nav.caseStudies },
    { href: "/blog", label: d.nav.blog },
    { href: "/contact", label: d.nav.contact },
  ],
});

const copy = { en: pick(en), ar: pick(ar) };

export default function NotFound() {
  return <NotFoundView copy={copy} />;
}
