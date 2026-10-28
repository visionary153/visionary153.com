import type { MetadataRoute } from 'next';
import { languageAlternates, LOCALES } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

const PAGES = ['', 'privacy/'];

function absoluteAlternates(path: string) {
  const { ko, en } = languageAlternates(path);
  return { ko: `${SITE_URL}${ko}`, en: `${SITE_URL}${en}` };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}/${path}`,
      alternates: { languages: absoluteAlternates(path) },
    })),
  );
}
