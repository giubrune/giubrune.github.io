# Design plan (phase 3) — for approval

Status: **superseded (2026-10-22).** The hero is now the realistic soil profile with plants and solutes, static (see the decision log in CLAUDE.md). Colours, type and layout below still apply.

Decided so far (2026-10-21): text above the soil; animation about 5 s, only on the first visit of a browser session (finished picture after that); entry-point texts drafted from cv.md and CLAUDE.md, marked TODO; no “·” separators anywhere: use line breaks or spacing.

## 1. Idea in one line

The site is a soil profile: the home page opens on a cross-section of layered soil, water infiltrates from the surface and stops above the water table; the same water-table line closes every page as the footer. Everything else is quiet: white space, good type, thin rules, no decoration.

## 2. Tokens

### Colour (already in `src/styles/tokens.css`)

| Token | Light | Dark (“below the water table”) | Use |
|---|---|---|---|
| Background | Mineral white `#F5F6F3` | `#11191E` | page |
| Surface | `#ECEDE8` | `#18232A` | footer, quiet panels |
| Text | Graphite `#232B2B` | `#E3E6E1` | body text |
| Muted text | `#4D5654` | `#AAB3B1` | dates, metadata |
| Accent | Pore water `#2B6A8C` | `#7FB6D4` | links, focus, wetting front, water table |
| Loam | `#7D6340` | `#C9A978` | soil horizons, small accents (e.g. award note) |
| Silt | `#C9C0A8` | `#3C4A4F` | rules, soil textures — **never text** |
| Root green | `#4F6F45` | `#93B787` | company page and plant content only |

Measured contrast against the background (WCAG AA needs 4.5 for text):

| | Light | Dark |
|---|---|---|
| Text | 13.3 | 14.1 |
| Muted text | 7.0 | 8.3 |
| Pore water (links) | 5.5 | 8.1 |
| Loam | 5.2 | 8.0 |
| Root green | 5.2 | 7.9 |
| Silt | 1.7 (decorative only) | 1.9 (decorative only) |

Dark mode follows the visitor’s system setting. No toggle at first (can be added later).

### Type

- **Headings, navigation, labels, dates:** Familjen Grotesk (self-hosted), weight 600 for headings, 400–500 for UI.
- **Body text, research pages, the hero statement:** Source Serif 4 (self-hosted, optical sizes).
- Scale ≈ 1.25, fluid from 360 px to 1280 px wide: body 17–18 px, h1 35–51 px; the name in the hero one step larger (≈ 40–64 px).
- Body line length ≤ 68 characters. Sentence-case headings. No all-caps labels.

### Space and lines

- Spacing steps 4 / 8 / 12 / 16 / 24 / 32 / 48 / 80 px.
- Page width up to 1152 px, side margins 16–40 px.
- Separation by white space and 1 px silt rules, **not** by cards and shadows. Radius 3 px only on buttons and inputs.

## 3. Home page

### Desktop (≥ 900 px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Giuseppe Brunetti      Research  Publications  Software  Teaching  …  IT │  header
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Giuseppe Brunetti                                       (grotesk, big) │
│   Associate Professor                                     (grotesk, muted)│
│   Department of Civil Engineering                                        │
│   University of Calabria                                                 │
│                                                                          │
│   I study how water, solutes and contaminants move through the          │
│   unsaturated zone between the soil surface and the groundwater,        │  statement
│   and build the models to predict it.                     (serif, large) │
│                                                                          │
│ ▁▂▁▁▂▁▁▁▂▁▁ ground surface ▁▁▂▁▁ ⌇ ⌇ roots ⌇ ▁▁▂▁▁▁▁▂▁▁▁▁▂▁▁▁▁▂▁▁▁▁▂▁▁ │
│ ░░░░ topsoil: fine grains, roots ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ wetting front (pore water, translucent) ▓▓▓ │
│ ░ ░ ░ subsoil: dense small grains ░ ░ ▓▓▓▓▓▓▓▓░ ░ ░ ▓▓▓▓░ ░ ░ ░ ░ ░ ░ │
│ ∘   ∘   ∘ sand / gravel: coarse grains   ∘   ∘   ∘   ∘   ∘   ∘   ∘   ∘ │
│ ─────────────────────────────── water table ──────────────────────────── │
└──────────────────────────────────────────────────────────────────────────┘

    Research            Software            Teaching            Company
    Five themes, from   HYDRUS modules      Courses at the      The spin-off
    vadose zone flow    and pHydrus.        University of       company.
    to urban hydrology.                     Calabria and BOKU.          (text from content files)
    ─────────────────── thin silt rules between the four, no boxes ─────────

    Latest news                             Selected publications
    2025  Outstanding Paper Award …         Brunetti, G., et al. (2023). An in-depth
    2025  Invited talk at the EGU …           analysis of MCMC ensemble samplers …
    2025  Convener of an EGU 2025 …           Journal of Hydrology. doi
    All news                                (3 entries with keyword “selected”)
                                            All publications

    Open positions            (only shown when there is at least one)
    ▌PhD position on …  — deadline 31 December 2026          loam rule on the left

    ORCID     Web of Science ResearcherID     (others once known)   spacing, no separators

〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰 water table (footer top) 〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
    Contact     Sections     Research profiles                      footer
```

### Phone (360 px)

```
┌────────────────────────────┐
│ Giuseppe Brunetti   [Menu] │
├────────────────────────────┤
│ Giuseppe Brunetti          │
│ Associate Professor …      │
│                            │
│ I study how water, solutes │
│ and contaminants move …    │
│ ▁▂▁▁▂ surface ▁▁▂▁▁▂▁▁▂▁▁▂ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░ │  soil profile ≈ 220 px tall
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ░ ░ ░ ░ ▓▓▓▓ ░ ░ ░ ▓▓ ░ ░ │
│ ∘  ∘  ∘  ∘  ∘  ∘  ∘  ∘  ∘ │
│ ────── water table ─────── │
├────────────────────────────┤
│ Research                   │
│ Five themes, from …        │
│ ───────────                │
│ Software                   │
│ …  (stacked)               │
│ Latest news …              │
│ Selected publications …    │
└────────────────────────────┘
```

## 4. The hero animation

- **What it shows:** a cross-section with three soil horizons, drawn as subtle SVG textures (fine grains and a few roots in the topsoil, dense small dots in the subsoil, coarse grains in the sand). The colours come from the palette, so dark mode works automatically.
- **What moves:** a translucent pore-water layer grows down from the surface. Its lower edge is slightly irregular, like a real wetting front in heterogeneous soil. At each layer boundary its speed changes: it slows and spreads into fingers where it enters a coarser layer. It stops just above the water-table line.
- **Physics:** the front depth over time is computed at build time with a Green–Ampt model for layered soil, using textbook parameters for each texture. It is labelled as illustrative only; demo 2 will later reuse the same code with a proper explanation.
- **Duration:** about 5 seconds, played only on the first visit of a browser session; afterwards the finished picture is shown. Five seconds or less means no pause button is needed (WCAG 2.2.2). The “already played” flag lives in the browser’s session storage; if that is unavailable, the finished picture is shown.
- **Without motion:** with reduced motion enabled, or without JavaScript, the final picture is shown, already drawn, with nothing moving.
- **Weight:** inline SVG plus less than 3 kB of JavaScript, no libraries. The text (name, statement) is real HTML, so it is readable, searchable and translatable; the drawing is hidden from screen readers.

## 5. Other pages (template)

```
 header
 ──────────────────────────────────────────
 Page title                       (grotesk h1)
 One-paragraph introduction       (serif, ≤ 68 characters per line)

 Content: lists separated by white space and thin rules; figures full width
 of the text column or wider, with caption and credit below.
 ──────────────────────────────────────────
 〰〰〰〰 water table 〰〰〰〰  footer
```

No hero on inner pages. Optional later: a thin depth scale on the left edge of long research pages. I suggest leaving it out at first.

## 6. Avoided on purpose

No eyebrow labels in capitals, no grid of identical shadowed cards, no gradients, no fade-in on scroll, no arrows on every link, no 01/02/03 numbering. One animation on the whole site.

## 7. Content needed for the home page

- The four short entry-point texts (Research, Software, Teaching, Company). They will go in `src/content/pages/en/home.md` and `it/home.md`; drafts will use only facts from `cv.md` and CLAUDE.md, marked TODO.
- The research statement: currently the example from CLAUDE.md, marked TODO to confirm.
