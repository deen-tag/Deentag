'use client';

import { useEffect } from 'react';

// Reproduit le comportement du script inline d'origine (thème jour/nuit, mode
// enfants), mais la LANGUE est désormais pilotée par l'URL (/fr, /en, ...)
// et non plus par localStorage seul. On garde `deentag_lang` en localStorage
// et l'attribut data-lang sur <html> pour que les scripts existants
// (prayer-times.js, home.js, wheel.js...) qui lisent encore cette valeur
// pour du contenu généré dynamiquement continuent de fonctionner sans
// modification.
export default function LangThemeInit({ locale }) {
  useEffect(() => {
    const theme = localStorage.getItem('deentag_theme') || 'day';
    const kids = localStorage.getItem('deentag_kids') === 'on';

    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-lang', locale);
    localStorage.setItem('deentag_lang', locale);
    document.cookie = `deentag_locale=${locale}; path=/; max-age=31536000`;

    document.body.classList.remove('day', 'night');
    document.body.classList.add(theme);
    if (kids) {
      document.documentElement.setAttribute('data-kids', 'on');
      document.body.classList.add('kids');
    }
  }, [locale]);

  return null;
}
