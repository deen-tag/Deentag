import { NextResponse } from 'next/server';
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
  if (pathnameHasLocale) return NextResponse.next();

  // Ignore les fichiers statiques et API
  if (
    pathname.startsWith('/css') ||
    pathname.startsWith('/js') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/Audio') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
