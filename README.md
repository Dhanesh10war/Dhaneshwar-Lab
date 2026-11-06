# Apple-Grade Personal Portfolio

An ultra-refined, Apple-inspired personal website for showcasing works, products, designs, content (essays, talks), and open materials (libraries, design kits, shaders).

Engineered following Apple's WWDC interface design guidelines (*Designing Fluid Interfaces*, *The Details of UI Typography*) and Emil Kowalski's design engineering principles.

---

## Architecture & Features

- **Fluid Tactile Physics:** Every interactive card and button responds with spring physics, sub-160ms `:active` states (`scale(0.97)`), and velocity awareness.
- **Optical Typography:** SF Pro dynamic tracking (`-0.03em` on display headings, natural leading on body text).
- **Translucent Glass Materials:** Dynamic navigation and modal scrims built with `backdrop-filter: blur(24px) saturate(180%)`.
- **Asymmetric Bento Grid:** Hierarchical product and works layout with ambient gradient backlights and live metric tags.
- **Deep Content Sections:**
  - **Works & Products:** Interactive project cards with expandable detail sheets.
  - **Designs & Systems:** UI tokens, WCAG AAA accessibility scores, and design kits.
  - **Content & Essays:** Clean editorial reading list.
  - **Materials & Resources:** Downloadable toolkits, shaders, and open-source packages.
  - **About & Philosophy:** Three pillars of software craft and personal narrative.
- **Accessibility Safeguards:** Full `@media (prefers-reduced-motion)` and `@media (prefers-reduced-transparency)` conformance.

---

## Quick Start

```bash
cd "/home/drago/dev/Portfolio/Dhaneshwar Portfolio"

# Start the development server (runs at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Customizing Your Content

All data is separated into [`src/data/portfolio-data.ts`](src/data/portfolio-data.ts):

- **Personal Details & Socials:** Edit `PERSONAL_INFO` (name, bio, role, status badge, social handles).
- **Showcase Items:** Edit `PROJECTS` (works, products, design systems, metrics, accent gradients).
- **Articles & Essays:** Edit `WRITINGS` (title, read time, date, link).
- **Downloadable Assets:** Edit `MATERIALS` (libraries, Figma kits, shaders).

---

## Deployment

### Vercel / Netlify
Run `npm run build` and point the deployment to the `dist/` directory.

### Firebase App Hosting
Can be deployed using standard single-page app hosting rules.
