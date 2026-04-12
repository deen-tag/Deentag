// ===== DEENTAG — SCRIPT PARTAGÉ v6 =====

const i18n = {
  fr: {
    selection:"Sélection", back:"Retour",
    "cat-repas":"Repas","cat-reveil":"Réveil\nCouché","cat-tristesse":"Tristesse",
    "cat-toilettes":"Toilettes","cat-ablution":"Ablution","cat-maison":"Maison",
    "cat-enfants":"Enfants","cat-transport":"Transport",
    "cat-soon":"Bientôt", coming:"disponible",
    "btn-tr":"Traduction","btn-ar":"En arabe",
    "listen":"Écouter","tracks":"l'audio",
    "size-title":"Taille du texte",
    "size-fr":"Traduction","size-ph":"Phonétique","size-ar":"Arabe",
    "size-small":"Petit","size-medium":"Moyen","size-large":"Grand",
  },
  en: {
    selection:"Selection", back:"Back",
    "cat-repas":"Meals","cat-reveil":"Wake\nSleep","cat-tristesse":"Sadness",
    "cat-toilettes":"Restroom","cat-ablution":"Ablution","cat-maison":"Home",
    "cat-enfants":"Children","cat-transport":"Transport",
    "cat-soon":"Coming", coming:"soon",
    "btn-tr":"Translation","btn-ar":"In Arabic",
    "listen":"Listen","tracks":"to audio",
    "size-title":"Text size",
    "size-fr":"Translation","size-ph":"Phonetic","size-ar":"Arabic",
    "size-small":"Small","size-medium":"Medium","size-large":"Large",
  },
  es: {
    selection:"Selección", back:"Volver",
    "cat-repas":"Comidas","cat-reveil":"Despertar\nDormir","cat-tristesse":"Tristeza",
    "cat-toilettes":"Baño","cat-ablution":"Ablución","cat-maison":"Casa",
    "cat-enfants":"Niños","cat-transport":"Transporte",
    "cat-soon":"Pronto", coming:"disponible",
    "btn-tr":"Traducción","btn-ar":"En árabe",
    "listen":"Escuchar","tracks":"el audio",
    "size-title":"Tamaño del texto",
    "size-fr":"Traducción","size-ph":"Fonética","size-ar":"Árabe",
    "size-small":"Peq.","size-medium":"Med.","size-large":"Gran.",
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
  // Update listen/tracks labels
  document.querySelectorAll('[data-i18n-listen]').forEach(el => { el.textContent = i18n[lang]['listen'] || 'Écouter'; });
  document.querySelectorAll('[data-i18n-tracks]').forEach(el => { el.textContent = i18n[lang]['tracks'] || 'les pistes'; });
  document.querySelectorAll('[data-i18n-size-title]').forEach(el => { el.textContent = i18n[lang]['size-title'] || 'Taille du texte'; });

  // Update pill labels in settings panels
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
}

// ===== ACCORDÉON =====
function toggleAccordion(id) {
  const clicked = document.getElementById(id);
  const isOpen = clicked.classList.contains('open');
  document.querySelectorAll('.accordion').forEach(a => a.classList.remove('open'));
  if (!isOpen) {
    clicked.classList.add('open');
    // Attendre la fin de l'animation (450ms) avant de scroller
    setTimeout(() => {
      const topBar = document.querySelector('.top-bar');
      const topBarH = topBar ? topBar.offsetHeight : 56;
      const rect = clicked.getBoundingClientRect();
      const scrollTarget = window.scrollY + rect.top - topBarH - 10;
      window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
    }, 460);
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
  window.speechSynthesis && window.speechSynthesis.cancel();
  if (audioState.btn) {
    audioState.btn.classList.remove('playing');
    const circle = audioState.btn.querySelector('.audio-player-circle');
    if (circle) {
      const svg = circle.querySelector('svg');
      if (svg) { svg.querySelectorAll('*').forEach(el => el.setAttribute('stroke', '#C9A84C')); }
    }
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
    utt.lang = langVoiceMap[lang] || 'fr-FR';
    utt.rate = 0.88;
    audioState.btn = btn;
    audioState.type = 'tr';
    audioState.accId = accId;
    audioState.player = null;
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
  audioState.player = player;
  audioState.btn = btn;
  audioState.type = type;
  audioState.accId = accId;

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
    if (!litEls.includes(el)) {
      el.classList.add('audio-shimmer');
    }
  });
}

function stopTTS() { stopAudio(); }
function toggleTTS(accId) {}

window.addEventListener('beforeunload', stopAudio);
window.addEventListener('pagehide', stopAudio);

// ===== TAILLES — niveaux Petit / Moyen / Grand =====
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

  // Update active pill state
  document.querySelectorAll('.size-pill[data-size-type="' + type + '"]').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-size-val') === level);
  });
}

function applyAllSizeLevels() {
  ['fr', 'ph', 'ar', 'sn'].forEach(type => {
    applySizeLevel(type, getCurrentSizeLevel(type));
  });
}

// ===== OVERLAY SETTINGS =====
function closeAllSettings() {
  document.querySelectorAll('.settings-panel.open').forEach(p => {
    p.classList.remove('open');
    const accId = p.id.replace('settings-panel-', '');
    const btn = document.querySelector('#' + accId + ' .settings-btn');
    if (btn) btn.classList.remove('active');
  });
  const overlay = document.getElementById('settings-overlay');
  if (overlay) overlay.classList.remove('open');
}

// ===== TOGGLE SETTINGS FLOTTANT =====
function toggleSettings(accId) {
  const panel = document.getElementById('settings-panel-' + accId);
  const btn = document.querySelector('#' + accId + ' .settings-btn');
  if (!panel) return;

  const isOpen = panel.classList.contains('open');
  closeAllSettings();
  if (!isOpen) {
    if (btn) {
      const panelW = 280;

      // 1. Mesurer la vraie hauteur du panel sans l'afficher
      panel.style.visibility = 'hidden';
      panel.style.position = 'fixed';
      panel.style.left = '-9999px';
      panel.style.top = '0px';
      panel.style.bottom = '';
      panel.classList.add('open');
      const panelH = panel.offsetHeight;
      panel.classList.remove('open');
      panel.style.visibility = '';
      panel.style.left = '';
      panel.style.top = '';

      const spaceNeeded = panelH + 6 + 8; // panel + gap + marge haut

      // 2. Si pas assez de place au-dessus du bouton, scroller d'abord
      const rect = btn.getBoundingClientRect();
      const scrollNeeded = spaceNeeded - rect.top;

      const doShow = () => {
        const r = btn.getBoundingClientRect();
        let left = r.left - panelW + r.width;
        if (left < 8) left = 8;
        if (left + panelW > window.innerWidth - 8) left = window.innerWidth - panelW - 8;
        panel.style.left = left + 'px';
        panel.style.top = (r.top - panelH - 6) + 'px';
        panel.style.bottom = '';
        panel.classList.add('open');
        if (btn) btn.classList.add('active');
        const overlay = document.getElementById('settings-overlay');
        if (overlay) overlay.classList.add('open');
      };

      if (scrollNeeded > 0) {
        window.scrollBy({ top: -scrollNeeded, behavior: 'smooth' });
        setTimeout(doShow, 380);
      } else {
        doShow();
      }
    }
  }
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
      acc2: { tr: 'maison2.mp3', ar: 'maison2.mp3' },
      acc3: { tr: 'maison3.mp3', ar: 'maison3.mp3' },
    },
    enfants: {
      acc1: { tr: 'enfants1.mp3', ar: 'enfants1.mp3' },
      acc2: { tr: 'enfants2.mp3', ar: 'enfants2.mp3' },
    },
    transport: {
      acc1: { tr: 'transport1.mp3', ar: 'transport1.mp3' },
      acc2: { tr: 'transport2.mp3', ar: 'transport2.mp3' },
    },
  };
  return maps[page] || {};
}

// ===== INJECTION CONTROLS =====
function injectAccordionControls() {
  const lang = currentLang;
  const audioMap = getAudioMap();

  document.querySelectorAll('.accordion').forEach(acc => {
    const accId = acc.id;
    if (!accId) return;
    const inner = acc.querySelector('.accordion-inner');
    if (!inner) return;

    // Nettoyer les anciens éléments injectés
    inner.querySelectorAll('.tts-bar, .acc-controls-bar, .settings-panel, .acc-actions').forEach(b => b.remove());
    const header = acc.querySelector('.accordion-header');
    header.querySelectorAll('.acc-actions').forEach(b => b.remove());

    const hasSunnah = !!inner.querySelector('.sunnah-item');
    const hasAudio = !hasSunnah && audioMap[accId];

    // === BOUTONS ⚙️ et PARTAGE — coin haut droit du corps ===
    const actions = document.createElement('div');
    actions.className = 'acc-actions';
    actions.innerHTML =
      '<button class="settings-btn" onclick="event.stopPropagation();toggleSettings(\'' + accId + '\')" title="Réglages">⚙️</button>' +
      '<button class="share-btn" onclick="event.stopPropagation();shareAccordion(\'' + accId + '\')" title="Partager">' + SHARE_ICON + '</button>';
    inner.insertBefore(actions, inner.firstChild);

    // === BARRE AUDIO EN BAS ===
    const bar = document.createElement('div');
    bar.className = 'acc-controls-bar';

    if (hasAudio) {
      const audioTR = audioMap[accId].tr;
      const audioAR = audioMap[accId].ar;
      const svgTR = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
      const svgAR = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
      bar.innerHTML =
        '<div class="audio-player-bar">' +
          '<button class="audio-player-btn" id="tts-tr-' + accId + '" onclick="playAudio(\'' + accId + '\', \'tr\', this, \'' + audioTR + '\')">' +
            '<div class="audio-player-circle">' + svgTR + '</div>' +
            '<span class="audio-player-lbl" data-tts-label-tr>' + (i18n[lang]['btn-tr'] || 'Traduction') + '</span>' +
          '</button>' +
          '<div class="audio-line-left"></div>' +
          '<div class="audio-center-label">' +
            '<span class="audio-center-ornament">✦</span>' +
            '<span class="audio-center-title" data-i18n-listen>' + (i18n[currentLang]['listen'] || 'Écouter') + '</span>' +
            '<span class="audio-center-sub" data-i18n-tracks>' + (i18n[currentLang]['tracks'] || 'les pistes') + '</span>' +
          '</div>' +
          '<div class="audio-line-right"></div>' +
          '<button class="audio-player-btn" id="tts-ar-' + accId + '" onclick="playAudio(\'' + accId + '\', \'ar\', this, \'' + audioAR + '\')">' +
            '<div class="audio-player-circle">' + svgAR + '</div>' +
            '<span class="audio-player-lbl" data-tts-label-ar>' + (i18n[lang]['btn-ar'] || 'Arabe') + '</span>' +
          '</button>' +
        '</div>';
    }

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
      return html;
    }

    let pillsHTML;
    if (!hasSunnah) {
      pillsHTML = buildPillsHTML([
        { key: 'fr', labelKey: 'size-fr', fallback: 'Traduction' },
        { key: 'ph', labelKey: 'size-ph', fallback: 'Phonétique' },
        { key: 'ar', labelKey: 'size-ar', fallback: 'Arabe' },
      ]);
    } else {
      pillsHTML = buildPillsHTML([
        { key: 'sn', labelKey: 'size-fr', fallback: 'Texte' },
      ]);
    }

    panel.innerHTML = pillsHTML;
    document.body.appendChild(panel);

    inner.appendChild(bar);
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

  // Overlay pour fermer le settings flottant
  const overlay = document.createElement('div');
  overlay.id = 'settings-overlay';
  overlay.className = 'settings-overlay';
  overlay.addEventListener('click', closeAllSettings);
  document.body.appendChild(overlay);

  injectAccordionControls();
  applyAllSizeLevels();
  const content = document.querySelector('.inv-content, .page-content');
  if (content) content.classList.add('fade-in');
});
