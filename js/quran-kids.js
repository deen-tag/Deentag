// ===== DEENTAG — QURAN-KIDS.JS (v2) =====
// Grille simple : Fatiha + 30 dernières sourates + Coran entier
// Page lecture style duas kids

// ============================================================
// DONNÉES
// ============================================================

const KIDS_SELECT_SUBTITLE = {
  fr:'Choisis une sourate !', en:'Choose a surah!', es:'¡Elige una sura!',
  de:'Sure wählen!', it:'Scegli una sura!', nl:'Kies een soera!',
  pt:'Escolhe uma sura!', tr:'Sure seç!'
};
const KIDS_BACK_LABEL = {
  fr:'← Retour', en:'← Back', es:'← Volver', de:'← Zurück',
  it:'← Indietro', nl:'← Terug', pt:'← Voltar', tr:'← Geri'
};
const KIDS_LOADING = {
  fr:'Chargement...', en:'Loading...', es:'Cargando...', de:'Laden...',
  it:'Caricamento...', nl:'Laden...', pt:'Carregando...', tr:'Yükleniyor...'
};
const KIDS_VERSE_LABEL = {
  fr:'versets', en:'verses', es:'versos', de:'Verse',
  it:'versetti', nl:'verzen', pt:'versos', tr:'ayet'
};
const KIDS_MECCAN  = { fr:'mecquoise', en:'Meccan', es:'Meca', de:'mekkanisch', it:'meccana', nl:'Mekaans', pt:'mequense', tr:'Mekki' };
const KIDS_MEDINAN = { fr:'médinoise', en:'Medinan', es:'Medina', de:'medinensisch', it:'medinese', nl:'Medinees', pt:'medinense', tr:'Medeni' };
const KIDS_ALL_QURAN = {
  fr:'📚 Tout le Coran', en:'📚 Full Quran', es:'📚 Corán completo',
  de:'📚 Ganzer Koran', it:'📚 Corano completo', nl:'📚 Volledige Koran',
  pt:'📚 Alcorão completo', tr:'📚 Tüm Kuran'
};
const KIDS_ALL_SUB = {
  fr:'114 sourates', en:'114 surahs', es:'114 suras',
  de:'114 Suren', it:'114 sure', nl:'114 soera\'s',
  pt:'114 suras', tr:'114 sure'
};

const KIDS_EMOJIS = ['🌙','⭐','🌟','✨','🕌','📖','🌸','💫','🦋','🌈','🎯','🏆'];
const KIDS_COLORS_LIST = ['#FF6B6B','#6C63FF','#00B4D8','#52B788','#F4A261','#E76F51','#E85D9A','#8E44AD'];

// Les 32 cartes : id=1 (Fatiha), id=85..114 (ordre décroissant 114→85), id='all'
const KIDS_CARD_IDS = [1, 114,113,112,111,110,109,108,107,106,105,104,103,102,101,100,
                          99,98,97,96,95,94,93,92,91,90,89,88,87,86,85, 'all'];

// ============================================================
// ÉTAT
// ============================================================

var kidsLang         = 'fr';
var kidsCurrentSurah = null;
var kidsAudioPlayer  = null;
var kidsAudioVerse   = 0;
var kidsAudioPlaying = false;
var kidsAudioSpeed   = 1;
var kidsShowPhonetic = true;
var kidsShowTransl   = true;
var kidsCache        = {};

const KIDS_SVG_PLAY  = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
const KIDS_SVG_PAUSE = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;

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
  const b = document.getElementById('lang-btn');
  if (m) m.classList.remove('open');
  if (b) b.classList.remove('open');
  if (kidsCurrentSurah) kidsLoadSurah(kidsCurrentSurah);
}

function kidsToggleLangMenu() {
  const m = document.getElementById('lang-menu');
  const b = document.getElementById('lang-btn');
  if (m) m.classList.toggle('open');
  if (b) b.classList.toggle('open', m && m.classList.contains('open'));
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
  const lang = kidsGetLang();

  KIDS_CARD_IDS.forEach((cardId, i) => {
    const card = document.createElement('div');
    card.className = 'kids-surah-card';
    const color = KIDS_COLORS_LIST[i % KIDS_COLORS_LIST.length];
    const lightColor = color + '22';
    card.style.setProperty('--kc', color);
    card.style.setProperty('--kc-light', lightColor);
    const emoji = KIDS_EMOJIS[i % KIDS_EMOJIS.length];

    if (cardId === 'all') {
      card.onclick = () => kidsOpenAll();
      card.innerHTML = `
        <div class="kids-card-emoji">${emoji}</div>
        <div class="kids-card-ar" style="font-size:15px;margin-top:4px;">📚</div>
        <div class="kids-card-name">${KIDS_ALL_QURAN[lang] || '📚 Tout le Coran'}</div>
        <div class="kids-card-sub">${KIDS_ALL_SUB[lang] || '114 sourates'}</div>
      `;
    } else {
      const surah = SURAHS.find(s => s.id === cardId);
      if (!surah) return;
      const typeLabel = surah.type === 'mecquoise' ? (KIDS_MECCAN[lang] || 'Meccan') : (KIDS_MEDINAN[lang] || 'Medinan');
      card.onclick = () => kidsOpenSurah(cardId);
      card.innerHTML = `
        <div class="kids-card-emoji">${emoji}</div>
        <div class="kids-card-ar">${surah.ar}</div>
        <div class="kids-card-name">${surah.fr}</div>
        <div class="kids-card-sub">${surah.verses} ${KIDS_VERSE_LABEL[lang] || 'versets'}</div>
      `;
    }
    grid.appendChild(card);
  });
}

// ============================================================
// NAVIGATION
// ============================================================

function kidsOpenSurah(surahId) {
  kidsCurrentSurah = surahId;
  kidsStopAudio();
  const surah = SURAHS.find(s => s.id === surahId);
  if (!surah) return;

  document.getElementById('surahTopbarAr').textContent = surah.ar;
  document.getElementById('surahTopbarFr').textContent = surah.fr;

  document.getElementById('pageHome').style.display = 'none';
  document.getElementById('pageAll').style.display = 'none';
  const pageSurah = document.getElementById('pageSurah');
  pageSurah.style.display = 'flex';
  pageSurah.scrollTop = 0;

  kidsLoadSurah(surahId);
}

function kidsOpenAll() {
  kidsStopAudio();
  document.getElementById('pageHome').style.display = 'none';
  document.getElementById('pageSurah').style.display = 'none';
  document.getElementById('pageAll').style.display = 'flex';
  kidsRenderAllList();
}

function kidsBackToHome() {
  kidsStopAudio();
  kidsCurrentSurah = null;
  document.getElementById('pageSurah').style.display = 'none';
  document.getElementById('pageAll').style.display = 'none';
  document.getElementById('pageHome').style.display = 'block';
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
    const item = document.createElement('div');
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
// API + RENDU VERSETS
// ============================================================

const KIDS_API_EDITIONS = {
  fr:'fr.hamidullah', en:'en.sahih', es:'es.cortes', de:'de.bubenheim',
  it:'it.piccardo', nl:'nl.keyzer', pt:'pt.elhayek', tr:'tr.diyanet',
};

async function kidsLoadSurah(surahId) {
  const scroll = document.getElementById('surahScroll');
  const lang = kidsGetLang();
  const surah = SURAHS.find(s => s.id === surahId);
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
    kidsRenderVerses(surah, data, lang);
  } catch(e) {
    scroll.innerHTML = `<div class="error-block">😕 Connexion requise pour charger les versets.</div>`;
  }
}

function kidsRenderVerses(surah, data, lang) {
  const scroll = document.getElementById('surahScroll');
  if (!scroll) return;

  const arabicData   = data[0];
  const phoneticData = data[1];
  const translData   = data[2];

  kidsAudioVerse = 0;
  kidsUpdateAudioBar(0);

  let html = '';

  // Basmala
  if (surah.id !== 9 && surah.id !== 1) {
    html += `<div class="kids-basmala">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>`;
  }

  arabicData.ayahs.forEach((ayah, i) => {
    const phoneticText = phoneticData.ayahs[i] ? phoneticData.ayahs[i].text : '';
    const translText   = translData.ayahs[i]   ? translData.ayahs[i].text   : '';
    const vNum         = ayah.numberInSurah;
    const color        = KIDS_COLORS_LIST[i % KIDS_COLORS_LIST.length];
    const phonHidden   = kidsShowPhonetic ? '' : ' hidden';
    const trHidden     = kidsShowTransl   ? '' : ' hidden';

    html += `
      <div class="kids-verse-card" id="verse-${vNum}" style="--vc:${color}">
        <div class="kids-verse-header">
          <div class="kids-verse-badge">${vNum}</div>
          <button class="kids-verse-copy" onclick="kidsCopyVerse(${vNum})">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
        </div>
        <div class="kids-verse-arabic">${ayah.text}</div>
        <span class="kids-verse-phonetic${phonHidden}" id="kph-${surah.id}-${vNum}">${phoneticText}</span>
        <span class="kids-verse-transl${trHidden}" id="ktr-${surah.id}-${vNum}">${translText}</span>
      </div>
    `;
  });

  scroll.innerHTML = html;
  scroll.scrollTop = 0;
}

// ============================================================
// COPIER VERSET
// ============================================================

function kidsCopyVerse(verseNum) {
  const surah = SURAHS.find(s => s.id === kidsCurrentSurah);
  if (!surah) return;
  const arEl = document.querySelector(`#verse-${verseNum} .kids-verse-arabic`);
  const phEl = document.getElementById(`kph-${kidsCurrentSurah}-${verseNum}`);
  const trEl = document.getElementById(`ktr-${kidsCurrentSurah}-${verseNum}`);
  let text = `${surah.fr} (${verseNum})\n\n`;
  if (arEl) text += arEl.textContent.trim() + '\n';
  if (phEl) text += phEl.textContent.trim() + '\n';
  if (trEl) text += trEl.textContent.trim() + '\n';
  text += '\n— Deentag';
  if (navigator.share) navigator.share({ title:'Deentag Coran', text }).catch(()=>{});
  else navigator.clipboard.writeText(text).catch(()=>{});
}

// ============================================================
// AUDIO
// ============================================================

function kidsUpdateAudioBar(verseIndex) {
  const info = document.getElementById('audioVerseNum');
  const surah = SURAHS.find(s => s.id === kidsCurrentSurah);
  if (info) {
    const total = surah ? surah.verses : 0;
    info.textContent = total > 0 ? `${verseIndex + 1} / ${total}` : '— / —';
  }
}

function kidsHighlightVerse(verseNum) {
  document.querySelectorAll('.kids-verse-card.playing').forEach(el => el.classList.remove('playing'));
  const el = document.getElementById('verse-' + verseNum);
  if (el) {
    el.classList.add('playing');
    el.scrollIntoView({ behavior:'smooth', block:'center' });
  }
  kidsUpdateAudioBar(verseNum - 1);
}

function kidsPlayVerseAudio(verseNum) {
  if (!kidsCurrentSurah) return Promise.reject();
  const verseGlobal = SURAHS.slice(0, kidsCurrentSurah - 1).reduce((acc, s) => acc + s.verses, 0) + verseNum;
  const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${verseGlobal}.mp3`;
  return new Promise((resolve, reject) => {
    const player = new Audio(audioUrl);
    kidsAudioPlayer = player;
    player.playbackRate = kidsAudioSpeed;
    player.play().catch(reject);
    player.onended = resolve;
    player.onerror = reject;
  });
}

async function kidsStartKaraoke(fromVerse) {
  const surah = SURAHS.find(s => s.id === kidsCurrentSurah);
  if (!surah) return;
  kidsAudioPlaying = true;
  const playBtn = document.getElementById('audioPlayBtn');
  if (playBtn) { playBtn.classList.add('playing'); playBtn.innerHTML = KIDS_SVG_PAUSE; }

  for (let v = fromVerse; v <= surah.verses; v++) {
    if (!kidsAudioPlaying) break;
    kidsAudioVerse = v;
    kidsHighlightVerse(v);
    try { await kidsPlayVerseAudio(v); } catch(e) {}
    if (!kidsAudioPlaying) break;
  }

  if (kidsAudioPlaying) {
    // Fin de sourate → confettis !
    kidsLaunchConfetti();
  }
  kidsStopAudio();
}

function kidsToggleAudio() {
  if (kidsAudioPlaying) kidsStopAudio();
  else kidsStartKaraoke(kidsAudioVerse || 1);
}

function kidsStopAudio() {
  kidsAudioPlaying = false;
  if (kidsAudioPlayer) {
    kidsAudioPlayer.pause();
    kidsAudioPlayer.src = '';
    kidsAudioPlayer = null;
  }
  document.querySelectorAll('.kids-verse-card.playing').forEach(el => el.classList.remove('playing'));
  const playBtn = document.getElementById('audioPlayBtn');
  if (playBtn) { playBtn.classList.remove('playing'); playBtn.innerHTML = KIDS_SVG_PLAY; }
}

function kidsPrevVerse() {
  if (kidsAudioVerse > 1) { kidsStopAudio(); kidsAudioVerse--; kidsStartKaraoke(kidsAudioVerse); }
}

function kidsNextVerse() {
  const surah = SURAHS.find(s => s.id === kidsCurrentSurah);
  if (!surah) return;
  if (kidsAudioVerse < surah.verses) { kidsStopAudio(); kidsAudioVerse++; kidsStartKaraoke(kidsAudioVerse); }
}

function kidsCycleSpeed() {
  const speeds = [1, 0.75, 0.5];
  const idx = speeds.indexOf(kidsAudioSpeed);
  kidsAudioSpeed = speeds[(idx + 1) % speeds.length];
  const btn = document.getElementById('audioSpeedBtn');
  if (btn) btn.textContent = kidsAudioSpeed + 'x';
  if (kidsAudioPlayer) kidsAudioPlayer.playbackRate = kidsAudioSpeed;
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
  if (type === 'ar') document.querySelectorAll('.kids-verse-arabic').forEach(el => el.style.fontSize = px + 'px');
  if (type === 'ph') document.querySelectorAll('.kids-verse-phonetic').forEach(el => el.style.fontSize = px + 'px');
  if (type === 'tr') document.querySelectorAll('.kids-verse-transl').forEach(el => el.style.fontSize = px + 'px');
  document.querySelectorAll(`.size-pill[data-type="${type}"]`).forEach(p => p.classList.toggle('active', p.dataset.val === level));
}

function kidsTogglePhonetic(el) {
  kidsShowPhonetic = !kidsShowPhonetic;
  el.classList.toggle('on', kidsShowPhonetic);
  localStorage.setItem('quran_kids_phonetic', kidsShowPhonetic ? '1' : '0');
  document.querySelectorAll('.kids-verse-phonetic').forEach(e => e.classList.toggle('hidden', !kidsShowPhonetic));
}

function kidsToggleTranslation(el) {
  kidsShowTransl = !kidsShowTransl;
  el.classList.toggle('on', kidsShowTransl);
  localStorage.setItem('quran_kids_translation', kidsShowTransl ? '1' : '0');
  document.querySelectorAll('.kids-verse-transl').forEach(e => e.classList.toggle('hidden', !kidsShowTransl));
}

let kidsSettingsTimer = null;
function kidsOpenSettings() {
  const panel = document.getElementById('surahSettingsPanel');
  if (!panel) return;
  const isOpen = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  if (!isOpen) {
    clearTimeout(kidsSettingsTimer);
    kidsSettingsTimer = setTimeout(() => panel.classList.remove('open'), 5000);
  }
}
function kidsCloseSettings() {
  const p = document.getElementById('surahSettingsPanel');
  if (p) p.classList.remove('open');
}

// ============================================================
// CONFETTIS
// ============================================================

function kidsLaunchConfetti() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;
  const colors = ['#FF6B6B','#6C63FF','#00B4D8','#52B788','#F4A261','#FFD700','#E85D9A'];
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.animationDelay = Math.random() * 1.5 + 's';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width  = (8 + Math.random() * 8) + 'px';
    piece.style.height = (8 + Math.random() * 8) + 'px';
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
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

window.addEventListener('beforeunload', kidsStopAudio);
window.addEventListener('pagehide', kidsStopAudio);
