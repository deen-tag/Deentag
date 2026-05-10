// ===== DEENTAG — INDEX SCRIPT =====

const CAT_DATA = {
  repas: {
    icon:'images/repas.png',
    fr:'Repas', en:'Meals', es:'Comidas',
    items:[
      {id:'acc1', fr:'Avant de manger',      en:'Before eating',        es:'Antes de comer',       sub_fr:'Bismillah',                sub_en:'Bismillah',             sub_es:'Bismillah'},
      {id:'acc2', fr:'Oubli du Bismillah',   en:'Forgot Bismillah',     es:'Olvidé el Bismillah',  sub_fr:'Si tu oublies',            sub_en:'If forgotten',          sub_es:'Si olvidaste'},
      {id:'acc3', fr:'Après avoir mangé',    en:'After eating',         es:'Después de comer',     sub_fr:'Al-hamdulillah',           sub_en:'Al-hamdulillah',        sub_es:'Al-hamdulillah'},
      {id:'acc4', fr:'Sunnahs du Prophète ﷺ',en:'Prophet\'s Sunnahs ﷺ', es:'Sunnahs del Profeta ﷺ',sub_fr:'Pratiques recommandées',   sub_en:'Recommended practices', sub_es:'Prácticas recomendadas', sunnah:true}
    ]
  },
  reveil: {
    icon:'images/lit.png',
    fr:'Réveil & Couché', en:'Wake & Sleep', es:'Despertar & Dormir',
    items:[
      {id:'acc1', fr:'Au réveil',            en:'Upon waking',          es:'Al despertar',         sub_fr:'Au lever du sommeil',      sub_en:'When waking up',        sub_es:'Al despertarse'},
      {id:'acc2', fr:'Avant de dormir',      en:'Before sleeping',      es:'Antes de dormir',      sub_fr:'Invocation du coucher',    sub_en:'Bedtime supplication',  sub_es:'Invocación al acostarse'},
      {id:'acc3', fr:'Variante complète',    en:'Complete variant',     es:'Variante completa',    sub_fr:'Version longue',           sub_en:'Extended version',      sub_es:'Versión larga'},
      {id:'acc4', fr:'Sunnahs du Prophète ﷺ',en:'Prophet\'s Sunnahs ﷺ', es:'Sunnahs del Profeta ﷺ',sub_fr:'Pratiques recommandées',   sub_en:'Recommended practices', sub_es:'Prácticas recomendadas', sunnah:true}
    ]
  },
  ablution: {
    icon:'images/ablution.png',
    fr:'Ablution', en:'Ablution', es:'Ablución',
    items:[
      {id:'acc1', fr:'Avant le wudu',        en:'Before wudu',          es:'Antes del wudu',       sub_fr:'Niyyah & Basmala',         sub_en:'Intention & Basmala',   sub_es:'Niyyah & Basmala'},
      {id:'acc2', fr:'Shahada après wudu',   en:'Shahada after wudu',   es:'Shahada tras wudu',    sub_fr:'Témoignage de foi',        sub_en:'Testimony of faith',    sub_es:'Testimonio de fe'},
      {id:'acc3', fr:'Dou\'a complète après',en:'Full dua after wudu',  es:'Dua completa',         sub_fr:'Très récompensée',         sub_en:'Highly rewarded',       sub_es:'Muy recompensada'},
      {id:'acc4', fr:'Sunnahs du Prophète ﷺ',en:'Prophet\'s Sunnahs ﷺ', es:'Sunnahs del Profeta ﷺ',sub_fr:'Pratiques recommandées',   sub_en:'Recommended practices', sub_es:'Prácticas recomendadas', sunnah:true}
    ]
  },
  toilettes: {
    icon:'images/wc.png',
    fr:'Toilettes', en:'Restroom', es:'Baño',
    items:[
      {id:'acc1', fr:'Avant d\'entrer',      en:'Before entering',      es:'Antes de entrar',      sub_fr:'Protection contre le mal', sub_en:'Protection from evil',  sub_es:'Protección del mal'},
      {id:'acc2', fr:'Après être sorti',     en:'After leaving',        es:'Al salir',             sub_fr:'Ghufraanak',               sub_en:'Ghufraanak',            sub_es:'Ghufraanak'},
      {id:'acc3', fr:'Sunnahs du Prophète ﷺ',en:'Prophet\'s Sunnahs ﷺ', es:'Sunnahs del Profeta ﷺ',sub_fr:'Pratiques recommandées',   sub_en:'Recommended practices', sub_es:'Prácticas recomendadas', sunnah:true}
    ]
  },
  maison: {
    icon:'images/maison.png',
    fr:'Maison', en:'Home', es:'Casa',
    items:[
      {id:'acc1', fr:'En entrant',           en:'Entering home',        es:'Al entrar',            sub_fr:'Invocation d\'entrée',     sub_en:'Entry supplication',    sub_es:'Invocación de entrada'},
      {id:'acc2', fr:'Variante recommandée', en:'Recommended variant',  es:'Variante recomendada', sub_fr:'Version plus complète',    sub_en:'More complete version', sub_es:'Versión más completa'},
      {id:'acc3', fr:'En sortant',           en:'When leaving',         es:'Al salir',             sub_fr:'Tawakkul sur Allah',       sub_en:'Trust in Allah',        sub_es:'Tawakkul en Allah'},
      {id:'acc4', fr:'Protection égarement', en:'Protection straying',  es:'Protección extravío',  sub_fr:'Contre l\'égarement',      sub_en:'Against going astray',  sub_es:'Contra el extravío'}
    ]
  },
  tristesse: {
    icon:'images/tristesse.png',
    fr:'Tristesse', en:'Sadness', es:'Tristeza',
    items:[
      {id:'acc1', fr:'Tristesse & chagrin',  en:'Sadness & grief',      es:'Tristeza & pena',      sub_fr:'Pour les moments difficiles',sub_en:'For difficult moments', sub_es:'Para momentos difíciles'},
      {id:'acc2', fr:'Dua du Coran',         en:'Quranic dua',          es:'Dua coránica',         sub_fr:'Printemps du cœur',        sub_en:'Spring of the heart',   sub_es:'Primavera del corazón'},
      {id:'acc3', fr:'Sunnahs du Prophète ﷺ',en:'Prophet\'s Sunnahs ﷺ', es:'Sunnahs del Profeta ﷺ',sub_fr:'Pratiques recommandées',   sub_en:'Recommended practices', sub_es:'Prácticas recomendadas', sunnah:true}
    ]
  },
  enfants: {
    icon:'images/enfants.png',
    fr:'Enfants', en:'Children', es:'Niños',
    items:[
      {id:'acc1', fr:'Protéger ses enfants', en:'Protecting children',  es:'Proteger a los hijos', sub_fr:'Invocation principale',    sub_en:'Main supplication',     sub_es:'Invocación principal'},
      {id:'acc2', fr:'Enfant unique',        en:'Only child',           es:'Hijo único',           sub_fr:'Variante spécifique',      sub_en:'Specific variant',      sub_es:'Variante específica'},
      {id:'acc3', fr:'Sunnahs — Protections ﷺ',en:'Sunnahs — Protections ﷺ',es:'Sunnahs — Protecciones ﷺ',sub_fr:'Pratiques recommandées',sub_en:'Recommended practices',sub_es:'Prácticas recomendadas', sunnah:true}
    ]
  },
  transport: {
    icon:'images/voiture.png',
    fr:'Transport', en:'Transport', es:'Transporte',
    items:[
      {id:'acc1', fr:'Prendre un transport', en:'Boarding transport',   es:'Tomar transporte',     sub_fr:'Subhâna alladhî',          sub_en:'Subhâna alladhî',       sub_es:'Subhâna alladhî'},
      {id:'acc2', fr:'Longs trajets',        en:'Long journeys',        es:'Viajes largos',        sub_fr:'Variante complète',        sub_en:'Complete variant',      sub_es:'Variante completa'},
      {id:'acc3', fr:'Sunnahs du Prophète ﷺ',en:'Prophet\'s Sunnahs ﷺ', es:'Sunnahs del Profeta ﷺ',sub_fr:'Pratiques recommandées',   sub_en:'Recommended practices', sub_es:'Prácticas recomendadas', sunnah:true}
    ]
  }
};

let currentCat = null;

// ===== BOTTOM SHEET =====

function renderSheetItems(cat) {
  const d = CAT_DATA[cat];
  const list = document.getElementById('bsList');
  list.innerHTML = '';
  const lang = currentLang;
  const count = d.items.length;
  list.className = 'bs-grid' + (count === 3 ? ' cols-3' : '');

  d.items.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'sub-card deen-card' + (item.sunnah ? ' sunnah-card' : '');
    el.innerHTML =
      '<div class="sub-card-num">' + String(i+1).padStart(2,'0') + '</div>' +
      '<div class="sub-card-title">' + (item[lang] || item.fr) + '</div>' +
      '<div class="sub-card-sub">' + (item['sub_'+lang] || item.sub_fr) + '</div>';
    el.addEventListener('click', () => navigateTo(cat, item.id));
    list.appendChild(el);
    setTimeout(() => el.classList.add('show'), 10 + i * 45);
  });
}

function navigateTo(cat, accId) {
  sessionStorage.setItem('deentag_return_cat', cat);
  const sheet = document.getElementById('bottomSheet');
  sheet.style.transition = 'transform 0.3s cubic-bezier(0.4,0,1,1)';
  sheet.style.transform = 'translateY(100%)';
  document.getElementById('bsOverlay').classList.remove('active');
  setTimeout(() => {
    document.body.style.animation = 'pageSlideOut 0.25s ease forwards';
    setTimeout(() => {
      window.location.href = cat + '.html?open=' + accId;
    }, 200);
  }, 200);
}

function closeSheet() {
  currentCat = null;
  document.getElementById('bsOverlay').classList.remove('active');
  document.getElementById('bottomSheet').classList.remove('open');
  document.body.style.overscrollBehavior = '';
  setTimeout(() => { document.getElementById('bottomSheet').style.transition = ''; }, 400);
}

// Swipe down pour fermer
let startY = 0;
let isDragging = false;

window.addEventListener('DOMContentLoaded', () => {
  const sheet = document.getElementById('bottomSheet');
  if (!sheet) return;

  sheet.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
    isDragging = true;
  }, {passive:true});

  sheet.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const dy = e.touches[0].clientY - startY;
    if (dy > 0 && sheet.scrollTop === 0) e.preventDefault();
  }, {passive:false});

  sheet.addEventListener('touchend', e => {
    isDragging = false;
    const dy = e.changedTouches[0].clientY - startY;
    if (dy > 70) closeSheet();
  }, {passive:true});

  // Rouvrir le sheet si retour depuis une page invocation
  const returnCat = sessionStorage.getItem('deentag_return_cat');
  if (returnCat && CAT_DATA[returnCat]) {
    sessionStorage.removeItem('deentag_return_cat');
    setTimeout(() => openSheet(returnCat), 120);
  }

  // Paramètre URL ?sheet=cat
  const params = new URLSearchParams(window.location.search);
  const sheetCat = params.get('sheet');
  if (sheetCat && CAT_DATA[sheetCat]) {
    setTimeout(() => openSheet(sheetCat), 120);
  }
});

function openSheet(cat) {
  currentCat = cat;
  const d = CAT_DATA[cat];
  if (!d) return;
  document.getElementById('bsIcon').src = d.icon;
  document.getElementById('bsTitle').textContent = d[currentLang] || d.fr;
  renderSheetItems(cat);
  applyLangBlocks(currentLang);
  document.getElementById('bsOverlay').classList.add('active');
  document.getElementById('bottomSheet').classList.add('open');
  document.body.style.overscrollBehavior = 'none';
}

// Fix retour navigateur
window.addEventListener('pageshow', () => {
  document.body.style.overflow = '';
  document.body.style.overscrollBehavior = '';
  document.body.style.height = '';
});
