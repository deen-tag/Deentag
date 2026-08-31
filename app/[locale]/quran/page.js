import Script from 'next/script';
import SetBodyMeta from '../../../components/SetBodyMeta';
import { getMessages } from '../../../lib/get-messages';
import { getPageHtml } from '../../../lib/get-page-html';
import { LOCALES } from '../../../lib/i18n-config';
import Topbar from '../../../components/Topbar';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const t = await getMessages(params.locale);
  return { title: t.pages.quran.title, description: t.pages.quran.description };
}

export default async function QuranPage({ params }) {
  const { locale } = params;
  const html = getPageHtml('quran', locale);

  return (
    <>
      <SetBodyMeta page="quran" extraClass="page-quran" />
      <Topbar locale={locale} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/js/quran.js" strategy="afterInteractive" />
      <Script src="/js/home-flip.js" strategy="afterInteractive" />
      <Script src="/js/nav.js" strategy="afterInteractive" />
      <Script src="/js/profiles.js" strategy="afterInteractive" />
      <Script src="/js/wheel.js" strategy="afterInteractive" />
    </>
  );
}
