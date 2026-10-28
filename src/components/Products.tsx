import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/lib/i18n';
import GenerateScreen from './mockups/GenerateScreen';
import MyNumbersScreen from './mockups/MyNumbersScreen';
import QrScreen from './mockups/QrScreen';
import PhoneFrame from './PhoneFrame';
import styles from './Products.module.css';

type ProductsProps = {
  locale: Locale;
  t: Dictionary['products'];
  lotto: Dictionary['lotto'];
  next: Dictionary['next'];
};

export default function Products({ locale, t, lotto, next }: ProductsProps) {
  const features = [
    { key: 'qr', copy: lotto.features.qr, screen: <QrScreen locale={locale} /> },
    { key: 'generate', copy: lotto.features.generate, screen: <GenerateScreen locale={locale} /> },
    {
      key: 'myNumbers',
      copy: lotto.features.myNumbers,
      screen: <MyNumbersScreen locale={locale} />,
    },
  ];

  return (
    <section id="products" className={styles.section}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.heading}>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="section-title">{t.title}</h2>
        </div>

        <article className={styles.card}>
          <div className={styles.productHead}>
            {/* 앱 아이콘이 확정되면 교체 */}
            <span className={styles.appIcon} aria-hidden="true">
              <span className={styles.iconBallYellow} />
              <span className={styles.iconBallBlue} />
              <span className={styles.iconBallRed} />
            </span>
            <div className={styles.productText}>
              <div className={styles.nameRow}>
                <h3 className={styles.name}>{lotto.name}</h3>
                <span className={styles.badge}>{lotto.badge}</span>
                <span className={styles.platforms}>iOS · Android</span>
              </div>
              <p className={styles.tagline}>{lotto.tagline}</p>
            </div>
          </div>

          <div className={styles.phones}>
            {features.map(({ key, copy, screen }) => (
              <figure key={key} className={styles.feature}>
                <PhoneFrame>{screen}</PhoneFrame>
                <figcaption className={styles.caption}>
                  <strong>{copy.title}</strong>
                  <span>{copy.body}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className={styles.extras}>
            <ul className={styles.chips}>
              {lotto.chips.map((chip) => (
                <li key={chip} className={styles.chip}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                  {chip}
                </li>
              ))}
            </ul>
            <p className={styles.disclaimer}>{lotto.disclaimer}</p>
          </div>
        </article>

        <div className={styles.next}>
          <span className={styles.nextIcon} aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <div className={styles.nextText}>
            <strong>{next.title}</strong>
            <span>{next.body}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
