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
  // Phrases "du jour" affichées sous la barre Salam · Prénom, une fois
  // qu'un profil existe. Elles orientent vers la fiche profil (qui montre
  // la progression : sourates/versets/invocations mémorisés), pas vers
  // du nouveau contenu à apprendre.
  var GREETING_PHRASES = {
    fr: ['Jette un œil à tes sourates mémorisées', 'Jette un œil à tes invocations mémorisées', 'Regarde ce que tu as déjà mémorisé', 'Vois où tu en es dans ton parcours', 'Un coup d\'œil sur ta progression ?', 'Regarde le chemin parcouru jusqu\'ici'],
    en: ['Check out your memorized surahs', 'Check out your memorized supplications', 'See what you\'ve already memorized', 'See where you are in your journey', 'A quick look at your progress?', 'Look back at how far you\'ve come'],
    es: ['Echa un vistazo a tus suras memorizadas', 'Echa un vistazo a tus súplicas memorizadas', 'Mira lo que ya has memorizado', 'Mira en qué punto estás de tu camino', '¿Un vistazo a tu progreso?', 'Mira el camino recorrido hasta ahora'],
    de: ['Wirf einen Blick auf deine gelernten Suren', 'Wirf einen Blick auf deine gelernten Bittgebete', 'Sieh dir an, was du schon gelernt hast', 'Sieh, wo du auf deinem Weg stehst', 'Ein Blick auf deinen Fortschritt?', 'Schau zurück, wie weit du gekommen bist'],
    it: ['Dai un\'occhiata alle tue sure memorizzate', 'Dai un\'occhiata alle tue invocazioni memorizzate', 'Guarda cosa hai già memorizzato', 'Guarda a che punto sei nel tuo percorso', 'Uno sguardo ai tuoi progressi?', 'Guarda la strada percorsa finora'],
    nl: ['Werp een blik op je gememoriseerde soera\'s', 'Werp een blik op je gememoriseerde smeekbeden', 'Bekijk wat je al hebt gememoriseerd', 'Bekijk waar je staat in je traject', 'Even kijken naar je voortgang?', 'Kijk terug op de afgelegde weg'],
    pt: ['Dá uma olhada nas tuas suras memorizadas', 'Dá uma olhada nas tuas invocações memorizadas', 'Vê o que já memorizaste', 'Vê em que ponto estás do teu percurso', 'Um olhar sobre o teu progresso?', 'Olha para o caminho percorrido até aqui'],
    tr: ['Ezberlediğin surelere göz at', 'Ezberlediğin dualara göz at', 'Şimdiye kadar ezberlediklerine bak', 'Yolculuğunda nerede olduğuna bak', 'İlerlemene bir göz atalım mı?', 'Buraya kadar kat ettiğin yola bak']
  };

  // Choisit un index "au hasard" mais stable pour toute la journée
  // (même phrase du matin au soir, différente le lendemain).
  function dailyPhraseIndex(max) {
    var d = new Date();
    var seed = d.getFullYear() * 1000 + Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
    var x = Math.sin(seed) * 10000;
    return Math.floor((x - Math.floor(x)) * max);
  }

  function getDailyGreetingPhrase() {
    var lang = getLang();
    var list = GREETING_PHRASES[lang] || GREETING_PHRASES.fr;
    return list[dailyPhraseIndex(list.length)];
  }

  var NO_PROFILE_PHRASE = {
    fr: 'Un espace pour suivre tout ce que tu mémorises',
    en: 'A space to track everything you memorize',
    es: 'Un espacio para seguir todo lo que memorizas',
    de: 'Ein Ort, um alles zu verfolgen, was du auswendig lernst',
    it: 'Uno spazio per seguire tutto ciò che memorizzi',
    nl: 'Een plek om alles te volgen wat je memoriseert',
    pt: 'Um espaço para seguir tudo o que memorizas',
    tr: 'Ezberlediğin her şeyi takip edebileceğin bir alan'
  };

  function getNoProfilePhrase() {
    var lang = getLang();
    return NO_PROFILE_PHRASE[lang] || NO_PROFILE_PHRASE.fr;
  }

  function renderGreeting() {
    if (!window.DT) return;
    var textEl = document.getElementById('homeGreetingText');
    var dotEl  = document.getElementById('homeGreetingDot');
    var phraseEl = document.getElementById('homeGreetingPhrase');
    if (!textEl) return;

    var profile = window.DT.getActiveProfile ? window.DT.getActiveProfile() : null;

    if (profile && profile.name) {
      textEl.textContent = 'Salam · ' + profile.name;
      if (dotEl) dotEl.style.background = profile.color || '#C9A84C';
      if (phraseEl) {
        phraseEl.textContent = getDailyGreetingPhrase();
        phraseEl.classList.add('visible');
      }
    } else {
      var createProfileLabel = (window.DT.t ? window.DT.t('greetingCreateProfile') : 'Crée ton profil');
      textEl.textContent = 'Salam · ' + createProfileLabel;
      if (dotEl) dotEl.style.background = '#C9A84C';
      if (phraseEl) {
        phraseEl.textContent = getNoProfilePhrase();
        phraseEl.classList.add('visible');
      }
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
