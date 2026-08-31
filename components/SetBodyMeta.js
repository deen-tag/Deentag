'use client';

import { useEffect } from 'react';

// nav.js lit body[data-page] pour savoir quelle barre de navigation construire,
// et certains CSS ciblent des classes de page spécifiques (page-quran, shop-page...).
// On les réapplique ici puisque le <body> est désormais géré une seule fois
// par le layout racine.
export default function SetBodyMeta({ page, extraClass }) {
  useEffect(() => {
    document.body.setAttribute('data-page', page);
    if (extraClass) {
      extraClass.split(' ').forEach((c) => c && document.body.classList.add(c));
    }
    return () => {
      document.body.removeAttribute('data-page');
      if (extraClass) {
        extraClass.split(' ').forEach((c) => c && document.body.classList.remove(c));
      }
    };
  }, [page, extraClass]);

  return null;
}
