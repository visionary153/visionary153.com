import type { Locale } from '@/lib/i18n';
import en from './en';
import ko, { type Dictionary } from './ko';

const dictionaries: Record<Locale, Dictionary> = { ko, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
