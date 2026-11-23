// Parses src/data/publications.bib at build time.
import bibRaw from "../data/publications.bib?raw"
// @ts-expect-error: package ships without type declarations
import bibtexParse from "@orcid/bibtex-parse-js"

export const TOPICS: Record<string, string> = {
  vadose: "Vadose zone hydrology",
  inverse: "Bayesian inference & calibration",
  "soil-plant": "Soil–plant modeling",
  transport: "Solute & contaminant transport",
  recharge: "Groundwater recharge",
  urban: "Green infrastructure & urban hydrology",
  modeling: "Model & software development",
}

export type Author = { last: string; first: string; initials: string; isMe: boolean }

export type Publication = {
  key: string
  type: "article" | "incollection" | "inproceedings" | string
  title: string
  authors: Author[]
  year: number
  venue: string
  series?: string
  volume?: string
  number?: string
  pages?: string
  doi?: string
  url?: string
  topics: string[]
  selected: boolean
  bibtex: string
}

const clean = (s = "") => s.replace(/[{}]/g, "").replace(/\s+/g, " ").trim()

function parseAuthor(raw: string): Author {
  const s = clean(raw)
  let last: string, first: string
  if (s.includes(",")) {
    ;[last, first] = s.split(",").map((x) => x.trim())
  } else {
    const parts = s.split(" ")
    last = parts.pop() ?? ""
    first = parts.join(" ")
  }
  const initials = first
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p.split("-").map((q) => q.replace(/\.$/, "")[0] + ".").join("-"))
    .join(" ")
  const isMe = last === "Brunetti" && /^Giuseppe\b/.test(first)
  return { last, first, initials, isMe }
}

function toBibtex(key: string, type: string, tags: Record<string, string>) {
  const fields = ["author", "title", "journal", "booktitle", "series", "publisher", "year", "volume", "number", "pages", "doi"]
  const body = fields
    .filter((f) => tags[f])
    .map((f) => `  ${f} = {${clean(tags[f])}}`)
    .join(",\n")
  return `@${type}{${key},\n${body}\n}`
}

const entries: any[] = bibtexParse.toJSON(bibRaw)

export const publications: Publication[] = entries
  .filter((e) => e.entryTags && e.entryType?.toLowerCase() !== "comment")
  .map((e) => {
    const t: Record<string, string> = Object.fromEntries(
      Object.entries(e.entryTags as Record<string, string>).map(([k, v]) => [k.toLowerCase(), v]),
    )
    const type = e.entryType.toLowerCase()
    const kw = (t.keywords ?? "").split(",").map((k) => k.trim()).filter(Boolean)
    return {
      key: e.citationKey,
      type,
      title: clean(t.title),
      authors: (t.author ?? "").split(/\s+and\s+/).map(parseAuthor),
      year: Number(t.year),
      venue: clean(t.journal || t.booktitle),
      series: clean(t.series) || undefined,
      volume: clean(t.volume) || undefined,
      number: clean(t.number) || undefined,
      pages: clean(t.pages).replace("--", "–") || undefined,
      doi: clean(t.doi) || undefined,
      url: clean(t.url) || undefined,
      topics: kw.filter((k) => k in TOPICS),
      selected: kw.includes("selected"),
      bibtex: toBibtex(e.citationKey, type, t),
    }
  })
  .sort((a, b) => b.year - a.year || a.authors[0].last.localeCompare(b.authors[0].last))

export const TYPE_LABEL: Record<string, string> = {
  article: "Journal article",
  incollection: "Book chapter",
  inproceedings: "Conference paper",
}

export function citationLine(p: Publication) {
  let s = p.venue
  if (p.volume && p.volume !== String(p.year)) s += ` ${p.volume}`
  if (p.number) s += `(${p.number})`
  if (p.pages) s += `, ${p.pages}`
  return s
}

export const pubByKey = (key: string) => publications.find((p) => p.key === key)
