import type { Site, Page, Links, Socials } from "@types"

export const SITE: Site = {
  TITLE: "Giuseppe Brunetti",
  AUTHOR: "Giuseppe Brunetti",
  ROLE: "Associate Professor",
  AFFILIATION: "Department of Civil Engineering, University of Calabria",
  DESCRIPTION:
    "Giuseppe Brunetti, Associate Professor at the University of Calabria. Vadose zone hydrology, numerical modeling of flow and transport in unsaturated porous media, Bayesian inference, and HYDRUS development.",
}

export const RESEARCH: Page = { TITLE: "Research", DESCRIPTION: "Research lines, funded projects, and awards." }
export const PUBLICATIONS: Page = { TITLE: "Publications", DESCRIPTION: "Peer-reviewed journal articles, book chapters, and conference papers." }
export const SOFTWARE: Page = { TITLE: "Software", DESCRIPTION: "HYDRUS modules and open-source tools for vadose zone modeling." }
export const TEACHING: Page = { TITLE: "Teaching", DESCRIPTION: "Courses taught at the University of Calabria and BOKU Vienna." }
export const EXPERIENCE: Page = { TITLE: "Experience", DESCRIPTION: "Academic positions and education." }
export const NEWS: Page = { TITLE: "News", DESCRIPTION: "Papers, talks, sessions, and software releases." }
export const CV: Page = { TITLE: "CV", DESCRIPTION: "Curriculum vitae, service, and invited talks." }
export const SEARCH: Page = { TITLE: "Search", DESCRIPTION: "Search publications, software, and news." }

export const LINKS: Links = [
  { TEXT: "Research", HREF: "/research" },
  { TEXT: "Publications", HREF: "/publications" },
  { TEXT: "Software", HREF: "/software" },
  { TEXT: "Teaching", HREF: "/teaching" },
  { TEXT: "Experience", HREF: "/experience" },
  { TEXT: "News", HREF: "/news" },
  { TEXT: "CV", HREF: "/cv" },
]

export const SOCIALS: Socials = [
  { NAME: "Email", ICON: "email", TEXT: "giuseppe.brunetti@unical.it", HREF: "mailto:giuseppe.brunetti@unical.it" },
  { NAME: "ORCID", ICON: "id", TEXT: "0000-0001-7943-8088", HREF: "https://orcid.org/0000-0001-7943-8088" },
  { NAME: "Google Scholar", ICON: "scholar", TEXT: "Google Scholar", HREF: "https://scholar.google.com/citations?user=ZeV8sR4AAAAJ" },
  { NAME: "ResearchGate", ICON: "network", TEXT: "ResearchGate", HREF: "https://www.researchgate.net/profile/Giuseppe-Brunetti-5" },
  { NAME: "Web of Science", ICON: "book", TEXT: "ResearcherID Y-5359-2019", HREF: "https://www.webofscience.com/wos/author/record/Y-5359-2019" },
  { NAME: "GitHub", ICON: "code", TEXT: "giubrune", HREF: "https://github.com/giubrune" },
]
