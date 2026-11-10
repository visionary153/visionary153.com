import { OG_IMAGE_SIZE, ogImageResponse } from '@/lib/brandImages';
import { SITE_NAME } from '@/lib/site';

export const alt = SITE_NAME;
export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function OpenGraphImage() {
  return ogImageResponse('en');
}
