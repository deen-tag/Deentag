/* ============================================================
   DEENTAG — shop.js
   Logique de la page produit DEENTAG (montre NFC) :
   - bascule entre les modèles H / F dans la fiche d'achat
   - accordéon FAQ accessible (aria-expanded)
   - défilement doux vers l'offre (#dtBuy)
   - animation de révélation au scroll (.dt-reveal),
     désactivée si prefers-reduced-motion

   dtSelectModel et dtToggleAccord sont attachés via onclick,
   donc pas besoin de DT_registerInit pour elles.
   Le scroll doux et l'observer, eux, doivent être ré-initialisés
   à chaque navigation SPA vers cette page : on les passe par
   window.DT_registerInit.
   ============================================================ */

function dtSelectModel(model) {
  document.querySelectorAll('.dt-buy-tab').forEach(function (el) {
    var isActive = el.getAttribute('data-model') === model;
    el.classList.toggle('active', isActive);
    el.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
  document.querySelectorAll('.dt-buy-model').forEach(function (el) {
    el.classList.toggle('active', el.getAttribute('data-model') === model);
  });
}

function dtToggleAccord(button) {
  var accord = button.closest('.dt-accord');
  if (!accord) return;
  var isOpen = accord.classList.toggle('open');
  button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

if (typeof window !== 'undefined' && window.DT_registerInit) {
  window.DT_registerInit(function () {
    /* Défilement doux vers #dtBuy pour tous les liens de la page */
    document.querySelectorAll('a[href="#dtBuy"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = document.getElementById('dtBuy');
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    /* Reveal au scroll */
    var items = document.querySelectorAll('.dt-reveal');
    if (!items.length) return;

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
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
