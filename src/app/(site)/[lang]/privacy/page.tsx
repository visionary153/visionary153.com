import type { Metadata, ResolvingMetadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { languageAlternates, toLocale } from '@/lib/i18n';
import { CONTACT_EMAIL, SITE_NAME } from '@/lib/site';
import styles from './privacy.module.css';

export async function generateMetadata(
  { params }: PageProps<'/[lang]/privacy'>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const locale = toLocale((await params).lang);
  const t = getDictionary(locale).privacy;
  const title = `${t.title} — ${SITE_NAME}`;
  // openGraph는 통째로 덮어써지므로 레이아웃의 값(이미지·사이트명·언어)을 이어받는다
  const { openGraph: parentOpenGraph } = await parent;

  return {
    title,
    description: t.description,
    alternates: {
      canonical: `/${locale}/privacy/`,
      languages: languageAlternates('privacy/'),
    },
    openGraph: {
      ...parentOpenGraph,
      title,
      description: t.description,
      url: `/${locale}/privacy/`,
    },
    twitter: { title, description: t.description },
  };
}

export default async function PrivacyPage({ params }: PageProps<'/[lang]/privacy'>) {
  const locale = toLocale((await params).lang);
  const t = getDictionary(locale).privacy;

  return (
    <article className={`wrap ${styles.article}`}>
      <header className={styles.head}>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.effective}>{t.effective}</p>
      </header>
      <p>{t.intro}</p>
      {t.sections.map((section) => (
        <section key={section.heading} className={styles.section}>
          <h2 className={styles.heading}>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p className={styles.back}>
        <a href={`/${locale}/`}>← {t.back}</a>
      </p>
    </article>
  );
}
