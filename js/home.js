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

  // ── Carte "Mon compte" ──
  function renderAccountCard() {
    if (!window.DT) return;
    var avatarEl = document.getElementById('accountCardAvatar');
    var nameEl   = document.getElementById('accountCardName');
    var statsEl  = document.getElementById('accountCardStats');
    if (!avatarEl || !nameEl || !statsEl) return;

    var profile = window.DT.getActiveProfile ? window.DT.getActiveProfile() : null;

    if (!profile) {
      avatarEl.innerHTML = window.DT._domeHTML ? window.DT._domeHTML('+', '#C9A84C', 40) : '';
      nameEl.textContent  = window.DT.t ? window.DT.t('onboardTitle') : 'Créez votre profil';
      statsEl.textContent = window.DT.t ? window.DT.t('onboardCta')  : 'Commencer';
      return;
    }

    var initial = (profile.name || '?').charAt(0).toUpperCase();
    if (profile.photo && window.DT._domePhotoHTML) {
      avatarEl.innerHTML = window.DT._domePhotoHTML(profile.photo, 40, profile.id);
    } else if (window.DT._domeHTML) {
      avatarEl.innerHTML = window.DT._domeHTML(initial, profile.color || '#C9A84C', 40);
    }
    nameEl.textContent = (profile.name || '').split(' ')[0] || '';

    var stats = window.DT.getStats ? window.DT.getStats() : { total: 0, surahs: 0, duas: 0 };
    if (stats.total > 0) {
      statsEl.textContent = stats.surahs + ' ' + (window.DT.t ? window.DT.t('surasMemorized') : 'sourates') +
        ' \u00b7 ' + stats.duas + ' ' + (window.DT.t ? window.DT.t('duasMemorized') : 'invocations');
    } else {
      statsEl.textContent = window.DT.t ? window.DT.t('noRecentActivity') : 'Aucune activité récente';
    }
  }

  window.DT_refreshAccountCardLang = renderAccountCard;
  document.addEventListener('DOMContentLoaded', function () {
    // profiles.js s'initialise sur le même DOMContentLoaded : on laisse
    // un court délai pour être sûr que window.DT soit prêt.
    setTimeout(renderAccountCard, 50);
  });

})();
