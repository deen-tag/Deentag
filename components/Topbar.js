import LangMenu from './LangMenu';
import ThemeToggle from './ThemeToggle';

export default function Topbar({ locale }) {
  return (
    <div className="app-topbar">
      <div className="night-stars" id="nightStars"></div>
      <div className="app-topbar-left">
        <LangMenu currentLocale={locale} />
      </div>
      <div className="app-topbar-center">
        <img src="/images/logo.webp" className="app-topbar-logo logo-day" alt="Deentag" />
        <img src="/images/logo-night.webp" className="app-topbar-logo logo-night" alt="Deentag" />
      </div>
      <div className="app-topbar-right">
        <ThemeToggle />
      </div>
    </div>
  );
}
