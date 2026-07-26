// ===== DEENTAG — HOME.JS =====
// Widget "invocation du moment" affiché uniquement sur l'accueil (index.html).
// Choisit une invocation existante selon le moment de la journée et
// renvoie vers invocations.html en réutilisant le mécanisme de deep-link
// déjà en place pour les tags NFC (?page=...&acc=...).

(function () {

  // Créneaux horaires -> catégorie/item déjà existants dans DUAS.
  // Les heures de fin sont exclusives. La nuit (21h-5h) est gérée en
  // décalant les heures < 5 de +24 pour rester dans un seul segment continu.
  var SLOTS = [
    { start: 5,  end: 11, cat: 'reveil', acc: 'acc1' }, // au réveil
    { start: 11, end: 15, cat: 'repas',  acc: 'acc1' }, // avant de manger
    { start: 15, end: 21, cat: 'maison', acc: 'acc1' }, // en rentrant chez soi
    { start: 21, end: 29, cat: 'reveil', acc: 'acc2' }  // au coucher
  ];

  function getLang() {
    return localStorage.getItem('deentag_lang') || 'fr';
  }

  function pickSlot() {
    var h = new Date().getHours();
    if (h < 5) h += 24;
    for (var i = 0; i < SLOTS.length; i++) {
      if (h >= SLOTS[i].start && h < SLOTS[i].end) return SLOTS[i];
    }
    return SLOTS[0];
  }

  function renderHomeWidget() {
    var widget = document.getElementById('homeWidget');
    if (!widget || !window.DUAS) return;

    var slot = pickSlot();
    var item = DUAS[slot.cat] && DUAS[slot.cat][slot.acc];
    if (!item) return;

    var lang = getLang();
    var arabeEl = document.getElementById('homeWidgetArabe');
    var tradEl  = document.getElementById('homeWidgetTrad');
    var linkEl  = document.getElementById('homeWidgetLink');

    if (arabeEl) arabeEl.textContent = item.arabe || '';
    if (tradEl)  tradEl.textContent  = (item.traduction && (item.traduction[lang] || item.traduction.fr)) || '';
    if (linkEl)  linkEl.href = 'invocations.html?page=' + slot.cat + '&acc=' + slot.acc;
  }

  // Suit la même convention que DT_refreshNavLang / DT_refreshPrayerLang :
  // app.js appelle ce hook après chaque changement de langue.
  window.DT_refreshHomeWidgetLang = renderHomeWidget;

  document.addEventListener('DOMContentLoaded', renderHomeWidget);
})();
