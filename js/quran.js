// ===== DEENTAG CORAN — APP.JS =====
// Application Coran indépendante avec API alquran.cloud

// ============================================================
// CONFIG — LANGUES ET I18N
// ============================================================

const LANGS = ['fr', 'en', 'es', 'de', 'it', 'nl', 'pt', 'tr'];

const i18n = {
  fr: {
    "juz": "Juz",
    "surah": "Sourate",
    "ayah": "Verset",
    "listen": "Écouter",
    "translation": "Traduction",
    "reciter": "Récitateur",
    "loading": "Chargement...",
    "error": "Erreur de chargement",
    "ayahs": "versets"
  },
  en: {
    "juz": "Juz",
    "surah": "Surah",
    "ayah": "Ayah",
    "listen": "Listen",
    "translation": "Translation",
    "reciter": "Reciter",
    "loading": "Loading...",
    "error": "Loading error",
    "ayahs": "ayahs"
  },
  es: {
    "juz": "Juz",
    "surah": "Surah",
    "ayah": "Verso",
    "listen": "Escuchar",
    "translation": "Traducción",
    "reciter": "Recitador",
    "loading": "Cargando...",
    "error": "Error de carga",
    "ayahs": "versos"
  },
  de: {
    "juz": "Juz",
    "surah": "Surah",
    "ayah": "Vers",
    "listen": "Anhören",
    "translation": "Übersetzung",
    "reciter": "Rezitator",
    "loading": "Wird geladen...",
    "error": "Ladefehler",
    "ayahs": "Verse"
  },
  it: {
    "juz": "Juz",
    "surah": "Surah",
    "ayah": "Versetto",
    "listen": "Ascolta",
    "translation": "Traduzione",
    "reciter": "Recitatore",
    "loading": "Caricamento...",
    "error": "Errore di caricamento",
    "ayahs": "versetti"
  },
  nl: {
    "juz": "Juz",
    "surah": "Surah",
    "ayah": "Vers",
    "listen": "Luisteren",
    "translation": "Vertaling",
    "reciter": "Voordracht",
    "loading": "Bezig met laden...",
    "error": "Laadingsfout",
    "ayahs": "verzen"
  },
  pt: {
    "juz": "Juz",
    "surah": "Surah",
    "ayah": "Versículo",
    "listen": "Ouvir",
    "translation": "Tradução",
    "reciter": "Recitador",
    "loading": "Carregando...",
    "error": "Erro de carregamento",
    "ayahs": "versículos"
  },
  tr: {
    "juz": "Cüz",
    "surah": "Sure",
    "ayah": "Ayet",
    "listen": "Dinle",
    "translation": "Çeviri",
    "reciter": "Kari",
    "loading": "Yükleniyor...",
    "error": "Yükleme hatası",
    "ayahs": "ayetler"
  }
};

// ============================================================
// ÉTAT GLOBAL
// ============================================================

let currentLang = 'fr';
let currentJuz = null;
let currentSurah = null;
let currentTranslation = null;
let currentReciter = null;
let allSurahs = [];
let audioState = { player: null, btn: null };

// ============================================================
// INITIALISATION
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  initApp();
});

async function initApp() {
  currentLang = getLang();
  applyLang(currentLang);
  
  // Charger les sourates
  await loadSurahs();
  
  // Rendre la grille des Juz
  renderJuzGrid();
  
  // Initialiser les sélecteurs
  initializeSelectors();
  
  // Vérifier les paramètres URL pour accès direct via NFC
  checkUrlParams();
}

// ============================================================
// LANGUE
// ============================================================

function getLang() {
  return localStorage.getItem('deentag_lang') || LANGS[0];
}

function applyLangBlocks(lang) {
  document.querySelectorAll('[data-lang-block]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-lang-block') === lang);
  });
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('deentag_lang', lang);
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = lang.toUpperCase() + ' ▾';
  document.querySelectorAll('.lang-option').forEach(o => {
    o.classList.toggle('active', o.dataset.lang === lang);
  });
  applyLangBlocks(lang);
}

function setLang(lang) {
  stopAudio();
  applyLang(lang);
  const m = document.getElementById('lang-menu');
  const btn = document.getElementById('lang-btn');
  if (m) m.classList.remove('open');
  if (btn) btn.classList.remove('open');
  
  // Re-rendre si une sourate est ouverte
  if (currentSurah) {
    renderSurah(currentSurah);
  }
}

function toggleLangMenu() {
  const m = document.getElementById('lang-menu');
  const btn = document.getElementById('lang-btn');
  if (m) m.classList.toggle('open');
  if (btn) btn.classList.toggle('open', m && m.classList.contains('open'));
}

document.addEventListener('click', e => {
  if (!e.target.closest('#lang-btn') && !e.target.closest('#lang-menu')) {
    const m = document.getElementById('lang-menu');
    const btn = document.getElementById('lang-btn');
    if (m) m.classList.remove('open');
    if (btn) btn.classList.remove('open');
  }
});

// ============================================================
// THÈME
// ============================================================

function toggleTheme() {
  const isDay = document.body.classList.contains('day');
  document.body.classList.toggle('day', !isDay);
  document.body.classList.toggle('night', isDay);
  localStorage.setItem('deentag_theme', isDay ? 'night' : 'day');
  updateThemeCircleBtn();
}

function updateThemeCircleBtn() {
  const isNight = document.body.classList.contains('night');
  document.querySelectorAll('#theme-circle-btn, .circle-btn[onclick="toggleTheme()"]').forEach(btn => {
    btn.innerHTML = isNight ? '🌙' : '☀️';
  });
}

// ============================================================
// AUDIO
// ============================================================

function stopAudio() {
  if (audioState.player) {
    audioState.player.pause();
    audioState.player.currentTime = 0;
    audioState.player = null;
  }
  if (audioState.btn) {
    audioState.btn.classList.remove('playing');
    audioState.btn = null;
  }
}

function playAudio(ayahNum, btn, audioUrl) {
  if (audioState.btn === btn && audioState.player) {
    stopAudio();
    return;
  }
  stopAudio();

  const player = new Audio(audioUrl);
  player.preload = 'auto';

  audioState.player = player;
  audioState.btn = btn;
  btn.classList.add('playing');
  btn.textContent = '⏹';

  player.play().catch(() => {
    stopAudio();
    btn.classList.add('audio-missing');
    btn.title = 'Audio non disponible';
    btn.textContent = '🔇';
  });
  
  player.onended = () => stopAudio();
  player.onerror = () => {
    stopAudio();
    btn.classList.add('audio-missing');
  };
}

window.addEventListener('beforeunload', stopAudio);
window.addEventListener('pagehide', stopAudio);

// ============================================================
// CHARGEMENT DES DONNÉES
// ============================================================

async function loadSurahs() {
  try {
    const response = await fetch(`${QURAN_CONFIG.apiBase}/surah`);
    const data = await response.json();
    allSurahs = data.data || [];
  } catch (error) {
    console.error('Erreur lors du chargement des sourates:', error);
  }
}

// ============================================================
// GRILLE DES JUZ
// ============================================================

function renderJuzGrid() {
  const container = document.getElementById('juzContainer');
  container.innerHTML = '';

  for (let i = 1; i <= 30; i++) {
    const juzInfo = getJuzInfo(i, currentLang);
    const card = document.createElement('div');
    card.className = 'cat-card';
    card.onclick = () => openJuz(i);
    
    card.innerHTML = `
      <div class="cat-icon-circle">
        <div class="cat-icon">${i}</div>
      </div>
      <div class="cat-label">
        <span class="lang-block" data-lang-block="fr">Juz ${i}</span>
        <span class="lang-block" data-lang-block="en">Juz ${i}</span>
        <span class="lang-block" data-lang-block="es">Juz ${i}</span>
        <span class="lang-block" data-lang-block="de">Juz ${i}</span>
        <span class="lang-block" data-lang-block="it">Juz ${i}</span>
        <span class="lang-block" data-lang-block="nl">Juz ${i}</span>
        <span class="lang-block" data-lang-block="pt">Juz ${i}</span>
        <span class="lang-block" data-lang-block="tr">Cüz ${i}</span>
      </div>
      <div class="cat-range">${juzInfo.start} - ${juzInfo.end}</div>
    `;
    
    container.appendChild(card);
  }

  applyLangBlocks(currentLang);
}

// ============================================================
// OUVERTURE D'UN JUZ
// ============================================================

function openJuz(juzNum) {
  currentJuz = juzNum;
  
  // Trouver les sourates du Juz
  const surahsInJuz = allSurahs.filter(s => {
    // Logique simple : les Juz sont distribués de manière à peu près égale
    // Juz 1 = Surah 1-2, Juz 2 = Surah 2-3, etc.
    // Pour une vraie implémentation, il faudrait les données exactes
    return true; // Simplification pour la démo
  });

  renderSheetItems();
  openSheet();
}

function renderSheetItems() {
  const list = document.getElementById('bsList');
  const title = document.getElementById('bsTitle');
  
  title.innerHTML = `
    <span class="lang-block" data-lang-block="fr">Juz ${currentJuz}</span>
    <span class="lang-block" data-lang-block="en">Juz ${currentJuz}</span>
    <span class="lang-block" data-lang-block="es">Juz ${currentJuz}</span>
    <span class="lang-block" data-lang-block="de">Juz ${currentJuz}</span>
    <span class="lang-block" data-lang-block="it">Juz ${currentJuz}</span>
    <span class="lang-block" data-lang-block="nl">Juz ${currentJuz}</span>
    <span class="lang-block" data-lang-block="pt">Juz ${currentJuz}</span>
    <span class="lang-block" data-lang-block="tr">Cüz ${currentJuz}</span>
  `;

  list.innerHTML = '';

  allSurahs.forEach(surah => {
    const card = document.createElement('div');
    card.className = 'cat-card';
    card.style.width = '100%';
    card.style.marginBottom = '8px';
    card.onclick = () => openSurah(surah.number);

    card.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px; background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 8px;">
        <div style="font-family: 'Amiri', serif; font-size: 18px; color: var(--arabic-color);">${surah.name}</div>
        <div style="flex: 1;">
          <div style="font-family: 'Cinzel', serif; font-size: 10px; color: var(--gold); letter-spacing: 0.1em; text-transform: uppercase;">${surah.englishName}</div>
          <div style="font-size: 11px; color: var(--text2);">${surah.numberOfAyahs} ${i18n[currentLang]['ayahs']}</div>
        </div>
      </div>
    `;

    list.appendChild(card);
  });

  applyLangBlocks(currentLang);
}

// ============================================================
// OUVERTURE D'UNE SOURATE
// ============================================================

function openSurah(surahNum) {
  currentSurah = surahNum;
  const surah = allSurahs.find(s => s.number === surahNum);
  
  if (!surah) return;

  // Initialiser les sélecteurs
  updateTranslationSelector();
  updateReciterSelector();

  // Charger et afficher la sourate
  renderSurah(surahNum);

  // Basculer vers la vue sourate
  document.getElementById('listView').style.display = 'none';
  document.getElementById('surahView').style.display = 'block';
}

function renderSurah(surahNum) {
  const surah = allSurahs.find(s => s.number === surahNum);
  if (!surah) return;

  document.getElementById('surahNumber').textContent = `Surah ${surahNum}`;
  document.getElementById('surahName').textContent = surah.name;

  // Charger les versets
  loadSurahAyahs(surahNum);
}

async function loadSurahAyahs(surahNum) {
  const scrollContainer = document.getElementById('surahScroll');
  scrollContainer.innerHTML = '<div class="loading"></div>';

  try {
    // Charger l'arabe
    const arabicRes = await fetch(`${QURAN_CONFIG.apiBase}/surah/${surahNum}/quran-uthmani`);
    const arabicData = await arabicRes.json();
    const arabicAyahs = arabicData.data?.ayahs || [];

    // Charger la traduction
    const translationId = currentTranslation || QURAN_CONFIG.translations[currentLang].identifier;
    const transRes = await fetch(`${QURAN_CONFIG.apiBase}/surah/${surahNum}/${translationId}`);
    const transData = await transRes.json();
    const transAyahs = transData.data?.ayahs || [];

    scrollContainer.innerHTML = '';

    // Afficher les versets
    arabicAyahs.forEach((ayah, index) => {
      const transAyah = transAyahs[index];
      const ayahBlock = document.createElement('div');
      ayahBlock.className = 'ayah-block';

      const ayahNum = ayah.numberInSurah;
      
      ayahBlock.innerHTML = `
        <span class="ayah-number">Verset ${ayahNum}</span>
        <div class="ayah-arabic">${ayah.text}</div>
        <div class="ayah-translation">${transAyah?.text || ''}</div>
        <button class="ayah-audio-btn" onclick="playAyahAudio(${surahNum}, ${ayahNum}, this)">🔊</button>
      `;

      scrollContainer.appendChild(ayahBlock);
    });

  } catch (error) {
    console.error('Erreur lors du chargement des versets:', error);
    scrollContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text2);">${i18n[currentLang]['error']}</div>`;
  }
}

function playAyahAudio(surahNum, ayahNum, btn) {
  if (!currentReciter) {
    alert('Veuillez sélectionner un récitateur');
    return;
  }

  // Construire l'URL de l'audio
  const audioUrl = `${QURAN_CONFIG.apiBase}/ayah/${surahNum}:${ayahNum}/${currentReciter}`;
  
  // L'API alquran.cloud retourne l'audio dans la réponse
  // Pour simplifier, on utilise une approche directe
  playAudio(ayahNum, btn, audioUrl);
}

// ============================================================
// SÉLECTEURS DE TRADUCTION ET RÉCITATEUR
// ============================================================

function initializeSelectors() {
  updateTranslationSelector();
  updateReciterSelector();
}

function updateTranslationSelector() {
  const select = document.getElementById('translationSelect');
  select.innerHTML = '';

  // Ajouter les traductions disponibles
  Object.entries(QURAN_CONFIG.translations).forEach(([lang, trans]) => {
    const option = document.createElement('option');
    option.value = trans.identifier;
    option.textContent = trans.name;
    if (lang === currentLang) option.selected = true;
    select.appendChild(option);
  });
}

function updateTranslation() {
  const select = document.getElementById('translationSelect');
  currentTranslation = select.value;
  
  if (currentSurah) {
    loadSurahAyahs(currentSurah);
  }
}

function updateReciterSelector() {
  const select = document.getElementById('reciterSelect');
  select.innerHTML = '';

  const reciters = QURAN_CONFIG.reciters['ar'] || [];
  reciters.forEach(reciter => {
    const option = document.createElement('option');
    option.value = reciter.identifier;
    option.textContent = reciter.name;
    select.appendChild(option);
  });

  if (reciters.length > 0) {
    currentReciter = reciters[0].identifier;
  }
}

function updateReciter() {
  const select = document.getElementById('reciterSelect');
  currentReciter = select.value;
}

// ============================================================
// BOTTOM SHEET
// ============================================================

function openSheet() {
  const overlay = document.getElementById('bsOverlay');
  const sheet = document.getElementById('bottomSheet');
  
  overlay.style.display = 'block';
  sheet.style.display = 'block';
  sheet.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSheet() {
  const overlay = document.getElementById('bsOverlay');
  const sheet = document.getElementById('bottomSheet');
  
  overlay.style.display = 'none';
  sheet.classList.remove('open');
  sheet.style.display = 'none';
  document.body.style.overflow = 'auto';
  
  stopAudio();
}

function backToList() {
  document.getElementById('surahView').style.display = 'none';
  document.getElementById('listView').style.display = 'block';
  currentSurah = null;
  stopAudio();
}

// ============================================================
// ACCÈS DIRECT VIA NFC (paramètres URL)
// ============================================================

function checkUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const juz = params.get('juz');
  const surah = params.get('surah');

  if (juz) {
    openJuz(parseInt(juz));
  } else if (surah) {
    openJuz(1); // Ouvrir le premier Juz par défaut
    setTimeout(() => openSurah(parseInt(surah)), 500);
  }
}
