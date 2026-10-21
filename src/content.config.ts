// Content collections: which content files exist and which fields each one must have.
// If a content file has a missing or misspelled field, the build stops with a message
// pointing to the file and the field. Files whose name starts with "_" (the templates)
// are ignored.
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

// ---------------------------------------------------------------------------
// Shared field types
// ---------------------------------------------------------------------------

/** Research tags used in publications.bib `keywords` (besides `selected` and `hidden`). */
export const publicationTags = [
  'vadose',
  'plant',
  'bayesian',
  'contaminants',
  'urban',
  'mar',
  'energy',
  'hydrus',
] as const;

/** Text in English with an optional Italian translation. */
const localized = z.object({
  en: z.string().min(1),
  it: z.string().min(1).optional(),
});

/** A year such as 2021. */
const year = z.number().int().min(1990).max(2100);

/** End of a period: a year, or "present" if still running. */
const endYear = z.union([year, z.literal('present')]);

/**
 * A date written as 2025, 2025-04 or 2025-04-30 (only as precise as known).
 * Stored as text, e.g. "2025" or "2025-04-30", so it sorts correctly.
 */
const partialDate = z
  .union([year, z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/), z.date()])
  .transform((d) => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d)));

const link = z.object({
  label: z.string().min(1),
  url: z.url(),
});

/** Glob loader that skips files starting with "_" (templates). */
const markdownIn = (dir: string) => glob({ base: `./src/content/${dir}`, pattern: '**/[^_]*.md' });

/** File loader for a YAML list in src/data/; entries are numbered automatically. */
const yamlList = (name: string) =>
  file(`src/data/${name}.yaml`, {
    parser: (text) =>
      ((parse(text) as Record<string, unknown>[] | null) ?? []).map((entry, i) => ({
        id: String(i + 1),
        ...entry,
      })),
  });

// ---------------------------------------------------------------------------
// Markdown collections (src/content/)
// ---------------------------------------------------------------------------

const research = defineCollection({
  loader: markdownIn('research'),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      /** Position on the Research page (1 = first). */
      order: z.number().int(),
      /** One plain-language sentence used on overview pages. */
      summary: z.string().min(1),
      /** Publications with any of these BibTeX keywords are listed on the theme page. */
      tags: z.array(z.enum(publicationTags)).min(1),
      keyQuestions: z.array(z.string()).default([]),
      figure: z
        .object({
          image: image(),
          alt: z.string().min(1),
          caption: z.string().min(1),
          credit: z.string().optional(),
        })
        .optional(),
    }),
});

const software = defineCollection({
  loader: markdownIn('software'),
  schema: ({ image }) =>
    z.object({
      name: z.string().min(1),
      /** Short name for menus and cards, e.g. “GOpt”. */
      shortName: z.string().optional(),
      order: z.number().int(),
      kind: z.enum(['hydrus-module', 'python-library', 'other']),
      /** One line: what the tool does. */
      purpose: z.string().min(1),
      /** BibTeX key (from publications.bib) of the paper to cite. */
      paper: z.string().optional(),
      links: z.array(link).default([]),
      /** Research themes (file names in src/content/research/) this tool belongs to. */
      themes: z.array(reference('research')).default([]),
      figure: z
        .object({
          image: image(),
          alt: z.string().min(1),
          caption: z.string().optional(),
        })
        .optional(),
    }),
});

const projects = defineCollection({
  loader: markdownIn('projects'),
  schema: z.object({
    title: z.string().min(1),
    acronym: z.string().optional(),
    /** Giuseppe’s role, e.g. “Principal Investigator”. */
    role: z.string().min(1),
    funder: z.string().min(1),
    start: year,
    end: endYear,
    status: z.enum(['current', 'past']),
    partners: z.array(z.string()).default([]),
    url: z.url().optional(),
    themes: z.array(reference('research')).default([]),
  }),
});

const teaching = defineCollection({
  loader: markdownIn('teaching'),
  schema: z.object({
    title: localized,
    institution: z.string().min(1),
    role: z.enum(['lecturer', 'invited-lecturer', 'teaching-assistant']).default('lecturer'),
    level: z.enum(['bsc', 'msc', 'phd', 'other']).optional(),
    /** Language of instruction. */
    language: z.enum(['en', 'it', 'de']).optional(),
    start: year,
    end: endYear,
    description: localized.optional(),
    materials: z
      .array(
        link.extend({
          kind: z.enum(['slides', 'notebook', 'dataset', 'video', 'other']).default('other'),
        }),
      )
      .default([]),
  }),
});

const news = defineCollection({
  loader: markdownIn('news'),
  schema: z.object({
    title: z.string().min(1),
    date: partialDate,
    type: z.enum(['paper', 'award', 'talk', 'project', 'teaching', 'event']),
    link: z.url().optional(),
  }),
});

const people = defineCollection({
  loader: markdownIn('people'),
  schema: ({ image }) =>
    z.object({
      name: z.string().min(1),
      group: z.enum(['current', 'alumni', 'collaborator']),
      /** E.g. “PhD student”, “Postdoctoral researcher”, “Professor”. */
      role: z.string().optional(),
      topic: z.string().optional(),
      affiliation: z.string().optional(),
      start: year.optional(),
      end: year.optional(),
      url: z.url().optional(),
      photo: image().optional(),
      order: z.number().int().default(100),
    }),
});

const openPositions = defineCollection({
  loader: markdownIn('positions'),
  schema: z.object({
    title: localized,
    type: z.enum(['phd', 'postdoc', 'msc', 'other']),
    /** Last day to apply. After this date the position is hidden automatically. */
    deadline: partialDate.optional(),
    description: localized,
    funding: z.string().optional(),
    url: z.url().optional(),
  }),
});

const company = defineCollection({
  loader: markdownIn('company'),
  schema: ({ image }) =>
    z.object({
      name: z.string().min(1),
      tagline: z.string().min(1),
      website: z.url().optional(),
      logo: image().optional(),
      services: z.array(z.object({ title: z.string(), description: z.string() })).default([]),
      caseStudies: z
        .array(z.object({ title: z.string(), description: z.string(), url: z.url().optional() }))
        .default([]),
      team: z.array(z.object({ name: z.string(), role: z.string() })).default([]),
    }),
});

/** Free-text pages and page introductions, in src/content/pages/en/ and src/content/pages/it/. */
const pages = defineCollection({
  loader: markdownIn('pages'),
  schema: z.object({
    title: z.string().min(1),
    /** Text for search engines and link previews. */
    description: z.string().optional(),
    /** Home page only: the one-sentence research statement shown in the hero. */
    statement: z.string().optional(),
  }),
});

// ---------------------------------------------------------------------------
// CV data (src/data/*.yaml)
// ---------------------------------------------------------------------------

/** Jobs held (positions.yaml). Not to be confused with open positions in src/content/positions/. */
const career = defineCollection({
  loader: yamlList('positions'),
  schema: z.object({
    start: year,
    end: endYear.optional(),
    title: z.string().min(1),
    unit: z.string().optional(),
    institution: z.string().min(1),
    place: z.string().min(1),
    note: z.string().optional(),
  }),
});

const education = defineCollection({
  loader: yamlList('education'),
  schema: z.object({
    start: year.optional(),
    end: year,
    degree: z.string().min(1),
    field: z.string().optional(),
    institution: z.string().optional(),
    place: z.string().min(1),
    note: z.string().optional(),
  }),
});

const awards = defineCollection({
  loader: yamlList('awards'),
  schema: z.object({
    year,
    title: z.string().min(1),
    by: z.string().optional(),
    place: z.string().optional(),
    note: z.string().optional(),
    url: z.url().optional(),
  }),
});

const service = defineCollection({
  loader: yamlList('service'),
  schema: z.object({
    role: z.string().min(1),
    items: z.array(z.string().min(1)).min(1),
  }),
});

const conferences = defineCollection({
  loader: yamlList('conferences'),
  schema: z.object({
    year,
    type: z.enum(['convener', 'co-convener', 'chair', 'keynote', 'invited']),
    title: z.string().min(1),
    event: z.string().min(1),
    place: z.string().optional(),
  }),
});

export const collections = {
  research,
  software,
  projects,
  teaching,
  news,
  people,
  openPositions,
  company,
  pages,
  career,
  education,
  awards,
  service,
  conferences,
};
