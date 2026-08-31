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
  return { title: t.pages.shop.title, description: t.pages.shop.description };
}

export default async function ShopPage({ params }) {
  const { locale } = params;
  const html = getPageHtml('shop', locale);

  return (
    <>
      <SetBodyMeta page="shop" extraClass="shop-page" />
      <Topbar locale={locale} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/js/duas.js" strategy="afterInteractive" />
      <Script src="/js/app.js" strategy="afterInteractive" />
      <Script src="/js/nav.js" strategy="afterInteractive" />
    </>
  );
}
