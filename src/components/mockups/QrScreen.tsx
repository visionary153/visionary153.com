import type { Locale } from '@/lib/i18n';
import styles from './Mockup.module.css';
import qr from './QrScreen.module.css';
import { Ball, countMatches, EXAMPLE_WINNING, MockHeader, rankLabel, TabBar } from './parts';

const TICKET = [
  [3, 9, 14, 22, 30, 41],
  [5, 11, 27, 33, 38, 44],
  [2, 14, 19, 25, 35, 40],
];
const BONUS = 6;

const COPY = {
  ko: {
    title: 'QR 당첨확인',
    round: '1246회',
    drawDate: '10월 17일 추첨',
    latest: '최신',
    firstPrize: '1등 당첨금',
    prize: '1,881,025,430원',
    scanHint: '용지의 QR 코드를 네모 안에 맞춰 주세요',
    checked: '확인한 용지',
    summary: '4등 1게임 당첨',
    summaryPrize: '50,000원',
    noWin: '낙첨',
  },
  en: {
    title: 'QR Check',
    round: 'Draw 1246',
    drawDate: 'Oct 17',
    latest: 'Latest',
    firstPrize: '1st prize',
    prize: '₩1,881,025,430',
    scanHint: 'Fit the ticket’s QR code inside the frame',
    checked: 'Checked tickets',
    summary: '1 game won · 4th prize',
    summaryPrize: '₩50,000',
    noWin: 'No win',
  },
};

export default function QrScreen({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <div className={styles.screen}>
      <MockHeader title={t.title} />
      <div className={styles.main}>
        <div className={styles.card}>
          <div className={qr.roundRow}>
            <span>
              <strong className={qr.round}>{t.round}</strong>{' '}
              <span className={styles.muted}>{t.drawDate}</span>
            </span>
            <span className={styles.badge}>{t.latest}</span>
          </div>
          <div className={qr.winningRow}>
            {EXAMPLE_WINNING.map((n) => (
              <Ball key={n} n={n} size={36} />
            ))}
            <span className={qr.plus}>+</span>
            <Ball n={BONUS} size={36} />
          </div>
          <div className={qr.prizeRow}>
            <span className={styles.muted}>{t.firstPrize}</span>
            <strong>{t.prize}</strong>
          </div>
        </div>

        <div className={qr.camera}>
          <span className={qr.frame}>
            <span className={`${qr.corner} ${qr.topLeft}`} />
            <span className={`${qr.corner} ${qr.topRight}`} />
            <span className={`${qr.corner} ${qr.bottomLeft}`} />
            <span className={`${qr.corner} ${qr.bottomRight}`} />
            <span className={qr.scanLine} />
          </span>
          <span className={qr.scanHint}>{t.scanHint}</span>
          <span className={qr.torch}>
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
              <path d="M7 2h10l-2 7h3l-9 13 2-9H7z" />
            </svg>
          </span>
        </div>

        <div className={styles.card}>
          <span className={styles.cardTitle}>{t.checked}</span>
          <div className={qr.summary}>
            <span>{t.summary}</span>
            <span>{t.summaryPrize}</span>
          </div>
          {TICKET.map((numbers, i) => {
            const rank = rankLabel(countMatches(numbers), locale);
            return (
              <div key={i} className={qr.gameRow}>
                <span className={qr.gameLabel}>{'ABC'[i]}</span>
                <span className={qr.gameBalls}>
                  {numbers.map((n) => (
                    <Ball key={n} n={n} size={30} dimUnmatched />
                  ))}
                </span>
                <span className={rank ? qr.resultWin : qr.result}>{rank ?? t.noWin}</span>
              </div>
            );
          })}
        </div>
      </div>
      <TabBar active="qr" locale={locale} />
    </div>
  );
}
