import type { Metadata, Viewport } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getDictionary } from '@/dictionaries';
import { plexSansKr } from '@/lib/fonts';
import { languageAlternates, LOCALES, OG_LOCALES, toLocale } from '@/lib/i18n';
import { BRAND_COLORS, SITE_NAME, SITE_URL } from '@/lib/site';
import '../../globals.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: BRAND_COLORS.night },
  ],
};

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const locale = toLocale((await params).lang);
  const t = getDictionary(locale).meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: t.title,
    description: t.description,
    applicationName: SITE_NAME,
    alternates: {
      canonical: `/${locale}/`,
      languages: languageAlternates(),
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: t.title,
      description: t.description,
      url: `/${locale}/`,
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

export default async function SiteLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const locale = toLocale((await params).lang);
  const t = getDictionary(locale);

  return (
    <html lang={locale} className={plexSansKr.variable}>
      <body>
        <Header locale={locale} t={t.nav} />
        <main>{children}</main>
        <Footer locale={locale} t={t.footer} />
      </body>
    </html>
  );
}
