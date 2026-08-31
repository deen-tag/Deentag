import fs from 'fs';
import path from 'path';
import { DEFAULT_LOCALE, LOCALES } from './i18n-config';

export function getPageHtml(page, locale) {
  const safeLocale = LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  const filePath = path.join(process.cwd(), 'content', page, `${safeLocale}.html`);
  return fs.readFileSync(filePath, 'utf-8');
}
