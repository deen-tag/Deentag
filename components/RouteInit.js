'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Déclenche 'dt:pageready' à chaque navigation client-side (clic sur un
// <Link>), pour que tous les scripts hérités enregistrés via
// window.DT_registerInit (voir app/[locale]/layout.js) se ré-exécutent sur
// la nouvelle page — exactement comme ils le faisaient sur 'DOMContentLoaded'
// à chaque rechargement complet de l'ancien site.
//
// On saute volontairement le tout premier rendu : à ce moment-là,
// DT_registerInit a déjà lancé chaque fonction d'init une fois (via son
// propre check de document.readyState / DOMContentLoaded), donc redéclencher
// ici doublerait l'init du tout premier chargement pour rien.
export default function RouteInit() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.dispatchEvent(new Event('dt:pageready'));
  }, [pathname]);

  return null;
}
