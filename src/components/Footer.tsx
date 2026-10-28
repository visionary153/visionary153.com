import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/lib/i18n';
import { CONTACT_EMAIL } from '@/lib/site';
import Logo from './Logo';
import styles from './Footer.module.css';

type FooterProps = {
  locale: Locale;
  t: Dictionary['footer'];
};

export default function Footer({ locale, t }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.brand}>
          <Logo height={32} className={styles.logo} />
          <span className={styles.copyright}>© 2026 visionary153. All rights reserved.</span>
        </div>
        <nav aria-label={t.label} className={styles.links}>
          <a href={`/${locale}/privacy/`}>{t.privacy}</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>{t.contact}</a>
        </nav>
      </div>
    </footer>
  );
}
