/* ============================================================
   DEENTAG — shop.js
   Logique de la page produit Dentag : accordéon FAQ, scroll vers
   l'offre, modal "bientôt disponible" pour le bouton d'achat.

   Écouteurs attachés une seule fois sur document (délégation),
   donc pas besoin de DT_registerInit : ça reste actif après une
   navigation SPA sans avoir à être ré-initialisé.
   ============================================================ */

function dtToggleAccord(headerEl) {
  var accord = headerEl.closest('.dt-accord');
  if (!accord) return;
  var wasOpen = accord.classList.contains('open');
  accord.parentElement.querySelectorAll('.dt-accord.open').forEach(function (el) {
    if (el !== accord) el.classList.remove('open');
  });
  accord.classList.toggle('open', !wasOpen);
}

function dtScrollToBuy() {
  var el = document.getElementById('dtBuy');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function dtHandleBuy() {
  var overlay = document.getElementById('dtSoonOverlay');
  if (overlay) overlay.classList.add('show');
}

function dtCloseSoon() {
  var overlay = document.getElementById('dtSoonOverlay');
  if (overlay) overlay.classList.remove('show');
}

// Ferme la modal si on clique sur le fond
document.addEventListener('click', function (e) {
  if (e.target && e.target.id === 'dtSoonOverlay') {
    dtCloseSoon();
  }
});
