import { notFound } from 'next/navigation';

export const LOCALES = ['ko', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/** 사용자가 고른 언어 — `/` 접속 시 이 값으로 이동한다 */
export const LOCALE_STORAGE_KEY = 'v153-locale';

export const OG_LOCALES: Record<Locale, string> = { ko: 'ko_KR', en: 'en_US' };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** 라우트 파라미터 `[lang]`을 Locale로 — 정적 경로가 ko/en뿐이라 다른 값은 404 */
export function toLocale(lang: string): Locale {
  if (!isLocale(lang)) notFound();
  return lang;
}

/** 같은 페이지의 다른 언어 경로 (`/ko/privacy/` → `/en/privacy/`) */
export function switchLocalePath(pathname: string, target: Locale): string {
  const rest = pathname.replace(/^\/(ko|en)(?=\/|$)/, '');
  return `/${target}${rest || '/'}`;
}

/** 언어별 페이지의 hreflang 목록 */
export function languageAlternates(path = '') {
  return {
    ko: `/ko/${path}`,
    en: `/en/${path}`,
    'x-default': path ? `/ko/${path}` : '/',
  };
}
