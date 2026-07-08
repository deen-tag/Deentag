(function () {

  // Fix Safari (surtout navigation privée) qui calcule mal 100dvh
  // à cause de sa barre d'outils qui ne se rétracte pas pareil.
  function setAppVH() {
    var h = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
    document.documentElement.style.setProperty('--app-vh', h + 'px');
  }
  setAppVH();
  // Exposée pour que d'autres scripts (ex: ouverture du lecteur de sourate)
  // puissent forcer ce recalcul au bon moment, sans dépendre d'un scroll
  // ou d'un resize qui ne se déclenche pas toujours spontanément.
  window.DT_setAppVH = setAppVH;
  window.addEventListener('resize', setAppVH);
  window.addEventListener('orientationchange', setAppVH);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', setAppVH);
    window.visualViewport.addEventListener('scroll', setAppVH);
  }
  // Certains navigateurs (Chrome Android) rétractent leur barre d'adresse
  // juste après le premier rendu, sans déclencher resize tout de suite :
  // on re-mesure à quelques reprises pour rattraper ce changement tardif.
  [50, 150, 300, 600, 1000].forEach(function (delay) {
    setTimeout(setAppVH, delay);
  });

  var IMGS = {
    duas:     'images/nav-invocations.webp',
    coran:    'images/nav-coran.webp',
    enfants:  'images/nav-enfants.webp',
    boutique: 'images/nav-boutique.webp',
    adulte:   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj4KICA8IS0tIEZvbmQgcm9uZCBkb3V4IC0tPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iOTAiIGZpbGw9IiNGRkYzREMiLz4KICA8IS0tIFRvaXQgLS0+CiAgPHBvbHlnb24gcG9pbnRzPSIxMDAsMzUgMTU1LDg1IDQ1LDg1IiBmaWxsPSIjRThCODRCIiBzdHJva2U9IiNCODg1MkUiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogIDwhLS0gQ2hlbWluw6llIC0tPgogIDxyZWN0IHg9IjEyMCIgeT0iNTAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIyOCIgcng9IjMiIGZpbGw9IiNDOUE4NEMiIHN0cm9rZT0iI0I4ODUyRSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPCEtLSBNdXJzIC0tPgogIDxyZWN0IHg9IjUyIiB5PSI4MyIgd2lkdGg9Ijk2IiBoZWlnaHQ9IjcyIiByeD0iOCIgZmlsbD0iI0ZGRkJGMCIgc3Ryb2tlPSIjRThCODRCIiBzdHJva2Utd2lkdGg9IjQiLz4KICA8IS0tIFBvcnRlIC0tPgogIDxyZWN0IHg9Ijg0IiB5PSIxMTgiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzNyIgcng9IjEwIiBmaWxsPSIjRThCODRCIiBzdHJva2U9IiNCODg1MkUiIHN0cm9rZS13aWR0aD0iMyIvPgogIDwhLS0gUG9pZ27DqWUgLS0+CiAgPGNpcmNsZSBjeD0iMTEwIiBjeT0iMTM4IiByPSI0IiBmaWxsPSIjQjg4NTJFIi8+CiAgPCEtLSBGZW7DqnRyZSBnYXVjaGUgLS0+CiAgPHJlY3QgeD0iNjAiIHk9Ijk2IiB3aWR0aD0iMjQiIGhlaWdodD0iMjIiIHJ4PSI1IiBmaWxsPSIjQUVFNEZGIiBzdHJva2U9IiNFOEI4NEIiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxsaW5lIHgxPSI3MiIgeTE9Ijk2IiB4Mj0iNzIiIHkyPSIxMTgiIHN0cm9rZT0iI0U4Qjg0QiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPGxpbmUgeDE9IjYwIiB5MT0iMTA3IiB4Mj0iODQiIHkyPSIxMDciIHN0cm9rZT0iI0U4Qjg0QiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPCEtLSBGZW7DqnRyZSBkcm9pdGUgLS0+CiAgPHJlY3QgeD0iMTE2IiB5PSI5NiIgd2lkdGg9IjI0IiBoZWlnaHQ9IjIyIiByeD0iNSIgZmlsbD0iI0FFRTRGRiIgc3Ryb2tlPSIjRThCODRCIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8bGluZSB4MT0iMTI4IiB5MT0iOTYiIHgyPSIxMjgiIHkyPSIxMTgiIHN0cm9rZT0iI0U4Qjg0QiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPGxpbmUgeDE9IjExNiIgeTE9IjEwNyIgeDI9IjE0MCIgeTI9IjEwNyIgc3Ryb2tlPSIjRThCODRCIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8IS0tIMOJdG9pbGUgZMOpY28gLS0+CiAgPHRleHQgeD0iOTYiIHk9IjMwIiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7inKY8L3RleHQ+Cjwvc3ZnPgo='
  };

  var NAV_I18N = {
    fr:{ duas:'Invocations', coran:'Coran', enfants:'Enfants', boutique:'Boutique', adulte:'Adulte',
         exitTitle:'Aller vers l\'espace Adulte ?', exitSub:'À bientôt sur Deentag Kids ! 👋', exitCancel:'Annuler', exitContinue:'Continuer' },
    en:{ duas:'Prayers',     coran:'Quran', enfants:'Kids',    boutique:'Shop',     adulte:'Adult',
         exitTitle:'Go to the Adult space?', exitSub:'See you soon on Deentag Kids! 👋', exitCancel:'Cancel', exitContinue:'Continue' },
    es:{ duas:'Súplicas',    coran:'Corán', enfants:'Niños',   boutique:'Tienda',   adulte:'Adulto',
         exitTitle:'¿Ir al espacio Adulto?', exitSub:'¡Hasta pronto en Deentag Kids! 👋', exitCancel:'Cancelar', exitContinue:'Continuar' },
    de:{ duas:'Bittgebete',  coran:'Koran', enfants:'Kinder',  boutique:'Shop',     adulte:'Erwachsene',
         exitTitle:'Zum Erwachsenenbereich wechseln?', exitSub:'Bis bald bei Deentag Kids! 👋', exitCancel:'Abbrechen', exitContinue:'Weiter' },
    it:{ duas:'Invocazioni', coran:'Corano', enfants:'Bambini', boutique:'Negozio', adulte:'Adulto',
         exitTitle:'Andare nello spazio Adulti?', exitSub:'A presto su Deentag Kids! 👋', exitCancel:'Annulla', exitContinue:'Continua' },
    nl:{ duas:'Smeekbeden',  coran:'Koran', enfants:'Kinderen', boutique:'Winkel',  adulte:'Volwassene',
         exitTitle:'Naar de Volwassenenruimte?', exitSub:'Tot snel bij Deentag Kids! 👋', exitCancel:'Annuleren', exitContinue:'Doorgaan' },
    pt:{ duas:'Súplicas',    coran:'Alcorão', enfants:'Crianças', boutique:'Loja',  adulte:'Adulto',
         exitTitle:'Ir para o espaço Adulto?', exitSub:'Até já no Deentag Kids! 👋', exitCancel:'Cancelar', exitContinue:'Continuar' },
    tr:{ duas:'Dualar',      coran:'Kur\'an', enfants:'Çocuklar', boutique:'Mağaza', adulte:'Yetişkin',
         exitTitle:'Yetişkin alanına geçilsin mi?', exitSub:'Deentag Kids\'te yakında görüşürüz! 👋', exitCancel:'İptal', exitContinue:'Devam et' }
  };
  function navGetLang() { return localStorage.getItem('deentag_lang') || 'fr'; }
  function navLabels()  { return NAV_I18N[navGetLang()] || NAV_I18N.fr; }
  var LABELS = navLabels();

  /* ── Confirmation légère avant de quitter le mode enfant ──
     Pas un vrai verrou parental : juste assez de friction pour éviter
     qu'un enfant bascule par erreur vers l'espace Adulte en un tap. */
  function injectExitModalCSS() {
    if (document.getElementById('kids-exit-css')) return;
    var style = document.createElement('style');
    style.id  = 'kids-exit-css';
    style.textContent =
      '.kids-exit-modal{position:fixed;inset:0;z-index:300;background:rgba(17,22,58,.75);' +
      'backdrop-filter:blur(4px);display:none;align-items:center;justify-content:center;padding:24px;}' +
      '.kids-exit-modal.open{display:flex;}' +
      '.kids-exit-box{width:100%;max-width:320px;background:var(--paper,#fffaf0);border-radius:28px;' +
      'box-shadow:0 20px 60px rgba(0,0,0,.25);padding:26px 22px 22px;text-align:center;position:relative;}' +
      '.kids-exit-logo{position:absolute;top:14px;right:16px;width:34px;height:34px;object-fit:contain;}' +
      '.kids-exit-emoji{font-size:40px;margin-bottom:10px;}' +
      '.kids-exit-title{font-family:"Baloo 2",cursive;font-weight:800;font-size:18px;color:var(--ink,#2C4A3E);margin-bottom:8px;}' +
      '.kids-exit-sub{font-family:"Baloo 2",cursive;font-size:13px;color:#5a7a6a;line-height:1.5;margin-bottom:20px;}' +
      '.kids-exit-actions{display:flex;gap:10px;}' +
      '.kids-exit-cancel,.kids-exit-continue{flex:1;padding:12px;border-radius:50px;border:none;' +
      'font-family:"Baloo 2",cursive;font-weight:800;font-size:14px;cursor:pointer;}' +
      '.kids-exit-cancel{background:#eee;color:#555;}' +
      '.kids-exit-continue{background:linear-gradient(135deg,#C9A84C,#e8c96d);color:#fff;}';
    document.head.appendChild(style);
  }

  function navConfirmExitKids(href) {
    injectExitModalCSS();
    var t = navLabels();
    var modal = document.getElementById('kids-exit-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'kids-exit-modal';
      modal.className = 'kids-exit-modal';
      modal.onclick = function (e) { if (e.target === modal) modal.classList.remove('open'); };
      document.body.appendChild(modal);
    }
    modal.innerHTML =
      '<div class="kids-exit-box" onclick="event.stopPropagation()">' +
        '<img src="images/kids_logo.webp" alt="Deentag Kids" class="kids-exit-logo">' +
        '<div class="kids-exit-emoji">👋</div>' +
        '<div class="kids-exit-title">' + t.exitTitle + '</div>' +
        '<div class="kids-exit-sub">' + t.exitSub + '</div>' +
        '<div class="kids-exit-actions">' +
          '<button class="kids-exit-cancel" onclick="document.getElementById(\'kids-exit-modal\').classList.remove(\'open\')">' + t.exitCancel + '</button>' +
          '<button class="kids-exit-continue" onclick="window.location.href=\'' + href + '\'">' + t.exitContinue + '</button>' +
        '</div>' +
      '</div>';
    modal.classList.add('open');
  }
  window.navConfirmExitKids = navConfirmExitKids;

  var ADULT_TABS = [
    { id: 'duas',     href: 'index.html' },
    { id: 'coran',    href: 'quran.html' },
    { id: 'enfants',  href: 'kids.html'  },
    { id: 'boutique', href: 'shop.html'  }
  ];

  var KIDS_IMGS = {
    adulte: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj4KICA8IS0tIEZvbmQgcm9uZCBkb3V4IC0tPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iOTAiIGZpbGw9IiNGRkYzREMiLz4KICA8IS0tIFRvaXQgLS0+CiAgPHBvbHlnb24gcG9pbnRzPSIxMDAsMzUgMTU1LDg1IDQ1LDg1IiBmaWxsPSIjRThCODRCIiBzdHJva2U9IiNCODg1MkUiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogIDwhLS0gQ2hlbWluw6llIC0tPgogIDxyZWN0IHg9IjEyMCIgeT0iNTAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIyOCIgcng9IjMiIGZpbGw9IiNDOUE4NEMiIHN0cm9rZT0iI0I4ODUyRSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPCEtLSBNdXJzIC0tPgogIDxyZWN0IHg9IjUyIiB5PSI4MyIgd2lkdGg9Ijk2IiBoZWlnaHQ9IjcyIiByeD0iOCIgZmlsbD0iI0ZGRkJGMCIgc3Ryb2tlPSIjRThCODRCIiBzdHJva2Utd2lkdGg9IjQiLz4KICA8IS0tIFBvcnRlIC0tPgogIDxyZWN0IHg9Ijg0IiB5PSIxMTgiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzNyIgcng9IjEwIiBmaWxsPSIjRThCODRCIiBzdHJva2U9IiNCODg1MkUiIHN0cm9rZS13aWR0aD0iMyIvPgogIDwhLS0gUG9pZ27DqWUgLS0+CiAgPGNpcmNsZSBjeD0iMTEwIiBjeT0iMTM4IiByPSI0IiBmaWxsPSIjQjg4NTJFIi8+CiAgPCEtLSBGZW7DqnRyZSBnYXVjaGUgLS0+CiAgPHJlY3QgeD0iNjAiIHk9Ijk2IiB3aWR0aD0iMjQiIGhlaWdodD0iMjIiIHJ4PSI1IiBmaWxsPSIjQUVFNEZGIiBzdHJva2U9IiNFOEI4NEIiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxsaW5lIHgxPSI3MiIgeTE9Ijk2IiB4Mj0iNzIiIHkyPSIxMTgiIHN0cm9rZT0iI0U4Qjg0QiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPGxpbmUgeDE9IjYwIiB5MT0iMTA3IiB4Mj0iODQiIHkyPSIxMDciIHN0cm9rZT0iI0U4Qjg0QiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPCEtLSBGZW7DqnRyZSBkcm9pdGUgLS0+CiAgPHJlY3QgeD0iMTE2IiB5PSI5NiIgd2lkdGg9IjI0IiBoZWlnaHQ9IjIyIiByeD0iNSIgZmlsbD0iI0FFRTRGRiIgc3Ryb2tlPSIjRThCODRCIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8bGluZSB4MT0iMTI4IiB5MT0iOTYiIHgyPSIxMjgiIHkyPSIxMTgiIHN0cm9rZT0iI0U4Qjg0QiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPGxpbmUgeDE9IjExNiIgeTE9IjEwNyIgeDI9IjE0MCIgeTI9IjEwNyIgc3Ryb2tlPSIjRThCODRCIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8IS0tIMOJdG9pbGUgZMOpY28gLS0+CiAgPHRleHQgeD0iOTYiIHk9IjMwIiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7inKY8L3RleHQ+Cjwvc3ZnPgo=',
    duas:   'images/nav-invocations.webp',
    coran:  'images/nav-coran.webp'
  };

  function kidsTabs(adulteHref) {
    return [
      { id: 'duas',   href: 'kids.html'       },
      { id: 'coran',  href: 'quran-kids.html' },
      { id: 'adulte', href: adulteHref         }
    ];
  }

  var PAGES = {
    'index':      { mode: 'adult', active: 'duas',     tabs: ADULT_TABS },
    'quran':      { mode: 'adult', active: 'coran',    tabs: ADULT_TABS },
    'shop':       { mode: 'adult', active: 'boutique', tabs: ADULT_TABS },
    'kids':       { mode: 'kids',  active: 'duas',     tabs: kidsTabs('index.html') },
    'quran-kids': { mode: 'kids',  active: 'coran',    tabs: kidsTabs('quran.html') }
  };

  var _builtCfg = null, _builtTabbar = null;

  function buildNav(cfg) {
    LABELS = navLabels();
    var nav = document.createElement('nav');
    nav.className = 'app-tabbar';
    nav.setAttribute('aria-label', 'Navigation principale');
    var html = '';
    cfg.tabs.forEach(function (tab) {
      var isActive = tab.id === cfg.active;
      var isKidsExitTab = cfg.mode === 'kids' && tab.id === 'adulte';
      html +=
        '<a href="' + (isKidsExitTab ? '#' : tab.href) + '" class="tab' + (isActive ? ' active' : '') + '"' +
        (isActive ? ' aria-current="page"' : '') +
        (isKidsExitTab ? ' onclick="event.preventDefault();navConfirmExitKids(\'' + tab.href + '\')"' : '') +
        ' aria-label="' + LABELS[tab.id] + '">' +
        '<div class="tab-icon">' +
        '<img src="' + (cfg.mode === 'kids' && KIDS_IMGS[tab.id] ? KIDS_IMGS[tab.id] : IMGS[tab.id]) + '" alt="' + LABELS[tab.id] + '" draggable="false"/>' +
        '</div>' +
        '<span>' + LABELS[tab.id] + '</span>' +
        '</a>';
    });
    nav.innerHTML = html;
    _builtCfg = cfg;
    _builtTabbar = nav;
    return nav;
  }

  /* ── Remet à jour les libellés de la tabbar sans la reconstruire ──
     Appelée par chaque fonction applyLang/setLang des différentes pages,
     pour que le changement de langue soit immédiat, sans rafraîchir. */
  function refreshNavLang() {
    if (!_builtCfg || !_builtTabbar) return;
    LABELS = navLabels();
    var links = _builtTabbar.querySelectorAll('a.tab');
    _builtCfg.tabs.forEach(function (tab, i) {
      var a = links[i];
      if (!a) return;
      var label = LABELS[tab.id];
      a.setAttribute('aria-label', label);
      var span = a.querySelector('span');
      if (span) span.textContent = label;
      var img = a.querySelector('img');
      if (img) img.alt = label;
    });
  }
  window.DT_refreshNavLang = refreshNavLang;




  function initSmartTabbar(tabbar) {
    var lastY = window.scrollY || 0;
    var hidden = false;
    var ticking = false;
    var THRESHOLD = 10;
    function update() {
      var y = window.scrollY || 0;
      var delta = y - lastY;
      if (delta > THRESHOLD && !hidden) { tabbar.classList.add('tabbar-hidden'); hidden = true; }
      else if (delta < -THRESHOLD && hidden) { tabbar.classList.remove('tabbar-hidden'); hidden = false; }
      lastY = y; ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  // Révèle la tabbar seulement quand le viewport a fini de bouger
  // (la barre d'adresse du navigateur se rétracte après le chargement,
  // ce qui déplace un élément position:fixed;bottom:0 — on attend que
  // ça se stabilise pour éviter le saut visible).
  function revealWhenStable(tabbar) {
    var revealed = false;
    var debounceTimer = null;
    var maxWaitTimer = null;

    function reveal() {
      if (revealed) return;
      revealed = true;
      clearTimeout(debounceTimer);
      clearTimeout(maxWaitTimer);
      window.removeEventListener('resize', onResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', onResize);
      }
      requestAnimationFrame(function () {
        tabbar.classList.add('tabbar-ready');
      });
    }

    function onResize() {
      // Chaque resize repousse la révélation de 150ms : on ne montre la
      // tabbar qu'une fois que le viewport ne bouge plus.
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(reveal, 150);
    }

    window.addEventListener('resize', onResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', onResize);
    }
    // Filet de sécurité : si aucun resize ne se déclenche (desktop, PWA
    // déjà stable...), on révèle quand même après un court délai.
    maxWaitTimer = setTimeout(reveal, 400);
  }

  function init() {
    var page = document.body.getAttribute('data-page');
    var cfg = page && PAGES[page];
    if (!cfg) return;
    var tabbar = buildNav(cfg);
    document.body.appendChild(tabbar);
    document.body.classList.add('has-tabbar');
    initSmartTabbar(tabbar);

    // Certains navigateurs ne repositionnent des éléments position:fixed
    // qu'au premier scroll — sans ça, aucun resize ne se déclenche et notre
    // logique d'attente ne sert à rien. On force ce recalcul immédiatement,
    // pendant que la tabbar est encore invisible.
    requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset || 0;
      window.scrollTo(0, y + 1);
      window.scrollTo(0, y);
      revealWhenStable(tabbar);
    });

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
