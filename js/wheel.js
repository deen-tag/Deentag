/* ==========================================================================
   ANNEAUX 3D — invocations.html
   Amélioration progressive : transforme chaque .cat-grid (grille 2 colonnes
   existante, avec les vraies .cat-card / images / onclick="openSheet(...)")
   en anneau 3D. N'invente aucune donnée : déplace les noeuds DOM existants,
   ne les recrée pas — labels multilingues (.lang-block) et openSheet()
   restent intacts sans rien toucher à app.js / duas.js.

   Comportement :
   - glisser horizontalement sur un anneau le fait tourner (avec inertie
     légère + alignement sur l'icône la plus proche au relâchement)
   - un tap net (sans glissement) ouvre la bottom sheet existante
   - en scrollant la page, l'anneau le plus proche du centre de l'écran
     grossit, les autres rétrécissent — et le chip actif (.section-chip) se
     met à jour en conséquence
   ========================================================================== */
(function () {
  if (!('IntersectionObserver' in window)) return; // même garde-fou que hscroll.js
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var wheels = []; // état de chaque anneau

  function buildWheel(section) {
    var grid = section.querySelector('.cat-grid');
    if (!grid) return null;
    var cards = Array.prototype.slice.call(grid.children).filter(function (c) {
      return c.classList.contains('cat-card');
    });
    if (!cards.length) return null;

    var stage = document.createElement('div');
    stage.className = 'ring-stage';
    var ringWrap = document.createElement('div');
    ringWrap.className = 'ring-wrap';
    var dial = document.createElement('div');
    dial.className = 'dial';
    var ring = document.createElement('div');
    ring.className = 'ring';

    var n = cards.length;
    var step = 360 / n;
    var radius = Math.round(84 + (n - 1) * 9); // plus il y a d'icônes, plus l'anneau est large

    cards.forEach(function (card, i) {
      var angle = i * step;
      var item = document.createElement('div');
      item.className = 'item';
      item.dataset.angle = String(angle);
      item.style.transform = 'rotateY(' + angle + 'deg) translateZ(' + radius + 'px)';
      item.appendChild(card); // déplace la vraie carte (image + onclick + labels), ne la clone pas
      ring.appendChild(item);
    });

    ringWrap.appendChild(dial);
    ringWrap.appendChild(ring);
    stage.appendChild(ringWrap);
    grid.replaceWith(stage);

    return {
      section: section,
      stage: stage,
      items: Array.prototype.slice.call(ring.children),
      n: n,
      angle: 0,
      dragging: false,
      moved: 0,
      startX: 0,
      startAngle: 0,
      animId: null,
      suppressClick: false
    };
  }

  function renderRing(w) {
    w.items.forEach(function (item) {
      var base = parseFloat(item.dataset.angle);
      var total = (base + w.angle) % 360;
      var rad = (total * Math.PI) / 180;
      var depth = Math.cos(rad); // 1 = face caméra, -1 = arrière
      var scale = 0.6 + 0.42 * ((depth + 1) / 2);
      var op = 0.22 + 0.78 * ((depth + 1) / 2);
      var card = item.firstElementChild;
      if (!card) return;
      card.style.transform = 'rotateY(' + -total + 'deg) scale(' + scale + ')';
      card.style.opacity = String(op);
      item.style.zIndex = String(Math.round((depth + 1) * 100));
    });
  }

  function animateTo(w, target) {
    if (w.animId) cancelAnimationFrame(w.animId);
    if (reduceMotion) { w.angle = target; renderRing(w); return; }
    var from = w.angle, diff = target - from, dur = 260, t0 = performance.now();
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
    // Capture-phase : intercepte le clic natif de la .cat-card si on vient de glisser
    stage.addEventListener('click', function (e) {
      if (w.suppressClick) {
        e.stopPropagation();
        e.preventDefault();
        w.suppressClick = false;
      }
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
      var scale = 0.78 + 0.3 * t;
      var opacity = 0.45 + 0.55 * t;
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

  function init() {
    var pager = document.getElementById('catPager');
    if (!pager) return;
    pager.classList.add('cat-pager--wheel');

    Array.prototype.slice.call(pager.querySelectorAll('.cat-section')).forEach(function (section) {
      var w = buildWheel(section);
      if (!w) return;
      renderRing(w);
      attachDrag(w);
      wheels.push(w);
    });

    if (!wheels.length) return;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateScales();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
