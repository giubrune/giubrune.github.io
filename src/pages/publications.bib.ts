import type { APIRoute } from "astro"
import bib from "../data/publications.bib?raw"

export const GET: APIRoute = () =>
  new Response(bib, { headers: { "Content-Type": "application/x-bibtex; charset=utf-8" } })
