// ===== DEENTAG — QURAN.JS =====
// Fichier JS propre au Coran — ne touche pas à app.js ni duas.js
// ============================================================

const LANGS = ['fr', 'en', 'es', 'de', 'it', 'nl', 'pt', 'tr'];

// ============================================================
// DONNÉES — 30 JUZ avec leurs sourates
// ============================================================

const JUZ_DATA = [
  { juz:1,  ar:'١',  sourahs:[1,2],           range:'Al-Fatiha → Al-Baqara 141' },
  { juz:2,  ar:'٢',  sourahs:[2],              range:'Al-Baqara 142 → 252' },
  { juz:3,  ar:'٣',  sourahs:[2,3],            range:'Al-Baqara 253 → Al-Imran 92' },
  { juz:4,  ar:'٤',  sourahs:[3,4],            range:'Al-Imran 93 → An-Nisa 23' },
  { juz:5,  ar:'٥',  sourahs:[4,5],            range:'An-Nisa 24 → Al-Maida 81' },
  { juz:6,  ar:'٦',  sourahs:[4,5,6],          range:'Al-Maida 82 → Al-Anam 110' },
  { juz:7,  ar:'٧',  sourahs:[5,6,7],          range:'Al-Anam 111 → Al-Araf 87' },
  { juz:8,  ar:'٨',  sourahs:[7,8,9],          range:'Al-Araf 88 → Al-Anfal 40' },
  { juz:9,  ar:'٩',  sourahs:[8,9],            range:'Al-Anfal 41 → At-Tawba 92' },
  { juz:10, ar:'١٠', sourahs:[9,10,11],        range:'At-Tawba 93 → Hud 5' },
  { juz:11, ar:'١١', sourahs:[11,12],          range:'Hud 6 → Yusuf 52' },
  { juz:12, ar:'١٢', sourahs:[12,13,14],       range:'Yusuf 53 → Ibrahim 52' },
  { juz:13, ar:'١٣', sourahs:[15,16],          range:'Al-Hijr 1 → An-Nahl 128' },
  { juz:14, ar:'١٤', sourahs:[17,18],          range:'Al-Isra 1 → Al-Kahf 74' },
  { juz:15, ar:'١٥', sourahs:[18,19,20],       range:'Al-Kahf 75 → Ta-Ha 135' },
  { juz:16, ar:'١٦', sourahs:[21,22],          range:'Al-Anbiya 1 → Al-Hajj 78' },
  { juz:17, ar:'١٧', sourahs:[21,22,23,24],    range:'Al-Hajj 1 → Al-Muminun 118' },
  { juz:18, ar:'١٨', sourahs:[23,24,25],       range:'Al-Muminun 1 → Al-Furqan 20' },
  { juz:19, ar:'١٩', sourahs:[25,26,27],       range:'Al-Furqan 21 → An-Naml 55' },
  { juz:20, ar:'٢٠', sourahs:[27,28,29],       range:'An-Naml 56 → Al-Ankabut 45' },
  { juz:21, ar:'٢١', sourahs:[29,30,31,32,33], range:'Al-Ankabut 46 → Al-Ahzab 30' },
  { juz:22, ar:'٢٢', sourahs:[33,34,35,36],    range:'Al-Ahzab 31 → Ya-Sin 27' },
  { juz:23, ar:'٢٣', sourahs:[36,37,38,39],    range:'Ya-Sin 28 → Az-Zumar 31' },
  { juz:24, ar:'٢٤', sourahs:[39,40,41],       range:'Az-Zumar 32 → Fussilat 46' },
  { juz:25, ar:'٢٥', sourahs:[41,42,43,44,45], range:'Fussilat 47 → Al-Jathiya 37' },
  { juz:26, ar:'٢٦', sourahs:[46,47,48,49,50,51], range:'Al-Ahqaf 1 → Adh-Dhariyat 30' },
  { juz:27, ar:'٢٧', sourahs:[51,52,53,54,55,56,57], range:'Adh-Dhariyat 31 → Al-Hadid 29' },
  { juz:28, ar:'٢٨', sourahs:[58,59,60,61,62,63,64,65,66], range:'Al-Mujadila 1 → At-Tahrim 12' },
  { juz:29, ar:'٢٩', sourahs:[67,68,69,70,71,72,73,74,75,76,77], range:'Al-Mulk 1 → Al-Mursalat 50' },
  { juz:30, ar:'٣٠', sourahs:[78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114], range:'An-Naba → An-Nas' },
];

// ============================================================
// DONNÉES — 114 SOURATES
// ============================================================

const SURAHS = [
  { id:1,   ar:'الفاتحة',        fr:'Al-Fatiha',       en:'The Opening',         verses:7,   type:'mecquoise' },
  { id:2,   ar:'البقرة',         fr:'Al-Baqara',       en:'The Cow',             verses:286, type:'médinoise' },
  { id:3,   ar:'آل عمران',       fr:"Al-Imran",        en:'Family of Imran',     verses:200, type:'médinoise' },
  { id:4,   ar:'النساء',         fr:'An-Nisa',         en:'The Women',           verses:176, type:'médinoise' },
  { id:5,   ar:'المائدة',        fr:'Al-Maida',        en:'The Table',           verses:120, type:'médinoise' },
  { id:6,   ar:'الأنعام',        fr:"Al-Anam",         en:'The Cattle',          verses:165, type:'mecquoise' },
  { id:7,   ar:'الأعراف',        fr:"Al-Araf",         en:'The Heights',         verses:206, type:'mecquoise' },
  { id:8,   ar:'الأنفال',        fr:'Al-Anfal',        en:'The Spoils of War',   verses:75,  type:'médinoise' },
  { id:9,   ar:'التوبة',         fr:'At-Tawba',        en:'The Repentance',      verses:129, type:'médinoise' },
  { id:10,  ar:'يونس',           fr:'Yunus',           en:'Jonah',               verses:109, type:'mecquoise' },
  { id:11,  ar:'هود',            fr:'Hud',             en:'Hud',                 verses:123, type:'mecquoise' },
  { id:12,  ar:'يوسف',           fr:'Yusuf',           en:'Joseph',              verses:111, type:'mecquoise' },
  { id:13,  ar:'الرعد',          fr:'Ar-Rad',          en:'The Thunder',         verses:43,  type:'médinoise' },
  { id:14,  ar:'ابراهيم',        fr:'Ibrahim',         en:'Abraham',             verses:52,  type:'mecquoise' },
  { id:15,  ar:'الحجر',          fr:'Al-Hijr',         en:'The Rocky Tract',     verses:99,  type:'mecquoise' },
  { id:16,  ar:'النحل',          fr:'An-Nahl',         en:'The Bee',             verses:128, type:'mecquoise' },
  { id:17,  ar:'الإسراء',        fr:"Al-Isra",         en:'The Night Journey',   verses:111, type:'mecquoise' },
  { id:18,  ar:'الكهف',          fr:'Al-Kahf',         en:'The Cave',            verses:110, type:'mecquoise' },
  { id:19,  ar:'مريم',           fr:'Maryam',          en:'Mary',                verses:98,  type:'mecquoise' },
  { id:20,  ar:'طه',             fr:'Ta-Ha',           en:'Ta-Ha',               verses:135, type:'mecquoise' },
  { id:21,  ar:'الأنبياء',       fr:"Al-Anbiya",       en:'The Prophets',        verses:112, type:'mecquoise' },
  { id:22,  ar:'الحج',           fr:'Al-Hajj',         en:'The Pilgrimage',      verses:78,  type:'médinoise' },
  { id:23,  ar:'المؤمنون',       fr:'Al-Muminun',      en:'The Believers',       verses:118, type:'mecquoise' },
  { id:24,  ar:'النور',          fr:'An-Nur',          en:'The Light',           verses:64,  type:'médinoise' },
  { id:25,  ar:'الفرقان',        fr:'Al-Furqan',       en:'The Criterion',       verses:77,  type:'mecquoise' },
  { id:26,  ar:'الشعراء',        fr:"Ash-Shuara",      en:'The Poets',           verses:227, type:'mecquoise' },
  { id:27,  ar:'النمل',          fr:'An-Naml',         en:'The Ant',             verses:93,  type:'mecquoise' },
  { id:28,  ar:'القصص',          fr:'Al-Qasas',        en:'The Stories',         verses:88,  type:'mecquoise' },
  { id:29,  ar:'العنكبوت',       fr:"Al-Ankabut",      en:'The Spider',          verses:69,  type:'mecquoise' },
  { id:30,  ar:'الروم',          fr:'Ar-Rum',          en:'The Romans',          verses:60,  type:'mecquoise' },
  { id:31,  ar:'لقمان',          fr:'Luqman',          en:'Luqman',              verses:34,  type:'mecquoise' },
  { id:32,  ar:'السجدة',         fr:'As-Sajda',        en:'The Prostration',     verses:30,  type:'mecquoise' },
  { id:33,  ar:'الأحزاب',        fr:"Al-Ahzab",        en:'The Confederates',    verses:73,  type:'médinoise' },
  { id:34,  ar:'سبإ',            fr:'Saba',            en:'Sheba',               verses:54,  type:'mecquoise' },
  { id:35,  ar:'فاطر',           fr:'Fatir',           en:'The Originator',      verses:45,  type:'mecquoise' },
  { id:36,  ar:'يس',             fr:'Ya-Sin',          en:'Ya-Sin',              verses:83,  type:'mecquoise' },
  { id:37,  ar:'الصافات',        fr:'As-Saffat',       en:'Those Ranged in Rows',verses:182, type:'mecquoise' },
  { id:38,  ar:'ص',              fr:'Sad',             en:'Sad',                 verses:88,  type:'mecquoise' },
  { id:39,  ar:'الزمر',          fr:'Az-Zumar',        en:'The Groups',          verses:75,  type:'mecquoise' },
  { id:40,  ar:'غافر',           fr:'Ghafir',          en:'The Forgiver',        verses:85,  type:'mecquoise' },
  { id:41,  ar:'فصلت',           fr:'Fussilat',        en:'Explained in Detail', verses:54,  type:'mecquoise' },
  { id:42,  ar:'الشورى',         fr:'Ash-Shura',       en:'The Consultation',    verses:53,  type:'mecquoise' },
  { id:43,  ar:'الزخرف',         fr:'Az-Zukhruf',      en:'The Ornaments',       verses:89,  type:'mecquoise' },
  { id:44,  ar:'الدخان',         fr:'Ad-Dukhan',       en:'The Smoke',           verses:59,  type:'mecquoise' },
  { id:45,  ar:'الجاثية',        fr:'Al-Jathiya',      en:'The Crouching',       verses:37,  type:'mecquoise' },
  { id:46,  ar:'الأحقاف',        fr:"Al-Ahqaf",        en:'The Wind-Curved Sandhills', verses:35, type:'mecquoise' },
  { id:47,  ar:'محمد',           fr:'Muhammad',        en:'Muhammad',            verses:38,  type:'médinoise' },
  { id:48,  ar:'الفتح',          fr:'Al-Fath',         en:'The Victory',         verses:29,  type:'médinoise' },
  { id:49,  ar:'الحجرات',        fr:'Al-Hujurat',      en:'The Rooms',           verses:18,  type:'médinoise' },
  { id:50,  ar:'ق',              fr:'Qaf',             en:'Qaf',                 verses:45,  type:'mecquoise' },
  { id:51,  ar:'الذاريات',       fr:'Adh-Dhariyat',    en:'The Winnowing Winds', verses:60,  type:'mecquoise' },
  { id:52,  ar:'الطور',          fr:'At-Tur',          en:'The Mount',           verses:49,  type:'mecquoise' },
  { id:53,  ar:'النجم',          fr:'An-Najm',         en:'The Star',            verses:62,  type:'mecquoise' },
  { id:54,  ar:'القمر',          fr:'Al-Qamar',        en:'The Moon',            verses:55,  type:'mecquoise' },
  { id:55,  ar:'الرحمن',         fr:'Ar-Rahman',       en:'The Beneficent',      verses:78,  type:'médinoise' },
  { id:56,  ar:'الواقعة',        fr:"Al-Waqia",        en:'The Inevitable',      verses:96,  type:'mecquoise' },
  { id:57,  ar:'الحديد',         fr:'Al-Hadid',        en:'The Iron',            verses:29,  type:'médinoise' },
  { id:58,  ar:'المجادلة',       fr:'Al-Mujadila',     en:'The Pleading Woman',  verses:22,  type:'médinoise' },
  { id:59,  ar:'الحشر',          fr:'Al-Hashr',        en:'The Exile',           verses:24,  type:'médinoise' },
  { id:60,  ar:'الممتحنة',       fr:'Al-Mumtahana',    en:'She That is Examined',verses:13,  type:'médinoise' },
  { id:61,  ar:'الصف',           fr:'As-Saf',          en:'The Ranks',           verses:14,  type:'médinoise' },
  { id:62,  ar:'الجمعة',         fr:"Al-Juma",         en:'Friday',              verses:11,  type:'médinoise' },
  { id:63,  ar:'المنافقون',      fr:'Al-Munafiqun',    en:'The Hypocrites',      verses:11,  type:'médinoise' },
  { id:64,  ar:'التغابن',        fr:'At-Taghabun',     en:'Mutual Disillusion',  verses:18,  type:'médinoise' },
  { id:65,  ar:'الطلاق',         fr:'At-Talaq',        en:'Divorce',             verses:12,  type:'médinoise' },
  { id:66,  ar:'التحريم',        fr:'At-Tahrim',       en:'The Prohibition',     verses:12,  type:'médinoise' },
  { id:67,  ar:'الملك',          fr:'Al-Mulk',         en:'The Sovereignty',     verses:30,  type:'mecquoise' },
  { id:68,  ar:'القلم',          fr:'Al-Qalam',        en:'The Pen',             verses:52,  type:'mecquoise' },
  { id:69,  ar:'الحاقة',         fr:'Al-Haqqa',        en:'The Inevitable Hour', verses:52,  type:'mecquoise' },
  { id:70,  ar:'المعارج',        fr:'Al-Maarij',       en:'The Ascending Stairways', verses:44, type:'mecquoise' },
  { id:71,  ar:'نوح',            fr:'Nuh',             en:'Noah',                verses:28,  type:'mecquoise' },
  { id:72,  ar:'الجن',           fr:'Al-Jinn',         en:'The Jinn',            verses:28,  type:'mecquoise' },
  { id:73,  ar:'المزمل',         fr:'Al-Muzzammil',    en:'The Enshrouded One',  verses:20,  type:'mecquoise' },
  { id:74,  ar:'المدثر',         fr:'Al-Muddathir',    en:'The Cloaked One',     verses:56,  type:'mecquoise' },
  { id:75,  ar:'القيامة',        fr:'Al-Qiyama',       en:'The Resurrection',    verses:40,  type:'mecquoise' },
  { id:76,  ar:'الإنسان',        fr:"Al-Insan",        en:'The Human',           verses:31,  type:'médinoise' },
  { id:77,  ar:'المرسلات',       fr:'Al-Mursalat',     en:'The Emissaries',      verses:50,  type:'mecquoise' },
  { id:78,  ar:'النبأ',          fr:"An-Naba",         en:'The Tidings',         verses:40,  type:'mecquoise' },
  { id:79,  ar:'النازعات',       fr:"An-Naziat",       en:'Those Who Drag Forth',verses:46,  type:'mecquoise' },
  { id:80,  ar:'عبس',            fr:'Abasa',           en:'He Frowned',          verses:42,  type:'mecquoise' },
  { id:81,  ar:'التكوير',        fr:'At-Takwir',       en:'The Overthrowing',    verses:29,  type:'mecquoise' },
  { id:82,  ar:'الإنفطار',       fr:"Al-Infitar",      en:'The Cleaving',        verses:19,  type:'mecquoise' },
  { id:83,  ar:'المطففين',       fr:'Al-Mutaffifin',   en:'The Defrauding',      verses:36,  type:'mecquoise' },
  { id:84,  ar:'الإنشقاق',       fr:"Al-Inshiqaq",     en:'The Splitting Open',  verses:25,  type:'mecquoise' },
  { id:85,  ar:'البروج',         fr:'Al-Buruj',        en:'The Mansions of Stars',verses:22, type:'mecquoise' },
  { id:86,  ar:'الطارق',         fr:'At-Tariq',        en:'The Morning Star',    verses:17,  type:'mecquoise' },
  { id:87,  ar:'الأعلى',         fr:"Al-Ala",          en:'The Most High',       verses:19,  type:'mecquoise' },
  { id:88,  ar:'الغاشية',        fr:'Al-Ghashiya',     en:'The Overwhelming',    verses:26,  type:'mecquoise' },
  { id:89,  ar:'الفجر',          fr:'Al-Fajr',         en:'The Dawn',            verses:30,  type:'mecquoise' },
  { id:90,  ar:'البلد',          fr:'Al-Balad',        en:'The City',            verses:20,  type:'mecquoise' },
  { id:91,  ar:'الشمس',          fr:'Ash-Shams',       en:'The Sun',             verses:15,  type:'mecquoise' },
  { id:92,  ar:'الليل',          fr:'Al-Layl',         en:'The Night',           verses:21,  type:'mecquoise' },
  { id:93,  ar:'الضحى',          fr:'Ad-Duha',         en:'The Morning Hours',   verses:11,  type:'mecquoise' },
  { id:94,  ar:'الشرح',          fr:'Ash-Sharh',       en:'The Relief',          verses:8,   type:'mecquoise' },
  { id:95,  ar:'التين',          fr:'At-Tin',          en:'The Fig',             verses:8,   type:'mecquoise' },
  { id:96,  ar:'العلق',          fr:"Al-Alaq",         en:'The Clot',            verses:19,  type:'mecquoise' },
  { id:97,  ar:'القدر',          fr:'Al-Qadr',         en:'The Night of Decree', verses:5,   type:'mecquoise' },
  { id:98,  ar:'البينة',         fr:'Al-Bayyina',      en:'The Clear Proof',     verses:8,   type:'médinoise' },
  { id:99,  ar:'الزلزلة',        fr:'Az-Zalzala',      en:'The Earthquake',      verses:8,   type:'médinoise' },
  { id:100, ar:'العاديات',       fr:"Al-Adiyat",       en:'The Courser',         verses:11,  type:'mecquoise' },
  { id:101, ar:'القارعة',        fr:"Al-Qaria",        en:'The Calamity',        verses:11,  type:'mecquoise' },
  { id:102, ar:'التكاثر',        fr:'At-Takathur',     en:'The Rivalry in World Increase', verses:8, type:'mecquoise' },
  { id:103, ar:'العصر',          fr:"Al-Asr",          en:'The Declining Day',   verses:3,   type:'mecquoise' },
  { id:104, ar:'الهمزة',         fr:'Al-Humaza',       en:'The Traducer',        verses:9,   type:'mecquoise' },
  { id:105, ar:'الفيل',          fr:'Al-Fil',          en:'The Elephant',        verses:5,   type:'mecquoise' },
  { id:106, ar:'قريش',           fr:'Quraysh',         en:'Quraysh',             verses:4,   type:'mecquoise' },
  { id:107, ar:'الماعون',        fr:"Al-Maun",         en:'The Small Kindnesses',verses:7,   type:'mecquoise' },
  { id:108, ar:'الكوثر',         fr:'Al-Kawthar',      en:'The Abundance',       verses:3,   type:'mecquoise' },
  { id:109, ar:'الكافرون',       fr:'Al-Kafirun',      en:'The Disbelievers',    verses:6,   type:'mecquoise' },
  { id:110, ar:'النصر',          fr:'An-Nasr',         en:'The Divine Support',  verses:3,   type:'médinoise' },
  { id:111, ar:'المسد',          fr:'Al-Masad',        en:'The Palm Fiber',      verses:5,   type:'mecquoise' },
  { id:112, ar:'الإخلاص',        fr:"Al-Ikhlas",       en:'The Sincerity',       verses:4,   type:'mecquoise' },
  { id:113, ar:'الفلق',          fr:'Al-Falaq',        en:'The Daybreak',        verses:5,   type:'mecquoise' },
  { id:114, ar:'الناس',          fr:'An-Nas',          en:'The Mankind',         verses:6,   type:'mecquoise' },
];

// Traductions du mot "versets"
const VERSE_LABEL = {
  fr: 'versets', en: 'verses', es: 'versos', de: 'Verse',
  it: 'versetti', nl: 'verzen', pt: 'versos', tr: 'ayet'
};
const MECCAN  = { fr:'mecquoise', en:'Meccan',   es:'Meca',    de:'mekkanisch', it:'meccana',  nl:'Mekaans', pt:'mequense', tr:'Mekki' };
const MEDINAN = { fr:'médinoise', en:'Medinan',  es:'Medina',  de:'medinensisch',it:'medinese',nl:'Medinees',pt:'medinense',tr:'Medeni' };
const JUZ_WORD = { fr:'Jouz',    en:'Juz',       es:'Yuz',     de:'Juz',        it:'Juz',      nl:'Juz',     pt:'Juz',      tr:'Cüz' };
const SOURATE_WORD = { fr:'Sélectionnez une sourate', en:'Select a surah', es:'Seleccione una sura', de:'Sure auswählen', it:'Seleziona una sura', nl:'Selecteer een soera', pt:'Selecione uma sura', tr:'Sure seçin' };
const LOADING_WORD = { fr:'Chargement', en:'Loading', es:'Cargando', de:'Laden', it:'Caricamento', nl:'Laden', pt:'Carregando', tr:'Yükleniyor' };
const BACK_WORD = { fr:'Retour', en:'Back', es:'Volver', de:'Zurück', it:'Indietro', nl:'Terug', pt:'Voltar', tr:'Geri' };

// ============================================================
// ÉTAT GLOBAL
// ============================================================

var currentLang         = 'fr';
var currentJuz          = null;
var currentSurahId      = null;
var sheetTransitioning  = false;
var audioPlayer         = null;
var audioCurrentVerse   = 0;
var audioVerseList      = [];
var audioPlaying        = false;
var audioSpeed          = 1;
var currentReciter      = localStorage.getItem('quran_reciter') || 'ar.alafasy';
var showPhonetic        = true;
var showTranslation     = true;
var cachedVerses        = {};

// ============================================================
// LANGUE
// ============================================================

function getLang() {
  return localStorage.getItem('deentag_lang') || LANGS[0];
}
function detectLang() {
  const l = (navigator.language || '').toLowerCase();
  return LANGS.find(code => l.startsWith(code)) || LANGS[0];
}
function applyLangBlocks(lang) {
  document.querySelectorAll('[data-lang-block]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-lang-block') === lang);
  });
}
function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('deentag_lang', lang);
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = lang.toUpperCase() + ' ▾';
  document.querySelectorAll('.lang-option').forEach(o => {
    o.classList.toggle('active', o.dataset.lang === lang);
  });
  applyLangBlocks(lang);
}
function setLang(lang) {
  stopAudio();
  applyLang(lang);
  const m   = document.getElementById('lang-menu');
  const btn = document.getElementById('lang-btn');
  if (m)   m.classList.remove('open');
  if (btn) btn.classList.remove('open');
  // Recharger la vue si une sourate est ouverte
  if (currentSurahId) loadSurah(currentSurahId);
}
function toggleLangMenu() {
  const m   = document.getElementById('lang-menu');
  const btn = document.getElementById('lang-btn');
  if (m) m.classList.toggle('open');
  if (btn) btn.classList.toggle('open', m && m.classList.contains('open'));
}
document.addEventListener('click', e => {
  if (!e.target.closest('#lang-btn') && !e.target.closest('#lang-menu')) {
    const m   = document.getElementById('lang-menu');
    const btn = document.getElementById('lang-btn');
    if (m)   m.classList.remove('open');
    if (btn) btn.classList.remove('open');
  }
});

// ============================================================
// THÈME
// ============================================================

function toggleTheme() {
  const isDay = document.body.classList.contains('day');
  document.body.classList.toggle('day', !isDay);
  document.body.classList.toggle('night', isDay);
  localStorage.setItem('deentag_theme', isDay ? 'night' : 'day');
}


// ============================================================
// CARDS JUZ — RENDU
// ============================================================

function renderJuzCards() {
  const grid = document.getElementById('juzGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const lang = getLang();

  JUZ_DATA.forEach(juz => {
    const card = document.createElement('div');
    card.className = 'juz-card';
    card.onclick = () => openJuzSheet(juz.juz);

    // SVG arabesque minimaliste en fond
    const svgBg = `<svg class="juz-ornament-bg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" stroke="#C9A84C" stroke-width="0.8"/>
      <circle cx="50" cy="50" r="35" stroke="#C9A84C" stroke-width="0.5"/>
      <line x1="5" y1="50" x2="95" y2="50" stroke="#C9A84C" stroke-width="0.5"/>
      <line x1="50" y1="5" x2="50" y2="95" stroke="#C9A84C" stroke-width="0.5"/>
      <line x1="18" y1="18" x2="82" y2="82" stroke="#C9A84C" stroke-width="0.4"/>
      <line x1="82" y1="18" x2="18" y2="82" stroke="#C9A84C" stroke-width="0.4"/>
      <circle cx="50" cy="50" r="8" stroke="#C9A84C" stroke-width="0.8"/>
      <polygon points="50,10 61,40 93,40 68,59 77,90 50,70 23,90 32,59 7,40 39,40" stroke="#C9A84C" stroke-width="0.5" fill="none" opacity="0.6"/>
    </svg>`;

    card.innerHTML = `
      ${svgBg}
      <div class="juz-watermark">${juz.ar}</div>
      <div class="juz-label">${JUZ_WORD[lang] || 'Juz'} ${juz.juz}</div>
      <div class="juz-range">${juz.range}</div>
    `;
    grid.appendChild(card);
  });
}

// ============================================================
// BOTTOM SHEET — OUVERTURE JUZ
// ============================================================

function openJuzSheet(juzNum) {
  currentJuz = juzNum;
  currentNavType = null;
  stopAudio();

  const juz = JUZ_DATA.find(j => j.juz === juzNum);
  if (!juz) return;

  const lang = getLang();
  const sheet    = document.getElementById('bottomSheet');
  const listView = document.getElementById('listView');
  const surahView= document.getElementById('surahView');
  const navView  = document.getElementById('navView');

  if (navView)   navView.style.display   = 'none';
  if (listView)  listView.style.display  = 'flex';
  if (surahView) surahView.style.display = 'none';
  sheet.style.height = '';
  sheet.style.maxHeight = '88vh';
  sheet.style.borderRadius = '24px 24px 0 0';
  sheet.style.overflowY = 'auto';

  // Header
  document.getElementById('bsJuzAr').textContent    = juz.ar;
  document.getElementById('bsJuzTitle').textContent  = `${JUZ_WORD[lang] || 'Juz'} ${juz.juz}`;
  document.getElementById('bsJuzRange').textContent  = juz.range;

  // Sous-titre
  const subEl = document.getElementById('bsSubtitle');
  if (subEl) subEl.textContent = SOURATE_WORD[lang] || 'Sélectionnez une sourate';

  // Vider la recherche
  const searchEl = document.getElementById('bsSearch');
  if (searchEl) { searchEl.value = ''; }

  // Rendre les sourates du juz
  renderSurahList(juz.sourahs, '');

  applyLangBlocks(lang);

  document.getElementById('bsOverlay').classList.add('active');
  sheet.classList.add('open');
  document.body.style.overflow  = 'hidden';
  document.body.style.position  = 'fixed';
  document.body.style.width     = '100%';
}

function closeSheet(fromSwipe) {
  stopAudio();
  currentNavType = null;
  currentProphet = null;
  const navView = document.getElementById('navView');
  if (navView) navView.style.display = 'none';
  const sheet = document.getElementById('bottomSheet');

  if (fromSwipe) {
    sheet.style.transition = 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    sheet.style.transform  = 'translateY(100%)';
    document.getElementById('bsOverlay').classList.remove('active');
    setTimeout(() => {
      sheet.classList.remove('open');
      sheet.style.transform = sheet.style.transition = '';
      sheet.style.height = sheet.style.maxHeight = sheet.style.borderRadius = sheet.style.overflowY = '';
      sheet.style.top    = sheet.style.position  = '';
      document.body.style.overflow  = '';
      document.body.style.position  = '';
      document.body.style.width     = '';
      currentJuz     = null;
      currentSurahId = null;
      sheetTransitioning = false;
    }, 260);
    return;
  }

  sheet.classList.remove('open');
  document.getElementById('bsOverlay').classList.remove('active');
  document.body.style.overflow  = '';
  document.body.style.position  = '';
  document.body.style.width     = '';
  currentJuz     = null;
  currentSurahId = null;
}

// ============================================================
// RENDU LISTE SOURATES
// ============================================================

// Table des versets de départ par jouz pour les sourates partagées
// Format: { juz: { surahId: verseStart } }
const JUZ_START_VERSE = {
  2:  { 2: 142 },
  3:  { 2: 253 },
  4:  { 3: 93 },
  5:  { 4: 24 },
  6:  { 4: 1, 5: 82 },
  7:  { 5: 1, 6: 111 },
  8:  { 7: 88 },
  9:  { 8: 41 },
  10: { 9: 93 },
  11: { 11: 6 },
  12: { 12: 53 },
  15: { 18: 75 },
  16: { 21: 1 },
  17: { 21: 1, 22: 1 },
  18: { 23: 1, 24: 1 },
  19: { 25: 21 },
  20: { 27: 56 },
  21: { 29: 46 },
  22: { 33: 31 },
  23: { 36: 28 },
  24: { 39: 32 },
  25: { 41: 47 },
  26: { 46: 1 },
  27: { 51: 31 },
};

function getJuzStartVerse(juzNum, surahId) {
  if (JUZ_START_VERSE[juzNum] && JUZ_START_VERSE[juzNum][surahId]) {
    return JUZ_START_VERSE[juzNum][surahId];
  }
  return 1;
}

function renderSurahList(surahIds, filter) {
  const list  = document.getElementById('surahList');
  const lang  = getLang();
  if (!list) return;
  list.innerHTML = '';

  const filtered = surahIds
    .map(id => SURAHS.find(s => s.id === id))
    .filter(Boolean)
    .filter(s => {
      if (!filter) return true;
      const f = filter.toLowerCase();
      return s.fr.toLowerCase().includes(f) ||
             s.en.toLowerCase().includes(f) ||
             s.ar.includes(filter) ||
             String(s.id).includes(f);
    });

  filtered.forEach((surah, i) => {
    const typeLabel = surah.type === 'mecquoise' ? (MECCAN[lang] || 'Meccan') : (MEDINAN[lang] || 'Medinan');
    const vLabel    = VERSE_LABEL[lang] || 'verses';

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
    item.addEventListener('click', () => {
      const startVerse = filter ? 1 : getJuzStartVerse(currentJuz, surah.id);
      openSurah(surah.id, startVerse);
    });
    list.appendChild(item);

    if (i < filtered.length - 1) {
      const sep = document.createElement('div');
      sep.className = 'surah-separator';
      list.appendChild(sep);
    }

    setTimeout(() => item.classList.add('show'), 20 + i * 40);
  });
}

// Recherche
document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('bsSearch');
  if (search) {
    search.addEventListener('input', () => {
      const filter = search.value.trim();
      if (filter.length >= 1) {
        // Recherche globale sur toutes les sourates
        const allIds = SURAHS.map(s => s.id);
        renderSurahList(allIds, filter);
      } else {
        // Revenir aux sourates du jouz courant
        if (!currentJuz) return;
        const juz = JUZ_DATA.find(j => j.juz === currentJuz);
        if (juz) renderSurahList(juz.sourahs, '');
      }
    });
  }
});

// ============================================================
// OUVERTURE SOURATE
// ============================================================

function openSurah(surahId, startVerse) {
  if (sheetTransitioning) return;
  sheetTransitioning = true;
  stopAudio();

  const surah = SURAHS.find(s => s.id === surahId);
  if (!surah) { sheetTransitioning = false; return; }

  currentSurahId = surahId;

  const sheet     = document.getElementById('bottomSheet');
  const listView  = document.getElementById('listView');
  const surahView = document.getElementById('surahView');
  const navView   = document.getElementById('navView');

  listView.style.opacity    = '0';
  listView.style.transition = 'opacity 0.15s ease';
  if (navView) navView.style.opacity = '0';

  setTimeout(() => {
    listView.style.display  = 'none';
    listView.style.opacity  = '';
    listView.style.transition = '';
    if (navView) { navView.style.display = 'none'; navView.style.opacity = ''; }

    // Mettre le topbar de la vue sourate
    const lang = getLang();
    const typeLabel = surah.type === 'mecquoise' ? (MECCAN[lang] || 'Meccan') : (MEDINAN[lang] || 'Medinan');
    document.getElementById('surahBackBtn').innerHTML = '<div class="theme-knob-btn-inner"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>';
    document.getElementById('surahTopbarAr').textContent = surah.ar;
    document.getElementById('surahTopbarFr').textContent = surah.fr;
    const metaEl = document.getElementById('surahTopbarMeta');
    if (metaEl) metaEl.textContent = `${typeLabel} · ${surah.verses} ${VERSE_LABEL[lang] || 'versets'}`;

    surahView.style.display  = 'flex';
    surahView.style.opacity  = '0';

    // Agrandir le sheet en plein écran
    sheet.style.transition   = 'none';
    sheet.style.transform    = 'translateY(100%)';
    sheet.style.height       = 'calc(100dvh - 16px)';
    sheet.style.maxHeight    = 'calc(100dvh - 16px)';
    sheet.style.borderRadius = '20px 20px 0 0';
    sheet.style.overflowY    = 'hidden';
    sheet.style.top          = '16px';
    sheet.style.position     = 'fixed';

    requestAnimationFrame(() => {
      sheet.style.transition = 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      sheet.style.transform  = 'translateY(0)';
    });

    // Charger les versets
    loadSurah(surahId, startVerse || 1);

    setTimeout(() => {
      surahView.style.transition = 'opacity 0.2s ease';
      surahView.style.opacity    = '1';
      setTimeout(() => {
        surahView.style.transition = '';
        sheetTransitioning = false;
      }, 200);
    }, 200);
  }, 150);
}

// ============================================================
// CHARGEMENT API CORAN
// ============================================================

const API_EDITIONS = {
  fr: 'fr.hamidullah',
  en: 'en.sahih',
  es: 'es.cortes',
  de: 'de.bubenheim',
  it: 'it.piccardo',
  nl: 'nl.keyzer',
  pt: 'pt.elhayek',
  tr: 'tr.diyanet',
};
const PHONETIC_EDITION = 'en.transliteration';

async function loadSurah(surahId, startVerse) {
  const scroll = document.getElementById('surahScroll');
  const lang   = getLang();
  const surah  = SURAHS.find(s => s.id === surahId);
  if (!scroll || !surah) return;

  // Afficher loader
  scroll.innerHTML = `
    <div class="loading-block">
      <div class="loading-spinner"></div>
      <div class="loading-text">${LOADING_WORD[lang] || 'Chargement'}</div>
    </div>
  `;

  try {
    const cacheKey = `${surahId}_${lang}`;

    let data;
    if (cachedVerses[cacheKey]) {
      data = cachedVerses[cacheKey];
    } else {
      const trEdition = API_EDITIONS[lang] || 'en.sahih';
      const url = `https://api.alquran.cloud/v1/surah/${surahId}/editions/quran-uthmani,${PHONETIC_EDITION},${trEdition}`;
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('API error');
      const json = await resp.json();
      data = json.data;
      cachedVerses[cacheKey] = data;
    }

    renderSurahContent(surah, data, lang, startVerse || 1);

  } catch (e) {
    scroll.innerHTML = `<div class="error-block">Une erreur est survenue. Vérifiez votre connexion internet.</div>`;
  }
}

// ============================================================
// RENDU SOURATE (versets)
// ============================================================

function renderSurahContent(surah, data, lang, startVerse) {
  const scroll = document.getElementById('surahScroll');
  if (!scroll) return;

  const arabicData  = data[0]; // quran-uthmani
  const phoneticData= data[1]; // transliteration
  const translData  = data[2]; // translation

  const typeLabel = surah.type === 'mecquoise' ? (MECCAN[lang] || 'Meccan') : (MEDINAN[lang] || 'Medinan');

  // Préparer la liste des audios pour karaoké
  audioVerseList = arabicData.ayahs.map((_, i) => i + 1);

  let html = `
    <div class="surah-view-divider">
      <div class="surah-view-divider-line"></div>
      <span class="ornament-star">✦</span>
      <div class="surah-view-divider-line"></div>
    </div>
  `;

  // Basmala sauf At-Tawba (9) et Al-Fatiha (1 — déjà incluse)
  if (surah.id !== 9 && surah.id !== 1) {
    html += `<div class="basmala-block">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>`;
  }

  arabicData.ayahs.forEach((ayah, i) => {
    const phoneticText = phoneticData.ayahs[i] ? phoneticData.ayahs[i].text : '';
    const translText   = translData.ayahs[i]   ? translData.ayahs[i].text   : '';
    const vNum         = ayah.numberInSurah;

    const phonHidden = showPhonetic  ? '' : ' hidden';
    const trHidden   = showTranslation ? '' : ' hidden';

    html += `
      <div class="verse-block" id="verse-${vNum}" onclick="playFromVerse(${vNum})">
        <div class="verse-number">
          <div class="verse-num-badge">${vNum}</div>
          <button class="verse-copy-btn" onclick="event.stopPropagation();copyVerse(${vNum})" title="Copier">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
        </div>
        <div class="verse-arabic">${ayah.text}</div>
        <span class="verse-phonetic${phonHidden}" id="ph-${surah.id}-${vNum}">${phoneticText}</span>
        <span class="verse-translation${trHidden}" id="tr-${surah.id}-${vNum}">${translText}</span>
        <button class="verse-memorize-btn" id="mem-${surah.id}-${vNum}" onclick="event.stopPropagation();toggleVerseMemorized(${surah.id},${vNum})" title="Mémorisé">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>
          <span class="verse-mem-label"></span>
        </button>
      </div>
    `;
  });

  // Bouton mémorisé sourate entière
  const isMemSurah = window.DT && window.DT.isMemorized('surah', surah.id);
  html += `
    <div class="surah-memorize-block">
      <button class="surah-memorize-btn${isMemSurah ? ' memorized' : ''}" id="surah-mem-btn" onclick="toggleSurahMemorized(${surah.id})">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>
        <span id="surah-mem-label">${isMemSurah ? (window.DT ? window.DT.t('memorized') : 'Mémorisé') : (window.DT ? window.DT.t('memorized') : 'Mémorisé')}</span>
      </button>
    </div>
  `;

  scroll.innerHTML = html;
  scroll.scrollTop = 0;

  // Mettre à jour les boutons verset après injection
  setTimeout(() => updateAllVerseMemBtns(surah.id), 50);

  // Scroll au verset de départ si différent du premier
  if (startVerse && startVerse > 1) {
    setTimeout(() => {
      const el = document.getElementById('verse-' + startVerse);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  // Restaurer les tailles de texte sauvegardées
  applyAllSizes();

  // Mettre à jour l'info audio
  updateAudioBar(0);
}

// ============================================================
// COPIER VERSET
// ============================================================

function copyVerse(verseNum) {
  const surah = SURAHS.find(s => s.id === currentSurahId);
  if (!surah) return;
  const arEl = document.querySelector(`#verse-${verseNum} .verse-arabic`);
  const phEl = document.getElementById(`ph-${currentSurahId}-${verseNum}`);
  const trEl = document.getElementById(`tr-${currentSurahId}-${verseNum}`);
  let text = '';
  if (surah) text += `${surah.fr} (${verseNum})\n\n`;
  if (arEl)  text += arEl.textContent.trim() + '\n';
  if (phEl)  text += phEl.textContent.trim() + '\n';
  if (trEl)  text += trEl.textContent.trim() + '\n';
  text += '\n— Deentag';
  if (navigator.share) {
    navigator.share({ title: 'Deentag — Coran', text: text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

// ============================================================
// RETOUR À LA LISTE
// ============================================================

function backToList() {
  if (sheetTransitioning) return;
  sheetTransitioning = true;
  stopAudio();

  const sheet     = document.getElementById('bottomSheet');
  const listView  = document.getElementById('listView');
  const surahView = document.getElementById('surahView');
  const navView   = document.getElementById('navView');

  // Si on vient d'une navView (full/famous/prophet/theme)
  const fromNav = currentNavType && currentNavType !== 'juz';

  surahView.style.transition = 'opacity 0.15s ease';
  surahView.style.opacity    = '0';

  setTimeout(() => {
    currentSurahId = null;
    surahView.style.display   = 'none';
    surahView.style.opacity   = '';
    surahView.style.transition = '';

    if (fromNav) {
      // Retour vers navView
      navView.style.display   = 'flex';
      navView.style.opacity   = '0';
      listView.style.display  = 'none';
    } else {
      // Retour vers listView (Jouz)
      navView.style.display   = 'none';
      listView.style.display  = 'flex';
      listView.style.opacity  = '0';
    }

    sheet.style.transition   = 'none';
    sheet.style.transform    = 'translateY(100%)';
    sheet.style.height       = '';
    sheet.style.maxHeight    = '88vh';
    sheet.style.borderRadius = '24px 24px 0 0';
    sheet.style.overflowY    = 'auto';
    sheet.style.top          = '';
    sheet.style.position     = '';

    applyLangBlocks(getLang());

    requestAnimationFrame(() => {
      sheet.style.transition = 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      sheet.style.transform  = 'translateY(0)';
      if (fromNav) {
        navView.style.transition  = 'opacity 0.2s ease';
        navView.style.opacity     = '1';
        setTimeout(() => { navView.style.transition = ''; sheetTransitioning = false; }, 400);
      } else {
        listView.style.transition = 'opacity 0.2s ease';
        listView.style.opacity    = '1';
        setTimeout(() => { sheet.style.transition = ''; listView.style.transition = ''; sheetTransitioning = false; }, 400);
      }
    });
  }, 150);
}

// ============================================================
// AUDIO KARAOKÉ
// ============================================================

function updateAudioBar(verseIndex) {
  const info = document.getElementById('audioVerseNum');
  if (info) {
    const total = audioVerseList.length;
    const cur   = verseIndex + 1;
    info.textContent = total > 0 ? `${cur} / ${total}` : '—';
  }
}

function highlightVerse(verseNum) {
  document.querySelectorAll('.verse-block.playing').forEach(el => el.classList.remove('playing'));
  const el = document.getElementById('verse-' + verseNum);
  if (el) {
    el.classList.add('playing');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  updateAudioBar(verseNum - 1);
}

const AUDIO_RING_CIRC = 175.93;

function playVerseAudio(verseNum) {
  if (!currentSurahId) return;
  const verseGlobal = SURAHS.slice(0, currentSurahId - 1).reduce((acc, s) => acc + s.verses, 0) + verseNum;
  const audioUrl = `https://cdn.islamic.network/quran/audio/128/${currentReciter}/${verseGlobal}.mp3`;

  return new Promise((resolve, reject) => {
    const player = new Audio(audioUrl);
    audioPlayer  = player;
    player.playbackRate = audioSpeed;
    const ring = document.getElementById('audioRing');
    if (ring) ring.style.strokeDashoffset = AUDIO_RING_CIRC;
    player.ontimeupdate = () => {
      if (ring && player.duration) {
        const ratio = Math.min(player.currentTime / player.duration, 1);
        ring.style.strokeDashoffset = AUDIO_RING_CIRC - (AUDIO_RING_CIRC * ratio);
      }
    };
    player.play().catch(reject);
    player.onended  = resolve;
    player.onerror  = reject;
  });
}

let audioSessionId = 0;

async function startKaraoke(fromVerse) {
  const surah = SURAHS.find(s => s.id === currentSurahId);
  if (!surah) return;

  const sessionId = ++audioSessionId;
  audioPlaying = true;
  const playBtn = document.getElementById('audioPlayBtn');
  if (playBtn) { playBtn.classList.add('playing'); playBtn.innerHTML = SVG_STOP; }

  for (let v = fromVerse; v <= surah.verses; v++) {
    if (!audioPlaying || sessionId !== audioSessionId) break;
    audioCurrentVerse = v;
    highlightVerse(v);
    try {
      await playVerseAudio(v);
    } catch (e) {
      // Verset audio manquant → continuer
    }
    if (!audioPlaying || sessionId !== audioSessionId) break;
  }

  if (sessionId === audioSessionId) stopAudio();
}

function playFromVerse(verseNum) {
  stopAudio();
  audioCurrentVerse = verseNum;
  startKaraoke(verseNum);
}

function toggleAudio() {
  if (audioPlaying) {
    stopAudio();
  } else {
    const from = audioCurrentVerse || 1;
    startKaraoke(from);
  }
}

function stopAudio() {
  audioPlaying = false;
  audioSessionId++;
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.src = '';
    audioPlayer = null;
  }
  document.querySelectorAll('.verse-block.playing').forEach(el => el.classList.remove('playing'));
  const playBtn = document.getElementById('audioPlayBtn');
  if (playBtn) { playBtn.classList.remove('playing'); playBtn.innerHTML = SVG_PLAY; }
  const ring = document.getElementById('audioRing');
  if (ring) ring.style.strokeDashoffset = AUDIO_RING_CIRC;
}

function prevVerse() {
  if (audioCurrentVerse > 1) {
    stopAudio();
    audioCurrentVerse--;
    startKaraoke(audioCurrentVerse);
  }
}

function nextVerse() {
  const surah = SURAHS.find(s => s.id === currentSurahId);
  if (!surah) return;
  if (audioCurrentVerse < surah.verses) {
    stopAudio();
    audioCurrentVerse++;
    startKaraoke(audioCurrentVerse);
  }
}

function cycleSpeed() {
  const speeds = [1, 0.75, 0.5];
  const idx    = speeds.indexOf(audioSpeed);
  audioSpeed   = speeds[(idx + 1) % speeds.length];
  const btn    = document.getElementById('audioSpeedBtn');
  if (btn) btn.textContent = audioSpeed + 'x';
  if (audioPlayer) audioPlayer.playbackRate = audioSpeed;
}

const SVG_PLAY  = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
const SVG_STOP  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`;

// ============================================================
// RÉGLAGES TAILLE TEXTE
// ============================================================

const SIZE_LEVELS = {
  ar: { small:22, medium:28, large:38 },
  ph: { small:13, medium:16, large:22 },
  tr: { small:13, medium:15, large:20 },
};

function applySizeLevel(type, level) {
  localStorage.setItem('quran_size_' + type, level);
  const px = SIZE_LEVELS[type][level];
  if (type === 'ar') document.querySelectorAll('.verse-arabic').forEach(el => el.style.fontSize = px + 'px');
  if (type === 'ph') document.querySelectorAll('.verse-phonetic').forEach(el => el.style.fontSize = px + 'px');
  if (type === 'tr') document.querySelectorAll('.verse-translation').forEach(el => el.style.fontSize = px + 'px');
  document.querySelectorAll(`.size-pill[data-type="${type}"]`).forEach(p => {
    p.classList.toggle('active', p.dataset.val === level);
  });
}

function getSizeLevel(type) {
  return localStorage.getItem('quran_size_' + type) || 'medium';
}

function applyAllSizes() {
  ['ar', 'ph', 'tr'].forEach(t => applySizeLevel(t, getSizeLevel(t)));
}

function togglePhonetic(el) {
  showPhonetic = !showPhonetic;
  el.classList.toggle('on', showPhonetic);
  localStorage.setItem('quran_phonetic', showPhonetic ? '1' : '0');
  document.querySelectorAll('.verse-phonetic').forEach(e => e.classList.toggle('hidden', !showPhonetic));
}

function toggleTranslation(el) {
  showTranslation = !showTranslation;
  el.classList.toggle('on', showTranslation);
  localStorage.setItem('quran_translation', showTranslation ? '1' : '0');
  document.querySelectorAll('.verse-translation').forEach(e => e.classList.toggle('hidden', !showTranslation));
}

function openSettings() {
  const panel = document.getElementById('surahSettingsPanel');
  if (!panel) return;
  panel.classList.toggle('open');
}

function setReciter(value) {
  currentReciter = value;
  localStorage.setItem('quran_reciter', value);
  stopAudio();
}

function closeSettings() {
  const panel = document.getElementById('surahSettingsPanel');
  if (panel) panel.classList.remove('open');
}

// ============================================================
// SWIPE BOTTOM SHEET
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  const sheet = document.getElementById('bottomSheet');
  if (!sheet) return;

  let startY = 0, swipeDY = 0, swipeActive = false, swipeBlocked = false;

  sheet.addEventListener('touchstart', e => {
    if (sheetTransitioning) return;
    startY = e.touches[0].clientY; swipeDY = 0;
    swipeActive = true; swipeBlocked = false;
    sheet.style.transition = 'none';
  }, { passive: true });

  sheet.addEventListener('touchmove', e => {
    if (!swipeActive || sheetTransitioning || swipeBlocked) return;
    const dy = e.touches[0].clientY - startY;
    if (Math.abs(dy) < 10) return;
    if (dy < 0) { swipeBlocked = true; return; }

    const scrollEl = currentSurahId
      ? document.getElementById('surahScroll')
      : document.getElementById('bottomSheet');
    if (scrollEl && scrollEl.scrollTop > 5) { swipeBlocked = true; return; }

    swipeDY = dy;
    const drag = dy > 100 ? 100 + (dy - 100) * 0.3 : dy;
    sheet.style.transform = 'translateY(' + drag + 'px)';

    // Feedback visuel progressif
    const progress = Math.min(drag / 120, 1);
    if (currentSurahId) {
      const sv = document.getElementById('surahView');
      if (sv) sv.style.opacity = String(1 - progress);
    } else {
      const lv = document.getElementById('listView');
      if (lv) lv.style.opacity = String(1 - progress);
    }

    const overlay = document.getElementById('bsOverlay');
    if (overlay) overlay.style.background = 'rgba(0,0,0,' + Math.max(0, 0.55 - drag / 300) + ')';
  }, { passive: true });

  sheet.addEventListener('touchend', () => {
    if (!swipeActive || sheetTransitioning) return;
    swipeActive = false;

    const sv      = document.getElementById('surahView');
    const lv      = document.getElementById('listView');
    const overlay = document.getElementById('bsOverlay');
    if (sv)      sv.style.opacity      = '';
    if (lv)      lv.style.opacity      = '';
    if (overlay) overlay.style.background = '';

    if (swipeDY > 180) {
      if (currentSurahId) {
        backToList();
      } else {
        closeSheet(true);
      }
    } else {
      sheet.style.transition = 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      sheet.style.transform  = 'translateY(0)';
      setTimeout(() => { sheet.style.transition = 'none'; sheet.style.transform = ''; }, 360);
    }
  }, { passive: true });
});

// ============================================================
// PARAMÈTRES NFC — URL
// ============================================================

function handleNfcParams() {
  const params = new URLSearchParams(window.location.search);
  const juz    = parseInt(params.get('juz'));
  const surah  = parseInt(params.get('sourate'));

  if (surah && SURAHS.find(s => s.id === surah)) {
    // Trouver le juz de la sourate et ouvrir directement
    const juzForSurah = JUZ_DATA.find(j => j.sourahs.includes(surah));
    if (juzForSurah) {
      setTimeout(() => {
        openJuzSheet(juzForSurah.juz);
        setTimeout(() => openSurah(surah), 200);
      }, 300);
    }
  } else if (juz && juz >= 1 && juz <= 30) {
    setTimeout(() => openJuzSheet(juz), 300);
  }
}

// ============================================================
// INITIALISATION
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('deentag_theme') || 'day';
  document.body.classList.remove('day', 'night');
  document.body.classList.add(savedTheme);

  const savedLang = localStorage.getItem('deentag_lang') || detectLang();
  applyLang(savedLang);

  showPhonetic    = localStorage.getItem('quran_phonetic')    !== '0';
  showTranslation = localStorage.getItem('quran_translation') !== '0';

  // Restaurer récitateur sauvegardé
  const reciterSelect = document.getElementById('reciterSelect');
  if (reciterSelect) reciterSelect.value = currentReciter;

  // Mettre le bon état des toggles
  const phToggle = document.getElementById('togglePhonetic');
  const trToggle = document.getElementById('toggleTranslation');
  if (phToggle) phToggle.classList.toggle('on', showPhonetic);
  if (trToggle) trToggle.classList.toggle('on', showTranslation);

  renderJuzCards();
  handleNfcParams();

  // Fermer settings au clic extérieur
  document.addEventListener('touchstart', e => {
    const panel = document.getElementById('surahSettingsPanel');
    if (panel && panel.classList.contains('open')) {
      if (!panel.contains(e.target) && !e.target.closest('[onclick*="openSettings"]')) {
        closeSettings();
      }
    }
  }, { passive: true });

  // Désactiver clic droit
  document.addEventListener('contextmenu', e => e.preventDefault());
});

window.addEventListener('beforeunload', stopAudio);
window.addEventListener('pagehide', stopAudio);

// ============================================================
// DONNÉES NAVIGATION — SOURATES CÉLÈBRES
// ============================================================

const FAMOUS_SURAHS = [1, 2, 18, 36, 55, 56, 67, 112, 113, 114];

// ============================================================
// DONNÉES NAVIGATION — THÈMES
// ============================================================

const THEMES = [
  {
    id: 'morning',
    ar: '🌅',
    label: { fr:'Matin', en:'Morning', es:'Mañana', de:'Morgen', it:'Mattino', nl:'Ochtend', pt:'Manhã', tr:'Sabah' },
    sub: { fr:'Sourates du matin', en:'Morning surahs', es:'Suras de mañana', de:'Morgensuren', it:'Sure del mattino', nl:'Ochtendsoera\'s', pt:'Suras da manhã', tr:'Sabah sureleri' },
    items: [
      { surahId: 36, verseStart: 1 },  // Ya-Sin
      { surahId: 56, verseStart: 1 },  // Al-Waqia
      { surahId: 2,  verseStart: 255 }, // Ayat Al-Kursi
    ]
  },
  {
    id: 'evening',
    ar: '🌙',
    label: { fr:'Soir', en:'Evening', es:'Tarde', de:'Abend', it:'Sera', nl:'Avond', pt:'Noite', tr:'Akşam' },
    sub: { fr:'Sourates du soir', en:'Evening surahs', es:'Suras de tarde', de:'Abendsuren', it:'Sure della sera', nl:'Avondsoera\'s', pt:'Suras da noite', tr:'Akşam sureleri' },
    items: [
      { surahId: 67, verseStart: 1 },  // Al-Mulk
      { surahId: 32, verseStart: 1 },  // As-Sajda
      { surahId: 112, verseStart: 1 }, // Al-Ikhlas
      { surahId: 113, verseStart: 1 }, // Al-Falaq
      { surahId: 114, verseStart: 1 }, // An-Nas
    ]
  },
  {
    id: 'friday',
    ar: '💚',
    label: { fr:'Vendredi', en:'Friday', es:'Viernes', de:'Freitag', it:'Venerdì', nl:'Vrijdag', pt:'Sexta', tr:'Cuma' },
    sub: { fr:'Al-Kahf — sourate du vendredi', en:'Al-Kahf — Friday surah', es:'Al-Kahf — sura del viernes', de:'Al-Kahf — Freitagssure', it:'Al-Kahf — sura del venerdì', nl:'Al-Kahf — vrijdagsoera', pt:'Al-Kahf — sura da sexta', tr:'Al-Kehf — Cuma suresi' },
    items: [
      { surahId: 18, verseStart: 1 },  // Al-Kahf
    ]
  },
  {
    id: 'protection',
    ar: '🛡️',
    label: { fr:'Protection', en:'Protection', es:'Protección', de:'Schutz', it:'Protezione', nl:'Bescherming', pt:'Proteção', tr:'Koruma' },
    sub: { fr:'Versets et sourates protectrices', en:'Protective verses and surahs', es:'Versos y suras de protección', de:'Schutzverse und -suren', it:'Versetti e sure protettive', nl:'Beschermende verzen en soera\'s', pt:'Versos e suras de proteção', tr:'Koruyucu ayet ve sureler' },
    items: [
      { surahId: 2,   verseStart: 255 }, // Ayat Al-Kursi
      { surahId: 2,   verseStart: 285 }, // Al-Baqara 285-286
      { surahId: 112, verseStart: 1 },   // Al-Ikhlas
      { surahId: 113, verseStart: 1 },   // Al-Falaq
      { surahId: 114, verseStart: 1 },   // An-Nas
    ]
  },
  {
    id: 'trial',
    ar: '💔',
    label: { fr:'Épreuve', en:'Trial', es:'Prueba', de:'Prüfung', it:'Prova', nl:'Beproeving', pt:'Provação', tr:'Sınav' },
    sub: { fr:'Sourates pour les moments difficiles', en:'Surahs for difficult times', es:'Suras para momentos difíciles', de:'Suren für schwierige Zeiten', it:'Sure per i momenti difficili', nl:'Soera\'s voor moeilijke tijden', pt:'Suras para momentos difíceis', tr:'Zor anlar için sureler' },
    items: [
      { surahId: 94, verseStart: 1 },  // Al-Inshirah
      { surahId: 2,  verseStart: 286 }, // Al-Baqara 286
      { surahId: 13, verseStart: 28 },  // Ar-Ra'd 28
    ]
  },
  {
    id: 'healing',
    ar: '🌿',
    label: { fr:'Guérison', en:'Healing', es:'Curación', de:'Heilung', it:'Guarigione', nl:'Genezing', pt:'Cura', tr:'Şifa' },
    sub: { fr:'Ruqya — sourates de guérison', en:'Ruqya — healing surahs', es:'Ruqya — suras de curación', de:'Ruqya — Heilungssuren', it:'Ruqya — sure di guarigione', nl:'Ruqya — genezingssoera\'s', pt:'Ruqya — suras de cura', tr:'Rukye — şifa sureleri' },
    items: [
      { surahId: 1,   verseStart: 1 },  // Al-Fatiha
      { surahId: 2,   verseStart: 255 }, // Ayat Al-Kursi
      { surahId: 112, verseStart: 1 },   // Al-Ikhlas
      { surahId: 113, verseStart: 1 },   // Al-Falaq
      { surahId: 114, verseStart: 1 },   // An-Nas
    ]
  },
];

// ============================================================
// DONNÉES NAVIGATION — PROPHÈTES
// ============================================================

const PROPHETS = [
  {
    id: 'adam',
    ar: 'آدم',
    label: { fr:'Adam', en:'Adam', es:'Adán', de:'Adam', it:'Adamo', nl:'Adam', pt:'Adão', tr:'Âdem' },
    items: [
      { surahId: 2, verseStart: 30, label: 'Al-Baqara 30–37' },
      { surahId: 7, verseStart: 19, label: 'Al-Araf 19–25' },
      { surahId: 20, verseStart: 115, label: 'Ta-Ha 115–122' },
    ]
  },
  {
    id: 'nuh',
    ar: 'نوح',
    label: { fr:'Nuh (Noé)', en:'Nuh (Noah)', es:'Noé', de:'Nuh (Noah)', it:'Noè', nl:'Nuh (Noach)', pt:'Noé', tr:'Nuh' },
    items: [
      { surahId: 71, verseStart: 1, label: 'Nuh — Sourate entière' },
      { surahId: 11, verseStart: 25, label: 'Hud 25–49' },
    ]
  },
  {
    id: 'ibrahim',
    ar: 'إبراهيم',
    label: { fr:'Ibrahim (Abraham)', en:'Ibrahim (Abraham)', es:'Ibrahim (Abraham)', de:'Ibrahim (Abraham)', it:'Ibrahīm (Abramo)', nl:'Ibrahim (Abraham)', pt:'Ibrahīm (Abraão)', tr:'İbrahim' },
    items: [
      { surahId: 14, verseStart: 1, label: 'Ibrahim — Sourate entière' },
      { surahId: 2, verseStart: 124, label: 'Al-Baqara 124–132' },
    ]
  },
  {
    id: 'ismail',
    ar: 'إسماعيل',
    label: { fr:'Ismail', en:'Ismail', es:'Ismael', de:'Ismael', it:'Ismaele', nl:'Ismaïl', pt:'Ismael', tr:'İsmail' },
    items: [
      { surahId: 2, verseStart: 125, label: 'Al-Baqara 125–129' },
      { surahId: 37, verseStart: 102, label: 'As-Saffat 102–107' },
    ]
  },
  {
    id: 'yusuf',
    ar: 'يوسف',
    label: { fr:'Yusuf (Joseph)', en:'Yusuf (Joseph)', es:'Yusuf (José)', de:'Yusuf (Joseph)', it:'Yusuf (Giuseppe)', nl:'Yusuf (Jozef)', pt:'Yusuf (José)', tr:'Yusuf' },
    items: [
      { surahId: 12, verseStart: 1, label: 'Yusuf — Sourate entière' },
    ]
  },
  {
    id: 'moussa',
    ar: 'موسى',
    label: { fr:'Moussa (Moïse)', en:'Musa (Moses)', es:'Musa (Moisés)', de:'Musa (Moses)', it:'Musā (Mosè)', nl:'Musa (Mozes)', pt:'Moisés', tr:'Musa' },
    items: [
      { surahId: 20, verseStart: 9,  label: 'Ta-Ha 9–98' },
      { surahId: 28, verseStart: 3,  label: 'Al-Qasas 3–43' },
      { surahId: 7,  verseStart: 103, label: 'Al-Araf 103–156' },
    ]
  },
  {
    id: 'dawud',
    ar: 'داود',
    label: { fr:'Dawud (David)', en:'Dawud (David)', es:'Dawud (David)', de:'Dawud (David)', it:'Dāwūd (Davide)', nl:'Dawud (David)', pt:'Dāwūd (Davi)', tr:'Davud' },
    items: [
      { surahId: 38, verseStart: 17, label: 'Sad 17–26' },
      { surahId: 21, verseStart: 78, label: 'Al-Anbiya 78–80' },
    ]
  },
  {
    id: 'souleymane',
    ar: 'سليمان',
    label: { fr:'Souleymane (Salomon)', en:'Sulayman (Solomon)', es:'Sulayman (Salomón)', de:'Sulayman (Salomo)', it:'Sulaymān (Salomone)', nl:'Sulayman (Salomo)', pt:'Sulaymān (Salomão)', tr:'Süleyman' },
    items: [
      { surahId: 27, verseStart: 15, label: 'An-Naml 15–44' },
      { surahId: 21, verseStart: 81, label: 'Al-Anbiya 81–82' },
    ]
  },
  {
    id: 'ayyub',
    ar: 'أيوب',
    label: { fr:'Ayyub (Job)', en:'Ayyub (Job)', es:'Ayyub (Job)', de:'Ayyub (Hiob)', it:'Ayyūb (Giobbe)', nl:'Ayyub (Job)', pt:'Ayyūb (Jó)', tr:'Eyyüb' },
    items: [
      { surahId: 21, verseStart: 83, label: 'Al-Anbiya 83–84' },
      { surahId: 38, verseStart: 41, label: 'Sad 41–44' },
    ]
  },
  {
    id: 'yunus',
    ar: 'يونس',
    label: { fr:'Yunus (Jonas)', en:'Yunus (Jonah)', es:'Yunus (Jonás)', de:'Yunus (Jona)', it:'Yūnus (Giona)', nl:'Yunus (Jona)', pt:'Yūnus (Jonas)', tr:'Yunus' },
    items: [
      { surahId: 37, verseStart: 139, label: 'As-Saffat 139–148' },
      { surahId: 21, verseStart: 87,  label: 'Al-Anbiya 87–88' },
    ]
  },
  {
    id: 'issa',
    ar: 'عيسى',
    label: { fr:'Issa (Jésus)', en:'Isa (Jesus)', es:"Isa (Jesús)", de:'Isa (Jesus)', it:'Isa (Gesù)', nl:'Isa (Jezus)', pt:'Isa (Jesus)', tr:'İsa' },
    items: [
      { surahId: 19, verseStart: 16, label: 'Maryam 16–40' },
      { surahId: 3,  verseStart: 45, label: 'Al-Imran 45–59' },
    ]
  },
  {
    id: 'muhammad',
    ar: 'محمد ﷺ',
    label: { fr:'Muhammad ﷺ', en:'Muhammad ﷺ', es:'Muhammad ﷺ', de:'Muhammad ﷺ', it:'Muhammad ﷺ', nl:'Muhammad ﷺ', pt:'Muhammad ﷺ', tr:'Muhammed ﷺ' },
    items: [
      { surahId: 33, verseStart: 1, label: 'Al-Ahzab — Sourate entière' },
      { surahId: 48, verseStart: 1, label: 'Al-Fath — Sourate entière' },
    ]
  },
];

// ============================================================
// TRADUCTIONS NAVIGATION
// ============================================================

const NAV_LABELS = {
  full:    { fr:'Coran Complet', en:'Full Quran', es:'Corán Completo', de:'Vollständiger Koran', it:'Corano Completo', nl:'Volledige Koran', pt:'Alcorão Completo', tr:'Tam Kuran' },
  juz:     { fr:'Par Jouz', en:'By Juz', es:'Por Yuz', de:'Nach Juz', it:'Per Juz', nl:'Per Juz', pt:'Por Juz', tr:'Cüze Göre' },
  famous:  { fr:'Sourates Célèbres', en:'Famous Surahs', es:'Suras Famosas', de:'Bekannte Suren', it:'Sure Famose', nl:'Bekende Soera\'s', pt:'Suras Famosas', tr:'Meşhur Sureler' },
  prophet: { fr:'Par Prophète', en:'By Prophet', es:'Por Profeta', de:'Nach Prophet', it:'Per Profeta', nl:'Per Profeet', pt:'Por Profeta', tr:'Peygambere Göre' },
  theme:   { fr:'Par Thème', en:'By Theme', es:'Por Tema', de:'Nach Thema', it:'Per Tema', nl:'Per Thema', pt:'Por Tema', tr:'Temaya Göre' },
};

const SELECT_LABEL = {
  fr:'Sélectionnez', en:'Select', es:'Seleccione', de:'Auswählen', it:'Seleziona', nl:'Selecteer', pt:'Selecione', tr:'Seçin'
};

const PASSAGE_LABEL = {
  fr:'Passage', en:'Passage', es:'Pasaje', de:'Passage', it:'Passaggio', nl:'Passage', pt:'Passagem', tr:'Pasaj'
};

// ============================================================
// OUVERTURE SHEET NAVIGATION
// ============================================================

var currentNavType = null;
var currentProphet = null;

function openNavSheet(type) {
  currentNavType = type;
  currentProphet = null;
  stopAudio();

  const lang = getLang();
  const sheet    = document.getElementById('bottomSheet');
  const navView  = document.getElementById('navView');
  const listView = document.getElementById('listView');
  const surahView= document.getElementById('surahView');

  if (navView)   navView.style.display   = 'flex';
  if (listView)  listView.style.display  = 'none';
  if (surahView) surahView.style.display = 'none';

  sheet.style.height    = '';
  sheet.style.maxHeight = '88vh';
  sheet.style.borderRadius = '24px 24px 0 0';
  sheet.style.overflowY = 'auto';

  // Header
  const navTitle = document.getElementById('bsNavTitle');
  const navSub   = document.getElementById('bsNavSub');
  const navAr    = document.getElementById('bsNavAr');

  if (navTitle) navTitle.textContent = NAV_LABELS[type]?.[lang] || '';
  if (navAr)    navAr.textContent    = '';
  if (navSub)   navSub.textContent   = '';

  renderNavList(type, lang);

  applyLangBlocks(lang);
  document.getElementById('bsOverlay').classList.add('active');
  sheet.classList.add('open');
  document.body.style.overflow  = 'hidden';
  document.body.style.position  = 'fixed';
  document.body.style.width     = '100%';
}

function renderNavList(type, lang) {
  const list = document.getElementById('navList');
  if (!list) return;
  list.innerHTML = '';

  if (type === 'full') {
    // Liste des 114 sourates
    const searchWrap = document.createElement('div');
    searchWrap.className = 'bs-search-wrap';
    searchWrap.innerHTML = `<input type="text" class="bs-search-input" id="navSearch" placeholder="🔍 ${SELECT_LABEL[lang] || 'Select'}...">`;
    list.appendChild(searchWrap);

    const surahList = document.createElement('div');
    surahList.id = 'navSurahList';
    list.appendChild(surahList);

    renderNavSurahs(SURAHS.map(s => s.id), '', surahList, lang);

    setTimeout(() => {
      const inp = document.getElementById('navSearch');
      if (inp) {
        inp.addEventListener('input', () => {
          renderNavSurahs(SURAHS.map(s => s.id), inp.value.trim(), surahList, lang);
        });
      }
    }, 50);

  } else if (type === 'juz') {
    // Liste premium des 30 Jouz — cohérente avec Prophètes et Thèmes
    JUZ_DATA.forEach((juz, i) => {
      const item = document.createElement('div');
      item.className = 'nav-item';
      item.innerHTML = `
        <div class="nav-item-icon nav-item-icon--num">${juz.ar}</div>
        <div class="nav-item-info">
          <div class="nav-item-name">${JUZ_WORD[lang] || 'Juz'} ${juz.juz}</div>
          <div class="nav-item-sub">${juz.range}</div>
        </div>
        <div class="nav-item-arrow">›</div>
      `;
      item.onclick = () => closeNavAndOpenJuz(juz.juz);
      list.appendChild(item);
      if (i < JUZ_DATA.length - 1) {
        const sep = document.createElement('div');
        sep.className = 'nav-separator';
        list.appendChild(sep);
      }
    });
    list.appendChild(document.createElement('div')).style.height = '8px';

  } else if (type === 'famous') {
    renderNavSurahs(FAMOUS_SURAHS, '', list, lang);

  } else if (type === 'prophet') {
    PROPHETS.forEach((p, i) => {
      const item = document.createElement('div');
      item.className = 'nav-item';
      item.innerHTML = `
        <div class="nav-item-icon">${p.ar}</div>
        <div class="nav-item-info">
          <div class="nav-item-name">${p.label[lang] || p.label.fr}</div>
          <div class="nav-item-sub">${p.items.length} ${PASSAGE_LABEL[lang] || 'passages'}</div>
        </div>
        <div class="nav-item-arrow">›</div>
      `;
      item.onclick = () => openProphetPassages(p, lang);
      list.appendChild(item);
      if (i < PROPHETS.length - 1) {
        const sep = document.createElement('div');
        sep.className = 'nav-separator';
        list.appendChild(sep);
      }
    });

  } else if (type === 'theme') {
    THEMES.forEach((t, i) => {
      const item = document.createElement('div');
      item.className = 'nav-item';
      item.innerHTML = `
        <div class="nav-item-icon">${t.ar}</div>
        <div class="nav-item-info">
          <div class="nav-item-name">${t.label[lang] || t.label.fr}</div>
          <div class="nav-item-sub">${t.sub[lang] || t.sub.fr}</div>
        </div>
        <div class="nav-item-arrow">›</div>
      `;
      item.onclick = () => openThemePassages(t, lang);
      list.appendChild(item);
      if (i < THEMES.length - 1) {
        const sep = document.createElement('div');
        sep.className = 'nav-separator';
        list.appendChild(sep);
      }
    });
  }
}

function renderNavSurahs(surahIds, filter, container, lang) {
  container.innerHTML = '';
  const filtered = surahIds
    .map(id => SURAHS.find(s => s.id === id))
    .filter(Boolean)
    .filter(s => {
      if (!filter) return true;
      const f = filter.toLowerCase();
      return s.fr.toLowerCase().includes(f) ||
             s.en.toLowerCase().includes(f) ||
             s.ar.includes(filter) ||
             String(s.id).includes(f);
    });

  filtered.forEach((surah, i) => {
    const typeLabel = surah.type === 'mecquoise' ? (MECCAN[lang] || 'Meccan') : (MEDINAN[lang] || 'Medinan');
    const vLabel = VERSE_LABEL[lang] || 'verses';
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
    item.onclick = () => openSurah(surah.id, 1);
    container.appendChild(item);
    if (i < filtered.length - 1) {
      const sep = document.createElement('div');
      sep.className = 'surah-separator';
      container.appendChild(sep);
    }
    setTimeout(() => item.classList.add('show'), 20 + i * 30);
  });
}

function openProphetPassages(prophet, lang) {
  currentProphet = prophet;
  const list = document.getElementById('navList');
  if (!list) return;

  const navTitle = document.getElementById('bsNavTitle');
  const navAr    = document.getElementById('bsNavAr');
  const navSub   = document.getElementById('bsNavSub');
  if (navTitle) navTitle.textContent = prophet.label[lang] || prophet.label.fr;
  if (navAr)    navAr.textContent    = prophet.ar;
  if (navSub)   navSub.textContent   = '';

  list.innerHTML = '';

  // Bouton retour
  const back = document.createElement('div');
  back.className = 'nav-item';
  back.style.cssText = 'padding:10px 20px;';
  back.innerHTML = `<div style="font-family:'Cinzel',serif;font-size:10px;letter-spacing:0.12em;color:var(--gold);cursor:pointer;">← ${BACK_WORD[lang] || 'Retour'}</div>`;
  back.onclick = () => { currentProphet = null; document.getElementById('bsNavTitle').textContent = NAV_LABELS['prophet']?.[lang] || ''; document.getElementById('bsNavAr').textContent = ''; renderNavList('prophet', lang); };
  list.appendChild(back);

  prophet.items.forEach((item, i) => {
    const surah = SURAHS.find(s => s.id === item.surahId);
    if (!surah) return;
    const el = document.createElement('div');
    el.className = 'nav-item';
    el.innerHTML = `
      <div class="nav-item-icon" style="font-family:'Amiri',serif;font-size:14px;">${surah.ar}</div>
      <div class="nav-item-info">
        <div class="nav-item-name">${surah.fr}</div>
        <div class="nav-item-sub">${item.label}</div>
      </div>
      <div class="nav-item-arrow">›</div>
    `;
    el.onclick = () => openSurah(item.surahId, item.verseStart);
    list.appendChild(el);
    if (i < prophet.items.length - 1) {
      const sep = document.createElement('div');
      sep.className = 'nav-separator';
      list.appendChild(sep);
    }
  });
}

function openThemePassages(theme, lang) {
  const list = document.getElementById('navList');
  if (!list) return;

  const navTitle = document.getElementById('bsNavTitle');
  const navAr    = document.getElementById('bsNavAr');
  if (navTitle) navTitle.textContent = theme.label[lang] || theme.label.fr;
  if (navAr)    navAr.textContent    = theme.ar;

  list.innerHTML = '';

  // Bouton retour
  const back = document.createElement('div');
  back.className = 'nav-item';
  back.style.cssText = 'padding:10px 20px;';
  back.innerHTML = `<div style="font-family:'Cinzel',serif;font-size:10px;letter-spacing:0.12em;color:var(--gold);cursor:pointer;">← ${BACK_WORD[lang] || 'Retour'}</div>`;
  back.onclick = () => { document.getElementById('bsNavTitle').textContent = NAV_LABELS['theme']?.[lang] || ''; document.getElementById('bsNavAr').textContent = ''; renderNavList('theme', lang); };
  list.appendChild(back);

  theme.items.forEach((item, i) => {
    const surah = SURAHS.find(s => s.id === item.surahId);
    if (!surah) return;
    const vLabel = VERSE_LABEL[lang] || 'verses';
    const el = document.createElement('div');
    el.className = 'nav-item';
    el.innerHTML = `
      <div class="nav-item-icon" style="font-family:'Amiri',serif;font-size:14px;">${surah.ar}</div>
      <div class="nav-item-info">
        <div class="nav-item-name">${surah.fr}</div>
        <div class="nav-item-sub">${item.verseStart > 1 ? `v. ${item.verseStart}` : surah.verses + ' ' + vLabel}</div>
      </div>
      <div class="nav-item-arrow">›</div>
    `;
    el.onclick = () => openSurah(item.surahId, item.verseStart);
    list.appendChild(el);
    if (i < theme.items.length - 1) {
      const sep = document.createElement('div');
      sep.className = 'nav-separator';
      list.appendChild(sep);
    }
  });
}

function closeNavAndOpenJuz(juzNum) {
  // Transition : navView → listView (Jouz)
  const navView = document.getElementById('navView');
  if (navView) navView.style.display = 'none';
  currentNavType = null;
  openJuzSheet(juzNum);
}

// ============================================================
// MÉMORISATION
// ============================================================

function toggleVerseMemorized(surahId, verseNum) {
  if (!window.DT) return;
  const isNow = window.DT.toggleMemorized('verse', surahId + '_' + verseNum);
  const btn = document.getElementById('mem-' + surahId + '-' + verseNum);
  if (btn) {
    btn.classList.toggle('memorized', isNow);
    const label = btn.querySelector('.verse-mem-label');
    if (label) label.textContent = isNow ? window.DT.t('memorized') : '';
  }
}

function toggleSurahMemorized(surahId) {
  if (!window.DT) return;
  const isNow = window.DT.toggleMemorized('surah', surahId);
  const btn   = document.getElementById('surah-mem-btn');
  const label = document.getElementById('surah-mem-label');
  if (btn)   btn.classList.toggle('memorized', isNow);
  if (label) label.textContent = window.DT.t('memorized');

  // Cocher/décocher tous les versets de la sourate
  const surah = typeof SURAHS !== 'undefined' ? SURAHS.find(s => s.id === surahId) : null;
  const total = surah ? surah.verses : 0;
  for (let v = 1; v <= total; v++) {
    const key = 'verse_' + surahId + '_' + v;
    const alreadyMem = window.DT.isMemorized('verse', surahId + '_' + v);
    if (isNow && !alreadyMem) {
      window.DT.toggleMemorized('verse', surahId + '_' + v);
    } else if (!isNow && alreadyMem) {
      window.DT.toggleMemorized('verse', surahId + '_' + v);
    }
  }
  // Mettre à jour l'affichage des boutons verset
  updateAllVerseMemBtns(surahId);
}

function updateAllVerseMemBtns(surahId) {
  if (!window.DT) return;
  document.querySelectorAll('[id^="mem-' + surahId + '-"]').forEach(function(btn) {
    const parts = btn.id.split('-');
    const vNum  = parts[parts.length - 1];
    const isM   = window.DT.isMemorized('verse', surahId + '_' + vNum);
    btn.classList.toggle('memorized', isM);
    const label = btn.querySelector('.verse-mem-label');
    if (label) label.textContent = isM ? window.DT.t('memorized') : '';
  });
  // Sourate
  const surahBtn = document.getElementById('surah-mem-btn');
  if (surahBtn) {
    const isM = window.DT.isMemorized('surah', surahId);
    surahBtn.classList.toggle('memorized', isM);
  }
}

