/** Single source of truth for identity and contact details used across the site. */
export const site = {
  name: { en: "Khalil AbdalMageed", ar: "خليل عبد المجيد" },
  shortName: { en: "Khalil", ar: "خليل" },
  email: "khalil@khalil.mageed.net",
  phone: "+20 15 00 4055 67",
  phoneHref: "tel:+201500405567",
  timeZone: "Africa/Cairo",
  since: 2018,
  socials: [
    { label: "GitHub", href: "https://github.com/Kamkmgamer" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kamkm-gamer/" },
    { label: "X", href: "https://twitter.com/kamkmgamer" },
    {
      label: "Fiverr",
      href: "https://www.fiverr.com/khalilmageed/design-and-build-an-award-winning-style-website",
    },
  ],
} as const;
