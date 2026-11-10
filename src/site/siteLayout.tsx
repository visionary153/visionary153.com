import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import AdSenseScript from '@/components/AdSenseScript';
import Footer from '@/components/Footer';
import { GoogleTagManagerNoScript, GoogleTagManagerScript } from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import { getDictionary } from '@/dictionaries';
import { plexSansKr } from '@/lib/fonts';
import { languageAlternates, localePath, LOCALES, OG_LOCALES, type Locale } from '@/lib/i18n';
import {
  ADSENSE_CLIENT,
  BRAND_COLORS,
  NAVER_SITE_VERIFICATION,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site';

// 루트 레이아웃이 언어마다 하나씩이라((ko) → `/`, (en) → `/en/`) 공통 부분을 여기 모은다

export const siteViewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: BRAND_COLORS.night },
  ],
};

export function siteMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).meta;
  const home = localePath(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: t.title,
    description: t.description,
    applicationName: SITE_NAME,
    verification: { other: { 'naver-site-verification': NAVER_SITE_VERIFICATION } },
    // AdSense 사이트 소유확인 (등록 사이트가 visionary153.com)
    other: { 'google-adsense-account': ADSENSE_CLIENT },
    alternates: {
      canonical: home,
      languages: languageAlternates(),
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: t.title,
      description: t.description,
      url: home,
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((other) => other !== locale).map(
        (other) => OG_LOCALES[other],
      ),
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
    },
  };
}

export function SiteDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDictionary(locale);

  return (
    <html lang={locale} className={plexSansKr.variable}>
      <body>
        <GoogleTagManagerNoScript />
        <GoogleTagManagerScript />
        <AdSenseScript />
        <Header locale={locale} t={t.nav} />
        <main>{children}</main>
        <Footer locale={locale} t={t.footer} />
      </body>
    </html>
  );
}
