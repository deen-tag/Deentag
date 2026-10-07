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
  /* Formulaire de réservation : modèle caché + libellé du bouton */
  var input = document.getElementById('dtModelInput');
  if (input) input.value = model;
  var btn = document.getElementById('dtSubmit');
  var form = document.getElementById('dtWaitlist');
  var base = (form && form.getAttribute('data-btn-reserve')) || 'DEENTAG {model}';
  if (btn && !btn.disabled) btn.textContent = base.replace('{model}', model.toUpperCase());
}

function dtToggleAccord(button) {
  var accord = button.closest('.dt-accord');
  if (!accord) return;
  var isOpen = accord.classList.toggle('open');
  button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}


/* ── FORMULAIRE DE RÉSERVATION (liste de lancement) ──
   POST /api/waitlist. Si le serveur n'est pas configuré (501) ou en cas
   d'erreur réseau, on bascule sur un mailto pré-rempli : aucune inscription
   n'est perdue. */
function dtInitWaitlist() {
  var form = document.getElementById('dtWaitlist');
  if (!form || form.dataset.bound === '1') return;
  form.dataset.bound = '1';

  var emailEl = document.getElementById('dtEmail');
  var msg = document.getElementById('dtFormMsg');
  var btn = document.getElementById('dtSubmit');
  var locale = document.documentElement.lang || 'fr';

  /* Tous les textes viennent de data-* sur le <form> : ils sont traduits
     dans content/shop/<langue>.html, aucun texte en dur ici. */
  function txt(name) { return form.getAttribute('data-' + name) || ''; }

  function show(text, kind) {
    msg.textContent = text;
    msg.className = 'dt-form-msg' + (kind ? ' is-' + kind : '');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = (emailEl.value || '').trim();
    var model = document.getElementById('dtModelInput').value === 'f' ? 'f' : 'h';
    var honeypot = form.querySelector('[name="website"]').value;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailEl.classList.add('is-error');
      show(txt('msg-invalid'), 'error');
      emailEl.focus();
      return;
    }
    emailEl.classList.remove('is-error');
    btn.disabled = true;
    var label = btn.textContent;
    btn.textContent = txt('btn-sending');
    show('', '');

    function fallbackMail() {
      var M = model.toUpperCase();
      var subject = encodeURIComponent(txt('mail-subject').replace('{model}', M));
      var body = encodeURIComponent(
        txt('mail-body').replace('{model}', M).replace('{email}', email).split('||').join('\n')
      );
      window.location.href = 'mailto:deentag.pro@gmail.com?subject=' + subject + '&body=' + body;
      btn.disabled = false;
      btn.textContent = label;
      show(txt('msg-mail'), '');
    }

    fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, model: model, website: honeypot, locale: locale })
    }).then(function (res) {
      if (res.ok) {
        btn.textContent = txt('btn-done');
        show(txt('msg-ok'), 'ok');
        form.reset();
        document.getElementById('dtModelInput').value = model;
      } else if (res.status === 400) {
        btn.disabled = false;
        btn.textContent = label;
        show(txt('msg-badmail'), 'error');
      } else {
        fallbackMail();
      }
    }).catch(fallbackMail);
  });
}

if (typeof window !== 'undefined' && window.DT_registerInit) {
  window.DT_registerInit(function () {
    dtInitWaitlist();

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
