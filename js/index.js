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

function renderSheetItems(cat, filter) {
  const items = getSheetItems(cat);
  const list = document.getElementById('bsList');
  if (!list) return;
  list.innerHTML = '';
  list.className = 'bs-grid';
  const q = (filter || '').trim().toLowerCase();
  const filtered = q ? items.filter(it => it.titre.toLowerCase().includes(q)) : items;
  if (filtered.length === 0) {
    list.innerHTML = '<div class="bs-no-result"><span class="lang-block" data-lang-block="fr">Aucun résultat</span><span class="lang-block" data-lang-block="en">No results</span><span class="lang-block" data-lang-block="es">Sin resultados</span></div>';
    if (typeof applyLangBlocks === 'function') applyLangBlocks(getLang());
    return;
  }
  filtered.forEach((item, i) => {
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
  if (!window.DUAS || !DUAS[cat]) { return; }
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
  const searchEl = document.getElementById('bsSearch');
  if (searchEl) searchEl.value = '';
  if (typeof applyLangBlocks === 'function') applyLangBlocks(lang);

  document.getElementById('bsOverlay').classList.add('active');
  sheet.classList.add('open');
  document.body.style.overscrollBehavior = 'none';
  document.documentElement.style.overscrollBehavior = 'none';
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
}

function closeSheet(fromSwipe) {
  if (typeof stopAudio === 'function') stopAudio();
  document.querySelectorAll('.settings-panel').forEach(p => p.remove());
  const sizeMenuC = document.getElementById('duaSizeMenu');
  if (sizeMenuC) sizeMenuC.classList.remove('open');

  const sheet    = document.getElementById('bottomSheet');
  const listView = document.getElementById('listView');
  const duaView  = document.getElementById('duaView');

  // Si vient du swipe, le sheet est déjà partiellement descendu
  // On skip le fade et on continue l'animation vers le bas directement
  if (fromSwipe) {
    sheet.style.transition = 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    sheet.style.transform = 'translateY(100%)';
    document.getElementById('bsOverlay').classList.remove('active');
    setTimeout(() => {
      sheet.classList.remove('open');
      sheet.style.transform = '';
      sheet.style.transition = '';
      sheet.style.height = sheet.style.maxHeight = sheet.style.borderRadius = sheet.style.overflowY = '';
      sheet.style.top = sheet.style.position = '';
      if (listView) { listView.style.opacity = ''; listView.style.transition = ''; }
      if (duaView)  { duaView.style.opacity  = ''; duaView.style.transition  = ''; }
      currentCat = null;
      currentAccId = null;
      sheetTransitioning = false;
      document.body.style.overscrollBehavior = '';
      document.documentElement.style.overscrollBehavior = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }, 260);
    return;
  }

  // Fermeture normale — fade out vue active
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
    if (listView) { listView.style.opacity = ''; listView.style.transition = ''; }
    if (duaView)  { duaView.style.opacity  = ''; duaView.style.transition  = ''; }
    document.body.style.overscrollBehavior = '';
    document.documentElement.style.overscrollBehavior = '';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
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
      sheet.style.transition = 'none';
      sheet.style.transform = 'translateY(100%)';
      sheet.style.height = 'calc(100dvh - 16px)';
      sheet.style.maxHeight = 'calc(100dvh - 16px)';
      sheet.style.borderRadius = '20px 20px 0 0';
      sheet.style.overflowY = 'hidden';
      sheet.style.top = '16px';
      sheet.style.position = 'fixed';
      sheet.style.willChange = 'transform';
      requestAnimationFrame(() => {
        sheet.style.transition = 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        sheet.style.transform = 'translateY(0)';
      });
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
      if (typeof injectAccordionControls === 'function') injectAccordionControls();
      setTimeout(() => {
        duaView.style.transition = '';
        sheetTransitioning = false;
      }, 200);
    }, 200);
  }, 150);
}

function backToList(fromSwipe) {
  if (sheetTransitioning) return;
  sheetTransitioning = true;
  if (typeof stopAudio === 'function') stopAudio();
  document.querySelectorAll('.settings-panel').forEach(p => p.remove());
  const sizeMenu = document.getElementById('duaSizeMenu');
  if (sizeMenu) sizeMenu.classList.remove('open');

  const listView = document.getElementById('listView');
  const duaView  = document.getElementById('duaView');
  const sheet    = document.getElementById('bottomSheet');

  // Si vient du swipe — sheet déjà partiellement descendu, continuer vers le bas
  if (fromSwipe) {
    duaView.style.opacity = '0';
    sheet.style.transition = 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    sheet.style.transform = 'translateY(100%)';
    setTimeout(() => {
      currentAccId = null;
      renderSheetItems(currentCat);
      listView.style.display = 'block';
      listView.style.opacity = '0';
      duaView.style.display = 'none';
      duaView.style.opacity = '';
      sheet.style.height = '';
      sheet.style.maxHeight = '88vh';
      sheet.style.borderRadius = '24px 24px 0 0';
      sheet.style.overflowY = 'auto';
      sheet.style.top = '';
      sheet.style.position = '';
      sheet.style.transform = 'translateY(100%)';
      sheet.style.transition = 'none';
      if (typeof applyLangBlocks === 'function') applyLangBlocks(getLang());
      requestAnimationFrame(() => {
        sheet.style.transition = 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        sheet.style.transform = 'translateY(0)';
        listView.style.transition = 'opacity 0.2s ease';
        listView.style.opacity = '1';
        setTimeout(() => {
          sheet.style.transition = '';
          listView.style.transition = '';
          sheetTransitioning = false;
        }, 360);
      });
    }, 260);
    return;
  }

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
      sheet.style.transition = 'none';
      sheet.style.transform = 'translateY(100%)';
      sheet.style.height = '';
      sheet.style.maxHeight = '88vh';
      sheet.style.borderRadius = '24px 24px 0 0';
      sheet.style.overflowY = 'auto';
      sheet.style.top = '';
      sheet.style.position = '';
      sheet.style.willChange = 'transform';
      requestAnimationFrame(() => {
        sheet.style.transition = 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        sheet.style.transform = 'translateY(0)';
      });
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
      '<div class="accordion-header" style="cursor:default"><div class="accordion-title">' +
        '<span class="lang-block" data-lang-block="fr">' + (dua.titre.fr||'') + '</span>' +
        '<span class="lang-block" data-lang-block="en">' + (dua.titre.en||'') + '</span>' +
        '<span class="lang-block" data-lang-block="es">' + (dua.titre.es||'') + '</span>' +
      '</div></div>' +
      '<div class="accordion-body" style="max-height:none;overflow:visible"><div class="accordion-inner">' +
        '<div class="lang-block" data-lang-block="fr">' + sunHtml.fr + '</div>' +
        '<div class="lang-block" data-lang-block="en">' + sunHtml.en + '</div>' +
        '<div class="lang-block" data-lang-block="es">' + sunHtml.es + '</div>' +
        '<div class="dua-action-bar">' +
          '<button class="dua-action-icon" data-label="Partager" onclick="event.stopPropagation();shareAccordion(\''+accId+'\')" title="Partager">' +
            '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>' +
          '</button>' +
          '<button class="dua-action-icon" data-label="Réglages" onclick="event.stopPropagation();toggleAccSettings(\''+accId+'\')" title="Réglages">' +
            '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>' +
          '</button>' +
        '</div>' +
      '</div></div>';
  } else {
    const ph = dua.phonetique || {};
    const tr = dua.traduction || {};
    const hd = dua.hadith || {};
    const ar = dua.arabe || '';
    const phL = l => (ph[l]||'').replace(/\n/g,'<br>');
    const hdB = l => hd[l] ? '<div class="hadith-block">'+hd[l]+'</div>' : '';

    const audioFile = window.DUAS && DUAS[cat] && DUAS[cat][accId] ? (DUAS[cat][accId].audio || '') : '';

    const svgCopy = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
    const svgGear = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
    const svgShare = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';
    const actionBar =
      '<div class="dua-action-bar">' +
        '<button class="dua-action-icon" data-label="Copier" onclick="event.stopPropagation();copyAccordion(\''+accId+'\')" title="Copier">'+svgCopy+'</button>' +
        '<button class="dua-action-icon" data-label="Réglages" onclick="event.stopPropagation();toggleAccSettings(\''+accId+'\')" title="Réglages">'+svgGear+'</button>' +
        '<button class="dua-action-icon" data-label="Partager" onclick="event.stopPropagation();shareAccordion(\''+accId+'\')" title="Partager">'+svgShare+'</button>' +
      '</div>';
    const svgAudio = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
    const audioBtn = audioFile
      ? '<div class="audio-solo-bar"><button class="audio-solo-btn" id="tts-ar-'+accId+'" data-accid="'+accId+'" data-audio="'+audioFile+'" onclick="playAudio(this.dataset.accid,&quot;ar&quot;,this,this.dataset.audio)">'+svgAudio+'</button></div>'
      : '';

    const langBlock = l =>
      '<div class="lang-block" data-lang-block="'+l+'">' +
        '<div class="translation-block" id="'+accId+'-tr-'+l+'">'+(tr[l]||'')+'</div>' +
        '<div class="phonetic-block"    id="'+accId+'-ph-'+l+'">'+phL(l)+'</div>' +
        '<div class="arabic-block"      id="'+accId+'-ar-'+l+'">'+ar+'</div>' +
        audioBtn +
        hdB(l) +
      '</div>';

    acc.innerHTML =
      '<div class="accordion-header" style="cursor:default"><div class="accordion-title">' +
        '<span class="lang-block" data-lang-block="fr">'+(dua.titre.fr||'')+'</span>' +
        '<span class="lang-block" data-lang-block="en">'+(dua.titre.en||'')+'</span>' +
        '<span class="lang-block" data-lang-block="es">'+(dua.titre.es||'')+'</span>' +
      '</div></div>' +
      '<div class="accordion-body" style="max-height:none;overflow:visible"><div class="accordion-inner">' +
        langBlock('fr') + langBlock('en') + langBlock('es') +
        actionBar +
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
  let swipeBlocked = false; // bloqué si premier mouvement = scroll

  sheet.addEventListener('touchstart', e => {
    if (sheetTransitioning) return;
    startY = e.touches[0].clientY;
    swipeDY = 0;
    swipeActive = true;
    swipeBlocked = false;
    sheet.style.transition = 'none';
  }, { passive: true });

  sheet.addEventListener('touchmove', e => {
    if (!swipeActive || sheetTransitioning) return;
    if (swipeBlocked) return;

    const dy = e.touches[0].clientY - startY;

    // Détecter la direction initiale du geste
    if (Math.abs(dy) < 10) return; // attendre un minimum de mouvement

    // Si premier mouvement significatif vers le haut → c'est un scroll, bloquer
    if (dy < 0) { swipeBlocked = true; return; }

    // Vérifier que le contenu est bien en haut (scrollTop > 5 = on scrolle, pas de swipe)
    const scrollEl = currentAccId
      ? document.getElementById('duaScroll')
      : document.getElementById('bottomSheet');
    if (scrollEl && scrollEl.scrollTop > 5) { swipeBlocked = true; return; }

    swipeDY = dy;
    const drag = dy > 100 ? 100 + (dy - 100) * 0.3 : dy;
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

    if (swipeDY > 180) {
      // Swipe suffisant — partir de la position actuelle
      if (currentAccId) {
        backToList(true);
      } else {
        closeSheet(true);
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
