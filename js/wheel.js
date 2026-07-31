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
  var allSections = []; // TOUTES les .cat-section (roulettes + statiques comme "Circonstances")

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
    // Valeurs reglées via l'outil de test (arc plus large, moins de variation par carte).
    var rx = Math.round(40 + (n - 1) * 13);
    // Rayon vertical : ratio réglé via l'outil de test.
    var ry = Math.round(rx * 0.71);
    stage.dataset.rx = String(rx);
    stage.dataset.ry = String(ry);
    // La hauteur fixe (190px, définie dans wheel.css) ne suffit plus avec un
    // ry agrandi : recalculée ici par roulette pour que rien ne déborde sur
    // la section suivante (même logique que buildGridWheel).
    var cardHalf = 68; // moitié de la hauteur d'une .cat-card (136px)
    // popOffset : décalage supplémentaire de la carte centrale, en plus de
    // sa position normale sur l'ellipse — pour qu'elle se détache
    // visuellement du reste des cartes (réglé via l'outil de test).
    var popOffset = 0;
    var neededHeight = Math.round(ry * 2 + cardHalf * 1.15 * 2 + 16 + popOffset);
    stage.style.height = neededHeight + 'px';

    cards.forEach(function (card, i) {
      var angle = i * step;
      var item = document.createElement('div');
      item.className = 'item';
      item.dataset.angle = String(angle);
      item.appendChild(card); // déplace la vraie carte (image + onclick + labels), ne la clone pas
      ring.appendChild(item);
    });

    // Trait de séparation entre le groupe de petites cartes et la grande
    // carte centrale, qui semble alors "sortir" du groupe.
    var divider = document.createElement('div');
    divider.className = 'orbit-divider';
    divider.style.transform = 'translateY(' + Math.round(ry * 0.42) + 'px)';
    ring.appendChild(divider);

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
      popOffset: popOffset,
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

    // Premier passage : juste repérer quelle carte est à l'avant, avant de
    // positionner quoi que ce soit (nécessaire pour lui appliquer un
    // décalage supplémentaire au second passage).
    w.items.forEach(function (item, i) {
      var base = parseFloat(item.dataset.angle);
      var total = base + w.angle;
      var depth = Math.cos((total * Math.PI) / 180);
      if (depth > bestDepth) { bestDepth = depth; frontIdx = i; }
    });

    w.items.forEach(function (item, i) {
      var base = parseFloat(item.dataset.angle);
      var total = base + w.angle;
      var rad = (total * Math.PI) / 180;
      var depth = Math.cos(rad); // 1 = avant/centre, -1 = arrière
      // Tracé "piste / stade" (superellipse, exposant 0.5), réglé via l'outil de test.
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var x = w.rx * (s < 0 ? -1 : s > 0 ? 1 : 0) * Math.pow(Math.abs(s), 0.5);
      var y = w.ry * (c < 0 ? -1 : c > 0 ? 1 : 0) * Math.pow(Math.abs(c), 0.5); // avant en bas, arrière en haut
      // Invocations (skewed) garde l'effet de profondeur (cartes qui
      // grossissent/s'estompent). Accueil/Coran : vue plate, de face, comme
      // une horloge — toutes les cartes ont la même taille et opacité, sans
      // inclinaison, seule leur position tourne sur le cercle.
      var scale = skewed ? (0.99 + 0.23 * ((depth + 1) / 2)) : 1;
      // La carte centrale se détache du groupe : décalage supplémentaire
      // vers le bas (popOffset, réglé à 0 pour l'instant) + gain de taille
      // plus marqué, comme si elle était attirée hors du reste des cartes.
      if (skewed && i === frontIdx) {
        y += w.popOffset;
        scale *= 1.19;
      }
      item.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')';
      item.style.zIndex = String(Math.round((depth + 1) * 100));
      // Correctif lisibilité : on ne baisse plus l'opacité de la carte entière
      // (ça assombrissait aussi le label). L'icône reste pleinement opaque
      // quelle que soit la profondeur (réglé via l'outil de test).
      if (skewed) {
        var iconEl = item.querySelector('.cat-icon-circle') || item.querySelector('.qnav-icon');
        if (iconEl) iconEl.style.opacity = '1';
      }
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
    // Le CSS met touch-action:pan-y sur la scène : le navigateur gère le
    // scroll vertical tout seul, nativement, sans qu'on y touche. Si le
    // geste part en scroll, il envoie un pointercancel (géré par up()) au
    // lieu de continuer les pointermove — plus besoin de relayer nous-mêmes
    // le scroll à la main (ancien scrollBy, source du bug de "vibration").
    var axisLocked = null; // null = pas encore décidé, 'x' = rotation, 'y' = scroll (on ignore, le navigateur s'en charge)
    var startY = 0;
    var active = false;
    var LOCK_THRESHOLD = 6; // px avant de trancher la direction du geste

    stage.addEventListener('pointerdown', function (e) {
      active = true;
      w.dragging = false; // pas encore : on attend de connaître la direction
      w.moved = 0;
      w.startX = e.clientX;
      startY = e.clientY;
      w.startAngle = w.angle;
      axisLocked = null;
      if (w.animId) cancelAnimationFrame(w.animId);
      try { stage.setPointerCapture(e.pointerId); } catch (err) {}
    });
    stage.addEventListener('pointermove', function (e) {
      if (!active) return;
      var dx = e.clientX - w.startX;
      var dy = e.clientY - startY;

      if (axisLocked === null) {
        if (Math.abs(dx) < LOCK_THRESHOLD && Math.abs(dy) < LOCK_THRESHOLD) return; // pas assez de mouvement pour trancher
        axisLocked = Math.abs(dy) > Math.abs(dx) ? 'y' : 'x';
        if (axisLocked === 'x') w.dragging = true;
      }

      if (axisLocked === 'y') return; // scroll : le navigateur s'en occupe seul, rien à faire ici

      if (!w.dragging) return;
      w.moved = Math.max(w.moved, Math.abs(dx));
      w.angle = w.startAngle + dx * 0.35;
      renderRing(w);
    });
    function up() {
      active = false;
      axisLocked = null;
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
  var currentActiveChip = null;
  // Etat par défaut correct dès le départ (avant tout calcul basé sur le
  // scroll) : évite qu'un chip incorrect (ex. le dernier de la liste)
  // s'affiche actif une fraction de seconde si le tout premier calcul de
  // position tourne avant que la mise en page (polices/images) soit stable.
  if (chips.length) {
    chips.forEach(function (c, i) { c.classList.toggle('active', i === 0); });
    currentActiveChip = chips[0].getAttribute('data-jump');
  }

  function setActiveChip(name) {
    if (name === currentActiveChip) return; // déjà actif, rien à refaire
    currentActiveChip = name;
    var target = null;
    chips.forEach(function (c) {
      var isActive = c.getAttribute('data-jump') === name;
      c.classList.toggle('active', isActive);
      if (isActive) target = c;
    });
    // Fait défiler la barre de chips elle-même pour que le chip actif soit
    // toujours visible, sans que l'utilisateur ait à la glisser à la main.
    if (target && !reduceMotion) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    } else if (target) {
      target.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
    }
  }

  var ticking = false;
  function updateScales() {
    ticking = false;
    var vh = window.innerHeight;
    var anchorY = vh * 0.42; // légèrement au-dessus du centre, sous la recherche/chips sticky
    var maxDist = vh * 0.6;

    // Effet zoom/opacité au scroll : réservé aux vraies roulettes (celles
    // qui ont un .orbit-stage). Les sections restées statiques (ex.
    // "Circonstances", 2 cartes) n'ont pas ce comportement, volontairement.
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
    });

    // Chip actif : calculé sur TOUTES les sections (roulettes + statiques),
    // sinon une section exclue de `wheels` (comme "Circonstances") ne peut
    // jamais être détectée comme celle actuellement à l'écran, même quand
    // elle occupe tout le viewport.
    var bestT = -1, focused = null;
    allSections.forEach(function (section) {
      var r = section.getBoundingClientRect();
      var center = r.top + r.height / 2;
      var dist = Math.abs(center - anchorY);
      var t = Math.max(0, 1 - dist / maxDist);
      if (t > bestT) { bestT = t; focused = section.getAttribute('data-section'); }
    });

    if (focused) setActiveChip(focused);
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(updateScales); }
  }

  // Surligne le chip cliqué immédiatement, sans attendre que le scroll (qui
  // est encore en cours d'animation vers la section) le détecte tout seul —
  // évite le petit flottement/délai avant que le bon chip s'allume.
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      setActiveChip(c.getAttribute('data-jump'));
    });
  });

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

      allSections = Array.prototype.slice.call(pager.querySelectorAll('.cat-section'));
      allSections.forEach(function (section) {
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
        // Relance une fois toutes les ressources chargées (images, polices) :
        // le tout premier calcul peut être basé sur une mise en page pas
        // encore stabilisée, ce qui pouvait donner un chip actif incorrect
        // au chargement.
        window.addEventListener('load', updateScales);
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
