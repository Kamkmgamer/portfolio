---
version: 1
slug: "src-app-locale-page-client-tsx"
primary_target: "src/app/[locale]/page-client.tsx"
related_targets: ["src/app/[locale]/page.tsx","src/components/Navbar.tsx","src/app/globals.css"]
---

# Homepage surface brief

Scope: `/[locale]` homepage (src/app/[locale]/page.tsx, page-client.tsx) and the shared shell (Navbar, ThemeToggle, LanguageSwitcher, globals.css, locale layout). Mode: Persuade.

Audience and job: founders, agencies, and product teams comparing several freelance builders, usually after hours on a laptop; secondary, local businesses in Cairo. They need to know within seconds what Khalil ships, see proof, and find the route to contact.

Action: "start a project" (contact) is primary; "see the work" (projects) is secondary. Proof: real project screenshots from the Prisma `Project` table (AI/SaaS first), the Fiverr testimonial, and two experience entries from the dictionary.

Constraints: EN and AR parity with mirrored crop edge; dictionaries share one type so both JSON files change together; DB may be unreachable locally, so the page must compose with zero projects; reduced-motion removes glide-in and flips.

Chosen direction: Metro typographic tiles. First viewport is a giant lowercase statement cropped at the trailing edge with a peeking column of project tiles; the rest of the page is hub sections (work panorama, who i help tiles, story list, testimonial tile, contact tile) built from varied tile sizes. Memorable moment: the staggered glide-in on load plus live tiles that flip to reveal their peek line.

Unresolved: whether to add live counts (demos, case studies, articles) to tiles once a stable source exists; dark default is chosen from the use scene, light theme remains available.
