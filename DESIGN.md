---
name: Khalil AbdalMageed Portfolio
description: A bilingual portfolio for considered web-development work.
colors:
  background: "#fcf9f3"
  surface: "#ffffff"
  text: "#231e1a"
  onyx: "#050505"
  gold: "#a07a22"
  bronze: "#865125"
  champagne: "#ba9a5e"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, Arial, sans-serif"
  display-ar:
    fontFamily: "Noto Naskh Arabic, serif"
  body-ar:
    fontFamily: "IBM Plex Sans Arabic, Arial, sans-serif"
rounded:
  sharp: "2px"
spacing:
  control-y: "16px"
  control-x: "40px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.onyx}"
    rounded: "{rounded.sharp}"
    padding: "16px 40px"
  surface-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sharp}"
---

# Design System: Khalil AbdalMageed Portfolio

## Overview

**Creative North Star: "The Gold Standard"**

The portfolio is a composed case for premium web craft. It uses warm, light surfaces and onyx dark mode as a quiet field for rich gold accents, selected work, and bilingual content. The visual system leads with clarity and evidence, not visual spectacle.

Tonal depth creates separation through surface, fine gold-tinted borders, and sparse ambient shadows. The system rejects generic AI-interface signals: decorative gradient text, purple or cyan palettes, heavy side stripes, bouncy motion, image zooming, default glassmorphism, and repeated template cards.

**Key Characteristics:**
- Warm gold-and-onyx identity with restrained accent use.
- Editorial display typography paired with clear body text.
- Low-radius, precise controls and composed hover feedback.
- Equal care for English LTR and Arabic RTL content.

## Colors

Warm neutrals carry the surface while gold and bronze identify emphasis, interaction, and moments of craft.

### Primary
- **Polished Gold:** used for key actions, eyebrow labels, and focused emphasis.

### Secondary
- **Aged Bronze:** supports gold in surfaces and non-text decoration.
- **Champagne:** a restrained highlight, never a second primary action color.

### Neutral
- **Ivory Field:** page background in light mode.
- **Paper Surface:** raised light-mode content surface.
- **Ink:** primary readable text in light mode.
- **Onyx:** dark-mode background and primary button text.

**The Solid Voice Rule.** Text emphasis uses a single solid color, weight, or scale. Gradient-clipped text is prohibited.

## Typography

**Display Font:** Playfair Display (with Georgia fallback)
**Body Font:** Inter (with Arial fallback)
**Arabic Display Font:** Noto Naskh Arabic
**Arabic Body Font:** IBM Plex Sans Arabic

**Character:** The display face gives headings a confident, literary presence while the body face keeps service details, case studies, and contact paths direct. Arabic typography follows the same hierarchy without borrowing Latin spacing conventions.

### Hierarchy
- **Display** (600, responsive 36px to 60px, 1): hero and section titles.
- **Headline** (600, 24px to 36px, 1.2): feature and article headings.
- **Body** (400, 16px, at least 1.5): reading content, constrained to 65 to 75 characters where practical.
- **Label** (600, 12px, 0.1em to 0.3em tracking, uppercase in Latin only): navigation and short contextual labels.

**The Contrast Rule.** Adjacent text levels require a meaningful scale or weight change. Do not construct a hierarchy from closely spaced sizes alone.

## Elevation

This is a tonal-depth system. Light-mode surfaces use fine gold-tinted borders and sparse ambient shadows; dark mode reduces border brightness and uses deeper, less frequent shadows. Glass treatment is reserved for a purposeful layered surface, never used as the default container style.

### Shadow Vocabulary
- **Ambient Card:** a low, layered shadow used by a raised content surface.
- **Interactive Lift:** a compact upward translation and soft shadow for primary actions only.

**The Quiet Depth Rule.** A surface earns elevation through hierarchy or interaction. Decorative blur and stacked containers are forbidden.

## Components

### Buttons
- **Shape:** sharp, low-radius edges (2px).
- **Primary:** polished gold background with onyx text and generous horizontal padding (16px 40px).
- **Hover / Focus:** a small upward lift, a soft gold shadow, and a visible keyboard focus treatment. Never bounce or elastic easing.
- **Secondary:** text-led action with a fine bottom border that strengthens on hover.

### Cards / Containers
- **Corner Style:** square to low-radius, never pill-like.
- **Background:** ivory or paper surfaces in light mode; onyx-adjacent surfaces in dark mode.
- **Shadow Strategy:** tonal depth only where grouping or interaction needs it.
- **Border:** fine, gold-tinted full borders when a boundary is required.
- **Internal Padding:** spacious and varied by content density.

### Navigation
- **Style:** display-led brand mark, compact labels, and a restrained gold state treatment.
- **Mobile treatment:** preserves route clarity and direction-aware behavior without hiding primary navigation behind decoration.

### Content Callouts
- **Style:** full-border or tonal-surface emphasis with a leading icon, number, or label where needed.
- **Direction:** visual emphasis must mirror correctly in RTL layouts.
- **Prohibition:** colored left or right borders wider than 1px are forbidden.

## Do's and Don'ts

### Do:
- **Do** use the existing gold, bronze, ivory, and onyx roles to make content hierarchy legible.
- **Do** use Playfair Display and Inter for Latin content, with Noto Naskh Arabic and IBM Plex Sans Arabic for Arabic content.
- **Do** make interactive movement brief, smooth, and meaningful; retain reduced-motion behavior.
- **Do** use full borders, tonal fills, icons, or labels for callout emphasis.
- **Do** keep image composition stable during hover states.

### Don't:
- **Don't** use decorative gradient text or `background-clip: text` on user-facing copy.
- **Don't** introduce purple or cyan AI palettes, thick colored side stripes, bouncy motion, or image zoom hover effects.
- **Don't** use gray text on saturated colored backgrounds when a high-contrast text color is available.
- **Don't** make default glassmorphism or identical card grids the page structure.
- **Don't** compromise LTR, RTL, responsive, or reduced-motion behavior for visual treatment.
