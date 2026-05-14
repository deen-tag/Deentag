// ===== DEENTAG — INDEX.JS v8 =====

var currentCat = null;
var currentAccId = null;

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
      '<div class="sub-card-num">' + String(i + 1).padStart(2, '0') + '</div>' +
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
  currentCat = null;
  currentAccId = null;
  document.getElementById('bsOverlay').classList.remove('active');
  const sheet = document.getElementById('bottomSheet');
  if (sheet) {
    sheet.classList.remove('open');
    sheet.style.height = sheet.style.maxHeight = sheet.style.borderRadius = sheet.style.overflowY = '';
    sheet.style.top = sheet.style.position = '';
  }
  const sizeMenuC = document.getElementById('duaSizeMenu');
  if (sizeMenuC) sizeMenuC.classList.remove('open');
  document.body.style.overscrollBehavior = '';
  document.documentElement.style.overscrollBehavior = '';
}

function openDua(cat, accId) {
  if (!window.DUAS || !DUAS[cat] || !DUAS[cat][accId]) return;
  currentAccId = accId;
  if (typeof stopAudio === 'function') stopAudio();

  const sheet   = document.getElementById('bottomSheet');
  const listView = document.getElementById('listView');
  const duaView  = document.getElementById('duaView');
  if (listView) listView.style.display = 'none';
  if (duaView)  duaView.style.display  = 'flex';
  if (sheet) {
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

  renderDua(cat, accId);
}

function backToList() {
  if (typeof stopAudio === 'function') stopAudio();
  document.querySelectorAll('.settings-panel').forEach(p => p.remove());
  currentAccId = null;

  const listView = document.getElementById('listView');
  const duaView  = document.getElementById('duaView');
  const sheet    = document.getElementById('bottomSheet');
  if (duaView)  duaView.style.display  = 'none';
  if (listView) listView.style.display = 'block';
  if (sheet) {
    sheet.style.height = '';
    sheet.style.maxHeight = '88vh';
    sheet.style.borderRadius = '24px 24px 0 0';
    sheet.style.overflowY = 'auto';
    sheet.style.top = '';
    sheet.style.position = '';
  }

  // Fermer le menu taille si ouvert
  const sizeMenu = document.getElementById('duaSizeMenu');
  if (sizeMenu) sizeMenu.classList.remove('open');

  renderSheetItems(currentCat);
  if (typeof applyLangBlocks === 'function') applyLangBlocks(getLang());
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
        '<div class="dua-action-bar">' +
          '<button class="dua-action-icon copy-dua-btn" onclick="copyDua(\'' + accId + '\',\'' + l + '\')" title="Copier">' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
          '</button>' +
          '<button class="dua-action-icon" onclick="event.stopPropagation();toggleAccSettings(\'' + accId + '\')" title="Réglages">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>' +
          '</button>' +
          '<button class="dua-action-icon" onclick="event.stopPropagation();shareAccordion(\'' + accId + '\')" title="Partager">' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>' +
          '</button>' +
        '</div>' +
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
  let isDragging = false;
  sheet.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
    isDragging = true;
  }, { passive: true });

  sheet.addEventListener('touchmove', e => {
    const dy = e.touches[0].clientY - startY;
    // Bloquer pull-to-refresh en vue liste
    if (dy > 0 && !currentAccId && sheet.scrollTop === 0) e.preventDefault();
    // En vue dua — permettre le drag visuel depuis la languette
    const handle = document.getElementById('sheetHandle');
    const handleArea = handle ? handle.getBoundingClientRect() : null;
    const touchY = e.touches[0].clientY;
    if (currentAccId && handleArea && touchY >= handleArea.top - 10 && touchY <= handleArea.bottom + 20) {
      e.preventDefault();
    }
  }, { passive: false });

  sheet.addEventListener('touchend', e => {
    if (!isDragging) return;
    isDragging = false;
    const dy = e.changedTouches[0].clientY - startY;
    if (!currentAccId && dy > 80) {
      // Vue liste → fermer
      closeSheet();
    } else if (currentAccId && dy > 80) {
      // Vue dua → revenir à la liste
      backToList();
    }
  }, { passive: true });
  handleNfcParams();
});


// ===== COPIER L'INVOCATION =====
function copyDua(accId, lang) {
  const acc = document.getElementById(accId);
  if (!acc) return;
  const tr = acc.querySelector('.translation-block');
  const ph = acc.querySelector('.phonetic-block');
  const ar = acc.querySelector('.arabic-block');
  const hd = acc.querySelector('.hadith-block');
  const title = acc.querySelector('.accordion-title');
  let text = '';
  if (title) text += title.innerText.trim() + '\n\n';
  if (tr && tr.innerText.trim()) text += tr.innerText.trim() + '\n\n';
  if (ph && ph.innerText.trim()) text += ph.innerText.trim() + '\n\n';
  if (ar && ar.innerText.trim()) text += ar.innerText.trim() + '\n\n';
  if (hd && hd.innerText.trim()) text += hd.innerText.trim() + '\n\n';
  text += '— Deentag\n🔗 https://deentag.vercel.app/shop.html';
  navigator.clipboard.writeText(text).then(() => {
    const btn = acc.querySelector('.copy-dua-btn');
    if (btn) {
      btn.style.color = 'var(--gold)';
      btn.style.opacity = '1';
      setTimeout(() => { btn.style.color = ''; btn.style.opacity = ''; }, 1500);
    }
  }).catch(() => {});
}

