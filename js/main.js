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

  // Bouton partage
  html += '<div class="inv-overlay-actions">' +
    '<button class="inv-overlay-share-btn" onclick="shareFromOverlay(\'' + accId + '\')">' +
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>' +
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
    panel.classList.add('open');
    const overlay = document.getElementById('settings-overlay');
    if (overlay) overlay.classList.add('open');
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

// ===== WHEEL MINI (pages invocation) =====
// Données par page
const PAGE_WHEEL_DATA = {
  maison: {
    img: 'images/maison.png',
    label: { fr: 'Maison', en: 'Home', es: 'Casa' },
    subs: [
      { accId: 'acc1', label: { fr: 'Entrer', en: 'Enter', es: 'Entrar' }, img: 'images/maison.png' },
      { accId: 'acc2', label: { fr: 'Variante', en: 'Variant', es: 'Variante' }, img: 'images/maison.png' },
      { accId: 'acc3', label: { fr: 'Sortir', en: 'Leave', es: 'Salir' }, img: 'images/maison.png' },
      { accId: 'acc4', label: { fr: 'Protection', en: 'Protection', es: 'Protección' }, img: 'images/maison.png' },
      { accId: 'acc5', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, img: 'images/maison.png' },
    ]
  },
  repas: {
    img: 'images/repas.png',
    label: { fr: 'Repas', en: 'Meals', es: 'Comidas' },
    subs: [
      { accId: 'acc1', label: { fr: 'Avant manger', en: 'Before', es: 'Antes' }, img: 'images/repas.png' },
      { accId: 'acc2', label: { fr: 'Oubli Bismillah', en: 'Forgot', es: 'Olvidó' }, img: 'images/repas.png' },
      { accId: 'acc3', label: { fr: 'Après manger', en: 'After', es: 'Después' }, img: 'images/repas.png' },
      { accId: 'acc4', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, img: 'images/repas.png' },
    ]
  },
  reveil: {
    img: 'images/lit.png',
    label: { fr: 'Réveil', en: 'Wake', es: 'Despertar' },
    subs: [
      { accId: 'acc1', label: { fr: 'Au réveil', en: 'Waking', es: 'Despertar' }, img: 'images/lit.png' },
      { accId: 'acc2', label: { fr: 'Se coucher', en: 'Sleeping', es: 'Dormir' }, img: 'images/lit.png' },
      { accId: 'acc3', label: { fr: 'Variante', en: 'Variant', es: 'Variante' }, img: 'images/lit.png' },
      { accId: 'acc4', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, img: 'images/lit.png' },
    ]
  },
  tristesse: {
    img: 'images/tristesse.png',
    label: { fr: 'Tristesse', en: 'Sadness', es: 'Tristeza' },
    subs: [
      { accId: 'acc1', label: { fr: 'Tristesse', en: 'Sadness', es: 'Tristeza' }, img: 'images/tristesse.png' },
      { accId: 'acc2', label: { fr: 'Dua Coran', en: 'Qur\'an', es: 'Corán' }, img: 'images/tristesse.png' },
      { accId: 'acc3', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, img: 'images/tristesse.png' },
    ]
  },
  toilettes: {
    img: 'images/wc.png',
    label: { fr: 'Toilettes', en: 'Restroom', es: 'Baño' },
    subs: [
      { accId: 'acc1', label: { fr: 'Avant', en: 'Before', es: 'Antes' }, img: 'images/wc.png' },
      { accId: 'acc2', label: { fr: 'Après', en: 'After', es: 'Después' }, img: 'images/wc.png' },
      { accId: 'acc3', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, img: 'images/wc.png' },
    ]
  },
  ablution: {
    img: 'images/ablution.png',
    label: { fr: 'Ablution', en: 'Ablution', es: 'Ablución' },
    subs: [
      { accId: 'acc1', label: { fr: 'Avant wudu', en: 'Before', es: 'Antes' }, img: 'images/ablution.png' },
      { accId: 'acc2', label: { fr: 'Shahada', en: 'Shahada', es: 'Shahada' }, img: 'images/ablution.png' },
      { accId: 'acc3', label: { fr: 'Dua après', en: 'Dua after', es: 'Dua' }, img: 'images/ablution.png' },
      { accId: 'acc4', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, img: 'images/ablution.png' },
    ]
  },
  enfants: {
    img: 'images/enfants.png',
    label: { fr: 'Enfants', en: 'Children', es: 'Niños' },
    subs: [
      { accId: 'acc1', label: { fr: 'Protéger', en: 'Protect', es: 'Proteger' }, img: 'images/enfants.png' },
      { accId: 'acc2', label: { fr: 'Enfant unique', en: 'One child', es: 'Único' }, img: 'images/enfants.png' },
      { accId: 'acc3', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, img: 'images/enfants.png' },
    ]
  },
  transport: {
    img: 'images/voiture.png',
    label: { fr: 'Transport', en: 'Transport', es: 'Transporte' },
    subs: [
      { accId: 'acc1', label: { fr: 'En montant', en: 'Boarding', es: 'Al subir' }, img: 'images/voiture.png' },
      { accId: 'acc2', label: { fr: 'Long trajet', en: 'Long trip', es: 'Viaje' }, img: 'images/voiture.png' },
      { accId: 'acc3', label: { fr: 'Sunnahs', en: 'Sunnahs', es: 'Sunnahs' }, img: 'images/voiture.png' },
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
    el.innerHTML =
      '<div class="wheel-item-circle">' +
        '<img src="' + sub.img + '" alt="' + label + '">' +
      '</div>' +
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
