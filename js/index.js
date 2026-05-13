// ===== DEENTAG — INDEX.JS v7 =====
// Sheet + vue dua intégrée — plus de navigation entre pages

let currentCat = null;
let currentAccId = null;

// ===== CONSTRUIRE LES ITEMS DU SHEET DEPUIS DUAS.JS =====
function getSheetItems(cat) {
  if (!window.DUAS || !DUAS[cat]) return [];
  const page = DUAS[cat];
  return Object.keys(page)
    .filter(k => k !== 'meta')
    .map(accId => {
      const dua = page[accId];
      const lang = currentLang;
      return {
        id: accId,
        titre: dua.titre ? (dua.titre[lang] || dua.titre.fr) : accId,
        sub: dua.sheet ? (dua.sheet['sub_' + lang] || dua.sheet.sub_fr) : '',
        sunnah: !!dua.sunnah
      };
    });
}

// ===== RENDER SHEET LISTE =====
function renderSheetItems(cat) {
  const items = getSheetItems(cat);
  const list = document.getElementById('bsList');
  list.innerHTML = '';
  const count = items.length;
  list.className = 'bs-grid' + (count === 3 ? ' cols-3' : '');

  items.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'sub-card' + (item.sunnah ? ' sunnah-card' : '');
    el.innerHTML =
      '<div class="sub-card-num">' + String(i+1).padStart(2,'0') + '</div>' +
      '<div class="sub-card-title">' + item.titre + '</div>' +
      '<div class="sub-card-sub">' + item.sub + '</div>';
    el.addEventListener('click', () => openDua(cat, item.id));
    list.appendChild(el);
    setTimeout(() => el.classList.add('show'), 10 + i * 45);
  });
}

// ===== OUVRIR SHEET =====
function openSheet(cat) {
  currentCat = cat;
  currentAccId = null;
  stopAudio();

  // Réinitialiser en vue liste
  showListView();

  const meta = window.DUAS && DUAS[cat] ? DUAS[cat].meta : null;
  if (meta) {
    document.getElementById('bsIcon').src = meta.icon || '';
    document.getElementById('bsTitle').textContent = meta.titre[currentLang] || meta.titre.fr;
  }

  renderSheetItems(cat);
  applyLangBlocks(currentLang);
  document.getElementById('bsOverlay').classList.add('active');
  document.getElementById('bottomSheet').classList.add('open');
  document.body.style.overscrollBehavior = 'none';
}

// ===== FERMER SHEET =====
function closeSheet() {
  stopAudio();
  currentCat = null;
  currentAccId = null;
  document.getElementById('bsOverlay').classList.remove('active');
  document.getElementById('bottomSheet').classList.remove('open');
  document.getElementById('bottomSheet').style.height = '';
  document.getElementById('bottomSheet').style.borderRadius = '';
  document.body.style.overscrollBehavior = '';
  showListView();
}

// ===== VUE LISTE / VUE DUA =====
function showListView() {
  document.getElementById('listView').style.display = '';
  document.getElementById('duaView').style.display = 'none';
  // Réinitialiser taille sheet
  const sheet = document.getElementById('bottomSheet');
  sheet.style.height = '';
  sheet.style.maxHeight = '88vh';
  sheet.style.borderRadius = '24px 24px 0 0';
  sheet.style.overflowY = 'auto';
}

function showDuaView() {
  document.getElementById('listView').style.display = 'none';
  document.getElementById('duaView').style.display = 'flex';
  // Monter en plein écran
  const sheet = document.getElementById('bottomSheet');
  sheet.style.height = '100dvh';
  sheet.style.maxHeight = '100dvh';
  sheet.style.borderRadius = '0';
  sheet.style.overflowY = 'hidden';
}

// ===== OUVRIR UNE DUA =====
function openDua(cat, accId) {
  currentAccId = accId;
  stopAudio();
  showDuaView();

  // Label retour
  const meta = window.DUAS && DUAS[cat] ? DUAS[cat].meta : null;
  if (meta) {
    document.getElementById('duaBackLabel').textContent = meta.titre[currentLang] || meta.titre.fr;
  }

  // Injecter le contenu de la dua
  renderDua(cat, accId);
}

// ===== RETOUR VERS LA LISTE =====
function backToList() {
  stopAudio();
  currentAccId = null;
  // Nettoyer les panels settings qui appartiennent à cette dua
  document.querySelectorAll('.settings-panel').forEach(p => p.remove());
  showListView();
  renderSheetItems(currentCat);
  applyLangBlocks(currentLang);
}

// ===== RENDER DUA =====
function renderDua(cat, accId) {
  const duaScroll = document.getElementById('duaScroll');
  duaScroll.innerHTML = '';
  duaScroll.scrollTop = 0;

  if (!window.DUAS || !DUAS[cat] || !DUAS[cat][accId]) return;
  const dua = DUAS[cat][accId];
  const lang = currentLang;

  const isSunnah = !!dua.sunnah;
  const phonFr = (dua.phonetique && dua.phonetique.fr || '').replace(/\n/g, '<br>');
  const phonEn = (dua.phonetique && dua.phonetique.en || '').replace(/\n/g, '<br>');
  const phonEs = (dua.phonetique && dua.phonetique.es || '').replace(/\n/g, '<br>');

  // Créer l'accordéon unique (ouvert, sans toggle)
  const acc = document.createElement('div');
  acc.className = 'accordion open';
  acc.id = accId;
  acc.setAttribute('data-dua-page', cat);

  if (isSunnah) {
    let itemsHtml = { fr: '', en: '', es: '' };
    ['fr', 'en', 'es'].forEach(l => {
      const items = dua.items[l] || [];
      items.forEach(item => {
        itemsHtml[l] +=
          '<div class="sunnah-item">' +
            '<div class="sunnah-title">' + item.titre + '</div>' +
            '<div class="sunnah-text">' + item.texte + '</div>' +
          '</div>';
      });
    });
    acc.innerHTML =
      '<div class="accordion-header" style="cursor:default;pointer-events:none">' +
        '<div class="accordion-title">' +
          '<span class="lang-block" data-lang-block="fr">' + (dua.titre.fr||'') + '</span>' +
          '<span class="lang-block" data-lang-block="en">' + (dua.titre.en||'') + '</span>' +
          '<span class="lang-block" data-lang-block="es">' + (dua.titre.es||'') + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="accordion-body" style="max-height:none;overflow:visible">' +
        '<div class="accordion-inner">' +
          '<div class="lang-block" data-lang-block="fr">' + itemsHtml.fr + '</div>' +
          '<div class="lang-block" data-lang-block="en">' + itemsHtml.en + '</div>' +
          '<div class="lang-block" data-lang-block="es">' + itemsHtml.es + '</div>' +
        '</div>' +
      '</div>';
  } else {
    const haditFr = dua.hadith && dua.hadith.fr ? '<div class="hadith-block">' + dua.hadith.fr + '</div>' : '';
    const haditEn = dua.hadith && dua.hadith.en ? '<div class="hadith-block">' + dua.hadith.en + '</div>' : '';
    const haditEs = dua.hadith && dua.hadith.es ? '<div class="hadith-block">' + dua.hadith.es + '</div>' : '';

    acc.innerHTML =
      '<div class="accordion-header" style="cursor:default;pointer-events:none">' +
        '<div class="accordion-title">' +
          '<span class="lang-block" data-lang-block="fr">' + (dua.titre.fr||'') + '</span>' +
          '<span class="lang-block" data-lang-block="en">' + (dua.titre.en||'') + '</span>' +
          '<span class="lang-block" data-lang-block="es">' + (dua.titre.es||'') + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="accordion-body" style="max-height:none;overflow:visible">' +
        '<div class="accordion-inner">' +
          '<div class="lang-block" data-lang-block="fr">' +
            '<div class="translation-block" id="' + accId + '-tr-fr">' + (dua.traduction && dua.traduction.fr || '') + '</div>' +
            '<div class="phonetic-block" id="' + accId + '-ph-fr">' + phonFr + '</div>' +
            '<div class="arabic-block" id="' + accId + '-ar-fr">' + (dua.arabe||'') + '</div>' +
            haditFr +
          '</div>' +
          '<div class="lang-block" data-lang-block="en">' +
            '<div class="translation-block" id="' + accId + '-tr-en">' + (dua.traduction && dua.traduction.en || '') + '</div>' +
            '<div class="phonetic-block" id="' + accId + '-ph-en">' + phonEn + '</div>' +
            '<div class="arabic-block" id="' + accId + '-ar-en">' + (dua.arabe||'') + '</div>' +
            haditEn +
          '</div>' +
          '<div class="lang-block" data-lang-block="es">' +
            '<div class="translation-block" id="' + accId + '-tr-es">' + (dua.traduction && dua.traduction.es || '') + '</div>' +
            '<div class="phonetic-block" id="' + accId + '-ph-es">' + phonEs + '</div>' +
            '<div class="arabic-block" id="' + accId + '-ar-es">' + (dua.arabe||'') + '</div>' +
            haditEs +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // Closing dua
  const meta = DUAS[cat].meta;
  const closingDiv = document.createElement('div');
  closingDiv.className = 'closing-dua';
  if (meta && meta.closingDua) {
    closingDiv.innerHTML =
      '<span class="lang-block" data-lang-block="fr">' + (meta.closingDua.fr||'') + '</span>' +
      '<span class="lang-block" data-lang-block="en">' + (meta.closingDua.en||'') + '</span>' +
      '<span class="lang-block" data-lang-block="es">' + (meta.closingDua.es||'') + '</span>';
  }

  duaScroll.appendChild(acc);
  duaScroll.appendChild(closingDiv);

  // Appliquer langue + tailles + injecter contrôles
  applyLangBlocks(currentLang);
  applyAllSizeLevels();
  injectAccordionControls();
}

// ===== NFC DIRECT : ?page=repas&acc=acc1 =====
function handleNfcParams() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  const acc = params.get('acc');
  if (page && acc && window.DUAS && DUAS[page] && DUAS[page][acc]) {
    setTimeout(() => {
      openSheet(page);
      setTimeout(() => openDua(page, acc), 100);
    }, 150);
  } else if (page && window.DUAS && DUAS[page]) {
    setTimeout(() => openSheet(page), 150);
  }
}

// ===== SWIPE DOWN POUR FERMER =====
let startY = 0;
let isDragging = false;

window.addEventListener('DOMContentLoaded', () => {
  const sheet = document.getElementById('bottomSheet');
  if (!sheet) return;

  sheet.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
    isDragging = true;
  }, { passive: true });

  sheet.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const dy = e.touches[0].clientY - startY;
    // Swipe down seulement en vue liste et si on est en haut
    if (dy > 0 && !currentAccId && sheet.scrollTop === 0) e.preventDefault();
  }, { passive: false });

  sheet.addEventListener('touchend', e => {
    isDragging = false;
    const dy = e.changedTouches[0].clientY - startY;
    if (dy > 70 && !currentAccId) closeSheet();
  }, { passive: true });

  handleNfcParams();
});

window.addEventListener('pageshow', () => {
  document.body.style.overflow = '';
  document.body.style.overscrollBehavior = '';
});
