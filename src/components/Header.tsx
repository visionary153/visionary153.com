import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/lib/i18n';
import LanguageSwitch from './LanguageSwitch';
import Logo from './Logo';
import styles from './Header.module.css';

type HeaderProps = {
  locale: Locale;
  t: Dictionary['nav'];
};

export default function Header({ locale, t }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.inner}`}>
        <a href={`/${locale}/`} aria-label={t.home} className={styles.home}>
          <Logo height={44} />
        </a>
        <div className={styles.actions}>
          <nav aria-label={t.label} className={styles.nav}>
            <a href={`/${locale}/#products`}>{t.products}</a>
            <a href={`/${locale}/#contact`}>{t.contact}</a>
          </nav>
          <LanguageSwitch current={locale} label={t.language} />
        </div>
      </div>
    </header>
  );
}
