// ===== DEENTAG — SCRIPT PARTAGÉ =====

const i18n = {
  fr: {
    selection:"Sélection", invocation:"INVOCATION", invocation2:"Invocation",
    back:"Retour",
    "cat-repas":"Repas","cat-reveil":"Réveil\nCouché","cat-tristesse":"Tristesse",
    "cat-toilettes":"Toilettes","cat-ablution":"Ablution","cat-maison":"Maison",
    "cat-enfants":"Enfants","cat-transport":"Transport",
    "cat-soon":"Bientôt", coming:"disponible",
  },
  en: {
    selection:"Selection", invocation:"INVOCATION", invocation2:"Invocation",
    back:"Back",
    "cat-repas":"Meals","cat-reveil":"Wake\nSleep","cat-tristesse":"Sadness",
    "cat-toilettes":"Restroom","cat-ablution":"Ablution","cat-maison":"Home",
    "cat-enfants":"Children","cat-transport":"Transport",
    "cat-soon":"Coming", coming:"soon",
  },
  es: {
    selection:"Selección", invocation:"INVOCACIÓN", invocation2:"Invocación",
    back:"Volver",
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
}

function setLang(lang) {
  applyLang(lang);
  toggleLangMenu();
}

function toggleLangMenu() {
  const m = document.getElementById('lang-menu');
  if (m) m.classList.toggle('open');
}

function toggleTheme() {
  const isDay = document.body.classList.contains('day');
  document.body.classList.toggle('day', !isDay);
  document.body.classList.toggle('night', isDay);
  const knob = document.getElementById('theme-knob');
  if (knob) knob.textContent = isDay ? '🌙' : '☀️';
  localStorage.setItem('deentag_theme', isDay ? 'night' : 'day');
}

// Close lang menu on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('#lang-btn') && !e.target.closest('#lang-menu')) {
    const m = document.getElementById('lang-menu');
    if (m) m.classList.remove('open');
  }
});

// Init on load
window.addEventListener('DOMContentLoaded', () => {
  // Theme
  const savedTheme = localStorage.getItem('deentag_theme') || 'day';
  document.body.classList.add(savedTheme);
  const knob = document.getElementById('theme-knob');
  if (knob) knob.textContent = savedTheme === 'night' ? '🌙' : '☀️';

  // Lang
  const savedLang = localStorage.getItem('deentag_lang') || detectLang();
  applyLang(savedLang);

  // Fade in content
  const content = document.querySelector('.inv-content, .page-content');
  if (content) {
    content.classList.add('fade-in');
  }
});
