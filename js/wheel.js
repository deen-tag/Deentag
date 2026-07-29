/* ==========================================================================
   ARCS OVALES — invocations.html
   Amélioration progressive : transforme chaque .cat-grid (grille 2 colonnes
   existante, avec les vraies .cat-card / images / onclick="openSheet(...)")
   en arc ovale aplati. N'invente aucune donnée : déplace les noeuds DOM
   existants, ne les recrée pas — labels multilingues (.lang-block) et
   openSheet() restent intacts sans rien toucher à app.js / duas.js.

   Comportement :
   - glisser horizontalement sur un arc le fait tourner (avec alignement sur
     l'icône la plus proche au relâchement)
   - taper sur une carte qui n'est pas au centre la ramène au centre
   - taper sur la carte déjà au centre ouvre la bottom sheet existante
   - en scrollant la page, l'arc le plus proche du centre de l'écran
     grossit, les autres rétrécissent — et le chip actif (.section-chip) se
     met à jour en conséquence
   ========================================================================== */
(function () {
  if (!('IntersectionObserver' in window)) return; // garde-fou navigateurs anciens
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var wheels = []; // état de chaque arc

  function buildWheel(section) {
    var grid = section.querySelector('.cat-grid');
    if (!grid) return null;
    var cards = Array.prototype.slice.call(grid.children).filter(function (c) {
      return c.classList.contains('cat-card');
    });
    if (!cards.length) return null;

    var stage = document.createElement('div');
    stage.className = 'orbit-stage';
    var ring = document.createElement('div');
    ring.className = 'orbit-ring';

    var n = cards.length;
    var step = 360 / n;
    // Ovale aplati : plus large que haut, s'élargit un peu avec le nombre d'icônes.
    var rx = Math.round(58 + (n - 1) * 13);
    var ry = Math.round(rx * 0.45);
    stage.dataset.rx = String(rx);
    stage.dataset.ry = String(ry);

    cards.forEach(function (card, i) {
      var angle = i * step;
      var item = document.createElement('div');
      item.className = 'item';
      item.dataset.angle = String(angle);
      item.appendChild(card); // déplace la vraie carte (image + onclick + labels), ne la clone pas
      ring.appendChild(item);
    });

    stage.appendChild(ring);
    grid.replaceWith(stage);

    return {
      section: section,
      stage: stage,
      ring: ring,
      items: Array.prototype.slice.call(ring.children),
      n: n,
      rx: rx,
      ry: ry,
      angle: 0,
      dragging: false,
      moved: 0,
      startX: 0,
      startAngle: 0,
      animId: null,
      suppressClick: false,
      frontIndex: 0
    };
  }

  function renderRing(w) {
    var bestDepth = -2, frontIdx = 0;
    w.items.forEach(function (item, i) {
      var base = parseFloat(item.dataset.angle);
      var total = base + w.angle;
      var rad = (total * Math.PI) / 180;
      var depth = Math.cos(rad); // 1 = avant/centre, -1 = arrière
      var x = Math.sin(rad) * w.rx;
      var y = depth * w.ry; // avant en bas, arrière en haut (comme le modèle de référence)
      var scale = 0.60 + 0.55 * ((depth + 1) / 2);
      var op = 0.75 + 0.25 * ((depth + 1) / 2);
      item.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')';
      item.style.opacity = String(op);
      item.style.zIndex = String(Math.round((depth + 1) * 100));
      if (depth > bestDepth) { bestDepth = depth; frontIdx = i; }
    });
    w.items.forEach(function (item, i) {
      var isFront = i === frontIdx;
      item.classList.toggle('is-front', isFront);
      if (isFront && !item.dataset.pulsed) {
        item.classList.add('is-pulsing');
        item.dataset.pulsed = 'true';
        setTimeout(function () {
          item.classList.remove('is-pulsing');
          setTimeout(function () { item.dataset.pulsed = ''; }, 100);
        }, 800);
      }
    });
    w.frontIndex = frontIdx;
  }

  function animateTo(w, target) {
    if (w.animId) cancelAnimationFrame(w.animId);
    if (reduceMotion) { w.angle = target; renderRing(w); return; }
    var from = w.angle, diff = target - from, dur = 300, t0 = performance.now();
    function step(t) {
      var p = Math.min(1, (t - t0) / dur);
      var ease = 1 - Math.pow(1 - p, 3);
      w.angle = from + diff * ease;
      renderRing(w);
      if (p < 1) w.animId = requestAnimationFrame(step);
    }
    w.animId = requestAnimationFrame(step);
  }

  function snap(w) {
    var step = 360 / w.n;
    var target = Math.round(w.angle / step) * step;
    animateTo(w, target);
  }

  // Ramène la carte d'index i au centre (avant), par le chemin le plus court.
  function selectIndex(w, i) {
    var step = 360 / w.n;
    var base = i * step;
    var wanted = -base; // angle qui annule base + angle = 0
    var diff = ((wanted - w.angle + 540) % 360) - 180;
    animateTo(w, w.angle + diff);
  }

  function attachDrag(w) {
    var stage = w.stage;
    stage.addEventListener('pointerdown', function (e) {
      w.dragging = true;
      w.moved = 0;
      w.startX = e.clientX;
      w.startAngle = w.angle;
      if (w.animId) cancelAnimationFrame(w.animId);
      try { stage.setPointerCapture(e.pointerId); } catch (err) {}
    });
    stage.addEventListener('pointermove', function (e) {
      if (!w.dragging) return;
      var dx = e.clientX - w.startX;
      w.moved = Math.max(w.moved, Math.abs(dx));
      w.angle = w.startAngle + dx * 0.35;
      renderRing(w);
    });
    function up() {
      if (!w.dragging) return;
      w.dragging = false;
      if (w.moved >= 6) {
        w.suppressClick = true; // évite d'ouvrir la sheet à la fin d'un glissement
        snap(w);
      }
    }
    stage.addEventListener('pointerup', up);
    stage.addEventListener('pointercancel', up);
    // Capture-phase : intercepte le clic natif de la .cat-card
    stage.addEventListener('click', function (e) {
      if (w.suppressClick) {
        e.stopPropagation();
        e.preventDefault();
        w.suppressClick = false;
        return;
      }
      var item = e.target.closest ? e.target.closest('.item') : null;
      if (!item) return;
      var idx = w.items.indexOf(item);
      if (idx === -1) return;
      if (idx !== w.frontIndex) {
        // Pas encore au centre : on l'y amène, on n'ouvre pas la sheet cette fois-ci.
        e.stopPropagation();
        e.preventDefault();
        selectIndex(w, idx);
      }
      // Si idx === w.frontIndex, on laisse le clic natif ouvrir openSheet(...).
    }, true);
  }

  /* ===== Effet d'agrandissement au scroll + chip actif ===== */
  var navBar = document.getElementById('sectionNav');
  var chips = navBar ? Array.prototype.slice.call(navBar.querySelectorAll('.section-chip')) : [];

  function setActiveChip(name) {
    chips.forEach(function (c) {
      c.classList.toggle('active', c.getAttribute('data-jump') === name);
    });
  }

  var ticking = false;
  function updateScales() {
    ticking = false;
    var vh = window.innerHeight;
    var anchorY = vh * 0.42; // légèrement au-dessus du centre, sous la recherche/chips sticky
    var maxDist = vh * 0.6;
    var bestT = -1, focused = null;

    wheels.forEach(function (w) {
      var r = w.stage.getBoundingClientRect();
      var center = r.top + r.height / 2;
      var dist = Math.abs(center - anchorY);
      var t = Math.max(0, 1 - dist / maxDist);
      var scale = 0.92 + 0.08 * t;
      var opacity = 0.75 + 0.25 * t;
      w.section.style.transform = 'scale(' + scale + ')';
      w.section.style.opacity = String(opacity);
      w.section.style.zIndex = String(Math.round(t * 100));
      if (t > bestT) { bestT = t; focused = w.section.getAttribute('data-section'); }
    });

    if (focused) setActiveChip(focused);
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(updateScales); }
  }

  /* jumpToSection() existe déjà dans app.js pour l'ancien pager horizontal ;
     on la redéfinit ici pour le nouveau flux vertical (dernière déclaration
     de fonction gagne : aucune modification de app.js nécessaire). */
  window.jumpToSection = function (name) {
    var target = document.querySelector('.cat-section[data-section="' + name + '"]');
    if (!target) return;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  };

  function showSwipeHint(w) {
    var stage = w.stage;

    var leftArrow = document.createElement('div');
    leftArrow.className = 'swipe-hint swipe-hint-left';
    leftArrow.textContent = '‹';

    var rightArrow = document.createElement('div');
    rightArrow.className = 'swipe-hint swipe-hint-right';
    rightArrow.textContent = '›';

    stage.appendChild(leftArrow);
    stage.appendChild(rightArrow);

    setTimeout(function () {
      leftArrow.classList.add('swipe-hint--visible');
      rightArrow.classList.add('swipe-hint--visible');
    }, 400);

    var hideHint = function () {
      leftArrow.classList.remove('swipe-hint--visible');
      rightArrow.classList.remove('swipe-hint--visible');
      setTimeout(function () {
        leftArrow.remove();
        rightArrow.remove();
      }, 600);
      stage.removeEventListener('pointerdown', hideHint);
      stage.removeEventListener('touchstart', hideHint);
    };

    setTimeout(hideHint, 4500);
    stage.addEventListener('pointerdown', hideHint);
    stage.addEventListener('touchstart', hideHint);
  }

  // ===== Carrousel plat (Accueil / Coran) =====
  // Contrairement au tourniquet orbital d'Invocations (buildWheel/renderRing
  // ci-dessus), ici on garde le scroll horizontal natif du navigateur (le
  // vrai drag au doigt + snap, sans rien réimplémenter) et on se contente de
  // calculer, à chaque frame de scroll, une légère rotation 3D (rotateY)
  // selon la distance de chaque carte au centre de la vue. Toutes les cartes
  // gardent la même taille — aucune variation de scale/opacité.
  function initFlatCarousel(grid, cardClass) {
    if (!grid) return;
    var cards = Array.prototype.slice.call(grid.children).filter(function (c) {
      return c.classList.contains(cardClass);
    });
    if (!cards.length) return;

    grid.classList.add('flat-carousel');
    cards.forEach(function (c) { c.classList.add('flat-carousel-item'); });

    var maxDeg = 7; // inclinaison max, discrète comme demandé (5-8°)
    var ticking = false;

    function update() {
      ticking = false;
      if (reduceMotion) return;
      var stageRect = grid.getBoundingClientRect();
      var centerX = stageRect.left + stageRect.width / 2;
      cards.forEach(function (card) {
        var r = card.getBoundingClientRect();
        var cardCenter = r.left + r.width / 2;
        var delta = cardCenter - centerX;
        var norm = Math.max(1, r.width); // une carte de distance = angle max
        var t = Math.max(-1, Math.min(1, delta / norm));
        var deg = -t * maxDeg;
        card.style.transform = 'rotateY(' + deg.toFixed(2) + 'deg)';
      });
    }

    function onGridScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }

    grid.addEventListener('scroll', onGridScroll, { passive: true });
    window.addEventListener('resize', onGridScroll);
    update();
  }

  function init() {
    var pager = document.getElementById('catPager');
    if (pager) {
      pager.classList.add('cat-pager--wheel');

      var firstWheel = null;
      Array.prototype.slice.call(pager.querySelectorAll('.cat-section')).forEach(function (section, index) {
        var w = buildWheel(section);
        if (!w) return;
        renderRing(w);
        attachDrag(w);
        wheels.push(w);
        if (index === 0) firstWheel = w;
      });

      if (wheels.length) {
        if (firstWheel && !reduceMotion) {
          setTimeout(function () {
            showSwipeHint(firstWheel);
          }, 500);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        updateScales();
      }
    }

    // Accueil : les 4 cartes de navigation (Invocations/Coran/Enfants/Boutique)
    initFlatCarousel(document.querySelector('.home-nav-grid'), 'cat-card');

    // Coran : les 5 cartes de navigation
    initFlatCarousel(document.getElementById('quranNavGrid'), 'qnav-card');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
