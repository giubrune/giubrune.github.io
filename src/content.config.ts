import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const news = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().optional(),
  }),
})

const software = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/software" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    kind: z.string(),            // e.g. "HYDRUS module", "Python library"
    order: z.number().default(99),
    tags: z.array(z.string()).default([]),
    homepage: z.string().url().optional(),
    docsUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    papers: z.array(z.string()).default([]), // BibTeX keys of related papers
    draft: z.boolean().optional(),
  }),
})

const positions = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/positions" }),
  schema: z.object({
    role: z.string(),
    institution: z.string(),
    location: z.string(),
    dateStart: z.number(),
    dateEnd: z.union([z.number(), z.literal("present")]),
  }),
})

const legal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
})

export const collections = { news, software, positions, legal }
