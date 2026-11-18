---
name: Khalil AbdalMageed Portfolio
description: A bilingual studio portfolio set like a printed monograph. Warm paper, onyx ink, one bronze signal.
colors:
  paper: "#f7f6f2"
  paper-2: "#efede6"
  card: "#ffffff"
  line: "#e4e1d9"
  line-strong: "#cbc6ba"
  ink: "#16140f"
  ink-2: "#4a463e"
  muted: "#6b675d"
  accent: "#a35400"
  success: "#157a44"
  danger: "#b42318"
  dark-paper: "#0e0d0b"
  dark-paper-2: "#161512"
  dark-card: "#151411"
  dark-line: "#27251f"
  dark-line-strong: "#3b3830"
  dark-ink: "#f3f0e9"
  dark-ink-2: "#c9c4b8"
  dark-muted: "#9a958a"
  dark-accent: "#f2a33a"
  dark-success: "#4ade80"
  dark-danger: "#f87171"
typography:
  body: "Mona Sans, IBM Plex Sans Arabic, ui-sans-serif, system-ui, sans-serif"
  arabic: "IBM Plex Sans Arabic, Mona Sans, ui-sans-serif, sans-serif"
  code: "IBM Plex Mono, IBM Plex Sans Arabic, ui-monospace, monospace"
rounded:
  control: "999px"
  input: "12px"
  card: "18px"
  band: "28px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 2.5rem)"
  container: "77.5rem"
  section-y: "clamp(4.5rem, 9vw, 8rem)"
  nav-h: "4rem"
---

# Design System: Studio Monograph

## North star

**The work should be the loudest thing on the page.** The site reads like a well-set printed monograph about a design-engineering studio. Generous margins, confident type and real screenshots carry it. Decoration is almost absent, so every accent means something.

The visitor should, within seconds:

1. understand what Khalil does,
2. see proof (shipped work, case studies, a real review), and
3. find a clear next step (contact).

English and Arabic carry the same content, hierarchy and interactions. RTL is a mirrored layout, not an afterthought.

## Hard rules

- **No eyebrows.** No small uppercase, letter-spaced or monospace kicker labels above headings, and no numbers stacked above a heading. Headings stand on their own. Real information (a category, a year, a date) goes in sentence-case meta text beside or below the heading, e.g. the `label` column of `IndexRow` or the `MetaRow` under an article title.
- **No status pills.** No "Available for work" chips and no pulsing or pinging status dots.

## Logo

- The brand mark is the geometric "K" monogram, vectorised from the original artwork into `src/components/site/Logo.tsx` (`LogoMark`, plus `LOGO_PATH` / `LOGO_VIEWBOX` for non-React renderers such as the OG cards). A standalone copy lives at `public/logo.svg`.
- It is one colour and inherits `currentColor`: ink in the nav and footer (accent on nav hover), amber on the dark share cards. Inside the site, never place it on a filled tile or add a gradient.
- Minimum size is about 24px tall; below that the inner strokes merge.
- **Browser and app icons** are generated from `LOGO_PATH`, and are the only place the mark sits on a tile:
  - `public/favicon.svg`: the bare mark, ink on light tabs and cream on dark tabs via `prefers-color-scheme`.
  - `public/favicon.ico` (16, 32, 48): amber mark on an onyx rounded tile, for browsers without SVG favicons.
  - `public/apple-touch-icon.png` (180, opaque) and `public/icons/icon-{192x192,512x512}.png`: amber on onyx.
  - `public/icons/icon-maskable-512x512.png`: full-bleed onyx, with the mark inside the 80% safe zone.
  - If the logo changes, regenerate all of them.

## Source of truth

- **Tokens and components:** everything lives in `src/app/globals.css`, using Tailwind v4 with `@theme inline`. `tailwind.config.ts` is not loaded.
- **Light and dark:** light tokens sit on `:root` and dark tokens on `.dark`, which next-themes toggles via `attribute="class"`, with System as the default.
- **Components consume tokens only.** Never write a raw hex or a Tailwind palette colour (`text-gray-500`, `bg-white/10`) in a component.
- **Tailwind names:** `bg-paper`, `bg-paper-2`, `bg-card`, `border-line`, `border-line-strong`, `text-ink`, `text-ink-2`, `text-muted`, `text-accent`, `bg-accent-soft`, `text-success`, `bg-success-soft`, `text-danger`, `bg-danger-soft`.

## Colour roles

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `paper` | `#f7f6f2` | `#0e0d0b` | Page background |
| `paper-2` | `#efede6` | `#161512` | Alternating bands, table headers, quiet fills |
| `card` | `#ffffff` | `#151411` | Cards, form surfaces |
| `line` / `line-strong` | `#e4e1d9` / `#cbc6ba` | `#27251f` / `#3b3830` | Hairlines, card borders, control borders |
| `ink` | `#16140f` | `#f3f0e9` | Headings, primary text, primary button fill |
| `ink-2` | `#4a463e` | `#c9c4b8` | Body copy |
| `muted` | `#6b675d` | `#9a958a` | Meta, captions, secondary labels |
| `accent` | `#a35400` | `#f2a33a` | Focus ring, active markers, list ordinals, links on hover |
| `success` / `danger` | `#157a44` / `#b42318` | `#4ade80` / `#f87171` | Form and status feedback only |

**Contrast:** all text pairs meet WCAG AA on their intended surface, and `muted` passes on both `paper` and `card`.

**Accent:** amber appears in small doses. It marks the focus ring, an active nav dot, list ordinals, the logo on share cards and a soft glow in the footer CTA. It is never a large fill and never a gradient on text.

**Footer CTA band:** it uses `bg-ink text-paper`, so it inverts in dark mode (a cream band on onyx). That inversion is intentional.

## Typography

- **Mona Sans** (`--font-mona`) is the Latin face for everything: display, headings, UI and body.
- **IBM Plex Sans Arabic** (`--font-plex-ar`) is the Arabic face.
  - On `:lang(ar)` pages it goes first in `--font-body`. Mona Sans's metric fallback is Arial, which also covers Arabic and would otherwise capture those glyphs.
  - Latin words in Arabic pages fall through to Mona Sans, because Plex Arabic loads only its Arabic subset with no fallback face.
- **IBM Plex Mono** (`--font-plex-mono`) is for prices, figures and code. Arabic text inside mono falls back to Plex Arabic.
- **Type scale:** set by `@utility` classes so they work with variants.
  - `text-display`: 2.75rem → 5.25rem
  - `text-h1`, `text-h2`, `text-h3`
  - `text-lead`
- **Headings:** tight negative tracking in Latin. Under `:lang(ar)`, tracking resets to 0 and line-height opens up.
- **Two-tone headlines:** the hero uses ink for the first clause and muted for the second. This is the only "decorative" type treatment.

## Layout

- **Container:** `container-site`, which is max `77.5rem` plus fluid gutters. Section rhythm comes from `--section-y`.
- **Page header:** every index and detail page starts with `PageHeader` (h1 → lead → optional children), or `ArticleHeader` for long-form (back link → h1 → lead → meta row with category, author, date).
- **Section grid:** detail pages use `DetailSection`, a 12-column grid with a sticky 4-column heading rail and an 8-column body.
- **Reading column:** articles use `READING` (`max-w-[44rem]`) with `.prose-site`.
  - Structured components inside prose must sit inside `.not-prose`. The kit's `CheckList`, `InfoCard`, `Callout`, `StatGrid` and `Timeline` already opt out.
- **Main landmark:** the layout owns `<main id="main">`. Pages render fragments or sections, never another `<main>`.

## Component kit

All components live in `src/components/site/`.

- **`layout.tsx`:**
  - `PageHeader`, `SectionHeader`, `ViewAllLink`, `DetailSection`
  - `StatGrid`, `CheckList` (default or negative tone), `InfoCard`, `Callout`, `Timeline`, `MetaRow`
  - `NextUp`
  - `stagger(i)` for entrance delays
- **`cards.tsx`:** `WorkCard` (media frame, stretched-link title, tags, Live/Source links), `IndexRow` (ruled list row for case studies, posts and papers) and `EmptyState`.
- **`article.tsx`:** `ArticleHeader`, `ArticleBody`, `WideFigure`, `Footnotes`, `RelatedPosts`.
- **`FilterableWork.tsx`:** data-driven tag chips (`aria-pressed`, counts, live result count) with an empty state and a clear action.
- **`Button.tsx`:** `buttonClass()` and `ButtonLink`. In CSS:
  - variants: `.btn-primary`, `.btn-accent`, `.btn-secondary`, `.btn-ghost`
  - sizes: `.btn-sm`, `.btn-lg`
  - shape: `.btn-icon`
- **Forms:** `.field-label`, `.input` (hover, focus ring, `aria-invalid`, disabled), `.field-hint`, `.field-error`.
- **Feedback:** `.alert-success`, `.alert-danger`, `.spinner`.
- **Data:** `.data-table`. Row headers (`tbody th`) are styled, and the table is a containing block so `sr-only` labels can't escape a scroll wrapper.
- **Icons:** `ArrowForward` and `ArrowOut` mirror automatically in RTL. For a "back" arrow, add `rotate-180`; for a "down" arrow, add `rotate-90 rtl:-rotate-90`.

## States

Every interactive surface defines all of its states:

- **Links and cards:**
  - hover: underline grows, arrow nudges, card lifts 4px
  - focus-visible: 2px accent outline with offset
  - active: buttons press down 1px
- **Contact form:**
  - idle
  - inline validation, after blur or on submit, with focus moved to the first invalid field
  - loading: spinner, inputs disabled, `aria-busy`
  - success: the form is replaced by a focused confirmation with "Send another message"
  - error: a focused `role="alert"` with a mailto fallback
- **Copy and share:** copy and share buttons show an inline "Copied" confirmation via `aria-live`. They never use `alert()`.
- **Empty states:**
  - Demos and filters use `EmptyState`.
  - Research shows an empty state if the database has no papers.
  - Research and demos fall back to bundled data only when the database is unreachable.
- **Errors:**
  - `[locale]/not-found.tsx` is a localized 404 inside the site chrome; `[locale]/[...rest]` routes unknown paths there.
  - `[locale]/error.tsx` is a localized error boundary with retry.
  - `app/not-found.tsx` is a self-contained bilingual fallback for paths the middleware skips.
- **Navigation:**
  - The sticky bar turns translucent with a blur after 8px of scroll.
  - Below `lg`, a full-screen menu opens. It traps focus, locks scroll, closes on Escape, on route change and at the breakpoint, and returns focus to the toggle.
  - The open menu must not carry any `backdrop-filter`, because that would turn the header into the menu's containing block.

## Motion

- **CSS only.** No framer-motion.
- **Entrances:** `.enter` (rise and fade, staggered via `--i`).
- **Scroll reveals:** `.reveal`, a scroll-driven `animation-timeline: view()` inside `@supports`. Content is always visible without it.
- **Easing:** `--ease-out` (`cubic-bezier(0.22, 1, 0.36, 1)`), with durations of 150–500ms.
- **Reduced motion:** everything is disabled under `prefers-reduced-motion: reduce`.

## Do and don't

### Do

- Lead with real screenshots and real outcomes.
- Use hairlines, whitespace and type scale for hierarchy before reaching for colour.
- Keep EN and AR equivalent, and check both directions whenever you change layout.
- Mark Latin-only data in Arabic pages with `dir="ltr"` or `<bdi>`, for example emails, phone numbers and "5+ sec".
- Use logical properties (`ps-`, `me-`, `start-`, `end-`, `text-start`).

### Don't

- Add gradients on text, glassmorphism cards, neon glows or decorative background grids.
- Introduce a second accent colour, or use the accent as a large fill.
- Hard-code English strings in components. Everything visible goes through the dictionaries in `src/lib/i18n/dictionaries`.
- Add a closing CTA block to individual pages. The global footer CTA covers it, and hides itself on `/contact`.
- Nest `<main>`, or skip heading levels.
