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
    if (cards.length <= 2) {
      // Pas assez de cartes pour justifier une roulette : elles tiennent
      // déjà toutes à l'écran côte à côte, donc on garde la grille statique
      // d'origine (.cat-grid, 2 colonnes) et on retire juste le cadre pour
      // rester cohérent avec le style "premium" du reste du site.
      grid.classList.add('cat-grid--static-pair');
      return null;
    }

    var stage = document.createElement('div');
    stage.className = 'orbit-stage';
    var ring = document.createElement('div');
    ring.className = 'orbit-ring';

    var n = cards.length;
    var step = 360 / n;
    // Ovale aplati : plus large que haut, s'élargit un peu avec le nombre d'icônes.
    var rx = Math.round(58 + (n - 1) * 13);
    // Rayon vertical agrandi (0.58 au lieu de 0.45, compromis modéré) : les
    // cartes à l'arrière de l'arc se séparent davantage de la carte centrale
    // pour réduire le chevauchement, sans réduire leur taille ni leur
    // opacité (cf. discussion).
    var ry = Math.round(rx * 0.58);
    stage.dataset.rx = String(rx);
    stage.dataset.ry = String(ry);
    // La hauteur fixe (190px, définie dans wheel.css) ne suffit plus avec un
    // ry agrandi : recalculée ici par roulette pour que rien ne déborde sur
    // la section suivante (même logique que buildGridWheel).
    var cardHalf = 68; // moitié de la hauteur d'une .cat-card (136px)
    var neededHeight = Math.round(ry * 2 + cardHalf * 1.15 * 2 + 16);
    stage.style.height = neededHeight + 'px';

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

    // Points de pagination sous l'arc : donnent un repère de quantité
    // ("je vois 3 cartes sur 6") que l'ovale seul ne fournit pas.
    var dotsRow = document.createElement('div');
    dotsRow.className = 'wheel-dots';
    var dotEls = [];
    for (var d = 0; d < n; d++) {
      var dot = document.createElement('span');
      dot.className = 'wheel-dot';
      dotsRow.appendChild(dot);
      dotEls.push(dot);
    }
    stage.insertAdjacentElement('afterend', dotsRow);

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
      frontIndex: 0,
      dots: dotEls,
      hinted: false
    };
  }

  function renderRing(w) {
    var bestDepth = -2, frontIdx = 0;
    // La vue en biais + l'inclinaison des cartes ne concernent que le
    // tourniquet Invocations (buildWheel fournit w.section). Les roues
    // autonomes d'Accueil et Coran (buildGridWheel, sans w.section) gardent
    // l'ancien rendu simple : ne pas les modifier ici.
    var skewed = !!w.section;
    w.items.forEach(function (item, i) {
      var base = parseFloat(item.dataset.angle);
      var total = base + w.angle;
      var rad = (total * Math.PI) / 180;
      var depth = Math.cos(rad); // 1 = avant/centre, -1 = arrière
      var x = Math.sin(rad) * w.rx;
      var y = depth * w.ry; // avant en bas, arrière en haut (comme le modèle de référence)
      // Invocations (skewed) garde l'effet de profondeur (cartes qui
      // grossissent/s'estompent). Accueil/Coran : vue plate, de face, comme
      // une horloge — toutes les cartes ont la même taille et opacité, sans
      // inclinaison, seule leur position tourne sur le cercle.
      var scale = skewed ? (0.60 + 0.55 * ((depth + 1) / 2)) : 1;
      item.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')';
      item.style.zIndex = String(Math.round((depth + 1) * 100));
      // Correctif lisibilité : on ne baisse plus l'opacité de la carte entière
      // (ça assombrissait aussi le label). Seule l'icône s'estompe avec la
      // profondeur ; le label reste pleinement lisible même hors du centre.
      if (skewed) {
        var iconOp = 0.45 + 0.55 * ((depth + 1) / 2);
        var iconEl = item.querySelector('.cat-icon-circle') || item.querySelector('.qnav-icon');
        if (iconEl) iconEl.style.opacity = String(iconOp);
      }
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
    if (w.dots) {
      w.dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === frontIdx);
      });
    }
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
        // On centre quand même la carte cliquée (cohérence visuelle : elle
        // devient "l'avant"), mais sans bloquer l'ouverture de la sheet —
        // le clic natif sur la .cat-card (onclick="openSheet(...)") continue.
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

  // Version generique : transforme n'importe quelle grille de cartes (pas
  // seulement les .cat-section d'invocations.html) en roue autonome, a
  // taille fixe (pas de mise a l'echelle liee au scroll, il n'y a qu'une
  // seule roue sur ces pages).
  function buildGridWheel(grid, cardClass) {
    var cards = Array.prototype.slice.call(grid.children).filter(function (c) {
      return c.classList.contains(cardClass);
    });
    if (!cards.length) return null;

    var stage = document.createElement('div');
    stage.className = 'orbit-stage orbit-stage--nav';
    var ring = document.createElement('div');
    ring.className = 'orbit-ring';

    var n = cards.length;
    var step = 360 / n;
    // Rayon agrandi (cartes plus grandes ci-dessous, il faut plus d'espace
    // entre elles pour ne pas qu'elles se chevauchent).
    var rx = Math.round(65 + (n - 1) * 10);
    // Contrairement au tourniquet Invocations (ovale aplati pour gagner de la
    // hauteur), ici on veut un vrai cercle qui tourne "comme une horloge" :
    // pas besoin d'économiser de la hauteur sur Accueil/Coran.
    var ry = rx;
    stage.dataset.rx = String(rx);
    stage.dataset.ry = String(ry);
    // Le conteneur .orbit-stage (190px fixes en CSS) est calé sur l'ancien
    // ovale aplati : avec un vrai cercle il faut plus de hauteur pour que
    // rien ne soit rogné en haut/bas, calculée ici selon le rayon et la
    // taille de carte (marge de sécurité pour le petit pulse d'arrivée).
    var cardHalf = cardClass === 'qnav-card' ? 88 : 82;
    var neededHeight = Math.round(ry * 2 + cardHalf * 1.1 * 2 + 16);
    stage.style.height = neededHeight + 'px';

    cards.forEach(function (card, i) {
      var angle = i * step;
      var item = document.createElement('div');
      item.className = 'item';
      item.dataset.angle = String(angle);
      item.appendChild(card);
      ring.appendChild(item);
    });

    stage.appendChild(ring);
    grid.replaceWith(stage);

    return {
      stage: stage,
      ring: ring,
      items: Array.prototype.slice.call(ring.children),
      n: n, rx: rx, ry: ry, angle: 0,
      dragging: false, moved: 0, startX: 0, startAngle: 0,
      animId: null, suppressClick: false, frontIndex: 0
    };
  }

  function initStandaloneWheel(grid, cardClass) {
    if (!grid) return;
    var w = buildGridWheel(grid, cardClass);
    if (!w) return;
    renderRing(w);
    attachDrag(w);
    if (!reduceMotion) {
      setTimeout(function () {
        showSwipeHint(w);
      }, 500);
    }
  }

  function init() {
    var pager = document.getElementById('catPager');
    if (pager) {
      pager.classList.add('cat-pager--wheel');

      Array.prototype.slice.call(pager.querySelectorAll('.cat-section')).forEach(function (section) {
        var w = buildWheel(section);
        if (!w) return;
        renderRing(w);
        attachDrag(w);
        wheels.push(w);
      });

      if (wheels.length) {
        // Chaque arc montre son propre hint de swipe la première fois qu'il
        // entre réellement dans le champ de vision (pas seulement le tout
        // premier au chargement) : un utilisateur qui scrolle jusqu'à
        // "Circonstances" sans jamais avoir vu "Quotidien" doit quand même
        // comprendre que l'arc se glisse.
        if (!reduceMotion) {
          var hintObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (!entry.isIntersecting) return;
              var w = entry.target._wheelRef;
              if (w && !w.hinted) {
                w.hinted = true;
                showSwipeHint(w);
              }
              hintObserver.unobserve(entry.target);
            });
          }, { threshold: 0.5 });
          wheels.forEach(function (w) {
            w.stage._wheelRef = w;
            hintObserver.observe(w.stage);
          });
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        updateScales();
      }
    }

    // Accueil et Coran : retour à une grille statique classique (plus de
    // roue interactive ici, cf. discussion — gardé uniquement pour
    // Invocations, seule page où le nombre d'icônes justifie de faire
    // défiler). Les deux lignes ci-dessous restent commentées volontairement.
    // initStandaloneWheel(document.querySelector('.home-nav-grid'), 'cat-card');
    // initStandaloneWheel(document.getElementById('quranNavGrid'), 'qnav-card');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
