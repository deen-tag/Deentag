// ===== DEENTAG — SCRIPT PARTAGÉ v4 =====

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

  // Mettre à jour les labels des boutons audio
  document.querySelectorAll('[data-tts-label-tr]').forEach(el => {
    el.textContent = i18n[lang]['btn-tr'] || 'Traduction';
  });
  document.querySelectorAll('[data-tts-label-ar]').forEach(el => {
    el.textContent = i18n[lang]['btn-ar'] || 'Arabe';
  });

  // Mettre à jour les labels des sliders selon la langue
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
  stopTTS();
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
  const knob = document.getElementById('theme-knob');
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
    stopTTS();
  }
}

// ===== TTS =====
const langVoiceMap = { 'fr':'fr-FR', 'en':'en-US', 'es':'es-ES', 'ar':'ar-SA' };
let ttsState = { active: false, btn: null, type: null };

function stopTTS() {
  window.speechSynthesis.cancel();
  ttsState.active = false;
  if (ttsState.btn) {
    ttsState.btn.classList.remove('playing');
    const ic = ttsState.btn.querySelector('.tts-icon');
    if (ic) ic.textContent = ttsState.type === 'ar' ? '🕌' : '🔊';
    ttsState.btn = null;
    ttsState.type = null;
  }
  clearAllHighlights();
}

function clearAllHighlights() {
  document.querySelectorAll('[data-tts-reading]').forEach(el => el.removeAttribute('data-tts-reading'));
}

// Nettoyage diacritiques UNIQUEMENT pour le texte envoyé au TTS — le DOM reste intact
function cleanArabicForTTS(text) {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/\u0640/g, '')
    .replace(/[ۖۗۘۙۚۛۜ۞۩]/g, '')
    .trim();
}

// Découpe le texte en spans surlignables (une seule fois par élément)
function wrapWords(el) {
  if (el.hasAttribute('data-words-wrapped')) return;
  const text = el.textContent.trim();
  const words = text.split(/\s+/).filter(w => w.length > 0);
  el.innerHTML = words.map((w, i) =>
    '<span class="word-highlight" data-wi="' + i + '">' + w + '</span>'
  ).join(' ');
  el.setAttribute('data-words-wrapped', '1');
}

// Surlignage mot par mot via l'événement boundary natif (synchronisation réelle)
function speakElement(el, langCode, rawOverride, onEnd) {
  if (!el) { onEnd && onEnd(); return; }
  const rawText = (rawOverride !== undefined) ? rawOverride : el.textContent.trim();
  if (!rawText) { onEnd && onEnd(); return; }

  // Surligner le bloc entier pendant la lecture
  el.setAttribute('data-tts-reading', '1');

  const utt = new SpeechSynthesisUtterance(rawText);
  utt.lang = langCode;
  utt.rate = 0.85;

  utt.onend = () => {
    el.removeAttribute('data-tts-reading');
    onEnd && onEnd();
  };
  utt.onerror = () => { stopTTS(); };

  window.speechSynthesis.speak(utt);
}

// Bouton Traduction : lit uniquement la traduction
function toggleTTS_TR(accId) {
  const btn = document.getElementById('tts-tr-' + accId);
  if (!btn) return;
  const lang = localStorage.getItem('deentag_lang') || 'fr';
  if (ttsState.active && ttsState.btn === btn) { stopTTS(); return; }
  stopTTS();
  const trEl = document.getElementById(accId + '-tr-' + lang);
  if (!trEl || !trEl.textContent.trim()) return;
  ttsState.active = true; ttsState.btn = btn; ttsState.type = 'tr';
  btn.classList.add('playing');
  btn.querySelector('.tts-icon').textContent = '⏹';
  speakElement(trEl, langVoiceMap[lang] || 'fr-FR', undefined, () => stopTTS());
}

// Bouton Arabe : lit le texte arabe, diacritiques nettoyés POUR LE TTS SEULEMENT
function toggleTTS_AR(accId) {
  const btn = document.getElementById('tts-ar-' + accId);
  if (!btn) return;
  const lang = localStorage.getItem('deentag_lang') || 'fr';
  if (ttsState.active && ttsState.btn === btn) { stopTTS(); return; }
  stopTTS();
  const arEl = document.getElementById(accId + '-ar-' + lang);
  if (!arEl || !arEl.textContent.trim()) return;
  ttsState.active = true; ttsState.btn = btn; ttsState.type = 'ar';
  btn.classList.add('playing');
  btn.querySelector('.tts-icon').textContent = '⏹';
  // On passe le texte nettoyé en rawOverride — le DOM garde les diacritiques
  const cleaned = cleanArabicForTTS(arEl.textContent);
  speakElement(arEl, 'ar-SA', cleaned, () => stopTTS());
}

function toggleTTS(accId) { toggleTTS_TR(accId); }

window.addEventListener('beforeunload', stopTTS);
window.addEventListener('pagehide', stopTTS);

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
// Icône SVG partage natif (flèche vers le haut)
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

// ===== INJECTION CONTROLS =====
function injectAccordionControls() {
  const sizes = loadSizes();
  const lang = currentLang;

  document.querySelectorAll('.accordion').forEach(acc => {
    const accId = acc.id;
    if (!accId) return;
    const inner = acc.querySelector('.accordion-inner');
    if (!inner) return;
    inner.querySelectorAll('.tts-bar, .acc-controls-bar, .settings-panel').forEach(b => b.remove());
    const hasSunnah = !!inner.querySelector('.sunnah-item');

    // Barre de boutons
    const bar = document.createElement('div');
    bar.className = 'acc-controls-bar';

    if (!hasSunnah) {
      bar.innerHTML =
        '<button class="tts-btn tts-tr-btn" id="tts-tr-' + accId + '" onclick="toggleTTS_TR(\'' + accId + '\')">' +
          '<span class="tts-icon">🔊</span>' +
          '<span data-tts-label-tr>' + (i18n[lang]['btn-tr'] || 'Traduction') + '</span>' +
        '</button>' +
        '<button class="tts-btn tts-ar-btn" id="tts-ar-' + accId + '" onclick="toggleTTS_AR(\'' + accId + '\')">' +
          '<span class="tts-icon">🕌</span>' +
          '<span data-tts-label-ar>' + (i18n[lang]['btn-ar'] || 'Arabe') + '</span>' +
        '</button>';
    } else {
      bar.innerHTML =
        '<button class="tts-btn tts-tr-btn" id="tts-tr-' + accId + '" onclick="toggleTTS_TR(\'' + accId + '\')">' +
          '<span class="tts-icon">🔊</span>' +
          '<span data-tts-label-tr>' + (i18n[lang]['btn-tr'] || 'Écouter') + '</span>' +
        '</button>';
    }

    bar.innerHTML +=
      '<div class="acc-actions">' +
        '<button class="settings-btn" onclick="toggleSettings(\'' + accId + '\')" title="Réglages">⚙️</button>' +
        '<button class="share-btn" onclick="shareAccordion(\'' + accId + '\')" title="Partager">' + SHARE_ICON + '</button>' +
      '</div>';

    // Panel sliders
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
