import { Locale } from '@/i18n.config';
import { getDictionary, type Dictionary } from './getDictionary';
import { getDictionarySync, type Dictionary as ClientDictionary } from './client';

export { locales, defaultLocale, localeNames, localeDirections, isLocale, type Locale } from '@/i18n.config';
export { getDictionary, getDictionarySync };
export type { Dictionary, ClientDictionary };
