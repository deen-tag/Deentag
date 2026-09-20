/* ============================================================
   DEENTAG — shop.js
   Logique de la page produit DEENTAG (montre NFC) :
   - bascule entre les modèles H / F dans la fiche d'achat
   - animation de révélation au scroll (.dt-reveal)
   - scroll vers l'offre

   dtSelectModel et dtScrollToBuy sont attachés via onclick, donc
   pas besoin de DT_registerInit pour elles (comme avant).
   L'observer de scroll, lui, doit être ré-initialisé à chaque
   navigation SPA vers cette page : on le passe par
   window.DT_registerInit.
   ============================================================ */

function dtSelectModel(model) {
  document.querySelectorAll('.dt-buy-tab').forEach(function (el) {
    el.classList.toggle('active', el.getAttribute('data-model') === model);
  });
  document.querySelectorAll('.dt-buy-model').forEach(function (el) {
    el.classList.toggle('active', el.getAttribute('data-model') === model);
  });
}

function dtScrollToBuy() {
  var el = document.getElementById('dtBuy');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

if (typeof window !== 'undefined' && window.DT_registerInit) {
  window.DT_registerInit(function () {
    var items = document.querySelectorAll('.dt-reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach(function (el) {
      el.classList.remove('is-visible');
      observer.observe(el);
    });
  });
}
