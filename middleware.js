import { LOCALES, DEFAULT_LOCALE } from './lib/i18n-config';

// Détecte la langue préférée du navigateur (header Accept-Language)
// et redirige "/" vers "/fr", "/en", etc. Une fois sur une URL de langue,
// on ne redirige plus jamais automatiquement (l'utilisateur garde la main
// via le sélecteur de langue).
function getPreferredLocale(request) {
  const cookieLocale = request.cookies.get('deentag_locale')?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get('accept-language') || '';
  const preferred = acceptLanguage
    .split(',')
    .map((part) => part.split(';')[0].trim().slice(0, 2).toLowerCase());

  for (const lang of preferred) {
    if (LOCALES.includes(lang)) return lang;
  }
  return DEFAULT_LOCALE;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return;

  // Ignore les fichiers statiques et routes spéciales Next.js (robots.txt,
  // sitemap.xml...). Avant, on ignorait toute URL contenant un point — ça
  // laissait passer /index.html sans le rediriger vers /fr/..., et
  // "index.html" se retrouvait affiché comme si c'était la langue. Maintenant
  // seuls les vrais chemins d'assets connus sont exemptés ; tout le reste
  // (y compris /index.html) est redirigé normalement, et retombera sur un
  // vrai 404 s'il ne correspond à aucune page.
  if (
    pathname.startsWith('/css/') ||
    pathname.startsWith('/js/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/Audio/') ||
    pathname.startsWith('/api/') ||
    pathname === '/favicon.png' ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return;
  }

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return Response.redirect(url);
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
