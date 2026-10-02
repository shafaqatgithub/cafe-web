# EMBER & CRUMB — Design System

Derived with the **ui-ux-pro-max** skill (`.claude/skills/ui-ux-pro-max`) from its catalog entries:

| Skill source | Entry used | What we took |
| --- | --- | --- |
| `ui-reasoning.csv` #33 Luxury/Premium Brand | Storytelling-driven pattern | Slow parallax, premium reveals 400–600 ms; anti-pattern: cheap visuals + fast animations |
| `styles.csv` #66 Editorial Grid / Magazine | Asymmetric grid, pull quotes, column layout | Section layouts, numbered eyebrows, oversized italics |
| `styles.csv` #47 Exaggerated Minimalism | `clamp()` display type, massive negative space, single accent | Hero + footer wordmark scale, one gold accent |
| `typography.csv` #1 Classic Elegant / #4 Editorial Classic | Serif display + neutral sans | Cormorant Garamond + Manrope |
| `colors.csv` #63 Bakery/Cafe, #33 Luxury | Warm brown + cream; black + gold | Re-tuned to a dark espresso base with caramel/gold |
| `motion.csv` #3, #5, #9, #13 | Magnetic hover, staggered reveal, expo text reveal, scrub parallax | Interaction + scroll choreography presets |

> Deliberately rejected from the skill's default *Bakery/Cafe* row: "Vibrant & Block-based / Claymorphism" — conflicts with the brief (no SaaS / childish styling).

## Color tokens (dark, warm, cinematic)

| Token | Hex | Use | Contrast on `--espresso-950` |
| --- | --- | --- | --- |
| `--espresso-950` | `#0E0A08` | Page background | — |
| `--espresso-900` | `#16100C` | Raised surfaces, section alternation | — |
| `--espresso-800` | `#221812` | Cards, menu panels | — |
| `--espresso-700` | `#3A2A20` | Hairlines on hover, dividers | — |
| `--cream-50` | `#F5ECDD` | Primary text, headlines | ~16:1 |
| `--cream-200` | `#D9CBB6` | Body text | ~11:1 |
| `--cream-400` | `#A8977F` | Muted / captions (≥14px) | ~6.5:1 |
| `--caramel-400` | `#D3A066` | Accent: CTAs, numerals, rules | ~8:1 |
| `--caramel-600` | `#9C6B3A` | Accent pressed / decorative | — |
| `--ember-500` | `#C4572E` | Tiny ember glint only (dots, steam glow) | — |
| `--line` | `rgba(245,236,221,0.12)` | 1px editorial hairlines | — |

Rule: **one accent** (caramel). No gradients except atmospheric vignettes/grain on imagery.

## Typography

- **Display:** Cormorant Garamond 300/400/500, italic 300/400 — headlines, wordmark, numerals, menu item names.
- **Text:** Manrope 300/400/500/600 — body, nav, labels, buttons.
- Scale (fluid): `display-xl clamp(4rem, 13vw, 14rem)` · `display-l clamp(3rem, 7vw, 7.5rem)` · `h2 clamp(2.5rem, 5vw, 5rem)` · `h3 clamp(1.5rem, 2.2vw, 2.25rem)` · body `1rem–1.125rem / 1.65` · eyebrow `0.72rem, 0.32em tracking, uppercase`.
- Display tracking `-0.02em`, line-height `0.9–1.0`. Italic used for emphasis words ("*slowly*", "*warmly*").

## Spacing & layout

- 8pt base: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192`.
- Section padding: `clamp(6rem, 14vw, 12rem)` vertical. Gutter `clamp(1.25rem, 4vw, 3.5rem)`.
- 12-column editorial grid, max content width 1440px; asymmetric splits (5/7, 4/8).

## Shape, surfaces, shadow

- Radius: **2px** max on cards/images (editorial, not SaaS). Buttons: full pill *or* square — we use pill only for the primary CTA, hairline square for secondary.
- Shadows: almost none. Depth via layered tone (950→900→800) + `--shadow-deep: 0 40px 80px -40px rgba(0,0,0,0.7)` on floating imagery only.
- Texture: animated-free film grain overlay (SVG noise, 4–6% opacity) + radial vignette on imagery.

## Buttons

- **Primary** — caramel fill `#D3A066`, espresso text, pill, 52px tall, magnetic (strength 0.3), label slides up on hover and is replaced by a duplicate (text roll).
- **Ghost** — 1px cream hairline, cream text; hover fills cream at 8% and the arrow nudges 4px.
- **Link** — underline drawn left→right on hover (scaleX), 1px caramel.
- Min touch target 44×44; visible `:focus-visible` ring `2px caramel` + 3px offset.

## Cards (menu)

- No boxes: hairline top border, number, serif name, origin/notes, price aligned right. Hover: image reveal (desktop), border turns caramel, row lifts 2px. Featured card: 4:5 image, `rounded-[2px]`.

## Motion

| Use | Library | Easing | Duration |
| --- | --- | --- | --- |
| Section reveals (fade + rise + blur→sharp, staggered) | GSAP ScrollTrigger | `expo.out` / `power4.out` | 1.1–1.4s, stagger 0.08 |
| Line / word headline reveals | GSAP | `power4.out` | 1.2s |
| Scrubbed: frame sequence, parallax, SVG draw, pins | GSAP + Lenis | `none` (scroll is the easing; Lenis smooths) | — |
| Count-ups | GSAP | `power3.out` | 2s |
| Buttons, nav, cards, mobile menu | Motion | `[0.16, 1, 0.3, 1]` (expo-out) | 0.35–0.8s |
| Preloader curtain | GSAP | `expo.inOut` | 1.2s |

Reduced motion: no frame scrub (static poster frame), no parallax/pins/3D motion/cursor; reveals become instant.

## Voice

Quiet, sensory, unhurried. Short sentences. Numbers in serif italic.
