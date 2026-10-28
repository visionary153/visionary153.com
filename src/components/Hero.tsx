import type { Dictionary } from '@/dictionaries';
import { SYMBOL_DOT, SYMBOL_PATH } from '@/lib/site';
import styles from './Hero.module.css';

type HeroProps = {
  t: Dictionary['hero'];
};

/** 첫 화면 — 앱 소개로 빨리 넘어가도록 낮고 단순하게 둔다 */
export default function Hero({ t }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            {t.titleLead} <span className="gradient-text">{t.titleAccent}</span>
          </h1>
          <p className={styles.sub}>{t.sub}</p>
        </div>
        <svg viewBox="0 0 120 120" aria-hidden="true" className={styles.symbol}>
          <defs>
            <linearGradient id="hero-symbol" x1="0" y1="0" x2="1" y2="1">
              {/* CSS 변수는 presentation 속성에서 해석되지 않아 style로 넣는다 */}
              <stop offset="0" style={{ stopColor: 'var(--g1)' }} />
              <stop offset="0.5" style={{ stopColor: 'var(--g2)' }} />
              <stop offset="1" style={{ stopColor: 'var(--g3)' }} />
            </linearGradient>
          </defs>
          <path d={SYMBOL_PATH} fill="url(#hero-symbol)" />
          <circle {...SYMBOL_DOT} fill="url(#hero-symbol)" />
        </svg>
      </div>
    </section>
  );
}
