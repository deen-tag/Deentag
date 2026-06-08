// ===== DEENTAG CORAN ENFANTS — APP.JS =====
// Application Coran mode enfant avec interface ludique

const LANGS_KIDS = ['fr', 'en', 'es', 'de', 'it', 'nl', 'pt', 'tr'];

const i18nKids = {
  fr: {
    "juz": "Cüz",
    "continue": "Continuer",
    "excellent": "Excellent!",
    "listened": "Tu as écouté un verset du Coran!"
  },
  en: {
    "juz": "Juz",
    "continue": "Continue",
    "excellent": "Excellent!",
    "listened": "You listened to a verse from the Quran!"
  },
  es: {
    "juz": "Juz",
    "continue": "Continuar",
    "excellent": "¡Excelente!",
    "listened": "¡Escuchaste un verso del Corán!"
  },
  de: {
    "juz": "Juz",
    "continue": "Weiter",
    "excellent": "Ausgezeichnet!",
    "listened": "Du hast einen Vers aus dem Quran gehört!"
  },
  it: {
    "juz": "Juz",
    "continue": "Continua",
    "excellent": "Eccellente!",
    "listened": "Hai ascoltato un versetto del Corano!"
  },
  nl: {
    "juz": "Juz",
    "continue": "Doorgaan",
    "excellent": "Uitstekend!",
    "listened": "Je hebt een vers uit de Quran gehoord!"
  },
  pt: {
    "juz": "Juz",
    "continue": "Continuar",
    "excellent": "Excelente!",
    "listened": "Você ouviu um versículo do Alcorão!"
  },
  tr: {
    "juz": "Cüz",
    "continue": "Devam Et",
    "excellent": "Harika!",
    "listened": "Kuran'dan bir ayet dinledin!"
  }
};

// État global
let currentLangKids = 'fr';
let currentJuzKids = null;
let allSurahsKids = [];
let audioStateKids = { player: null, btn: null };
let progressStars = 0;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  initKidsApp();
});

async function initKidsApp() {
  currentLangKids = getLangKids();
  applyLangKids(currentLangKids);
  
  // Charger les sourates
  await loadSurahsKids();
  
  // Rendre la grille des Juz
  renderJuzGridKids();
  
  // Vérifier les paramètres URL
  checkUrlParamsKids();
}

// ============================================================
// LANGUE
// ============================================================

function getLangKids() {
  return localStorage.getItem('deentag_lang') || LANGS_KIDS[0];
}

function applyLangKids(lang) {
  currentLangKids = lang;
  localStorage.setItem('deentag_lang', lang);
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = lang.toUpperCase() + ' ▾';
  document.querySelectorAll('.lang-option').forEach(o => {
    o.classList.toggle('active', o.dataset.lang === lang);
  });
  applyLangBlocksKids(lang);
}

function applyLangBlocksKids(lang) {
  document.querySelectorAll('[data-lang-block]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-lang-block') === lang);
  });
}

function setLang(lang) {
  stopAudioKids();
  applyLangKids(lang);
  const m = document.getElementById('lang-menu');
  const btn = document.getElementById('lang-btn');
  if (m) m.classList.remove('open');
  if (btn) btn.classList.remove('open');
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
// AUDIO
// ============================================================

function stopAudioKids() {
  if (audioStateKids.player) {
    audioStateKids.player.pause();
    audioStateKids.player.currentTime = 0;
    audioStateKids.player = null;
  }
  if (audioStateKids.btn) {
    audioStateKids.btn.classList.remove('playing');
    audioStateKids.btn = null;
  }
}

function playAudioKids(surahNum, ayahNum, btn) {
  if (audioStateKids.btn === btn && audioStateKids.player) {
    stopAudioKids();
    return;
  }
  stopAudioKids();

  // Utiliser le premier récitateur arabe par défaut
  const reciter = QURAN_CONFIG.reciters['ar'][0].identifier;
  const audioUrl = `${QURAN_CONFIG.apiBase}/ayah/${surahNum}:${ayahNum}/${reciter}`;

  const player = new Audio(audioUrl);
  player.preload = 'auto';

  audioStateKids.player = player;
  audioStateKids.btn = btn;
  btn.classList.add('playing');
  btn.textContent = '⏹';

  player.play().catch(() => {
    stopAudioKids();
    btn.classList.add('audio-missing');
    btn.textContent = '🔇';
  });

  player.onended = () => {
    stopAudioKids();
    progressStars++;
    renderProgress();
    launchConfetti();
    showBravoModal();
  };

  player.onerror = () => {
    stopAudioKids();
    btn.classList.add('audio-missing');
  };
}

window.addEventListener('beforeunload', stopAudioKids);
window.addEventListener('pagehide', stopAudioKids);

// ============================================================
// CHARGEMENT DES DONNÉES
// ============================================================

async function loadSurahsKids() {
  try {
    const response = await fetch(`${QURAN_CONFIG.apiBase}/surah`);
    const data = await response.json();
    allSurahsKids = data.data || [];
  } catch (error) {
    console.error('Erreur lors du chargement des sourates:', error);
  }
}

// ============================================================
// GRILLE DES JUZ
// ============================================================

function renderJuzGridKids() {
  const container = document.getElementById('juzGridKids');
  container.innerHTML = '';

  for (let i = 1; i <= 30; i++) {
    const card = document.createElement('div');
    card.className = 'kids-juz-card';
    card.onclick = () => openJuzKids(i);

    card.innerHTML = `
      <div class="kids-juz-number">${i}</div>
      <div class="kids-juz-label">
        <span class="lang-block" data-lang-block="fr">Juz ${i}</span>
        <span class="lang-block" data-lang-block="en">Juz ${i}</span>
        <span class="lang-block" data-lang-block="es">Juz ${i}</span>
        <span class="lang-block" data-lang-block="de">Juz ${i}</span>
        <span class="lang-block" data-lang-block="it">Juz ${i}</span>
        <span class="lang-block" data-lang-block="nl">Juz ${i}</span>
        <span class="lang-block" data-lang-block="pt">Juz ${i}</span>
        <span class="lang-block" data-lang-block="tr">Cüz ${i}</span>
      </div>
    `;

    container.appendChild(card);
  }

  applyLangBlocksKids(currentLangKids);
}

// ============================================================
// OUVERTURE D'UN JUZ
// ============================================================

function openJuzKids(juzNum) {
  currentJuzKids = juzNum;
  progressStars = 0;

  // Afficher la page catégorie
  document.getElementById('page-home').style.display = 'none';
  document.getElementById('page-cat').style.display = 'block';

  // Mettre à jour le titre
  document.getElementById('catTitle').innerHTML = `
    <span class="lang-block" data-lang-block="fr">Juz ${juzNum}</span>
    <span class="lang-block" data-lang-block="en">Juz ${juzNum}</span>
    <span class="lang-block" data-lang-block="es">Juz ${juzNum}</span>
    <span class="lang-block" data-lang-block="de">Juz ${juzNum}</span>
    <span class="lang-block" data-lang-block="it">Juz ${juzNum}</span>
    <span class="lang-block" data-lang-block="nl">Juz ${juzNum}</span>
    <span class="lang-block" data-lang-block="pt">Juz ${juzNum}</span>
    <span class="lang-block" data-lang-block="tr">Cüz ${juzNum}</span>
  `;

  // Charger les sourates du Juz
  loadJuzSurahsKids(juzNum);

  applyLangBlocksKids(currentLangKids);
}

function loadJuzSurahsKids(juzNum) {
  const content = document.getElementById('catContent');
  content.innerHTML = '';

  // Afficher les sourates (simplification : afficher les 5 premières sourates du Juz)
  const surahsToShow = allSurahsKids.slice(juzNum * 3 - 3, juzNum * 3 + 2);

  surahsToShow.forEach(surah => {
    const surahDiv = document.createElement('div');
    surahDiv.className = 'kids-ayah-card';

    surahDiv.innerHTML = `
      <div class="kids-ayah-number">Sourate ${surah.number}</div>
      <div class="kids-ayah-arabic">${surah.name}</div>
      <div class="kids-ayah-translation">${surah.englishName}</div>
      <button class="kids-ayah-audio-btn" onclick="playAudioKids(${surah.number}, 1, this)">🔊</button>
    `;

    content.appendChild(surahDiv);
  });

  renderProgress();
}

// ============================================================
// PROGRESSION
// ============================================================

function renderProgress() {
  const container = document.getElementById('progressStars');
  container.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const star = document.createElement('div');
    star.className = 'progress-star';
    star.textContent = i < progressStars ? '⭐' : '☆';
    if (i < progressStars) {
      star.classList.add('active');
    }
    container.appendChild(star);
  }
}

// ============================================================
// MODAL BRAVO ET CONFETTIS
// ============================================================

function showBravoModal() {
  const modal = document.getElementById('bravoModal');
  modal.style.display = 'flex';
}

function closeBravoModal() {
  const modal = document.getElementById('bravoModal');
  modal.style.display = 'none';
}

function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  const colors = ['#FF6B6B', '#6C63FF', '#FFD93D', '#6BCB77', '#4D96FF'];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.delay = Math.random() * 0.5 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3500);
  }
}

// ============================================================
// NAVIGATION
// ============================================================

function backToHome() {
  stopAudioKids();
  document.getElementById('page-cat').style.display = 'none';
  document.getElementById('page-home').style.display = 'block';
  currentJuzKids = null;
}

// ============================================================
// ACCÈS DIRECT VIA NFC
// ============================================================

function checkUrlParamsKids() {
  const params = new URLSearchParams(window.location.search);
  const juz = params.get('juz');
  const surah = params.get('surah');

  if (juz) {
    openJuzKids(parseInt(juz));
  } else if (surah) {
    openJuzKids(1);
    setTimeout(() => {
      // Ouvrir la sourate spécifique
      const surahNum = parseInt(surah);
      const buttons = document.querySelectorAll('.kids-ayah-audio-btn');
      if (buttons.length > 0) {
        buttons[0].click();
      }
    }, 500);
  }
}
