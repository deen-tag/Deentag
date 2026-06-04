// ===== DEENTAG KIDS — KIDS.JS =====

var currentCat   = null;
var audioPlayer  = null;
var audioBtn     = null;
var listenedDuas = {};

// ============================================================
// INIT
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  renderHome();
  checkUrlParams();
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

  Object.keys(KIDS_DUAS).forEach(catKey => {
    const cat   = KIDS_DUAS[catKey];
    const count = Object.keys(cat).filter(k => k !== 'meta').length;

    const card = document.createElement('div');
    card.className  = 'kids-cat-card';
    card.setAttribute('data-cat', catKey);

    // Fond couleurLight de la catégorie
    card.style.background = cat.meta.couleurLight;

    // Image illustrée si disponible, sinon fallback emoji
    const mediaHtml = cat.meta.image
      ? '<img class="kids-cat-img" src="' + cat.meta.image + '" alt="' + cat.meta.titre + '">'
      : '<span class="kids-cat-emoji">' + cat.meta.emoji + '</span>';

    card.innerHTML =
      mediaHtml +
      '<div class="kids-cat-label">'  + cat.meta.titre + '</div>' +
      '<div class="kids-cat-count">'  + count + ' invocation' + (count > 1 ? 's' : '') + '</div>';
    card.addEventListener('click', () => showCat(catKey));
    grid.appendChild(card);
  });
}


// ============================================================
// PAGE CATÉGORIE
// ============================================================

function showCat(catKey) {
  currentCat    = catKey;
  listenedDuas  = {};
  stopAudio();

  const cat = KIDS_DUAS[catKey];
  document.getElementById('page-home').style.display = 'none';
  document.getElementById('page-cat').style.display  = 'block';

  // Header couleur
  const header = document.getElementById('catHeader');
  header.style.background = cat.meta.couleur;

  const emojiEl = document.getElementById('catHeaderEmoji');
  if (cat.meta.image) {
    emojiEl.innerHTML = '<img src="' + cat.meta.image + '" alt="' + cat.meta.titre + '" style="width:72px;height:72px;object-fit:cover;border-radius:20px;box-shadow:0 4px 16px rgba(0,0,0,0.15);">';
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
            'style="color:' + cat.meta.couleur + '" ' +
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
    star.className = 'kids-star-badge';
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
    setTimeout(() => showBravo(), 800);
  }
}


// ============================================================
// BRAVO + CONFETTIS
// ============================================================

function showBravo() {
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

/* Désactiver clic droit */
document.addEventListener('contextmenu', e => { e.preventDefault(); return false; });
