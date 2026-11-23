import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"

// SITE_URL is set by the GitHub Pages workflow; change the fallback once the final URL is known.
export default defineConfig({
  site: process.env.SITE_URL ?? "https://giuseppe-brunetti.github.io",
  integrations: [mdx(), sitemap(), solidJs(), tailwind({ applyBaseStyles: false })],
})
