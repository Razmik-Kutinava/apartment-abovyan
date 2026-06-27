import { SITE } from '../config';
import type { Locale, Translations } from './i18n';

const FAQ_ITEMS = [1, 2, 3, 4, 5] as const;

const GALLERY_IMAGES = [
  '01-loggia.jpg',
  '02-living.jpg',
  '03-living-wide.jpg',
  '04-bedroom.jpg',
  '05-bedroom-light.jpg',
  '06-balcony.jpg',
  '07-hallway.jpg',
  '08-kitchen.jpg',
  '09-view.jpg',
] as const;

const addressByLocale = {
  ru: { street: 'ул. Гарни, 10', locality: 'Абовян', region: 'Котайк' },
  en: { street: '10 Garni Street', locality: 'Abovyan', region: 'Kotayk' },
  hy: { street: 'Garni 10', locality: 'Աբովյան', region: 'Կոտայք' },
} as const satisfies Record<Locale, { street: string; locality: string; region: string }>;

export function buildStructuredData(params: {
  locale: Locale;
  siteUrl: string;
  pageUrl: string;
  t: Translations;
}) {
  const { locale, siteUrl, pageUrl, t } = params;
  const addr = addressByLocale[locale];
  const ogImage = `${siteUrl}/images/og-preview.jpg`;
  const galleryImages = GALLERY_IMAGES.map((name) => `${siteUrl}/images/gallery/${name}`);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: t['schema.website.name'],
        inLanguage: locale,
      },
      {
        '@type': 'RealEstateListing',
        '@id': `${pageUrl}#listing`,
        name: t['schema.listing.name'],
        description: t['meta.description'],
        url: pageUrl,
        image: [ogImage, ...galleryImages],
        inLanguage: locale,
        offers: {
          '@type': 'Offer',
          price: String(SITE.price),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: addr.street,
          addressLocality: addr.locality,
          addressRegion: addr.region,
          addressCountry: 'AM',
        },
        floorSize: {
          '@type': 'QuantitativeValue',
          value: '78',
          unitCode: 'MTK',
        },
        numberOfRooms: 4,
        telephone: SITE.phone,
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: FAQ_ITEMS.map((n) => ({
          '@type': 'Question',
          name: t[`faq.${n}.q`],
          acceptedAnswer: {
            '@type': 'Answer',
            text: t[`faq.${n}.a`],
          },
        })),
      },
    ],
  };
}
