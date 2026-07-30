/* ==========================================================================
   ROSACE STATIQUE — invocations.html
   Amélioration progressive : transforme chaque .cat-grid (grille 2 colonnes
   existante, avec les vraies .cat-card / images / onclick="openSheet(...)")
   en rosace : une vedette centrale à taille fixe + les autres cartes du
   groupe réparties en cercle autour, toutes visibles en même temps.
   N'invente aucune donnée : déplace les noeuds DOM existants, ne les recrée
   pas — labels multilingues (.lang-block) et openSheet() restent intacts
   sans rien toucher à app.js / duas.js.

   Comportement :
   - la 1ère carte du groupe démarre en vedette (grande, au centre)
   - les autres sont réparties en cercle autour, à taille fixe, identique
     pour TOUS les groupes (2, 4 ou 6 cartes) — seul le nombre de petites
     cartes change, jamais le rayon ni les tailles
   - taper une petite carte l'échange avec la vedette (elle devient grande et
     centrale, l'ancienne vedette reprend sa place sur le cercle) : la
     vedette "tourne" par interaction, pas automatiquement
   - taper la vedette (déjà au centre) ouvre la bottom sheet existante
   - aucun scroll ni swipe à l'intérieur d'un groupe : tout est visible d'un
     coup, seul le scroll vertical normal de la page fait passer d'un groupe
     à l'autre
   - en scrollant la page, la rosace la plus proche du centre de l'écran
     grossit légèrement, les autres rétrécissent — et le chip actif
     (.section-chip) se met à jour en conséquence
   ========================================================================== */
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var wheels = []; // état de chaque rosace

  // Rayon fixe (px) du cercle de petites cartes autour de la vedette :
  // constant pour tous les groupes, c'est ce qui garantit que la vedette et
  // les petites cartes ont toujours la même taille, quel que soit le nombre
  // de cartes du groupe.
  var RADIUS = 100;

  function angleFor(i, n) {
    if (n <= 1) return 90; // une seule petite carte : sous la vedette
    return i * (360 / n) - 90; // sinon, réparties en cercle en partant du haut, dans le sens horaire
  }

  function buildRosette(section) {
    var grid = section.querySelector('.cat-grid');
    if (!grid) return null;
    var cards = Array.prototype.slice.call(grid.children).filter(function (c) {
      return c.classList.contains('cat-card');
    });
    if (!cards.length) return null;

    var stage = document.createElement('div');
    stage.className = 'orbit-stage orbit-stage--rosette';
    var ring = document.createElement('div');
    ring.className = 'orbit-ring';

    // 1ère carte = vedette de départ, au centre, taille fixe.
    var heroItem = document.createElement('div');
    heroItem.className = 'item rosette-hero is-front';
    heroItem.appendChild(cards[0]);
    heroItem.style.transform = 'translate(0px,0px)';
    ring.appendChild(heroItem);

    // Le reste des cartes = petites cartes réparties en cercle autour.
    var petalCards = cards.slice(1);
    var n = petalCards.length;
    var petalItems = petalCards.map(function (card, i) {
      var item = document.createElement('div');
      item.className = 'item rosette-petal';
      item.appendChild(card);
      var angle = angleFor(i, n);
      var rad = (angle * Math.PI) / 180;
      var x = Math.round(Math.cos(rad) * RADIUS);
      var y = Math.round(Math.sin(rad) * RADIUS);
      item.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      ring.appendChild(item);
      return item;
    });

    stage.appendChild(ring);
    grid.replaceWith(stage);

    return {
      section: section,
      stage: stage,
      ring: ring,
      heroItem: heroItem,
      petalItems: petalItems
    };
  }

  // Échange la carte tapée avec la vedette actuelle : seuls les noeuds
  // .cat-card changent de conteneur (.item), les positions/tailles restent
  // celles du slot (vedette centrale ou cercle) — donc pas de recalcul de
  // mise en page nécessaire.
  function promoteToHero(w, petalItem) {
    var heroCard = w.heroItem.firstElementChild;
    var petalCard = petalItem.firstElementChild;
    if (!heroCard || !petalCard) return;

    w.heroItem.appendChild(petalCard);
    petalItem.appendChild(heroCard);

    if (!reduceMotion) {
      w.heroItem.classList.add('is-pulsing');
      petalItem.classList.add('is-pulsing');
      setTimeout(function () {
        w.heroItem.classList.remove('is-pulsing');
        petalItem.classList.remove('is-pulsing');
      }, 800);
    }
  }

  function attachInteractions(w) {
    // Capture-phase : intercepte le clic natif sur une petite carte pour
    // l'échanger avec la vedette au lieu d'ouvrir tout de suite la sheet.
    w.stage.addEventListener('click', function (e) {
      var item = e.target.closest ? e.target.closest('.rosette-petal') : null;
      if (!item) return; // clic sur la vedette : laisser openSheet(...) natif s'exécuter
      e.stopPropagation();
      e.preventDefault();
      promoteToHero(w, item);
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
     on la redéfinit ici pour le flux vertical (dernière déclaration de
     fonction gagne : aucune modification de app.js nécessaire). */
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
      var w = buildRosette(section);
      if (!w) return;
      attachInteractions(w);
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
