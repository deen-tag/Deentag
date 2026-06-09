// ===== DEENTAG — QURAN-KIDS.JS =====
// Version enfant — séparé de quran.js
// ============================================================

// Réutilise les données de quran.js si disponibles, sinon déclare en local
// On importe quran.js avant ce fichier donc JUZ_DATA, SURAHS, etc. sont disponibles

const KIDS_LANGS = ['fr', 'en', 'es', 'de', 'it', 'nl', 'pt', 'tr'];

const KIDS_VERSE_LABEL = {
  fr:'versets', en:'verses', es:'versos', de:'Verse',
  it:'versetti', nl:'verzen', pt:'versos', tr:'ayet'
};
const KIDS_MECCAN  = { fr:'mecquoise', en:'Meccan', es:'Meca', de:'mekkanisch', it:'meccana', nl:'Mekaans', pt:'mequense', tr:'Mekki' };
const KIDS_MEDINAN = { fr:'médinoise', en:'Medinan', es:'Medina', de:'medinensisch', it:'medinese', nl:'Medinees', pt:'medinense', tr:'Medeni' };
const KIDS_JUZ_WORD = { fr:'Jouz', en:'Juz', es:'Yuz', de:'Juz', it:'Juz', nl:'Juz', pt:'Juz', tr:'Cüz' };
const KIDS_BACK  = { fr:'← Retour', en:'← Back', es:'← Volver', de:'← Zurück', it:'← Indietro', nl:'← Terug', pt:'← Voltar', tr:'← Geri' };
const KIDS_LOADING = { fr:'Chargement...', en:'Loading...', es:'Cargando...', de:'Laden...', it:'Caricamento...', nl:'Laden...', pt:'Carregando...', tr:'Yükleniyor...' };
const KIDS_SELECT = { fr:'Choisis une sourate 🌟', en:'Choose a surah 🌟', es:'Elige una sura 🌟', de:'Sure wählen 🌟', it:'Scegli una sura 🌟', nl:'Kies een soera 🌟', pt:'Escolhe uma sura 🌟', tr:'Sure seç 🌟' };
const KIDS_VERSE_WORD = { fr:'Verset', en:'Verse', es:'Verso', de:'Vers', it:'Versetto', nl:'Vers', pt:'Verso', tr:'Ayet' };

// ============================================================
// ÉTAT
// ============================================================

var kidsLang         = 'fr';
var kidsCurrentJuz   = null;
var kidsCurrentSurah = null;
var kidsTransitioning= false;
var kidsAudioPlayer  = null;
var kidsAudioVerse   = 0;
var kidsAudioPlaying = false;
var kidsAudioSpeed   = 1;
var kidsShowPhonetic = true;
var kidsShowTransl   = true;
var kidsCache        = {};

const KIDS_COLORS = ['#FF6B6B','#6C63FF','#00B4D8','#52B788','#F4A261','#E76F51','#E85D9A'];

function kidsColor(index) { return KIDS_COLORS[index % KIDS_COLORS.length]; }

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
  document.querySelectorAll('[data-lang-block]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-lang-block') === lang);
  });
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
    const b = document.getElementById('lang-btn');
    if (m) m.classList.remove('open');
    if (b) b.classList.remove('open');
  }
});

// ============================================================
// CARTES JUZ
// ============================================================

function kidsRenderJuzCards() {
  const grid = document.getElementById('juzGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const lang = kidsGetLang();

  JUZ_DATA.forEach((juz, i) => {
    const card = document.createElement('div');
    card.className = 'kids-juz-card';
    card.onclick = () => kidsOpenJuzSheet(juz.juz);
    card.innerHTML = `
      <div class="kids-juz-num-ar">${juz.ar}</div>
      <div class="kids-juz-divider"></div>
      <div class="kids-juz-label">${KIDS_JUZ_WORD[lang] || 'Juz'} ${juz.juz}</div>
      <div class="kids-juz-range">${juz.range}</div>
    `;
    grid.appendChild(card);
  });
}

// ============================================================
// BOTTOM SHEET — JUZ
// ============================================================

function kidsOpenJuzSheet(juzNum) {
  kidsCurrentJuz = juzNum;
  kidsStopAudio();

  const juz = JUZ_DATA.find(j => j.juz === juzNum);
  if (!juz) return;

  const lang       = kidsGetLang();
  const sheet      = document.getElementById('bottomSheet');
  const listView   = document.getElementById('listView');
  const surahView  = document.getElementById('surahView');
  const colorIdx   = (juzNum - 1) % KIDS_COLORS.length;

  listView.style.display  = 'flex';
  surahView.style.display = 'none';
  sheet.style.height      = '';
  sheet.style.maxHeight   = '88vh';
  sheet.style.borderRadius= '28px 28px 0 0';
  sheet.style.overflowY   = 'auto';
  sheet.style.top         = '';
  sheet.style.position    = '';

  // Header couleur
  const header = document.getElementById('bsJuzHeader');
  if (header) header.setAttribute('data-color', String(colorIdx + 1));
  document.getElementById('bsJuzAr').textContent    = juz.ar;
  document.getElementById('bsJuzTitle').textContent  = `${KIDS_JUZ_WORD[lang] || 'Juz'} ${juz.juz} 🌟`;
  document.getElementById('bsJuzRange').textContent  = juz.range;

  const subEl = document.getElementById('bsSubtitle');
  if (subEl) subEl.textContent = KIDS_SELECT[lang] || 'Choisis une sourate 🌟';

  const searchEl = document.getElementById('bsSearch');
  if (searchEl) searchEl.value = '';

  kidsRenderSurahList(juz.sourahs, '');

  document.getElementById('bsOverlay').classList.add('active');
  sheet.classList.add('open');
  document.body.style.overscrollBehavior = 'none';
  document.documentElement.style.overscrollBehavior = 'none';
  document.body.style.overflow  = 'hidden';
  document.body.style.position  = 'fixed';
  document.body.style.width     = '100%';
}

function kidsCloseSheet(fromSwipe) {
  kidsStopAudio();
  const sheet    = document.getElementById('bottomSheet');
  const listView = document.getElementById('listView');
  const surahView= document.getElementById('surahView');

  const resetBody = () => {
    document.body.style.overscrollBehavior = '';
    document.documentElement.style.overscrollBehavior = '';
    document.body.style.overflow  = '';
    document.body.style.position  = '';
    document.body.style.width     = '';
  };

  if (fromSwipe) {
    sheet.style.transition = 'transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94)';
    sheet.style.transform  = 'translateY(100%)';
    document.getElementById('bsOverlay').classList.remove('active');
    setTimeout(() => {
      sheet.classList.remove('open');
      sheet.style.transform = sheet.style.transition = '';
      sheet.style.height = sheet.style.maxHeight = sheet.style.borderRadius = '';
      sheet.style.top = sheet.style.position = '';
      if (listView)  { listView.style.opacity  = ''; listView.style.transition  = ''; }
      if (surahView) { surahView.style.opacity = ''; surahView.style.transition = ''; }
      kidsCurrentJuz = kidsCurrentSurah = null;
      kidsTransitioning = false;
      resetBody();
    }, 260);
    return;
  }

  document.getElementById('bsOverlay').classList.remove('active');
  sheet.classList.remove('open');
  sheet.style.height = sheet.style.maxHeight = sheet.style.borderRadius = '';
  sheet.style.top = sheet.style.position = '';
  kidsCurrentJuz = kidsCurrentSurah = null;
  resetBody();
}

// ============================================================
// LISTE SOURATES
// ============================================================

function kidsRenderSurahList(surahIds, filter) {
  const list = document.getElementById('surahList');
  const lang = kidsGetLang();
  if (!list) return;
  list.innerHTML = '';

  const filtered = surahIds
    .map(id => SURAHS.find(s => s.id === id))
    .filter(Boolean)
    .filter(s => {
      if (!filter) return true;
      const f = filter.toLowerCase();
      return s.fr.toLowerCase().includes(f) || s.en.toLowerCase().includes(f) ||
             s.ar.includes(filter) || String(s.id).includes(f);
    });

  filtered.forEach((surah, i) => {
    const typeLabel = surah.type === 'mecquoise' ? (KIDS_MECCAN[lang] || 'Meccan') : (KIDS_MEDINAN[lang] || 'Medinan');
    const vLabel    = KIDS_VERSE_LABEL[lang] || 'verses';

    const item = document.createElement('div');
    item.className = 'surah-item';
    item.innerHTML = `
      <div class="surah-num">${surah.id}</div>
      <div class="surah-info">
        <div class="surah-name-ar">${surah.ar}</div>
        <div class="surah-name-fr">${surah.fr}</div>
        <div class="surah-meta">${typeLabel}</div>
      </div>
      <div class="surah-versets">${surah.verses}<br>${vLabel}</div>
    `;
    item.addEventListener('click', () => kidsOpenSurah(surah.id));
    list.appendChild(item);

    if (i < filtered.length - 1) {
      const sep = document.createElement('div');
      sep.className = 'surah-separator';
      list.appendChild(sep);
    }
    setTimeout(() => item.classList.add('show'), 20 + i * 40);
  });
}

// ============================================================
// OUVERTURE SOURATE
// ============================================================

function kidsOpenSurah(surahId) {
  if (kidsTransitioning) return;
  kidsTransitioning = true;
  kidsStopAudio();

  const surah    = SURAHS.find(s => s.id === surahId);
  if (!surah) { kidsTransitioning = false; return; }

  kidsCurrentSurah = surahId;

  const sheet     = document.getElementById('bottomSheet');
  const listView  = document.getElementById('listView');
  const surahView = document.getElementById('surahView');
  const lang      = kidsGetLang();

  listView.style.transition = 'opacity 0.15s ease';
  listView.style.opacity    = '0';

  setTimeout(() => {
    listView.style.display  = 'none';
    listView.style.opacity  = '';
    listView.style.transition = '';

    document.getElementById('surahBackBtn').textContent = KIDS_BACK[lang] || '← Retour';
    document.getElementById('surahTopbarAr').textContent = surah.ar;
    document.getElementById('surahTopbarFr').textContent = surah.fr;

    surahView.style.display  = 'flex';
    surahView.style.opacity  = '0';

    sheet.style.transition   = 'none';
    sheet.style.transform    = 'translateY(100%)';
    sheet.style.height       = 'calc(100dvh - 16px)';
    sheet.style.maxHeight    = 'calc(100dvh - 16px)';
    sheet.style.borderRadius = '24px 24px 0 0';
    sheet.style.overflowY    = 'hidden';
    sheet.style.top          = '16px';
    sheet.style.position     = 'fixed';
    sheet.style.willChange   = 'transform';

    requestAnimationFrame(() => {
      sheet.style.transition = 'transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94)';
      sheet.style.transform  = 'translateY(0)';
    });

    kidsLoadSurah(surahId);

    setTimeout(() => {
      surahView.style.transition = 'opacity 0.2s ease';
      surahView.style.opacity    = '1';
      setTimeout(() => { surahView.style.transition = ''; kidsTransitioning = false; }, 200);
    }, 200);
  }, 150);
}

// ============================================================
// API
// ============================================================

const KIDS_API_EDITIONS = {
  fr:'fr.hamidullah', en:'en.sahih', es:'es.cortes', de:'de.bubenheim',
  it:'it.piccardo', nl:'nl.keyzer', pt:'pt.elhayek', tr:'tr.diyanet',
};

async function kidsLoadSurah(surahId) {
  const scroll = document.getElementById('surahScroll');
  const lang   = kidsGetLang();
  const surah  = SURAHS.find(s => s.id === surahId);
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
    kidsRenderSurah(surah, data, lang);
  } catch (e) {
    scroll.innerHTML = `<div class="error-block">😕 Connexion requise pour charger les versets.</div>`;
  }
}

// ============================================================
// RENDU VERSETS
// ============================================================

function kidsRenderSurah(surah, data, lang) {
  const scroll = document.getElementById('surahScroll');
  if (!scroll) return;

  const arabicData   = data[0];
  const phoneticData = data[1];
  const translData   = data[2];
  const typeLabel    = surah.type === 'mecquoise' ? (KIDS_MECCAN[lang] || 'Meccan') : (KIDS_MEDINAN[lang] || 'Medinan');

  kidsAudioVerse = 0;

  let html = `
    <div class="surah-view-header fade-in">
      <div class="surah-view-name-ar">${surah.ar}</div>
      <div class="surah-view-name-fr">${surah.fr}</div>
      <div class="surah-view-meta">${typeLabel} · ${surah.verses} ${KIDS_VERSE_LABEL[lang] || 'versets'} 📖</div>
    </div>
    <div class="surah-view-divider">
      <div class="surah-view-divider-line"></div>
      <span class="divider-star">⭐</span>
      <div class="surah-view-divider-line"></div>
    </div>
  `;

  if (surah.id !== 9 && surah.id !== 1) {
    html += `<div class="basmala-block">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>`;
  }

  arabicData.ayahs.forEach((ayah, i) => {
    const phoneticText = phoneticData.ayahs[i] ? phoneticData.ayahs[i].text : '';
    const translText   = translData.ayahs[i]   ? translData.ayahs[i].text   : '';
    const vNum         = ayah.numberInSurah;
    const phonHidden   = kidsShowPhonetic ? '' : ' hidden';
    const trHidden     = kidsShowTransl   ? '' : ' hidden';

    html += `
      <div class="verse-block" id="verse-${vNum}">
        <div class="verse-number">
          <div class="verse-num-badge">${vNum}</div>
          <button class="verse-copy-btn" onclick="kidsCopyVerse(${vNum})">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
        </div>
        <div class="verse-arabic">${ayah.text}</div>
        <span class="verse-phonetic${phonHidden}" id="kph-${surah.id}-${vNum}">${phoneticText}</span>
        <span class="verse-translation${trHidden}" id="ktr-${surah.id}-${vNum}">${translText}</span>
      </div>
    `;
  });

  scroll.innerHTML = html;
  scroll.scrollTop = 0;
  kidsUpdateAudioBar(0);
}

// ============================================================
// COPIER VERSET
// ============================================================

function kidsCopyVerse(verseNum) {
  const surah = SURAHS.find(s => s.id === kidsCurrentSurah);
  if (!surah) return;
  const arEl = document.querySelector(`#verse-${verseNum} .verse-arabic`);
  const phEl = document.getElementById(`kph-${kidsCurrentSurah}-${verseNum}`);
  const trEl = document.getElementById(`ktr-${kidsCurrentSurah}-${verseNum}`);
  let text = '';
  if (surah) text += `${surah.fr} (${verseNum})\n\n`;
  if (arEl)  text += arEl.textContent.trim() + '\n';
  if (phEl)  text += phEl.textContent.trim() + '\n';
  if (trEl)  text += trEl.textContent.trim() + '\n';
  text += '\n— Deentag';
  if (navigator.share) navigator.share({ title:'Deentag Coran', text }).catch(() => {});
  else navigator.clipboard.writeText(text).catch(() => {});
}

// ============================================================
// RETOUR LISTE
// ============================================================

function kidsBackToList(fromSwipe) {
  if (kidsTransitioning) return;
  kidsTransitioning = true;
  kidsStopAudio();

  const sheet     = document.getElementById('bottomSheet');
  const listView  = document.getElementById('listView');
  const surahView = document.getElementById('surahView');
  const lang      = kidsGetLang();

  if (fromSwipe) {
    surahView.style.opacity  = '0';
    sheet.style.transition   = 'transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94)';
    sheet.style.transform    = 'translateY(100%)';
    setTimeout(() => {
      kidsCurrentSurah = null;
      if (kidsCurrentJuz) {
        const juz = JUZ_DATA.find(j => j.juz === kidsCurrentJuz);
        if (juz) kidsRenderSurahList(juz.sourahs, '');
      }
      listView.style.display    = 'flex';
      listView.style.opacity    = '0';
      surahView.style.display   = 'none';
      surahView.style.opacity   = '';
      sheet.style.height        = '';
      sheet.style.maxHeight     = '88vh';
      sheet.style.borderRadius  = '28px 28px 0 0';
      sheet.style.overflowY     = 'auto';
      sheet.style.top           = '';
      sheet.style.position      = '';
      sheet.style.transform     = 'translateY(100%)';
      sheet.style.transition    = 'none';
      sheet.style.willChange    = '';
      requestAnimationFrame(() => {
        sheet.style.transition    = 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)';
        sheet.style.transform     = 'translateY(0)';
        listView.style.transition = 'opacity 0.2s ease';
        listView.style.opacity    = '1';
        setTimeout(() => {
          sheet.style.transition    = '';
          listView.style.transition = '';
          kidsTransitioning = false;
        }, 360);
      });
    }, 260);
    return;
  }

  surahView.style.transition = 'opacity 0.15s ease';
  surahView.style.opacity    = '0';
  setTimeout(() => {
    kidsCurrentSurah = null;
    surahView.style.display   = 'none';
    surahView.style.opacity   = '';
    surahView.style.transition= '';
    if (kidsCurrentJuz) {
      const juz = JUZ_DATA.find(j => j.juz === kidsCurrentJuz);
      if (juz) kidsRenderSurahList(juz.sourahs, '');
    }
    listView.style.display    = 'flex';
    listView.style.opacity    = '0';
    sheet.style.transition    = 'none';
    sheet.style.transform     = 'translateY(100%)';
    sheet.style.height        = '';
    sheet.style.maxHeight     = '88vh';
    sheet.style.borderRadius  = '28px 28px 0 0';
    sheet.style.overflowY     = 'auto';
    sheet.style.top           = '';
    sheet.style.position      = '';
    sheet.style.willChange    = '';
    requestAnimationFrame(() => {
      sheet.style.transition    = 'transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94)';
      sheet.style.transform     = 'translateY(0)';
      listView.style.transition = 'opacity 0.2s ease';
      listView.style.opacity    = '1';
      setTimeout(() => {
        sheet.style.transition    = '';
        listView.style.transition = '';
        kidsTransitioning = false;
      }, 400);
    });
  }, 150);
}

// ============================================================
// AUDIO KARAOKÉ
// ============================================================

function kidsUpdateAudioBar(verseIndex) {
  const info = document.getElementById('audioVerseNum');
  const surah = SURAHS.find(s => s.id === kidsCurrentSurah);
  if (info) {
    const total = surah ? surah.verses : 0;
    info.textContent = total > 0 ? `${verseIndex + 1} / ${total}` : '—';
  }
}

function kidsHighlightVerse(verseNum) {
  document.querySelectorAll('.verse-block.playing').forEach(el => el.classList.remove('playing'));
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
  if (playBtn) {
    playBtn.classList.add('playing');
    playBtn.innerHTML = KIDS_SVG_PAUSE;
  }
  for (let v = fromVerse; v <= surah.verses; v++) {
    if (!kidsAudioPlaying) break;
    kidsAudioVerse = v;
    kidsHighlightVerse(v);
    try { await kidsPlayVerseAudio(v); } catch(e) {}
    if (!kidsAudioPlaying) break;
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
  document.querySelectorAll('.verse-block.playing').forEach(el => el.classList.remove('playing'));
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

const KIDS_SVG_PLAY  = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
const KIDS_SVG_PAUSE = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;

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
  if (type === 'ar') document.querySelectorAll('.verse-arabic').forEach(el => el.style.fontSize = px + 'px');
  if (type === 'ph') document.querySelectorAll('.verse-phonetic').forEach(el => el.style.fontSize = px + 'px');
  if (type === 'tr') document.querySelectorAll('.verse-translation').forEach(el => el.style.fontSize = px + 'px');
  document.querySelectorAll(`.size-pill[data-type="${type}"]`).forEach(p => p.classList.toggle('active', p.dataset.val === level));
}

function kidsTogglePhonetic(el) {
  kidsShowPhonetic = !kidsShowPhonetic;
  el.classList.toggle('on', kidsShowPhonetic);
  localStorage.setItem('quran_kids_phonetic', kidsShowPhonetic ? '1' : '0');
  document.querySelectorAll('.verse-phonetic').forEach(e => e.classList.toggle('hidden', !kidsShowPhonetic));
}

function kidsToggleTranslation(el) {
  kidsShowTransl = !kidsShowTransl;
  el.classList.toggle('on', kidsShowTransl);
  localStorage.setItem('quran_kids_translation', kidsShowTransl ? '1' : '0');
  document.querySelectorAll('.verse-translation').forEach(e => e.classList.toggle('hidden', !kidsShowTransl));
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
// SWIPE
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  const sheet = document.getElementById('bottomSheet');
  if (!sheet) return;

  let startY = 0, swipeDY = 0, swipeActive = false, swipeBlocked = false;

  sheet.addEventListener('touchstart', e => {
    if (kidsTransitioning) return;
    startY = e.touches[0].clientY; swipeDY = 0;
    swipeActive = true; swipeBlocked = false;
    sheet.style.transition = 'none';
  }, { passive: true });

  sheet.addEventListener('touchmove', e => {
    if (!swipeActive || kidsTransitioning || swipeBlocked) return;
    const dy = e.touches[0].clientY - startY;
    if (Math.abs(dy) < 10) return;
    if (dy < 0) { swipeBlocked = true; return; }

    const scrollEl = kidsCurrentSurah
      ? document.getElementById('surahScroll')
      : document.getElementById('bottomSheet');
    if (scrollEl && scrollEl.scrollTop > 5) { swipeBlocked = true; return; }

    swipeDY = dy;
    const drag = dy > 100 ? 100 + (dy - 100) * 0.3 : dy;
    sheet.style.transform = 'translateY(' + drag + 'px)';

    const progress = Math.min(drag / 120, 1);
    if (kidsCurrentSurah) {
      const sv = document.getElementById('surahView');
      if (sv) sv.style.opacity = String(1 - progress);
    } else {
      const lv = document.getElementById('listView');
      if (lv) lv.style.opacity = String(1 - progress);
    }

    const overlay = document.getElementById('bsOverlay');
    if (overlay) overlay.style.background = 'rgba(0,0,0,' + Math.max(0, 0.45 - drag / 300) + ')';
  }, { passive: true });

  sheet.addEventListener('touchend', () => {
    if (!swipeActive || kidsTransitioning) return;
    swipeActive = false;

    const sv      = document.getElementById('surahView');
    const lv      = document.getElementById('listView');
    const overlay = document.getElementById('bsOverlay');
    if (sv)      sv.style.opacity      = '';
    if (lv)      lv.style.opacity      = '';
    if (overlay) overlay.style.background = '';

    if (swipeDY > 180) {
      kidsCurrentSurah ? kidsBackToList(true) : kidsCloseSheet(true);
    } else {
      sheet.style.transition = 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)';
      sheet.style.transform  = 'translateY(0)';
      setTimeout(() => { sheet.style.transition = 'none'; sheet.style.transform = ''; }, 360);
    }
  }, { passive: true });
});

// ============================================================
// NFC
// ============================================================

function kidsHandleNfcParams() {
  const params = new URLSearchParams(window.location.search);
  const juz    = parseInt(params.get('juz'));
  const surah  = parseInt(params.get('sourate'));

  if (surah && SURAHS.find(s => s.id === surah)) {
    const juzForSurah = JUZ_DATA.find(j => j.sourahs.includes(surah));
    if (juzForSurah) {
      setTimeout(() => {
        kidsOpenJuzSheet(juzForSurah.juz);
        setTimeout(() => kidsOpenSurah(surah), 200);
      }, 300);
    }
  } else if (juz && juz >= 1 && juz <= 30) {
    setTimeout(() => kidsOpenJuzSheet(juz), 300);
  }
}

// ============================================================
// CONFETTIS
// ============================================================

function kidsLaunchConfetti() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;
  const colors = ['#FF6B6B','#6C63FF','#00B4D8','#52B788','#F4A261','#FFD700','#E85D9A'];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.animationDelay = Math.random() * 1.5 + 's';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (8 + Math.random() * 8) + 'px';
    piece.style.height = (8 + Math.random() * 8) + 'px';
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}

// ============================================================
// INITIALISATION
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('deentag_theme') || 'day';
  // Kids reste toujours sur fond clair (var(--kids-bg))

  const savedLang = localStorage.getItem('deentag_lang') || 'fr';
  kidsApplyLang(savedLang);

  kidsShowPhonetic = localStorage.getItem('quran_kids_phonetic')    !== '0';
  kidsShowTransl   = localStorage.getItem('quran_kids_translation') !== '0';

  const phToggle = document.getElementById('togglePhonetic');
  const trToggle = document.getElementById('toggleTranslation');
  if (phToggle) phToggle.classList.toggle('on', kidsShowPhonetic);
  if (trToggle) trToggle.classList.toggle('on', kidsShowTransl);

  // Sync tailles
  ['ar','ph','tr'].forEach(t => {
    const level = localStorage.getItem('quran_kids_size_' + t) || 'medium';
    document.querySelectorAll(`.size-pill[data-type="${t}"]`).forEach(p => {
      p.classList.toggle('active', p.dataset.val === level);
    });
  });

  kidsRenderJuzCards();
  kidsHandleNfcParams();

  document.addEventListener('touchstart', e => {
    const p = document.getElementById('surahSettingsPanel');
    if (p && p.classList.contains('open')) {
      if (!p.contains(e.target) && !e.target.closest('[onclick*="kidsOpenSettings"]')) kidsCloseSettings();
    }
  }, { passive: true });

  // Recherche
  const search = document.getElementById('bsSearch');
  if (search) {
    search.addEventListener('input', () => {
      if (!kidsCurrentJuz) return;
      const juz = JUZ_DATA.find(j => j.juz === kidsCurrentJuz);
      if (juz) kidsRenderSurahList(juz.sourahs, search.value);
    });
  }

  document.addEventListener('contextmenu', e => { e.preventDefault(); return false; });
});

window.addEventListener('beforeunload', kidsStopAudio);
window.addEventListener('pagehide', kidsStopAudio);
