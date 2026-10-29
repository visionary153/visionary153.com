import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { plexSansKr } from '@/lib/fonts';
import { DEFAULT_LOCALE, languageAlternates, LOCALES, OG_LOCALES } from '@/lib/i18n';
import { NAVER_SITE_VERIFICATION, SITE_NAME, SITE_URL } from '@/lib/site';
import '../globals.css';

// 도메인만 공유될 때 미리보기에 쓰는 문구 — 기본 언어 홈과 같게
const preview = getDictionary(DEFAULT_LOCALE).meta;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: '기술로, 사람을 이롭게 — Technology that does good for people.',
  verification: { other: { 'naver-site-verification': NAVER_SITE_VERIFICATION } },
  alternates: {
    canonical: '/',
    languages: languageAlternates(),
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: preview.title,
    description: preview.description,
    url: '/',
    locale: OG_LOCALES[DEFAULT_LOCALE],
    alternateLocale: LOCALES.filter((other) => other !== DEFAULT_LOCALE).map(
      (other) => OG_LOCALES[other],
    ),
  },
  twitter: {
    card: 'summary_large_image',
    title: preview.title,
    description: preview.description,
  },
};

/** `/` 전용 — 언어를 골라 /ko/ 또는 /en/으로 보내는 페이지 */
export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className={plexSansKr.variable}>
      <body>{children}</body>
    </html>
  );
}
