---
# TEMPLATE — copy this file, rename it (the file name becomes the web address,
# e.g. "vadose-zone.md" → /research/vadose-zone/), and fill in the fields.
# Files starting with "_" are ignored by the website.

title: Name of the research theme

# Position on the Research page (1 = first).
order: 6

# One plain-language sentence, shown on overview pages.
summary: One sentence that a non-specialist can understand.

# Publications whose BibTeX "keywords" contain any of these tags are listed on the page.
# Allowed: vadose, plant, bayesian, contaminants, urban, mar, energy, hydrus
tags: [vadose]

# Questions this research tries to answer (optional).
keyQuestions:
  - First question?
  - Second question?

# Key figure (optional). Put the image in src/assets/research/ and give its path
# relative to this file.
# figure:
#   image: ../../assets/research/my-figure.png
#   alt: What the figure shows, for people who cannot see it.
#   caption: Caption shown under the figure.
#   credit: "Source: Brunetti et al. (2023)"
---

Start with one or two paragraphs in plain language: what the problem is and why it matters.

## In more detail

Then the technical description, as long as needed.

(Related software and projects are listed automatically: add this theme to their `themes` field.)
