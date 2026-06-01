# EXPOZOR Landing Page — Build Summary

## Stack
- **Framework**: Next.js 15 App Router (`apps/web`)
- **Styling**: Tailwind v4 (`@theme` in `globals.css`) + scoped `<style>` blocks for complex responsive layouts
- **Animation**: Framer Motion — `AnimatePresence`, `motion.*`, `whileInView`, `useMotionValue`
- **Scroll detection**: `IntersectionObserver` (no `useScroll` — mobile perf constraint)
- **Icons**: Lucide React + inline SVGs (X logo, GitHub mark, App Store/Play Store badges)
- **Forms**: Next.js Server Actions (`joinWaitlist` in `src/app/actions/waitlist.ts`)

---

## Sections Implemented

| # | Section | File | Status |
|---|---------|------|--------|
| 0 | Global tokens & typography | `globals.css` | ✅ |
| 1 | Navigation | `src/components/layout/header.tsx` | ✅ |
| 2 | Hero | `src/components/sections/hero.tsx` | ✅ |
| 3 | Stats Band | `src/components/sections/stats-band.tsx` | ✅ |
| 4 | Live Demo | `src/components/sections/demo-section.tsx` | ✅ |
| 5 | Features Bento | `src/components/sections/features-section.tsx` | ✅ |
| 6 | How It Works | `src/components/sections/how-it-works.tsx` | ✅ |
| 7 | Trust & Security | `src/components/sections/security-section.tsx` | ✅ |
| 8 | Testimonials | `src/components/sections/testimonials-section.tsx` | ✅ |
| 9 | Pricing | `src/components/sections/pricing-section.tsx` | ✅ |
| 10 | FAQ | `src/components/sections/faq-section.tsx` | ✅ |
| 11 | Final CTA | `src/components/sections/final-cta.tsx` | ✅ |
| 12 | Mobile App CTA | `src/components/sections/mobile-app-cta.tsx` | ✅ |
| 13 | Footer | `src/components/layout/footer.tsx` | ✅ |
| — | Sticky Mobile CTA Bar | `src/components/layout/sticky-mobile-cta.tsx` | ✅ |

---

## Key Design Decisions

### Colour constraints obeyed
- **Mint `#3DDC97`** used only on: primary CTAs, "Most Popular" badge, active step numbers, accent checkmarks
- **Neutral white** used for: all feature icons, FAQ chevron, pledge card icons
- **Purple `rgba(167,139,250,…)`** used for: section background radial glows

### Performance
- `IntersectionObserver` everywhere scroll-driven — never `useScroll`
- `content-visibility: auto` class (`cv-auto`) on all heavy sections
- Cursor spotlight: direct `style.setProperty` DOM mutation (zero React state per mouse event)
- Confetti: pure `requestAnimationFrame` canvas, auto-cleans after 5 s
- `prefers-reduced-motion`: all animations suppressed or skipped

### Accessibility (WCAG 2.2 AA)
- Every interactive element has `aria-label` or visible label
- FAQ: `ArrowDown/Up` keyboard nav, `Escape` to close, `role="region"` panels
- Pricing toggle: `role="radiogroup"` + `role="radio"` + `aria-checked`
- FAQ search: `role="searchbox"`, `aria-autocomplete="list"`, `aria-controls`
- Comparison table: `<caption>`, `scope="col"/"row"`, `aria-label` on ✓/— cells
- Confetti canvas: `aria-hidden="true"`, `pointer-events: none`
- Footer: `role="contentinfo"`, per-column `<nav aria-label>`

### No external assets
- All visuals are inline CSS/SVG
- Phone mockup: pure CSS `border-radius` device frame
- Twitter/X cards: CSS-rendered avatars (gradient initials circles)
- App Store / Play Store: inline SVG badges
- Social icons: inline SVG (X logo path, GitHub octocat path)

---

## Pre-Launch Checklist

| Item | Owner |
|------|-------|
| Replace 6 tweet-card placeholders with real verified X screenshots | Marketing |
| Wire `NotifyForm` to `/api/notify-mobile` endpoint | Engineering |
| Create `/security`, `/features`, `/changelog`, `/download` routes | Engineering |
| Replace `TESTIMONIALS.metric` with live data from DB | Engineering |
| SOC 2 Type II badge → activate when audit complete | Legal |
| App Store / Play Store links → set `href` + `tabIndex=0` when apps ship | Product |
| Lighthouse mobile audit (target ≥ 95) | Engineering |
