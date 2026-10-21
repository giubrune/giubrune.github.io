// Loads src/data/profile.yaml and checks it, so a typo gives a clear build error.
import { parse } from 'yaml';
import { z } from 'astro/zod';
import raw from '../data/profile.yaml?raw';

const localized = z.object({ en: z.string().min(1), it: z.string().min(1) });

const schema = z.object({
  name: z.string().min(1),
  role: localized,
  department: localized,
  institution: localized,
  city: z.string(),
  email: z.email(),
  phone: z.string().optional(),
  description: localized,
  profiles: z.array(
    z.object({
      label: z.string().min(1),
      url: z.union([z.url(), z.literal('')]).nullish(),
    }),
  ),
});

const result = schema.safeParse(parse(raw));
if (!result.success) {
  throw new Error(`src/data/profile.yaml has an error:\n${z.prettifyError(result.error)}`);
}

export const profile = result.data;

/** Profile links that have a URL filled in. */
export const profileLinks = profile.profiles.filter(
  (p): p is { label: string; url: string } => Boolean(p.url),
);
