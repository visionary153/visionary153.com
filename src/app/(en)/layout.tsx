import { siteMetadata, siteViewport, SiteDocument } from '@/site/siteLayout';
import '../globals.css';

// 영어 — `/en/`, `/en/privacy/`
export const metadata = siteMetadata('en');
export const viewport = siteViewport;

export default function EnglishLayout({ children }: LayoutProps<'/'>) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
