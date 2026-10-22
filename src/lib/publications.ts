// Reads src/data/publications.bib at build time.
// Entries with the keyword “hidden” are left out of the site; “selected” marks entries
// shown on the home page. Custom fields: url_pdf, url_code, url_data, award, note.
import raw from '../data/publications.bib?raw';
import { profile } from './profile';

export interface Publication {
  key: string;
  type: 'article' | 'chapter' | 'conference';
  authors: { name: string; isOwner: boolean }[];
  title: string;
  venue: string;
  year: number;
  volume?: string;
  pages?: string;
  doi?: string;
  note?: string;
  award?: string;
  links: { kind: 'pdf' | 'code' | 'data'; url: string }[];
  tags: string[];
  selected: boolean;
  bibtex: string;
}

/** Split the file into entries, respecting nested braces. */
function entries(text: string) {
  const out: { type: string; key: string; body: string; source: string }[] = [];
  const re = /@(\w+)\s*\{\s*([^,\s]+)\s*,/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    let depth = 1;
    let i = re.lastIndex;
    while (i < text.length && depth > 0) {
      if (text[i] === '{') depth++;
      else if (text[i] === '}') depth--;
      i++;
    }
    out.push({ type: m[1].toLowerCase(), key: m[2], body: text.slice(re.lastIndex, i - 1), source: text.slice(m.index, i) });
    re.lastIndex = i;
  }
  return out;
}

/** Parse “name = {value}” fields. */
function fields(body: string) {
  const out: Record<string, string> = {};
  const re = /(\w+)\s*=\s*\{/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    let depth = 1;
    let i = re.lastIndex;
    while (i < body.length && depth > 0) {
      if (body[i] === '{') depth++;
      else if (body[i] === '}') depth--;
      i++;
    }
    out[m[1].toLowerCase()] = body.slice(re.lastIndex, i - 1).replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();
    re.lastIndex = i;
  }
  return out;
}

/** “Last, First Middle” → “F. M. Last”. */
function shortName(name: string) {
  const [last, first = ''] = name.split(',').map((s) => s.trim());
  const initials = first
    .split(/[\s]+/)
    .filter(Boolean)
    .map((p) => p.split('-').map((q) => `${q[0]}.`).join('-'))
    .join(' ');
  return initials ? `${initials} ${last}` : last;
}

const ownerLast = profile.name.split(' ').slice(-1)[0];
const ownerFirst = profile.name.split(' ')[0];
const TYPES: Record<string, Publication['type']> = {
  article: 'article',
  incollection: 'chapter',
  inbook: 'chapter',
  inproceedings: 'conference',
  conference: 'conference',
};

/** Strip “TODO …” remarks from notes so they don’t show on the site. */
const cleanNote = (note?: string) => note?.replace(/\.?\s*TODO.*$/i, '').trim() || undefined;

export const publications: Publication[] = entries(raw)
  .map((e) => {
    const f = fields(e.body);
    const tags = (f.keywords ?? '').split(',').map((k) => k.trim()).filter(Boolean);
    const authors = (f.author ?? '').split(/\s+and\s+/).map((a) => {
      const [last, first = ''] = a.split(',').map((s) => s.trim());
      return { name: shortName(a), isOwner: last === ownerLast && first.startsWith(ownerFirst) };
    });
    const links = (['pdf', 'code', 'data'] as const)
      .filter((k) => f[`url_${k}`])
      .map((k) => ({ kind: k, url: f[`url_${k}`] }));
    return {
      key: e.key,
      type: TYPES[e.type] ?? 'article',
      authors,
      title: f.title ?? '',
      venue: f.journal ?? f.booktitle ?? '',
      year: Number(f.year),
      volume: f.volume,
      pages: f.pages,
      doi: f.doi,
      note: cleanNote(f.note),
      award: f.award,
      links,
      tags: tags.filter((t) => t !== 'selected' && t !== 'hidden'),
      selected: tags.includes('selected'),
      hidden: tags.includes('hidden'),
      bibtex: e.source.trim(),
    };
  })
  .filter((p) => !p.hidden)
  .map(({ hidden: _hidden, ...p }) => p)
  .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

/** The whole file, without hidden entries, for the “download all” link. */
export const bibtexAll = publications.map((p) => p.bibtex).join('\n\n') + '\n';

export const byYear = (list: Publication[]) => {
  const years = [...new Set(list.map((p) => p.year))].sort((a, b) => b - a);
  return years.map((year) => ({ year, items: list.filter((p) => p.year === year) }));
};
