import { LOCALES, SITE_URL } from '../lib/i18n-config';

const PAGES = ['', '/invocations', '/quran', '/kids', '/quran-kids', '/shop'];

export default function sitemap() {
  const entries = [];

  for (const page of PAGES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${SITE_URL}/${l}${page}`])
          ),
        },
      });
    }
  }

  return entries;
}
