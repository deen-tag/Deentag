/* ============================================================
   DEENTAG v2 — APP.JS MODULAIRE
   Gestion d'état centralisée + logique métier
   ============================================================ */

// ===== STATE MANAGER =====
const AppState = {
  theme: localStorage.getItem('deentag_theme') || 'day',
  lang: localStorage.getItem('deentag_lang') || 'fr',
  isKids: localStorage.getItem('deentag_kids') === 'on',
  currentView: 'list', // 'list' ou 'dua'
  currentCategory: null,
  currentDua: null,
  textSize: localStorage.getItem('deentag_textsize') || 'moyen',
  
  save() {
    localStorage.setItem('deentag_theme', this.theme);
    localStorage.setItem('deentag_lang', this.lang);
    localStorage.setItem('deentag_kids', this.isKids ? 'on' : 'off');
    localStorage.setItem('deentag_textsize', this.textSize);
  },
  
  setTheme(t) {
    this.theme = t;
    this.save();
    this.applyTheme();
  },
  
  setLang(l) {
    this.lang = l;
    this.save();
    this.applyLang();
  },
  
  toggleKids() {
    this.isKids = !this.isKids;
    this.save();
    this.applyTheme();
  },
  
  applyTheme() {
    const body = document.body;
    body.classList.remove('theme-day', 'theme-night', 'theme-kids');
    
    if (this.isKids) {
      body.classList.add('theme-kids');
    } else {
      body.classList.add(`theme-${this.theme}`);
    }
  },
  
  applyLang() {
    document.querySelectorAll('.lang-hidden').forEach(el => {
      el.classList.remove('lang-visible');
      el.classList.add('lang-hidden');
    });
    
    document.querySelectorAll(`[data-lang-block="${this.lang}"]`).forEach(el => {
      el.classList.remove('lang-hidden');
      el.classList.add('lang-visible');
    });
    
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.textContent = this.lang.toUpperCase() + ' ▾';
  }
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  AppState.applyTheme();
  AppState.applyLang();
  setupEventListeners();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Theme toggle
  const themeBtn = document.getElementById('theme-circle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const newTheme = AppState.theme === 'day' ? 'night' : 'day';
      AppState.setTheme(newTheme);
    });
  }
  
  // Kids mode
  const kidsBtn = document.querySelector('.kids-circle');
  if (kidsBtn) {
    kidsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      AppState.toggleKids();
    });
  }
  
  // Language menu
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    langBtn.addEventListener('click', toggleLangMenu);
  }
  
  // Category cards
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      openSheet(category);
    });
  });
  
  // Bottom sheet overlay
  const overlay = document.getElementById('bsOverlay');
  if (overlay) {
    overlay.addEventListener('click', closeSheet);
  }
  
  // Close button
  const closeBtn = document.querySelector('.dua-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      AppState.currentView = 'list';
      updateBottomSheet();
    });
  }
}

// ===== LANGUAGE MENU =====
function toggleLangMenu() {
  const menu = document.getElementById('lang-menu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

function setLang(lang) {
  AppState.setLang(lang);
  const menu = document.getElementById('lang-menu');
  if (menu) {
    menu.classList.remove('active');
  }
}

// ===== BOTTOM SHEET =====
function openSheet(category) {
  AppState.currentCategory = category;
  AppState.currentView = 'list';
  updateBottomSheet();
  
  const overlay = document.getElementById('bsOverlay');
  const sheet = document.getElementById('bottomSheet');
  if (overlay && sheet) {
    overlay.classList.add('active');
    sheet.classList.add('active');
  }
}

function closeSheet() {
  const overlay = document.getElementById('bsOverlay');
  const sheet = document.getElementById('bottomSheet');
  if (overlay && sheet) {
    overlay.classList.remove('active');
    sheet.classList.remove('active');
  }
}

function updateBottomSheet() {
  const listView = document.getElementById('listView');
  const duaView = document.getElementById('duaView');
  
  if (AppState.currentView === 'list') {
    if (listView) listView.classList.remove('hidden');
    if (duaView) duaView.classList.add('hidden');
    renderCategoryList();
  } else if (AppState.currentView === 'dua') {
    if (listView) listView.classList.add('hidden');
    if (duaView) duaView.classList.remove('hidden');
    renderDuaDetail();
  }
}

// ===== RENDER FUNCTIONS =====
function renderCategoryList() {
  const category = DUAS[AppState.currentCategory];
  if (!category) return;
  
  // Update header
  const icon = document.getElementById('bsIcon');
  const title = document.getElementById('bsTitle');
  if (icon) icon.src = category.meta.icon;
  if (title) title.textContent = category.meta.titre[AppState.lang] || category.meta.titre.fr;
  
  // Render duas
  const list = document.getElementById('bsList');
  if (!list) return;
  
  list.innerHTML = '';
  Object.entries(category).forEach(([key, dua]) => {
    if (key === 'meta') return;
    
    const item = document.createElement('div');
    item.className = 'bs-item';
    item.dataset.duaId = key;
    
    const titleEl = document.createElement('div');
    titleEl.className = 'bs-item-title';
    titleEl.textContent = dua.titre[AppState.lang] || dua.titre.fr;
    
    const subEl = document.createElement('div');
    subEl.className = 'bs-item-sub';
    subEl.textContent = dua.phonetique[AppState.lang] || dua.phonetique.fr;
    
    item.appendChild(titleEl);
    item.appendChild(subEl);
    item.addEventListener('click', () => {
      AppState.currentDua = key;
      AppState.currentView = 'dua';
      updateBottomSheet();
    });
    
    list.appendChild(item);
  });
}

function renderDuaDetail() {
  const category = DUAS[AppState.currentCategory];
  const dua = category[AppState.currentDua];
  if (!dua || !dua.arabe) return;
  
  const container = document.getElementById('duaView');
  if (!container) return;
  
  const arabic = container.querySelector('.dua-arabic');
  const phonetic = container.querySelector('.dua-phonetic');
  const translation = container.querySelector('.dua-translation');
  const hadith = container.querySelector('.dua-hadith');
  const audioBtn = container.querySelector('.audio-btn');
  
  if (arabic) arabic.textContent = dua.arabe;
  if (phonetic) phonetic.textContent = dua.phonetique[AppState.lang] || dua.phonetique.fr;
  if (translation) translation.textContent = dua.traduction[AppState.lang] || dua.traduction.fr;
  if (hadith) hadith.textContent = dua.hadith[AppState.lang] || dua.hadith.fr;
  
  if (audioBtn && dua.audio) {
    audioBtn.onclick = () => playAudio(dua.audio);
  }
}

// ===== AUDIO PLAYER =====
let currentAudio = null;

function playAudio(filename) {
  if (currentAudio) {
    currentAudio.pause();
  }
  
  currentAudio = new Audio(`Audio/${filename}`);
  currentAudio.play();
}

// ===== UTILITY FUNCTIONS =====
function getTranslation(obj, fallback = '') {
  return obj[AppState.lang] || obj.fr || fallback;
}
