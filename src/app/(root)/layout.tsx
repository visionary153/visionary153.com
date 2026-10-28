import type { Metadata } from 'next';
import { plexSansKr } from '@/lib/fonts';
import { languageAlternates } from '@/lib/i18n';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: '기술로, 사람을 이롭게 — Technology that does good for people.',
  alternates: {
    canonical: '/',
    languages: languageAlternates(),
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
