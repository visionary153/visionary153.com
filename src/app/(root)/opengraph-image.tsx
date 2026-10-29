import { OG_IMAGE_SIZE, ogImageResponse } from '@/lib/brandImages';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { SITE_NAME } from '@/lib/site';

export const alt = SITE_NAME;
export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';
export const dynamic = 'force-static';

/** 도메인만 공유될 때의 미리보기 — 미리보기 봇은 언어 이동 스크립트를 따라가지 않는다 */
export default function OpenGraphImage() {
  return ogImageResponse(DEFAULT_LOCALE);
}
