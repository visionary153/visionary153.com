import type { Locale } from '@/lib/i18n';
import styles from './Mockup.module.css';
import my from './MyNumbersScreen.module.css';
import { Ball, countMatches, MockHeader, rankLabel, TabBar } from './parts';

const SAVED = [
  [3, 9, 14, 22, 30, 41],
  [5, 11, 27, 33, 38, 44],
  [2, 14, 19, 25, 35, 40],
  [7, 12, 19, 28, 33, 44],
  [1, 8, 17, 24, 36, 45],
];

const COPY = {
  ko: {
    title: '내 번호',
    edit: '편집',
    basis: '1246회 기준',
    summary: '저장한 번호 5개 중 1개 당첨',
    latest: '최신',
    names: ['생일 조합', '자주 쓰는 번호', '꿈에서 본 번호', '번호 생성 10/25', '가족 번호'],
    matched: (count: number) => `${count}개 일치`,
  },
  en: {
    title: 'My Numbers',
    edit: 'Edit',
    basis: 'As of draw 1246',
    summary: '1 of your 5 saved sets won',
    latest: 'Latest',
    names: ['Birthdays', 'My usual numbers', 'From a dream', 'Generated 10/25', 'Family numbers'],
    matched: (count: number) => `${count} matched`,
  },
};

export default function MyNumbersScreen({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <div className={styles.screen}>
      <MockHeader title={t.title} action={t.edit} />
      <div className={styles.main}>
        <div className={`${styles.card} ${my.summaryCard}`}>
          <span className={my.summaryText}>
            <span className={styles.muted}>{t.basis}</span>
            <strong>{t.summary}</strong>
          </span>
          <span className={styles.badge}>{t.latest}</span>
        </div>

        <div className={`${styles.card} ${my.list}`}>
          {SAVED.map((numbers, i) => {
            const matches = countMatches(numbers);
            const rank = rankLabel(matches, locale);
            return (
              <div key={i} className={my.item}>
                <div className={my.itemHead}>
                  <span className={my.name}>{t.names[i]}</span>
                  <span className={rank ? styles.badge : styles.badgeMuted}>
                    {rank ? `${t.matched(matches)} · ${rank}` : t.matched(matches)}
                  </span>
                </div>
                <div className={my.balls}>
                  {numbers.map((n) => (
                    <Ball key={n} n={n} size={36} dimUnmatched />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <TabBar active="myNumbers" locale={locale} />
    </div>
  );
}
