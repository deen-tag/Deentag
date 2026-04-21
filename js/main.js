// ===== DEENTAG — SCRIPT PARTAGÉ v7 =====

const i18n = {
  fr: {
    selection:"Sélection", back:"Retour",
    "cat-repas":"Repas","cat-reveil":"Réveil\nCouché","cat-tristesse":"Tristesse",
    "cat-toilettes":"Toilettes","cat-ablution":"Ablution","cat-maison":"Maison",
    "cat-enfants":"Enfants","cat-transport":"Transport",
    "btn-tr":"Traduction","btn-ar":"En arabe",
    "listen":"Écouter","tracks":"l'audio",
    "size-title":"Taille du texte",
    "size-fr":"Traduction","size-ph":"Phonétique","size-ar":"Arabe",
    "size-small":"Petit","size-medium":"Moyen","size-large":"Grand",
    "autoplay":"Lecture auto","close":"Fermer",
  },
  en: {
    selection:"Selection", back:"Back",
    "cat-repas":"Meals","cat-reveil":"Wake\nSleep","cat-tristesse":"Sadness",
    "cat-toilettes":"Restroom","cat-ablution":"Ablution","cat-maison":"Home",
    "cat-enfants":"Children","cat-transport":"Transport",
    "btn-tr":"Translation","btn-ar":"In Arabic",
    "listen":"Listen","tracks":"to audio",
    "size-title":"Text size",
    "size-fr":"Translation","size-ph":"Phonetic","size-ar":"Arabic",
    "size-small":"Small","size-medium":"Medium","size-large":"Large",
    "autoplay":"Auto-play","close":"Close",
  },
  es: {
    selection:"Selección", back:"Volver",
    "cat-repas":"Comidas","cat-reveil":"Despertar\nDormir","cat-tristesse":"Tristeza",
    "cat-toilettes":"Baño","cat-ablution":"Ablución","cat-maison":"Casa",
    "cat-enfants":"Niños","cat-transport":"Transporte",
    "btn-tr":"Traducción","btn-ar":"En árabe",
    "listen":"Escuchar","tracks":"el audio",
    "size-title":"Tamaño del texto",
    "size-fr":"Traducción","size-ph":"Fonética","size-ar":"Árabe",
    "size-small":"Peq.","size-medium":"Med.","size-large":"Gran.",
    "autoplay":"Auto-reproducir","close":"Cerrar",
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
  // Mettre à jour le label autoplay dans le settings
  document.querySelectorAll('[data-i18n-autoplay]').forEach(el => {
    el.textContent = i18n[lang]['autoplay'] || 'Lecture auto';
  });
}

function setLang(lang) {
  closeInvOverlay();
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
});

// ===== THÈME =====
function toggleTheme() {
  const isDay = document.body.classList.contains('day');
  document.body.classList.toggle('day', !isDay);
  document.body.classList.toggle('night', isDay);
  localStorage.setItem('deentag_theme', isDay ? 'night' : 'day');
}

// ===== AUDIO MP3 =====
let audioState = { player: null, btn: null, type: null, accId: null };

function stopAudio() {
  if (audioState.player) {
    audioState.player.pause();
    audioState.player.currentTime = 0;
    audioState.player = null;
  }
  window.speechSynthesis && window.speechSynthesis.cancel();
  if (audioState.btn) {
    audioState.btn.classList.remove('playing');
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
  if (audioState.btn === btn && audioState.player) {
    stopAudio();
    return;
  }
  stopAudio();

  const lang = localStorage.getItem('deentag_lang') || 'fr';

  if (type === 'tr') {
    const trEl = document.getElementById(accId + '-tr-' + lang);
    if (!trEl || !trEl.textContent.trim()) return;
    const langVoiceMap = { fr:'fr-FR', en:'en-US', es:'es-ES' };
    const utt = new SpeechSynthesisUtterance(trEl.textContent.trim());
    const targetLang = langVoiceMap[lang] || 'fr-FR';
    utt.lang = targetLang;
    utt.rate = 0.88;
    const allVoices = window.speechSynthesis.getVoices();
    const maleKeywords = ['male','man','homme','hombre','david','jorge','carlos','thomas','nicolas','albert','pierre'];
    const langVoices = allVoices.filter(v => v.lang.startsWith(targetLang.split('-')[0]));
    const maleVoice = langVoices.find(v => maleKeywords.some(k => v.name.toLowerCase().includes(k))) || langVoices[0];
    if (maleVoice) utt.voice = maleVoice;
    audioState.btn = btn;
    audioState.type = 'tr';
    audioState.accId = accId;
    audioState.player = null;
    if (btn) btn.classList.add('playing');
    trEl.setAttribute('data-tts-reading', '1');
    applyGlobalDim(accId, [trEl]);
    utt.onend = () => stopAudio();
    utt.onerror = () => stopAudio();
    window.speechSynthesis.speak(utt);
    return;
  }

  const player = new Audio('Audio/' + audioFile);
  audioState.player = player;
  audioState.btn = btn;
  audioState.type = type;
  audioState.accId = accId;

  if (btn) btn.classList.add('playing');

  const arEl = document.getElementById(accId + '-ar-' + lang);
  const phEl = document.getElementById(accId + '-ph-' + lang);
  if (arEl) arEl.setAttribute('data-tts-reading', '1');
  if (phEl) phEl.setAttribute('data-tts-reading', '1');

  applyGlobalDim(accId, [arEl, phEl]);

  player.play().catch(() => stopAudio());
  player.onended = () => stopAudio();
  player.onerror = () => stopAudio();
}

function applyGlobalDim(accId, litEls) {
  document.querySelectorAll('.translation-block, .phonetic-block, .arabic-block, .hadith-block, .sunnah-text, .closing-dua').forEach(el => {
    if (!litEls.includes(el)) el.classList.add('audio-shimmer');
  });
}

window.addEventListener('beforeunload', stopAudio);
window.addEventListener('pagehide', stopAudio);

// ===== TAILLES =====
const SIZE_LEVELS = {
  fr:  { small: 14, medium: 18, large: 24 },
  ph:  { small: 14, medium: 19, large: 26 },
  ar:  { small: 22, medium: 28, large: 38 },
  sn:  { small: 12, medium: 14, large: 18 },
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

// ===== AUTOPLAY =====
function getAutoplay() {
  const v = localStorage.getItem('deentag_autoplay');
  return v === null ? true : v === 'true'; // true par défaut
}
function setAutoplay(val) {
  localStorage.setItem('deentag_autoplay', val ? 'true' : 'false');
  const toggle = document.getElementById('autoplay-toggle');
  if (toggle) toggle.classList.toggle('on', val);
}

// ===== MAP AUDIO PAR PAGE =====
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
      acc1: { tr: 'reveil1.mp3', ar: 'reveil1.mp3' },
      acc2: { tr: 'reveil2.mp3', ar: 'reveil2.mp3' },
      acc3: { tr: 'reveil3.mp3', ar: 'reveil3.mp3' },
    },
    toilettes: {
      acc1: { tr: 'toilettes1.mp3', ar: 'toilettes1.mp3' },
      acc2: { tr: 'toilettes2.mp3', ar: 'toilettes2.mp3' },
    },
    tristesse: {
      acc1: { tr: 'tristesse1.mp3', ar: 'tristesse1.mp3' },
      acc2: { tr: 'tristesse2.mp3', ar: 'tristesse2.mp3' },
    },
    maison: {
      acc1: { tr: 'maison1.mp3', ar: 'maison1.mp3' },
      acc3: { tr: 'maison3.mp3', ar: 'maison3.mp3' },
    },
    enfants: {
      acc1: { tr: 'enfants1.mp3', ar: 'enfants1.mp3' },
    },
    transport: {
      acc1: { tr: 'transport1.mp3', ar: 'transport1.mp3' },
    },
  };
  return maps[page] || {};
}

// ===== OVERLAY INVOCATION =====
let currentOverlayAccId = null;

function openInvOverlay(accId) {
  const overlay = document.getElementById('inv-overlay');
  const content = document.getElementById('inv-overlay-content');
  if (!overlay || !content) return;

  // Arrête l'audio en cours
  stopAudio();
  currentOverlayAccId = accId;

  // Récupère les données de l'accordéon
  const lang = currentLang;
  const trEl = document.getElementById(accId + '-tr-' + lang);
  const phEl = document.getElementById(accId + '-ph-' + lang);
  const arEl = document.getElementById(accId + '-ar-' + lang);
  const hadithEl = document.querySelector('#' + accId + ' .hadith-block');
  const isSunnah = !!(document.getElementById(accId) && document.getElementById(accId).querySelector('.sunnah-item'));

  // Titre de l'accordéon (toutes langues)
  const titleEl = document.querySelector('#' + accId + ' .accordion-title');

  // Construire le contenu
  let html = '';

  // Titre
  if (titleEl) {
    const titleFr = titleEl.querySelector('[data-lang-block="fr"]');
    const titleEn = titleEl.querySelector('[data-lang-block="en"]');
    const titleEs = titleEl.querySelector('[data-lang-block="es"]');
    html += '<div class="inv-overlay-title">';
    if (titleFr) html += '<span class="lang-block" data-lang-block="fr">' + titleFr.innerHTML + '</span>';
    if (titleEn) html += '<span class="lang-block" data-lang-block="en">' + titleEn.innerHTML + '</span>';
    if (titleEs) html += '<span class="lang-block" data-lang-block="es">' + titleEs.innerHTML + '</span>';
    html += '</div>';
    html += '<div class="inv-overlay-ornament"><div class="ornament-line"></div><div class="ornament-center"><div class="ornament-diamond"></div><span style="color:var(--gold);font-size:11px;">✦</span><div class="ornament-diamond"></div></div><div class="ornament-line"></div></div>';
  }

  if (!isSunnah) {
    // Contenu invocation : arabe + phonétique + traduction pour chaque langue
    const accEl = document.getElementById(accId);
    ['fr','en','es'].forEach(l => {
      const tr = document.getElementById(accId + '-tr-' + l);
      const ph = document.getElementById(accId + '-ph-' + l);
      const ar = document.getElementById(accId + '-ar-' + l);
      const hadith = accEl ? accEl.querySelector('.lang-block[data-lang-block="' + l + '"] .hadith-block') : null;
      if (!tr && !ph && !ar) return;
      html += '<div class="lang-block" data-lang-block="' + l + '">';
      if (ar) html += '<div class="arabic-block" id="ov-' + accId + '-ar-' + l + '">' + ar.innerHTML + '</div>';
      if (ph) html += '<div class="phonetic-block" id="ov-' + accId + '-ph-' + l + '">' + ph.innerHTML + '</div>';
      if (tr) html += '<div class="translation-block" id="ov-' + accId + '-tr-' + l + '">' + tr.innerHTML + '</div>';
      if (hadith) html += '<div class="hadith-block">' + hadith.innerHTML + '</div>';
      html += '</div>';
    });

    // Barre audio
    const audioMap = getAudioMap();
    const hasAudio = !!audioMap[accId];
    if (hasAudio) {
      const audioAR = audioMap[accId].ar;
      const audioTR = audioMap[accId].tr;
      const svgTR = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
      const svgAR = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
      html += '<div class="acc-controls-bar"><div class="audio-player-bar">' +
        '<button class="audio-player-btn" id="ov-tts-tr-' + accId + '" onclick="playAudio(\'ov-' + accId + '\',\'tr\',this,\'' + audioTR + '\')">' +
          '<div class="audio-player-circle">' + svgTR + '</div>' +
          '<span class="audio-player-lbl" data-tts-label-tr>' + (i18n[currentLang]['btn-tr'] || 'Traduction') + '</span>' +
        '</button>' +
        '<div class="audio-line-left"></div>' +
        '<div class="audio-center-label">' +
          '<span class="audio-center-ornament">✦</span>' +
          '<span class="audio-center-title" data-i18n-listen>' + (i18n[currentLang]['listen'] || 'Écouter') + '</span>' +
          '<span class="audio-center-sub" data-i18n-tracks>' + (i18n[currentLang]['tracks'] || 'les pistes') + '</span>' +
        '</div>' +
        '<div class="audio-line-right"></div>' +
        '<button class="audio-player-btn" id="ov-tts-ar-' + accId + '" onclick="playAudio(\'ov-' + accId + '\',\'ar\',this,\'' + audioAR + '\')">' +
          '<div class="audio-player-circle">' + svgAR + '</div>' +
          '<span class="audio-player-lbl" data-tts-label-ar>' + (i18n[currentLang]['btn-ar'] || 'Arabe') + '</span>' +
        '</button>' +
      '</div></div>';
    }
  } else {
    // Sunnahs — on cherche dans l'accordion-inner directement (pas besoin de classe active)
    const accEl = document.getElementById(accId);
    const inner = accEl ? accEl.querySelector('.accordion-inner') : null;
    ['fr','en','es'].forEach(l => {
      // Cherche le lang-block même s'il n'a pas la classe active (données cachées)
      const block = inner ? inner.querySelector('[data-lang-block="' + l + '"]') : null;
      if (!block) return;
      const items = block.querySelectorAll('.sunnah-item');
      if (!items.length) return;
      html += '<div class="lang-block" data-lang-block="' + l + '">';
      items.forEach(item => {
        html += '<div class="sunnah-item">' + item.innerHTML + '</div>';
      });
      html += '</div>';
    });
  }

  // Bouton partage + settings
  html += '<div class="inv-overlay-actions">' +
    '<button class="inv-overlay-share-btn" onclick="shareFromOverlay(\'' + accId + '\')">' +
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>' +
    '</button>' +
    '<button class="inv-overlay-share-btn" onclick="event.stopPropagation();toggleSettingsPanel()">' +
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>' +
    '</button>' +
  '</div>';

  content.innerHTML = html;
  applyLangBlocks(currentLang);
  applyAllSizeLevels();

  // Ouvrir l'overlay
  overlay.classList.add('open');
  document.body.classList.add('overlay-open');

  // Autoplay
  if (getAutoplay()) {
    const audioMap = getAudioMap();
    if (audioMap[accId] && !document.querySelector('#' + accId + ' .sunnah-item')) {
      setTimeout(() => {
        const arBtn = document.getElementById('ov-tts-ar-' + accId);
        if (arBtn) playAudio('ov-' + accId, 'ar', arBtn, audioMap[accId].ar);
      }, 400);
    }
  }
}

// Surcharge playAudio pour les IDs préfixés "ov-"
// On mappe ov-accN → accN pour chercher les éléments dans le DOM de l'overlay
const _origPlayAudio = playAudio;
window.playAudio = function(accId, type, btn, audioFile) {
  // Les éléments audio dans l'overlay ont le préfixe ov-
  // On utilise l'ID tel quel car on a créé les éléments avec ov-accId-tr-lang
  _origPlayAudio(accId, type, btn, audioFile);
};

function closeInvOverlay() {
  stopAudio();
  const overlay = document.getElementById('inv-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.classList.remove('overlay-open');
  currentOverlayAccId = null;
}

function shareFromOverlay(accId) {
  const lang = currentLang;
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
    navigator.share({ title: 'Deentag', text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

// ===== SETTINGS PANEL (sur pages invocation) =====
function closeAllSettings() {
  document.querySelectorAll('.settings-panel.open').forEach(p => p.classList.remove('open'));
  const overlay = document.getElementById('settings-overlay');
  if (overlay) overlay.classList.remove('open');
}

function toggleSettingsPanel() {
  const panel = document.getElementById('global-settings-panel');
  if (!panel) return;
  const isOpen = panel.classList.contains('open');
  closeAllSettings();
  if (!isOpen) {
    buildSettingsPanel();
    // Positionner au centre en bas de l'écran, au-dessus de l'overlay
    panel.style.position = 'fixed';
    panel.style.bottom = '100px';
    panel.style.left = '50%';
    panel.style.transform = 'translateX(-50%)';
    panel.style.top = 'auto';
    panel.style.zIndex = '1100';
    panel.classList.add('open');
    const overlay = document.getElementById('settings-overlay');
    if (overlay) { overlay.style.zIndex = '1099'; overlay.classList.add('open'); }
  }
}

function buildSettingsPanel() {
  const panel = document.getElementById('global-settings-panel');
  if (!panel) return;

  const lang = currentLang;
  const hasSunnah = false; // panel global affiche tous les types

  let html = '<div class="settings-panel-title" data-i18n-size-title>' + (i18n[lang]['size-title'] || 'Taille du texte') + '</div>';

  const types = [
    { key: 'fr', labelKey: 'size-fr', fallback: 'Traduction' },
    { key: 'ph', labelKey: 'size-ph', fallback: 'Phonétique' },
    { key: 'ar', labelKey: 'size-ar', fallback: 'Arabe' },
  ];

  types.forEach(({ key, labelKey, fallback }) => {
    const curLevel = getCurrentSizeLevel(key);
    const lbl = i18n[lang][labelKey] || fallback;
    html +=
      '<div class="size-block">' +
        '<span class="size-block-label" data-size-label="' + labelKey + '">' + lbl + '</span>' +
        '<div class="size-pills">' +
          '<button class="size-pill' + (curLevel==='small'?' active':'') + '" data-size-type="' + key + '" data-size-val="small" onclick="event.stopPropagation();applySizeLevel(\'' + key + '\',\'small\')" data-i18n-pill="size-small">' + (i18n[lang]['size-small']||'Petit') + '</button>' +
          '<button class="size-pill' + (curLevel==='medium'?' active':'') + '" data-size-type="' + key + '" data-size-val="medium" onclick="event.stopPropagation();applySizeLevel(\'' + key + '\',\'medium\')" data-i18n-pill="size-medium">' + (i18n[lang]['size-medium']||'Moyen') + '</button>' +
          '<button class="size-pill' + (curLevel==='large'?' active':'') + '" data-size-type="' + key + '" data-size-val="large" onclick="event.stopPropagation();applySizeLevel(\'' + key + '\',\'large\')" data-i18n-pill="size-large">' + (i18n[lang]['size-large']||'Grand') + '</button>' +
        '</div>' +
      '</div>';
  });

  // Toggle autoplay
  const autoOn = getAutoplay();
  html +=
    '<div class="size-block autoplay-block">' +
      '<span class="size-block-label" data-i18n-autoplay>' + (i18n[lang]['autoplay']||'Lecture auto') + '</span>' +
      '<div class="autoplay-toggle-wrap">' +
        '<div class="autoplay-toggle ' + (autoOn?'on':'') + '" id="autoplay-toggle" onclick="event.stopPropagation();setAutoplay(!getAutoplay())">' +
          '<div class="autoplay-knob"></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  panel.innerHTML = html;
}

// ===== SVG ICÔNES =====
const SVG = {
  // ﷺ plus grand
  sunnah: `<svg viewBox="0 0 44 28" width="42" height="26" xmlns="http://www.w3.org/2000/svg"><text x="22" y="22" text-anchor="middle" font-family="Amiri,serif" font-size="22" fill="#C9A84C">ﷺ</text></svg>`,

  // Maison — entrer/sortir ultra simples
  enter:      `<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#C9A84C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>`,
  leave:      `<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#C9A84C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="11 18 5 12 11 6"/></svg>`,
  variant:    `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  protection: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,

  // Repas
  before_eat: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><path d="M12 6C9 6 7 8 7 11c0 2.5 1.5 4.5 5 5v4"/><line x1="17" y1="2" x2="17" y2="11"/><line x1="7" y1="2" x2="7" y2="6"/></svg>`,
  forgot_bis: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  after_eat:  `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,

  // Réveil
  waking:     `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>`,
  sleeping:   `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,

  // Tristesse
  sadness:    `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
  quran:      `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,

  // Toilettes
  before_wc:  `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>`,
  after_wc:   `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,

  // Ablution
  before_wudu:`<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6l3 3-3 3v6"/><path d="M7 7c0 0-3 3-3 6s3 6 3 6"/><path d="M17 7c0 0 3 3 3 6s-3 6-3 6"/></svg>`,
  shahada:    `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  dua_after:  `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,

  // Enfants
  protect:    `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  one_child:  `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>`,

  // Transport
  boarding:   `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  long_trip:  `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
};

// ===== WHEEL MINI (pages invocation) =====
const PAGE_WHEEL_DATA = {
  maison: {
    img: 'images/maison.png',
    label: { fr: 'Maison', en: 'Home', es: 'Casa' },
    subs: [
      { accId: 'acc1', label: { fr: 'Entrer', en: 'Enter', es: 'Entrar' }, svg: SVG.enter },
      { accId: 'acc2', label: { fr: 'Variante', en: 'Variant', es: 'Variante' }, svg: SVG.variant },
      { accId: 'acc3', label: { fr: 'Sortir', en: 'Leave', es: 'Salir' }, svg: SVG.leave },
      { accId: 'acc4', label: { fr: 'Protection', en: 'Protection', es: 'Protección' }, svg: SVG.protection },
      { accId: 'acc5', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, svg: SVG.sunnah },
    ]
  },
  repas: {
    img: 'images/repas.png',
    label: { fr: 'Repas', en: 'Meals', es: 'Comidas' },
    subs: [
      { accId: 'acc1', label: { fr: 'Avant manger', en: 'Before', es: 'Antes' }, svg: SVG.before_eat },
      { accId: 'acc2', label: { fr: 'Oubli Bismillah', en: 'Forgot', es: 'Olvidó' }, svg: SVG.forgot_bis },
      { accId: 'acc3', label: { fr: 'Après manger', en: 'After', es: 'Después' }, svg: SVG.after_eat },
      { accId: 'acc4', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, svg: SVG.sunnah },
    ]
  },
  reveil: {
    img: 'images/lit.png',
    label: { fr: 'Réveil', en: 'Wake', es: 'Despertar' },
    subs: [
      { accId: 'acc1', label: { fr: 'Au réveil', en: 'Waking', es: 'Despertar' }, svg: SVG.waking },
      { accId: 'acc2', label: { fr: 'Se coucher', en: 'Sleeping', es: 'Dormir' }, svg: SVG.sleeping },
      { accId: 'acc3', label: { fr: 'Variante', en: 'Variant', es: 'Variante' }, svg: SVG.variant },
      { accId: 'acc4', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, svg: SVG.sunnah },
    ]
  },
  tristesse: {
    img: 'images/tristesse.png',
    label: { fr: 'Tristesse', en: 'Sadness', es: 'Tristeza' },
    subs: [
      { accId: 'acc1', label: { fr: 'Tristesse', en: 'Sadness', es: 'Tristeza' }, svg: SVG.sadness },
      { accId: 'acc2', label: { fr: 'Dua Coran', en: 'Qur\'an', es: 'Corán' }, svg: SVG.quran },
      { accId: 'acc3', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, svg: SVG.sunnah },
    ]
  },
  toilettes: {
    img: 'images/wc.png',
    label: { fr: 'Toilettes', en: 'Restroom', es: 'Baño' },
    subs: [
      { accId: 'acc1', label: { fr: 'Avant', en: 'Before', es: 'Antes' }, svg: SVG.before_wc },
      { accId: 'acc2', label: { fr: 'Après', en: 'After', es: 'Después' }, svg: SVG.after_wc },
      { accId: 'acc3', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, svg: SVG.sunnah },
    ]
  },
  ablution: {
    img: 'images/ablution.png',
    label: { fr: 'Ablution', en: 'Ablution', es: 'Ablución' },
    subs: [
      { accId: 'acc1', label: { fr: 'Avant wudu', en: 'Before', es: 'Antes' }, svg: SVG.before_wudu },
      { accId: 'acc2', label: { fr: 'Shahada', en: 'Shahada', es: 'Shahada' }, svg: SVG.shahada },
      { accId: 'acc3', label: { fr: 'Dua après', en: 'Dua after', es: 'Dua' }, svg: SVG.dua_after },
      { accId: 'acc4', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, svg: SVG.sunnah },
    ]
  },
  enfants: {
    img: 'images/enfants.png',
    label: { fr: 'Enfants', en: 'Children', es: 'Niños' },
    subs: [
      { accId: 'acc1', label: { fr: 'Protéger', en: 'Protect', es: 'Proteger' }, svg: SVG.protect },
      { accId: 'acc2', label: { fr: 'Enfant unique', en: 'One child', es: 'Único' }, svg: SVG.one_child },
      { accId: 'acc3', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, svg: SVG.sunnah },
    ]
  },
  transport: {
    img: 'images/voiture.png',
    label: { fr: 'Transport', en: 'Transport', es: 'Transporte' },
    subs: [
      { accId: 'acc1', label: { fr: 'En montant', en: 'Boarding', es: 'Al subir' }, svg: SVG.boarding },
      { accId: 'acc2', label: { fr: 'Long trajet', en: 'Long trip', es: 'Viaje' }, svg: SVG.long_trip },
      { accId: 'acc3', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, svg: SVG.sunnah },
    ]
  },
};

function renderPageWheel() {
  const page = document.body.getAttribute('data-page');
  if (!page || !PAGE_WHEEL_DATA[page]) return;

  const container = document.getElementById('page-wheel-container');
  if (!container) return;

  const data = PAGE_WHEEL_DATA[page];
  const subs = data.subs;
  const total = subs.length;
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const radius = total <= 3 ? 95 : total <= 4 ? 100 : 108;

  container.style.width = size + 'px';
  container.style.height = size + 'px';
  container.style.position = 'relative';

  // Cercle décoratif
  const ring = document.createElement('div');
  ring.className = 'wheel-ring';
  container.appendChild(ring);

  // Centre
  const center = document.createElement('div');
  center.className = 'wheel-center';
  center.innerHTML = '<img src="' + data.img + '" alt="">';
  container.appendChild(center);

  // Items
  subs.forEach((sub, i) => {
    const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    const el = document.createElement('div');
    el.className = 'wheel-item page-wheel-item hidden';
    el.onclick = () => openInvOverlay(sub.accId);

    const label = sub.label[currentLang] || sub.label.fr;
    const iconHTML = sub.svg
      ? '<div class="wheel-item-svg">' + sub.svg + '</div>'
      : '<img src="' + sub.img + '" alt="' + label + '">';
    el.innerHTML =
      '<div class="wheel-item-circle">' + iconHTML + '</div>' +
      '<span class="wheel-item-label page-wheel-label" data-sub-idx="' + i + '">' + label + '</span>';

    el.style.left = x + 'px';
    el.style.top = y + 'px';
    container.appendChild(el);

    setTimeout(() => el.classList.remove('hidden'), 60 + i * 60);
  });

  // Ouvrir directement si hash dans l'URL
  const hash = window.location.hash;
  if (hash) {
    const accId = hash.replace('#', '');
    if (document.getElementById(accId)) {
      setTimeout(() => openInvOverlay(accId), 500);
    }
  }
}

// Mise à jour labels wheel quand langue change
function updatePageWheelLabels() {
  const page = document.body.getAttribute('data-page');
  if (!page || !PAGE_WHEEL_DATA[page]) return;
  const subs = PAGE_WHEEL_DATA[page].subs;
  document.querySelectorAll('.page-wheel-label').forEach((el, i) => {
    const idx = parseInt(el.getAttribute('data-sub-idx'));
    if (!isNaN(idx) && subs[idx]) {
      el.textContent = subs[idx].label[currentLang] || subs[idx].label.fr;
    }
  });
}

// ===== PARTAGER =====
function shareAccordion(accId) {
  const lang = currentLang;
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
    navigator.share({ title: 'Deentag', text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('deentag_theme') || 'day';
  document.body.classList.add(savedTheme);
  const knob = document.getElementById('theme-knob');
  if (knob) knob.textContent = '';
  const savedLang = localStorage.getItem('deentag_lang') || detectLang();
  applyLang(savedLang);

  // Overlay settings
  const sOverlay = document.createElement('div');
  sOverlay.id = 'settings-overlay';
  sOverlay.className = 'settings-overlay';
  sOverlay.addEventListener('click', closeAllSettings);
  document.body.appendChild(sOverlay);

  applyAllSizeLevels();

  const content = document.querySelector('.inv-content, .page-content');
  if (content) content.classList.add('fade-in');

  // Construit le panel settings global si présent
  buildSettingsPanel();

  // Wheel sur pages invocation
  renderPageWheel();

  // Overlay invocation (injecté si pas déjà présent)
  if (!document.getElementById('inv-overlay')) {
    const ov = document.createElement('div');
    ov.id = 'inv-overlay';
    ov.className = 'inv-overlay';
    ov.innerHTML =
      '<div class="inv-overlay-backdrop" onclick="closeInvOverlay()"></div>' +
      '<div class="inv-overlay-sheet">' +
        '<button class="inv-overlay-close" onclick="closeInvOverlay()">✕</button>' +
        '<div id="inv-overlay-content" class="inv-overlay-content"></div>' +
      '</div>';
    document.body.appendChild(ov);

    // Swipe down pour fermer
    let startY = 0;
    const sheet = ov.querySelector('.inv-overlay-sheet');
    sheet.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
    sheet.addEventListener('touchend', e => {
      if (e.changedTouches[0].clientY - startY > 80) closeInvOverlay();
    }, { passive: true });
  }
});

/* ===== DÉSACTIVER CLIC DROIT ===== */
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
});
