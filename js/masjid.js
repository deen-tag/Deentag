// ============================================================
// DEENTAG KIDS — LE MASJID DES LUMIÈRES
// Jeu d'apprentissage du dernier Hizb (sourates 93 à 114)
// Prototype — s'appuie sur la même API Coran que js/quran.js
// ============================================================

(function () {

  // ----- Les 22 sourates du dernier Hizb, avec offset global -----
  // (offset = nombre total de versets AVANT cette sourate dans le Coran entier,
  //  nécessaire pour construire l'URL audio verset par verset)
  const SURAHS = [
    { id:93,  ar:'الضحى',    fr:'Ad-Duha',      verses:11, offset:6079 },
    { id:94,  ar:'الشرح',    fr:'Ash-Sharh',    verses:8,  offset:6090 },
    { id:95,  ar:'التين',    fr:'At-Tin',       verses:8,  offset:6098 },
    { id:96,  ar:'العلق',    fr:'Al-Alaq',      verses:19, offset:6106 },
    { id:97,  ar:'القدر',    fr:'Al-Qadr',      verses:5,  offset:6125 },
    { id:98,  ar:'البينة',   fr:'Al-Bayyina',   verses:8,  offset:6130 },
    { id:99,  ar:'الزلزلة',  fr:'Az-Zalzala',   verses:8,  offset:6138 },
    { id:100, ar:'العاديات', fr:'Al-Adiyat',    verses:11, offset:6146 },
    { id:101, ar:'القارعة',  fr:'Al-Qaria',     verses:11, offset:6157 },
    { id:102, ar:'التكاثر',  fr:'At-Takathur',  verses:8,  offset:6168 },
    { id:103, ar:'العصر',    fr:'Al-Asr',       verses:3,  offset:6176 },
    { id:104, ar:'الهمزة',   fr:'Al-Humaza',    verses:9,  offset:6179 },
    { id:105, ar:'الفيل',    fr:'Al-Fil',       verses:5,  offset:6188 },
    { id:106, ar:'قريش',     fr:'Quraysh',      verses:4,  offset:6193 },
    { id:107, ar:'الماعون',  fr:'Al-Maun',      verses:7,  offset:6197 },
    { id:108, ar:'الكوثر',   fr:'Al-Kawthar',   verses:3,  offset:6204 },
    { id:109, ar:'الكافرون', fr:'Al-Kafirun',   verses:6,  offset:6207 },
    { id:110, ar:'النصر',    fr:'An-Nasr',      verses:3,  offset:6213 },
    { id:111, ar:'المسد',    fr:'Al-Masad',     verses:5,  offset:6216 },
    { id:112, ar:'الإخلاص',  fr:'Al-Ikhlas',    verses:4,  offset:6221 },
    { id:113, ar:'الفلق',    fr:'Al-Falaq',     verses:5,  offset:6225 },
    { id:114, ar:'الناس',    fr:'An-Nas',       verses:6,  offset:6230 },
  ];

  const TR_EDITION = 'fr.hamidullah';
  const RECITER    = 'ar.alafasy';

  // Textes de gains : un badge + un message lié au sens de chaque sourate
  const SURAH_GAINS = {
    93:  { badge: '🌅 Le Réconfort',   msg: "Allah ne t'abandonne jamais, même quand c'est difficile." },
    94:  { badge: '💛 Le Soulagement', msg: "Après chaque difficulté, il y a du soulagement." },
    95:  { badge: '🌳 La Belle Forme', msg: "Allah nous a créés magnifiquement bien." },
    96:  { badge: '📖 Le Savoir',      msg: "Lis, apprends : le savoir est un cadeau immense." },
    97:  { badge: '✨ La Nuit du Destin', msg: "Une nuit vaut plus que mille mois : quel beau cadeau !" },
    98:  { badge: '🤍 La Preuve Claire', msg: "Adorer Allah avec un cœur sincère, voilà la vraie religion." },
    99:  { badge: '🌍 Le Tremblement', msg: "Même un tout petit bien fait, Allah le voit." },
    100: { badge: '🐎 Les Coursiers',  msg: "Allah nous rappelle d'être reconnaissants pour ce qu'on a." },
    101: { badge: '⚖️ Le Fracas',      msg: "Chaque action a du poids devant Allah." },
    102: { badge: '⏳ La Rivalité',    msg: "Ne te laisse pas distraire par vouloir toujours 'plus'." },
    103: { badge: '⏰ Le Temps',       msg: "Le temps passe vite : utilise-le pour faire le bien." },
    104: { badge: '🗣️ Les Mots',       msg: "Les mots peuvent blesser : choisis-les avec bonté." },
    105: { badge: '🐘 Le Protecteur',  msg: "Allah protège ce qui Lui est cher, comme Il a protégé la Kaaba." },
    106: { badge: '🍞 La Sécurité',    msg: "Un toit et de la nourriture : de vrais cadeaux à ne pas oublier." },
    107: { badge: '🤲 La Bonté',       msg: "La vraie foi se voit dans la bonté envers les autres." },
    108: { badge: '💧 L\'Abondance',   msg: "Allah a offert un immense cadeau à notre Prophète ﷺ." },
    109: { badge: '🕊️ Le Respect',     msg: "Chacun est libre de croire, avec respect pour l'autre." },
    110: { badge: '🌸 La Victoire',    msg: "Quand vient la réussite, on n'oublie pas de remercier Allah." },
    111: { badge: '🚫 La Mise en Garde', msg: "L'orgueil et la méchanceté ne mènent jamais à rien de bon." },
    112: { badge: '🌙 L\'Unique',      msg: "Allah est Unique : cette sourate vaut un tiers du Coran !" },
    113: { badge: '🌄 L\'Aube',        msg: "Allah nous protège de tout mal, jour et nuit." },
    114: { badge: '💭 Les Pensées',    msg: "Allah protège nos cœurs des mauvaises pensées." },
  };
  const PALIER_PREFIX = { petit: 'Youpi ! 🎉', moyen: 'Bravo !', grand: 'Félicitations.' };

  // ----- Invocations : construites à partir de KIDS_DUAS (js/kids-duas.js) -----
  // Réutilise le contenu déjà validé du site (texte + audio existants),
  // rien n'est inventé ici.
  function buildDuaList() {
    if (typeof KIDS_DUAS === 'undefined') return [];
    const list = [];
    Object.keys(KIDS_DUAS).forEach(catKey => {
      const cat = KIDS_DUAS[catKey];
      Object.keys(cat).filter(k => k !== 'meta').forEach(duaKey => {
        const d = cat[duaKey];
        list.push({
          key: catKey + '_' + duaKey,
          emoji: d.emoji || cat.meta.emoji,
          moment: (d.moment && d.moment.fr) || cat.meta.titre.fr,
          arabe: d.arabe,
          traduction: d.traduction && d.traduction.fr,
          audio: 'Audio/' + d.audio,
          conseil: d.conseil && d.conseil.fr,
        });
      });
    });
    return list;
  }

  // Phrases-leurres pour le quiz "Petit" (jamais des vrais versets,
  // juste des phrases neutres et clairement différentes pour que
  // l'enfant reconnaisse la bonne traduction par le sens)
  const DECOYS = [
    "Le chat dort sur le tapis.",
    "Il pleut aujourd'hui dehors.",
    "Le pain est sur la table.",
    "Les oiseaux volent dans le ciel.",
    "Mon frère joue au ballon.",
    "La voiture roule sur la route.",
    "Le poisson nage dans l'eau.",
    "Les fleurs poussent dans le jardin.",
    "Le soleil se couche ce soir.",
    "La lune brille cette nuit.",
    "Le vent souffle sur les arbres.",
    "Les enfants rient dans la cour.",
  ];

  // ----- État & sauvegarde locale -----
  let palier   = localStorage.getItem('masjid_palier') || null;
  let progress = JSON.parse(localStorage.getItem('masjid_progress') || '[]');
  let duaProgress = JSON.parse(localStorage.getItem('masjid_progress_duas') || '[]');
  let activeTab = 'sourates'; // 'sourates' | 'invocations'
  let DUAS = [];
  const cache  = {};
  let audioPlayer = null;

  function saveDuaProgress() {
    localStorage.setItem('masjid_progress_duas', JSON.stringify(duaProgress));
  }
  function isDuaDone(key) { return duaProgress.includes(key); }
  function isDuaUnlocked(idx) { return idx === 0 || isDuaDone(DUAS[idx - 1].key); }

  function saveProgress() {
    localStorage.setItem('masjid_progress', JSON.stringify(progress));
  }
  function isDone(id) { return progress.includes(id); }
  function isUnlocked(idx) { return idx === 0 || isDone(SURAHS[idx - 1].id); }

  // ----- Navigation entre écrans -----
  function showScreen(id) {
    ['screenPalier', 'screenMap', 'screenGame'].forEach(s => {
      document.getElementById(s).style.display = (s === id) ? 'flex' : 'none';
    });
  }

  function initApp() {
    DUAS = buildDuaList();
    showScreen(palier ? 'screenMap' : 'screenPalier');
    if (palier) renderMap();
  }

  function switchTab(tab) {
    activeTab = tab;
    renderMap();
  }
  window.masjidSwitchTab = switchTab;

  function choosePalier(p) {
    palier = p;
    localStorage.setItem('masjid_palier', p);
    renderMap();
    showScreen('screenMap');
  }
  window.masjidChoosePalier = choosePalier;

  function changePalier() {
    showScreen('screenPalier');
  }
  window.masjidChangePalier = changePalier;

  // ----- Écran carte / masjid -----
  function renderMap() {
    const pct = Math.round((progress.length / SURAHS.length) * 100);
    document.getElementById('masjidFill').style.clipPath =
      `inset(${100 - pct}% 0 0 0)`;
    document.getElementById('masjidPct').textContent =
      progress.length === SURAHS.length
        ? '🕌 Masjid achevé ! Toutes les lumières sont allumées.'
        : progress.length + ' / ' + SURAHS.length + ' sourates apprises';

    const badge = { petit: '🕯️ Petit', moyen: '🧱 Moyen', grand: '🕌 Grand' }[palier];
    document.getElementById('palierBadge').textContent = badge;

    // Lanternes autour du masjid (1 par invocation apprise)
    const lanternRow = document.getElementById('lanternRow');
    lanternRow.innerHTML = DUAS.map(d =>
      `<span class="mj-lantern${isDuaDone(d.key) ? ' mj-lantern-lit' : ''}">🏮</span>`
    ).join('');

    // Onglets
    document.getElementById('tabSourates').classList.toggle('mj-tab-active', activeTab === 'sourates');
    document.getElementById('tabInvocations').classList.toggle('mj-tab-active', activeTab === 'invocations');

    const path = document.getElementById('surahPath');
    path.innerHTML = '';

    if (activeTab === 'sourates') {
      SURAHS.forEach((s, idx) => {
        const unlocked = isUnlocked(idx);
        const done = isDone(s.id);
        const node = document.createElement('button');
        node.className = 'sp-node' + (done ? ' sp-done' : unlocked ? ' sp-unlocked' : ' sp-locked');
        node.style.alignSelf = (idx % 2 === 0) ? 'flex-start' : 'flex-end';
        node.innerHTML = `
          <span class="sp-node-icon">${done ? '⭐' : unlocked ? '🔓' : '🔒'}</span>
          <span class="sp-node-ar">${s.ar}</span>
          <span class="sp-node-fr">${s.fr}</span>
        `;
        if (unlocked) node.onclick = () => openSurah(s.id);
        else node.disabled = true;
        path.appendChild(node);
      });
    } else {
      DUAS.forEach((d, idx) => {
        const unlocked = isDuaUnlocked(idx);
        const done = isDuaDone(d.key);
        const node = document.createElement('button');
        node.className = 'sp-node' + (done ? ' sp-done' : unlocked ? ' sp-unlocked' : ' sp-locked');
        node.style.alignSelf = (idx % 2 === 0) ? 'flex-start' : 'flex-end';
        node.innerHTML = `
          <span class="sp-node-icon">${done ? '🏮' : unlocked ? '🔓' : '🔒'}</span>
          <span class="sp-node-ar">${d.emoji}</span>
          <span class="sp-node-fr">${d.moment}</span>
        `;
        if (unlocked) node.onclick = () => openDua(d.key);
        else node.disabled = true;
        path.appendChild(node);
      });
    }
  }

  // ----- Chargement du texte via l'API Coran -----
  async function fetchSurah(id) {
    if (cache[id]) return cache[id];
    const url = `https://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,en.transliteration,${TR_EDITION}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Erreur API');
    const json = await resp.json();
    cache[id] = json.data;
    return json.data;
  }

  // ----- État de la partie en cours -----
  let gs = null; // { surah, data, verseIdx, tries }

  async function openSurah(id) {
    const surah = SURAHS.find(s => s.id === id);
    showScreen('screenGame');
    const box = document.getElementById('gameContent');
    box.innerHTML = `<div class="mj-loading">Chargement de la sourate…</div>`;
    document.getElementById('gameTitleAr').textContent = surah.ar;
    document.getElementById('gameTitleFr').textContent = surah.fr;

    try {
      const data = await fetchSurah(id);
      gs = { surah, data, verseIdx: 0, tries: 0 };
      renderVerseExercise();
    } catch (e) {
      box.innerHTML = `<div class="mj-loading">Connexion impossible. Vérifie ta connexion internet et réessaie.</div>`;
    }
  }
  window.masjidCloseGame = () => { stopAudio(); renderMap(); showScreen('screenMap'); };

  // ----- Ouvrir une invocation (exercice unique) -----
  function openDua(key) {
    const dua = DUAS.find(d => d.key === key);
    if (!dua) return;
    showScreen('screenGame');
    document.getElementById('gameTitleAr').textContent = dua.emoji;
    document.getElementById('gameTitleFr').textContent = dua.moment;
    document.getElementById('gameProgress').style.width = '0%';

    gs = { kind: 'dua', dua };
    const box = document.getElementById('gameContent');
    const playFn = () => playDuaAudio(dua.audio);
    const onDone = () => finishDua(dua);

    if (palier === 'petit') renderPetit(box, dua.arabe, dua.traduction, playFn, onDone);
    else renderMoyenGrand(box, dua.arabe, dua.traduction, playFn, onDone);
  }

  function playDuaAudio(path) {
    stopAudio();
    audioPlayer = new Audio(path);
    audioPlayer.play().catch(() => {});
  }

  function finishDua(dua) {
    stopAudio();
    if (!isDuaDone(dua.key)) {
      duaProgress.push(dua.key);
      saveDuaProgress();
    }
    const allDuasDone = duaProgress.length === DUAS.length;
    const emojiTitle = document.querySelector('#bravoModalMj .kids-bravo-emoji');
    if (emojiTitle) emojiTitle.textContent = '🏮';
    document.getElementById('bravoTitleMj').textContent =
      allDuasDone ? 'Toutes les lanternes sont allumées !' : `${PALIER_PREFIX[palier]} 🏮`;
    document.getElementById('bravoSubMj').textContent = dua.conseil || 'Continue comme ça !';
    document.getElementById('bravoModalMj').style.display = 'flex';
    launchConfetti();
  }

  function stopAudio() {
    if (audioPlayer) { audioPlayer.pause(); audioPlayer = null; }
  }

  function playVerseAudio(verseNum) {
    stopAudio();
    const globalNum = gs.surah.offset + verseNum;
    const url = `https://cdn.islamic.network/quran/audio/128/${RECITER}/${globalNum}.mp3`;
    audioPlayer = new Audio(url);
    audioPlayer.play().catch(() => {});
  }

  function updateProgressBar() {
    const total = gs.data[0].ayahs.length;
    document.getElementById('gameProgress').style.width =
      Math.round((gs.verseIdx / total) * 100) + '%';
  }

  function renderVerseExercise() {
    updateProgressBar();
    const box = document.getElementById('gameContent');
    const ar = gs.data[0].ayahs[gs.verseIdx];
    const tr = gs.data[2].ayahs[gs.verseIdx];
    const verseNum = gs.verseIdx + 1;
    const playFn = () => playVerseAudio(verseNum);

    if (palier === 'petit') renderPetit(box, ar.text, tr.text, playFn, nextVerse);
    else renderMoyenGrand(box, ar.text, tr.text, playFn, nextVerse);
  }

  // ----- Palier PETIT (4-6 ans) : reconnaissance de traduction -----
  function renderPetit(box, arText, trText, playFn, onDone) {
    const others = DECOYS.slice().sort(() => Math.random() - 0.5).slice(0, 1);
    const options = [trText, ...others].sort(() => Math.random() - 0.5);

    box.innerHTML = `
      <div class="mj-verse-ar">${arText}</div>
      <button class="mj-listen-btn" id="listenBtn">🔊 Écouter</button>
      <div class="mj-instruction">Écoute bien, puis touche la bonne phrase !</div>
      <div class="mj-options" id="petitOptions"></div>
    `;
    document.getElementById('listenBtn').onclick = playFn;
    playFn();

    const optWrap = document.getElementById('petitOptions');
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'mj-option-card';
      btn.textContent = opt;
      btn.onclick = () => {
        if (opt === trText) {
          btn.classList.add('mj-correct');
          setTimeout(onDone, 700);
        } else {
          btn.classList.add('mj-wrong');
          setTimeout(() => btn.classList.remove('mj-wrong'), 500);
        }
      };
      optWrap.appendChild(btn);
    });
  }

  // ----- Paliers MOYEN (7-9) / GRAND (10-11) : remise en ordre des mots -----
  function renderMoyenGrand(box, arText, trText, playFn, onDone) {
    const words = arText.split(' ').filter(Boolean);
    const shuffled = words.map((w, i) => ({ w, i })).sort(() => Math.random() - 0.5);
    const showTranslation = (palier === 'moyen');
    let tries = 0;

    box.innerHTML = `
      <button class="mj-listen-btn" id="listenBtn">🔊 Écouter</button>
      ${showTranslation ? `<div class="mj-translation-hint">${trText}</div>` : ''}
      <div class="mj-instruction">Touche les mots dans le bon ordre :</div>
      <div class="mj-slots" id="mjSlots"></div>
      <div class="mj-bank" id="mjBank"></div>
      <div class="mj-feedback" id="mjFeedback"></div>
    `;
    document.getElementById('listenBtn').onclick = playFn;

    const slots = document.getElementById('mjSlots');
    const bank = document.getElementById('mjBank');
    words.forEach(() => {
      const slot = document.createElement('span');
      slot.className = 'mj-slot';
      slots.appendChild(slot);
    });

    let placed = [];
    function renderBank() {
      bank.innerHTML = '';
      shuffled.forEach(item => {
        if (placed.includes(item.i)) return;
        const chip = document.createElement('button');
        chip.className = 'mj-chip';
        chip.textContent = item.w;
        chip.onclick = () => {
          placed.push(item.i);
          renderSlots();
          renderBank();
          if (placed.length === words.length) checkOrder();
        };
        bank.appendChild(chip);
      });
    }
    function renderSlots() {
      const slotEls = slots.querySelectorAll('.mj-slot');
      slotEls.forEach((el, idx) => {
        if (placed[idx] !== undefined) {
          el.textContent = words[placed[idx]];
          el.classList.add('mj-slot-filled');
          el.onclick = () => {
            placed.splice(idx, 1);
            renderSlots();
            renderBank();
          };
        } else {
          el.textContent = '';
          el.classList.remove('mj-slot-filled');
          el.onclick = null;
        }
      });
    }
    function checkOrder() {
      const correct = placed.every((wi, idx) => wi === idx);
      const fb = document.getElementById('mjFeedback');
      if (correct) {
        fb.textContent = 'Bravo, c\'est le bon ordre ! ✨';
        fb.className = 'mj-feedback mj-feedback-ok';
        setTimeout(onDone, 900);
      } else {
        tries++;
        if (tries >= 3) {
          fb.textContent = 'Pas grave, on continue !';
          fb.className = 'mj-feedback mj-feedback-ok';
          setTimeout(onDone, 1600);
        } else {
          fb.textContent = 'Presque ! Essaie encore 💪';
          fb.className = 'mj-feedback mj-feedback-retry';
          placed = [];
          renderSlots();
          renderBank();
        }
      }
    }
    renderSlots();
    renderBank();
    if (palier === 'grand') playFn();
  }

  function nextVerse() {
    gs.tries = 0;
    gs.verseIdx++;
    if (gs.verseIdx >= gs.data[0].ayahs.length) {
      finishSurah();
    } else {
      renderVerseExercise();
    }
  }

  function finishSurah() {
    stopAudio();
    const wasAlreadyDone = isDone(gs.surah.id);
    if (!wasAlreadyDone) {
      progress.push(gs.surah.id);
      saveProgress();
    }

    const hizbComplete = progress.length === SURAHS.length;
    const gain = SURAH_GAINS[gs.surah.id];
    const emojiTitle = document.querySelector('#bravoModalMj .kids-bravo-emoji');

    if (hizbComplete) {
      if (emojiTitle) emojiTitle.textContent = '🕌✨';
      document.getElementById('bravoTitleMj').textContent = 'Le Masjid est achevé !';
      document.getElementById('bravoSubMj').textContent =
        `Tu as terminé le dernier Hizb du Coran ! Le masjid brille de toutes ses lumières. ${gain.badge}`;
    } else {
      if (emojiTitle) emojiTitle.textContent = gain.badge.split(' ')[0];
      document.getElementById('bravoTitleMj').textContent =
        `${PALIER_PREFIX[palier]} ${gain.badge}`;
      document.getElementById('bravoSubMj').textContent = gain.msg;
    }

    document.getElementById('bravoModalMj').style.display = 'flex';
    launchConfetti();
  }

  window.masjidCloseBravo = function () {
    document.getElementById('bravoModalMj').style.display = 'none';
    document.getElementById('confettiContainerMj').innerHTML = '';
    renderMap();
    showScreen('screenMap');
  };

  function launchConfetti() {
    const container = document.getElementById('confettiContainerMj');
    if (!container) return;
    container.innerHTML = '';
    const colors = ['#E8B84B', '#6C63FF', '#FFD9A0', '#8FAEE2', '#FFF3DC'];
    for (let i = 0; i < 55; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 1.5 + 's';
      piece.style.animationDuration = (2 + Math.random()) + 's';
      piece.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      piece.style.width = (8 + Math.random() * 8) + 'px';
      piece.style.height = (8 + Math.random() * 8) + 'px';
      container.appendChild(piece);
    }
    setTimeout(() => { if (container) container.innerHTML = ''; }, 4500);
  }

  document.addEventListener('DOMContentLoaded', initApp);
})();
