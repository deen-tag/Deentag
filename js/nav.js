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

  var LABELS = {
    duas:     'Invocations',
    coran:    'Coran',
    enfants:  'Enfants',
    boutique: 'Boutique',
    adulte:   'Adulte'
  };

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
      { id: 'adulte', href: adulteHref         },
      { id: 'coran',  href: 'quran-kids.html' }
    ];
  }

  var PAGES = {
    'index':      { mode: 'adult', active: 'duas',     tabs: ADULT_TABS },
    'quran':      { mode: 'adult', active: 'coran',    tabs: ADULT_TABS },
    'shop':       { mode: 'adult', active: 'boutique', tabs: ADULT_TABS },
    'kids':       { mode: 'kids',  active: 'duas',     tabs: kidsTabs('index.html') },
    'quran-kids': { mode: 'kids',  active: 'coran',    tabs: kidsTabs('quran.html') }
  };

  function buildNav(cfg) {
    var nav = document.createElement('nav');
    nav.className = 'app-tabbar';
    nav.setAttribute('aria-label', 'Navigation principale');
    var html = '';
    cfg.tabs.forEach(function (tab) {
      var isActive = tab.id === cfg.active;
      html +=
        '<a href="' + tab.href + '" class="tab' + (isActive ? ' active' : '') + '"' +
        (isActive ? ' aria-current="page"' : '') +
        ' aria-label="' + LABELS[tab.id] + '">' +
        '<div class="tab-icon">' +
        '<img src="' + (cfg.mode === 'kids' && KIDS_IMGS[tab.id] ? KIDS_IMGS[tab.id] : IMGS[tab.id]) + '" alt="' + LABELS[tab.id] + '" draggable="false"/>' +
        '</div>' +
        '<span>' + LABELS[tab.id] + '</span>' +
        '</a>';
    });
    nav.innerHTML = html;
    return nav;
  }



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
