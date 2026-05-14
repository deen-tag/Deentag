// ===== DEENTAG — MAIN.JS v7 =====

const i18n = {
  fr: {
    "btn-tr":"Traduction","btn-ar":"En arabe",
    "listen":"Écouter","tracks":"l'audio",
    "size-title":"Taille du texte",
    "size-fr":"Traduction","size-ph":"Phonétique","size-ar":"Arabe",
    "size-small":"Petit","size-medium":"Moyen","size-large":"Grand",
    "audio-mode":"Lecture audio","audio-auto":"Auto","audio-manual":"Manuel",
  },
  en: {
    "btn-tr":"Translation","btn-ar":"In Arabic",
    "listen":"Listen","tracks":"to audio",
    "size-title":"Text size",
    "size-fr":"Translation","size-ph":"Phonetic","size-ar":"Arabic",
    "size-small":"Small","size-medium":"Medium","size-large":"Large",
    "audio-mode":"Audio playback","audio-auto":"Auto","audio-manual":"Manual",
  },
  es: {
    "btn-tr":"Traducción","btn-ar":"En árabe",
    "listen":"Escuchar","tracks":"el audio",
    "size-title":"Tamaño del texto",
    "size-fr":"Traducción","size-ph":"Fonética","size-ar":"Árabe",
    "size-small":"Peq.","size-medium":"Med.","size-large":"Gran.",
    "audio-mode":"Reproducción","audio-auto":"Auto","audio-manual":"Manual",
  }
};

let currentLang = 'fr';

function detectLang() {
  const l = (navigator.language || 'fr').toLowerCase();
  if (l.startsWith('es')) return 'es';
  if (l.startsWith('en')) return 'en';
  return 'fr';
}

// ===== AUDIO AUTO/MANUEL =====
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

// ===== LANGUE =====
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
  document.querySelectorAll('[data-tts-label-tr]').forEach(el => { el.textContent = i18n[lang]['btn-tr'] || 'Traduction'; });
  document.querySelectorAll('[data-tts-label-ar]').forEach(el => { el.textContent = i18n[lang]['btn-ar'] || 'Arabe'; });
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
  updateThemeCircleBtn();
}

function updateThemeCircleBtn() {
  document.querySelectorAll('#theme-circle-btn').forEach(btn => {
    const isNight = document.body.classList.contains('night');
    btn.innerHTML = isNight ? '&#127769;' : '&#9728;&#65039;';
  });
}

// ===== MODE ENFANTS =====
function toggleKidsMode() {
  const isKids = document.body.classList.contains('kids');
  document.body.classList.toggle('kids', !isKids);
  localStorage.setItem('deentag_kids', isKids ? 'off' : 'on');
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
  if (audioState.btn === btn && audioState.player) { stopAudio(); return; }
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
    const maleKeywords = ['male','man','homme','hombre','david','jorge','carlos','thomas','nicolas','albert','pierre','google uk english male','microsoft david','microsoft pablo'];
    const langVoices = allVoices.filter(v => v.lang.startsWith(targetLang.split('-')[0]));
    const maleVoice = langVoices.find(v => maleKeywords.some(k => v.name.toLowerCase().includes(k))) || langVoices[0];
    if (maleVoice) utt.voice = maleVoice;
    audioState.btn = btn; audioState.type = 'tr'; audioState.accId = accId; audioState.player = null;
    btn.classList.add('playing');
    const ic = btn.querySelector('.tts-icon');
    if (ic) ic.textContent = '⏹';
    trEl.setAttribute('data-tts-reading', '1');
    applyGlobalDim(accId, [trEl]);
    utt.onend = () => stopAudio();
    utt.onerror = () => stopAudio();
    window.speechSynthesis.speak(utt);
    return;
  }

  const player = new Audio('Audio/' + audioFile);
  audioState.player = player; audioState.btn = btn; audioState.type = type; audioState.accId = accId;
  btn.classList.add('playing');
  const ic = btn.querySelector('.tts-icon');
  if (ic) ic.textContent = '⏹';
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
  document.querySelectorAll('.translation-block, .phonetic-block, .arabic-block, .hadith-block, .accordion-title, .closing-dua').forEach(el => {
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

// ===== SETTINGS PANEL =====
const GEAR_ICON = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
const SHARE_ICON = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>';

function toggleAccSettings(accId) {
  const panel = document.getElementById('settings-panel-' + accId);
  if (!panel) return;
  const isOpen = panel.classList.contains('open');
  closeAllSettings();
  if (!isOpen) {
    // Positionner sous la topbar du sheet ou de la page
    const toolbar = document.querySelector('.dua-topbar, .inv-topbar');
    const topbarH = toolbar ? toolbar.getBoundingClientRect().bottom : 56;
    panel.style.top = (topbarH + 8) + 'px';
    if (document.body.classList.contains('kids')) {
      const acc = document.getElementById(accId);
      if (acc) {
        const kidsColor = getComputedStyle(acc).getPropertyValue('--kids-color').trim();
        if (kidsColor) panel.style.setProperty('--kids-panel-color', kidsColor);
      }
    } else {
      panel.style.removeProperty('--kids-panel-color');
    }
    panel.classList.add('open');
    const btn = document.querySelector('#' + accId + ' .acc-settings-btn');
    if (btn) btn.classList.add('active');
    const overlay = document.getElementById('settings-overlay');
    if (overlay) overlay.classList.add('open');
  }
}

function closeAllSettings() {
  document.querySelectorAll('.settings-panel.open').forEach(p => {
    p.classList.remove('open');
    const accId = p.id.replace('settings-panel-', '');
    const btn = document.querySelector('#' + accId + ' .acc-settings-btn');
    if (btn) btn.classList.remove('active');
  });
  const overlay = document.getElementById('settings-overlay');
  if (overlay) overlay.classList.remove('open');
}

// ===== PARTAGER =====
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
  text += '\n— Deentag\n🔗 https://deentag.vercel.app/shop.html';
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
// Appelée après chaque injection de dua dans le DOM (sheet ou autre)
function injectAccordionControls() {
  const lang = currentLang;

  document.querySelectorAll('.accordion').forEach(acc => {
    const accId = acc.id;
    if (!accId) return;
    const inner = acc.querySelector('.accordion-inner');
    if (!inner) return;

    // Nettoyer anciens éléments
    inner.querySelectorAll('.tts-bar, .acc-controls-bar, .acc-actions').forEach(b => b.remove());
    document.querySelectorAll('#settings-panel-' + accId).forEach(p => p.remove());
    const header = acc.querySelector('.accordion-header');
    if (header) header.querySelectorAll('.acc-actions').forEach(b => b.remove());

    const hasSunnah = !!inner.querySelector('.sunnah-item');

    // Récupérer l'audio depuis duas.js
    const page = acc.closest('[data-page]') ? acc.closest('[data-page]').getAttribute('data-page') : (acc.getAttribute('data-page') || '');
    const duaPage = acc.getAttribute('data-dua-page') || '';
    const pg = duaPage || page;
    let audioFile = null;
    if (window.DUAS && pg && DUAS[pg] && DUAS[pg][accId] && DUAS[pg][accId].audio) {
      audioFile = DUAS[pg][accId].audio;
    }
    const hasAudio = !hasSunnah && audioFile;

    // === BARRE RÉGLAGES + PARTAGE ===
    const actions = document.createElement('div');
    actions.className = 'acc-actions';
    actions.innerHTML =
      '<button class="acc-settings-btn" onclick="event.stopPropagation();toggleAccSettings(\'' + accId + '\')" title="Réglages">' + GEAR_ICON + '</button>' +
      '<button class="share-btn" onclick="event.stopPropagation();shareAccordion(\'' + accId + '\')" title="Partager">' + SHARE_ICON + '</button>';
    inner.insertBefore(actions, inner.firstChild);

    // === BARRE AUDIO ===
    const bar = document.createElement('div');
    bar.className = 'acc-controls-bar';
    if (hasAudio) {
      const svgTR = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
      const svgAR = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
      bar.innerHTML =
        '<div class="audio-player-bar">' +
          '<button class="audio-player-btn" id="tts-tr-' + accId + '" onclick="playAudio(\'' + accId + '\', \'tr\', this, \'' + audioFile + '\')">' +
            '<div class="audio-player-circle">' + svgTR + '</div>' +
            '<span class="audio-player-lbl" data-tts-label-tr>' + (i18n[lang]['btn-tr'] || 'Traduction') + '</span>' +
          '</button>' +
          '<div class="audio-line-left"></div>' +
          '<div class="audio-center-label">' +
            '<span class="audio-center-ornament">✦</span>' +
            '<span class="audio-center-title" data-i18n-listen>' + (i18n[lang]['listen'] || 'Écouter') + '</span>' +
            '<span class="audio-center-sub" data-i18n-tracks>' + (i18n[lang]['tracks'] || 'les pistes') + '</span>' +
          '</div>' +
          '<div class="audio-line-right"></div>' +
          '<button class="audio-player-btn" id="tts-ar-' + accId + '" onclick="playAudio(\'' + accId + '\', \'ar\', this, \'' + audioFile + '\')">' +
            '<div class="audio-player-circle">' + svgAR + '</div>' +
            '<span class="audio-player-lbl" data-tts-label-ar>' + (i18n[lang]['btn-ar'] || 'Arabe') + '</span>' +
          '</button>' +
        '</div>';
    }
    inner.appendChild(bar);

    // === PANEL RÉGLAGES FLOTTANT ===
    const panel = document.createElement('div');
    panel.className = 'settings-panel';
    panel.id = 'settings-panel-' + accId;

    function buildPillsHTML(types) {
      let html = '<div class="settings-panel-title" data-i18n-size-title>' + (i18n[currentLang]['size-title'] || 'Taille du texte') + '</div>';
      types.forEach(({ key, labelKey, fallback }) => {
        const curLevel = getCurrentSizeLevel(key);
        const lbl = i18n[currentLang][labelKey] || fallback;
        html +=
          '<div class="size-block">' +
            '<span class="size-block-label" data-size-label="' + labelKey + '">' + lbl + '</span>' +
            '<div class="size-pills">' +
              '<button class="size-pill' + (curLevel === 'small'  ? ' active' : '') + '" data-size-type="' + key + '" data-size-val="small"  onclick="event.stopPropagation();applySizeLevel(\'' + key + '\',\'small\')"  data-i18n-pill="size-small">'  + (i18n[currentLang]['size-small']  || 'Petit')  + '</button>' +
              '<button class="size-pill' + (curLevel === 'medium' ? ' active' : '') + '" data-size-type="' + key + '" data-size-val="medium" onclick="event.stopPropagation();applySizeLevel(\'' + key + '\',\'medium\')" data-i18n-pill="size-medium">' + (i18n[currentLang]['size-medium'] || 'Moyen') + '</button>' +
              '<button class="size-pill' + (curLevel === 'large'  ? ' active' : '') + '" data-size-type="' + key + '" data-size-val="large"  onclick="event.stopPropagation();applySizeLevel(\'' + key + '\',\'large\')"  data-i18n-pill="size-large">'  + (i18n[currentLang]['size-large']  || 'Grand') + '</button>' +
            '</div>' +
          '</div>';
      });
      const isAuto = getAudioAutoPlay();
      html +=
        '<div class="size-block" style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(201,168,76,0.2)">' +
          '<span class="size-block-label">' + (i18n[currentLang]['audio-mode'] || 'Lecture audio') + '</span>' +
          '<div class="size-pills">' +
            '<button class="size-pill audio-mode-pill' + (isAuto ? ' active' : '') + '" data-audio-val="auto" onclick="event.stopPropagation();setAudioAutoPlay(true)">' + (i18n[currentLang]['audio-auto'] || 'Auto') + '</button>' +
            '<button class="size-pill audio-mode-pill' + (!isAuto ? ' active' : '') + '" data-audio-val="manual" onclick="event.stopPropagation();setAudioAutoPlay(false)">' + (i18n[currentLang]['audio-manual'] || 'Manuel') + '</button>' +
          '</div>' +
        '</div>';
      return html;
    }

    panel.innerHTML = !hasSunnah
      ? buildPillsHTML([
          { key: 'fr', labelKey: 'size-fr', fallback: 'Traduction' },
          { key: 'ph', labelKey: 'size-ph', fallback: 'Phonétique' },
          { key: 'ar', labelKey: 'size-ar', fallback: 'Arabe' },
        ])
      : buildPillsHTML([{ key: 'sn', labelKey: 'size-fr', fallback: 'Texte' }]);

    document.body.appendChild(panel);

    // Autoplay si mode auto (appelé depuis openDua avec délai)
    if (hasAudio && getAudioAutoPlay()) {
      setTimeout(() => {
        const btn = document.getElementById('tts-ar-' + accId);
        if (btn) playAudio(accId, 'ar', btn, audioFile);
      }, 400);
    }
  });
}

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('deentag_theme') || 'day';
  document.body.classList.remove('day', 'night');
  document.body.classList.add(savedTheme);
  if (localStorage.getItem('deentag_kids') === 'on') document.body.classList.add('kids');
  updateThemeCircleBtn();

  const savedLang = localStorage.getItem('deentag_lang') || detectLang();
  applyLang(savedLang);

  // Overlay settings
  const overlay = document.createElement('div');
  overlay.id = 'settings-overlay';
  overlay.className = 'settings-overlay';
  overlay.addEventListener('click', closeAllSettings);
  document.body.appendChild(overlay);

  applyAllSizeLevels();
});

/* Désactiver clic droit */
document.addEventListener('contextmenu', e => { e.preventDefault(); return false; });
