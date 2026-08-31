import { LOCALES, DEFAULT_LOCALE, SITE_URL } from '../../lib/i18n-config';
import { getMessages } from '../../lib/get-messages';
import { getRuntimeMessages } from '../../lib/get-runtime-messages';
import LangThemeInit from '../../components/LangThemeInit';
import RouteInit from '../../components/RouteInit';

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

export default async function LocaleLayout({ children, params }) {
  const { locale } = params;
  const runtimeMessages = await getRuntimeMessages();

  return (
    <html lang={locale}>
      <head>
        {/*
          DT_MESSAGES — traductions des petits textes d'interface (bouton
          "Écouter", tailles de texte...) utilisées par les scripts hérités
          (app.js). Avant, ces textes étaient dupliqués en dur dans app.js ;
          ils viennent maintenant uniquement de messages/*.json (clé
          "runtime"), assemblés par lib/get-runtime-messages.js. Un seul
          endroit à modifier pour corriger un texte, plus deux.
          Objet complet (8 langues) car il ne dépend pas de la locale de la
          page courante et n'a donc pas besoin d'être réinjecté à chaque
          navigation SPA (contrairement à DT_registerInit).
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.DT_MESSAGES = ${JSON.stringify(runtimeMessages)};`,
          }}
        />
        {/*
          DT_registerInit — remplace tous les anciens
          `document.addEventListener('DOMContentLoaded', fn)` des scripts hérités.

          Pourquoi : en navigation Next.js (SPA), le document ne se recharge
          jamais après le tout premier chargement, donc 'DOMContentLoaded' ne
          se déclenche qu'une seule fois pour toute la session. Les scripts
          hérités qui s'appuyaient dessus pour s'initialiser ne se relançaient
          donc jamais en cliquant sur un lien — seul un F5 (vrai rechargement)
          les faisait fonctionner.

          Ce helper fait deux choses pour chaque fonction d'init `fn` :
          1. La lance immédiatement si le DOM est déjà prêt, sinon attend
             'DOMContentLoaded' — couvre le tout premier chargement quel que
             soit le moment exact où le script s'exécute.
          2. L'enregistre aussi sur l'événement custom 'dt:pageready', déclenché
             par <RouteInit> (components/RouteInit.js) à CHAQUE navigation
             client-side. C'est ça qui permet la ré-init en SPA.

          Chaque fonction d'init existante fait déjà ses propres vérifications
          de présence des éléments DOM (ex: `if (!widget) return;`), donc la
          rappeler sur une page où elle ne s'applique pas est sans effet (no-op).
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.DT_registerInit = function (fn) {
                var run = function () {
                  try { fn(); } catch (e) { console.error('[DT_registerInit]', e); }
                };
                if (document.readyState !== 'loading') run();
                else document.addEventListener('DOMContentLoaded', run, { once: true });
                window.addEventListener('dt:pageready', run);
              };
            `,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <link rel="stylesheet" href="/css/adult.css" />
        <link rel="stylesheet" href="/css/wheel.css" />
        <link rel="stylesheet" href="/css/kids.css" />
        <link rel="stylesheet" href="/css/shop.css" />
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
        {/* Redéclenche l'init des scripts hérités à chaque navigation SPA (voir DT_registerInit ci-dessus) */}
        <RouteInit />
        {children}
        {/* Fait disparaître le splash de lancement sur TOUTES les pages (accueil, invocations, quran, shop, kids...).
            Utilise DT_registerInit : sans ça, ce script — comme les scripts hérités —
            ne se relancerait qu'une fois au tout premier chargement, et le #appSplash
            fraîchement monté (ex: en arrivant sur Invocations en SPA) resterait bloqué
            à l'écran indéfiniment (position:fixed, z-index:9999). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.DT_registerInit(function(){
                var el = document.getElementById('appSplash');
                if (!el) return;
                var t0 = performance.now();
                var MIN_VISIBLE = 350;
                var MAX_VISIBLE = 2500;
                var hidden = false;
                function hideSplash(){
                  if (hidden) return;
                  hidden = true;
                  var elapsed = performance.now() - t0;
                  var wait = Math.max(0, MIN_VISIBLE - elapsed);
                  setTimeout(function(){
                    el.classList.add('hide');
                    setTimeout(function(){ el.style.display = 'none'; }, 400);
                  }, wait);
                }
                if (document.readyState === 'complete') {
                  hideSplash();
                } else {
                  window.addEventListener('load', hideSplash, { once: true });
                }
                setTimeout(hideSplash, MAX_VISIBLE);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
