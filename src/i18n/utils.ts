import { defaultLang, translatedPaths, ui, type Lang, type UiKey } from './ui';
import { href, stripBase } from '../lib/url';

/** Language of the current page, from its URL. */
export function getLang(url: URL): Lang {
  const path = stripBase(url.pathname);
  return path === '/it' || path.startsWith('/it/') ? 'it' : defaultLang;
}

/** Returns a function that looks up interface text in the given language. */
export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

/** Site path without the language prefix, e.g. "/it/join/" → "/join/". */
export function pathWithoutLang(url: URL): string {
  const path = stripBase(url.pathname);
  return path.replace(/^\/it(\/|$)/, '/');
}

/**
 * Link to a site path in the given language (English has no prefix).
 * Sections without an Italian version link to the English page.
 */
export function localizedHref(path: string, lang: Lang): string {
  if (lang === defaultLang || !translatedPaths.includes(path)) return href(path);
  return href(`/${lang}${path}`);
}

/** Link to the same page in the other language, or that language’s home page if there is no translation. */
export function alternateHref(url: URL, target: Lang): string {
  const path = pathWithoutLang(url);
  return localizedHref(translatedPaths.includes(path) ? path : '/', target);
}

/** True if a section link should be marked as the current page. */
export function isCurrent(url: URL, sectionPath: string): boolean {
  return pathWithoutLang(url).startsWith(sectionPath);
}
