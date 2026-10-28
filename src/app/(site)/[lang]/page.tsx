import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import { getDictionary } from '@/dictionaries';
import { toLocale } from '@/lib/i18n';
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from '@/lib/site';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  email: CONTACT_EMAIL,
};

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const locale = toLocale((await params).lang);
  const t = getDictionary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero t={t.hero} />
      <Products locale={locale} t={t.products} lotto={t.lotto} next={t.next} />
      <Contact t={t.contact} />
    </>
  );
}
