# NOVA Dental

A multi-page marketing site for a fictional dental clinic — a concept and
template piece, not a real practice. Every clinic-specific fact lives in
`content/*.ts`; the site claims no city, lists no address, and takes no
appointments. Built with Next.js 16 (App Router), React 19, TypeScript
strict, and Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # the real verification — no test framework is configured
npm start          # production server (all perf numbers below are from this)
```

## Stack, and why each piece

| Piece | Why |
| --- | --- |
| Next.js 16 App Router | Server Components by default; the whole site is static except the one route that reads search params |
| Tailwind CSS v4 (CSS-first) | Design tokens live in `@theme` in `globals.css` — one source of truth, no config file, and `/style` reads them live |
| Zod | One schema validates the wizard's URL params *and* form values; unknown values fall through silently |
| Motion (LazyMotion + `domAnimation` + `m`) | Step transitions inside the appointment wizard only — the one place elements unmount and CSS cannot follow. ~36 KB wire on that route, 0 KB elsewhere |
| lucide-react | Line-art icons at strokeWidth 1.5; tree-shakes to ~2 KB for the set used |
| clsx + tailwind-merge | Conditional class composition |

Deliberately not installed: scroll-animation libraries (CSS scroll-driven
animations + one IntersectionObserver fallback cover it), a state manager
(URL is the state), a date picker (native `<input type="date">`), any UI
kit, and anything analytics-shaped.

## The decisions, and the reasoning

**The appointment wizard works with JavaScript disabled, end to end.**
Steps render on the server from `searchParams`; navigation is native
`<form method="get">` and links; the WhatsApp handoff is a server-built
`wa.me` href. JavaScript is an enhancement layer: a thin client chrome
intercepts submits into `router.push`, which is what enables Motion
transitions, an `aria-live` step announcer, and focus management. The
tradeoff is stated on `/privacy`: answers live in the URL, so they appear
in browser history and in a copied link.

**URL as state, not `useState`.** Back button steps through the wizard,
refresh loses nothing, `/treatments` and `/team` prefill it with plain
links (`?treatment=ortho`, `?doctor=rayan`), and the state is debuggable
in the address bar. Every param is Zod-validated against content IDs;
`?doctor=nonsense` silently renders as "no preference" — a mistyped URL
gets a working form, not a diagnostic.

**Native `<details>` over a custom accordion.** The browser supplies
keyboard support, expanded-state announcement, and collapsed-content
exclusion. An earlier custom button/grid-rows accordion was deleted.

**View Transitions over a scroll library.** React `<ViewTransition>` with
`share="morph"` morphs treatment cards into their `/treatments` sections
and doctor cards into `/team` profiles. Chromium 125+ gets the morph;
everything else gets an instant swap, and `prefers-reduced-motion: reduce`
kills the animation outright.

**Scroll reveals are CSS first.** Browsers with `animation-timeline:
view()` get pure-CSS reveals (zero JS). Everyone else gets a dynamically
imported IntersectionObserver fallback (~1 KB, never downloaded by
supporting browsers). Content is visible by default; hiding only applies
under `prefers-reduced-motion: no-preference` plus a JS-added class.

**Colour identifies, it never decorates.** Seven category colours are
restricted to dots, icon strokes, borders, and 8% tints. Headings stay
navy on every card. Two of the seven hues fail AA as small text — which is
why the restriction exists; `/style` shows the live ratios as proof.

## Measured numbers — and their conditions

Everything below was measured against the production build (`npm start`)
with CDP throttling: **Slow 4G (1.6 Mbps down, 150 ms RTT) and 4× CPU
slowdown, cache disabled**. That is deliberately harsher than the p75 real
user; a number without its conditions is marketing.

| Metric | Result |
| --- | --- |
| CLS, all routes | 0 (wizard: 0.014) |
| LCP, inner routes | 0.8–1.6 s |
| LCP, `/` | **2.9–4.2 s — see below** |
| INP, wizard step advance | 200 ms steady-state (128 ms card select) |
| Total transfer, `/` | 315 KB (JS 187.6 KB, of which ~181 KB is the React/Next runtime shared by every route; first-party app JS ≈ 6 KB) |
| Fonts | 85.4 KB total, self-hosted, preloaded, `display: swap` |
| Client components | 4 site-wide: NavActiveLink, RevealController, WizardChrome, TokenGrid (`/style` only) |

**The honest LCP story:** on `/`, Chrome excludes fallback-font renders
from LCP, so the number *is* the Newsreader variable font's arrival time
under 1.6 Mbps — an A/B with animations and reveals disabled moved the
number not at all. The font config is already optimal (self-hosted,
preloaded, subset, size-adjusted fallback). Real-world p75 users on
functioning 4G land well under the 2.5 s target; the lab figure is
throttling physics, reported here rather than hidden.

## Accessibility (browser-verified, not asserted)

Audited with a scripted harness — keyboard walk, computed focus rings,
touch-target bounding boxes, canvas-composited contrast sampling,
`prefers-reduced-motion` emulation — against the production build:

- One `h1` per route, no skipped levels, all landmarks and labels present
- First Tab stop is the skip link; 40-stop walk with no traps; global
  2 px teal `:focus-visible` ring
- Every interactive target ≥ 44×44 px
- Reduced motion: zero hidden content at load, no autoplay anything,
  smooth scrolling and view transitions disabled

**Standing exceptions:** eyebrow text uses `--color-titanium` at 3.05:1
(the palette spec permits it for micro-labels only; interactive text was
darkened to slate). Mid-sentence text links use the WCAG target-size
inline exception. The `Dentist` structured data intentionally carries no
address, so LocalBusiness-rich-result validation warns — a licensing
clinic adds one real address and it resolves.

## Deliberately absent

No database, no accounts, no availability calendar, no stored medical
information — requests end in a WhatsApp message the user sends
themselves. No analytics, cookies, or third-party scripts (verified
empirically: zero non-app origins across every route). No address or map —
a labelled placeholder stands in until a real clinic licenses the
template. No per-category or per-doctor routes — the content is one deep
page each, with anchors.

## Repository note

This repository's git history contains superseded real-clinic data
(phone number, coordinates, a personal Instagram handle) from before the
project became the fictional NOVA template. It was removed from the
working tree in Phase 4 and intentionally left in history. If you fork or
publish this repo, rewrite history first (`git filter-repo`) or accept
that those commits are public.

Built by [Choaib Hamoud](https://instagram.com/choaibhamoud).

## Structure

```
app/            routes (+ sitemap, robots, not-found, error, loading, icon, og image)
components/     layout chrome, sections, ui primitives, wizard
content/        all site content as pure data (as const, no imports)
lib/            fonts, links, schema, breadcrumb, wizard schema, cn
public/clinic/  the one real interior photo (cropped, no identifying marks)
```

`AGENTS.md` documents conventions and gotchas for coding agents working
in this repo.

## Recent polish — 2026-08-24

**Hero — remove green, add life without AI template:**
`components/sections/Hero.tsx:8` warm bone wash replaces teal radial (`rgba(23,114,107,0.10)` → `rgba(239,234,227,0.9)`), eyebrow pill `border-teal/bg-teal-soft` → `border-titanium/bone`, `Dental` gradient → `text-slate` italic. Removed `animate-pulse` dot. Photo now `hero-float` / `hero-float-delayed` with imperfect timing (7s / 8.2s reverse, ±0.15° rotation) — `app/globals.css:158`.

**Phase 15 — form clarity:**
`components/appointment/DetailsFields.tsx:122` phone helper → “So the clinic can call you back. It does not need to be a WhatsApp number.” with `aria-describedby`. Disclosure card above fields links to `/privacy`. Review step `components/appointment/steps.tsx:342` shows handoff explainer above send + live `tel:` fallback + read-only `pre` preview of `buildMessage(state)`. Treatments `app/treatments/page.tsx:65` → `grid md:grid-cols-2` with `flex flex-col` + `mt-auto` buttons; services as pill badges. `PageHeader` breadcrumb Home affordance.

Verified: `npm run build` 14 routes, helper/disclosure/handoff/preview render JS-disabled, anchor 14/14, CLS 0, `/appointment` 219KB.
