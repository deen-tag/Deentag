// ===== DEENTAG — INDEX.JS v8 =====

var currentCat = null;
var currentAccId = null;
var sheetTransitioning = false;

function getLang() {
  return localStorage.getItem('deentag_lang') || 'fr';
}

function getSheetItems(cat) {
  if (!window.DUAS || !DUAS[cat]) return [];
  const lang = getLang();
  return Object.keys(DUAS[cat])
    .filter(k => k !== 'meta')
    .map(accId => {
      const dua = DUAS[cat][accId];
      return {
        id: accId,
        titre: dua.titre ? (dua.titre[lang] || dua.titre.fr) : accId,
        sub: dua.sheet ? (dua.sheet['sub_' + lang] || dua.sheet.sub_fr || '') : '',
        sunnah: !!dua.sunnah
      };
    });
}

function renderSheetItems(cat) {
  const items = getSheetItems(cat);
  const list = document.getElementById('bsList');
  if (!list) return;
  list.innerHTML = '';
  list.className = 'bs-grid';
  items.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'sub-card' + (item.sunnah ? ' sunnah-card' : '');
    el.innerHTML =
      '<div class="sub-card-title">' + item.titre + '</div>' +
      '<div class="sub-card-sub">' + item.sub + '</div>';
    el.addEventListener('click', () => openDua(cat, item.id));
    list.appendChild(el);
    setTimeout(() => el.classList.add('show'), 20 + i * 50);
  });
}

function openSheet(cat) {
  if (!window.DUAS || !DUAS[cat]) { console.error('DUAS manquant:', cat); return; }
  currentCat = cat;
  currentAccId = null;
  if (typeof stopAudio === 'function') stopAudio();
  document.querySelectorAll('.settings-panel').forEach(p => p.remove());

  const listView = document.getElementById('listView');
  const duaView  = document.getElementById('duaView');
  const sheet    = document.getElementById('bottomSheet');
  if (listView) listView.style.display = 'block';
  if (duaView)  duaView.style.display  = 'none';
  if (sheet) {
    sheet.style.height = '';
    sheet.style.maxHeight = '88vh';
    sheet.style.borderRadius = '24px 24px 0 0';
    sheet.style.overflowY = 'auto';
  }

  const lang = getLang();
  const meta = DUAS[cat].meta;
  const bsIcon  = document.getElementById('bsIcon');
  const bsTitle = document.getElementById('bsTitle');
  if (bsIcon)  bsIcon.src = meta.icon || '';
  if (bsTitle) bsTitle.textContent = meta.titre[lang] || meta.titre.fr;

  renderSheetItems(cat);
  if (typeof applyLangBlocks === 'function') applyLangBlocks(lang);

  document.getElementById('bsOverlay').classList.add('active');
  sheet.classList.add('open');
  document.body.style.overscrollBehavior = 'none';
  document.documentElement.style.overscrollBehavior = 'none';
}

function closeSheet() {
  if (typeof stopAudio === 'function') stopAudio();
  document.querySelectorAll('.settings-panel').forEach(p => p.remove());
  const sizeMenuC = document.getElementById('duaSizeMenu');
  if (sizeMenuC) sizeMenuC.classList.remove('open');

  const sheet    = document.getElementById('bottomSheet');
  const listView = document.getElementById('listView');
  const duaView  = document.getElementById('duaView');

  // Fade out vue active
  const activeView = currentAccId ? duaView : listView;
  if (activeView) {
    activeView.style.transition = 'opacity 0.15s ease';
    activeView.style.opacity = '0';
  }

  setTimeout(() => {
    currentCat = null;
    currentAccId = null;
    document.getElementById('bsOverlay').classList.remove('active');
    if (sheet) {
      sheet.classList.remove('open');
      sheet.style.height = sheet.style.maxHeight = sheet.style.borderRadius = sheet.style.overflowY = '';
      sheet.style.top = sheet.style.position = '';
    }
    // Reset opacités
    if (listView) { listView.style.opacity = ''; listView.style.transition = ''; }
    if (duaView)  { duaView.style.opacity  = ''; duaView.style.transition  = ''; }
    document.body.style.overscrollBehavior = '';
    document.documentElement.style.overscrollBehavior = '';
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

  // 1. Fade out liste
  listView.style.transition = 'opacity 0.15s ease';
  listView.style.opacity = '0';

  setTimeout(() => {
    // 2. Swap
    listView.style.display = 'none';
    listView.style.opacity = '';
    listView.style.transition = '';

    // 3. Monter sheet + préparer dua
    renderDua(cat, accId);
    duaView.style.display = 'flex';
    duaView.style.opacity = '0';
    duaView.style.transition = '';

    if (sheet) {
      sheet.style.transition = 'height 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      sheet.style.height = 'calc(100dvh - 16px)';
      sheet.style.maxHeight = 'calc(100dvh - 16px)';
      sheet.style.borderRadius = '20px 20px 0 0';
      sheet.style.overflowY = 'hidden';
      sheet.style.top = '16px';
      sheet.style.position = 'fixed';
    }

    const lang = getLang();
    const backLabel = document.getElementById('duaBackLabel');
    if (backLabel) backLabel.textContent = DUAS[cat].meta.titre[lang] || DUAS[cat].meta.titre.fr;
    const catIcon = document.getElementById('duaCatIcon');
    if (catIcon) catIcon.src = DUAS[cat].meta.icon || '';

    // 4. Fade in dua après montée
    setTimeout(() => {
      duaView.style.transition = 'opacity 0.2s ease';
      duaView.style.opacity = '1';
      setTimeout(() => {
        duaView.style.transition = '';
        sheetTransitioning = false;
      }, 200);
    }, 200);
  }, 150);
}

function backToList() {
  if (sheetTransitioning) return;
  sheetTransitioning = true;
  if (typeof stopAudio === 'function') stopAudio();
  document.querySelectorAll('.settings-panel').forEach(p => p.remove());
  const sizeMenu = document.getElementById('duaSizeMenu');
  if (sizeMenu) sizeMenu.classList.remove('open');

  const listView = document.getElementById('listView');
  const duaView  = document.getElementById('duaView');
  const sheet    = document.getElementById('bottomSheet');

  // 1. Fade out dua
  duaView.style.transition = 'opacity 0.15s ease';
  duaView.style.opacity = '0';

  setTimeout(() => {
    // 2. Swap
    currentAccId = null;
    duaView.style.display = 'none';
    duaView.style.opacity = '';
    duaView.style.transition = '';

    // 3. Descendre sheet + préparer liste
    renderSheetItems(currentCat);
    listView.style.display = 'block';
    listView.style.opacity = '0';
    listView.style.transition = '';

    if (sheet) {
      sheet.style.transition = 'height 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      sheet.style.height = '';
      sheet.style.maxHeight = '88vh';
      sheet.style.borderRadius = '24px 24px 0 0';
      sheet.style.overflowY = 'auto';
      sheet.style.top = '';
      sheet.style.position = '';
    }

    if (typeof applyLangBlocks === 'function') applyLangBlocks(getLang());

    // 4. Fade in liste après descente
    setTimeout(() => {
      listView.style.transition = 'opacity 0.2s ease';
      listView.style.opacity = '1';
      setTimeout(() => {
        listView.style.transition = '';
        sheetTransitioning = false;
      }, 200);
    }, 200);
  }, 150);
}

function renderDua(cat, accId) {
  const duaScroll = document.getElementById('duaScroll');
  if (!duaScroll) return;
  duaScroll.innerHTML = '';
  duaScroll.scrollTop = 0;

  const dua = DUAS[cat][accId];
  const lang = getLang();
  const isSunnah = !!dua.sunnah;

  const acc = document.createElement('div');
  acc.className = 'accordion open';
  acc.id = accId;
  acc.setAttribute('data-dua-page', cat);

  if (isSunnah) {
    let sunHtml = { fr: '', en: '', es: '' };
    ['fr','en','es'].forEach(l => {
      (dua.items[l] || []).forEach(item => {
        sunHtml[l] += '<div class="sunnah-item"><div class="sunnah-title">' + item.titre + '</div><div class="sunnah-text">' + item.texte + '</div></div>';
      });
    });
    acc.innerHTML =
      '<div class="accordion-header" style="cursor:default;pointer-events:none"><div class="accordion-title">' +
        '<span class="lang-block" data-lang-block="fr">' + (dua.titre.fr||'') + '</span>' +
        '<span class="lang-block" data-lang-block="en">' + (dua.titre.en||'') + '</span>' +
        '<span class="lang-block" data-lang-block="es">' + (dua.titre.es||'') + '</span>' +
      '</div></div>' +
      '<div class="accordion-body" style="max-height:none;overflow:visible"><div class="accordion-inner">' +
        '<div class="lang-block" data-lang-block="fr">' + sunHtml.fr + '</div>' +
        '<div class="lang-block" data-lang-block="en">' + sunHtml.en + '</div>' +
        '<div class="lang-block" data-lang-block="es">' + sunHtml.es + '</div>' +
      '</div></div>';
  } else {
    const ph = dua.phonetique || {};
    const tr = dua.traduction || {};
    const hd = dua.hadith || {};
    const ar = dua.arabe || '';
    const phL = l => (ph[l]||'').replace(/\n/g,'<br>');
    const hdB = l => hd[l] ? '<div class="hadith-block">'+hd[l]+'</div>' : '';

    const langBlock = l =>
      '<div class="lang-block" data-lang-block="'+l+'">' +
        '<div class="translation-block" id="'+accId+'-tr-'+l+'">'+(tr[l]||'')+'</div>' +
        '<div class="phonetic-block"    id="'+accId+'-ph-'+l+'">'+phL(l)+'</div>' +
        '<div class="arabic-block"      id="'+accId+'-ar-'+l+'">'+ar+'</div>' +
        hdB(l) +
      '</div>';

    acc.innerHTML =
      '<div class="accordion-header" style="cursor:default;pointer-events:none"><div class="accordion-title">' +
        '<span class="lang-block" data-lang-block="fr">'+(dua.titre.fr||'')+'</span>' +
        '<span class="lang-block" data-lang-block="en">'+(dua.titre.en||'')+'</span>' +
        '<span class="lang-block" data-lang-block="es">'+(dua.titre.es||'')+'</span>' +
      '</div></div>' +
      '<div class="accordion-body" style="max-height:none;overflow:visible"><div class="accordion-inner">' +
        langBlock('fr') + langBlock('en') + langBlock('es') +
      '</div></div>';
  }

  const closing = document.createElement('div');
  closing.className = 'closing-dua';
  const cd = DUAS[cat].meta.closingDua || {};
  closing.innerHTML =
    '<span class="lang-block" data-lang-block="fr">'+(cd.fr||'')+'</span>' +
    '<span class="lang-block" data-lang-block="en">'+(cd.en||'')+'</span>' +
    '<span class="lang-block" data-lang-block="es">'+(cd.es||'')+'</span>';

  duaScroll.appendChild(acc);
  duaScroll.appendChild(closing);

  if (typeof applyLangBlocks      === 'function') applyLangBlocks(lang);
  if (typeof applyAllSizeLevels   === 'function') applyAllSizeLevels();
  if (typeof injectAccordionControls === 'function') injectAccordionControls();
}

function handleNfcParams() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  const acc  = params.get('acc');
  if (page && window.DUAS && DUAS[page]) {
    setTimeout(() => {
      openSheet(page);
      if (acc && DUAS[page][acc]) setTimeout(() => openDua(page, acc), 120);
    }, 180);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const sheet = document.getElementById('bottomSheet');
  if (!sheet) return;
  let startY = 0;
  let swipeDY = 0;
  let swipeActive = false;

  sheet.addEventListener('touchstart', e => {
    if (sheetTransitioning) return;
    startY = e.touches[0].clientY;
    swipeDY = 0;
    swipeActive = true;
    sheet.style.transition = 'none';
  }, { passive: true });

  sheet.addEventListener('touchmove', e => {
    if (!swipeActive || sheetTransitioning) return;
    const dy = e.touches[0].clientY - startY;
    if (dy <= 0) return;

    // Bloquer swipe si le contenu scrollable n'est pas tout en haut
    const scrollEl = currentAccId
      ? document.getElementById('duaScroll')
      : document.getElementById('bottomSheet');
    if (scrollEl && scrollEl.scrollTop > 2) return;

    swipeDY = dy;
    const drag = dy > 80 ? 80 + (dy - 80) * 0.3 : dy;
    sheet.style.transform = 'translateY(' + drag + 'px)';

    // Fade progressif
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

  sheet.addEventListener('touchend', e => {
    if (!swipeActive || sheetTransitioning) return;
    swipeActive = false;

    const dv = document.getElementById('duaView');
    const lv = document.getElementById('listView');
    const overlay = document.getElementById('bsOverlay');
    if (dv) dv.style.opacity = '';
    if (lv) lv.style.opacity = '';
    if (overlay) overlay.style.background = '';

    if (swipeDY > 100) {
      // Swipe suffisant — déclencher l'action
      sheet.style.transition = '';
      sheet.style.transform = '';
      if (currentAccId) {
        backToList();
      } else {
        closeSheet();
      }
    } else {
      // Swipe insuffisant — remonter doucement en place
      sheet.style.transition = 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      sheet.style.transform = 'translateY(0)';
      setTimeout(() => {
        sheet.style.transition = 'none';
        sheet.style.transform = '';
      }, 360);
    }
  }, { passive: true });
  handleNfcParams();
});

// ===== MENU ⋮ → ouvre les réglages du dua courant =====
function toggleDuaMenu() {
  if (!currentAccId) return;
  if (typeof toggleAccSettings === 'function') toggleAccSettings(currentAccId);
}
