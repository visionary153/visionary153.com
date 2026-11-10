import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import { getDictionary } from '@/dictionaries';
import type { Locale } from '@/lib/i18n';
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, WEBSITE_JSON_LD } from '@/lib/site';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  email: CONTACT_EMAIL,
};

export default function HomeContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
      />
      <Hero t={t.hero} />
      <Products locale={locale} t={t.products} lotto={t.lotto} next={t.next} />
      <Contact t={t.contact} />
    </>
  );
}
