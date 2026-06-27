import ru from '../i18n/ru.json';
import hy from '../i18n/hy.json';
import en from '../i18n/en.json';

const translations = { ru, hy, en } as const;

export type Locale = keyof typeof translations;
export type Translations = Record<string, string>;

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}

export function t(locale: Locale, key: string): string {
  return translations[locale][key as keyof typeof translations[typeof locale]] ?? key;
}
