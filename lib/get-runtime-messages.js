import { LOCALES } from './i18n-config';

// Rassemble la clé "runtime" (petits textes d'interface : boutons du lecteur
// audio, taille du texte...) des 8 fichiers messages/<locale>.json en un
// seul objet { fr: {...}, en: {...}, ... }, injecté ensuite côté client via
// window.DT_MESSAGES (voir app/[locale]/layout.js).
//
// Avant, ce même texte existait une deuxième fois, codé en dur dans
// public/js/app.js (un objet i18n dupliqué). Maintenant messages/*.json est
// la seule source : app.js lit window.DT_MESSAGES au lieu d'avoir sa propre
// copie. Un mot à corriger = un seul endroit à modifier.
let cached = null;

export async function getRuntimeMessages() {
  if (cached) return cached;
  const entries = await Promise.all(
    LOCALES.map(async (locale) => {
      const messages = (await import(`../messages/${locale}.json`)).default;
      return [locale, messages.runtime || {}];
    })
  );
  cached = Object.fromEntries(entries);
  return cached;
}
