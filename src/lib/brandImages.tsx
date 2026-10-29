import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { getDictionary } from '@/dictionaries';
import type { Locale } from './i18n';
import { BRAND_COLORS, SYMBOL_DOT, SYMBOL_PATH } from './site';

// 원본 앱 아이콘 SVG: 1024 캔버스에 심볼(120)을 5.6배 → 한 변의 약 65.6%
const SYMBOL_RATIO = 672 / 1024;

/** 앱 아이콘(그라데이션 배경 + 흰 심볼) PNG — 모서리는 OS가 깎으므로 정사각형 그대로 */
export function appIconResponse(size: number) {
  const [from, via, to] = BRAND_COLORS.gradient;
  const symbolSize = Math.round(size * SYMBOL_RATIO);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `linear-gradient(135deg, ${from} 0%, ${via} 55%, ${to} 100%)`,
      }}
    >
      <svg width={symbolSize} height={symbolSize} viewBox="0 0 120 120">
        <path d={SYMBOL_PATH} fill="#FFFFFF" />
        <circle cx={SYMBOL_DOT.cx} cy={SYMBOL_DOT.cy} r={SYMBOL_DOT.r} fill="#FFFFFF" />
      </svg>
    </div>,
    { width: size, height: size },
  );
}

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

const fontBold = readFile(join(process.cwd(), 'assets/fonts/IBMPlexSansKR-Bold.ttf'));
const darkLogo = readFile(join(process.cwd(), 'public/logo-horizontal-dark.svg'), 'base64');

/** 링크 미리보기(OG·트위터 카드) PNG — 언어별 히어로 문구 */
export async function ogImageResponse(locale: Locale) {
  const hero = getDictionary(locale).hero;
  const [from, via, to] = BRAND_COLORS.gradientOnDark;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 80px',
        background: BRAND_COLORS.night,
        color: '#FFFFFF',
        fontFamily: 'IBM Plex Sans KR',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: -10,
          top: 85,
          width: 460,
          height: 460,
          borderRadius: 230,
          border: '1px solid #2A3366',
        }}
      />
      <svg
        width="300"
        height="300"
        viewBox="0 0 120 120"
        style={{ position: 'absolute', right: 70, top: 165 }}
      >
        <defs>
          <linearGradient id="og-symbol" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={from} />
            <stop offset="0.5" stopColor={via} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        <path d={SYMBOL_PATH} fill="url(#og-symbol)" />
        <circle cx={SYMBOL_DOT.cx} cy={SYMBOL_DOT.cy} r={SYMBOL_DOT.r} fill="url(#og-symbol)" />
      </svg>

      <img
        src={`data:image/svg+xml;base64,${await darkLogo}`}
        width={227}
        height={64}
        style={{ marginLeft: -18 }}
        alt=""
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 680,
          fontSize: 72,
          lineHeight: 1.15,
        }}
      >
        <span>{hero.titleLead}</span>
        <span style={{ color: from }}>{hero.titleAccent}</span>
      </div>
      <span style={{ fontSize: 24, color: '#AEB5D8' }}>visionary153.com</span>
    </div>,
    {
      ...OG_IMAGE_SIZE,
      fonts: [{ name: 'IBM Plex Sans KR', data: await fontBold, weight: 700, style: 'normal' }],
    },
  );
}
