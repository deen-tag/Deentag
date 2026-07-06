// ===== DEENTAG — QURAN-KIDS.JS (v3) =====
// Une carte par verset, style identique aux invocations kids

// ============================================================
// LABELS MULTILINGUES
// ============================================================

const KIDS_SELECT_SUBTITLE = {
  fr:'Choisis une sourate !', en:'Choose a surah!', es:'¡Elige una sura!',
  de:'Sure wählen!', it:'Scegli una sura!', nl:'Kies een soera!',
  pt:'Escolhe uma sura!', tr:'Sure seç!'
};
const KIDS_LOADING = {
  fr:'Chargement...', en:'Loading...', es:'Cargando...', de:'Laden...',
  it:'Caricamento...', nl:'Laden...', pt:'Carregando...', tr:'Yükleniyor...'
};
const KIDS_VERSE_LABEL = {
  fr:'versets', en:'verses', es:'versos', de:'Verse',
  it:'versetti', nl:'verzen', pt:'versos', tr:'ayet'
};
const KIDS_MECCAN  = { fr:'Mecquoise', en:'Meccan', es:'Meca', de:'Mekkanisch', it:'Meccana', nl:'Mekaans', pt:'Mequense', tr:'Mekki' };
const KIDS_MEDINAN = { fr:'Médinoise', en:'Medinan', es:'Medina', de:'Medinensisch', it:'Medinese', nl:'Medinees', pt:'Medinense', tr:'Medeni' };
const KIDS_ALL_QURAN = {
  fr:'📚 Tout le Coran', en:'📚 Full Quran', es:'📚 Corán completo',
  de:'📚 Ganzer Koran', it:'📚 Corano completo', nl:'📚 Volledige Koran',
  pt:'📚 Alcorão completo', tr:'📚 Tüm Kuran'
};
const KIDS_ALL_SUB = {
  fr:'114 sourates', en:'114 surahs', es:'114 suras',
  de:'114 Suren', it:'114 sure', nl:'114 soera\'s', pt:'114 suras', tr:'114 sure'
};
const KIDS_BRAVO_TITLE = {
  fr:'Bravo !', en:'Well done!', es:'¡Bravo!', de:'Toll gemacht!',
  it:'Bravo!', nl:'Goed gedaan!', pt:'Parabéns!', tr:'Aferin!'
};
const KIDS_BRAVO_SUB = {
  fr:'Tu as récité toute la sourate !', en:'You recited the whole surah!',
  es:'¡Has recitado toda la sura!', de:'Du hast die Sure vollständig rezitiert!',
  it:'Hai recitato tutta la sura!', nl:'Je hebt de volledige soera gereciteerd!',
  pt:'Recitaste toda a sura!', tr:'Tüm sureyi okudun!'
};
const KIDS_BRAVO_BTN = {
  fr:'Continuer 🎉', en:'Continue 🎉', es:'Continuar 🎉', de:'Weiter 🎉',
  it:'Continua 🎉', nl:'Doorgaan 🎉', pt:'Continuar 🎉', tr:'Devam et 🎉'
};
const KIDS_VERSET_WORD = {
  fr:'Verset', en:'Verse', es:'Verso', de:'Vers',
  it:'Versetto', nl:'Vers', pt:'Verso', tr:'Ayet'
};

const KIDS_COLORS_LIST = ['#FF6B6B','#6C63FF','#00B4D8','#52B788','#F4A261','#E76F51','#E85D9A','#8E44AD'];

// Cartes accueil : Fatiha + sourates 114→85 + Coran entier
const KIDS_CARD_IDS = [1, 114,113,112,111,110,109,108,107,106,105,104,103,102,101,100,
                          99,98,97,96,95,94,93,92,91,90,89,88,87,86,85, 'all'];

const KIDS_QURAN_BADGES_KEY = 'deentag_quran_badges';

function getActiveQuranKidsProfileId() {
  return localStorage.getItem('deentag_active_profile') || 'default';
}

function kidsGetQuranBadges() {
  var key = KIDS_QURAN_BADGES_KEY + '_' + getActiveQuranKidsProfileId();
  try {
    var v = localStorage.getItem(key);
    return v ? JSON.parse(v) || [] : [];
  } catch (e) { return []; }
}

function kidsSaveQuranBadge(surahId) {
  const badges = kidsGetQuranBadges();
  if (badges.indexOf(surahId) === -1) {
    badges.push(surahId);
    localStorage.setItem(KIDS_QURAN_BADGES_KEY + '_' + getActiveQuranKidsProfileId(), JSON.stringify(badges));
  }
}

function kidsRenderCollection() {
  const wrap = document.getElementById('kidsCollectionQuran');
  if (!wrap || typeof SURAHS === 'undefined') return;
  const badges = kidsGetQuranBadges();
  const ids    = KIDS_CARD_IDS.filter(id => id !== 'all');

  wrap.innerHTML = `
    <div class="kids-collection-head">
      <span class="kids-collection-title">✨ Ta collection</span>
      <span class="kids-collection-count">${badges.length} / ${ids.length}</span>
    </div>
    <div class="kids-collection-row">
      ${ids.map(id => {
        const surah    = SURAHS.find(s => s.id === id);
        const unlocked = badges.indexOf(id) !== -1;
        const color    = KIDS_COLORS_LIST[KIDS_CARD_IDS.indexOf(id) % KIDS_COLORS_LIST.length];
        return `
          <div class="kids-collection-item ${unlocked ? 'unlocked' : ''}">
            <div class="kids-coin ${unlocked ? '' : 'locked'}" style="--coin-c:${color}">
              ${id}${unlocked ? '' : '<span class="kids-coin-lock">🔒</span>'}
            </div>
            <span class="kids-collection-label">${surah ? surah.fr : ''}</span>
          </div>`;
      }).join('')}
    </div>
  `;
}

// ============================================================
// ÉTAT
// ============================================================

var kidsLang          = 'fr';
var kidsCurrentSurah  = null;   // id sourate en lecture
var kidsCurrentVerse  = 0;      // index verset actuel (0-based)
var kidsVerseData     = null;   // données API { arabic, phonetic, transl, total }
var kidsListenedVerses = {};    // { verseNum: true }
var kidsAudioPlayer   = null;
var kidsAudioPlaying  = false;
var kidsAudioSpeed    = 1;
var kidsCache         = {};
var kidsShowPhonetic  = true;
var kidsShowTransl    = true;

// ============================================================
// LANGUE
// ============================================================

function kidsGetLang() { return localStorage.getItem('deentag_lang') || 'fr'; }

function kidsApplyLang(lang) {
  kidsLang = lang;
  localStorage.setItem('deentag_lang', lang);
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = lang.toUpperCase() + ' ▾';
  document.querySelectorAll('.lang-option').forEach(o => o.classList.toggle('active', o.dataset.lang === lang));
  const sub = document.getElementById('homeSubtitle');
  if (sub) sub.textContent = KIDS_SELECT_SUBTITLE[lang] || 'Choisis une sourate !';
  const allTitle = document.getElementById('allPageTitle');
  if (allTitle) allTitle.textContent = KIDS_ALL_QURAN[lang] || '📚 Tout le Coran';
}

function kidsSetLang(lang) {
  kidsStopAudio();
  kidsApplyLang(lang);
  const m = document.getElementById('lang-menu');
  if (m) m.classList.remove('open');
  if (kidsCurrentSurah && kidsVerseData) kidsLoadSurah(kidsCurrentSurah);
}

function kidsToggleLangMenu() {
  const m = document.getElementById('lang-menu');
  if (m) m.classList.toggle('open');
}

document.addEventListener('click', e => {
  if (!e.target.closest('#lang-btn') && !e.target.closest('#lang-menu')) {
    const m = document.getElementById('lang-menu');
    if (m) m.classList.remove('open');
  }
});

// ============================================================
// GRILLE ACCUEIL
// ============================================================

function kidsRenderGrid() {
  const grid = document.getElementById('surahGrid');
  if (!grid || typeof SURAHS === 'undefined') return;
  grid.innerHTML = '';
  const lang   = kidsGetLang();
  const badges = kidsGetQuranBadges();

  KIDS_CARD_IDS.forEach((cardId, i) => {
    const card  = document.createElement('div');
    const done  = cardId !== 'all' && badges.indexOf(cardId) !== -1;
    card.className = 'kids-surah-card' + (done ? ' done' : '');
    const color = KIDS_COLORS_LIST[i % KIDS_COLORS_LIST.length];
    card.style.setProperty('--kc', color);
    card.style.setProperty('--kc-light', color + '22');

    if (cardId === 'all') {
      card.onclick = () => kidsOpenAll();
      card.innerHTML = `
        <div class="kids-coin kids-coin-surah">📚</div>
        <div class="kids-card-name">${KIDS_ALL_QURAN[lang] || '📚 Tout le Coran'}</div>
        <div class="kids-card-sub">${KIDS_ALL_SUB[lang] || '114 sourates'}</div>
      `;
    } else {
      const surah = SURAHS.find(s => s.id === cardId);
      if (!surah) return;
      card.onclick = () => kidsOpenSurah(cardId);
      card.innerHTML = `
        <div class="kids-coin kids-coin-surah">${cardId}</div>
        <div class="kids-card-ar">${surah.ar}</div>
        <div class="kids-card-name">${surah.fr}</div>
        <div class="kids-card-sub">${surah.verses} ${KIDS_VERSE_LABEL[lang] || 'versets'}</div>
      `;
    }
    grid.appendChild(card);
  });

  kidsRenderCollection();
}

// ============================================================
// NAVIGATION
// ============================================================

function kidsOpenSurah(surahId) {
  kidsCurrentSurah   = surahId;
  kidsCurrentVerse   = 0;
  kidsListenedVerses = {};
  kidsVerseData      = null;
  kidsStopAudio();

  const surah = SURAHS.find(s => s.id === surahId);
  if (!surah) return;

  // Header page lecture
  const color = KIDS_COLORS_LIST[KIDS_CARD_IDS.indexOf(surahId) % KIDS_COLORS_LIST.length] || '#6C63FF';
  const headerEl = document.getElementById('surahReadHeader');
  if (headerEl) {
    headerEl.style.setProperty('--cat-c', color);
    headerEl.querySelector('.surah-header-emoji').textContent = '📖';
    headerEl.querySelector('.surah-header-title').textContent = surah.fr;
    headerEl.querySelector('.surah-header-ar').textContent    = surah.ar;
  }

  document.getElementById('pageHome').style.display  = 'none';
  document.getElementById('pageAll').style.display   = 'none';
  document.getElementById('pageSurah').style.display = 'flex';

  kidsLoadSurah(surahId);
}

function kidsOpenAll() {
  kidsStopAudio();
  document.getElementById('pageHome').style.display  = 'none';
  document.getElementById('pageSurah').style.display = 'none';
  document.getElementById('pageAll').style.display   = 'flex';
  kidsRenderAllList();
}

function kidsBackToHome() {
  kidsStopAudio();
  kidsCurrentSurah   = null;
  kidsCurrentVerse   = 0;
  kidsListenedVerses = {};
  kidsVerseData      = null;
  document.getElementById('pageSurah').style.display = 'none';
  document.getElementById('pageAll').style.display   = 'none';
  document.getElementById('pageHome').style.display  = 'block';
  kidsRenderGrid();
}

// ============================================================
// LISTE TOUTES LES SOURATES
// ============================================================

function kidsRenderAllList() {
  const list = document.getElementById('allSurahList');
  if (!list || typeof SURAHS === 'undefined') return;
  const lang = kidsGetLang();
  list.innerHTML = '';

  SURAHS.forEach((surah, i) => {
    const color = KIDS_COLORS_LIST[i % KIDS_COLORS_LIST.length];
    const item  = document.createElement('div');
    item.className = 'all-surah-item';
    item.innerHTML = `
      <div class="all-surah-num" style="background:${color}">${surah.id}</div>
      <div class="all-surah-info">
        <div class="all-surah-ar">${surah.ar}</div>
        <div class="all-surah-fr">${surah.fr}</div>
      </div>
      <div class="all-surah-verses" style="color:${color}">${surah.verses}<br><span>${KIDS_VERSE_LABEL[lang]||'v.'}</span></div>
    `;
    item.onclick = () => kidsOpenSurah(surah.id);
    list.appendChild(item);
    if (i < SURAHS.length - 1) {
      const sep = document.createElement('div');
      sep.className = 'all-surah-sep';
      list.appendChild(sep);
    }
  });
}

// ============================================================
// API CHARGEMENT
// ============================================================

const KIDS_API_EDITIONS = {
  fr:'fr.hamidullah', en:'en.sahih', es:'es.cortes', de:'de.bubenheim',
  it:'it.piccardo', nl:'nl.keyzer', pt:'pt.elhayek', tr:'tr.diyanet',
};

async function kidsLoadSurah(surahId) {
  const lang  = kidsGetLang();
  const surah = SURAHS.find(s => s.id === surahId);
  const scroll = document.getElementById('surahScroll');
  if (!scroll || !surah) return;

  scroll.innerHTML = `
    <div class="loading-block">
      <div class="loading-spinner"></div>
      <div class="loading-text">${KIDS_LOADING[lang] || 'Chargement...'}</div>
    </div>
  `;

  try {
    const cacheKey = `kids_${surahId}_${lang}`;
    let data;
    if (kidsCache[cacheKey]) {
      data = kidsCache[cacheKey];
    } else {
      const trEdition = KIDS_API_EDITIONS[lang] || 'en.sahih';
      const url = `https://api.alquran.cloud/v1/surah/${surahId}/editions/quran-uthmani,en.transliteration,${trEdition}`;
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('API error');
      const json = await resp.json();
      data = json.data;
      kidsCache[cacheKey] = data;
    }

    // Stocker les données
    kidsVerseData = {
      arabic:   data[0].ayahs,
      phonetic: data[1].ayahs,
      transl:   data[2].ayahs,
      total:    surah.verses,
    };

    kidsCurrentVerse   = 1;
    kidsListenedVerses = {};
    kidsRenderProgress(surah);
    kidsShowVerse(1, true);

  } catch(e) {
    scroll.innerHTML = `<div class="error-block">😕 Connexion requise pour charger les versets.</div>`;
  }
}

// ============================================================
// AFFICHAGE UN VERSET (style dua kids)
// ============================================================

function kidsShowVerse(verseNum, autoplay = false) {
  if (!kidsVerseData) return;
  kidsCurrentVerse = verseNum;
  kidsStopAudio();

  const surah  = SURAHS.find(s => s.id === kidsCurrentSurah);
  const scroll = document.getElementById('surahScroll');
  if (!scroll || !surah) return;

  const lang   = kidsGetLang();
  const i      = verseNum - 1;
  const arabic = kidsVerseData.arabic[i]   ? kidsVerseData.arabic[i].text   : '';
  const phonet = kidsVerseData.phonetic[i] ? kidsVerseData.phonetic[i].text : '';
  const transl = kidsVerseData.transl[i]   ? kidsVerseData.transl[i].text   : '';

  const color     = KIDS_COLORS_LIST[(KIDS_CARD_IDS.indexOf(kidsCurrentSurah)) % KIDS_COLORS_LIST.length] || '#6C63FF';
  const typeLabel = surah.type === 'mecquoise' ? (KIDS_MECCAN[lang] || 'Meccan') : (KIDS_MEDINAN[lang] || 'Medinan');

  const phonHtml = kidsShowPhonetic
    ? `<div class="kids-dua-phonetique">${phonet}</div>` : '';
  const translHtml = kidsShowTransl
    ? `<div class="kids-dua-traduction" style="color:${color}">${transl}</div>` : '';

  scroll.innerHTML = `
    <div class="kids-dua-card verse-card-anim" style="border-color:${color}44">
      <div class="kids-dua-moment">
        <span class="kids-dua-moment-emoji">📖</span>
        <span class="kids-dua-moment-text">${KIDS_VERSET_WORD[lang] || 'Verset'} ${verseNum} / ${kidsVerseData.total}</span>
      </div>
      <div class="kids-dua-body">
        ${translHtml}
        ${phonHtml}
        <div class="kids-dua-arabe">${arabic}</div>
        <div class="kids-audio-bar">
          <button class="kids-audio-btn" id="verseAudioBtn" style="color:${color};--accent:${color}" onclick="kidsToggleVerseAudio()">
            <span>🔊</span>
          </button>
        </div>
      </div>
    </div>
    <div class="kids-verse-nav">
      ${verseNum > 1
        ? `<button class="kids-nav-btn" onclick="kidsGoPrev()">← Précédent</button>`
        : `<div></div>`}
      ${verseNum < kidsVerseData.total
        ? `<button class="kids-nav-btn kids-nav-next" style="background:${color}" onclick="kidsGoNext()">Suivant →</button>`
        : `<button class="kids-nav-btn kids-nav-done" style="background:${color}" onclick="kidsSurahDone()">Terminé 🌟</button>`}
    </div>
  `;

  scroll.scrollTop = 0;
  kidsUpdateProgress(verseNum);

  if (autoplay) kidsToggleVerseAudio();
}

// ============================================================
// NAVIGATION VERSETS
// ============================================================

function kidsGoPrev() {
  if (kidsCurrentVerse > 1) kidsShowVerse(kidsCurrentVerse - 1, true);
}

function kidsGoNext() {
  if (!kidsVerseData) return;
  if (kidsCurrentVerse < kidsVerseData.total) kidsShowVerse(kidsCurrentVerse + 1, true);
}

// ============================================================
// AUDIO UN VERSET
// ============================================================

function kidsToggleVerseAudio() {
  if (kidsAudioPlaying) { kidsStopAudio(); return; }
  const surah = SURAHS.find(s => s.id === kidsCurrentSurah);
  if (!surah) return;

  const btn = document.getElementById('verseAudioBtn');
  const verseGlobal = SURAHS.slice(0, kidsCurrentSurah - 1).reduce((acc, s) => acc + s.verses, 0) + kidsCurrentVerse;
  const url = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${verseGlobal}.mp3`;

  const player = new Audio(url);
  kidsAudioPlayer = player;
  kidsAudioPlaying = true;

  if (btn) { btn.classList.add('playing'); btn.querySelector('span').textContent = '⏹'; }

  player.addEventListener('timeupdate', () => {
    if (player.duration && btn) btn.style.setProperty('--p', (player.currentTime / player.duration) * 100);
  });

  player.playbackRate = kidsAudioSpeed;
  player.play().catch(() => kidsStopAudio());

  player.onended = () => {
    kidsStopAudio();
    kidsMarkVerseListened(kidsCurrentVerse);
  };
  player.onerror = () => kidsStopAudio();
}

function kidsStopAudio() {
  kidsAudioPlaying = false;
  if (kidsAudioPlayer) {
    kidsAudioPlayer.pause();
    kidsAudioPlayer.src = '';
    kidsAudioPlayer = null;
  }
  const btn = document.getElementById('verseAudioBtn');
  if (btn) { btn.classList.remove('playing'); btn.querySelector('span').textContent = '🔊'; btn.style.setProperty('--p', 0); }
}

// ============================================================
// PROGRESSION ÉTOILES
// ============================================================

function kidsRenderProgress(surah) {
  const bar = document.getElementById('kidsProgress');
  if (!bar) return;
  bar.innerHTML = '';

  if (surah.verses <= 20) {
    // Étoiles
    for (let v = 1; v <= surah.verses; v++) {
      const star = document.createElement('span');
      star.className   = 'kids-star-badge';
      star.id          = 'star-v-' + v;
      star.textContent = '⭐';
      bar.appendChild(star);
    }
  } else {
    // Barre de progression + compteur
    const color = KIDS_COLORS_LIST[(KIDS_CARD_IDS.indexOf(kidsCurrentSurah)) % KIDS_COLORS_LIST.length] || '#6C63FF';
    const wrap = document.createElement('div');
    wrap.className = 'kids-progress-bar-wrap';
    wrap.innerHTML = `
      <div class="kids-progress-bar-track">
        <div class="kids-progress-bar-fill" id="kidsProgressFill" style="background:${color};width:0%"></div>
      </div>
      <div class="kids-verse-counter"><span id="counterCurrent">1</span> / ${surah.verses}</div>
    `;
    bar.appendChild(wrap);
  }
}

function kidsUpdateProgress(verseNum) {
  const surah = SURAHS.find(s => s.id === kidsCurrentSurah);
  if (!surah) return;

  if (surah.verses > 20) {
    const counter = document.getElementById('counterCurrent');
    if (counter) counter.textContent = verseNum;
  }
  // Les étoiles / la barre ne s'allument plus ici : uniquement dans kidsMarkVerseListened,
  // une fois l'écoute du verset terminée (récompense méritée, pas affichée d'avance).
}

function kidsMarkVerseListened(verseNum) {
  if (kidsListenedVerses[verseNum]) return; // déjà récompensé, pas de double animation
  kidsListenedVerses[verseNum] = true;

  const surah = SURAHS.find(s => s.id === kidsCurrentSurah);
  if (!surah) return;

  if (surah.verses <= 20) {
    kidsAnimateStarReward(verseNum);
  } else {
    const fill = document.getElementById('kidsProgressFill');
    if (fill) {
      const listenedCount = Object.keys(kidsListenedVerses).length;
      fill.style.width = ((listenedCount / surah.verses) * 100).toFixed(2) + '%';
      fill.classList.remove('pulse');
      // relancer l'animation même si la classe était déjà là
      void fill.offsetWidth;
      fill.classList.add('pulse');
    }
  }
}

// ============================================================
// RÉCOMPENSE : ÉTOILE QUI TOMBE DU CIEL 🌟
// ============================================================

function kidsAnimateStarReward(verseNum) {
  const star = document.getElementById('star-v-' + verseNum);
  if (!star) return;

  const rect  = star.getBoundingClientRect();
  const landX = rect.left + rect.width / 2;
  const landY = rect.top + rect.height / 2;

  const big = document.createElement('div');
  big.className   = 'kids-falling-star';
  big.textContent = '⭐';
  big.style.setProperty('--landX', landX + 'px');
  big.style.setProperty('--landY', landY + 'px');
  document.body.appendChild(big);

  const finish = () => {
    big.remove();
    star.classList.add('earned');
    kidsStarImpactBurst(landX, landY);
  };
  big.addEventListener('animationend', finish, { once: true });
  // Sécurité si l'évènement animationend ne se déclenche pas (ex: onglet en arrière-plan)
  setTimeout(finish, 750);
}

function kidsStarImpactBurst(x, y) {
  const colors = ['#FFD166', '#FFB703', '#FF6B6B', '#F4A261', '#FFE066'];
  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI * 2 * i) / 12;
    const dist  = 24 + Math.random() * 18;
    const spark = document.createElement('div');
    spark.className = 'kids-star-spark';
    spark.style.left = x + 'px';
    spark.style.top  = y + 'px';
    spark.style.background = colors[i % colors.length];
    spark.style.setProperty('--dx', (Math.cos(angle) * dist) + 'px');
    spark.style.setProperty('--dy', (Math.sin(angle) * dist) + 'px');
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
  }
}

// ============================================================
// FIN DE SOURATE
// ============================================================

function kidsSurahDone() {
  kidsStopAudio();
  kidsLaunchConfetti();
  kidsSaveQuranBadge(kidsCurrentSurah);

  // Allumer toutes les étoiles
  if (kidsVerseData) {
    for (let v = 1; v <= kidsVerseData.total; v++) {
      const star = document.getElementById('star-v-' + v);
      if (star) {
        star.classList.add('earned');
        star.style.animation = 'star-pop 0.4s ease forwards';
      }
    }
  }

  setTimeout(() => kidsShowBravo(), 700);
}

function kidsShowBravo() {
  const modal = document.getElementById('bravoModal');
  const lang  = kidsGetLang();
  if (!modal) return;
  document.getElementById('bravoTitle').textContent = KIDS_BRAVO_TITLE[lang] || 'Bravo !';
  document.getElementById('bravoSub').textContent   = KIDS_BRAVO_SUB[lang]   || 'Tu as récité toute la sourate !';
  document.getElementById('bravoBtn').textContent   = KIDS_BRAVO_BTN[lang]   || 'Continuer 🎉';

  const badgeEl = document.getElementById('bravoBadge');
  if (badgeEl) {
    const color = KIDS_COLORS_LIST[KIDS_CARD_IDS.indexOf(kidsCurrentSurah) % KIDS_COLORS_LIST.length] || '#6C63FF';
    badgeEl.innerHTML = `<div class="kids-coin kids-coin-earned" style="--coin-c:${color}">${kidsCurrentSurah}</div>`;
  }

  modal.style.display = 'flex';
}

function kidsCloseBravo() {
  document.getElementById('bravoModal').style.display = 'none';
  document.getElementById('confettiContainer').innerHTML = '';
}

// ============================================================
// CONFETTIS
// ============================================================

function kidsLaunchConfetti() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;
  container.innerHTML = '';
  const colors = ['#FF6B6B','#6C63FF','#00B4D8','#52B788','#F4A261','#FFD166','#E85D9A'];
  for (let i = 0; i < 55; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left             = Math.random() * 100 + 'vw';
    piece.style.background       = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay   = Math.random() * 1.5 + 's';
    piece.style.animationDuration = (2 + Math.random()) + 's';
    piece.style.transform        = 'rotate(' + Math.random() * 360 + 'deg)';
    piece.style.width            = (8 + Math.random() * 8) + 'px';
    piece.style.height           = (8 + Math.random() * 8) + 'px';
    container.appendChild(piece);
  }
  setTimeout(() => { if (container) container.innerHTML = ''; }, 4500);
}

// ============================================================
// RÉGLAGES
// ============================================================

const KIDS_SIZE_LEVELS = {
  ar: { small:22, medium:28, large:38 },
  ph: { small:13, medium:15, large:20 },
  tr: { small:13, medium:15, large:20 },
};

function kidsApplySizeLevel(type, level) {
  localStorage.setItem('quran_kids_size_' + type, level);
  const px = KIDS_SIZE_LEVELS[type][level];
  if (type === 'ar') document.querySelectorAll('.kids-dua-arabe').forEach(el => el.style.fontSize = px + 'px');
  if (type === 'ph') document.querySelectorAll('.kids-dua-phonetique').forEach(el => el.style.fontSize = px + 'px');
  if (type === 'tr') document.querySelectorAll('.kids-dua-traduction').forEach(el => el.style.fontSize = px + 'px');
  document.querySelectorAll(`.size-pill[data-type="${type}"]`).forEach(p => p.classList.toggle('active', p.dataset.val === level));
}

function kidsTogglePhonetic(el) {
  kidsShowPhonetic = !kidsShowPhonetic;
  el.classList.toggle('on', kidsShowPhonetic);
  localStorage.setItem('quran_kids_phonetic', kidsShowPhonetic ? '1' : '0');
  if (kidsCurrentVerse) kidsShowVerse(kidsCurrentVerse);
}

function kidsToggleTranslation(el) {
  kidsShowTransl = !kidsShowTransl;
  el.classList.toggle('on', kidsShowTransl);
  localStorage.setItem('quran_kids_translation', kidsShowTransl ? '1' : '0');
  if (kidsCurrentVerse) kidsShowVerse(kidsCurrentVerse);
}

function kidsOpenSettings() {
  const panel = document.getElementById('surahSettingsPanel');
  if (!panel) return;
  const isOpen = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
}
function kidsCloseSettings() {
  const p = document.getElementById('surahSettingsPanel');
  if (p) p.classList.remove('open');
}

// ============================================================
// INITIALISATION
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('deentag_lang') || 'fr';
  kidsApplyLang(savedLang);

  kidsShowPhonetic = localStorage.getItem('quran_kids_phonetic')    !== '0';
  kidsShowTransl   = localStorage.getItem('quran_kids_translation') !== '0';

  const phToggle = document.getElementById('togglePhonetic');
  const trToggle = document.getElementById('toggleTranslation');
  if (phToggle) phToggle.classList.toggle('on', kidsShowPhonetic);
  if (trToggle) trToggle.classList.toggle('on', kidsShowTransl);

  ['ar','ph','tr'].forEach(t => {
    const level = localStorage.getItem('quran_kids_size_' + t) || 'medium';
    document.querySelectorAll(`.size-pill[data-type="${t}"]`).forEach(p => {
      p.classList.toggle('active', p.dataset.val === level);
    });
  });

  kidsRenderGrid();

  document.addEventListener('touchstart', e => {
    const p = document.getElementById('surahSettingsPanel');
    if (p && p.classList.contains('open')) {
      if (!p.contains(e.target) && !e.target.closest('[onclick*="kidsOpenSettings"]')) kidsCloseSettings();
    }
  }, { passive: true });

  document.addEventListener('contextmenu', e => { e.preventDefault(); return false; });
});

window.addEventListener('deentag:profileChanged', () => {
  // Revenir à la grille d'accueil pour afficher la progression du
  // profil nouvellement sélectionné.
  const homePage = document.getElementById('pageHome');
  if (homePage && homePage.style.display === 'none') {
    kidsBackToHome();
  } else {
    kidsRenderGrid();
  }
});

window.addEventListener('beforeunload', kidsStopAudio);
window.addEventListener('pagehide',     kidsStopAudio);
