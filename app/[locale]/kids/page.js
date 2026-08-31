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
  return { title: t.pages.kids.title, description: t.pages.kids.description };
}

export default async function KidsPage({ params }) {
  const { locale } = params;
  const html = getPageHtml('kids', locale);

  return (
    <>
      <SetBodyMeta page="kids" extraClass="page-kids" />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/js/kids-duas.js" strategy="afterInteractive" />
      <Script src="/js/kids.js" strategy="afterInteractive" />
      <Script src="/js/profiles.js" strategy="afterInteractive" />
      <Script src="/js/nav.js" strategy="afterInteractive" />
      <Script src="/js/kids-profiles.js" strategy="afterInteractive" />
    </>
  );
}
