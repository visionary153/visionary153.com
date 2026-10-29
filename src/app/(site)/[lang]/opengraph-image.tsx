import { OG_IMAGE_SIZE, ogImageResponse } from '@/lib/brandImages';
import { LOCALES, toLocale } from '@/lib/i18n';
import { SITE_NAME } from '@/lib/site';

export const alt = SITE_NAME;
export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';
export const dynamic = 'force-static';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  return ogImageResponse(toLocale((await params).lang));
}
