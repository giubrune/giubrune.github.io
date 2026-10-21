// Interface text (menus, buttons, short labels) in English and Italian.
// Page content does NOT go here: it lives in src/content/ and src/data/.

export const languages = { en: 'English', it: 'Italiano' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

/** Site sections, in menu order. `primary` ones appear in the top menu, all appear in the footer. */
export const sections = [
  { key: 'research', path: '/research/', primary: true },
  { key: 'publications', path: '/publications/', primary: true },
  { key: 'software', path: '/software/', primary: true },
  { key: 'projects', path: '/projects/', primary: false },
  { key: 'teaching', path: '/teaching/', primary: true },
  { key: 'company', path: '/company/', primary: true },
  { key: 'people', path: '/people/', primary: false },
  { key: 'join', path: '/join/', primary: true },
  { key: 'news', path: '/news/', primary: false },
  { key: 'cv', path: '/cv/', primary: false },
  { key: 'contact', path: '/contact/', primary: true },
] as const;
export type SectionKey = (typeof sections)[number]['key'];

/** Site paths (without the /it/ prefix) that have an Italian version. */
export const translatedPaths = ['/', '/teaching/', '/join/'];

export const ui = {
  en: {
    'site.skip': 'Skip to content',
    'nav.label': 'Main',
    'nav.menu': 'Menu',
    'nav.home': 'Home',
    'nav.research': 'Research',
    'nav.publications': 'Publications',
    'nav.software': 'Software',
    'nav.projects': 'Projects',
    'nav.teaching': 'Teaching',
    'nav.company': 'Company',
    'nav.people': 'People',
    'nav.join': 'Join us',
    'nav.news': 'News',
    'nav.cv': 'CV',
    'nav.contact': 'Contact',
    'lang.switch': 'Leggi in italiano',
    'footer.sections': 'Sections',
    'footer.profiles': 'Research profiles',
    'footer.contact': 'Contact',
    'placeholder.text': 'This page is being built. Please check back soon.',
    '404.title': 'Page not found',
    '404.text': 'This page doesn’t exist, or it has moved.',
    '404.home': 'Go to the home page',
  },
  it: {
    'site.skip': 'Vai al contenuto',
    'nav.label': 'Principale',
    'nav.menu': 'Menu',
    'nav.home': 'Home',
    'nav.research': 'Ricerca',
    'nav.publications': 'Pubblicazioni',
    'nav.software': 'Software',
    'nav.projects': 'Progetti',
    'nav.teaching': 'Didattica',
    'nav.company': 'Azienda',
    'nav.people': 'Gruppo',
    'nav.join': 'Opportunità',
    'nav.news': 'Notizie',
    'nav.cv': 'CV',
    'nav.contact': 'Contatti',
    'lang.switch': 'Read in English',
    'footer.sections': 'Sezioni',
    'footer.profiles': 'Profili di ricerca',
    'footer.contact': 'Contatti',
    'placeholder.text': 'Questa pagina è in costruzione. Torna a trovarci presto.',
    '404.title': 'Pagina non trovata',
    '404.text': 'Questa pagina non esiste o è stata spostata.',
    '404.home': 'Vai alla home page',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];
