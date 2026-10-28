import Link from 'next/link';
import type { Metadata } from 'next';
import Logo from '@/components/Logo';
import { plexSansKr } from '@/lib/fonts';
import { SITE_NAME } from '@/lib/site';
import styles from './(root)/page.module.css';
import './globals.css';

export const metadata: Metadata = {
  title: `404 — ${SITE_NAME}`,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="ko" className={plexSansKr.variable}>
      <body>
        <main className={styles.gate}>
          <Logo height={56} />
          <p>
            <span lang="ko">페이지를 찾을 수 없어요.</span> <span lang="en">Page not found.</span>
          </p>
          <nav aria-label="Home" className={styles.links}>
            <Link href="/ko/" hrefLang="ko" lang="ko">
              홈으로
            </Link>
            <Link href="/en/" hrefLang="en" lang="en">
              Home
            </Link>
          </nav>
        </main>
      </body>
    </html>
  );
}
