# Giuseppe Brunetti – personal website

Academic website built with [Astro 5](https://astro.build), Tailwind CSS and a little SolidJS (search).
Adapted from the Astro Sphere template (MIT).

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check + static build into dist/
```

## Where to edit content

| What | File(s) |
|---|---|
| Name, nav, profile links | `src/consts.ts` |
| Bio, hero text | `src/pages/index.astro` |
| Publications | `src/data/publications.bib` (see below) |
| Research lines, projects, awards, teaching, talks, editorial roles, education | `src/data/cv.ts` |
| Research map (positions, field sites, co-authors' institutions, per-country paper counts) | `src/data/places.ts` |
| Calabria soil-moisture map (page text) | `src/pages/soil-moisture.astro`, data script `scripts/fetch-soil-moisture.mjs` |
| Positions (Experience timeline) | `src/content/positions/*.md` |
| Software pages | `src/content/software/*.md` |
| News posts | `src/content/news/*.md` |
| Photo | `public/photo.jpg` (square, ~480 px) |

### Publications (BibTeX)

`src/data/publications.bib` is parsed at build time. Each entry's `keywords` field drives the website:

- topic tags: `vadose`, `inverse`, `soil-plant`, `transport`, `recharge`, `urban`, `modeling`
- `selected` – shows the paper on the home page

Entry types `@article`, `@incollection` and `@inproceedings` are supported. Write accented names in UTF-8 (e.g. `Šimůnek`), not LaTeX escapes.
Your own name (`Brunetti, Giuseppe`) is highlighted automatically.

### News post template

```markdown
---
title: "Short title"
summary: "One-line summary shown in lists and RSS."
date: "2026-12-01"
tags: ["Paper"]
---

Body in Markdown.
```

## Calabria soil-moisture map

The page `/soil-moisture` is rebuilt every night by the GitHub Actions workflow (schedule in `.github/workflows/deploy.yml`).
The workflow runs `npm run fetch:soil`, which downloads the last 31 days of modelled soil moisture (0–7 and 7–28 cm) and rainfall from
[Open-Meteo](https://open-meteo.com/) for the centre of each of the 404 municipalities (about 9 seconds, ~400 API calls of the 10,000/day free quota)
and writes `src/data/generated/soil-moisture.json` (~90 kB, not committed). If the download fails, the previous day's data are reused.

Nothing is stored on your computer. To preview the map locally, run `npm run fetch:soil` once before `npm run dev`.

## Deploy (GitHub Pages)

1. Create a repository named **`<your-username>.github.io`** and push this folder to its `main` branch.
2. In the repository, go to *Settings → Pages → Build and deployment* and set *Source* to **GitHub Actions**.
3. Every push to `main` rebuilds and publishes the site at `https://<your-username>.github.io`.

For a custom domain, add it under *Settings → Pages*, add `public/CNAME` containing the domain, and change `SITE_URL` in `.github/workflows/deploy.yml`.
