---
name: Khalil AbdalMageed Portfolio
description: A bilingual portfolio presented as a particle-detector event display.
colors:
  vacuum: "#0a0f16"
  panel: "#0e1622"
  panel-raised: "#121c2b"
  line: "#22374f"
  line-strong: "#3a5c82"
  steel: "#9fb0c3"
  ink: "#e9eff6"
  track: "#e8b93a"
  muon: "#56c8e0"
  energy: "#e5484d"
  nominal: "#3ddc84"
  print-background: "#f2f4f7"
  print-panel: "#ffffff"
  print-ink: "#14202e"
  print-track: "#8a6400"
  print-muon: "#0a6e8a"
  print-energy: "#b32630"
  print-nominal: "#147a4c"
typography:
  display: "Archivo, ui-sans-serif, system-ui, sans-serif"
  body: "DM Sans, ui-sans-serif, system-ui, sans-serif"
  instrument-body: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
  data: "IBM Plex Mono, ui-monospace, monospace"
  arabic-display: "Cairo, Arial, sans-serif"
  arabic-body: "IBM Plex Sans Arabic, Arial, sans-serif"
rounded:
  control: "2px"
  detector: "0px"
spacing:
  section-y: "96px"
  panel: "24px"
components:
  primary-action:
    backgroundColor: "{colors.track}"
    textColor: "{colors.vacuum}"
    rounded: "{rounded.control}"
  instrument-panel:
    backgroundColor: "{colors.panel}"
    borderColor: "{colors.line}"
    rounded: "{rounded.detector}"
---

# Design System: Khalil AbdalMageed Portfolio

## North star

**The Event Display.** The home surface is a scientific instrument: one frozen collision represents the practice, while real projects radiate from the vertex as labeled tracks. The interface is an index of the work rather than a decorative wrapper around a conventional hero.

The experience mode is **Experience**. The visitor should understand the work, isolate a project, and reach a useful next route within seconds. English and Arabic carry the same information and interaction model; the layout mirrors cleanly for RTL.

## Visual world

The dark rendition is a vacuum-blue-black run display. Hairline steel rings and ticks establish measurement. Signal yellow identifies ordinary project tracks, cyan identifies flagship AI work, red marks energy readouts, and green marks nominal system state. Each accent has one meaning.

The light rendition is the publication-print version of the same instrument: cool paper, white panels, graphite ink, bronze-gold tracks, deep teal muons, red energy, and green nominal state. It is a tonal translation, not a separate brand.

The detector uses crisp geometry, full borders, and restrained shadows. Rounded cards, gradient text, thick colored side stripes, generic glassmorphism, and decorative background grids are outside this system.

## Color roles

### Dark run

- **Vacuum** `#0a0f16`: page and primary button field.
- **Panel** `#0e1622`: instrument panels and the main chrome.
- **Panel raised** `#121c2b`: hover and secondary panel surfaces.
- **Line** `#22374f`: hairline rings and panel boundaries.
- **Line strong** `#3a5c82`: crosshair, ticks, and high-salience rules.
- **Steel** `#9fb0c3`: measured secondary text and structural tracks.
- **Ink** `#e9eff6`: readable primary text.
- **Track** `#e8b93a`: ordinary portfolio work and decisive actions.
- **Muon** `#56c8e0`: flagship AI projects.
- **Energy** `#e5484d`: calorimeter wedges and energy values.
- **Nominal** `#3ddc84`: live status and healthy-state readouts.

### Publication print

- **Background** `#f2f4f7`, **panel** `#ffffff`, **ink** `#14202e`.
- **Track** `#8a6400`, **muon** `#0a6e8a`, **energy** `#b32630`, **nominal** `#147a4c`.
- **Line** `#ccd6e0`, **line strong** `#93a7bb`, **steel** `#45566a`.

The palette law is semantic: an accent is introduced only when it carries one of these meanings. Text uses solid color; gradient-clipped text is prohibited.

## Typography

- **Archivo** is the Latin instrument display face for the name, section headings, and subsystem titles. It is bold, compact, and tracked only where the label is explicitly data-like.
- **DM Sans** remains the general site body face for existing content surfaces.
- **IBM Plex Sans** carries the instrument body copy and navigation controls.
- **IBM Plex Mono** carries labels, timestamps, counts, tags, and status values. It uses tabular numerals.
- **Cairo** is the Arabic instrument display face; **IBM Plex Sans Arabic** is the Arabic body face.

Hierarchy comes from scale, weight, and contrast. Display text stays below 6rem, body copy keeps a readable measure, and Latin labels use uppercase tracking while Arabic labels keep natural spacing.

## Layout and interaction

The first viewport places the offer and actions beside the event display. The event display contains four segmented rings, a vertex, structural tracks, six project tracks, energy wedges, and a compact legend. Project endpoints have HTML anchor hit targets so hover, keyboard focus, and touch isolation work independently of the decorative SVG.

When a track is isolated, the surrounding field dims and a bounded data card reports the project's title, description, tags, and route. The first touch activates isolation; a second activation follows the project link. Focus rings use the active track color and remain visible against both renditions.

The journey below the hero is a single ruled strip with tabular timestamps. Subsystem rows, testimonial transmission, case-study data, and writing routes use the same panel grammar without becoming a repeated card grid.

Controls use a 2px radius, generous hit areas, explicit labels, and short ease-out transitions. The event draw animation, ring settle, and status pulse all stop under `prefers-reduced-motion: reduce`.

## Accessibility and truth

The SVG is decorative and hidden from assistive technology; the interactive project anchors expose real names and destinations. Navigation uses menu semantics only for the mobile menu, and the layout viewport does not disable user zoom. JSON-LD and visible copy describe the actual services, projects, and routes.

The detector's advisory tonal values are intentional extensions of the line and track roles: `hsla(45, 60%, 55%, 0.4)`, `hsl(210 22% 62% / 0.4)`, `hsl(210 22% 62% / 0.65)`, `hsl(212 38% 30% / 0.75)`, and `hsl(212 38% 42% / 0.9)` are scrollbar or glow alpha variants; `#e8b93a` and `#0a0f16` are the canonical dark track and vacuum values.

## Do and don't

### Do

- Keep project evidence ahead of decoration.
- Preserve the one-accent-one-meaning palette law.
- Keep LTR and RTL content equivalent in hierarchy and interaction.
- Use authored geometry for measurement, tracks, and readouts.
- Keep motion brief, smooth, and optional.

### Don't

- Add purple or cyan as generic brand accents; cyan is reserved for muon/AI tracks.
- Reintroduce serif editorial headings on the instrument surface.
- Use decorative gradients, bouncy easing, image zoom, or thick side stripes.
- Turn the journey into a grid of identical icon cards.
- Hide essential route names behind an interaction that touch or keyboard users cannot reach.
