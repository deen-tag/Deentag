// ===== DEENTAG — SCRIPT PARTAGÉ v5 =====

const i18n = {
  fr: {
    selection:"Sélection", back:"Retour",
    "cat-repas":"Repas","cat-reveil":"Réveil\nCouché","cat-tristesse":"Tristesse",
    "cat-toilettes":"Toilettes","cat-ablution":"Ablution","cat-maison":"Maison",
    "cat-enfants":"Enfants","cat-transport":"Transport",
    "cat-soon":"Bientôt", coming:"disponible",
    "btn-tr":"Traduction","btn-ar":"Arabe",
    "size-fr":"TR","size-ph":"PHON","size-ar":"AR",
  },
  en: {
    selection:"Selection", back:"Back",
    "cat-repas":"Meals","cat-reveil":"Wake\nSleep","cat-tristesse":"Sadness",
    "cat-toilettes":"Restroom","cat-ablution":"Ablution","cat-maison":"Home",
    "cat-enfants":"Children","cat-transport":"Transport",
    "cat-soon":"Coming", coming:"soon",
    "btn-tr":"Translation","btn-ar":"Arabic",
    "size-fr":"TR","size-ph":"TRANSLIT","size-ar":"AR",
  },
  es: {
    selection:"Selección", back:"Volver",
    "cat-repas":"Comidas","cat-reveil":"Despertar\nDormir","cat-tristesse":"Tristeza",
    "cat-toilettes":"Baño","cat-ablution":"Ablución","cat-maison":"Casa",
    "cat-enfants":"Niños","cat-transport":"Transporte",
    "cat-soon":"Pronto", coming:"disponible",
    "btn-tr":"Traducción","btn-ar":"Árabe",
    "size-fr":"TR","size-ph":"TRANSCR","size-ar":"AR",
  }
};

let currentLang = 'fr';

function detectLang() {
  const l = (navigator.language || 'fr').toLowerCase();
  if (l.startsWith('es')) return 'es';
  if (l.startsWith('en')) return 'en';
  return 'fr';
}

function applyLangBlocks(lang) {
  document.querySelectorAll('[data-lang-block]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-lang-block') === lang);
  });
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('deentag_lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      el.innerHTML = i18n[lang][key].replace(/\n/g, '<br>');
    }
  });
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = lang.toUpperCase() + ' ▾';
  document.querySelectorAll('.lang-option').forEach(o => {
    o.classList.toggle('active', o.dataset.lang === lang);
  });
  applyLangBlocks(lang);
  document.querySelectorAll('[data-tts-label-tr]').forEach(el => {
    el.textContent = i18n[lang]['btn-tr'] || 'Traduction';
  });
  document.querySelectorAll('[data-tts-label-ar]').forEach(el => {
    el.textContent = i18n[lang]['btn-ar'] || 'Arabe';
  });
  document.querySelectorAll('.slider-label[data-size-type="fr"]').forEach(el => {
    el.textContent = i18n[lang]['size-fr'] || 'FR';
  });
  document.querySelectorAll('.slider-label[data-size-type="ph"]').forEach(el => {
    el.textContent = i18n[lang]['size-ph'] || 'PH';
  });
  document.querySelectorAll('.slider-label[data-size-type="ar"]').forEach(el => {
    el.textContent = i18n[lang]['size-ar'] || 'AR';
  });
}

function setLang(lang) {
  stopAudio();
  applyLang(lang);
  toggleLangMenu();
}

function toggleLangMenu() {
  const m = document.getElementById('lang-menu');
  if (m) m.classList.toggle('open');
}

document.addEventListener('click', e => {
  if (!e.target.closest('#lang-btn') && !e.target.closest('#lang-menu')) {
    const m = document.getElementById('lang-menu');
    if (m) m.classList.remove('open');
  }
  if (!e.target.closest('.settings-panel') && !e.target.closest('.settings-btn')) {
    document.querySelectorAll('.settings-panel.open').forEach(p => p.classList.remove('open'));
  }
});

// ===== THÈME =====
function toggleTheme() {
  const isDay = document.body.classList.contains('day');
  document.body.classList.toggle('day', !isDay);
  document.body.classList.toggle('night', isDay);
  localStorage.setItem('deentag_theme', isDay ? 'night' : 'day');
}

// ===== ACCORDÉON =====
function toggleAccordion(id) {
  const clicked = document.getElementById(id);
  const isOpen = clicked.classList.contains('open');
  document.querySelectorAll('.accordion').forEach(a => a.classList.remove('open'));
  if (!isOpen) {
    clicked.classList.add('open');
    setTimeout(() => clicked.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  } else {
    stopAudio();
  }
}

// ===== AUDIO MP3 =====
let audioState = { player: null, btn: null, type: null, accId: null };

function stopAudio() {
  if (audioState.player) {
    audioState.player.pause();
    audioState.player.currentTime = 0;
    audioState.player = null;
  }
  if (audioState.btn) {
    audioState.btn.classList.remove('playing');
    const ic = audioState.btn.querySelector('.tts-icon');
    if (ic) ic.textContent = audioState.type === 'ar' ? '🕌' : '🔊';
    audioState.btn = null;
  }
  clearAllHighlights();
  audioState.type = null;
  audioState.accId = null;
}

function clearAllHighlights() {
  document.querySelectorAll('[data-tts-reading]').forEach(el => el.removeAttribute('data-tts-reading'));
  document.querySelectorAll('.audio-shimmer').forEach(el => el.classList.remove('audio-shimmer'));
}

function playAudio(accId, type, btn, audioFile) {
  // Si déjà en lecture → stop
  if (audioState.btn === btn && audioState.player) {
    stopAudio();
    return;
  }
  stopAudio();

  const lang = localStorage.getItem('deentag_lang') || 'fr';
  const player = new Audio('Audio/' + audioFile);

  audioState.player = player;
  audioState.btn = btn;
  audioState.type = type;
  audioState.accId = accId;

  btn.classList.add('playing');
  const ic = btn.querySelector('.tts-icon');
  if (ic) ic.textContent = '⏹';

  // Surligné le bloc actif
  const activeEl = type === 'ar'
    ? document.getElementById(accId + '-ar-' + lang)
    : document.getElementById(accId + '-tr-' + lang);
  if (activeEl) activeEl.setAttribute('data-tts-reading', '1');

  // Effet fondu rapide sur les autres textes (une seule fois)
  const phEl = document.getElementById(accId + '-ph-' + lang);
  const otherEls = [];
  if (type === 'ar') {
    const trEl = document.getElementById(accId + '-tr-' + lang);
    if (trEl) otherEls.push(trEl);
    if (phEl) otherEls.push(phEl);
  } else {
    const arEl = document.getElementById(accId + '-ar-' + lang);
    if (arEl) otherEls.push(arEl);
    if (phEl) otherEls.push(phEl);
  }
  otherEls.forEach(el => {
    el.classList.add('audio-shimmer');
  });

  player.play().catch(() => stopAudio());
  player.onended = () => stopAudio();
  player.onerror = () => stopAudio();
}

// Compatibilité ancienne fonction TTS (au cas où)
function stopTTS() { stopAudio(); }
function toggleTTS(accId) {}

window.addEventListener('beforeunload', stopAudio);
window.addEventListener('pagehide', stopAudio);

// ===== TAILLES =====
const SIZE_DEFAULTS = { fr: 17, ph: 14, ar: 24, sn: 13 };
const SIZE_MIN = { fr: 11, ph: 10, ar: 14, sn: 10 };
const SIZE_MAX = { fr: 28, ph: 24, ar: 36, sn: 22 };

function loadSizes() {
  return {
    fr: parseInt(localStorage.getItem('deentag_size_fr')) || SIZE_DEFAULTS.fr,
    ph: parseInt(localStorage.getItem('deentag_size_ph')) || SIZE_DEFAULTS.ph,
    ar: parseInt(localStorage.getItem('deentag_size_ar')) || SIZE_DEFAULTS.ar,
    sn: parseInt(localStorage.getItem('deentag_size_sn')) || SIZE_DEFAULTS.sn,
  };
}

function applySizes(sizes) {
  document.querySelectorAll('.translation-block').forEach(el => { el.style.fontSize = sizes.fr + 'px'; });
  document.querySelectorAll('.phonetic-block').forEach(el => { el.style.fontSize = sizes.ph + 'px'; });
  document.querySelectorAll('.arabic-block').forEach(el => { el.style.fontSize = sizes.ar + 'px'; });
  document.querySelectorAll('.sunnah-text').forEach(el => { el.style.fontSize = sizes.sn + 'px'; });
}

function saveAndApplySize(type, val) {
  val = parseInt(val);
  localStorage.setItem('deentag_size_' + type, val);
  applySizes(loadSizes());
  document.querySelectorAll('.size-slider[data-size-type="' + type + '"]').forEach(s => { s.value = val; });
  document.querySelectorAll('.size-val[data-size-type="' + type + '"]').forEach(s => { s.textContent = val; });
}

function toggleSettings(accId) {
  const panel = document.getElementById('settings-panel-' + accId);
  if (!panel) return;
  document.querySelectorAll('.settings-panel.open').forEach(p => { if (p !== panel) p.classList.remove('open'); });
  panel.classList.toggle('open');
}

// ===== PARTAGER =====
const SHARE_ICON = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>';

function shareAccordion(accId) {
  const lang = localStorage.getItem('deentag_lang') || 'fr';
  const titleEl = document.querySelector('#' + accId + ' .accordion-title .lang-block[data-lang-block="' + lang + '"]');
  const trEl = document.getElementById(accId + '-tr-' + lang);
  const phEl = document.getElementById(accId + '-ph-' + lang);
  const arEl = document.getElementById(accId + '-ar-' + lang);
  let text = '';
  if (titleEl) text += titleEl.textContent.trim() + '\n\n';
  if (arEl) text += arEl.textContent.trim() + '\n';
  if (phEl) text += phEl.textContent.trim() + '\n';
  if (trEl) text += trEl.textContent.trim() + '\n';
  text += '\n— Deentag';
  if (navigator.share) {
    navigator.share({ title: 'Deentag', text: text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.querySelector('#' + accId + ' .share-btn');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '✓';
        btn.style.color = '#4caf50';
        setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 1800);
      }
    }).catch(() => {});
  }
}

// ===== MAP AUDIO PAR PAGE =====
// Format: { accId: { tr: 'fichier.mp3', ar: 'fichier.mp3' } }
// Détecté automatiquement selon data-page sur le body ou le titre de la page
function getAudioMap() {
  const page = document.body.getAttribute('data-page') || '';
  const maps = {
    ablution: {
      acc1: { tr: 'ablution1.mp3', ar: 'ablution1.mp3' },
      acc2: { tr: 'ablution2.mp3', ar: 'ablution2.mp3' },
      acc3: { tr: 'ablution3.mp3', ar: 'ablution3.mp3' },
    },
    repas: {
      acc1: { tr: 'repas1.mp3', ar: 'repas1.mp3' },
      acc2: { tr: 'repas2.mp3', ar: 'repas2.mp3' },
      acc3: { tr: 'repas3.mp3', ar: 'repas3.mp3' },
    },
    reveil: {
      acc1: { tr: 'réveiller1.mp3', ar: 'réveiller1.mp3' },
      acc2: { tr: 'réveiller2.mp3', ar: 'réveiller2.mp3' },
      acc3: { tr: 'réveiller3.mp3', ar: 'réveiller3.mp3' },
    },
    toilettes: {
      acc1: { tr: 'toilettes1.mp3', ar: 'toilettes1.mp3' },
      acc2: { tr: 'toilettes2.mp3', ar: 'toilettes2.mp3' },
    },
    tristesse: {
      acc1: { tr: 'tristesse1.mp3', ar: 'tristesse1.mp3' },
      acc2: { tr: 'tristesse2.mp3', ar: 'tristesse2.mp3' },
    },
  };
  return maps[page] || {};
}

// ===== INJECTION CONTROLS =====
function injectAccordionControls() {
  const sizes = loadSizes();
  const lang = currentLang;
  const audioMap = getAudioMap();

  document.querySelectorAll('.accordion').forEach(acc => {
    const accId = acc.id;
    if (!accId) return;
    const inner = acc.querySelector('.accordion-inner');
    if (!inner) return;
    inner.querySelectorAll('.tts-bar, .acc-controls-bar, .settings-panel').forEach(b => b.remove());
    const hasSunnah = !!inner.querySelector('.sunnah-item');
    const hasAudio = !hasSunnah && audioMap[accId];

    const bar = document.createElement('div');
    bar.className = 'acc-controls-bar';

    if (hasAudio) {
      const audioTR = audioMap[accId].tr;
      const audioAR = audioMap[accId].ar;
      bar.innerHTML =
        '<button class="tts-btn tts-tr-btn" id="tts-tr-' + accId + '" onclick="playAudio(\'' + accId + '\', \'tr\', this, \'' + audioTR + '\')">' +
          '<span class="tts-icon">🔊</span>' +
          '<span data-tts-label-tr>' + (i18n[lang]['btn-tr'] || 'Traduction') + '</span>' +
        '</button>' +
        '<button class="tts-btn tts-ar-btn" id="tts-ar-' + accId + '" onclick="playAudio(\'' + accId + '\', \'ar\', this, \'' + audioAR + '\')">' +
          '<span class="tts-icon">🕌</span>' +
          '<span data-tts-label-ar>' + (i18n[lang]['btn-ar'] || 'Arabe') + '</span>' +
        '</button>';
    }
    // Sunnahs et pages sans audio : aucun bouton audio

    bar.innerHTML +=
      '<div class="acc-actions">' +
        '<button class="settings-btn" onclick="toggleSettings(\'' + accId + '\')" title="Réglages">⚙️</button>' +
        '<button class="share-btn" onclick="shareAccordion(\'' + accId + '\')" title="Partager">' + SHARE_ICON + '</button>' +
      '</div>';

    let slidersHTML = '';
    if (!hasSunnah) {
      slidersHTML =
        '<div class="slider-row">' +
          '<span class="slider-label" data-size-type="fr">' + (i18n[lang]['size-fr'] || 'FR') + '</span>' +
          '<input type="range" class="size-slider" data-size-type="fr" min="' + SIZE_MIN.fr + '" max="' + SIZE_MAX.fr + '" value="' + sizes.fr + '" oninput="saveAndApplySize(\'fr\', this.value)">' +
          '<span class="size-val" data-size-type="fr">' + sizes.fr + '</span>' +
        '</div>' +
        '<div class="slider-row">' +
          '<span class="slider-label" data-size-type="ph">' + (i18n[lang]['size-ph'] || 'PH') + '</span>' +
          '<input type="range" class="size-slider" data-size-type="ph" min="' + SIZE_MIN.ph + '" max="' + SIZE_MAX.ph + '" value="' + sizes.ph + '" oninput="saveAndApplySize(\'ph\', this.value)">' +
          '<span class="size-val" data-size-type="ph">' + sizes.ph + '</span>' +
        '</div>' +
        '<div class="slider-row">' +
          '<span class="slider-label" data-size-type="ar">' + (i18n[lang]['size-ar'] || 'AR') + '</span>' +
          '<input type="range" class="size-slider" data-size-type="ar" min="' + SIZE_MIN.ar + '" max="' + SIZE_MAX.ar + '" value="' + sizes.ar + '" oninput="saveAndApplySize(\'ar\', this.value)">' +
          '<span class="size-val" data-size-type="ar">' + sizes.ar + '</span>' +
        '</div>';
    } else {
      slidersHTML =
        '<div class="slider-row">' +
          '<span class="slider-label" data-size-type="sn">Taille</span>' +
          '<input type="range" class="size-slider" data-size-type="sn" min="' + SIZE_MIN.fr + '" max="' + SIZE_MAX.fr + '" value="' + sizes.sn + '" oninput="saveAndApplySize(\'sn\', this.value)">' +
          '<span class="size-val" data-size-type="sn">' + sizes.sn + '</span>' +
        '</div>';
    }

    const panel = document.createElement('div');
    panel.className = 'settings-panel';
    panel.id = 'settings-panel-' + accId;
    panel.innerHTML = slidersHTML;

    inner.appendChild(bar);
    inner.appendChild(panel);
  });
}

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('deentag_theme') || 'day';
  document.body.classList.add(savedTheme);
  const knob = document.getElementById('theme-knob');
  if (knob) knob.textContent = '';
  const savedLang = localStorage.getItem('deentag_lang') || detectLang();
  applyLang(savedLang);
  injectAccordionControls();
  applySizes(loadSizes());
  const content = document.querySelector('.inv-content, .page-content');
  if (content) content.classList.add('fade-in');
});
