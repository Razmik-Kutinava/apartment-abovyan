export const SITE = {
  phone: '+37477271488',
  whatsappPhone: '37477271488',
  price: 92000,
  priceFormatted: { ru: '$92 000', en: '$92,000', hy: '$92 000', fr: '92 000 $' },
  url: 'https://apartment-abovyan.vercel.app',
  gaId: 'G-67EW5H6MKC',
  metrikaId: 111685108,
} as const;

/** External proof links for Mount Hatis / Atis Christ monument (Mechanism section). */
export const ATIS_SOURCES = [
  {
    href: 'https://jesuschristarmenia.com/en/home',
    labelKey: 'mechanism.source.1',
  },
  {
    href: 'https://www.rferl.org/a/worlds-largest-christ-statue-armenia-construction/33710649.html',
    labelKey: 'mechanism.source.2',
  },
  {
    href: 'https://oc-media.org/installation-of-armenias-monumental-jesus-statue-begins/',
    labelKey: 'mechanism.source.3',
  },
] as const;

export const LOCALES = ['hy', 'ru', 'en', 'fr'] as const;
