import type { Dictionary } from '@/dictionaries';
import { CONTACT_EMAIL } from '@/lib/site';
import styles from './Contact.module.css';

export default function Contact({ t }: { t: Dictionary['contact'] }) {
  return (
    <section id="contact" className={styles.section}>
      <div className={`wrap ${styles.inner}`}>
        <h2 className="section-title">{t.title}</h2>
        <p className={styles.body}>{t.body}</p>
        <a href={`mailto:${CONTACT_EMAIL}`} className={styles.mail}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="m4 7 8 6 8-6" />
          </svg>
          {CONTACT_EMAIL}
        </a>
      </div>
    </section>
  );
}
