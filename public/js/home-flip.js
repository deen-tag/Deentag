// ===== DEENTAG — HOME-FLIP.JS =====
// Déclenche la cascade d'animation "pièce qui tourne" sur les icônes
// d'une grille de navigation (accueil, page Coran...), une seule fois,
// quand toutes les cartes (icônes + titres) sont entièrement visibles.

(function () {

  function initFlipCascade(gridId, iconSelector, delayStep, threshold) {
    var grid = document.getElementById(gridId);
    if (!grid) return;

    var icons = Array.prototype.slice.call(grid.querySelectorAll(iconSelector));
    if (!icons.length) return;

    var hasPlayed = false;

    function playCascade() {
      icons.forEach(function (icon, i) {
        setTimeout(function () {
          icon.classList.add('flip-anim');
        }, i * delayStep);
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !hasPlayed) {
          hasPlayed = true;
          playCascade();
          observer.disconnect();
        }
      });
    }, { threshold: threshold });

    observer.observe(grid);
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Accueil : 4 cartes, la grille entière tient facilement à l'écran
    // -> seuil strict à 100% (déclenchement seulement quand tout est visible).
    initFlipCascade('homeNavGrid', '.cat-icon-circle', 110, 1.0);

    // Page Coran : 5 cartes sur 3 rangées, la grille dépasse souvent la
    // hauteur d'écran visible -> seuil à 80% pour rester fiable partout.
    initFlipCascade('quranNavGrid', '.qnav-icon', 110, 0.8);
  });

})();
