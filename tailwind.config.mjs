import defaultTheme from "tailwindcss/defaultTheme"
import typography from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', ...defaultTheme.fontFamily.sans],
        serif: ['"Source Serif 4 Variable"', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        // Accent: deep water teal
        accent: {
          50: "#effaf9", 100: "#d6f1ee", 200: "#addfda", 300: "#7cc7c0",
          400: "#4fa9a2", 500: "#348d87", 600: "#28716d", 700: "#235b58",
          800: "#1f4a48", 900: "#1c3e3c",
        },
      },
      typography: {
        DEFAULT: { css: { maxWidth: "none" } },
      },
    },
  },
  plugins: [typography],
}
