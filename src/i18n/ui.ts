// Interface text (menus, headings, buttons, short labels) in English and Italian.
// Page content does NOT go here: it lives in src/content/ and src/data/.
// Italian is needed only for the menu, footer and the pages that have an Italian
// version (home, teaching, join us); missing Italian keys fall back to English.

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

const en = {
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
  '404.title': 'Page not found',
  '404.text': 'This page doesn’t exist, or it has moved.',
  '404.home': 'Go to the home page',

  'common.present': 'present',
  'common.deadline': 'Deadline',
  'common.openUntilFilled': 'Open until filled',
  'common.more': 'More',

  'home.explore': 'Explore',
  'home.news': 'Latest news',
  'home.allNews': 'All news',
  'home.publications': 'Selected publications',
  'home.allPublications': 'All publications',
  'home.positions': 'Open positions',
  'home.profiles': 'Research profiles',

  'research.intro': 'Research themes',
  'research.questions': 'Key questions',
  'research.publications': 'Related publications',
  'research.software': 'Related software',
  'research.projects': 'Related projects',

  'pubs.description': 'Publications by year, with filters by theme and type.',
  'pubs.total': 'publications',
  'pubs.perYear': 'Publications per year',
  'pubs.filters': 'Filter publications',
  'pubs.theme': 'Theme',
  'pubs.type': 'Type',
  'pubs.search': 'Search',
  'pubs.searchPlaceholder': 'Title, author, journal',
  'pubs.all': 'All',
  'pubs.type.article': 'Journal articles',
  'pubs.type.chapter': 'Book chapters',
  'pubs.type.conference': 'Conference papers',
  'pubs.shown': 'shown',
  'pubs.none': 'No publications match these filters.',
  'pubs.downloadAll': 'Download all as BibTeX',
  'pubs.bibtex': 'BibTeX',
  'pubs.pdf': 'PDF',
  'pubs.code': 'Code',
  'pubs.data': 'Data',

  'tag.vadose': 'Vadose zone',
  'tag.plant': 'Soil–plant',
  'tag.bayesian': 'Bayesian inference',
  'tag.contaminants': 'Contaminants',
  'tag.urban': 'Urban hydrology',
  'tag.mar': 'Managed aquifer recharge',
  'tag.energy': 'Shallow geothermal',
  'tag.hydrus': 'HYDRUS',

  'software.description': 'HYDRUS modules and the pHydrus Python library.',
  'software.cite': 'Paper to cite',
  'software.kind.hydrus-module': 'HYDRUS module',
  'software.kind.python-library': 'Python library',
  'software.kind.other': 'Software',

  'projects.description': 'Funded research projects, current and past.',
  'projects.current': 'Current projects',
  'projects.past': 'Past projects',
  'projects.role': 'Role',
  'projects.funder': 'Funder',
  'projects.partners': 'Partners',

  'teaching.current': 'Current courses',
  'teaching.past': 'Past teaching',
  'teaching.materials': 'Materials',
  'teaching.role.lecturer': 'Lecturer',
  'teaching.role.invited-lecturer': 'Invited lecturer',
  'teaching.role.teaching-assistant': 'Teaching assistant',
  'teaching.level.bsc': 'Bachelor',
  'teaching.level.msc': 'Master',
  'teaching.level.phd': 'PhD',
  'teaching.level.other': 'Other',
  'teaching.language.en': 'Taught in English',
  'teaching.language.it': 'Taught in Italian',
  'teaching.language.de': 'Taught in German',

  'company.services': 'Services',
  'company.cases': 'Selected case studies',
  'company.team': 'Team',
  'company.website': 'Company website',

  'people.description': 'Group members, alumni and collaborators.',
  'people.current': 'Group',
  'people.alumni': 'Alumni',
  'people.collaborator': 'Key collaborators',

  'join.positions': 'Open positions',
  'join.none': 'There are no open positions at the moment.',

  'news.description': 'News, awards and talks.',
  'news.type.paper': 'Paper',
  'news.type.award': 'Award',
  'news.type.talk': 'Talk',
  'news.type.project': 'Project',
  'news.type.teaching': 'Teaching',
  'news.type.event': 'Event',

  'cv.description': 'Short web CV: positions, education, awards and service.',
  'cv.positions': 'Positions',
  'cv.education': 'Education',
  'cv.awards': 'Awards and honours',
  'cv.service': 'Editorial and reviewing activities',
  'cv.conferences': 'Conference convening and chairing',
  'cv.talks': 'Invited and keynote talks',
  'cv.publications': 'Publications',
  'cv.publicationsLink': 'See the full list of publications',
  'cv.download': 'Download the full CV (PDF)',
  'cv.role.convener': 'Convener',
  'cv.role.co-convener': 'Co-convener',
  'cv.role.chair': 'Chair',
  'cv.role.keynote': 'Keynote',
  'cv.role.invited': 'Invited talk',

  'contact.email': 'Email',
  'contact.phone': 'Phone',
  'contact.profiles': 'Research profiles',
} as const;

export type UiKey = keyof typeof en;

const it: Partial<Record<UiKey, string>> = {
  'site.skip': 'Vai al contenuto',
  'nav.label': 'Principale',
  'nav.research': 'Ricerca',
  'nav.publications': 'Pubblicazioni',
  'nav.projects': 'Progetti',
  'nav.teaching': 'Didattica',
  'nav.company': 'Azienda',
  'nav.people': 'Gruppo',
  'nav.join': 'Opportunità',
  'nav.news': 'Notizie',
  'nav.contact': 'Contatti',
  'lang.switch': 'Read in English',
  'footer.sections': 'Sezioni',
  'footer.profiles': 'Profili di ricerca',
  'footer.contact': 'Contatti',
  '404.title': 'Pagina non trovata',
  '404.text': 'Questa pagina non esiste o è stata spostata.',
  '404.home': 'Vai alla home page',

  'common.present': 'oggi',
  'common.deadline': 'Scadenza',
  'common.openUntilFilled': 'Aperta fino a copertura',

  'home.explore': 'Esplora',
  'home.news': 'Ultime notizie',
  'home.allNews': 'Tutte le notizie',
  'home.publications': 'Pubblicazioni scelte',
  'home.allPublications': 'Tutte le pubblicazioni',
  'home.positions': 'Posizioni aperte',
  'home.profiles': 'Profili di ricerca',

  'teaching.current': 'Corsi attuali',
  'teaching.past': 'Didattica passata',
  'teaching.materials': 'Materiali',
  'teaching.role.lecturer': 'Docente',
  'teaching.role.invited-lecturer': 'Docente invitato',
  'teaching.role.teaching-assistant': 'Assistente alla didattica',
  'teaching.level.bsc': 'Laurea triennale',
  'teaching.level.msc': 'Laurea magistrale',
  'teaching.level.phd': 'Dottorato',
  'teaching.level.other': 'Altro',
  'teaching.language.en': 'In inglese',
  'teaching.language.it': 'In italiano',
  'teaching.language.de': 'In tedesco',

  'join.positions': 'Posizioni aperte',
  'join.none': 'Al momento non ci sono posizioni aperte.',
};

export const ui: Record<Lang, Partial<Record<UiKey, string>>> & { en: typeof en } = { en, it };
