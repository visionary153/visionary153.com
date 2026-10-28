import { ImageResponse } from 'next/og';
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
