import type { Locale } from '@/lib/i18n';
import styles from './Mockup.module.css';
import gen from './GenerateScreen.module.css';
import { Ball, CheckIcon, MockHeader, StarIcon, TabBar } from './parts';

const RESULT = [7, 12, 19, 28, 33, 44];
const INCLUDED = 7;

const COPY = {
  ko: {
    title: '번호 생성',
    history: '기록',
    conditionHint: '생성 조건 · 색이 있는 항목을 눌러 바꾸세요',
    sentence: [
      { text: '최근 ' },
      { text: '20회', token: true },
      { text: ' 동안 ' },
      { text: '자주 나온', token: true },
      { text: ' 번호를 ' },
      { text: '골고루', token: true },
      { text: ' 섞어 ' },
      { text: '스마트', token: true },
      { text: ' 방식으로' },
    ],
    include: '포함',
    exclude: '제외',
    excludeCount: '16개',
    resultTitle: '새 번호가 나왔어요',
    steps: [
      '최근 20회 당첨번호 불러오기',
      '자주 나온 번호 고르기',
      '포함·제외 번호 반영',
      '스마트 방식으로 조합',
      '번호 6개 완성',
    ],
    saved: '내 번호에 저장됨',
    note: '생성된 번호는 참고용이며, 실제 당첨 확률과는 무관합니다.',
    again: '다시 생성',
  },
  en: {
    title: 'Generate',
    history: 'History',
    conditionHint: 'Conditions · tap a colored item to change it',
    sentence: [
      { text: 'From the last ' },
      { text: '20 draws', token: true },
      { text: ', mix ' },
      { text: 'frequent', token: true },
      { text: ' numbers ' },
      { text: 'evenly', token: true },
      { text: ' using ' },
      { text: 'Smart', token: true },
      { text: ' mode' },
    ],
    include: 'Include',
    exclude: 'Exclude',
    excludeCount: '16',
    resultTitle: 'Here are your numbers',
    steps: [
      'Load the last 20 draws',
      'Pick frequent numbers',
      'Apply include / exclude',
      'Combine with Smart mode',
      '6 numbers ready',
    ],
    saved: 'Saved to My Numbers',
    note: 'Generated numbers are for fun and do not affect your odds of winning.',
    again: 'Generate again',
  },
};

function Chevron() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#8A909C"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export default function GenerateScreen({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <div className={styles.screen}>
      <MockHeader title={t.title} action={t.history} />
      <div className={styles.main}>
        <div className={styles.card}>
          <p className={gen.hint}>{t.conditionHint}</p>
          <p className={gen.sentence}>
            {t.sentence.map((part, i) =>
              part.token ? (
                <span key={i} className={gen.token}>
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </p>
          <div className={gen.pickRows}>
            <div className={gen.pickRow}>
              <span>{t.include}</span>
              <span className={gen.pickValue}>
                <Ball n={INCLUDED} size={28} />
                <Chevron />
              </span>
            </div>
            <div className={gen.pickRow}>
              <span>{t.exclude}</span>
              <span className={gen.pickValue}>
                <span className={styles.muted}>{t.excludeCount}</span>
                <Chevron />
              </span>
            </div>
          </div>
        </div>

        <div className={`${styles.card} ${gen.resultCard}`}>
          <span className={styles.cardTitle}>{t.resultTitle}</span>
          <div className={gen.balls}>
            {RESULT.map((n) => (
              <Ball key={n} n={n} size={46} ring={n === INCLUDED} />
            ))}
          </div>
          <ul className={gen.steps}>
            {t.steps.map((step) => (
              <li key={step}>
                <CheckIcon size={14} color="#2F7D10" strokeWidth={3} />
                {step}
              </li>
            ))}
          </ul>
          <div className={gen.saved}>
            <StarIcon size={18} filled />
            {t.saved}
          </div>
          <p className={gen.note}>{t.note}</p>
        </div>
      </div>
      <div className={gen.actionBar}>
        <span className={gen.reset}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </span>
        <span className={gen.again}>{t.again}</span>
      </div>
      <TabBar active="generate" locale={locale} />
    </div>
  );
}
