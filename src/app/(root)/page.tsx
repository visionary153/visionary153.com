import Link from 'next/link';
import Logo from '@/components/Logo';
import { LOCALE_STORAGE_KEY } from '@/lib/i18n';
import styles from './page.module.css';

// 정적 배포라 서버에서 Accept-Language를 볼 수 없어 브라우저에서 고른다.
// 저장된 선택 → 브라우저 언어(한국어면 ko, 그 외 en) 순서
const redirectScript = `(function () {
  var saved;
  try { saved = localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)}); } catch (e) {}
  var locale = saved === 'ko' || saved === 'en'
    ? saved
    : (navigator.language || '').toLowerCase().indexOf('ko') === 0 ? 'ko' : 'en';
  location.replace('/' + locale + '/');
})();`;

export default function LanguageGatePage() {
  return (
    <main className={styles.gate}>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <Logo height={56} />
      <nav aria-label="Language" className={styles.links}>
        <Link href="/ko/" hrefLang="ko" lang="ko">
          한국어
        </Link>
        <Link href="/en/" hrefLang="en" lang="en">
          English
        </Link>
      </nav>
    </main>
  );
}
