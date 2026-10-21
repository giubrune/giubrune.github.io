# CLAUDE.md — Personal website of Giuseppe Brunetti

This file is the project brief. Read it at the start of every session and keep it up to date when decisions change (add them to the "Decision log" at the bottom).

## 1. Who the site is for

**Owner:** Giuseppe Brunetti, Associate Professor, Department of Civil Engineering, University of Calabria (Rende, Italy). Vadose zone hydrologist and numerical modeler. Co-developer of several HYDRUS modules and the pHydrus Python library. Founder of a spin-off company (details: see `TODO` in section 9).

**Audiences, in priority order:**
1. Prospective PhD students, postdocs and MSc thesis students (Italian and international).
2. Research collaborators and funders looking for expertise, papers, projects.
3. Users of his software (HYDRUS modules, pHydrus).
4. Potential clients/partners of the spin-off company.
5. His own students looking for course material.

**Primary job of the site:** show in under a minute what he works on, what he has built, and how to work with him.

## 2. Working rules for Claude Code

- **The owner does not write code.** He edits content only. All content must live in `src/content/` (Markdown/MDX) and `src/data/` (YAML, BibTeX). **Never hardcode content in components.** If a component needs text, it comes from a content file.
- Keep content files simple and commented, so a non-developer can edit them safely. Every collection gets a `_template.md` (excluded from the build) showing every field.
- Validate content with Astro content-collection schemas (zod) so a typo in a content file gives a clear build error, not a broken page.
- Work in small, reviewable steps. After each working step: run `npm run build`, fix errors, then `git commit` with a clear message.
- When something is ambiguous about content, ask the owner; don't invent facts about his career, company or papers. Placeholder text must be marked `TODO:` so it is easy to find.
- Explain changes briefly in plain language at the end of each step (what changed, which file to edit to change it).
- In visible text, use typographic punctuation (’ “ ”), sentence case headings.

## 3. Tech stack

- **Astro** (latest stable), TypeScript, static output.
- Styling: plain CSS with custom properties (design tokens in `src/styles/tokens.css`). No CSS framework.
- Interactivity: Astro islands. Prefer vanilla TS/Web Components or Preact for small widgets; keep JS off pages that don't need it.
- Publications: parsed at build time from `src/data/publications.bib` (e.g. with `@citation-js/core` + `@citation-js/plugin-bibtex`, or `bibtex-parse`).
- i18n: Astro built-in i18n. English is default (`/`), Italian under `/it/`. Not every page needs an Italian version at launch; required in Italian: Home, Join us/Opportunities, Teaching. Others fall back to English.
- Deploy: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`), custom domain support (`public/CNAME`, domain `TODO`).
- SEO: per-page title/description, Open Graph image, `sitemap`, schema.org `Person` + `ScholarlyArticle` JSON-LD, RSS feed for News.
- No tracking cookies. If analytics are added later, use a cookieless option (e.g. Plausible/Umami).
- Quality floor: responsive to 360 px, keyboard accessible, visible focus, `prefers-reduced-motion` respected, Lighthouse ≥ 95 on all four categories, WCAG AA contrast.

## 4. Site map

```
/                     Home
/research/            Research themes (overview)
/research/[slug]/     One theme in depth
/publications/        Full list, filterable
/software/            HYDRUS modules + pHydrus
/projects/            Funded research projects (current and past)
/teaching/            Courses and open teaching material
/company/             The spin-off company
/people/              Group: current members, alumni, collaborators (can start small)
/join/                Opportunities: PhD, postdoc, MSc theses
/news/                News and talks
/cv/                  Short web CV + PDF download
/contact/             Contact, address, map link, profiles
/it/...               Italian versions where available
```

## 5. Page specifications

### Home
- **Hero:** the one memorable element of the site (see design section). Name, role, one-sentence statement of research, e.g. “I study how water, solutes and contaminants move through the unsaturated zone between the soil surface and the groundwater, and build the models to predict it.” (owner to confirm wording).
- Four short entry points: Research, Software, Teaching, Company.
- Latest 3 news items, 3 selected publications, current open positions (if any).
- Profile links: ORCID `0000-0001-7943-8088`, ResearcherID `Y-5359-2019`, Scopus, Google Scholar (`TODO`), GitHub (`TODO`), LinkedIn (`TODO`).

### Research
Themes (from the CV; one Markdown file each in `src/content/research/`):
1. **Vadose zone flow and transport** — variably saturated flow, preferential flow, nonequilibrium transport, isotopes, managed aquifer recharge, groundwater recharge.
2. **Soil–plant–contaminant modeling** — mechanistic plant uptake, translocation of pharmaceuticals and ionizable compounds, water and carbohydrate allocation in fruits.
3. **Bayesian inference and model complexity** — MCMC samplers, information content of data, model selection, global optimization.
4. **Emerging contaminants in porous media** — microplastics, pesticides, nitrogen turnover, biochar filters.
5. **Nature-based solutions and urban hydrology** — green roofs, permeable pavements, green infrastructure, shallow geothermal (borehole heat exchangers, heat below the city).

Each theme page: short narrative (plain language first, then technical), one key figure, key questions, related publications (auto-pulled by BibTeX `keywords` tag), related software, related projects.

### Publications
- Generated from `src/data/publications.bib`. Group by year, newest first.
- Filters: by research theme (BibTeX `keywords`), by type (journal / chapter / conference), free-text search. Client-side, small island.
- Owner's name highlighted in author lists. Students/postdocs supervised can be marked later (`TODO`).
- Each entry: authors, title, venue, year, DOI link, optional links (PDF, data, code) from custom BibTeX fields `url_pdf`, `url_code`, `url_data`.
- Entries with keyword `selected` appear on Home and research pages. Entries with field `award` show a small award note.
- “Download BibTeX” for each entry and for the whole list.
- Show total count and a simple per-year bar chart (inline SVG, generated at build time).

### Software
Cards from `src/content/software/`, one per tool: name, one-line purpose, what problem it solves, a figure/screenshot, key paper to cite, links.
- **Global Optimization (GOpt) module for HYDRUS** — https://www.pc-progress.com/en/Default.aspx?hydrus-module-GOpt — related paper: Brunetti et al. 2022, Environmental Modelling & Software (hybrid global–local optimization).
- **Dynamic Plant Uptake (DPU) module for HYDRUS** — https://www.pc-progress.com/en/Default.aspx?hydrus-module-DPU — Brunetti et al. 2019, WRR.
- **Furrow module for HYDRUS** — https://www.pc-progress.com/en/Default.aspx?h3d2-Furrow — Brunetti et al. 2018, Computers and Electronics in Agriculture.
- **COSMIC module for HYDRUS** — https://www.pc-progress.com/en/Default.aspx?h1d-lib-Cosmic — Brunetti et al. 2019, Vadose Zone Journal (cosmic-ray neutron data).
- **pHydrus** (Python library to interact with HYDRUS) — https://pHydrus.readthedocs.io/en/latest/

### Interactive demos (islands, client-side only)
Build in this order; each is optional and lazy-loaded. Each has a short plain-language explanation and a link to the related paper.
1. **Soil hydraulic properties explorer** — sliders for van Genuchten–Mualem parameters (θr, θs, α, n, Ks, l); plots θ(h) and K(h) on log axes; presets for sand, loam, clay (Carsel & Parrish values).
2. **Infiltration in a layered soil** — simple 1D numerical solution (or Green–Ampt for a first version) showing a wetting front moving through two layers; the user picks soils and rainfall intensity.
3. **Bayesian calibration in miniature** — a toy 2-parameter posterior with a sampler (random-walk Metropolis vs. an ensemble sampler) drawing the chain live; links to the MCMC paper (J. Hydrol. 2023).
Use canvas/SVG; no heavy charting library unless needed. Respect reduced motion (show static result).

### Projects
From `src/content/projects/`: title, acronym, role (PI / Co-PI / WP leader), funder, period, status (current/past), short description, partners, link. Seed from the CV:
- PI — Data-informed Bayesian probabilistic platform for dynamic calibration of vadose zone hydrological models — Rita Levi Montalcini Program (MUR) — 2022–
- PI — PREMOD: Preferential flow and nonequilibrium transport in agricultural hillslope — WTZ — 2021–
- Co-PI & WP leader — EROS-A: Soil erosion in Austria, from mean to extreme — ACRP — 2022–
- Co-PI & WP leader — Heat below the city — City of Vienna, WWTF — 2021–
- Co-PI & supervisor — Macro- and microplastics in agricultural soil systems — Marie Skłodowska-Curie ITN — 2020–
- Co-PI & WP leader — Physical–biological biochar filters for groundwater remediation — Forschung Altlastensanierung — 2020–
- Co-PI & WP leader — Variability of groundwater recharge rates in Austria — Austrian Academy of Sciences — 2019–
(Owner to confirm which are still current and add end dates.)

### Teaching
From `src/content/teaching/`: course name (EN/IT), institution, level, years, description, language of instruction, materials links (slides, notebooks, datasets). Current: Integrated Hydrological Modeling (UniCal, 2025–), Hydraulic Constructions (UniCal, 2023–), Soil Physical Modeling with Python (BOKU, 2022–), Simulation in the Vadose Zone Environment (BOKU, 2022–), Development and Application of Water Erosion Models (BOKU, 2019–), Soil Erosion Models and Their Application (BOKU, 2019–). Past: Hydrology (UniCal 2023–24), Computing Seminars on Hydraulics and Rural Water Management (BOKU 2019–21), invited lecturer at University of Zagreb (2018), teaching assistant at UniCal (2016–17).
Optional later: render Jupyter notebooks as pages (MDX or pre-converted HTML).

### Company (spin-off)
From `src/content/company/index.md`. Sections: what the company does, services, selected case studies, team, contact/website link, logo. Visually connected to the rest of the site but with its own accent (see design). **All content TODO — ask the owner.**

### People / Join
- People: current members (photo, role, topic), alumni, key collaborators (e.g. Jiří Šimůnek, Christine Stumpp, Radka Kodešová, Helen Dahlke). Starts as TODO.
- Join: open positions (with deadlines; hide expired automatically), standing invitation for MSc theses, what candidates should send. Italian version required.

### News & talks
`src/content/news/`: date, title, type (paper, award, talk, project, teaching), body. Seed with awards and talks from the CV:
- 2025 Outstanding Paper Award (Vadose Zone Journal, CANVAS 2025, Salt Lake City) for the HYDRUS developments paper.
- 2025 Invited talk, EGU, “Bayesian Inference in Physically-based Vadose Zone Modeling: The Good, The Bad and The Ugly”.
- 2025 Convener, EGU session on hydrological processes and contaminant transport in the vadose zone.
- 2023 Keynote and conference chair, 7th HYDRUS Conference, Prague: “Re-greening HYDRUS: towards a unified physically-based soil–plant model”.
- 2022 Winner, “Rita Levi Montalcini” Young Researchers Program (MUR).
- 2018 International Soil Modeling Consortium Early Career Award (Wageningen).
- 2017 Marie Skłodowska-Curie Seal of Excellence; Outstanding Reviewer, Journal of Hydrology; Keynote, 5th HYDRUS Conference, Prague.

### CV
Web version generated from `src/data/` YAML files: `positions.yaml`, `education.yaml`, `awards.yaml`, `service.yaml` (editorial boards: Journal of Hydrology, Vadose Zone Journal, SSSA Journal, Frontiers in Water, Journal of Hydrology and Hydromechanics; reviewing; project evaluation for MUR, WTZ, Czech Science Foundation), `conferences.yaml`. Plus a PDF download (`public/cv/Brunetti_CV.pdf`, provided by owner). Use the CV PDF in `reference/` as the source for all of these.

## 6. Design direction

**Concept: the vadose zone as the site’s structure.** The unsaturated zone is the region between the soil surface and the water table. The site uses that vertical journey as its single bold idea; everything else is quiet and disciplined.

- **Hero (the one memorable moment):** a full-width cross-section of a layered soil profile (a few horizons with distinct textures drawn as subtle SVG patterns: grains, pores, roots near the top). On load, a wetting front infiltrates slowly downward, its shape changing at the layer boundaries, and stops above a thin water table line. Name and statement sit on the “surface”. One orchestrated animation only; static on reduced motion. Ideally driven by real (simplified) physics from demo 2.
- **Depth as navigation metaphor (light touch):** the water table line reappears as the footer boundary. Optionally a thin depth scale on the left of long pages. Don’t overdo it.
- **Palette (starting point, refine with contrast checks):**
  - Mineral white `#F5F6F3` (background)
  - Graphite `#232B2B` (text)
  - Pore water `#2B6A8C` (links, interactive elements, the wetting front)
  - Loam `#7D6340` (secondary accent, soil horizons)
  - Silt `#C9C0A8` (rules, soil patterns, muted UI)
  - Root green `#4F6F45` (only for the company section accent and plant-related content)
  - Provide a dark mode (“below the water table”: deep blue-graphite background, same hues adjusted).
- **Type:** a characterful but readable pairing, e.g. *Source Serif 4* for body text and long-form research pages, *Familjen Grotesk* (or similar humanist grotesque) for headings, navigation and UI. Self-host the fonts. Clear type scale, body line length ≤ 75 characters.
- **Avoid templated tells:** no all-caps eyebrow labels over every heading, no identical rounded-card grids with soft shadows everywhere, no gradient washes, no fade-up on every section, no “→” on every link, no numbered 01/02/03 markers unless content is a real sequence (timelines are fine).
- **Figures matter:** research is visual. Give figures room, with proper captions and credits.
- Before building the UI, write a short design plan (tokens, wireframes in ASCII) and show it to the owner for approval.

## 7. Repository layout (target)

```
/
├── CLAUDE.md
├── reference/                 # source material, not published (CV PDF, photos to process)
├── public/                    # static files: CNAME, favicon, cv/, images used as-is
├── src/
│   ├── content/
│   │   ├── research/          # one .md per theme
│   │   ├── software/
│   │   ├── projects/
│   │   ├── teaching/
│   │   ├── news/
│   │   ├── people/
│   │   ├── positions/         # open positions (Join page)
│   │   ├── company/
│   │   └── pages/             # about/bio text, home statement, (en + it)
│   ├── data/
│   │   ├── profile.yaml       # name, titles, contacts, profile IDs, photo
│   │   ├── positions.yaml  education.yaml  awards.yaml  service.yaml  conferences.yaml
│   │   └── publications.bib
│   ├── components/            # incl. islands/ for interactive demos
│   ├── layouts/
│   ├── pages/
│   ├── i18n/                  # UI strings en/it
│   └── styles/tokens.css
└── .github/workflows/deploy.yml
```

Include a short `EDITING.md` for the owner: “to add a paper, add a BibTeX entry here; to add news, copy `_template.md` here…”, with the exact commands to preview (`npm run dev`) and publish (`git push`).

## 8. Build plan (phases)

1. **Scaffold:** Astro project, tokens, base layout, nav, footer, i18n skeleton, deploy workflow. Deploy a placeholder to GitHub Pages. Commit.
2. **Content model:** collections + schemas + templates; populate from `reference/CV.pdf` and this file. Commit.
3. **Design plan → approval → Home page with hero.**
4. Publications page (BibTeX pipeline, filters, per-year chart).
5. Research, Software, Projects pages.
6. Teaching, Join, People, News, CV, Contact.
7. Company page (after owner provides content).
8. Interactive demos 1 → 3.
9. Italian pages, SEO, performance and accessibility pass, `EDITING.md`.

## 9. TODO — information needed from the owner

- [ ] Spin-off company: name, website, logo, what it does, services, case studies, team.
- [ ] Domain name (and whether to also keep a UniCal profile link).
- [ ] Profile photo (and optional photos of field sites/labs/figures for research pages).
- [ ] Google Scholar, Scopus, GitHub, LinkedIn URLs.
- [ ] Short bio (EN + IT) and the one-sentence research statement.
- [ ] Which projects are still running; end dates.
- [ ] Current group members and alumni (if any to show).
- [ ] Open positions / thesis topics.
- [ ] Publication checks (also noted in `publications.bib`):
  - [32] *Cells* 2019 (breast cancer / GPER paper) looks like a different “Giuseppe Brunetti” (namesake) — confirm and probably remove; also fix it in Scopus/ORCID if misattributed.
  - [3] WRR “Unified physically-based model…” — update with volume/DOI once published.
  - [46] 2014 conference paper — missing proceedings title.
  - Optional: links to PDFs/code/data per paper.

## 10. Decision log

- 2026-10: Stack chosen: Astro + GitHub Pages, content in Markdown/YAML/BibTeX, EN default with IT pages. Design concept: soil profile / vadose zone cross-section hero.
- 2026-10-21 (phase 1 scaffold):
  - Node 24 LTS, Astro 7.4. TypeScript pinned to 6.x because `@astrojs/check` does not support TS 7 yet. `npm run build` = `astro check && astro build`.
  - Fonts self-hosted via Fontsource packages (Source Serif 4 with optical sizes, Familjen Grotesk), imported in `src/styles/global.css`.
  - `site`/`base` come from `SITE`/`BASE` env vars set by the deploy workflow (from `actions/configure-pages`), so the site works on a `*.github.io/<repo>/` sub-path now and on the custom domain later. All internal links must go through `href()` (`src/lib/url.ts`) or `localizedHref()` (`src/i18n/utils.ts`).
  - i18n: no Astro `fallback` (it conflicted with `/it/` routes). Instead, `translatedPaths` in `src/i18n/ui.ts` lists the paths that have an Italian version; Italian pages link straight to the English page for everything else, and the language switch goes to the other language’s home when no translation exists. Add a path there when its Italian page is created.
  - Interface text (menus, labels) lives in `src/i18n/ui.ts`; profile data in `src/data/profile.yaml`, validated by `src/lib/profile.ts`.
  - Unbuilt sections are served by the temporary `src/pages/[section].astro` (and `src/pages/it/[section].astro`); remove a section from its list when its real page is added.
  - `reference/` is git-ignored so the CV and source files stay out of the (public) repository; `publications.bib` will be copied to `src/data/` in phase 2.
  - No `public/CNAME` until the domain is known (an invalid CNAME breaks GitHub Pages).
