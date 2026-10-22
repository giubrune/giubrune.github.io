// Small formatting helpers for dates and periods shown on the pages.
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';

/** A period such as “2022–present”, “2019–2021” or “2018”. */
export function period(start: number, end: number | 'present' | undefined, lang: Lang = 'en') {
  if (end === undefined || end === start) return String(start);
  const t = useTranslations(lang);
  return `${start}–${end === 'present' ? t('common.present') : end}`;
}

/** A date written as 2025, 2025-04 or 2025-04-30, shown only as precisely as known. */
export function partialDate(value: string, lang: Lang = 'en') {
  const [y, m, d] = value.split('-').map(Number);
  const locale = lang === 'it' ? 'it-IT' : 'en-GB';
  if (!m) return String(y);
  const date = new Date(Date.UTC(y, m - 1, d || 1));
  return new Intl.DateTimeFormat(locale, {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    ...(d ? { day: 'numeric' } : {}),
  }).format(date);
}

/** True if a deadline (2026, 2026-12 or 2026-12-31) has passed at build time. */
export function isPast(value: string) {
  const [y, m, d] = value.split('-').map(Number);
  // End of the given year, month or day.
  const end = !m ? Date.UTC(y + 1, 0, 1) : !d ? Date.UTC(y, m, 1) : Date.UTC(y, m - 1, d + 1);
  return end <= Date.now();
}
