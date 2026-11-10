export const LOCALES = ['ko', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/** 접두어 없이 `/`에 놓이는 언어. 다른 언어는 `/en/`처럼 언어 경로 아래에 둔다 */
export const DEFAULT_LOCALE: Locale = 'ko';

export const OG_LOCALES: Record<Locale, string> = { ko: 'ko_KR', en: 'en_US' };

/** 언어별 경로 — `path`는 `''`·`'privacy/'`처럼 앞 슬래시 없이 (ko: `/privacy/`, en: `/en/privacy/`) */
export function localePath(locale: Locale, path = ''): string {
  return locale === DEFAULT_LOCALE ? `/${path}` : `/${locale}/${path}`;
}

/** 같은 페이지의 다른 언어 경로 (`/privacy/` ↔ `/en/privacy/`) */
export function switchLocalePath(pathname: string, target: Locale): string {
  const path = pathname.replace(/^\/en(?=\/|$)/, '').replace(/^\//, '');
  return localePath(target, path);
}

/** 언어별 페이지의 hreflang 목록. 언어를 정하지 못한 사용자는 기본 언어로 */
export function languageAlternates(path = '') {
  return {
    ko: localePath('ko', path),
    en: localePath('en', path),
    'x-default': localePath(DEFAULT_LOCALE, path),
  };
}
