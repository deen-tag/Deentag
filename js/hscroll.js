/* ===== RANGÉES DE CARTES SWIPEABLES (accueil / invocations / coran) =====
   Effet de profondeur : la carte au centre du champ visible reste à pleine
   intensité, les cartes qui sortent du cadre s'estompent légèrement.
   Amélioration progressive : sans IntersectionObserver, tout reste visible. */
(function () {
  if (!('IntersectionObserver' in window)) return;

  function initRow(row) {
    var cards = row.querySelectorAll(':scope > .cat-card, :scope > .qnav-card');
    if (!cards.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('dimmed', entry.intersectionRatio < 0.6);
      });
    }, { root: row, threshold: [0, 0.3, 0.6, 0.9] });

    cards.forEach(function (c) { io.observe(c); });
  }

  function init() {
    document.querySelectorAll('.home-nav-grid, #quranNavGrid').forEach(initRow);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
