import Script from 'next/script';
import SetBodyMeta from '../../../components/SetBodyMeta';
import { getMessages } from '../../../lib/get-messages';
import { getPageHtml } from '../../../lib/get-page-html';
import { LOCALES } from '../../../lib/i18n-config';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const t = await getMessages(params.locale);
  return { title: t.pages.quranKids.title, description: t.pages.quranKids.description };
}

export default async function QuranKidsPage({ params }) {
  const { locale } = params;
  const html = getPageHtml('quran-kids', locale);

  return (
    <>
      <SetBodyMeta page="quran-kids" extraClass="page-quran-kids" />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/js/quran.js" strategy="afterInteractive" />
      <Script src="/js/quran-kids.js" strategy="afterInteractive" />
      <Script src="/js/profiles.js" strategy="afterInteractive" />
      <Script src="/js/nav.js" strategy="afterInteractive" />
      <Script src="/js/kids-profiles.js" strategy="afterInteractive" />
    </>
  );
}
