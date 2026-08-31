// ============================================================
// DEENTAG — MENU RADIAL (éventail de sous-catégories)
// Remplace l'ancienne étape "sheet à moitié" (openSheet + listView).
// Réutilise getSheetItems() / DUAS / closeSheet() de app.js — aucune
// donnée dupliquée ici.
// ============================================================

let radialCat = null;
let radialIconClone = null; // <img> clonée, animée (FLIP)
let radialSourceImg = null; // la vraie <img> dans la grille
let radialStartRect = null; // position/taille d'origine de l'icône

// Largeur cible de l'icône une fois centrée. Valeur fixe (pas un % de
// l'écran) pour un agrandissement identique sur tous les appareils.
const RADIAL_ICON_TARGET_WIDTH = 155;

// object-fit:contain : getBoundingClientRect() sur l'<img> donne la boîte,
// pas le dessin réel (letterboxing possible). On calcule le rectangle
// réellement occupé pour que le clone FLIP ne déforme rien.
function radialGetContainRect(img) {
  const box = img.getBoundingClientRect();
  const ratio = (img.naturalWidth && img.naturalHeight) ? img.naturalWidth / img.naturalHeight : 1;
  const boxRatio = box.width / box.height;
  let width, height, left, top;
  if (boxRatio > ratio) {
    height = box.height;
    width  = height * ratio;
    left   = box.left + (box.width - width) / 2;
    top    = box.top;
  } else {
    width  = box.width;
    height = width / ratio;
    left   = box.left;
    top    = box.top + (box.height - height) / 2;
  }
  return { left, top, width, height };
}

// Point d'entrée : appelé par le onclick des cat-card à la place de openSheet().
// cardEl = l'élément .cat-card tapé, doit avoir data-cat + un .cat-icon dedans.
function openRadial(cardEl) {
  const cat = cardEl.dataset.cat;
  if (!window.DUAS || !DUAS[cat]) return;
  const items = getSheetItems(cat);

  // Une seule invocation dans la catégorie -> saut direct, pas d'éventail.
  if (items.length <= 1) {
    if (items.length === 1) openDuaFromRadial(cat, items[0].id);
    return;
  }

  radialCleanupClone(true);

  radialCat = cat;
  const overlay = document.getElementById('radialOverlay');
  const stage   = document.getElementById('radialStage');
  stage.querySelectorAll('.radial-bubble, .radial-wave, .radial-lines').forEach(el => el.remove());

  // --- FLIP : on clone seulement l'icône (arche + illustration, sans cadre) ---
  const sourceImg = cardEl.querySelector('.cat-icon');
  radialSourceImg = sourceImg;
  radialStartRect = radialGetContainRect(sourceImg);

  const clone = document.createElement('img');
  clone.src = sourceImg.src;
  clone.alt = '';
  clone.className = 'radial-icon-clone';
  clone.style.top    = radialStartRect.top + 'px';
  clone.style.left   = radialStartRect.left + 'px';
  clone.style.width  = radialStartRect.width + 'px';
  clone.style.height = radialStartRect.height + 'px';
  clone.style.transform = 'translate(0,0) scale(1)';
  document.body.appendChild(clone);
  radialIconClone = clone;

  cardEl.style.visibility = 'hidden'; // masque la carte source, garde sa place

  overlay.classList.add('show');

  const scale = RADIAL_ICON_TARGET_WIDTH / radialStartRect.width;
  const startCenterX  = radialStartRect.left + radialStartRect.width  / 2;
  const startCenterY  = radialStartRect.top  + radialStartRect.height / 2;
  const targetCenterX = window.innerWidth  / 2;
  const targetCenterY = window.innerHeight / 2;
  const deltaX = targetCenterX - startCenterX;
  const deltaY = targetCenterY - startCenterY;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      clone.style.transform = 'translate(' + deltaX + 'px,' + deltaY + 'px) scale(' + scale + ')';
    });
  });

  radialLayoutBubbles(stage, cat, items);
}

// Calcule la position de chaque fiche autour de l'icône, en tenant compte
// de leur HAUTEUR réelle une fois le texte posé (pas seulement la largeur) :
// un titre long sur 3-4 lignes peut chevaucher sa voisine verticalement
// même quand les largeurs sont correctement espacées.
function radialLayoutBubbles(stage, cat, items) {
  const n = Math.min(items.length, 8);
  const SCREEN_MARGIN = 16;
  const viewportW = document.documentElement.clientWidth || window.innerWidth;
  const viewportH = window.innerHeight;

  let bubbleMaxWidth;
  if (n <= 3)       bubbleMaxWidth = 126;
  else if (n === 4) bubbleMaxWidth = 120;
  else if (n === 5) bubbleMaxWidth = 106;
  else               bubbleMaxWidth = 94;
  const BUBBLE_HALF = bubbleMaxWidth / 2 + 8;

  const baseRadius = RADIAL_ICON_TARGET_WIDTH * 0.55 + 45 + 15;
  let RADIUS_X = Math.min(baseRadius * 1.05, viewportW / 2 - BUBBLE_HALF - SCREEN_MARGIN);
  let RADIUS_Y = Math.min(baseRadius * 0.95, viewportH / 2 - BUBBLE_HALF - SCREEN_MARGIN);
  RADIUS_X = Math.max(66, RADIUS_X);
  RADIUS_Y = Math.max(66, RADIUS_Y);

  // Marge supplémentaire sur les diagonales basses (où 2 fiches proches
  // du bas peuvent se toucher entre elles / avec le laurier de l'icône).
  const BOTTOM_EXTRA = 34;
  function orbitPoint(theta) {
    const s = Math.sin(theta), c = Math.cos(theta);
    const diagonalLowFactor = s > 0 ? 2 * s * Math.abs(c) : 0;
    const extra = BOTTOM_EXTRA * diagonalLowFactor;
    return { tx: c * (RADIUS_X + extra), ty: s * (RADIUS_Y + extra) };
  }

  const positions = items.slice(0, n).map((item, i) => {
    const thetaDeg = (360 / n) * i - 90; // -90° = démarre en haut, sens horaire
    const theta = thetaDeg * Math.PI / 180;
    const p = orbitPoint(theta);
    return { item, tx: p.tx, ty: p.ty, angle: theta };
  });

  // --- Fiches créées tout de suite (invisibles, non "show") pour mesurer
  // leur vraie hauteur une fois le texte posé par le navigateur. ---
  const bubbleEls = positions.map(pos => {
    const b = radialMakeBubble(pos, cat, bubbleMaxWidth);
    stage.appendChild(b);
    return b;
  });
  // force le layout puis mesure
  bubbleEls.forEach((b, i) => {
    const rect = b.getBoundingClientRect();
    positions[i].w = rect.width;
    positions[i].h = rect.height;
  });

  // Anti-collision : distance entre CENTRES comparée à un MIN_GAP calculé
  // par PAIRE à partir de leur plus grande dimension réelle (largeur OU
  // hauteur) — pas juste la largeur fixe. Ça absorbe les titres qui
  // wrappent sur 3-4 lignes sans casser les cas simples.
  const PADDING = 20;
  const MAX_PASSES = 10;
  for (let pass = 0; pass < MAX_PASSES; pass++) {
    let hadCollision = false;
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a = positions[i], b = positions[j];
        const minGap = Math.max(a.w, a.h) / 2 + Math.max(b.w, b.h) / 2 + PADDING;
        const dx = b.tx - a.tx, dy = b.ty - a.ty;
        const dist = Math.hypot(dx, dy);
        if (dist > 0 && dist < minGap) {
          hadCollision = true;
          const push = (minGap - dist) / 2;
          const nx = dx / dist, ny = dy / dist;
          a.tx -= nx * push; a.ty -= ny * push;
          b.tx += nx * push; b.ty += ny * push;
        }
      }
    }
    if (!hadCollision) break;
  }

  // Re-projection sur l'ellipse d'origine : seul l'angle gagné pendant la
  // résolution de collision est conservé, la distance au centre revient
  // exactement sur le rayon prévu pour cette direction -> silhouette
  // toujours propre, même sur 7-8 fiches.
  positions.forEach(p => {
    const angle = Math.atan2(p.ty / RADIUS_Y, p.tx / RADIUS_X);
    const corrected = orbitPoint(angle);
    p.tx = corrected.tx;
    p.ty = corrected.ty;
  });
  positions.forEach(p => { p.tx = Math.round(p.tx); p.ty = Math.round(p.ty); });

  // Applique les positions finales aux fiches déjà créées, puis lance l'effet.
  radialPlayEffectWave(stage, cat, positions, bubbleEls, Math.max(RADIUS_X, RADIUS_Y), bubbleMaxWidth);
}

// Onde dorée qui grandit jusqu'au rayon des fiches puis s'efface aussitôt
// (effet de révélation, ~250-300ms). Traits fins dorés reliant chaque
// fiche au centre. Les fiches existent déjà dans le DOM (créées pour la
// mesure) : on met juste à jour leurs positions finales puis on les révèle.
function radialPlayEffectWave(stage, cat, positions, bubbleEls, RADIUS, bubbleMaxWidth) {
  const wave = document.createElement('div');
  wave.className = 'radial-wave';
  const waveSize = (RADIUS + 55) * 2;
  wave.style.setProperty('--wave-size', waveSize + 'px');
  stage.appendChild(wave);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => wave.classList.add('grow'));
  });
  setTimeout(() => wave.classList.add('fade'), 200);
  setTimeout(() => wave.remove(), 360);

  const svgNS = 'http://www.w3.org/2000/svg';
  const linesSvg = document.createElementNS(svgNS, 'svg');
  linesSvg.setAttribute('class', 'radial-lines');
  stage.appendChild(linesSvg);

  positions.forEach((pos, i) => {
    const b = bubbleEls[i];
    b.style.setProperty('--tx', pos.tx + 'px');
    b.style.setProperty('--ty', pos.ty + 'px');
    b.style.setProperty('--tx-start', Math.round(pos.tx * 0.4) + 'px');
    b.style.setProperty('--ty-start', Math.round(pos.ty * 0.4) + 'px');

    const bubbleDelay = 185 + i * 25;

    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', 0); line.setAttribute('y1', 0);
    line.setAttribute('x2', pos.tx); line.setAttribute('y2', pos.ty);
    line.setAttribute('class', 'radial-line');
    linesSvg.appendChild(line);
    setTimeout(() => line.classList.add('draw'), Math.max(60, bubbleDelay - 100));

    setTimeout(() => b.classList.add('show'), bubbleDelay);
  });
}

// Fabrique une fiche de sous-catégorie (capsule premium, style pilule).
// Créée AVANT le calcul final de position (voir radialLayoutBubbles) pour
// pouvoir mesurer sa vraie hauteur ; positionnée au centre par défaut
// (--tx/--ty à 0) tant que radialPlayEffectWave ne les fixe pas.
function radialMakeBubble(pos, cat, bubbleMaxWidth) {
  const { item } = pos;
  const b = document.createElement('div');
  b.className = 'radial-bubble' + (item.sunnah ? ' is-sunnah' : '');
  b.style.maxWidth = (bubbleMaxWidth || 126) + 'px';
  b.style.setProperty('--tx', '0px');
  b.style.setProperty('--ty', '0px');
  b.style.setProperty('--tx-start', '0px');
  b.style.setProperty('--ty-start', '0px');
  const titleFontSize = bubbleMaxWidth && bubbleMaxWidth < 110 ? '7.8px' : '8.5px';
  b.innerHTML = '<div class="radial-bubble-title" style="font-size:' + titleFontSize + '">' + item.titre + '</div>';
  b.onclick = (e) => {
    e.stopPropagation();
    b.classList.add('pop');
    setTimeout(() => openDuaFromRadial(cat, item.id), 140);
  };
  return b;
}

function radialClose(e) {
  if (e && e.target.closest('.radial-bubble')) return;
  document.getElementById('radialOverlay').classList.remove('show');
  radialCleanupClone(false);
  radialCat = null;
}

// Nettoie le clone FLIP en cours.
// instant = true  -> suppression immédiate (changement rapide de carte)
// instant = false -> rejoue l'animation à l'envers avant de nettoyer
function radialCleanupClone(instant) {
  if (!radialIconClone) return;
  const clone = radialIconClone;
  const sourceImg = radialSourceImg;
  const sourceCard = sourceImg ? sourceImg.closest('.cat-card') : null;

  if (instant) {
    clone.remove();
    if (sourceCard) sourceCard.style.visibility = '';
    radialIconClone = null;
    radialSourceImg = null;
    radialStartRect = null;
    return;
  }

  clone.style.transform = 'translate(0,0) scale(1)';

  setTimeout(() => {
    clone.remove();
    if (sourceCard) sourceCard.style.visibility = '';
    radialIconClone = null;
    radialSourceImg = null;
    radialStartRect = null;
  }, 420);
}

// Ouvre le sheet plein directement sur une dua, sans passer par listView
// (l'éventail remplace cette étape). Repris du prototype : plus sûr que de
// réutiliser openDua(), qui suppose que listView était déjà affiché avant.
function openDuaFromRadial(cat, accId) {
  const overlay = document.getElementById('radialOverlay');
  if (overlay) overlay.classList.remove('show');
  radialCleanupClone(true);

  if (!window.DUAS || !DUAS[cat] || !DUAS[cat][accId]) return;
  if (typeof stopAudio === 'function') stopAudio();
  currentCat = cat;
  currentAccId = accId;

  const sheet   = document.getElementById('bottomSheet');
  const listView = document.getElementById('listView');
  const duaView = document.getElementById('duaView');

  if (listView) listView.style.display = 'none';
  renderDua(cat, accId);
  const catIcon = document.getElementById('duaCatIcon');
  if (catIcon) catIcon.src = DUAS[cat].meta.icon || '';

  duaView.style.display = 'flex';
  duaView.style.opacity = '1';

  sheet.style.height      = 'calc(var(--app-vh, 100dvh) - 16px)';
  sheet.style.maxHeight   = 'calc(var(--app-vh, 100dvh) - 16px)';
  sheet.style.borderRadius = '20px 20px 0 0';
  sheet.style.overflowY   = 'hidden';

  document.getElementById('bsOverlay').classList.add('active');
  sheet.classList.add('open');
  savedScrollY = window.scrollY || window.pageYOffset || 0;
  document.body.style.overscrollBehavior          = 'none';
  document.documentElement.style.overscrollBehavior = 'none';
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width    = '100%';

  if (typeof injectAccordionControls === 'function') injectAccordionControls();
}
