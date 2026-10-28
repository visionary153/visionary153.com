'use client';

import { usePathname } from 'next/navigation';
import { LOCALE_STORAGE_KEY, LOCALES, switchLocalePath, type Locale } from '@/lib/i18n';
import styles from './LanguageSwitch.module.css';

type LanguageSwitchProps = {
  current: Locale;
  label: string;
};

function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // 저장소를 쓸 수 없는 브라우저(사생활 보호 모드 등)에서는 기억하지 않아도 된다
  }
}

export default function LanguageSwitch({ current, label }: LanguageSwitchProps) {
  const pathname = usePathname();

  return (
    <div role="group" aria-label={label} className={styles.switch}>
      {LOCALES.map((locale) => (
        <a
          key={locale}
          href={switchLocalePath(pathname, locale)}
          hrefLang={locale}
          lang={locale}
          aria-current={locale === current ? 'true' : undefined}
          className={styles.option}
          onClick={() => rememberLocale(locale)}
        >
          {locale.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
