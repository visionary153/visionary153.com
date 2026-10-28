import { IBM_Plex_Sans_KR } from 'next/font/google';

export const plexSansKr = IBM_Plex_Sans_KR({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});
