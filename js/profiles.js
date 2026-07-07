/* ============================================================
   profiles.js — Système de profils multi-utilisateurs Deentag
   ============================================================ */
(function () {

  var MAX_PROFILES   = 5;
  var STORAGE_KEY    = 'deentag_profiles';
  var ACTIVE_KEY     = 'deentag_active_profile';
  var CIRC           = 2 * Math.PI * 35;

  /* ── Map officielle sourate → juz (114 sourates, 30 juz) ── */
  var SURAH_TO_JUZ = [
    0,  // index 0 inutilisé
    1,  // 1  Al-Fatiha
    1,  // 2  Al-Baqara (débute juz 1, s'étend sur juz 1-2-3)
    2,  // 3  Al-Imran
    3,  // 4  An-Nisa
    4,  // 5  Al-Maida
    5,  // 6  Al-Anam
    6,  // 7  Al-Araf
    7,  // 8  Al-Anfal
    7,  // 9  At-Tawba
    8,  // 10 Yunus
    8,  // 11 Hud
    9,  // 12 Yusuf
    9,  // 13 Ar-Rad
    9,  // 14 Ibrahim
    9,  // 15 Al-Hijr
    10, // 16 An-Nahl
    10, // 17 Al-Isra
    11, // 18 Al-Kahf
    11, // 19 Maryam
    11, // 20 Ta-Ha
    12, // 21 Al-Anbiya
    12, // 22 Al-Hajj
    12, // 23 Al-Muminun
    13, // 24 An-Nur
    13, // 25 Al-Furqan
    13, // 26 Ash-Shuara
    13, // 27 An-Naml
    14, // 28 Al-Qasas
    14, // 29 Al-Ankabut
    14, // 30 Ar-Rum
    14, // 31 Luqman
    14, // 32 As-Sajda
    15, // 33 Al-Ahzab
    15, // 34 Saba
    15, // 35 Fatir
    16, // 36 Ya-Sin
    16, // 37 As-Saffat
    16, // 38 Sad
    16, // 39 Az-Zumar
    17, // 40 Ghafir
    17, // 41 Fussilat
    17, // 42 Ash-Shura
    17, // 43 Az-Zukhruf
    17, // 44 Ad-Dukhan
    17, // 45 Al-Jathiya
    18, // 46 Al-Ahqaf
    18, // 47 Muhammad
    18, // 48 Al-Fath
    18, // 49 Al-Hujurat
    18, // 50 Qaf
    19, // 51 Adh-Dhariyat
    19, // 52 At-Tur
    19, // 53 An-Najm
    19, // 54 Al-Qamar
    19, // 55 Ar-Rahman
    20, // 56 Al-Waqia
    20, // 57 Al-Hadid
    20, // 58 Al-Mujadila
    20, // 59 Al-Hashr
    20, // 60 Al-Mumtahana
    20, // 61 As-Saf
    20, // 62 Al-Jumua
    20, // 63 Al-Munafiqun
    20, // 64 At-Taghabun
    20, // 65 At-Talaq
    20, // 66 At-Tahrim
    21, // 67 Al-Mulk
    21, // 68 Al-Qalam
    21, // 69 Al-Haqqa
    21, // 70 Al-Maarij
    21, // 71 Nuh
    21, // 72 Al-Jinn
    21, // 73 Al-Muzzammil
    21, // 74 Al-Muddaththir
    21, // 75 Al-Qiyama
    22, // 76 Al-Insan
    22, // 77 Al-Mursalat
    23, // 78 An-Naba
    23, // 79 An-Naziat
    23, // 80 Abasa
    23, // 81 At-Takwir
    23, // 82 Al-Infitar
    23, // 83 Al-Mutaffifin
    23, // 84 Al-Inshiqaq
    23, // 85 Al-Buruj
    23, // 86 At-Tariq
    23, // 87 Al-Ala
    23, // 88 Al-Ghashiya
    24, // 89 Al-Fajr
    24, // 90 Al-Balad
    24, // 91 Ash-Shams
    24, // 92 Al-Layl
    24, // 93 Ad-Duha
    24, // 94 Ash-Sharh
    24, // 95 At-Tin
    24, // 96 Al-Alaq
    24, // 97 Al-Qadr
    24, // 98 Al-Bayyina
    24, // 99 Az-Zalzala
    24, // 100 Al-Adiyat
    24, // 101 Al-Qaria
    24, // 102 At-Takathur
    24, // 103 Al-Asr
    25, // 104 Al-Humaza
    25, // 105 Al-Fil
    25, // 106 Quraysh
    25, // 107 Al-Maun
    25, // 108 Al-Kawthar
    25, // 109 Al-Kafirun
    25, // 110 An-Nasr
    25, // 111 Al-Masad
    25, // 112 Al-Ikhlas
    25, // 113 Al-Falaq
    25  // 114 An-Nas
  ];
  /* ── Nombre de versets par sourate (index 1-114) ── */
  var SURAH_VERSES = [
    0,
    7,286,200,176,120,165,206,75,129,109,
    123,111,43,52,99,128,111,110,98,135,
    112,78,118,64,77,227,93,88,69,60,
    34,30,73,54,45,83,182,88,75,85,
    54,53,89,59,37,35,38,29,18,45,
    60,49,62,55,78,96,29,22,24,13,
    14,11,11,18,12,12,30,52,52,44,
    28,28,20,56,40,31,50,40,46,42,
    29,19,36,25,22,17,19,26,30,20,
    15,21,11,8,8,19,5,8,8,11,
    11,8,3,9,5,4,7,3,6,3,5,4,5,6
  ];

  /* ── Noms officiels des 114 sourates ── */
  var SURAH_NAMES = [
    '',
    'Al-Fatiha','Al-Baqara','Al-Imran','An-Nisa','Al-Maida',
    'Al-Anam','Al-Araf','Al-Anfal','At-Tawba','Yunus',
    'Hud','Yusuf','Ar-Rad','Ibrahim','Al-Hijr',
    'An-Nahl','Al-Isra','Al-Kahf','Maryam','Ta-Ha',
    'Al-Anbiya','Al-Hajj','Al-Muminun','An-Nur','Al-Furqan',
    'Ash-Shuara','An-Naml','Al-Qasas','Al-Ankabut','Ar-Rum',
    'Luqman','As-Sajda','Al-Ahzab','Saba','Fatir',
    'Ya-Sin','As-Saffat','Sad','Az-Zumar','Ghafir',
    'Fussilat','Ash-Shura','Az-Zukhruf','Ad-Dukhan','Al-Jathiya',
    'Al-Ahqaf','Muhammad','Al-Fath','Al-Hujurat','Qaf',
    'Adh-Dhariyat','At-Tur','An-Najm','Al-Qamar','Ar-Rahman',
    'Al-Waqia','Al-Hadid','Al-Mujadila','Al-Hashr','Al-Mumtahana',
    'As-Saf','Al-Jumua','Al-Munafiqun','At-Taghabun','At-Talaq',
    'At-Tahrim','Al-Mulk','Al-Qalam','Al-Haqqa','Al-Maarij',
    'Nuh','Al-Jinn','Al-Muzzammil','Al-Muddaththir','Al-Qiyama',
    'Al-Insan','Al-Mursalat','An-Naba','An-Naziat','Abasa',
    'At-Takwir','Al-Infitar','Al-Mutaffifin','Al-Inshiqaq','Al-Buruj',
    'At-Tariq','Al-Ala','Al-Ghashiya','Al-Fajr','Al-Balad',
    'Ash-Shams','Al-Layl','Ad-Duha','Ash-Sharh','At-Tin',
    'Al-Alaq','Al-Qadr','Al-Bayyina','Az-Zalzala','Al-Adiyat',
    'Al-Qaria','At-Takathur','Al-Asr','Al-Humaza','Al-Fil',
    'Quraysh','Al-Maun','Al-Kawthar','Al-Kafirun','An-Nasr',
    'Al-Masad','Al-Ikhlas','Al-Falaq','An-Nas'
  ];

  /* ── Calcul juz basé sur les versets mémorisés ── */
  function calcJuzProgress(prog) {
    var juzTotals = {}, juzMem = {};
    for (var i = 1; i <= 114; i++) {
      var j = SURAH_TO_JUZ[i];
      juzTotals[j] = (juzTotals[j] || 0) + SURAH_VERSES[i];
      juzMem[j]    = juzMem[j] || 0;
    }
    Object.keys(prog).forEach(function(k) {
      if (!k.startsWith('verse_')) return;
      var parts   = k.replace('verse_','').split('_');
      var surahId = parseInt(parts[0], 10);
      var juzNum  = SURAH_TO_JUZ[surahId];
      if (juzNum) juzMem[juzNum] = (juzMem[juzNum] || 0) + 1;
    });
    var done = [], partial = [];
    for (var jn = 1; jn <= 30; jn++) {
      var total = juzTotals[jn] || 0;
      var mem   = juzMem[jn]   || 0;
      if (!total) continue;
      if (mem >= total) done.push(jn);
      else if (mem > 0) partial.push(jn);
    }
    return { done: done, partial: partial, totals: juzTotals, mem: juzMem };
  }

  var PROFILE_COLORS = ['#C9A84C','#2C4A3E','#4A3728','#3A3060','#5C3A4A'];

  var TRANSLATIONS = {
    fr: { memorized:'Mémorisé',      profiles:'Profils',    addProfile:'Ajouter un profil', editProfile:'Modifier', deleteProfile:'Supprimer', chooseProfile:'Qui êtes-vous ?', name:'Prénom', save:'Enregistrer', cancel:'Annuler', progress:'Progression', surasMemorized:'Sourates mémorisées', confirmDelete:'Supprimer ce profil ?', detail:'Détail', close:'Fermer', activeSince:'Membre depuis', activeProfile:'Profil actif', juzCompleted:'Juz complétés', duasMemorized:'Invocations mémorisées', noDuaMemorized:'Aucune invocation mémorisée', me:'Moi', onboardTitle:'Bienvenue sur Deentag !', onboardText:'C\'est ton espace pour suivre ce que tu apprends : sourates, invocations, progression... Comment veux-tu qu\'on t\'appelle ?', onboardCta:'Commencer ✓' },
    en: { memorized:'Memorized',     profiles:'Profiles',   addProfile:'Add profile',        editProfile:'Edit',     deleteProfile:'Delete',    chooseProfile:'Who are you?',     name:'Name',   save:'Save',        cancel:'Cancel',  progress:'Progress',     surasMemorized:'Memorized surahs',    confirmDelete:'Delete this profile?',  detail:'Detail', close:'Close', activeSince:'Member since', activeProfile:'Active profile', juzCompleted:'Completed Juz', duasMemorized:'Memorized supplications', noDuaMemorized:'No supplication memorized yet', me:'Me', onboardTitle:'Welcome to Deentag!', onboardText:'This is your space to track what you learn: surahs, supplications, progress... What would you like to be called?', onboardCta:'Get started ✓' },
    es: { memorized:'Memorizado',    profiles:'Perfiles',   addProfile:'Añadir perfil',      editProfile:'Editar',   deleteProfile:'Eliminar',  chooseProfile:'¿Quién eres?',     name:'Nombre', save:'Guardar',     cancel:'Cancelar',progress:'Progreso',     surasMemorized:'Suras memorizadas',   confirmDelete:'¿Eliminar este perfil?',detail:'Detalle',close:'Cerrar',activeSince:'Miembro desde',activeProfile:'Perfil activo',juzCompleted:'Juz completados', duasMemorized:'Invocaciones memorizadas', noDuaMemorized:'Ninguna invocación memorizada', me:'Yo', onboardTitle:'¡Bienvenido a Deentag!', onboardText:'Este es tu espacio para seguir lo que aprendes: suras, súplicas, progreso... ¿Cómo quieres que te llamemos?', onboardCta:'Empezar ✓' },
    de: { memorized:'Auswendig',     profiles:'Profile',    addProfile:'Profil hinzufügen',  editProfile:'Bearbeiten',deleteProfile:'Löschen',  chooseProfile:'Wer bist du?',      name:'Name',   save:'Speichern',   cancel:'Abbrechen',progress:'Fortschritt',  surasMemorized:'Gelernte Suren',      confirmDelete:'Profil löschen?',       detail:'Detail', close:'Schließen',activeSince:'Mitglied seit',activeProfile:'Aktives Profil',juzCompleted:'Abgeschlossene Juz', duasMemorized:'Gelernte Bittgebete', noDuaMemorized:'Noch kein Bittgebet gelernt', me:'Ich', onboardTitle:'Willkommen bei Deentag!', onboardText:'Das ist dein Bereich, um deinen Lernfortschritt zu verfolgen: Suren, Bittgebete, Fortschritt... Wie möchtest du genannt werden?', onboardCta:'Loslegen ✓' },
    it: { memorized:'Memorizzato',   profiles:'Profili',    addProfile:'Aggiungi profilo',   editProfile:'Modifica', deleteProfile:'Elimina',   chooseProfile:'Chi sei?',         name:'Nome',   save:'Salva',       cancel:'Annulla', progress:'Progressi',    surasMemorized:'Sure memorizzate',    confirmDelete:'Eliminare questo profilo?',detail:'Dettaglio',close:'Chiudi',activeSince:'Membro da',activeProfile:'Profilo attivo',juzCompleted:'Juz completati', duasMemorized:'Invocazioni memorizzate', noDuaMemorized:'Nessuna invocazione memorizzata', me:'Io', onboardTitle:'Benvenuto su Deentag!', onboardText:'Questo è il tuo spazio per seguire ciò che impari: sure, invocazioni, progressi... Come vuoi essere chiamato?', onboardCta:'Inizia ✓' },
    nl: { memorized:'Gememoriseerd', profiles:'Profielen',  addProfile:'Profiel toevoegen',  editProfile:'Bewerken', deleteProfile:'Verwijderen',chooseProfile:'Wie ben jij?',    name:'Naam',   save:'Opslaan',     cancel:'Annuleren',progress:'Voortgang',    surasMemorized:"Gememoriseerde soera's",confirmDelete:'Dit profiel verwijderen?',detail:'Detail',close:'Sluiten',activeSince:'Lid sinds',activeProfile:'Actief profiel',juzCompleted:'Voltooide Juz', duasMemorized:'Gememoriseerde smeekgebeden', noDuaMemorized:'Nog geen smeekgebed gememoriseerd', me:'Ik', onboardTitle:'Welkom bij Deentag!', onboardText:'Dit is jouw plek om te volgen wat je leert: soera\'s, smeekbeden, voortgang... Hoe wil je genoemd worden?', onboardCta:'Beginnen ✓' },
    pt: { memorized:'Memorizado',    profiles:'Perfis',     addProfile:'Adicionar perfil',   editProfile:'Editar',   deleteProfile:'Eliminar',  chooseProfile:'Quem és tu?',      name:'Nome',   save:'Guardar',     cancel:'Cancelar', progress:'Progresso',   surasMemorized:'Suras memorizadas',   confirmDelete:'Eliminar este perfil?', detail:'Detalhe',close:'Fechar',activeSince:'Membro desde',activeProfile:'Perfil ativo',juzCompleted:'Juz concluídos', duasMemorized:'Invocações memorizadas', noDuaMemorized:'Nenhuma invocação memorizada', me:'Eu', onboardTitle:'Bem-vindo ao Deentag!', onboardText:'Este é o teu espaço para acompanhar o que aprendes: suras, súplicas, progresso... Como queres ser chamado?', onboardCta:'Começar ✓' },
    tr: { memorized:'Ezberlenmiş',   profiles:'Profiller',  addProfile:'Profil ekle',        editProfile:'Düzenle',  deleteProfile:'Sil',       chooseProfile:'Sen kimsin?',      name:'İsim',   save:'Kaydet',      cancel:'İptal',    progress:'İlerleme',    surasMemorized:'Ezberlenmiş sureler', confirmDelete:'Bu profili sil?',       detail:'Detay',  close:'Kapat',  activeSince:'Üye tarihi',  activeProfile:'Aktif profil',  juzCompleted:'Tamamlanan Cüzler', duasMemorized:'Ezberlenmiş dualar', noDuaMemorized:'Henüz ezberlenmiş dua yok', me:'Ben', onboardTitle:'Deentag\'a hoş geldin!', onboardText:'Burası öğrendiklerini takip ettiğin alanın: sureler, dualar, ilerleme... Sana nasıl seslenelim?', onboardCta:'Başla ✓' }
  };

  /* ── Helpers ── */
  function getLang() { return localStorage.getItem('deentag_lang') || 'fr'; }
  function t(key) { var l = getLang(); return (TRANSLATIONS[l] || TRANSLATIONS.fr)[key] || key; }
  function uid()  { return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

  /* ── Storage ── */
  function loadProfiles() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch(e) { return []; } }
  function saveProfiles(p) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }
  function getActiveId()   { return localStorage.getItem(ACTIVE_KEY) || null; }
  function setActiveId(id) { localStorage.setItem(ACTIVE_KEY, id); }
  function getActiveProfile() {
    var id = getActiveId(); var profiles = loadProfiles();
    return profiles.find(function(p){ return p.id === id; }) || profiles[0] || null;
  }

  /* ── Progression ── */
  function progressKey(id) { return 'deentag_progress_' + id; }
  function loadProgress(id) { try { return JSON.parse(localStorage.getItem(progressKey(id))) || {}; } catch(e) { return {}; } }
  function saveProgress(id, data) { localStorage.setItem(progressKey(id), JSON.stringify(data)); }

  /* ── Paliers de progression (25/50/100%) ── */
  var MILESTONES = [25, 50, 100];
  function milestoneKey(profileId) { return 'deentag_milestones_' + profileId; }
  function loadMilestoneState(profileId) {
    try { return JSON.parse(localStorage.getItem(milestoneKey(profileId))) || {}; } catch(e) { return {}; }
  }
  function saveMilestoneState(profileId, data) {
    localStorage.setItem(milestoneKey(profileId), JSON.stringify(data));
  }
  // Retourne le palier fraîchement franchi (25/50/100) pour ce type de statistique,
  // ou null si aucun nouveau palier n'a été atteint depuis la dernière visite.
  function checkNewMilestone(type, pct) {
    var p = getActiveProfile(); if (!p) return null;
    var state = loadMilestoneState(p.id);
    var lastReached = state[type] || 0;
    var newlyReached = null;
    MILESTONES.forEach(function(m) {
      if (pct >= m && lastReached < m) newlyReached = m;
    });
    if (newlyReached) {
      state[type] = newlyReached;
      saveMilestoneState(p.id, state);
    }
    return newlyReached;
  }

  /* ── API publique ── */
  window.DT = window.DT || {};

  window.DT.toggleMemorized = function(type, id) {
    var p = getActiveProfile(); if (!p) return false;
    var prog = loadProgress(p.id); var key = type + '_' + id;
    if (prog[key]) { delete prog[key]; } else { prog[key] = { date: new Date().toISOString() }; }
    saveProgress(p.id, prog);
    return !!prog[key];
  };
  window.DT.isMemorized = function(type, id) {
    var p = getActiveProfile(); if (!p) return false;
    return !!loadProgress(p.id)[type + '_' + id];
  };
  window.DT.getStats = function() {
    var p = getActiveProfile(); if (!p) return { total:0, surahs:0, verses:0, duas:0 };
    var prog = loadProgress(p.id); var keys = Object.keys(prog);
    return {
      total:  keys.length,
      surahs: keys.filter(function(k){ return k.startsWith('surah_'); }).length,
      verses: keys.filter(function(k){ return k.startsWith('verse_'); }).length,
      duas:   keys.filter(function(k){ return k.startsWith('dua_'); }).length
    };
  };
  window.DT.getActiveProfile  = getActiveProfile;
  window.DT.openProfileModal  = openProfileModal;
  window.DT._closeModal = closeProfileModal;
  window.DT._closeProfileView = closeProfileModal;
  window.DT.t                 = t;
  /* ── Méthodes de stockage exposées pour kids-profiles.js ── */
  window.DT._loadProfiles = loadProfiles;
  window.DT._getActiveId  = getActiveId;
  window.DT._setActiveId  = setActiveId;

  /* ── Dôme SVG ── */
  function domeHTML(initial, color, size) {
    size = size || 40;
    var h = Math.round(size * 1.15);
    var cx = size / 2, cy = h / 2;
    return '<svg width="'+size+'" height="'+h+'" viewBox="0 0 '+size+' '+h+'" fill="none">' +
      '<path d="M'+cx+' 1 C'+cx+' 1 2 '+(h*0.25)+' 2 '+(h*0.45)+' L2 '+(h-4)+' C2 '+(h-1.5)+' 3.5 '+h+' 5 '+h+' L'+(size-5)+' '+h+' C'+(size-3.5)+' '+h+' '+(size-2)+' '+(h-1.5)+' '+(size-2)+' '+(h-4)+' L'+(size-2)+' '+(h*0.45)+' C'+(size-2)+' '+(h*0.25)+' '+cx+' 1 '+cx+' 1Z" fill="'+color+'" stroke="#E2C97E" stroke-width="1.2"/>' +
      '<circle cx="'+cx+'" cy="2" r="2" fill="#E2C97E"/>' +
      '<text x="'+cx+'" y="'+(h*0.72)+'" text-anchor="middle" font-family="Cinzel,serif" font-weight="700" font-size="'+(size*0.36)+'" fill="white">'+initial+'</text>' +
      '</svg>';
  }

  /* ── CSS injection ── */
  function injectCSS() {
    if (document.getElementById('dt-profile-css')) return;
    var style = document.createElement('style');
    style.id  = 'dt-profile-css';
    style.textContent = `
      /* ── Modal overlay ── */
      /* Profile view uses existing bottom-sheet styles */
      .dt-handle { width:36px;height:4px;background:rgba(201,168,76,0.3);border-radius:2px;margin:14px auto 0; }

      /* Header profil actif */
      .dt-profile-header { padding:20px 24px 0;display:flex;align-items:center;gap:16px; }
      .dt-active-name { font-family:'Cinzel',serif;font-size:18px;font-weight:700;color:var(--text);letter-spacing:0.05em; }
      .dt-active-since { font-family:'Cormorant Garamond',serif;font-style:italic;font-size:12px;color:rgba(201,168,76,0.9);margin-top:2px; }
      .dt-active-badge { display:inline-flex;align-items:center;gap:4px;padding:4px 12px;border-radius:20px;border:1px solid rgba(201,168,76,0.6);background:rgba(201,168,76,0.18);font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.1em;color:var(--gold);margin-top:6px;font-weight:600; }
      .dt-active-badge::before { content:'';width:6px;height:6px;border-radius:50%;background:var(--gold);display:inline-block; }
      .dt-edit-btn { width:36px;height:36px;border-radius:50%;border:1.5px solid rgba(201,168,76,0.5);background:rgba(201,168,76,0.12);color:var(--gold);font-size:15px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;margin-left:auto; }

      /* Ornement */
      .dt-ornament { display:flex;align-items:center;gap:10px;padding:18px 24px 0; }
      .dt-orn-line { flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent); }
      .dt-orn-star { color:var(--gold);font-size:10px;opacity:0.6; }

      /* Stats */
      .dt-stats-section { padding:16px 24px 0; }
      .dt-section-title { font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.2em;color:rgba(201,168,76,0.75);text-transform:uppercase;margin-bottom:16px; }
      .dt-stats-row { display:flex;gap:12px;justify-content:space-between; }
      .dt-stat-counter { flex:1;display:flex;flex-direction:column;align-items:center;gap:10px; }
      .dt-ring-wrap { position:relative;width:68px;height:68px;display:flex;align-items:center;justify-content:center; }
      .dt-ring-wrap svg { position:absolute;top:0;left:0;transform:rotate(-90deg); }

      /* Éclat doré — réservé aux paliers 25/50/100%, discret */
      .dt-milestone-spark {
        position:absolute; width:3px; height:3px;
        background:var(--gold-light,#E8C97A); border-radius:50%;
        pointer-events:none; opacity:0;
        box-shadow:0 0 3px rgba(232,201,122,0.8);
      }
      .dt-milestone-spark.go { animation: dtMilestoneSparkFly 0.65s ease-out forwards; }
      @keyframes dtMilestoneSparkFly {
        0%   { opacity:0.85; transform:translate(-50%,-50%) scale(1); }
        100% { opacity:0; transform:translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.3); }
      }
      @media (prefers-reduced-motion: reduce) {
        .dt-milestone-spark { display:none; }
      }
      .dt-ring-track { fill:none;stroke:rgba(201,168,76,0.08);stroke-width:5; }
      .dt-ring-prog  { fill:none;stroke-width:5;stroke-linecap:round;stroke-dasharray:220;stroke-dashoffset:220;transition:stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1); }
      .dt-ring-s { stroke:var(--gold); }
      .dt-ring-v { stroke:#2C4A3E;filter:drop-shadow(0 0 4px rgba(44,74,62,0.5)); }
      .dt-ring-j { stroke:#8B6914;filter:drop-shadow(0 0 4px rgba(139,105,20,0.4)); }
      .dt-ring-inner { position:relative;z-index:1;display:flex;flex-direction:column;align-items:center; }
      .dt-ring-pct { font-family:'Cinzel',serif;font-size:16px;font-weight:700;color:var(--text);line-height:1; }
      .dt-stat-label { font-family:'Cinzel',serif;font-size:8px;letter-spacing:0.12em;color:rgba(201,168,76,0.75);text-transform:uppercase;text-align:center; }
      .dt-stat-detail { font-family:'Cormorant Garamond',serif;font-style:italic;font-size:12px;color:var(--text2);text-align:center; }

      /* Repliable */
      .dt-section-header { display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none; }
      .dt-section-header .dt-section-title { margin-bottom:0; }
      .dt-detail-btn { display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;border:1px solid rgba(201,168,76,0.25);background:transparent;color:var(--gold);font-family:'Cinzel',serif;font-size:8px;letter-spacing:0.1em;cursor:pointer;transition:all 0.2s; }
      .dt-detail-btn svg { transition:transform 0.3s cubic-bezier(0.4,0,0.2,1); }
      .dt-detail-btn.open svg { transform:rotate(180deg); }
      .dt-collapsible { overflow:hidden;max-height:0;transition:max-height 0.45s cubic-bezier(0.4,0,0.2,1),opacity 0.3s ease;opacity:0; }
      .dt-collapsible.open { max-height:900px;opacity:1; }

      /* Juz grid */
      .dt-juz-section { padding:16px 24px 0; }
      .dt-juz-grid { display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin-top:12px; }
      .dt-juz-item { aspect-ratio:1;border-radius:8px;border:1px solid rgba(201,168,76,0.2);display:flex;align-items:center;justify-content:center;font-family:'Cinzel',serif;font-size:9px;color:rgba(201,168,76,0.5);position:relative;overflow:hidden; }
      .dt-juz-item.done { border-color:var(--gold);background:rgba(201,168,76,0.85);color:#1a2a1a;font-weight:700; }
      .dt-juz-item.done::after { content:'✓';position:absolute;top:1px;right:3px;font-size:8px;color:#fff;opacity:1;font-weight:700; }
      .dt-juz-item.partial { border-color:rgba(201,168,76,0.2);background:rgba(201,168,76,0.04);color:var(--text2); }

      /* Mémorisés */
      .dt-mem-section { padding:16px 24px 0; }
      .dt-mem-list { display:flex;flex-direction:column;gap:8px;margin-top:12px; }
      .dt-mem-item { display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:10px;border:1px solid rgba(201,168,76,0.2);background:rgba(201,168,76,0.03);animation:dtFadeIn 0.4s ease both; }
      @keyframes dtFadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
      .dt-mem-num { width:28px;height:28px;border-radius:50%;border:1px solid rgba(201,168,76,0.3);display:flex;align-items:center;justify-content:center;font-family:'Cinzel',serif;font-size:9px;color:var(--gold);flex-shrink:0; }
      .dt-mem-name { font-family:'Cinzel',serif;font-size:12px;font-weight:600;color:var(--text); }
      .dt-mem-sub  { font-family:'Cormorant Garamond',serif;font-style:italic;font-size:11px;color:rgba(201,168,76,0.65);margin-top:1px; }
      .dt-mem-check { width:20px;height:20px;border-radius:50%;background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.4);display:flex;align-items:center;justify-content:center;flex-shrink:0; }
      .dt-mem-check svg { stroke:var(--gold); }

      /* Profils liste */
      .dt-profiles-section { padding:16px 24px 0; }
      .dt-profile-row { display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:16px;border:1.5px solid rgba(201,168,76,0.2);background:transparent;margin-bottom:8px;cursor:pointer;transition:all 0.2s;position:relative;overflow:hidden; }
      .dt-profile-row::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:transparent;transition:background 0.2s; }
      .dt-profile-row.active-row { border-color:rgba(201,168,76,0.5);background:rgba(201,168,76,0.06); }
      .dt-profile-row.active-row::before { background:var(--gold); }
      .dt-p-name  { font-family:'Cinzel',serif;font-size:13px;font-weight:600;color:var(--text);flex:1; }
      .dt-p-stats { font-family:'Cormorant Garamond',serif;font-style:italic;font-size:11px;color:rgba(201,168,76,0.65);margin-top:2px; }
      .dt-p-dot   { width:8px;height:8px;border-radius:50%;background:var(--gold);box-shadow:0 0 8px rgba(201,168,76,0.5); }
      .dt-p-edit  { background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:8px;color:var(--gold);cursor:pointer;padding:4px 8px;font-size:13px; }
      .dt-add-btn { width:100%;padding:14px;border-radius:16px;border:1.5px solid rgba(201,168,76,0.5);background:rgba(201,168,76,0.1);color:var(--gold);font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.1em;cursor:pointer;transition:all 0.2s;font-weight:600; }

      /* Formulaire */
      .dt-form-input { width:100%;padding:12px 14px;border-radius:12px;border:1.5px solid rgba(201,168,76,0.2);background:rgba(201,168,76,0.04);color:var(--text);font-family:'Cinzel',serif;font-size:14px;box-sizing:border-box;margin-bottom:16px;outline:none; }
      .dt-form-input:focus { border-color:rgba(201,168,76,0.5); }
      .dt-color-dot { width:28px;height:28px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:border 0.2s; }
      .dt-color-dot.selected { border-color:#fff; }
      .dt-save-btn { flex:2;padding:12px;border-radius:12px;border:none;background:linear-gradient(135deg,var(--gold,#C9A84C),#a07020);color:#fff;font-family:'Cinzel',serif;font-size:13px;cursor:pointer;font-weight:600; }
      .dt-cancel-btn { flex:1;padding:12px;border-radius:12px;border:1.5px solid rgba(201,168,76,0.2);background:transparent;color:rgba(201,168,76,0.6);font-family:'Cinzel',serif;font-size:13px;cursor:pointer; }
      .dt-delete-btn { flex:0 0 auto;padding:12px 14px;border-radius:12px;border:1.5px solid rgba(220,80,80,0.3);background:transparent;color:#E05555;font-family:'Cinzel',serif;font-size:12px;cursor:pointer; }

      /* Tabbar avatar */
      #profile-tab-btn .tab-icon { border-radius:0 !important;background:transparent !important;overflow:visible !important; }

      /* ── Modal autonome (fonctionne sur n'importe quelle page) ── */
      .dt-standalone-overlay {
        position:fixed;inset:0;z-index:500;background:rgba(0,0,0,0.55);
        display:none;align-items:flex-end;justify-content:center;
      }
      .dt-standalone-overlay.open { display:flex; }
      .dt-standalone-sheet {
        width:100%;max-width:480px;max-height:88vh;overflow-y:auto;
        background:var(--bg2,#F5F0E3);
        background-image:var(--bg-sheet,none);
        border-radius:24px 24px 0 0;
        border-top:1.5px solid var(--gold,#C9A84C);
        box-shadow:0 -10px 40px rgba(0,0,0,0.35);
        transform:translateY(100%);transition:transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94);
      }
      .dt-standalone-overlay.open .dt-standalone-sheet { transform:translateY(0); }
      .dt-standalone-topbar {
        display:flex;align-items:center;justify-content:space-between;
        padding:14px 16px 0;
      }
      .dt-standalone-title {
        font-family:'Cinzel',serif;font-size:13px;font-weight:600;color:var(--gold);
        letter-spacing:0.1em;text-transform:uppercase;
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Modal autonome : créé en JS, donc indépendant du HTML de la page ── */
  function ensureModalDOM() {
    injectCSS();
    var overlay = document.getElementById('dtStandaloneOverlay');
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.id = 'dtStandaloneOverlay';
    overlay.className = 'dt-standalone-overlay';
    overlay.innerHTML =
      '<div class="dt-standalone-sheet" id="dtStandaloneSheet" onclick="event.stopPropagation()">' +
        '<div class="dt-handle" style="margin:10px auto 0;"></div>' +
        '<div class="dt-standalone-topbar">' +
          '<button class="theme-knob-btn" id="dtStandaloneClose" aria-label="Fermer">' +
            '<div class="theme-knob-btn-inner">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
            '</div>' +
          '</button>' +
          '<div class="dt-standalone-title" id="dtStandaloneTitle"></div>' +
          '<div style="width:40px;"></div>' +
        '</div>' +
        '<div id="dtStandaloneContent"></div>' +
      '</div>';
    overlay.onclick = function () { closeProfileModal(); };
    document.body.appendChild(overlay);
    document.getElementById('dtStandaloneClose').onclick = function () { closeProfileModal(); };
    return overlay;
  }

  /* ── Éclat de célébration (paliers 25/50/100%) ──
     Volontairement discret, réservé aux étapes qui comptent —
     jamais déclenché à chaque petite variation du pourcentage. */
  function ringSparkleBurst(ringId) {
    var ring = document.getElementById(ringId);
    var wrap = ring ? ring.closest('.dt-ring-wrap') : null;
    if (!wrap) return;
    var n = 6;
    for (var i = 0; i < n; i++) {
      (function(i){
        var s = document.createElement('span');
        s.className = 'dt-milestone-spark';
        var angle = (Math.PI * 2 * i) / n + Math.random() * 0.3;
        var dist  = 26 + Math.random() * 14;
        s.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
        s.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
        s.style.left = '50%';
        s.style.top  = '50%';
        wrap.appendChild(s);
        requestAnimationFrame(function(){ s.classList.add('go'); });
        setTimeout(function(){ s.remove(); }, 750);
      })(i);
    }
  }

  /* ── Anneau animé ── */
  function animateRing(ringId, pctId, detId, value, total, milestoneType) {
    var ring  = document.getElementById(ringId);
    var pctEl = document.getElementById(pctId);
    var detEl = document.getElementById(detId);
    if (!ring || !pctEl) return;
    var pct    = Math.round((value / total) * 100);
    var offset = CIRC - (CIRC * pct / 100);
    ring.style.strokeDasharray  = CIRC;
    ring.style.strokeDashoffset = CIRC;
    setTimeout(function(){ ring.style.strokeDashoffset = offset; }, 300);
    var cur = 0; var step = pct / 60;
    var iv = setInterval(function(){
      cur = Math.min(cur + step, pct);
      pctEl.innerHTML = Math.round(cur) + '<span style="font-size:10px;">%</span>';
      if (cur >= pct) { clearInterval(iv); pctEl.innerHTML = pct + '<span style="font-size:10px;">%</span>'; }
    }, 25);
    if (detEl) detEl.textContent = value + ' / ' + total;

    if (milestoneType) {
      var reached = checkNewMilestone(milestoneType, pct);
      if (reached) setTimeout(function(){ ringSparkleBurst(ringId); }, 900);
    }
  }

  /* ── Toggle section ── */
  function toggleSection(id) {
    var col = document.getElementById('dt-collapse-'+id);
    var btn = document.getElementById('dt-btn-'+id);
    if (!col) return;
    var isOpen = col.classList.contains('open');
    col.classList.toggle('open', !isOpen);
    if (btn) btn.classList.toggle('open', !isOpen);
  }
  window.DT._toggleSection = toggleSection;

  /* ── Build modal HTML ── */
  function buildModalHTML() {
    var profile  = getActiveProfile();
    var profiles = loadProfiles();
    var activeId = getActiveId();
    var stats    = window.DT.getStats();
    var prog     = profile ? loadProgress(profile.id) : {};

    // Sourates mémorisées
    var memSurahs = Object.keys(prog).filter(function(k){ return k.startsWith('surah_'); }).map(function(k){
      var id = parseInt(k.replace('surah_',''));
      var verses = Object.keys(prog).filter(function(v){ return v.startsWith('verse_'+id+'_'); }).length;
      var date   = new Date(prog[k].date).toLocaleDateString(getLang(), { day:'numeric', month:'long', year:'numeric' });
      return { id: id, verses: verses, date: date };
    });

    // Invocations mémorisées
    var memDuas = Object.keys(prog).filter(function(k){ return k.startsWith('dua_'); }).map(function(k){
      var rest  = k.replace('dua_','');
      var sep   = rest.indexOf('_');
      var cat   = sep > -1 ? rest.slice(0, sep) : rest;
      var accId = sep > -1 ? rest.slice(sep+1)  : '';
      var label = rest;
      try {
        if (window.DUAS && DUAS[cat] && DUAS[cat][accId] && DUAS[cat][accId].titre) {
          var lang = getLang();
          label = DUAS[cat][accId].titre[lang] || DUAS[cat][accId].titre['fr'] || rest;
        }
      } catch(e) {}
      var date = new Date(prog[k].date).toLocaleDateString(getLang(), { day:'numeric', month:'long', year:'numeric' });
      return { label: label, date: date };
    });

    // Juz done — basé sur les versets réellement mémorisés
    var juzCalc    = calcJuzProgress(prog);
    var juzDone    = juzCalc.done;
    var juzPartial = juzCalc.partial;

    var created = profile && profile.created
      ? new Date(profile.created).toLocaleDateString(getLang(), { month:'long', year:'numeric' })
      : '';

    var html = '';

    // Header
    html += '<div class="dt-profile-header">';
    if (profile) {
      var color   = profile.color || PROFILE_COLORS[0];
      var initial = (profile.name || '?').charAt(0).toUpperCase();
      html += profile.photo
        ? '<div style="width:56px;height:64px;flex-shrink:0;overflow:hidden;clip-path:path(\'M28 1 C28 1 3 14 3 30 L3 59 C3 61.2 4.8 63 7 63 L49 63 C51.2 63 53 61.2 53 59 L53 30 C53 14 28 1 28 1Z\');border:none;"><img src="'+profile.photo+'" style="width:56px;height:64px;object-fit:cover;"></div>'
        : '<div style="flex-shrink:0;">'+domeHTML(initial, color, 56)+'</div>';
      html += '<div style="flex:1;">';
      html += '<div class="dt-active-name">'+profile.name+'</div>';
      if (created) html += '<div class="dt-active-since">'+t('activeSince')+' '+created+'</div>';
      html += '<div class="dt-active-badge">'+t('activeProfile')+'</div>';
      html += '</div>';
      html += '<button class="dt-edit-btn" onclick="window.DT.editProfile(\''+profile.id+'\')">✎</button>';
    }
    html += '</div>';

    // Ornement
    html += '<div class="dt-ornament"><div class="dt-orn-line"></div><span class="dt-orn-star">✦</span><div class="dt-orn-line"></div></div>';

    // Stats
    html += '<div class="dt-stats-section">';
    html += '<div class="dt-section-title">'+t('progress')+'</div>';
    html += '<div class="dt-stats-row">';
    html += '<div class="dt-stat-counter"><div class="dt-ring-wrap"><svg width="68" height="68" viewBox="0 0 80 80"><circle class="dt-ring-track" cx="40" cy="40" r="35"/><circle class="dt-ring-prog dt-ring-s" id="dt-ring-s" cx="40" cy="40" r="35"/></svg><div class="dt-ring-inner"><div class="dt-ring-pct" id="dt-pct-s">0<span style="font-size:10px;">%</span></div></div></div><div class="dt-stat-label">'+t('surasMemorized').split(' ')[0]+'</div><div class="dt-stat-detail" id="dt-det-s">0 / 114</div></div>';
    html += '<div class="dt-stat-counter"><div class="dt-ring-wrap"><svg width="68" height="68" viewBox="0 0 80 80"><circle class="dt-ring-track" cx="40" cy="40" r="35"/><circle class="dt-ring-prog dt-ring-v" id="dt-ring-v" cx="40" cy="40" r="35"/></svg><div class="dt-ring-inner"><div class="dt-ring-pct" id="dt-pct-v">0<span style="font-size:10px;">%</span></div></div></div><div class="dt-stat-label">Versets</div><div class="dt-stat-detail" id="dt-det-v">0 / 6236</div></div>';
    html += '<div class="dt-stat-counter"><div class="dt-ring-wrap"><svg width="68" height="68" viewBox="0 0 80 80"><circle class="dt-ring-track" cx="40" cy="40" r="35"/><circle class="dt-ring-prog dt-ring-j" id="dt-ring-j" cx="40" cy="40" r="35"/></svg><div class="dt-ring-inner"><div class="dt-ring-pct" id="dt-pct-j">0<span style="font-size:10px;">%</span></div></div></div><div class="dt-stat-label">Juz</div><div class="dt-stat-detail" id="dt-det-j">0 / 30</div></div>';
    html += '</div></div>';

    // Ornement
    html += '<div class="dt-ornament"><div class="dt-orn-line"></div><span class="dt-orn-star">✦</span><div class="dt-orn-line"></div></div>';

    // Juz grid (repliable)
    html += '<div class="dt-juz-section">';
    html += '<div class="dt-section-header" onclick="window.DT._toggleSection(\'juz\')">';
    html += '<div style="display:flex;align-items:center;gap:8px;"><div class="dt-section-title">'+t('juzCompleted')+'</div><div class="dt-section-count">'+juzDone.length+' / 30</div></div>';
    html += '<button class="dt-detail-btn" id="dt-btn-juz">'+t('detail')+' <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg></button>';
    html += '</div>';
    html += '<div class="dt-collapsible" id="dt-collapse-juz"><div class="dt-juz-grid">';
    for (var i = 1; i <= 30; i++) {
      var cls = juzDone.indexOf(i) > -1 ? ' done' : juzPartial.indexOf(i) > -1 ? ' partial' : '';
      html += '<div class="dt-juz-item'+cls+'">'+i+'</div>';
    }
    html += '</div></div></div>';

    // Ornement
    html += '<div class="dt-ornament"><div class="dt-orn-line"></div><span class="dt-orn-star">✦</span><div class="dt-orn-line"></div></div>';

    // Sourates mémorisées (repliable)
    html += '<div class="dt-mem-section">';
    html += '<div class="dt-section-header" onclick="window.DT._toggleSection(\'mem\')">';
    html += '<div style="display:flex;align-items:center;gap:8px;"><div class="dt-section-title">'+t('surasMemorized')+'</div><div class="dt-section-count">'+memSurahs.length+' / 114</div></div>';
    html += '<button class="dt-detail-btn" id="dt-btn-mem">'+t('detail')+' <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg></button>';
    html += '</div>';
    html += '<div class="dt-collapsible" id="dt-collapse-mem"><div class="dt-mem-list">';
    if (memSurahs.length === 0) {
      html += '<div style="font-family:Cormorant Garamond,serif;font-style:italic;font-size:13px;color:rgba(201,168,76,0.4);text-align:center;padding:16px;">Aucune sourate mémorisée</div>';
    } else {
      memSurahs.forEach(function(s, i) {
        html += '<div class="dt-mem-item" style="animation-delay:'+(i*0.06)+'s">';
        html += '<div class="dt-mem-num">'+s.id+'</div>';
        html += '<div style="flex:1;"><div class="dt-mem-name">'+(SURAH_NAMES[s.id]||'Sourate '+s.id)+'</div><div class="dt-mem-sub">'+s.date+'</div></div>';
        html += '<div class="dt-mem-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg></div>';
        html += '</div>';
      });
    }
    html += '</div></div></div>';

    // Ornement
    html += '<div class="dt-ornament"><div class="dt-orn-line"></div><span class="dt-orn-star">✦</span><div class="dt-orn-line"></div></div>';

    // Invocations mémorisées (repliable)
    html += '<div class="dt-mem-section">';
    html += '<div class="dt-section-header" onclick="window.DT._toggleSection(\'duas\')">';
    html += '<div class="dt-section-title">'+t('duasMemorized')+'</div>';
    html += '<button class="dt-detail-btn" id="dt-btn-duas">'+t('detail')+' <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg></button>';
    html += '</div>';
    html += '<div class="dt-collapsible" id="dt-collapse-duas"><div class="dt-mem-list">';
    if (memDuas.length === 0) {
      html += '<div style="font-family:Cormorant Garamond,serif;font-style:italic;font-size:13px;color:rgba(201,168,76,0.4);text-align:center;padding:16px;">'+t('noDuaMemorized')+'</div>';
    } else {
      memDuas.forEach(function(d, i) {
        html += '<div class="dt-mem-item" style="animation-delay:'+(i*0.06)+'s">';
        html += '<div class="dt-mem-num">✦</div>';
        html += '<div style="flex:1;"><div class="dt-mem-name">'+d.label+'</div><div class="dt-mem-sub">'+d.date+'</div></div>';
        html += '<div class="dt-mem-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg></div>';
        html += '</div>';
      });
    }
    html += '</div></div></div>';

    // Ornement
    html += '<div class="dt-ornament"><div class="dt-orn-line"></div><span class="dt-orn-star">✦</span><div class="dt-orn-line"></div></div>';

    // Switch profils
    html += '<div class="dt-profiles-section"><div class="dt-section-title">'+t('chooseProfile')+'</div>';
    profiles.forEach(function(p) {
      var isActive = p.id === activeId;
      var pStats   = loadProgress(p.id);
      var pCount   = Object.keys(pStats).length;
      var pColor   = p.color || PROFILE_COLORS[0];
      var pInitial = (p.name || '?').charAt(0).toUpperCase();
      html += '<div class="dt-profile-row'+(isActive?' active-row':'')+'" onclick="window.DT.selectProfile(\''+p.id+'\')">';
      html += '<div style="flex-shrink:0;">'+domeHTML(pInitial, pColor, 36)+'</div>';
      html += '<div style="flex:1;"><div class="dt-p-name">'+p.name+'</div><div class="dt-p-stats">'+pCount+' '+t('memorized').toLowerCase()+'</div></div>';
      if (isActive) html += '<div class="dt-p-dot"></div>';
      html += '<button class="dt-p-edit" onclick="event.stopPropagation();window.DT.editProfile(\''+p.id+'\')">✎</button>';
      html += '</div>';
    });
    if (profiles.length < MAX_PROFILES) {
      html += '<button class="dt-add-btn" onclick="window.DT.addProfile()">+ '+t('addProfile')+'</button>';
    }
    html += '</div>';

    html += '<div style="height:40px;"></div>';
    return html;
  }


  /* ── Swipe to close ── */
  function initSwipeToClose(modal, overlay) {
    var startY      = 0;
    var swipeDY     = 0;
    var swipeActive = false;
    var blocked     = false;

    modal.addEventListener('touchstart', function(e) {
      startY      = e.touches[0].clientY;
      swipeDY     = 0;
      swipeActive = true;
      blocked     = false;
      modal.style.transition = 'none';
    }, { passive: true });

    modal.addEventListener('touchmove', function(e) {
      if (!swipeActive || blocked) return;
      var dy = e.touches[0].clientY - startY;
      if (Math.abs(dy) < 10) return;
      if (dy < 0) { blocked = true; return; }
      if (modal.scrollTop > 5) { blocked = true; return; }
      swipeDY = dy;
      var drag = dy > 100 ? 100 + (dy - 100) * 0.3 : dy;
      modal.style.transform = 'translateY(' + drag + 'px)';
      overlay.style.background = 'rgba(0,0,0,' + Math.max(0, 0.6 - dy / 300) + ')';
    }, { passive: true });

    modal.addEventListener('touchend', function() {
      if (!swipeActive) return;
      swipeActive = false;
      overlay.style.background = '';
      if (swipeDY > 150) {
        closeProfileModal();
      } else {
        modal.style.transition = 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)';
        modal.style.transform  = 'translateY(0)';
        setTimeout(function(){ modal.style.transition = ''; }, 350);
      }
    });
  }

  /* ── Open/Close profile : modal autonome, fonctionne sur toute page ── */
  function openProfileModal() {
    var overlay = ensureModalDOM();
    var titleEl = document.getElementById('dtStandaloneTitle');
    var content = document.getElementById('dtStandaloneContent');
    if (!overlay || !content) return;

    if (titleEl) titleEl.textContent = t('profiles');
    content.innerHTML = buildModalHTML();

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Swipe to close
    var sheet = document.getElementById('dtStandaloneSheet');
    if (sheet && !sheet._swipeInit) {
      initSwipeToClose(sheet, overlay);
      sheet._swipeInit = true;
    }

    // Animer les rings
    var stats    = window.DT.getStats();
    var activeP  = getActiveProfile();
    var prog2    = activeP ? loadProgress(activeP.id) : {};
    var juzDoneCount = calcJuzProgress(prog2).done.length;
    setTimeout(function(){ animateRing('dt-ring-s','dt-pct-s','dt-det-s', stats.surahs, 114, 'surahs'); }, 200);
    setTimeout(function(){ animateRing('dt-ring-v','dt-pct-v','dt-det-v', stats.verses, 6236, 'verses'); }, 400);
    setTimeout(function(){ animateRing('dt-ring-j','dt-pct-j','dt-det-j', juzDoneCount, 30, 'juz'); }, 600);
  }

  function closeProfileModal() {
    if (!loadProfiles().length) {
      var def = {id:uid(),name:t('me'),color:PROFILE_COLORS[0],photo:null,created:new Date().toISOString()};
      saveProfiles([def]); setActiveId(def.id); updateTabbarAvatar();
    }
    var overlay = document.getElementById('dtStandaloneOverlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Formulaire profil ── */
  var _color = null; var _photo = null;

  window.DT.addProfile = function() {
    _color = null; _photo = null; openProfileForm(null);
  };
  window.DT.editProfile = function(id) {
    _color = null; _photo = null;
    var p = loadProfiles().find(function(x){ return x.id === id; });
    if (p) openProfileForm(p);
  };
  window.DT.deleteProfile = function(id) {
    if (!confirm(t('confirmDelete'))) return;
    var profiles = loadProfiles().filter(function(p){ return p.id !== id; });
    saveProfiles(profiles);
    if (getActiveId() === id) setActiveId(profiles.length ? profiles[0].id : null);
    localStorage.removeItem(progressKey(id));
    updateTabbarAvatar(); openProfileModal();
  };
  window.DT.selectProfile = function(id) {
    setActiveId(id); updateTabbarAvatar(); closeProfileModal();
    window.dispatchEvent(new CustomEvent('deentag:profileChanged', { detail:{ id:id } }));
  };

  function openProfileForm(profile, isFirstRun) {
    var overlay = ensureModalDOM();
    var modal   = document.getElementById('dtStandaloneContent');
    var titleEl = document.getElementById('dtStandaloneTitle');
    if (!modal) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    var isEdit   = !!profile;
    if (titleEl) titleEl.textContent = isFirstRun ? t('onboardTitle') : (isEdit ? t('editProfile') : t('addProfile'));
    var profiles = loadProfiles();
    var colorIdx = isEdit ? PROFILE_COLORS.indexOf(profile.color) : profiles.length % PROFILE_COLORS.length;
    if (colorIdx < 0) colorIdx = 0;

    var html = '';
    html += '<div style="padding:20px 24px 0;">';

    if (isFirstRun) {
      html += '<div style="text-align:center;font-size:14px;line-height:1.5;color:var(--gold,#C9A84C);margin-bottom:18px;">' + t('onboardText') + '</div>';
    }

    // Avatar
    html += '<div style="text-align:center;margin-bottom:20px;">';
    html += '<div id="dt-av-preview" style="width:72px;height:82px;margin:0 auto 10px;display:flex;align-items:center;justify-content:center;">';
    html += isEdit ? domeHTML((profile.name||'?').charAt(0).toUpperCase(), profile.color||PROFILE_COLORS[0], 64)
                   : '<div id="dt-av-init">'+domeHTML('?', PROFILE_COLORS[colorIdx], 64)+'</div>';
    html += '</div>';
    html += '<label style="font-size:11px;color:var(--gold);cursor:pointer;letter-spacing:0.05em;">📷 Photo<input type="file" id="dt-photo" accept="image/*" style="display:none;" onchange="window.DT._onPhoto(this)"></label>';
    html += '</div>';

    // Couleurs
    html += '<div style="display:flex;gap:8px;justify-content:center;margin-bottom:18px;">';
    PROFILE_COLORS.forEach(function(c, i){
      html += '<div onclick="window.DT._pickColor(\''+c+'\','+i+')" class="dt-color-dot'+(i===colorIdx?' selected':'')+'" style="background:'+c+';" data-ci="'+i+'"></div>';
    });
    html += '</div>';

    html += '<input id="dt-name" class="dt-form-input" type="text" placeholder="'+t('name')+'" maxlength="20" value="'+(isEdit?profile.name:'')+'">';

    html += '<div style="display:flex;gap:10px;">';
    if (isEdit) html += '<button class="dt-delete-btn" onclick="window.DT.deleteProfile(\''+profile.id+'\')">🗑</button>';
    if (!isFirstRun) html += '<button class="dt-cancel-btn" onclick="window.DT._cancelForm()">'+t('cancel')+'</button>';
    html += '<button class="dt-save-btn" onclick="window.DT._saveForm(\'' + (isEdit && profile ? profile.id : '') + '\')">' + (isFirstRun ? t('onboardCta') : t('save')) + '</button>';
    html += '</div></div><div style="height:40px;"></div>';

    modal.innerHTML = html;
    setTimeout(function(){
      var inp = document.getElementById('dt-name');
      if (inp) { inp.focus(); inp.oninput = window.DT._updateInit; }
    }, 100);
  }

  window.DT._pickColor = function(color, idx) {
    _color = color;
    document.querySelectorAll('.dt-color-dot').forEach(function(el){
      el.classList.toggle('selected', parseInt(el.dataset.ci) === idx);
    });
    var av = document.getElementById('dt-av-preview');
    var nameEl = document.getElementById('dt-name');
    if (av && !_photo) {
      av.innerHTML = domeHTML((nameEl?nameEl.value.charAt(0).toUpperCase():'')||'?', color, 64);
    }
  };
  window.DT._updateInit = function() {
    if (_photo) return;
    var inp = document.getElementById('dt-name');
    var av  = document.getElementById('dt-av-preview');
    if (inp && av) av.innerHTML = domeHTML(inp.value.charAt(0).toUpperCase()||'?', _color||PROFILE_COLORS[0], 64);
  };
  window.DT._onPhoto = function(input) {
    if (!input.files || !input.files[0]) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        var MAX = 200;
        var w = img.width, h = img.height;
        if (w > MAX || h > MAX) {
          var ratio = Math.min(MAX / w, MAX / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        var canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        _photo = canvas.toDataURL('image/jpeg', 0.82);
        var av = document.getElementById('dt-av-preview');
        if (av) av.innerHTML = '<img src="'+_photo+'" style="width:64px;height:73px;object-fit:cover;border-radius:4px;">';
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  };
  window.DT._cancelForm = function() { _color=null; _photo=null; openProfileModal(); };
  window.DT._saveForm = function(editId) {
    var nameEl = document.getElementById('dt-name');
    var name   = nameEl ? nameEl.value.trim() : '';
    if (!name) { if (nameEl) nameEl.style.borderColor='#E05555'; return; }
    var profiles = loadProfiles();
    // Vérification doublon de nom (insensible à la casse)
    var nameLower = name.toLowerCase();
    var isDuplicate = profiles.some(function(p){
      return p.name.toLowerCase() === nameLower && p.id !== editId;
    });
    if (isDuplicate) {
      if (nameEl) { nameEl.style.borderColor='#E05555'; nameEl.placeholder='Ce prénom existe déjà'; }
      return;
    }
    var colorSel = _color || PROFILE_COLORS[profiles.length % PROFILE_COLORS.length];
    var wasFirstRun = !editId && profiles.length === 0;
    if (editId) {
      profiles = profiles.map(function(p){
        return p.id !== editId ? p : Object.assign({},p,{name:name,color:colorSel,photo:_photo!==null?_photo:p.photo});
      });
    } else {
      if (profiles.length >= MAX_PROFILES) return;
      var np = {id:uid(),name:name,color:colorSel,photo:_photo||null,created:new Date().toISOString()};
      profiles.push(np); setActiveId(np.id);
    }
    saveProfiles(profiles);
    _color=null; _photo=null;
    updateTabbarAvatar();
    if (wasFirstRun) { closeProfileModal(); window.dispatchEvent(new CustomEvent('deentag:profileChanged', { detail:{ id: profiles[profiles.length-1].id } })); }
    else { openProfileModal(); }
  };

  /* ── Tabbar avatar ── */
  function defaultIcon() {
    return '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold,#C9A84C)" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>';
  }

  function updateTabbarAvatar() {
    var btn = document.getElementById('profile-tab-btn');
    if (!btn) return;
    var p    = getActiveProfile();
    var icon = btn.querySelector('.tab-icon');
    var lbl  = btn.querySelector('span');
    if (!icon) return;
    if (p) {
      var color   = p.color || PROFILE_COLORS[0];
      var initial = (p.name||'?').charAt(0).toUpperCase();
      icon.innerHTML = p.photo
        ? '<div style="width:44px;height:50px;overflow:hidden;clip-path:path(\'M22 1C22 1 2 11 2 23L2 46C2 47.7 3.3 49 5 49L39 49C40.7 49 42 47.7 42 46L42 23C42 11 22 1 22 1Z\');"><img src="'+p.photo+'" style="width:44px;height:50px;object-fit:cover;"></div>'
        : domeHTML(initial, color, 40);
    } else {
      icon.innerHTML = defaultIcon();
    }
    if (lbl) lbl.textContent = p ? p.name.split(' ')[0] : t('profiles');
  }

  function injectProfileTab() {
    // Sur les pages kids, c'est kids-profiles.js qui gère l'injection
    var page = document.body.getAttribute('data-page');
    if (page === 'kids' || page === 'quran-kids') return;
    if (document.getElementById('profile-tab-btn')) return;
    var tabbar = document.querySelector('.app-tabbar');
    if (!tabbar) return;
    var btn = document.createElement('a');
    btn.id = 'profile-tab-btn'; btn.href='#'; btn.className='tab';
    btn.setAttribute('aria-label', t('profiles'));
    btn.onclick = function(e){ e.preventDefault(); openProfileModal(); };
    var icon = document.createElement('div');
    icon.className = 'tab-icon';
    icon.style.cssText = 'border-radius:0;background:transparent;overflow:visible;';
    icon.innerHTML = defaultIcon();
    var lbl = document.createElement('span');
    lbl.textContent = t('profiles');
    btn.appendChild(icon); btn.appendChild(lbl);
    tabbar.appendChild(btn);
    updateTabbarAvatar();
  }

  /* ── Init ── */
  function init() {
    var profiles = loadProfiles();
    var needsOnboarding = !profiles.length;
    if (!profiles.length) {
      // Pas de création silencieuse : on demande le prénom via le formulaire d'accueil
    } else if (!getActiveId()) { setActiveId(profiles[0].id); }
    injectCSS();
    var n = 0;
    var iv = setInterval(function(){
      n++;
      if (document.querySelector('.app-tabbar')) { clearInterval(iv); injectProfileTab(); }
      else if (n > 30) clearInterval(iv);
    }, 100);
    if (needsOnboarding) {
      setTimeout(function(){ _color=null; _photo=null; openProfileForm(null, true); }, 400);
    }
  }

  if (document.readyState==='loading') { document.addEventListener('DOMContentLoaded',init); }
  else { init(); }

})();

// Fermer la vue profil (bouton X dans la topbar)
function closeProfileView() {
  if (typeof window.closeSheet === 'function') {
    window.closeSheet();
  }
}
