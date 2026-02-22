import 'server-only';
import { Locale } from '@/i18n.config';
import en from './dictionaries/en.json';
import ar from './dictionaries/ar.json';

const dictionaries: Record<Locale, typeof en> = {
  en,
  ar,
};

export type Dictionary = typeof en;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale] ?? dictionaries.en;
};
