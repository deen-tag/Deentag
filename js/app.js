// ===== DEENTAG — APP.JS =====
// Fichier unique — données dans duas.js uniquement
// ============================================================


// ============================================================
// CONFIG — AJOUTER UNE LANGUE ICI UNIQUEMENT
// ============================================================

const LANGS = ['fr', 'en', 'es', 'de', 'it', 'nl', 'pt', 'tr'];

const i18n = {
  fr: {
    "listen":"Écouter","tracks":"l'audio",
    "size-title":"Taille du texte",
    "size-fr":"Traduction","size-ph":"Phonétique","size-ar":"Arabe",
    "size-small":"Petit","size-medium":"Moyen","size-large":"Grand",
    "audio-mode":"Lecture audio","audio-auto":"Auto","audio-manual":"Manuel",
  },
  en: {
    "listen":"Listen","tracks":"to audio",
    "size-title":"Text size",
    "size-fr":"Translation","size-ph":"Phonetic","size-ar":"Arabic",
    "size-small":"Small","size-medium":"Medium","size-large":"Large",
    "audio-mode":"Audio playback","audio-auto":"Auto","audio-manual":"Manual",
  },
  es: {
    "listen":"Escuchar","tracks":"el audio",
    "size-title":"Tamaño del texto",
    "size-fr":"Traducción","size-ph":"Fonética","size-ar":"Árabe",
    "size-small":"Peq.","size-medium":"Med.","size-large":"Gran.",
    "audio-mode":"Reproducción","audio-auto":"Auto","audio-manual":"Manual",
  },
  de: {
    "listen":"Anhören","tracks":"Audio",
    "size-title":"Textgröße",
    "size-fr":"Übersetzung","size-ph":"Phonetik","size-ar":"Arabisch",
    "size-small":"Klein","size-medium":"Mittel","size-large":"Groß",
    "audio-mode":"Audiowiedergabe","audio-auto":"Auto","audio-manual":"Manuell",
  },
  it: {
    "listen":"Ascolta","tracks":"l'audio",
    "size-title":"Dimensione testo",
    "size-fr":"Traduzione","size-ph":"Fonetica","size-ar":"Arabo",
    "size-small":"Piccolo","size-medium":"Medio","size-large":"Grande",
    "audio-mode":"Riproduzione","audio-auto":"Auto","audio-manual":"Manuale",
  },
  nl: {
    "listen":"Luisteren","tracks":"audio",
    "size-title":"Tekstgrootte",
    "size-fr":"Vertaling","size-ph":"Fonetiek","size-ar":"Arabisch",
    "size-small":"Klein","size-medium":"Middel","size-large":"Groot",
    "audio-mode":"Audioweergave","audio-auto":"Auto","audio-manual":"Handmatig",
  },
  pt: {
    "listen":"Ouvir","tracks":"o áudio",
    "size-title":"Tamanho do texto",
    "size-fr":"Tradução","size-ph":"Fonética","size-ar":"Árabe",
    "size-small":"Peq.","size-medium":"Med.","size-large":"Grande",
    "audio-mode":"Reprodução","audio-auto":"Auto","audio-manual":"Manual",
  },
  tr: {
    "listen":"Dinle","tracks":"sesi",
    "size-title":"Yazı boyutu",
    "size-fr":"Çeviri","size-ph":"Fonetik","size-ar":"Arapça",
    "size-small":"Küçük","size-medium":"Orta","size-large":"Büyük",
    "audio-mode":"Ses oynatma","audio-auto":"Otomatik","audio-manual":"Manuel",
  },
};


// ============================================================
// ÉTAT GLOBAL
// ============================================================

var currentLang      = 'fr';
var currentCat       = null;
var currentAccId     = null;
var sheetTransitioning = false;


// ============================================================
// LANGUE
// ============================================================

function getLang() {
  return localStorage.getItem('deentag_lang') || LANGS[0];
}

function detectLang() {
  const l = (navigator.language || '').toLowerCase();
  return LANGS.find(code => l.startsWith(code)) || LANGS[0];
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
  document.querySelectorAll('[data-i18n-listen]').forEach(el => { el.textContent = i18n[lang]['listen'] || 'Écouter'; });
  document.querySelectorAll('[data-i18n-tracks]').forEach(el => { el.textContent = i18n[lang]['tracks'] || 'les pistes'; });
  document.querySelectorAll('[data-i18n-size-title]').forEach(el => { el.textContent = i18n[lang]['size-title'] || 'Taille du texte'; });
  document.querySelectorAll('[data-size-label]').forEach(el => {
    const key = el.getAttribute('data-size-label');
    if (i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  document.querySelectorAll('[data-i18n-pill]').forEach(el => {
    const key = el.getAttribute('data-i18n-pill');
    if (i18n[lang][key]) el.textContent = i18n[lang][key];
  });
}

function setLang(lang) {
  stopAudio();
  applyLang(lang);
  // Fermer menu et retirer classe open du bouton
  const m   = document.getElementById('lang-menu');
  const btn = document.getElementById('lang-btn');
  if (m)   m.classList.remove('open');
  if (btn) btn.classList.remove('open');
  // Re-rendre uniquement la vue active dans la langue choisie
  if (currentCat && currentAccId) {
    renderDua(currentCat, currentAccId);
  } else if (currentCat) {
    renderSheetItems(currentCat);
  }
}

function toggleLangMenu() {
  const m   = document.getElementById('lang-menu');
  const btn = document.getElementById('lang-btn');
  if (m) m.classList.toggle('open');
  if (btn) btn.classList.toggle('open', m && m.classList.contains('open'));
}

document.addEventListener('click', e => {
  if (!e.target.closest('#lang-btn') && !e.target.closest('#lang-menu')) {
    const m   = document.getElementById('lang-menu');
    const btn = document.getElementById('lang-btn');
    if (m)   m.classList.remove('open');
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
}




// ============================================================
// MODE ENFANTS
// ============================================================

function toggleKidsMode() {
  const isKids = document.body.classList.contains('kids');
  document.body.classList.toggle('kids', !isKids);
  localStorage.setItem('deentag_kids', isKids ? 'off' : 'on');
}


// ============================================================
// AUDIO
// ============================================================

let audioState = { player: null, btn: null, type: null, accId: null };

const SOLO_RING_CIRC = 169.65;

function stopAudio() {
  if (audioState.player) {
    audioState.player.pause();
    audioState.player.currentTime = 0;
    audioState.player = null;
  }
  if (audioState.btn) {
    audioState.btn.classList.remove('playing');
    const wrap = audioState.btn.closest('.audio-solo-wrap');
    const ring = wrap ? wrap.querySelector('.audio-solo-ring-prog') : null;
    if (ring) ring.style.strokeDashoffset = SOLO_RING_CIRC;
    audioState.btn = null;
  }
  clearAllHighlights();
  audioState.type  = null;
  audioState.accId = null;
}

function clearAllHighlights() {
  document.querySelectorAll('[data-tts-reading]').forEach(el => el.removeAttribute('data-tts-reading'));
  document.querySelectorAll('.audio-shimmer').forEach(el => el.classList.remove('audio-shimmer'));
}

function playAudio(accId, type, btn, audioFile) {
  if (audioState.btn === btn && audioState.player) { stopAudio(); return; }
  stopAudio();

  const lang   = getLang();
  const player = new Audio('Audio/' + audioFile);
  player.preload = 'auto';

  audioState.player = player;
  audioState.btn    = btn;
  audioState.type   = type;
  audioState.accId  = accId;
  btn.classList.add('playing');

  const wrap = btn.closest('.audio-solo-wrap');
  const ring = wrap ? wrap.querySelector('.audio-solo-ring-prog') : null;
  if (ring) ring.style.strokeDashoffset = SOLO_RING_CIRC;
  player.ontimeupdate = () => {
    if (ring && player.duration) {
      const ratio = Math.min(player.currentTime / player.duration, 1);
      ring.style.strokeDashoffset = SOLO_RING_CIRC - (SOLO_RING_CIRC * ratio);
    }
  };

  const arEl = document.getElementById(accId + '-ar');
  const phEl = document.getElementById(accId + '-ph');
  if (arEl) arEl.setAttribute('data-tts-reading', '1');
  if (phEl) phEl.setAttribute('data-tts-reading', '1');
  applyGlobalDim(accId, [arEl, phEl]);

  const svgMuted = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';

  player.play().catch(() => {
    stopAudio();
    btn.classList.add('audio-missing');
    btn.title   = 'Audio non disponible';
    btn.innerHTML = svgMuted;
  });
  player.onended = () => stopAudio();
  player.onerror = () => {
    stopAudio();
    btn.classList.add('audio-missing');
    btn.title   = 'Audio non disponible';
    btn.innerHTML = svgMuted;
  };
}

function applyGlobalDim(accId, litEls) {
  document.querySelectorAll('.translation-block, .phonetic-block, .arabic-block, .hadith-block, .accordion-title, .closing-dua').forEach(el => {
    if (!litEls.includes(el)) el.classList.add('audio-shimmer');
  });
}

function getAudioAutoPlay() {
  return localStorage.getItem('deentag_audio_autoplay') !== 'manual';
}

function setAudioAutoPlay(val) {
  localStorage.setItem('deentag_audio_autoplay', val ? 'auto' : 'manual');
  document.querySelectorAll('.audio-mode-pill').forEach(btn => {
    const isAuto = btn.getAttribute('data-audio-val') === 'auto';
    btn.classList.toggle('active', isAuto === val);
  });
}

window.addEventListener('beforeunload', stopAudio);
window.addEventListener('pagehide',     stopAudio);


// ============================================================
// TAILLES DE TEXTE
// ============================================================

const SIZE_LEVELS = {
  fr: { small: 14, medium: 18, large: 24 },
  ph: { small: 14, medium: 19, large: 26 },
  ar: { small: 22, medium: 28, large: 38 },
  sn: { small: 12, medium: 14, large: 18 },
};

function getCurrentSizeLevel(type) {
  return localStorage.getItem('deentag_size_level_' + type) || 'medium';
}

function applySizeLevel(type, level) {
  localStorage.setItem('deentag_size_level_' + type, level);
  const px = SIZE_LEVELS[type][level];
  if (type === 'fr') document.querySelectorAll('.translation-block').forEach(el => { el.style.fontSize = px + 'px'; });
  if (type === 'ph') document.querySelectorAll('.phonetic-block').forEach(el => { el.style.fontSize = px + 'px'; });
  if (type === 'ar') document.querySelectorAll('.arabic-block').forEach(el => { el.style.fontSize = px + 'px'; });
  if (type === 'sn') document.querySelectorAll('.sunnah-text').forEach(el => { el.style.fontSize = px + 'px'; });
  document.querySelectorAll('.size-pill[data-size-type="' + type + '"]').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-size-val') === level);
  });
}

function applyAllSizeLevels() {
  ['fr', 'ph', 'ar', 'sn'].forEach(type => applySizeLevel(type, getCurrentSizeLevel(type)));
}


// ============================================================
// PANNEAU RÉGLAGES
// ============================================================

const GEAR_ICON  = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l-.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
const SHARE_ICON = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>';
const STAR_ICON  = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';

// ============================================================
// MÉMORISATION D'UNE INVOCATION (lié au profil actif)
// ============================================================

function toggleDuaMemorized(cat, accId, btnEl) {
  if (!window.DT) return;
  const isNow = window.DT.toggleMemorized('dua', cat + '_' + accId);
  const btn = btnEl || document.getElementById('dua-mem-' + accId);
  if (btn) btn.classList.toggle('active', isNow);
}



function buildPillsHTML(types) {
  let html =
    '<button class="settings-panel-close" onclick="closeAllSettings()" title="Fermer">✕</button>' +
    '<div class="settings-panel-title" data-i18n-size-title>' + (i18n[currentLang]['size-title'] || 'Taille du texte') + '</div>';

  types.forEach(({ key, labelKey, fallback }) => {
    const curLevel = getCurrentSizeLevel(key);
    const lbl      = i18n[currentLang][labelKey] || fallback;
    html +=
      '<div class="size-row">' +
        '<span class="size-row-label" data-size-label="' + labelKey + '">' + lbl + '</span>' +
        '<div class="size-pills">' +
          '<button class="size-pill' + (curLevel === 'small'  ? ' active' : '') + '" data-size-type="' + key + '" data-size-val="small"  onclick="event.stopPropagation();applySizeLevel(\'' + key + '\',\'small\')"  data-i18n-pill="size-small">'  + (i18n[currentLang]['size-small']  || 'P')  + '</button>' +
          '<button class="size-pill' + (curLevel === 'medium' ? ' active' : '') + '" data-size-type="' + key + '" data-size-val="medium" onclick="event.stopPropagation();applySizeLevel(\'' + key + '\',\'medium\')" data-i18n-pill="size-medium">' + (i18n[currentLang]['size-medium'] || 'M') + '</button>' +
          '<button class="size-pill' + (curLevel === 'large'  ? ' active' : '') + '" data-size-type="' + key + '" data-size-val="large"  onclick="event.stopPropagation();applySizeLevel(\'' + key + '\',\'large\')"  data-i18n-pill="size-large">'  + (i18n[currentLang]['size-large']  || 'G')  + '</button>' +
        '</div>' +
      '</div>';
  });

  const isAuto     = getAudioAutoPlay();

  html +=
    '<div class="size-row" style="border-top:1px solid rgba(201,168,76,0.15);margin-top:6px;padding-top:6px">' +
      '<span class="size-row-label">' + (i18n[currentLang]['audio-mode'] || 'Audio') + '</span>' +
      '<div class="size-pills">' +
        '<button class="size-pill audio-mode-pill' + (isAuto  ? ' active' : '') + '" data-audio-val="auto"   onclick="event.stopPropagation();setAudioAutoPlay(true)">'  + (i18n[currentLang]['audio-auto']    || 'Auto')   + '</button>' +
        '<button class="size-pill audio-mode-pill' + (!isAuto ? ' active' : '') + '" data-audio-val="manual" onclick="event.stopPropagation();setAudioAutoPlay(false)">' + (i18n[currentLang]['audio-manual'] || 'Manuel') + '</button>' +
      '</div>' +
    '</div>';

  return html;
}

function buildSettingsPanel(accId) {
  const old = document.getElementById('settings-panel-' + accId);
  if (old) old.remove();

  const acc      = document.getElementById(accId);
  const hasSunnah = acc ? !!acc.querySelector('.sunnah-item') : false;
  const panel    = document.createElement('div');
  panel.className = 'settings-panel';
  panel.id        = 'settings-panel-' + accId;

  panel.innerHTML = !hasSunnah
    ? buildPillsHTML([
        { key: 'fr', labelKey: 'size-fr', fallback: 'Traduction' },
        { key: 'ph', labelKey: 'size-ph', fallback: 'Phonétique' },
        { key: 'ar', labelKey: 'size-ar', fallback: 'Arabe' },
      ])
    : buildPillsHTML([{ key: 'sn', labelKey: 'size-fr', fallback: 'Texte' }]);

  document.body.appendChild(panel);
  return panel;
}

let _settingsAutoCloseTimer = null;

function resetSettingsTimer(panel) {
  clearTimeout(_settingsAutoCloseTimer);
  _settingsAutoCloseTimer = setTimeout(() => {
    if (panel && panel.classList.contains('open')) closeAllSettings();
  }, 3000);
}

function toggleAccSettings(accId) {
  let panel   = document.getElementById('settings-panel-' + accId);
  const isOpen = panel && panel.classList.contains('open');
  closeAllSettings();
  if (!isOpen) {
    panel = buildSettingsPanel(accId);
    if (document.body.classList.contains('kids')) {
      const acc = document.getElementById(accId);
      if (acc) {
        const kidsColor = getComputedStyle(acc).getPropertyValue('--kids-color').trim();
        if (kidsColor) panel.style.setProperty('--kids-panel-color', kidsColor);
      }
    }
    panel.classList.add('open');
    resetSettingsTimer(panel);
    panel.addEventListener('touchstart', () => resetSettingsTimer(panel), { passive: true });
    panel.addEventListener('click',      () => resetSettingsTimer(panel));
  }
}

function closeAllSettings() {
  document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('open'));
}


// ============================================================
// PARTAGER / COPIER
// ============================================================

function shareAccordion(accId) {
  const lang    = getLang();
  const titleEl = document.querySelector('#' + accId + ' .accordion-title');
  const trEl    = document.getElementById(accId + '-tr');
  const phEl    = document.getElementById(accId + '-ph');
  const arEl    = document.getElementById(accId + '-ar');
  let text = '';
  if (titleEl) text += titleEl.textContent.trim() + '\n\n';
  if (arEl)    text += arEl.textContent.trim()    + '\n';
  if (phEl)    text += phEl.textContent.trim()    + '\n';
  if (trEl)    text += trEl.textContent.trim()    + '\n';
  text += '\n— Deentag\n🔗 https://deentag.vercel.app/shop.html';
  if (navigator.share) {
    navigator.share({ title: 'Deentag', text: text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

function copyAccordion(accId) {
  const titleEl = document.querySelector('#' + accId + ' .accordion-title');
  const trEl    = document.getElementById(accId + '-tr');
  const phEl    = document.getElementById(accId + '-ph');
  const arEl    = document.getElementById(accId + '-ar');
  let text = '';
  if (titleEl) text += titleEl.textContent.trim() + '\n\n';
  if (arEl)    text += arEl.textContent.trim()    + '\n';
  if (phEl)    text += phEl.textContent.trim()    + '\n';
  if (trEl)    text += trEl.textContent.trim()    + '\n';
  text += '\n— Deentag\n🔗 https://deentag.vercel.app/shop.html';
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('#' + accId + ' .dua-action-icon[onclick*="copyAccordion"]');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      setTimeout(() => { btn.innerHTML = orig; }, 1800);
    }
  }).catch(() => {});
}



// ============================================================
// MESSAGE DE BIENVENUE
// ============================================================

function showWelcomeIfNeeded() {
  if (localStorage.getItem('deentag_welcome_seen')) return;
  const lang = getLang();
  const msg = {
    fr: 'Tape sur une catégorie, puis choisis ton invocation.',
    en: 'Tap a category, then choose your supplication.',
    es: 'Toca una categoría y elige tu invocación.',
    de: 'Tippe auf eine Kategorie und wähle deine Bitte.',
    it: 'Tocca una categoria e scegli la tua invocazione.',
    nl: 'Tik op een categorie en kies je smeekgebed.',
    pt: 'Toca numa categoria e escolhe a tua invocação.',
    tr: 'Bir kategoriye dokun ve duanı seç.',
  };
  const bubble = document.createElement('div');
  bubble.id = 'welcome-bubble';
  bubble.innerHTML =
    '<span class="welcome-icon">☪</span>' +
    '<span class="welcome-text">' + (msg[lang] || msg['fr']) + '</span>' +
    '<button class="welcome-close" onclick="dismissWelcome()">✕</button>';
  document.body.appendChild(bubble);
  setTimeout(() => bubble.classList.add('show'), 100);
  setTimeout(() => dismissWelcome(), 6000);
}

function dismissWelcome() {
  const b = document.getElementById('welcome-bubble');
  if (b) { b.classList.remove('show'); setTimeout(() => b.remove(), 400); }
  localStorage.setItem('deentag_welcome_seen', '1');
}


// ============================================================
// RENDU — LISTE DES DUAS
// ============================================================

function getSheetItems(cat) {
  if (!window.DUAS || !DUAS[cat]) return [];
  const lang = getLang();
  return Object.keys(DUAS[cat])
    .filter(k => k !== 'meta')
    .map(accId => {
      const dua = DUAS[cat][accId];
      return {
        id:     accId,
        titre:  dua.titre ? (dua.titre[lang] || dua.titre[LANGS[0]]) : accId,
        sub:    dua.sheet  ? (dua.sheet['sub_' + lang] || dua.sheet['sub_' + LANGS[0]] || '') : '',
        sunnah: !!dua.sunnah
      };
    });
}

function renderSheetItems(cat) {
  const items = getSheetItems(cat);
  const list  = document.getElementById('bsList');
  if (!list) return;
  list.innerHTML  = '';
  list.className  = 'bs-grid';

  items.forEach((item, i) => {
    const el      = document.createElement('div');
    el.className  = 'sub-card' + (item.sunnah ? ' sunnah-card' : '');
    el.innerHTML  =
      '<div class="sub-card-title">' + item.titre + '</div>' +
      '<div class="sub-card-sub">'   + item.sub   + '</div>';
    el.addEventListener('click', () => openDua(cat, item.id));
    list.appendChild(el);
    setTimeout(() => el.classList.add('show'), 20 + i * 50);
  });
}


// ============================================================
// RENDU — DUA COMPLÈTE
// ============================================================

function renderDua(cat, accId) {
  const duaScroll = document.getElementById('duaScroll');
  if (!duaScroll) return;
  duaScroll.innerHTML = '';
  duaScroll.scrollTop = 0;

  const dua      = DUAS[cat][accId];
  const lang     = getLang();
  const isSunnah = !!dua.sunnah;

  const acc = document.createElement('div');
  acc.className = 'accordion open';
  acc.id        = accId;
  acc.setAttribute('data-dua-page', cat);

  if (isSunnah) {
    let sunHtml = '';
    (dua.items[lang] || dua.items[LANGS[0]] || []).forEach(item => {
      sunHtml += '<div class="sunnah-item"><div class="sunnah-title">' + item.titre + '</div><div class="sunnah-text">' + item.texte + '</div></div>';
    });

    acc.innerHTML =
      '<div class="accordion-header" style="cursor:default"><div class="accordion-title">' +
        (dua.titre[lang] || dua.titre[LANGS[0]] || '') +
      '</div></div>' +
      '<div class="accordion-body" style="max-height:none;overflow:visible"><div class="accordion-inner">' +
        sunHtml +
        '<div class="dua-action-bar">' +
          '<button class="dua-action-icon' + (window.DT && window.DT.isMemorized('dua', cat+'_'+accId) ? ' active' : '') + '" id="dua-mem-' + accId + '" data-label="Mémorisé" onclick="event.stopPropagation();toggleDuaMemorized(\'' + cat + '\',\'' + accId + '\',this)" title="Mémorisé">' +
            STAR_ICON +
          '</button>' +
          '<button class="dua-action-icon" data-label="Partager" onclick="event.stopPropagation();shareAccordion(\'' + accId + '\')" title="Partager">' +
            '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>' +
          '</button>' +
          '<button class="dua-action-icon" data-label="Réglages" onclick="event.stopPropagation();toggleAccSettings(\'' + accId + '\')" title="Réglages">' +
            GEAR_ICON +
          '</button>' +
        '</div>' +
      '</div></div>';

  } else {
    const ph = dua.phonetique || {};
    const tr = dua.traduction || {};
    const hd = dua.hadith    || {};
    const ar = dua.arabe     || '';
    const phTxt = (ph[lang] || '').replace(/\n/g, '<br>');
    const badgeLabels = { fr:'Authentique', en:'Authentic', es:'Auténtico', de:'Authentisch', it:'Autentico', nl:'Authentiek', pt:'Autêntico', tr:'Otantik' };
    const badgeLabel = badgeLabels[lang] || badgeLabels['fr'];
    const badge = '<div style="display:flex"><span class="authentic-badge"><span class="authentic-badge-check">✓</span>' + badgeLabel + '</span></div>';
    const hdHtml = hd[lang] ? '<div class="hadith-block">' + hd[lang] + badge + '</div>' : '';

    const audioFile = DUAS[cat][accId] ? (DUAS[cat][accId].audio || '') : '';
    const svgPlayIcon = '<svg class="play-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
    const svgStopIcon = '<svg class="stop-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>';
    const audioBtn  = audioFile
      ? '<div class="audio-solo-bar"><div class="audio-solo-wrap">' +
          '<svg class="audio-solo-ring" width="60" height="60" viewBox="0 0 60 60">' +
            '<circle class="audio-solo-ring-track" cx="30" cy="30" r="27"/>' +
            '<circle class="audio-solo-ring-prog" cx="30" cy="30" r="27" stroke-dasharray="169.65" stroke-dashoffset="169.65"/>' +
          '</svg>' +
          '<button class="audio-solo-btn" id="tts-ar-' + accId + '" data-accid="' + accId + '" data-audio="' + audioFile + '" onclick="playAudio(this.dataset.accid,&quot;ar&quot;,this,this.dataset.audio)">' + svgPlayIcon + svgStopIcon + '</button>' +
        '</div></div>'
      : '';

    const svgCopy  = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
    const svgShare = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';

    const isMemDua = window.DT && window.DT.isMemorized('dua', cat+'_'+accId);
    const actionBar =
      '<div class="dua-action-bar">' +
        '<button class="dua-action-icon' + (isMemDua ? ' active' : '') + '" id="dua-mem-' + accId + '" data-label="Mémorisé" onclick="event.stopPropagation();toggleDuaMemorized(\'' + cat + '\',\'' + accId + '\',this)" title="Mémorisé">' + STAR_ICON + '</button>' +
        '<button class="dua-action-icon" data-label="Copier"   onclick="event.stopPropagation();copyAccordion(\'' + accId + '\')"   title="Copier">'   + svgCopy   + '</button>' +
        '<button class="dua-action-icon" data-label="Réglages" onclick="event.stopPropagation();toggleAccSettings(\'' + accId + '\')" title="Réglages">' + GEAR_ICON  + '</button>' +
        '<button class="dua-action-icon" data-label="Partager" onclick="event.stopPropagation();shareAccordion(\'' + accId + '\')"   title="Partager">' + svgShare   + '</button>' +
      '</div>';

    acc.innerHTML =
      '<div class="accordion-header" style="cursor:default"><div class="accordion-title">' +
        (dua.titre[lang] || dua.titre[LANGS[0]] || '') +
      '</div></div>' +
      '<div class="accordion-body" style="max-height:none;overflow:visible"><div class="accordion-inner">' +
        '<div class="translation-block" id="' + accId + '-tr">' + (tr[lang] || '') + '</div>' +
        '<div class="phonetic-block"    id="' + accId + '-ph">' + phTxt + '</div>' +
        '<div class="arabic-block"      id="' + accId + '-ar">' + ar + '</div>' +
        audioBtn +
        hdHtml +
        actionBar +
      '</div></div>';
  }

  const ornament = document.createElement('div');
  ornament.className = 'ornament-row';
  ornament.innerHTML = '<div class="ornament-row-line"></div><span class="ornament-star">✦</span><div class="ornament-row-line"></div>';

  const closing = document.createElement('div');
  closing.className = 'closing-dua';
  const cd = DUAS[cat].meta.closingDua || {};
  closing.textContent = cd[lang] || cd[LANGS[0]] || '';

  duaScroll.appendChild(acc);
  duaScroll.appendChild(ornament);
  duaScroll.appendChild(closing);

  if (typeof applyAllSizeLevels === 'function') applyAllSizeLevels();
}


// ============================================================
// INJECTION CONTRÔLES ACCORDION
// ============================================================

function injectAccordionControls() {
  document.querySelectorAll('.accordion').forEach(acc => {
    const accId = acc.id;
    if (!accId) return;
    const inner = acc.querySelector('.accordion-inner');
    if (!inner) return;

    inner.querySelectorAll('.tts-bar, .acc-controls-bar, .acc-actions').forEach(b => b.remove());
    document.querySelectorAll('#settings-panel-' + accId).forEach(p => p.remove());
    const header = acc.querySelector('.accordion-header');
    if (header) header.querySelectorAll('.acc-actions').forEach(b => b.remove());

    const hasSunnah = !!inner.querySelector('.sunnah-item');
    const duaPage   = acc.getAttribute('data-dua-page') || '';
    let audioFile   = null;
    if (window.DUAS && duaPage && DUAS[duaPage] && DUAS[duaPage][accId] && DUAS[duaPage][accId].audio) {
      audioFile = DUAS[duaPage][accId].audio;
    }

    const panel = document.createElement('div');
    panel.className = 'settings-panel';
    panel.id        = 'settings-panel-' + accId;
    panel.innerHTML = !hasSunnah
      ? buildPillsHTML([
          { key: 'fr', labelKey: 'size-fr', fallback: 'Traduction' },
          { key: 'ph', labelKey: 'size-ph', fallback: 'Phonétique' },
          { key: 'ar', labelKey: 'size-ar', fallback: 'Arabe' },
        ])
      : buildPillsHTML([{ key: 'sn', labelKey: 'size-fr', fallback: 'Texte' }]);
    document.body.appendChild(panel);

    if (!hasSunnah && audioFile && getAudioAutoPlay()) {
      setTimeout(() => {
        const btn = document.getElementById('tts-ar-' + accId);
        if (btn) playAudio(accId, 'ar', btn, audioFile);
      }, 400);
    }
  });
}


// ============================================================
// NAVIGATION — BOTTOM SHEET
// ============================================================

function openSheet(cat) {
  if (!window.DUAS || !DUAS[cat]) return;
  currentCat   = cat;
  currentAccId = null;
  if (typeof stopAudio === 'function') stopAudio();
  document.querySelectorAll('.settings-panel').forEach(p => p.remove());

  const listView = document.getElementById('listView');
  const duaView  = document.getElementById('duaView');
  const sheet    = document.getElementById('bottomSheet');
  if (listView) listView.style.display = 'block';
  if (duaView)  duaView.style.display  = 'none';
  if (sheet) {
    sheet.style.height      = '';
    sheet.style.maxHeight   = '88vh';
    sheet.style.borderRadius = '24px 24px 0 0';
    sheet.style.overflowY   = 'auto';
  }

  const lang    = getLang();
  const meta    = DUAS[cat].meta;
  const bsIcon  = document.getElementById('bsIcon');
  const bsTitle = document.getElementById('bsTitle');
  if (bsIcon)  bsIcon.src       = meta.icon || '';
  if (bsTitle) bsTitle.textContent = meta.titre[lang] || meta.titre[LANGS[0]];

  renderSheetItems(cat);
  if (typeof applyLangBlocks === 'function') applyLangBlocks(lang);

  document.getElementById('bsOverlay').classList.add('active');
  sheet.classList.add('open');
  document.body.style.overscrollBehavior          = 'none';
  document.documentElement.style.overscrollBehavior = 'none';
  document.body.style.overflow  = 'hidden';
  document.body.style.position  = 'fixed';
  document.body.style.width     = '100%';
}

function closeSheet(fromSwipe) {
  if (typeof stopAudio === 'function') stopAudio();
  document.querySelectorAll('.settings-panel').forEach(p => p.remove());
  const sheet    = document.getElementById('bottomSheet');
  const listView = document.getElementById('listView');
  const duaView  = document.getElementById('duaView');

  const _resetBodyScroll = () => {
    document.body.style.overscrollBehavior          = '';
    document.documentElement.style.overscrollBehavior = '';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width    = '';
  };

  if (fromSwipe) {
    sheet.style.transition = 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    sheet.style.transform  = 'translateY(100%)';
    document.getElementById('bsOverlay').classList.remove('active');
    setTimeout(() => {
      sheet.classList.remove('open');
      sheet.style.transform = sheet.style.transition = '';
      sheet.style.height = sheet.style.maxHeight = sheet.style.borderRadius = sheet.style.overflowY = '';
      sheet.style.top    = sheet.style.position  = '';
      if (listView) { listView.style.opacity = ''; listView.style.transition = ''; }
      if (duaView)  { duaView.style.opacity  = ''; duaView.style.transition  = ''; }
      currentCat = currentAccId = null;
      sheetTransitioning = false;
      _resetBodyScroll();
    }, 260);
    return;
  }

  const activeView = currentAccId ? duaView : listView;
  if (activeView) {
    activeView.style.transition = 'opacity 0.15s ease';
    activeView.style.opacity    = '0';
  }

  setTimeout(() => {
    currentCat = currentAccId = null;
    document.getElementById('bsOverlay').classList.remove('active');
    if (sheet) {
      sheet.classList.remove('open');
      sheet.style.height = sheet.style.maxHeight = sheet.style.borderRadius = sheet.style.overflowY = '';
      sheet.style.top    = sheet.style.position  = '';
    }
    if (listView) { listView.style.opacity = ''; listView.style.transition = ''; }
    if (duaView)  { duaView.style.opacity  = ''; duaView.style.transition  = ''; }
    _resetBodyScroll();
    sheetTransitioning = false;
  }, 160);
}

function openDua(cat, accId) {
  if (!window.DUAS || !DUAS[cat] || !DUAS[cat][accId]) return;
  if (sheetTransitioning) return;
  sheetTransitioning = true;
  currentAccId = accId;
  if (typeof stopAudio === 'function') stopAudio();

  const sheet    = document.getElementById('bottomSheet');
  const listView = document.getElementById('listView');
  const duaView  = document.getElementById('duaView');

  listView.style.transition = 'opacity 0.15s ease';
  listView.style.opacity    = '0';

  setTimeout(() => {
    listView.style.display = 'none';
    listView.style.opacity = '';
    listView.style.transition = '';

    renderDua(cat, accId);
    duaView.style.display    = 'flex';
    duaView.style.opacity    = '0';
    duaView.style.transition = '';

    if (sheet) {
      sheet.style.transition    = 'none';
      sheet.style.transform     = 'translateY(100%)';
      sheet.style.height        = 'calc(100dvh - 16px)';
      sheet.style.maxHeight     = 'calc(100dvh - 16px)';
      sheet.style.borderRadius  = '20px 20px 0 0';
      sheet.style.overflowY     = 'hidden';
      sheet.style.top           = '16px';
      sheet.style.position      = 'fixed';
      sheet.style.willChange    = 'transform';
      requestAnimationFrame(() => {
        sheet.style.transition = 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        sheet.style.transform  = 'translateY(0)';
      });
    }

    const lang      = getLang();
    const catIcon = document.getElementById('duaCatIcon');
    if (catIcon) catIcon.src = DUAS[cat].meta.icon || '';

    setTimeout(() => {
      duaView.style.transition = 'opacity 0.2s ease';
      duaView.style.opacity    = '1';
      if (typeof injectAccordionControls === 'function') injectAccordionControls();
      setTimeout(() => {
        duaView.style.transition = '';
        sheetTransitioning = false;
      }, 200);
    }, 200);
  }, 150);
}

function backToList(fromSwipe) {
  if (sheetTransitioning) return;
  sheetTransitioning = true;
  if (typeof stopAudio === 'function') stopAudio();
  document.querySelectorAll('.settings-panel').forEach(p => p.remove());
  const listView = document.getElementById('listView');
  const duaView  = document.getElementById('duaView');
  const sheet    = document.getElementById('bottomSheet');

  if (fromSwipe) {
    duaView.style.opacity  = '0';
    sheet.style.transition = 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    sheet.style.transform  = 'translateY(100%)';
    setTimeout(() => {
      currentAccId = null;
      renderSheetItems(currentCat);
      listView.style.display    = 'block';
      listView.style.opacity    = '0';
      duaView.style.display     = 'none';
      duaView.style.opacity     = '';
      sheet.style.height        = '';
      sheet.style.maxHeight     = '88vh';
      sheet.style.borderRadius  = '24px 24px 0 0';
      sheet.style.overflowY     = 'auto';
      sheet.style.top           = '';
      sheet.style.position      = '';
      sheet.style.transform     = 'translateY(100%)';
      sheet.style.transition    = 'none';
      if (typeof applyLangBlocks === 'function') applyLangBlocks(getLang());
      requestAnimationFrame(() => {
        sheet.style.transition    = 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        sheet.style.transform     = 'translateY(0)';
        listView.style.transition = 'opacity 0.2s ease';
        listView.style.opacity    = '1';
        setTimeout(() => {
          sheet.style.transition    = '';
          listView.style.transition = '';
          sheetTransitioning = false;
        }, 360);
      });
    }, 260);
    return;
  }

  duaView.style.transition = 'opacity 0.15s ease';
  duaView.style.opacity    = '0';

  setTimeout(() => {
    currentAccId = null;
    duaView.style.display     = 'none';
    duaView.style.opacity     = '';
    duaView.style.transition  = '';

    renderSheetItems(currentCat);
    listView.style.display    = 'block';
    listView.style.opacity    = '0';
    listView.style.transition = '';

    if (sheet) {
      sheet.style.transition   = 'none';
      sheet.style.transform    = 'translateY(100%)';
      sheet.style.height       = '';
      sheet.style.maxHeight    = '88vh';
      sheet.style.borderRadius = '24px 24px 0 0';
      sheet.style.overflowY    = 'auto';
      sheet.style.top          = '';
      sheet.style.position     = '';
      sheet.style.willChange   = 'transform';
      requestAnimationFrame(() => {
        sheet.style.transition = 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        sheet.style.transform  = 'translateY(0)';
      });
    }

    if (typeof applyLangBlocks === 'function') applyLangBlocks(getLang());

    setTimeout(() => {
      listView.style.transition = 'opacity 0.2s ease';
      listView.style.opacity    = '1';
      setTimeout(() => {
        listView.style.transition = '';
        sheetTransitioning = false;
      }, 200);
    }, 200);
  }, 150);
}

function toggleDuaMenu() {
  if (!currentAccId) return;
  if (typeof toggleAccSettings === 'function') toggleAccSettings(currentAccId);
}


// ============================================================
// NFC — PARAMÈTRES URL
// ============================================================

function handleNfcParams() {
  const params = new URLSearchParams(window.location.search);
  const page   = params.get('page');
  const acc    = params.get('acc');
  if (page && window.DUAS && DUAS[page]) {
    setTimeout(() => {
      openSheet(page);
      if (acc && DUAS[page][acc]) setTimeout(() => openDua(page, acc), 120);
    }, 180);
  }
}


// ============================================================
// SWIPE BOTTOM SHEET
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  const sheet = document.getElementById('bottomSheet');
  if (!sheet) return;

  let startY         = 0;
  let swipeDY        = 0;
  let swipeActive    = false;
  let swipeBlocked   = false;

  sheet.addEventListener('touchstart', e => {
    if (sheetTransitioning) return;
    startY       = e.touches[0].clientY;
    swipeDY      = 0;
    swipeActive  = true;
    swipeBlocked = false;
    sheet.style.transition = 'none';
  }, { passive: true });

  sheet.addEventListener('touchmove', e => {
    if (!swipeActive || sheetTransitioning || swipeBlocked) return;
    const dy = e.touches[0].clientY - startY;
    if (Math.abs(dy) < 10) return;
    if (dy < 0) { swipeBlocked = true; return; }

    const scrollEl = currentAccId
      ? document.getElementById('duaScroll')
      : document.getElementById('bottomSheet');
    if (scrollEl && scrollEl.scrollTop > 5) { swipeBlocked = true; return; }

    swipeDY = dy;
    const drag    = dy > 100 ? 100 + (dy - 100) * 0.3 : dy;
    sheet.style.transform = 'translateY(' + drag + 'px)';

    const progress = Math.min(drag / 120, 1);
    if (currentAccId) {
      const dv = document.getElementById('duaView');
      if (dv) dv.style.opacity = String(1 - progress);
    } else {
      const lv = document.getElementById('listView');
      if (lv) lv.style.opacity = String(1 - progress);
    }

    const overlay = document.getElementById('bsOverlay');
    if (overlay) overlay.style.background = 'rgba(0,0,0,' + Math.max(0, 0.55 - drag / 300) + ')';
  }, { passive: true });

  sheet.addEventListener('touchend', () => {
    if (!swipeActive || sheetTransitioning) return;
    swipeActive = false;

    const dv      = document.getElementById('duaView');
    const lv      = document.getElementById('listView');
    const overlay = document.getElementById('bsOverlay');
    if (dv)      dv.style.opacity      = '';
    if (lv)      lv.style.opacity      = '';
    if (overlay) overlay.style.background = '';

    if (swipeDY > 180) {
      currentAccId ? backToList(true) : closeSheet(true);
    } else {
      sheet.style.transition = 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      sheet.style.transform  = 'translateY(0)';
      setTimeout(() => {
        sheet.style.transition = 'none';
        sheet.style.transform  = '';
      }, 360);
    }
  }, { passive: true });

  handleNfcParams();
});


// ============================================================
// INITIALISATION
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('deentag_theme') || 'day';
  document.body.classList.remove('day', 'night');
  document.body.classList.add(savedTheme);
  if (localStorage.getItem('deentag_kids') === 'on') document.body.classList.add('kids');

  const savedLang = localStorage.getItem('deentag_lang') || detectLang();
  applyLang(savedLang);

  showWelcomeIfNeeded();

  document.addEventListener('touchstart', e => {
    const openPanel = document.querySelector('.settings-panel.open');
    if (!openPanel) return;
    if (!openPanel.contains(e.target) && !e.target.closest('.dua-menu-btn')) {
      closeAllSettings();
    }
  }, { passive: true });

  applyAllSizeLevels();
  generateStars();
});

// ===== POUSSIÈRE DE LUMIÈRE (mode nuit) =====
function generateStars() {
  const container = document.getElementById('nightStars');
  if (!container) return;

  // Créer le canvas
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame = null;
  let isVisible = false;

  function resize() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }

  class DustParticle {
    constructor(init) {
      this.reset(init);
    }
    reset(init) {
      this.x = Math.random() * canvas.width;
      this.y = init ? Math.random() * canvas.height : (Math.random() < 0.5 ? -3 : canvas.height + 3);
      this.size = Math.random() * 1.2 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.22;
      this.speedY = (Math.random() - 0.5) * 0.16;
      this.opacity = 0;
      this.maxOpacity = Math.random() * 0.35 + 0.08;
      this.life = 0;
      this.maxLife = Math.random() * 500 + 300;
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.twinkleSpeed = Math.random() * 0.035 + 0.008;
      this.currentOpacity = 0;
    }
    update() {
      this.life++;
      this.x += this.speedX;
      this.y += this.speedY;
      this.twinklePhase += this.twinkleSpeed;
      const ratio = this.life / this.maxLife;
      let base;
      if (ratio < 0.15) base = (ratio / 0.15) * this.maxOpacity;
      else if (ratio > 0.75) base = ((1 - ratio) / 0.25) * this.maxOpacity;
      else base = this.maxOpacity;
      this.currentOpacity = base * (Math.sin(this.twinklePhase) * 0.3 + 0.7);
      if (this.life >= this.maxLife) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.currentOpacity);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = '#F8E8A0';
      ctx.shadowColor = '#C9A84C';
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    resize();
    particles = [];
    for (let i = 0; i < 70; i++) particles.push(new DustParticle(true));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    animFrame = requestAnimationFrame(animate);
  }

  function startDust() {
    if (isVisible) return;
    isVisible = true;
    initParticles();
    animate();
  }

  function stopDust() {
    if (!isVisible) return;
    isVisible = false;
    if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Observer le mode nuit
  const body = document.body;
  if (body.classList.contains('night')) startDust();

  const observer = new MutationObserver(() => {
    body.classList.contains('night') ? startDust() : stopDust();
  });
  observer.observe(body, { attributes: true, attributeFilter: ['class'] });

  window.addEventListener('resize', () => { if (isVisible) initParticles(); });
}

/* Désactiver clic droit */
document.addEventListener('contextmenu', e => { e.preventDefault(); return false; });
