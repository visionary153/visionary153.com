'use client';

import { usePathname } from 'next/navigation';
import { LOCALES, switchLocalePath, type Locale } from '@/lib/i18n';
import styles from './LanguageSwitch.module.css';

type LanguageSwitchProps = {
  current: Locale;
  label: string;
};

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
        >
          {locale.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
