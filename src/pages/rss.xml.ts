import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { getCollection } from "astro:content"
import { SITE } from "@consts"

export async function GET(context: APIContext) {
  const posts = (await getCollection("news")).filter((n) => !n.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  return rss({
    title: `${SITE.TITLE} – News`,
    description: SITE.DESCRIPTION,
    site: context.site!,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.summary, pubDate: p.data.date, link: `/news/${p.id}/` })),
  })
}
