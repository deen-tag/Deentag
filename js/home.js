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

  // ── Badge profil (topbar) ──
  function renderAccountCard() {
    if (!window.DT) return;
    var avatarEl = document.getElementById('topbarProfileAvatar');
    if (!avatarEl) return;

    var profile = window.DT.getActiveProfile ? window.DT.getActiveProfile() : null;

    if (!profile) {
      avatarEl.innerHTML = window.DT._domeHTML ? window.DT._domeHTML('+', '#C9A84C', 24) : '';
      return;
    }

    var initial = (profile.name || '?').charAt(0).toUpperCase();
    if (profile.photo && window.DT._domePhotoHTML) {
      avatarEl.innerHTML = window.DT._domePhotoHTML(profile.photo, 24, profile.id);
    } else if (window.DT._domeHTML) {
      avatarEl.innerHTML = window.DT._domeHTML(initial, profile.color || '#C9A84C', 24);
    }
  }

  window.DT_refreshAccountCardLang = renderAccountCard;

  // ── Badge "Salam · <prénom>" (sous le titre Accueil) ──
  function renderGreeting() {
    if (!window.DT) return;
    var textEl = document.getElementById('homeGreetingText');
    var dotEl  = document.getElementById('homeGreetingDot');
    if (!textEl) return;

    var profile = window.DT.getActiveProfile ? window.DT.getActiveProfile() : null;

    if (profile && profile.name) {
      textEl.textContent = 'Salam · ' + profile.name;
      if (dotEl) dotEl.style.background = profile.color || '#C9A84C';
    } else {
      var createProfileLabel = (window.DT.t ? window.DT.t('greetingCreateProfile') : 'Crée ton profil');
      textEl.textContent = 'Salam · ' + createProfileLabel;
      if (dotEl) dotEl.style.background = '#C9A84C';
    }
  }

  window.DT_refreshGreetingLang = renderGreeting;

  document.addEventListener('DOMContentLoaded', function () {
    // profiles.js s'initialise sur le même DOMContentLoaded : on laisse
    // un court délai pour être sûr que window.DT soit prêt.
    setTimeout(renderAccountCard, 50);
    setTimeout(renderGreeting, 50);
  });

  // Rafraîchit dès qu'un profil est créé, modifié ou changé (profiles.js
  // envoie cet événement après chaque sauvegarde/sélection de profil).
  window.addEventListener('deentag:profileChanged', function () {
    renderAccountCard();
    renderGreeting();
  });

})();
