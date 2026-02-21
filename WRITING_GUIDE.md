# Writing Style & Portfolio Structure Guide

Everything learned about how to write case studies, blog posts, and structure the portfolio.

---

## Core Philosophy

**Transparency is the brand.**

The entire premise is showing real things, not fabricating scenarios. Every demo is live and verifiable. Every claim can be tested. This trust is the foundation - breaking it with invented statistics or fake case studies undermines everything.

---

## Writing Style

### Voice & Tone

- **Direct** - Address the reader as "you"
- **Honest** - Acknowledge what works, not just what doesn't
- **Practical** - Give actionable advice, not theory
- **No jargon** - Explain technical concepts in business terms
- **Concise** - Short paragraphs, clear points

### What to Avoid

- **Fake statistics** - "50 customers visit, 40 leave" - readers sense fabrication
- **Unsourced claims** - "70% mobile traffic" without a source reads like filler
- **Fabricated case studies** - Made-up revenue numbers ($104,000 lost) are dangerous
- **Marketing clichés** - "Studies show users form an opinion in 0.05 seconds" - overused and tired
- **Em dashes (—)** - Use regular dashes (-) instead
- **Unescaped quotes** - Use `&quot;` in JSX or curly quotes in markdown

### What Works

- **Real demos as proof** - "Try it yourself" is more convincing than any claim
- **Balanced assessment** - The $100 site "works, it's just limited" - fair and credible
- **Concrete signals** - "When you're spending more than 2 hours a week managing WhatsApp orders"
- **Strong bottom lines** - "A $100 website is a cost. A $500+ website is an investment."
- **Clear CTAs** - "If you're ready to invest in something that actually works, start here."

---

## Blog Post Structure

### Opening

1. **Hook with the demo immediately** - Send readers to experience it before explaining
2. **Set expectations** - "Here's what $100 actually delivers - nothing more, nothing less"

Example:
```
Try it yourself:

- $100 Restaurant Website
- $100 Ecommerce Store

Open them on your phone. Browse. Try the checkout.

Done? Let's talk about what you just experienced.
```

### Body Sections

1. **What you actually get** - Fair assessment of what works
2. **Where it breaks down** - Honest limits and problems
3. **The honest verdict** - "It works if / It doesn't work if" framework
4. **The upgrade moment** - Concrete signal for when to move up (e.g., "2 hours/week on WhatsApp")
5. **What comes next** - Links to next tier demos and full case studies

### Closing

1. **The bottom line** - One or two memorable sentences
2. **Clear CTA** - "Ready for something that actually works? Start here." with contact link

---

## Case Study Structure

### Header

- Category badge (e.g., "Transparency Project", "Business Advice")
- Large title with italic secondary text
- Brief description
- Feature badges

### Sections

1. **The Problem** - Why this matters, what's unclear
2. **All Tiers** - Grid of cards showing each price point with:
   - Price and label
   - Speed and mobile status
   - Feature list with check/x icons
   - External link to live demo
3. **Quick Comparison** - Table comparing key features across tiers
4. **Honest Recommendations** - Grouped by use case:
   - Skip These
   - Start Here
   - When to Invest More
5. **The Bottom Line** - Key takeaway with budget guidance
6. **Call to Action** - "Ready to build yours?" with contact link

---

## Portfolio File Structure

### Blog Posts

```
portfolio/
├── src/
│   ├── app/
│   │   └── blog/
│   │       ├── page.tsx           # Blog index
│   │       ├── BlogGrid.tsx       # Grid component
│   │       ├── layout.tsx         # Blog section metadata
│   │       └── [post-slug]/
│   │           ├── page.tsx       # Post content (custom, not markdown-converted)
│   │           ├── layout.tsx     # Post metadata
│   │           └── opengraph-image.tsx  # OG image
│   └── lib/
│       └── blogs.ts               # Blog post metadata array
└── content/
    └── blog/
        └── [post-slug].md         # Markdown version (for reference)
```

### Case Studies

```
portfolio/
├── src/
│   └── app/
│       └── case-studies/
│           ├── page.tsx           # Case studies index
│           ├── CaseStudiesGrid.tsx
│           ├── layout.tsx
│           └── [study-slug]/
│               ├── page.tsx       # Study content
│               ├── layout.tsx     # Study metadata
│               └── opengraph-image.tsx
```

### Key Files

- **blogs.ts** - BlogPost type and blogPosts array with slug, title, summary, category, tags, author, publishedDate, readTime
- **content.ts** - CaseStudy type and caseStudies array

---

## Component Patterns

### Glass Card

```tsx
<div className="glass-card p-8 border border-[hsl(var(--accent-gold))]/20">
  {/* content */}
</div>
```

### Badge

```tsx
<span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-text/80">
  <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent-gold))]" />
  {label}
</span>
```

### Section with Motion

```tsx
<motion.section
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="mb-32"
>
  {/* content */}
</motion.section>
```

### Grid Item with Motion

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
  viewport={{ once: true }}
  className="glass-card p-6"
>
  {/* content */}
</motion.div>
```

---

## Color System

- **Accent Gold**: `text-[hsl(var(--accent-gold))]`, `border-[hsl(var(--accent-gold))]/20`
- **Text Primary**: `text-text`
- **Text Secondary**: `text-text/60`, `text-text/70`
- **Text Muted**: `text-text/50`
- **Red (negative)**: `text-red-400`, `border-red-500/20`
- **Green (positive)**: `text-green-400`
- **Orange (warning/limitation)**: `text-orange-400`, `border-orange-500/20`

---

## Commit Style

Format: `type(scope): description`

Examples:
- `feat(blog): add why-not-to-buy-cheap-websites post`
- `feat(blog): add what-100-dollar-website-gets-you post`
- `fix(blog): remove unused import and escape quotes`
- `feat(case-studies): add restaurant website tiers case study with 9 live demos`

Types:
- `feat` - New feature
- `fix` - Bug fix
- `refactor` - Code restructure
- `chore` - Maintenance
- `docs` - Documentation

---

## OG Image Pattern

```tsx
import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Post Title";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const notoSans = await readFile(
    join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/noto-sans-v27-latin-regular.ttf")
  );

  return new ImageResponse(
    (
      <div style={{ /* dark background, centered layout */ }}>
        <span style={{ /* category badge */ }}>Category</span>
        <h1 style={{ /* main title */ }}>Title</h1>
        <h2 style={{ /* subtitle with accent color */ }}>Subtitle</h2>
        <p style={{ /* badges */ }}>Badge 1 · Badge 2 · Badge 3</p>
      </div>
    ),
    { ...size, fonts: [{ name: "Noto Sans", data: notoSans, style: "normal", weight: 400 }] }
  );
}
```

---

## Key Takeaways

1. **Demos over claims** - Link to live demos immediately, let people experience it
2. **Be fair** - Acknowledge what works, not just what doesn't
3. **No fake numbers** - Fabricated statistics undermine credibility
4. **Concrete signals** - "2 hours/week" is better than "when you're ready"
5. **Clear next steps** - Every post ends with a path forward
6. **Consistent structure** - Same patterns across blog posts and case studies
7. **Custom pages** - Don't convert markdown, code the page directly
8. **Complete metadata** - layout.tsx + opengraph-image.tsx for each post
