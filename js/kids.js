// ===== DEENTAG KIDS — KIDS.JS =====

var currentCat   = null;
var audioPlayer  = null;
var audioBtn     = null;
var listenedDuas = {};

const KIDS_BADGES_KEY  = 'deentag_kids_badges';
const KIDS_STARS_KEY   = 'deentag_kids_stars';

function getActiveKidsProfileId() {
  return localStorage.getItem('deentag_active_profile') || 'default';
}

/* ── Étoiles persistées par profil ── */
function getStarsKey() {
  return KIDS_STARS_KEY + '_' + getActiveKidsProfileId();
}
function loadStars(catKey) {
  try {
    var data = JSON.parse(localStorage.getItem(getStarsKey())) || {};
    return data[catKey] || [];
  } catch(e) { return []; }
}
function saveStar(catKey, duaKey) {
  try {
    var data = JSON.parse(localStorage.getItem(getStarsKey())) || {};
    if (!data[catKey]) data[catKey] = [];
    if (data[catKey].indexOf(duaKey) === -1) data[catKey].push(duaKey);
    localStorage.setItem(getStarsKey(), JSON.stringify(data));
  } catch(e) {}
}

function getBadges() {
  var key = KIDS_BADGES_KEY + '_' + getActiveKidsProfileId();
  try {
    var v = localStorage.getItem(key);
    if (v === null) {
      // Migration : si l'ancienne clé globale existe et qu'aucune donnée
      // n'a encore été enregistrée pour ce profil, on la reprend une fois.
      var legacy = localStorage.getItem(KIDS_BADGES_KEY);
      return legacy ? JSON.parse(legacy) : [];
    }
    return JSON.parse(v) || [];
  } catch (e) { return []; }
}

function saveBadge(catKey) {
  const badges = getBadges();
  if (badges.indexOf(catKey) === -1) {
    badges.push(catKey);
    localStorage.setItem(KIDS_BADGES_KEY + '_' + getActiveKidsProfileId(), JSON.stringify(badges));
  }
}

// ============================================================
// INIT
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  renderHome();
  checkUrlParams();
});

window.addEventListener('deentag:profileChanged', () => {
  listenedDuas = {};
  currentCat   = null;
  renderHome();
});

function checkUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const cat    = params.get('cat');
  if (cat && KIDS_DUAS[cat]) showCat(cat);
}


// ============================================================
// PAGE ACCUEIL
// ============================================================

function renderHome() {
  const grid = document.getElementById('kidsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const badges = getBadges();

  Object.keys(KIDS_DUAS).forEach(catKey => {
    const cat   = KIDS_DUAS[catKey];
    const count = Object.keys(cat).filter(k => k !== 'meta').length;

    const card = document.createElement('div');
    card.className  = 'kids-cat-card' + (badges.indexOf(catKey) !== -1 ? ' done' : '');
    card.setAttribute('data-cat', catKey);

    // Fond couleurLight de la catégorie
    card.style.background = cat.meta.couleurLight;

    // Image illustrée si disponible, sinon fallback emoji — posée sur un médaillon
    const mediaHtml = cat.meta.image
      ? '<div class="kids-cat-icon-wrap"><img class="kids-cat-img" src="' + cat.meta.image + '" alt="' + cat.meta.titre + '"></div>'
      : '<div class="kids-cat-icon-wrap"><span class="kids-cat-emoji">' + cat.meta.emoji + '</span></div>';

    card.innerHTML =
      mediaHtml +
      '<div class="kids-cat-label">'  + cat.meta.titre + '</div>' +
      '<div class="kids-cat-count">'  + count + ' invocation' + (count > 1 ? 's' : '') + '</div>';
    card.addEventListener('click', () => showCat(catKey));
    grid.appendChild(card);
  });

  renderCollection();
}

function renderCollection() {
  const wrap = document.getElementById('kidsCollection');
  if (!wrap) return;
  const badges   = getBadges();
  const catKeys  = Object.keys(KIDS_DUAS);

  wrap.innerHTML =
    '<div class="kids-collection-head">' +
      '<span class="kids-collection-title">✨ Ta collection</span>' +
      '<span class="kids-collection-count">' + badges.length + ' / ' + catKeys.length + '</span>' +
    '</div>' +
    '<div class="kids-collection-row">' +
      catKeys.map(catKey => {
        const cat      = KIDS_DUAS[catKey];
        const unlocked = badges.indexOf(catKey) !== -1;
        const iconHtml = cat.meta.image
          ? '<img class="kids-coin-icon" src="' + cat.meta.image + '" alt="">'
          : cat.meta.emoji;
        return (
          '<div class="kids-collection-item' + (unlocked ? ' unlocked' : '') + '">' +
            '<div class="kids-coin' + (unlocked ? '' : ' locked') + '" style="--coin-c:' + cat.meta.couleur + '">' +
              iconHtml +
              (unlocked ? '' : '<span class="kids-coin-lock">🔒</span>') +
            '</div>' +
            '<span class="kids-collection-label">' + cat.meta.titre + '</span>' +
          '</div>'
        );
      }).join('') +
    '</div>';
}


// ============================================================
// PAGE CATÉGORIE
// ============================================================

function showCat(catKey) {
  currentCat    = catKey;
  listenedDuas  = {};
  // Recharger les étoiles sauvegardées pour ce profil+catégorie
  var saved = loadStars(catKey);
  saved.forEach(function(dk) { listenedDuas[dk] = true; });
  stopAudio();

  const cat = KIDS_DUAS[catKey];
  document.getElementById('page-home').style.display = 'none';
  document.getElementById('page-cat').style.display  = 'block';

  // Header couleur (variable CSS -> permet le dégradé doux défini en CSS)
  const header = document.getElementById('catHeader');
  header.style.setProperty('--cat-c', cat.meta.couleur);

  const emojiEl = document.getElementById('catHeaderEmoji');
  if (cat.meta.image) {
    emojiEl.innerHTML = '<img src="' + cat.meta.image + '" alt="' + cat.meta.titre + '" style="width:46px;height:46px;object-fit:contain;">';
  } else {
    emojiEl.textContent = cat.meta.emoji;
  }

  // Clic sur l'emoji → animation jump
  emojiEl.onclick = () => {
    emojiEl.classList.remove('jump');
    void emojiEl.offsetWidth; // force reflow pour relancer l'animation
    emojiEl.classList.add('jump');
    emojiEl.addEventListener('animationend', () => {
      emojiEl.classList.remove('jump');
    }, { once: true });
  };

  document.getElementById('catHeaderTitle').textContent = cat.meta.titre;
  document.getElementById('catPageTitle').textContent   = cat.meta.titre;

  renderDuas(catKey);
  renderProgress(catKey);

  window.scrollTo(0, 0);
}

function showHome() {
  stopAudio();
  currentCat = null;
  document.getElementById('page-cat').style.display  = 'none';
  document.getElementById('page-home').style.display = 'block';
  renderHome();
  window.scrollTo(0, 0);
}

function renderDuas(catKey) {
  const cat  = KIDS_DUAS[catKey];
  const list = document.getElementById('kidsDuaList');
  if (!list) return;
  list.innerHTML = '';

  const duaKeys = Object.keys(cat).filter(k => k !== 'meta');

  duaKeys.forEach((duaKey, idx) => {
    const dua  = cat[duaKey];
    const card = document.createElement('div');
    card.className = 'kids-dua-card';
    card.id        = 'dua-card-' + duaKey;
    card.style.borderColor = cat.meta.couleur + '44';

    const audioBar = dua.audio
      ? '<div class="kids-audio-bar">' +
          '<button class="kids-audio-btn" id="audio-btn-' + duaKey + '" ' +
            'style="color:' + cat.meta.couleur + ';--accent:' + cat.meta.couleur + '" ' +
            'onclick="toggleAudio(\'' + duaKey + '\',\'' + dua.audio + '\')">' +
            '<span>🔊</span>' +
          '</button>' +
        '</div>'
      : '';

    // Bloc conseil islamique
    const conseilHtml = dua.conseil
      ? '<div class="kids-dua-conseil" style="color:' + cat.meta.couleur + '; border-left-color:' + cat.meta.couleur + '">' +
          '<span class="kids-dua-conseil-icon">💡</span>' +
          '<span class="kids-dua-conseil-text">' + dua.conseil + '</span>' +
        '</div>'
      : '';

    card.innerHTML =
      '<div class="kids-dua-moment">' +
        '<span class="kids-dua-moment-emoji">' + dua.emoji + '</span>' +
        '<span class="kids-dua-moment-text">'  + dua.moment + '</span>' +
      '</div>' +
      '<div class="kids-dua-body">' +
        '<div class="kids-dua-traduction" style="color:' + cat.meta.couleur + '">' + dua.traduction + '</div>' +
        '<div class="kids-dua-phonetique">' + dua.phonetique  + '</div>' +
        '<div class="kids-dua-arabe">'      + dua.arabe       + '</div>' +
        conseilHtml +
        audioBar +
      '</div>';

    list.appendChild(card);

    // Apparition décalée
    card.style.opacity   = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      card.style.opacity    = '1';
      card.style.transform  = 'translateY(0)';
    }, 80 + idx * 100);
  });
}

function renderProgress(catKey) {
  const cat      = KIDS_DUAS[catKey];
  const duaKeys  = Object.keys(cat).filter(k => k !== 'meta');
  const progress = document.getElementById('kidsProgress');
  if (!progress) return;
  progress.innerHTML = '';

  duaKeys.forEach(duaKey => {
    const star = document.createElement('span');
    star.className = 'kids-star-badge' + (listenedDuas[duaKey] ? ' earned' : '');
    star.id        = 'star-' + duaKey;
    star.textContent = '⭐';
    progress.appendChild(star);
  });
}


// ============================================================
// AUDIO
// ============================================================

function stopAudio() {
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    audioPlayer = null;
  }
  if (audioBtn) {
    audioBtn.classList.remove('playing');
    audioBtn.querySelector('span').textContent = '🔊';
    audioBtn.style.setProperty('--p', 0);
    audioBtn = null;
  }
}

function toggleAudio(duaKey, audioFile) {
  const btn = document.getElementById('audio-btn-' + duaKey);
  if (!btn) return;

  // Si ce btn joue déjà → stop
  if (audioPlayer && audioBtn === btn) { stopAudio(); return; }

  stopAudio();

  const player = new Audio('Audio/' + audioFile);
  audioPlayer  = player;
  audioBtn     = btn;

  btn.classList.add('playing');
  btn.querySelector('span').textContent = '⏹';

  player.addEventListener('timeupdate', () => {
    if (player.duration) btn.style.setProperty('--p', (player.currentTime / player.duration) * 100);
  });

  player.play().catch(() => {
    stopAudio();
    btn.querySelector('span').textContent = '❌';
  });

  player.onended = () => {
    stopAudio();
    // Confetti à chaque fin d'audio
    createConfetti();
    markListened(duaKey);
  };

  player.onerror = () => {
    stopAudio();
    btn.querySelector('span').textContent = '❌';
  };
}

function markListened(duaKey) {
  listenedDuas[duaKey] = true;
  saveStar(currentCat, duaKey);

  // Allume l'étoile
  const star = document.getElementById('star-' + duaKey);
  if (star) {
    star.classList.add('earned');
    star.style.animation = 'star-pop 0.4s ease forwards';
  }

  // Vérifie si toutes les duas ont été écoutées
  const cat     = KIDS_DUAS[currentCat];
  const duaKeys = Object.keys(cat).filter(k => k !== 'meta');
  const allDone = duaKeys.every(k => listenedDuas[k]);

  if (allDone) {
    saveBadge(currentCat);
    setTimeout(() => showBravo(), 800);
  }
}


// ============================================================
// BRAVO + CONFETTIS
// ============================================================

function showBravo() {
  const cat     = KIDS_DUAS[currentCat];
  const badgeEl = document.getElementById('bravoBadge');
  if (badgeEl) {
    badgeEl.innerHTML = cat && cat.meta.image
      ? '<div class="kids-coin kids-coin-earned" style="--coin-c:' + cat.meta.couleur + '"><img class="kids-coin-icon" src="' + cat.meta.image + '" alt=""></div>'
      : '🌟';
  }
  launchConfetti();
  document.getElementById('bravoModal').style.display = 'flex';
}

function closeBravo() {
  document.getElementById('bravoModal').style.display = 'none';
  document.getElementById('confettiContainer').innerHTML = '';
}

// Alias appelé à chaque fin d'audio
function createConfetti() {
  launchConfetti();
}

function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  container.innerHTML = '';
  const colors = ['#FF6B6B','#6C63FF','#00B4D8','#52B788','#F4A261','#FFD166','#06D6A0'];

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left             = Math.random() * 100 + 'vw';
    piece.style.background       = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay   = Math.random() * 1.5 + 's';
    piece.style.animationDuration = (2 + Math.random()) + 's';
    piece.style.transform        = 'rotate(' + Math.random() * 360 + 'deg)';
    piece.style.width             = (8 + Math.random() * 8) + 'px';
    piece.style.height            = (8 + Math.random() * 8) + 'px';
    container.appendChild(piece);
  }

  setTimeout(() => { container.innerHTML = ''; }, 4000);
}

/* ── Toast de bienvenue nouveau profil ── */
function showWelcomeToast(name) {
  var existing = document.getElementById('kidsWelcomeToast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.id = 'kidsWelcomeToast';
  toast.style.cssText = [
    'position:fixed','top:50%','left:50%',
    'transform:translate(-50%,-50%) scale(0.7)',
    'z-index:9999',
    'background:linear-gradient(135deg,#fff 0%,#f0fff4 100%)',
    'border-radius:28px',
    'padding:32px 28px 24px',
    'text-align:center',
    'box-shadow:0 20px 60px rgba(0,0,0,0.18)',
    'width:80vw','max-width:300px',
    'opacity:0',
    'transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
    'border:3px solid #C9A84C'
  ].join(';');

  toast.innerHTML =
    '<div style="font-size:48px;margin-bottom:8px;">🌟</div>' +
    '<div style="font-family:Baloo 2,cursive;font-size:20px;font-weight:800;color:#2C4A3E;margin-bottom:6px;">Bienvenue ' + name + ' !</div>' +
    '<div style="font-family:Baloo 2,cursive;font-size:14px;color:#5a7a6a;line-height:1.5;margin-bottom:20px;">Bismillah ! Ton aventure commence maintenant ! 🚀</div>' +
    '<button onclick="document.getElementById(\'kidsWelcomeToast\').remove()" style="background:linear-gradient(135deg,#C9A84C,#e8c96d);border:none;border-radius:50px;padding:10px 28px;font-family:Baloo 2,cursive;font-weight:800;font-size:14px;color:#fff;cursor:pointer;">C\'est parti ! ✨</button>';

  document.body.appendChild(toast);
  launchConfetti();

  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      toast.style.opacity = '1';
      toast.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });

  setTimeout(function() {
    if (document.getElementById('kidsWelcomeToast')) {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%,-50%) scale(0.7)';
      setTimeout(function() { if (toast.parentNode) toast.remove(); }, 400);
    }
  }, 5000);
}

/* Désactiver clic droit */
document.addEventListener('contextmenu', e => { e.preventDefault(); return false; });
