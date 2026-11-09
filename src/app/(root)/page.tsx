import Link from 'next/link';
import Logo from '@/components/Logo';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, LOCALES } from '@/lib/i18n';
import { WEBSITE_JSON_LD } from '@/lib/site';
import styles from './page.module.css';

// 정적 배포라 서버에서 Accept-Language를 볼 수 없어 브라우저에서 고른다.
// 저장된 선택 → 브라우저 선호 언어 중 처음 맞는 ko/en → 못 정하면 기본값
const redirectScript = `(function () {
  var supported = ${JSON.stringify(LOCALES)};
  var locale;
  try { locale = localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)}); } catch (e) {}
  if (supported.indexOf(locale) === -1) {
    locale = ${JSON.stringify(DEFAULT_LOCALE)};
    var preferred = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < preferred.length; i++) {
      var base = String(preferred[i]).toLowerCase().split('-')[0];
      if (supported.indexOf(base) !== -1) { locale = base; break; }
    }
  }
  location.replace('/' + locale + '/');
})();`;

export default function LanguageGatePage() {
  return (
    <main className={styles.gate}>
      {/* 사이트 이름은 홈페이지(`/`)에서 읽으므로 언어 선택 페이지에도 둔다 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
      />
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      {/* 스크립트가 꺼져 있으면 기본 언어로 이동 */}
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=/${DEFAULT_LOCALE}/`} />
      </noscript>
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
