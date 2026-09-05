---
name: Khalil AbdalMageed Portfolio
description: A bilingual portfolio built in the Metro typographic-tile language, where type and flat colour tiles are the whole interface.
colors:
  ground: "#000000"
  ink: "#ffffff"
  ink-muted: "rgba(255, 255, 255, 0.62)"
  ink-faint: "rgba(255, 255, 255, 0.34)"
  lime: "#a4c400"
  lime-ink-light: "#4c7a00"
  magenta: "#e3008c"
  cobalt: "#0050ef"
  amber: "#f09609"
  ground-light: "#ffffff"
  ink-light: "#000000"
typography:
  poster:
    fontFamily: "Hanken Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 8.5vw, 6rem)"
    fontWeight: 200
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Hanken Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Hanken Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 300
    lineHeight: 1.15
  quote:
    fontFamily: "Hanken Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 300
    lineHeight: 1.4
  title-small:
    fontFamily: "Hanken Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 300
    lineHeight: 1.15
  pivot:
    fontFamily: "Hanken Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 300
    lineHeight: 1.2
  subtitle:
    fontFamily: "Hanken Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Hanken Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Hanken Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
  poster-ar:
    fontFamily: "Readex Pro, Segoe UI, system-ui, sans-serif"
    fontWeight: 200
    lineHeight: 1.15
  body-ar:
    fontFamily: "Readex Pro, Segoe UI, system-ui, sans-serif"
    fontWeight: 400
rounded:
  none: "0px"
spacing:
  tile-gap: "8px"
  tile-unit: "160px"
  control-y: "14px"
  control-x: "24px"
  page-inline: "clamp(20px, 4vw, 56px)"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ground}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
    typography: "{typography.subtitle}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 22px"
    typography: "{typography.subtitle}"
  tile:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px"
  input:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
---

# Design System: Khalil AbdalMageed Portfolio

## Overview

**Creative North Star: "Type Is The Interface"**

The portfolio speaks the Metro typographic-tile language. A solid ground (black by default, white in the light theme) carries giant, light-weight, lowercase headlines that are allowed to run off the trailing edge of the viewport, and flat colour tiles that are content, not containers. Nothing on screen is decoration: every element is a word, a colour field, a screenshot of shipped work, or a control. There are no gradients, bevels, shadows, borders-as-decoration, glass, or glow.

The system is authoritative and calm because it is so reduced. Hierarchy comes from type size and weight steps and from tile size, never from ornament. Colour is committed: each tile owns one saturated flat field, and a single accent (lime) owns every live state (links, focus, primary action, active navigation). The Arabic surface is native to the same grammar, using Readex Pro at the same weights and the same cropping rule mirrored to the left edge.

**Key Characteristics:**
- Solid ground, white ink, flat saturated tiles; zero gradients, shadows, or radii.
- Giant light lowercase headlines cropped off the trailing edge.
- A strict tile grid with varied tile sizes (1×1, 2×1, 2×2) as the page structure.
- One accent (lime) for every live state; other tile colours never signal interaction.
- Motion is Metro-native: staggered glide-in from the trailing edge, press tilt, live-tile flip.

## Colors

Black and white are the ground and the ink; four flat Metro colours carry tiles; lime alone carries state.

### Primary
- **Lime** (#a4c400): the one live colour. Primary button fill, focus ring, active pivot item, link hover, live-tile back faces. In the light theme, lime remains the fill colour but lime text on white uses **Lime Ink Light** (#4c7a00) to hold 5:1 contrast.

### Secondary (tile fields)
- **Magenta** (#e3008c): white ink on it. Used for the first audience tile and the testimonial tile.
- **Cobalt** (#0050ef): white ink on it. Used for the second audience tile and case-study tiles.
- **Amber** (#f09609): black ink on it. Used for the third audience tile and the blog tile.

### Neutral
- **Ground** (#000000 dark / #ffffff light): page and app-bar background; also the label block laid over image tiles.
- **Ink** (#ffffff dark / #000000 light): all headlines and body text on the ground.
- **Ink Muted** (rgba(255,255,255,0.62) dark; rgba(0,0,0,0.62) light): supporting copy, inactive pivot items. Never used on a coloured tile.
- **Ink Faint** (rgba(255,255,255,0.34)): hairline dividers only.

### Named Rules
**The One Live Colour Rule.** Lime is the only colour that may change on hover, focus, or active state. Magenta, cobalt, and amber are content fields and never react.

**The Tinted Secondary Rule.** Secondary text on a coloured tile is the tile's ink at 85% opacity, never gray. Magenta is the exception: white on magenta is exactly 4.5:1, so all text on a magenta tile stays at 100%.

## Typography

**Display and Body Font (Latin):** Hanken Grotesk (with Segoe UI, system-ui fallback)
**Display and Body Font (Arabic):** Readex Pro (with Segoe UI, system-ui fallback)

**Character:** One humanist family per script, used from 200 to 500. The light weights at poster scale read as confident rather than delicate because they are large and lowercase. Latin headlines, titles, labels, and controls are lowercase except proper nouns and product names. Arabic has no case, so its authority comes from the same size and weight steps.

### Hierarchy
- **Poster** (200, clamp(3.25rem, 8.5vw, 6rem), 0.95, -0.02em): the homepage statement and page titles. May overflow the trailing edge inside an `overflow: hidden` section; must remain readable in full at the smallest breakpoint by wrapping.
- **Headline** (300, clamp(2rem, 4vw, 3.25rem), 1.05): section titles such as "work", "who i help".
- **Title** (300, 1.75rem, 1.15): tile titles on 2-unit tiles and list headings.
- **Quote** (300, 1.625rem, 1.4; 1.375rem below md): the testimonial quote.
- **Title Small** (300, 1.375rem, 1.15): titles on 1×1 tiles; 1.125rem inside an image-tile label block.
- **Subtitle** (400, 1.25rem, 1.4): the hero's supporting sentence and button labels.
- **Pivot** (300, 1.125rem, 1.2): the header navigation row.
- **Body** (400, 1rem, 1.6): reading copy, max measure 65ch.
- **Caption** (400, 0.875rem, 1.4): tile peek lines, metadata, app-bar labels.

### Named Rules
**The Lowercase Rule.** Latin UI text is lowercase, including headings and button labels. Proper nouns (Khalil, Next.js, Fiverr) keep their casing.

**The Big Step Rule.** Adjacent levels differ by at least 1.3× in size or two weight steps. No hierarchy is built from 16/18/20px.

## Layout

The page is start-aligned (left in LTR, right in RTL) on a strict tile grid. The tile unit is 160px square with an 8px gap; tiles span 1×1, 2×1, or 2×2 units. Sections stack vertically; inside a section, tile rows may become a horizontal panorama (`overflow-x: auto; scroll-snap-type: x proximity`, so the row never traps the scroll) whose last tile is cropped by the viewport edge whenever the content exceeds it. Page inline padding is clamp(20px, 4vw, 56px); there is no centred max-width container, but text blocks cap at 65ch.

Breakpoints: below 640px the tile unit drops to `calc((100vw - 2 * padding - gap) / 2)` so two columns always fit, 2×2 tiles become full width, and panoramas become a single column. Headline cropping is preserved at every width by letting the poster line overflow the section, while the full text is always reachable via wrapping on the next line.

Spacing rhythm: 8px inside tiles between title and peek line, 16px tile padding, 8px between tiles, 48px between a section heading and its grid, 96px to 128px between sections. More space sits above a heading than below it.

## Elevation & Depth

Flat. There are no shadows, no borders as elevation, and no blur. Depth is expressed only through the tile press tilt (a 3D rotation toward the pointer of at most 6°) and the live-tile flip, both of which are motion, not resting state. Hairline dividers (1px, Ink Faint) separate list rows where needed.

### Named Rules
**The Flat Rule.** `box-shadow: none`, `border-radius: 0`, `backdrop-filter: none`. A control's outline is its only edge.

## Shapes

Everything is rectangular with square corners. Tiles are exact multiples of the unit. Buttons are rectangles with 2px outlines (secondary) or solid fills (primary). Icons are 1.5px-stroke outline glyphs; the only decorative mark is a 4×4 dot-matrix square next to the brand name. The directional glyph is a small solid triangle (▸) that mirrors in RTL.

## Components

### Buttons
- **Shape:** rectangle, 0 radius.
- **Primary:** Lime fill, Ground-coloured text, padding 14px 24px, Subtitle type, trailing ▸ glyph. Hover: fill lightens to #b6d81a; active: translateY(1px). Focus-visible: 2px Ink outline offset 2px.
- **Secondary:** transparent fill, 2px Ink outline, Ink text, padding 12px 22px. Hover: Lime outline and Lime text. Focus-visible as primary.
- **Text link:** Ink, no underline at rest; hover and focus turn Lime; an underline appears only inside running body copy.

### Tiles
- **Corner Style:** 0.
- **Background:** one flat colour from Magenta, Cobalt, Amber, or Lime, or an image filling the tile.
- **Title:** Title type at bottom-start with 16px padding; a Caption peek line under it in the tile's ink at 85%.
- **Image tiles:** the screenshot fills the tile with `object-fit: cover`; the title sits in a Ground-coloured label block bottom-start; no gradient scrim. 1×1 image tiles show the title only; 2-unit tiles add the tag line. The hero column uses wide 3.25-unit image tiles so they crop at the trailing edge.
- **Interaction:** pointer-down tilts the tile up to 6° toward the pointer; hover shows the ▸ glyph at bottom-end (Lime on image tiles, the tile's ink elsewhere). Focus-visible: 3px Lime outline, or Ink outline on Lime tiles. No scale, no zoom of the image.
- **Live tiles:** flip on the X axis over 600ms to reveal a back face, one tile at a time, every 9 to 14 seconds; disabled under reduced motion.

### Inputs / Fields
- **Style:** Ground fill, 2px Ink Muted outline, Ink text, 0 radius, padding 12px 14px, placeholder Ink Muted.
- **Focus:** outline becomes Lime.
- **Error:** outline becomes Magenta and a Caption line names the problem and the fix.

### Navigation (pivot header and app bar)
- **Pivot:** the site navigation is a horizontal row of lowercase Subtitle-size links; the current page is Ink, others Ink Muted, hover Lime. On narrow screens the row scrolls horizontally with the tail cropped by the edge; there is no hamburger.
- **Brand:** "khalil" in Subtitle weight 300 with the dot-matrix mark; links home.
- **App bar controls:** 40px square outline buttons (2px Ink outline) holding a 20px icon; theme and language switches. Focus-visible: Lime outline.

### Panorama
A section's tile row that overflows horizontally with `scroll-snap-type: x proximity`, `scroll-padding-inline: page padding`, and a cropped last tile when content exceeds the viewport. The row closes with a lime 1×2 "all projects" tile. Keyboard users move through tiles by Tab; the row is also reachable with arrow keys via native scroll.

## Do's and Don'ts

### Do:
- **Do** make headlines lowercase, light (200–300), and large enough to crop at the trailing edge on desktop.
- **Do** build sections from varied tile sizes (1×1, 2×1, 2×2) and let the grid, not cards, be the structure.
- **Do** use Lime for every live state and nothing else for interaction.
- **Do** set black ink on Lime and Amber, white ink on Magenta and Cobalt.
- **Do** mirror the crop edge, the ▸ glyph, and tile alignment in RTL, and use Readex Pro for Arabic at the same weights.
- **Do** orchestrate one entrance (glide-in from the trailing edge with 40ms stagger, `cubic-bezier(0.1, 0.9, 0.2, 1)`) and honour `prefers-reduced-motion` by removing flips and glides.

### Don't:
- **Don't** use gradients, shadows, blur, glass, glow, or border-radius anywhere.
- **Don't** use gold, cream, or serif type; the previous identity is an anti-reference.
- **Don't** scale or zoom images on hover; tilt is the only pointer response.
- **Don't** use gray text on a coloured tile; tint from the tile's ink.
- **Don't** add eyebrows, section numbers, or uppercase tracked labels; Metro has no eyebrow.
- **Don't** hide navigation behind a hamburger; the pivot row scrolls.
