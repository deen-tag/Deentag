// ===== DEENTAG — SCRIPT PARTAGÉ =====

const i18n = {
  fr: {
    selection:"Sélection", back:"Retour",
    "cat-repas":"Repas","cat-reveil":"Réveil\nCouché","cat-tristesse":"Tristesse",
    "cat-toilettes":"Toilettes","cat-ablution":"Ablution","cat-maison":"Maison",
    "cat-enfants":"Enfants","cat-transport":"Transport",
    "cat-soon":"Bientôt", coming:"disponible",
  },
  en: {
    selection:"Selection", back:"Back",
    "cat-repas":"Meals","cat-reveil":"Wake\nSleep","cat-tristesse":"Sadness",
    "cat-toilettes":"Restroom","cat-ablution":"Ablution","cat-maison":"Home",
    "cat-enfants":"Children","cat-transport":"Transport",
    "cat-soon":"Coming", coming:"soon",
  },
  es: {
    selection:"Selección", back:"Volver",
    "cat-repas":"Comidas","cat-reveil":"Despertar\nDormir","cat-tristesse":"Tristeza",
    "cat-toilettes":"Baño","cat-ablution":"Ablución","cat-maison":"Casa",
    "cat-enfants":"Niños","cat-transport":"Transporte",
    "cat-soon":"Pronto", coming:"disponible",
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
});

// ===== THÈME =====
function toggleTheme() {
  const isDay = document.body.classList.contains('day');
  document.body.classList.toggle('day', !isDay);
  document.body.classList.toggle('night', isDay);
  const knob = document.getElementById('theme-knob');
  if (knob) knob.textContent = isDay ? '🌙' : '☀️';
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

// ===== TEXT-TO-SPEECH =====
const langVoiceMap = { 'fr':'fr-FR', 'en':'en-US', 'es':'es-ES', 'ar':'ar-SA' };
let currentTTSBtn = null;
let isSpeaking = false;

function stopTTS() {
  window.speechSynthesis.cancel();
  isSpeaking = false;
  if (currentTTSBtn) {
    currentTTSBtn.classList.remove('playing');
    const icon = currentTTSBtn.querySelector('.tts-icon');
    if (icon) icon.textContent = '🔊';
    currentTTSBtn = null;
  }
  document.querySelectorAll('.tts-reading').forEach(el => el.classList.remove('tts-reading'));
}

function toggleTTS(sectionId) {
  const btn = document.getElementById('tts-' + sectionId);
  if (!btn) return;
  const lang = localStorage.getItem('deentag_lang') || 'fr';
  if (isSpeaking && currentTTSBtn === btn) { stopTTS(); return; }
  stopTTS();
  const trEl = document.getElementById(sectionId + '-tr-' + lang);
  const phEl = document.getElementById(sectionId + '-ph-' + lang);
  const arEl = document.getElementById(sectionId + '-ar-' + lang);
  if (!trEl && !phEl && !arEl) return;
  isSpeaking = true;
  currentTTSBtn = btn;
  btn.classList.add('playing');
  const icon = btn.querySelector('.tts-icon');
  if (icon) icon.textContent = '⏹';
  const langCode = langVoiceMap[lang] || 'fr-FR';
  const arCode = langVoiceMap['ar'];
  const parts = [];
  if (trEl && trEl.textContent.trim()) parts.push({ el: trEl, lang: langCode });
  if (phEl && phEl.textContent.trim()) parts.push({ el: phEl, lang: langCode });
  if (arEl && arEl.textContent.trim()) parts.push({ el: arEl, lang: arCode });
  let idx = 0;
  function speakNext() {
    document.querySelectorAll('.tts-reading').forEach(el => el.classList.remove('tts-reading'));
    if (idx >= parts.length || !isSpeaking) { stopTTS(); return; }
    const part = parts[idx++];
    part.el.classList.add('tts-reading');
    const utt = new SpeechSynthesisUtterance(part.el.textContent.trim());
    utt.lang = part.lang;
    utt.rate = 0.85;
    utt.onend = speakNext;
    utt.onerror = stopTTS;
    window.speechSynthesis.speak(utt);
  }
  speakNext();
}

window.addEventListener('beforeunload', stopTTS);
window.addEventListener('pagehide', stopTTS);

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('deentag_theme') || 'day';
  document.body.classList.add(savedTheme);
  const knob = document.getElementById('theme-knob');
  if (knob) knob.textContent = savedTheme === 'night' ? '🌙' : '☀️';
  const savedLang = localStorage.getItem('deentag_lang') || detectLang();
  applyLang(savedLang);
});
