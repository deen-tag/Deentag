import Script from 'next/script';
import Link from 'next/link';
import { getMessages } from '../../lib/get-messages';
import { LOCALES } from '../../lib/i18n-config';
import LangMenu from '../../components/LangMenu';
import ThemeToggle from '../../components/ThemeToggle';
import SetBodyMeta from '../../components/SetBodyMeta';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function HomePage({ params }) {
  const { locale } = params;
  const t = await getMessages(locale);

  return (
    <>
      <SetBodyMeta page="accueil" />
      {/* SPLASH DE LANCEMENT */}
      <div className="app-splash" id="appSplash">
        <div className="app-splash-logo"></div>
        <div className="app-splash-brand">DEENTAG</div>
      </div>

      {/* TOPBAR */}
      <div className="app-topbar">
        <div className="night-stars" id="nightStars"></div>
        <div className="app-topbar-left">
          <LangMenu currentLocale={locale} />
        </div>
        <div className="app-topbar-center">
          <Link href={`/${locale}`} aria-label="Accueil">
            <img src="/images/logo.webp" className="app-topbar-logo logo-day" alt="Deentag" />
            <img src="/images/logo-night.webp" className="app-topbar-logo logo-night" alt="Deentag" />
          </Link>
        </div>
        <div className="app-topbar-right">
          <ThemeToggle />
        </div>
      </div>

      {/* HEADER */}
      <div className="index-header">
        <div className="index-brand">DEENTAG</div>
        <div className="index-ornament">
          <div className="index-ornament-line"></div>
          <span className="ornament-star">✦</span>
          <div className="index-ornament-line"></div>
        </div>
        <h1 className="section-title">{t.home.pageTitle}</h1>
        <div className="home-greeting-wrap">
          <button
            className="home-greeting-btn"
            id="homeGreetingBtn"
            aria-label="Mon profil"
            aria-live="polite"
          >
            <span className="home-greeting-dot" id="homeGreetingDot"></span>
            <span id="homeGreetingText">{t.home.greetingDefault}</span>
          </button>
          <div className="home-greeting-phrase" id="homeGreetingPhrase"></div>
        </div>
      </div>

      {/* HORAIRES DE PRIÈRE */}
      <div className="prayer-gauge" id="prayerGauge">
        <div className="pg-top">
          <span className="pg-next">
            <span className="pg-next-name" id="pgNextName">—</span>
            <span className="pg-next-sep">·</span>
            <span className="pg-countdown"><span id="pgCountdownText">--</span></span>
          </span>
          <button className="pg-cal-btn" id="pgCalBtn" aria-label="Calendrier">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>
          </button>
        </div>

        <div className="pg-track" id="pgTrack"></div>

        <div className="pg-bottom">
          <span className="pg-city" id="pgCity">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8 2 5 5 5 9c0 5.5 7 13 7 13s7-7.5 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.2"/></svg>
            <span id="pgCityName"></span>
          </span>
        </div>

        <button className="prayer-locate-btn" id="prayerLocateBtn" style={{ display: 'none' }}>
          {t.home.enableLocation}
        </button>

        <div className="prayer-error" id="prayerError" style={{ display: 'none' }}></div>
      </div>

      {/* CARTES DE NAVIGATION */}
      <div className="home-nav-grid" id="homeNavGrid">
        <Link className="cat-card" href={`/${locale}/invocations`}>
          <div className="cat-icon-circle">
            <img src="/images/icone-invocations.webp" className="cat-icon" alt={t.nav.invocations} />
            <img src="/images/icone-invocations.webp" className="cat-icon cat-icon--back" alt="" aria-hidden="true" />
          </div>
          <div className="cat-label">{t.nav.invocations}</div>
        </Link>
        <Link className="cat-card" href={`/${locale}/quran`}>
          <div className="cat-icon-circle">
            <img src="/images/icone-coran.webp" className="cat-icon" alt={t.nav.coran} />
            <img src="/images/icone-coran.webp" className="cat-icon cat-icon--back" alt="" aria-hidden="true" />
          </div>
          <div className="cat-label">{t.nav.coran}</div>
        </Link>
        <Link className="cat-card" href={`/${locale}/kids`}>
          <div className="cat-icon-circle">
            <img src="/images/icone-enfants-coran.webp" className="cat-icon" alt={t.nav.enfants} />
            <img src="/images/icone-enfants-coran.webp" className="cat-icon cat-icon--back" alt="" aria-hidden="true" />
          </div>
          <div className="cat-label">{t.nav.enfants}</div>
        </Link>
        <Link className="cat-card" href={`/${locale}/shop`}>
          <div className="cat-icon-circle">
            <img src="/images/icone-boutique-nfc.webp" className="cat-icon" alt={t.nav.boutique} />
            <img src="/images/icone-boutique-nfc.webp" className="cat-icon cat-icon--back" alt="" aria-hidden="true" />
          </div>
          <div className="cat-label">{t.nav.boutique}</div>
        </Link>
      </div>

      {/* Scripts existants, inchangés — chargés après le contenu interactif */}
      <Script src="/js/duas.js" strategy="afterInteractive" />
      <Script src="/js/app.js" strategy="afterInteractive" />
      <Script src="/js/profiles.js" strategy="afterInteractive" />
      <Script src="/js/prayer-times.js" strategy="afterInteractive" />
      <Script src="/js/home.js" strategy="afterInteractive" />
      <Script src="/js/home-flip.js" strategy="afterInteractive" />
      <Script src="/js/wheel.js" strategy="afterInteractive" />
    </>
  );
}
