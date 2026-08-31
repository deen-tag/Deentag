'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_LABELS } from '../lib/i18n-config';

// Remplace le sélecteur de langue d'origine (qui changeait juste du texte en
// JS sur la même URL) par de vrais liens vers /en, /es, etc. C'est ce qui
// permet à Google de découvrir et d'indexer chaque langue comme une page à
// part entière.
export default function LangMenu({ currentLocale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${currentLocale}`;
  const rest = pathname.split('/').slice(2).join('/'); // ce qui suit /xx/

  return (
    <div className="lang-wrapper">
      <button className="lang-btn" onClick={() => setOpen((o) => !o)}>
        {currentLocale.toUpperCase()} ▾
      </button>
      {open && (
        <div className="lang-menu" style={{ display: 'block' }}>
          {LOCALES.map((locale) => (
            <Link
              key={locale}
              className="lang-option"
              href={`/${locale}${rest ? `/${rest}` : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="lang-flag">{LOCALE_LABELS[locale].flag}</span>
              {LOCALE_LABELS[locale].name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
