import { LOCALES, DEFAULT_LOCALE, SITE_URL } from '../../lib/i18n-config';
import { getMessages } from '../../lib/get-messages';
import LangThemeInit from '../../components/LangThemeInit';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = params;
  const t = await getMessages(locale);

  // hreflang : indique à Google toutes les versions linguistiques de cette page
  const languages = {};
  LOCALES.forEach((l) => {
    languages[l] = `${SITE_URL}/${l}`;
  });
  languages['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}`;

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages,
    },
    openGraph: {
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      url: `${SITE_URL}/${locale}`,
      images: [`${SITE_URL}/images/logo.webp`],
      type: 'website',
    },
    themeColor: '#0F0D08',
    icons: { icon: '/favicon.png' },
  };
}

export default function LocaleLayout({ children, params }) {
  const { locale } = params;

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <link rel="stylesheet" href="/css/adult.css" />
        <link rel="stylesheet" href="/css/wheel.css" />
        <link rel="stylesheet" href="/css/kids.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Deentag',
              url: SITE_URL,
              logo: `${SITE_URL}/images/logo.webp`,
            }),
          }}
        />
      </head>
      <body className="day">
        {/* Initialise thème/langue/kids depuis le cookie+localStorage, comme le script inline d'origine */}
        <LangThemeInit locale={locale} />
        {children}
      </body>
    </html>
  );
}
