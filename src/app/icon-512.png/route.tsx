import { appIconResponse } from '@/lib/brandImages';

export const dynamic = 'force-static';

export function GET() {
  return appIconResponse(512);
}
