import type { Locale } from '@/lib/i18n';
import styles from './Mockup.module.css';

/** 공식 구간별 공 색 (앱 theme.ts lottoBalls) */
export function ballColor(n: number) {
  if (n <= 10) return '#FBC400';
  if (n <= 20) return '#69C8F2';
  if (n <= 30) return '#FF8A8A';
  if (n <= 40) return '#BFC3CA';
  return '#B0D840';
}

// 목업 속 예시 회차의 당첨번호
export const EXAMPLE_WINNING = [3, 14, 22, 27, 35, 41];
const winningSet = new Set(EXAMPLE_WINNING);

export function countMatches(numbers: number[]) {
  return numbers.filter((n) => winningSet.has(n)).length;
}

const RANK_BY_MATCHES: Record<number, { ko: string; en: string }> = {
  6: { ko: '1등', en: '1st' },
  5: { ko: '3등', en: '3rd' },
  4: { ko: '4등', en: '4th' },
  3: { ko: '5등', en: '5th' },
};

export function rankLabel(matches: number, locale: Locale): string | undefined {
  return RANK_BY_MATCHES[matches]?.[locale];
}

type BallProps = {
  n: number;
  size: number;
  /** 당첨번호와 일치하는 번호만 색을 칠할 때 */
  dimUnmatched?: boolean;
  ring?: boolean;
};

export function Ball({ n, size, dimUnmatched = false, ring = false }: BallProps) {
  const dimmed = dimUnmatched && !winningSet.has(n);
  return (
    <span
      className={styles.ball}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.41),
        background: dimmed ? '#F4F5F7' : ballColor(n),
        color: dimmed ? '#5B6270' : '#15171C',
        boxShadow: ring ? '0 0 0 2px #FFFFFF, 0 0 0 4px #15171C' : undefined,
      }}
    >
      {n}
    </span>
  );
}

function SettingsIcon() {
  return (
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
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  );
}

export function MockHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className={styles.header}>
      <span className={styles.headerTitle}>{title}</span>
      <span className={styles.headerActions}>
        {action && <span className={styles.headerText}>{action}</span>}
        <span className={styles.iconBox}>
          <SettingsIcon />
        </span>
      </span>
    </div>
  );
}

export function StarIcon({ size, filled = false }: { size: number; filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z" />
    </svg>
  );
}

export function CheckIcon({
  size,
  color,
  strokeWidth,
}: {
  size: number;
  color: string;
  strokeWidth: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

const TAB_LABELS = {
  ko: { qr: 'QR 당첨확인', generate: '번호 생성', myNumbers: '내 번호' },
  en: { qr: 'QR Check', generate: 'Generate', myNumbers: 'My Numbers' },
} as const;

export type AppTab = keyof (typeof TAB_LABELS)['ko'];

export function TabBar({ active, locale }: { active: AppTab; locale: Locale }) {
  const labels = TAB_LABELS[locale];
  const tabClass = (tab: AppTab) => (tab === active ? styles.tabActive : styles.tab);

  return (
    <div className={styles.tabBar}>
      <span className={tabClass('qr')}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3" />
        </svg>
        {labels.qr}
      </span>
      <span className={tabClass('generate')}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" />
          <circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
        </svg>
        {labels.generate}
      </span>
      <span className={tabClass('myNumbers')}>
        <StarIcon size={22} filled={active === 'myNumbers'} />
        {labels.myNumbers}
      </span>
    </div>
  );
}
