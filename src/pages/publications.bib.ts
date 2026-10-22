// /publications.bib — all publications as one BibTeX file (entries marked “hidden” excluded).
import { bibtexAll } from '../lib/publications';

export function GET() {
  return new Response(bibtexAll, { headers: { 'Content-Type': 'application/x-bibtex; charset=utf-8' } });
}
