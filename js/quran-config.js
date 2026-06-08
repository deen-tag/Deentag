// ===== DEENTAG CORAN — CONFIGURATION DES ÉDITIONS =====
// Éditions disponibles par langue pour traductions et audio

const QURAN_CONFIG = {
  // Traductions par langue
  translations: {
    fr: { identifier: 'fr.hamidullah', name: 'Muhammad Hamidullah' },
    en: { identifier: 'en.asad', name: 'Muhammad Asad' },
    es: { identifier: 'es.cortes', name: 'Julio Cortes' },
    de: { identifier: 'de.aburida', name: 'Abu Rida' },
    it: { identifier: 'it.piccardo', name: 'Hamza Roberto Piccardo' },
    nl: { identifier: 'nl.keyzer', name: 'Salomo Keyzer' },
    pt: { identifier: 'pt.elhayek', name: 'Samir El-Hayek' },
    tr: { identifier: 'tr.ates', name: 'Suleyman Ates' },
    ar: { identifier: 'quran-uthmani', name: 'Arabic (Uthmani)' }
  },

  // Récitateurs (audio) - principalement en arabe
  reciters: {
    ar: [
      { identifier: 'ar.abdulbasitmurattal', name: 'Abdul Basit (Murattal)' },
      { identifier: 'ar.abdullahbasfar', name: 'Abdullah Basfar' },
      { identifier: 'ar.alafasy', name: 'Mishary Al-Afasy' },
      { identifier: 'ar.alafasy-64', name: 'Mishary Al-Afasy (64 kbps)' },
      { identifier: 'ar.husary', name: 'Mahmoud Al-Husary' },
      { identifier: 'ar.husary-mujawwad', name: 'Mahmoud Al-Husary (Mujawwad)' },
      { identifier: 'ar.minshawi', name: 'Muhammad Siddiq Al-Minshawi' },
      { identifier: 'ar.minshawi-mujawwad', name: 'Muhammad Siddiq Al-Minshawi (Mujawwad)' },
      { identifier: 'ar.maher', name: 'Maher Al-Muaiqly' },
      { identifier: 'ar.qahtani', name: 'Nasser Al-Qatami' }
    ],
    en: [
      { identifier: 'en.walk', name: 'Ibrahim Walk' }
    ],
    fr: [
      { identifier: 'fr.leclerc', name: 'Youssouf Leclerc' }
    ],
    tr: [
      { identifier: 'tr.vakfi-audio', name: 'Diyanet Vakfı' }
    ]
  },

  // API base
  apiBase: 'http://api.alquran.cloud/v1',

  // Langues supportées
  languages: ['fr', 'en', 'es', 'de', 'it', 'nl', 'pt', 'tr']
};

// Fonction utilitaire pour construire les URLs d'API
function getQuranApiUrl(endpoint, edition) {
  return `${QURAN_CONFIG.apiBase}/${endpoint}/${edition}`;
}

// Fonction pour obtenir la traduction par défaut pour une langue
function getDefaultTranslation(lang) {
  return QURAN_CONFIG.translations[lang] || QURAN_CONFIG.translations['en'];
}

// Fonction pour obtenir les récitateurs disponibles pour une langue
function getRecitersForLanguage(lang) {
  return QURAN_CONFIG.reciters[lang] || QURAN_CONFIG.reciters['ar'];
}
