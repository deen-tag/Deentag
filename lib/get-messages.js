import { DEFAULT_LOCALE, LOCALES } from './i18n-config';

const cache = {};

export async function getMessages(locale) {
  const safeLocale = LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  if (cache[safeLocale]) return cache[safeLocale];
  const messages = (await import(`../messages/${safeLocale}.json`)).default;
  cache[safeLocale] = messages;
  return messages;
}
