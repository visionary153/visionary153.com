import { siteMetadata, siteViewport, SiteDocument } from '@/site/siteLayout';
import '../globals.css';

// 한국어(기본 언어) — 접두어 없이 `/`, `/privacy/`
export const metadata = siteMetadata('ko');
export const viewport = siteViewport;

export default function KoreanLayout({ children }: LayoutProps<'/'>) {
  return <SiteDocument locale="ko">{children}</SiteDocument>;
}
