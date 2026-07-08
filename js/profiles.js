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
    fr: { memorized:'Mémorisé',      profiles:'Profils',    addProfile:'Ajouter un profil', editProfile:'Modifier', deleteProfile:'Supprimer', chooseProfile:'Qui êtes-vous ?', name:'Prénom', save:'Enregistrer', cancel:'Annuler', progress:'Progression', surasMemorized:'Sourates mémorisées', confirmDelete:'Supprimer ce profil ?', detail:'Détail', close:'Fermer', activeSince:'Membre depuis', activeProfile:'Profil actif', juzCompleted:'Juz complétés', duasMemorized:'Invocations mémorisées', noDuaMemorized:'Aucune invocation mémorisée', me:'Moi', onboardTitle:'Créez votre profil', onboardText:'Démarrez votre progression personnelle : sourates, invocations, tout ce que vous apprenez sera suivi ici. Comment souhaitez-vous être appelé ?', onboardCta:'Commencer ✓' , thisWeek:'Cette semaine', activeDaysLabel:'jours actifs', itemsLearned:'appris', currentFocus:'En cours', continueLabel:'Continuer', recentActivity:'Activité récente', noRecentActivity:'Aucune activité récente', today:"Aujourd'hui", yesterday:'Hier', surahMemorizedEvent:'Sourate mémorisée', duaMemorizedEvent:'Invocation apprise' },
    en: { memorized:'Memorized',     profiles:'Profiles',   addProfile:'Add profile',        editProfile:'Edit',     deleteProfile:'Delete',    chooseProfile:'Who are you?',     name:'Name',   save:'Save',        cancel:'Cancel',  progress:'Progress',     surasMemorized:'Memorized surahs',    confirmDelete:'Delete this profile?',  detail:'Detail', close:'Close', activeSince:'Member since', activeProfile:'Active profile', juzCompleted:'Completed Juz', duasMemorized:'Memorized supplications', noDuaMemorized:'No supplication memorized yet', me:'Me', onboardTitle:'Create your profile', onboardText:'Start tracking your personal progress: surahs, supplications, and more. What would you like to be called?', onboardCta:'Get started ✓' , thisWeek:'This week', activeDaysLabel:'active days', itemsLearned:'learned', currentFocus:'In progress', continueLabel:'Continue', recentActivity:'Recent activity', noRecentActivity:'No recent activity', today:'Today', yesterday:'Yesterday', surahMemorizedEvent:'Surah memorized', duaMemorizedEvent:'Supplication learned' },
    es: { memorized:'Memorizado',    profiles:'Perfiles',   addProfile:'Añadir perfil',      editProfile:'Editar',   deleteProfile:'Eliminar',  chooseProfile:'¿Quién eres?',     name:'Nombre', save:'Guardar',     cancel:'Cancelar',progress:'Progreso',     surasMemorized:'Suras memorizadas',   confirmDelete:'¿Eliminar este perfil?',detail:'Detalle',close:'Cerrar',activeSince:'Miembro desde',activeProfile:'Perfil activo',juzCompleted:'Juz completados', duasMemorized:'Invocaciones memorizadas', noDuaMemorized:'Ninguna invocación memorizada', me:'Yo', onboardTitle:'Cree su perfil', onboardText:'Este es su espacio para seguir su progreso personal: suras, súplicas, progreso... ¿Cómo desea que le llamemos?', onboardCta:'Empezar ✓' , thisWeek:'Esta semana', activeDaysLabel:'días activos', itemsLearned:'aprendido', currentFocus:'En curso', continueLabel:'Continuar', recentActivity:'Actividad reciente', noRecentActivity:'Sin actividad reciente', today:'Hoy', yesterday:'Ayer', surahMemorizedEvent:'Sura memorizada', duaMemorizedEvent:'Súplica aprendida' },
    de: { memorized:'Auswendig',     profiles:'Profile',    addProfile:'Profil hinzufügen',  editProfile:'Bearbeiten',deleteProfile:'Löschen',  chooseProfile:'Wer bist du?',      name:'Name',   save:'Speichern',   cancel:'Abbrechen',progress:'Fortschritt',  surasMemorized:'Gelernte Suren',      confirmDelete:'Profil löschen?',       detail:'Detail', close:'Schließen',activeSince:'Mitglied seit',activeProfile:'Aktives Profil',juzCompleted:'Abgeschlossene Juz', duasMemorized:'Gelernte Bittgebete', noDuaMemorized:'Noch kein Bittgebet gelernt', me:'Ich', onboardTitle:'Erstellen Sie Ihr Profil', onboardText:'Dies ist Ihr Bereich, um Ihren persönlichen Fortschritt zu verfolgen: Suren, Bittgebete, Fortschritt... Wie möchten Sie genannt werden?', onboardCta:'Loslegen ✓' , thisWeek:'Diese Woche', activeDaysLabel:'aktive Tage', itemsLearned:'gelernt', currentFocus:'In Arbeit', continueLabel:'Weiter', recentActivity:'Letzte Aktivität', noRecentActivity:'Keine aktuelle Aktivität', today:'Heute', yesterday:'Gestern', surahMemorizedEvent:'Sure gelernt', duaMemorizedEvent:'Bittgebet gelernt' },
    it: { memorized:'Memorizzato',   profiles:'Profili',    addProfile:'Aggiungi profilo',   editProfile:'Modifica', deleteProfile:'Elimina',   chooseProfile:'Chi sei?',         name:'Nome',   save:'Salva',       cancel:'Annulla', progress:'Progressi',    surasMemorized:'Sure memorizzate',    confirmDelete:'Eliminare questo profilo?',detail:'Dettaglio',close:'Chiudi',activeSince:'Membro da',activeProfile:'Profilo attivo',juzCompleted:'Juz completati', duasMemorized:'Invocazioni memorizzate', noDuaMemorized:'Nessuna invocazione memorizzata', me:'Io', onboardTitle:'Crei il suo profilo', onboardText:'Questo è il suo spazio per seguire i suoi progressi personali: sure, invocazioni, progressi... Come desidera essere chiamato?', onboardCta:'Inizia ✓' , thisWeek:'Questa settimana', activeDaysLabel:'giorni attivi', itemsLearned:'imparato', currentFocus:'In corso', continueLabel:'Continua', recentActivity:'Attività recente', noRecentActivity:'Nessuna attività recente', today:'Oggi', yesterday:'Ieri', surahMemorizedEvent:'Sura memorizzata', duaMemorizedEvent:'Invocazione imparata' },
    nl: { memorized:'Gememoriseerd', profiles:'Profielen',  addProfile:'Profiel toevoegen',  editProfile:'Bewerken', deleteProfile:'Verwijderen',chooseProfile:'Wie ben jij?',    name:'Naam',   save:'Opslaan',     cancel:'Annuleren',progress:'Voortgang',    surasMemorized:"Gememoriseerde soera's",confirmDelete:'Dit profiel verwijderen?',detail:'Detail',close:'Sluiten',activeSince:'Lid sinds',activeProfile:'Actief profiel',juzCompleted:'Voltooide Juz', duasMemorized:'Gememoriseerde smeekgebeden', noDuaMemorized:'Nog geen smeekgebed gememoriseerd', me:'Ik', onboardTitle:'Maak uw profiel aan', onboardText:'Dit is uw plek om uw persoonlijke voortgang te volgen: soera\'s, smeekbeden, voortgang... Hoe wilt u genoemd worden?', onboardCta:'Beginnen ✓' , thisWeek:'Deze week', activeDaysLabel:'actieve dagen', itemsLearned:'geleerd', currentFocus:'Bezig', continueLabel:'Doorgaan', recentActivity:'Recente activiteit', noRecentActivity:'Geen recente activiteit', today:'Vandaag', yesterday:'Gisteren', surahMemorizedEvent:'Soera gememoriseerd', duaMemorizedEvent:'Smeekgebed geleerd' },
    pt: { memorized:'Memorizado',    profiles:'Perfis',     addProfile:'Adicionar perfil',   editProfile:'Editar',   deleteProfile:'Eliminar',  chooseProfile:'Quem és tu?',      name:'Nome',   save:'Guardar',     cancel:'Cancelar', progress:'Progresso',   surasMemorized:'Suras memorizadas',   confirmDelete:'Eliminar este perfil?', detail:'Detalhe',close:'Fechar',activeSince:'Membro desde',activeProfile:'Perfil ativo',juzCompleted:'Juz concluídos', duasMemorized:'Invocações memorizadas', noDuaMemorized:'Nenhuma invocação memorizada', me:'Eu', onboardTitle:'Crie o seu perfil', onboardText:'Este é o seu espaço para acompanhar o seu progresso pessoal: suras, súplicas, progresso... Como deseja ser chamado?', onboardCta:'Começar ✓' , thisWeek:'Esta semana', activeDaysLabel:'dias ativos', itemsLearned:'aprendido', currentFocus:'Em curso', continueLabel:'Continuar', recentActivity:'Atividade recente', noRecentActivity:'Sem atividade recente', today:'Hoje', yesterday:'Ontem', surahMemorizedEvent:'Sura memorizada', duaMemorizedEvent:'Invocação aprendida' },
    tr: { memorized:'Ezberlenmiş',   profiles:'Profiller',  addProfile:'Profil ekle',        editProfile:'Düzenle',  deleteProfile:'Sil',       chooseProfile:'Sen kimsin?',      name:'İsim',   save:'Kaydet',      cancel:'İptal',    progress:'İlerleme',    surasMemorized:'Ezberlenmiş sureler', confirmDelete:'Bu profili sil?',       detail:'Detay',  close:'Kapat',  activeSince:'Üye tarihi',  activeProfile:'Aktif profil',  juzCompleted:'Tamamlanan Cüzler', duasMemorized:'Ezberlenmiş dualar', noDuaMemorized:'Henüz ezberlenmiş dua yok', me:'Ben', onboardTitle:'Profilinizi oluşturun', onboardText:'Burası kişisel ilerlemenizi takip ettiğiniz alandır: sureler, dualar, ilerleme... Size nasıl hitap edelim?', onboardCta:'Başla ✓', thisWeek:'Bu hafta', activeDaysLabel:'aktif gün', itemsLearned:'öğrenildi', currentFocus:'Devam ediyor', continueLabel:'Devam et', recentActivity:'Son etkinlik', noRecentActivity:'Yakın zamanda etkinlik yok', today:'Bugün', yesterday:'Dün', surahMemorizedEvent:'Sure ezberlendi', duaMemorizedEvent:'Dua ezberlendi' }
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

  /* ── Semaine en cours : jours actifs + éléments appris (7 derniers jours) ── */
  function dayKey(d) { return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate(); }
  function getWeekStats(prog) {
    var now = new Date();
    var cutoff = new Date(now); cutoff.setDate(cutoff.getDate() - 6); cutoff.setHours(0,0,0,0);
    var days = {}; var items = 0;
    Object.keys(prog).forEach(function(k) {
      var e = prog[k]; if (!e || !e.date) return;
      var d = new Date(e.date);
      if (d >= cutoff) {
        if (k.indexOf('surah_') === 0 || k.indexOf('dua_') === 0 || k.indexOf('verse_') === 0) {
          days[dayKey(d)] = true;
          if (k.indexOf('surah_') === 0 || k.indexOf('dua_') === 0) items++;
        }
      }
    });
    return { activeDays: Object.keys(days).length, items: items };
  }

  /* ── Objectif en cours : sourate la plus récemment travaillée, pas encore complète ── */
  function getCurrentFocus(prog) {
    var bySurah = {};
    Object.keys(prog).forEach(function(k) {
      if (k.indexOf('verse_') !== 0) return;
      var rest = k.replace('verse_','');
      var sep  = rest.indexOf('_');
      var sid  = parseInt(rest.slice(0, sep));
      if (!sid) return;
      var e = prog[k];
      if (!bySurah[sid]) bySurah[sid] = { verses:0, lastDate:null };
      bySurah[sid].verses++;
      var d = e && e.date ? new Date(e.date) : null;
      if (d && (!bySurah[sid].lastDate || d > bySurah[sid].lastDate)) bySurah[sid].lastDate = d;
    });
    var bestId = null, bestDate = null;
    Object.keys(bySurah).forEach(function(id) {
      id = parseInt(id);
      var total = SURAH_VERSES[id] || 0;
      if (prog['surah_'+id]) return;
      if (!bestDate || (bySurah[id].lastDate && bySurah[id].lastDate > bestDate)) {
        bestDate = bySurah[id].lastDate; bestId = id;
      }
    });
    if (!bestId) return null;
    var total = SURAH_VERSES[bestId] || 1;
    var done  = bySurah[bestId].verses;
    return { id: bestId, name: SURAH_NAMES[bestId] || ('Sourate '+bestId), done: done, total: total, pct: Math.round(done/total*100) };
  }

  /* ── Activité récente : 5 derniers jalons (sourates + invocations) ── */
  function getRecentActivity(prog) {
    var events = [];
    Object.keys(prog).forEach(function(k) {
      var e = prog[k]; if (!e || !e.date) return;
      if (k.indexOf('surah_') === 0) {
        var sid = parseInt(k.replace('surah_',''));
        events.push({ date: new Date(e.date), label: (SURAH_NAMES[sid]||'Sourate '+sid), kind: 'surah' });
      } else if (k.indexOf('dua_') === 0) {
        var rest = k.replace('dua_','');
        var sep  = rest.indexOf('_');
        var cat  = sep > -1 ? rest.slice(0, sep) : rest;
        var accId= sep > -1 ? rest.slice(sep+1)  : '';
        var label = rest;
        try {
          if (window.DUAS && DUAS[cat] && DUAS[cat][accId] && DUAS[cat][accId].titre) {
            var lang = getLang();
            label = DUAS[cat][accId].titre[lang] || DUAS[cat][accId].titre['fr'] || rest;
          }
        } catch(err) {}
        events.push({ date: new Date(e.date), label: label, kind: 'dua' });
      }
    });
    events.sort(function(a,b){ return b.date - a.date; });
    return events.slice(0, 5);
  }
  function relativeDayLabel(d) {
    var now = new Date();
    var a = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var b = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var diff = Math.round((b - a) / 86400000);
    if (diff === 0) return t('today');
    if (diff === 1) return t('yesterday');
    return d.toLocaleDateString(getLang(), { day:'numeric', month:'short' });
  }
  window.DT.getActiveProfile  = getActiveProfile;
  window.DT.openProfileModal  = openProfileModal;
  window.DT._closeModal = closeProfileModal;
  window.DT._closeProfileView = closeProfileModal;
  window.DT.t                 = t;
  /* ── Méthodes de stockage exposées pour kids-profiles.js ── */
  window.DT._loadProfiles = loadProfiles;
  window.DT._getActiveId  = getActiveId;
  window.DT._setActiveId  = setActiveId;

  /* ── Dôme / arche (contour mesuré sur les illustrations de catégories) ── */
  function domeHTML(initial, color, size) {
    size = size || 40;
    var h = Math.round(size * 86/70);
    return '<svg width="'+size+'" height="'+h+'" viewBox="0 0 70 86" fill="none">' +
      '<path d="M35.00,0.00 L35.68,0.61 L36.13,1.22 L36.44,1.84 L36.89,2.45 L37.34,3.06 L37.80,3.67 L38.25,4.28 L38.86,4.90 L39.46,5.51 L40.06,6.12 L40.82,6.73 L41.58,7.35 L42.33,7.96 L43.24,8.57 L44.00,9.18 L44.90,9.79 L45.81,10.41 L46.57,11.02 L47.47,11.63 L48.38,12.24 L49.14,12.85 L50.04,13.47 L50.80,14.08 L51.56,14.69 L52.16,15.30 L52.92,15.91 L53.37,16.53 L53.97,17.14 L54.43,17.75 L54.88,18.36 L55.33,18.98 L55.64,19.59 L56.09,20.20 L56.39,20.81 L56.70,21.42 L56.85,22.04 L57.15,22.65 L57.30,23.26 L57.45,23.87 L57.60,24.48 L57.75,25.10 L57.90,25.71 L57.90,26.32 L58.81,26.93 L60.02,27.54 L61.08,28.16 L61.99,28.77 L62.74,29.38 L63.50,29.99 L64.10,30.60 L64.71,31.22 L65.31,31.83 L65.77,32.44 L66.22,33.05 L66.67,33.67 L67.13,34.28 L67.43,34.89 L67.73,35.50 L68.03,36.11 L68.34,36.73 L68.64,37.34 L68.79,37.95 L69.09,38.56 L69.24,39.17 L69.40,39.79 L69.55,40.40 L69.70,41.01 L69.70,41.62 L69.85,42.23 L69.85,42.85 L70.00,43.46 L70.00,44.07 L70.00,44.68 L70.00,45.30 L70.00,81.70 Q70.00,86.00 65.70,86.00 L4.30,86.00 Q0.00,86.00 0.00,81.70 L0.00,45.30 L0.00,44.68 L0.00,44.07 L0.00,43.46 L0.15,42.85 L0.15,42.23 L0.30,41.62 L0.30,41.01 L0.45,40.40 L0.60,39.79 L0.76,39.17 L0.91,38.56 L1.21,37.95 L1.36,37.34 L1.66,36.73 L1.97,36.11 L2.27,35.50 L2.57,34.89 L2.87,34.28 L3.33,33.67 L3.78,33.05 L4.23,32.44 L4.69,31.83 L5.29,31.22 L5.90,30.60 L6.50,29.99 L7.26,29.38 L8.01,28.77 L8.92,28.16 L9.98,27.54 L11.19,26.93 L12.10,26.32 L12.10,25.71 L12.25,25.10 L12.40,24.48 L12.55,23.87 L12.70,23.26 L12.85,22.65 L13.15,22.04 L13.30,21.42 L13.61,20.81 L13.91,20.20 L14.36,19.59 L14.67,18.98 L15.12,18.36 L15.57,17.75 L16.03,17.14 L16.63,16.53 L17.08,15.91 L17.84,15.30 L18.44,14.69 L19.20,14.08 L19.96,13.47 L20.86,12.85 L21.62,12.24 L22.53,11.63 L23.43,11.02 L24.19,10.41 L25.10,9.79 L26.00,9.18 L26.76,8.57 L27.67,7.96 L28.42,7.35 L29.18,6.73 L29.94,6.12 L30.54,5.51 L31.14,4.90 L31.75,4.28 L32.20,3.67 L32.66,3.06 L33.11,2.45 L33.56,1.84 L33.87,1.22 L34.32,0.61 Z" fill="#E2C97E"/>' +
      '<path d="M35.00,3.50 L35.62,4.06 L36.04,4.62 L36.31,5.19 L36.73,5.75 L37.14,6.31 L37.56,6.87 L37.97,7.44 L38.52,8.00 L39.08,8.56 L39.63,9.12 L40.32,9.69 L41.01,10.25 L41.70,10.81 L42.53,11.37 L43.22,11.93 L44.05,12.50 L44.88,13.06 L45.57,13.62 L46.40,14.18 L47.23,14.75 L47.92,15.31 L48.75,15.87 L49.44,16.43 L50.14,16.99 L50.69,17.56 L51.38,18.12 L51.79,18.68 L52.35,19.24 L52.76,19.81 L53.18,20.37 L53.59,20.93 L53.87,21.49 L54.28,22.06 L54.56,22.62 L54.84,23.18 L54.97,23.74 L55.25,24.30 L55.39,24.87 L55.53,25.43 L55.67,25.99 L55.80,26.55 L55.94,27.12 L55.94,27.68 L56.77,28.24 L57.88,28.80 L58.84,29.36 L59.67,29.93 L60.37,30.49 L61.06,31.05 L61.61,31.61 L62.16,32.18 L62.71,32.74 L63.13,33.30 L63.54,33.86 L63.96,34.43 L64.37,34.99 L64.65,35.55 L64.93,36.11 L65.20,36.67 L65.48,37.24 L65.76,37.80 L65.89,38.36 L66.17,38.92 L66.31,39.49 L66.45,40.05 L66.59,40.61 L66.72,41.17 L66.72,41.73 L66.86,42.30 L66.86,42.86 L67.00,43.42 L67.00,43.98 L67.00,44.55 L67.00,45.11 L67.00,78.55 Q67.00,82.50 63.05,82.50 L6.95,82.50 Q3.00,82.50 3.00,78.55 L3.00,45.11 L3.00,44.55 L3.00,43.98 L3.00,43.42 L3.14,42.86 L3.14,42.30 L3.28,41.73 L3.28,41.17 L3.41,40.61 L3.55,40.05 L3.69,39.49 L3.83,38.92 L4.11,38.36 L4.24,37.80 L4.52,37.24 L4.80,36.67 L5.07,36.11 L5.35,35.55 L5.63,34.99 L6.04,34.43 L6.46,33.86 L6.87,33.30 L7.29,32.74 L7.84,32.18 L8.39,31.61 L8.94,31.05 L9.63,30.49 L10.33,29.93 L11.16,29.36 L12.12,28.80 L13.23,28.24 L14.06,27.68 L14.06,27.12 L14.20,26.55 L14.33,25.99 L14.47,25.43 L14.61,24.87 L14.75,24.30 L15.03,23.74 L15.16,23.18 L15.44,22.62 L15.72,22.06 L16.13,21.49 L16.41,20.93 L16.82,20.37 L17.24,19.81 L17.65,19.24 L18.21,18.68 L18.62,18.12 L19.31,17.56 L19.86,16.99 L20.56,16.43 L21.25,15.87 L22.08,15.31 L22.77,14.75 L23.60,14.18 L24.43,13.62 L25.12,13.06 L25.95,12.50 L26.78,11.93 L27.47,11.37 L28.30,10.81 L28.99,10.25 L29.68,9.69 L30.37,9.12 L30.92,8.56 L31.48,8.00 L32.03,7.44 L32.44,6.87 L32.86,6.31 L33.27,5.75 L33.69,5.19 L33.96,4.62 L34.38,4.06 Z" fill="'+color+'"/>' +
      '<text x="35" y="59" text-anchor="middle" font-family="Cinzel,serif" font-weight="700" font-size="27" fill="white">'+initial+'</text>' +
      '</svg>';
  }

  /* ── Tracé de l'arche (mêmes proportions) pour un clip-path CSS, à une taille w×h donnée ── */
  function archClipPath(w, h) {
    var paths = {
      '56x68': 'M28.00,0 L28.54,0.48 L28.91,0.97 L29.15,1.45 L29.51,1.94 L29.87,2.42 L30.24,2.90 L30.60,3.39 L31.08,3.87 L31.57,4.36 L32.05,4.84 L32.66,5.32 L33.26,5.81 L33.87,6.29 L34.59,6.78 L35.20,7.26 L35.92,7.74 L36.65,8.23 L37.25,8.71 L37.98,9.20 L38.70,9.68 L39.31,10.16 L40.03,10.65 L40.64,11.13 L41.24,11.62 L41.73,12.10 L42.33,12.58 L42.70,13.07 L43.18,13.55 L43.54,14.04 L43.90,14.52 L44.27,15.00 L44.51,15.49 L44.87,15.97 L45.11,16.46 L45.36,16.94 L45.48,17.42 L45.72,17.91 L45.84,18.39 L45.96,18.88 L46.08,19.36 L46.20,19.84 L46.32,20.33 L46.32,20.81 L47.05,21.30 L48.02,21.78 L48.86,22.26 L49.59,22.75 L50.19,23.23 L50.80,23.72 L51.28,24.20 L51.77,24.68 L52.25,25.17 L52.61,25.65 L52.98,26.14 L53.34,26.62 L53.70,27.10 L53.94,27.59 L54.19,28.07 L54.43,28.56 L54.67,29.04 L54.91,29.52 L55.03,30.01 L55.27,30.49 L55.40,30.98 L55.52,31.46 L55.64,31.94 L55.76,32.43 L55.76,32.91 L55.88,33.40 L55.88,33.88 L56.00,34.36 L56.00,34.85 L56.00,35.33 L56.00,35.81 L56.00,64.60 Q56.00,68.00 52.60,68.00 L3.40,68.00 Q0.00,68.00 0.00,64.60 L0.00,35.81 L0.00,35.33 L0.00,34.85 L0.00,34.36 L0.12,33.88 L0.12,33.40 L0.24,32.91 L0.24,32.43 L0.36,31.94 L0.48,31.46 L0.60,30.98 L0.73,30.49 L0.97,30.01 L1.09,29.52 L1.33,29.04 L1.57,28.56 L1.81,28.07 L2.06,27.59 L2.30,27.10 L2.66,26.62 L3.02,26.14 L3.39,25.65 L3.75,25.17 L4.23,24.68 L4.72,24.20 L5.20,23.72 L5.81,23.23 L6.41,22.75 L7.14,22.26 L7.98,21.78 L8.95,21.30 L9.68,20.81 L9.68,20.33 L9.80,19.84 L9.92,19.36 L10.04,18.88 L10.16,18.39 L10.28,17.91 L10.52,17.42 L10.64,16.94 L10.89,16.46 L11.13,15.97 L11.49,15.49 L11.73,15.00 L12.10,14.52 L12.46,14.04 L12.82,13.55 L13.30,13.07 L13.67,12.58 L14.27,12.10 L14.76,11.62 L15.36,11.13 L15.97,10.65 L16.69,10.16 L17.30,9.68 L18.02,9.20 L18.75,8.71 L19.35,8.23 L20.08,7.74 L20.80,7.26 L21.41,6.78 L22.13,6.29 L22.74,5.81 L23.34,5.32 L23.95,4.84 L24.43,4.36 L24.92,3.87 L25.40,3.39 L25.76,2.90 L26.13,2.42 L26.49,1.94 L26.85,1.45 L27.09,0.97 L27.46,0.48 Z',
      '44x53': 'M22.00,0 L22.43,0.38 L22.71,0.75 L22.90,1.13 L23.19,1.51 L23.47,1.89 L23.76,2.26 L24.04,2.64 L24.42,3.02 L24.80,3.40 L25.18,3.77 L25.66,4.15 L26.13,4.53 L26.61,4.90 L27.18,5.28 L27.65,5.66 L28.22,6.04 L28.79,6.41 L29.27,6.79 L29.84,7.17 L30.41,7.54 L30.89,7.92 L31.46,8.30 L31.93,8.68 L32.41,9.05 L32.79,9.43 L33.26,9.81 L33.55,10.19 L33.93,10.56 L34.21,10.94 L34.50,11.32 L34.78,11.69 L34.97,12.07 L35.26,12.45 L35.45,12.83 L35.64,13.20 L35.73,13.58 L35.92,13.96 L36.02,14.33 L36.11,14.71 L36.21,15.09 L36.30,15.47 L36.40,15.84 L36.40,16.22 L36.97,16.60 L37.73,16.98 L38.39,17.35 L38.96,17.73 L39.44,18.11 L39.91,18.48 L40.29,18.86 L40.67,19.24 L41.05,19.62 L41.34,19.99 L41.62,20.37 L41.91,20.75 L42.19,21.12 L42.38,21.50 L42.57,21.88 L42.76,22.26 L42.95,22.63 L43.14,23.01 L43.24,23.39 L43.43,23.77 L43.52,24.14 L43.62,24.52 L43.71,24.90 L43.81,25.27 L43.81,25.65 L43.90,26.03 L43.90,26.41 L44.00,26.78 L44.00,27.16 L44.00,27.54 L44.00,27.91 L44.00,50.35 Q44.00,53.00 41.35,53.00 L2.65,53.00 Q0.00,53.00 0.00,50.35 L0.00,27.91 L0.00,27.54 L0.00,27.16 L0.00,26.78 L0.10,26.41 L0.10,26.03 L0.19,25.65 L0.19,25.27 L0.29,24.90 L0.38,24.52 L0.48,24.14 L0.57,23.77 L0.76,23.39 L0.86,23.01 L1.05,22.63 L1.24,22.26 L1.43,21.88 L1.62,21.50 L1.81,21.12 L2.09,20.75 L2.38,20.37 L2.66,19.99 L2.95,19.62 L3.33,19.24 L3.71,18.86 L4.09,18.48 L4.56,18.11 L5.04,17.73 L5.61,17.35 L6.27,16.98 L7.03,16.60 L7.60,16.22 L7.60,15.84 L7.70,15.47 L7.79,15.09 L7.89,14.71 L7.98,14.33 L8.08,13.96 L8.27,13.58 L8.36,13.20 L8.55,12.83 L8.74,12.45 L9.03,12.07 L9.22,11.69 L9.50,11.32 L9.79,10.94 L10.07,10.56 L10.45,10.19 L10.74,9.81 L11.21,9.43 L11.59,9.05 L12.07,8.68 L12.54,8.30 L13.11,7.92 L13.59,7.54 L14.16,7.17 L14.73,6.79 L15.21,6.41 L15.78,6.04 L16.35,5.66 L16.82,5.28 L17.39,4.90 L17.87,4.53 L18.34,4.15 L18.82,3.77 L19.20,3.40 L19.58,3.02 L19.96,2.64 L20.24,2.26 L20.53,1.89 L20.81,1.51 L21.10,1.13 L21.29,0.75 L21.57,0.38 Z'
    };
    return paths[w+'x'+h] || paths['56x68'];
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

      /* Objectif en cours */
      .dt-focus-section { margin:16px 24px 0;padding:16px;border-radius:16px;border:1.5px solid rgba(201,168,76,0.4);background:linear-gradient(135deg,rgba(201,168,76,0.10),rgba(201,168,76,0.03));cursor:pointer;transition:border-color 0.2s; }
      .dt-focus-section:active { border-color:rgba(201,168,76,0.7); }
      .dt-focus-top { display:flex;align-items:center;justify-content:space-between;margin-bottom:10px; }
      .dt-focus-cta { display:inline-flex;align-items:center;gap:3px;font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.08em;color:var(--gold);text-transform:uppercase; }
      .dt-focus-name { font-family:'Cinzel',serif;font-size:15px;font-weight:700;color:var(--text);margin-bottom:10px; }
      .dt-focus-bar-track { width:100%;height:6px;border-radius:4px;background:rgba(201,168,76,0.12);overflow:hidden; }
      .dt-focus-bar-fill { height:100%;border-radius:4px;background:linear-gradient(90deg,var(--gold,#C9A84C),#E8C97A);transition:width 0.6s cubic-bezier(0.4,0,0.2,1); }
      .dt-focus-sub { font-family:'Cormorant Garamond',serif;font-style:italic;font-size:12px;color:rgba(201,168,76,0.75);margin-top:8px; }

      /* Activité récente */
      .dt-activity-section { padding:16px 24px 0; }
      .dt-activity-list { display:flex;flex-direction:column;gap:8px;margin-top:12px; }
      .dt-activity-item { display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:10px;border:1px solid rgba(201,168,76,0.15);background:rgba(201,168,76,0.02); }
      .dt-activity-icon { width:26px;height:26px;border-radius:50%;background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);color:var(--gold);display:flex;align-items:center;justify-content:center;flex-shrink:0; }
      .dt-activity-label { font-family:'Cinzel',serif;font-size:12px;font-weight:600;color:var(--text); }
      .dt-activity-sub { font-family:'Cormorant Garamond',serif;font-style:italic;font-size:11px;color:rgba(201,168,76,0.65);margin-top:1px; }
      .dt-activity-date { font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.05em;color:rgba(201,168,76,0.55);flex-shrink:0;white-space:nowrap; }
      .dt-activity-empty { font-family:'Cormorant Garamond',serif;font-style:italic;font-size:13px;color:rgba(201,168,76,0.4);text-align:center;padding:16px;margin-top:12px; }

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
    var weekStats = getWeekStats(prog);
    var focus     = getCurrentFocus(prog);
    var activity  = getRecentActivity(prog);

    if (profile) {
      var color   = profile.color || PROFILE_COLORS[0];
      var initial = (profile.name || '?').charAt(0).toUpperCase();
      html += profile.photo
        ? '<div style="width:56px;height:68px;flex-shrink:0;overflow:hidden;clip-path:path(\''+archClipPath(56,68)+'\');border:none;"><img src="'+profile.photo+'" style="width:56px;height:68px;object-fit:cover;"></div>'
        : '<div style="flex-shrink:0;">'+domeHTML(initial, color, 56)+'</div>';
      html += '<div style="flex:1;">';
      html += '<div class="dt-active-name">'+profile.name+'</div>';
      if (weekStats.activeDays > 0) {
        html += '<div class="dt-active-since">'+t('thisWeek')+' · '+weekStats.activeDays+' '+t('activeDaysLabel')+(weekStats.items > 0 ? ' · '+weekStats.items+' '+t('itemsLearned') : '')+'</div>';
      } else if (created) {
        html += '<div class="dt-active-since">'+t('activeSince')+' '+created+'</div>';
      }
      html += '</div>';
      html += '<button class="dt-edit-btn" onclick="window.DT.editProfile(\''+profile.id+'\')">✎</button>';
    }
    html += '</div>';

    // Ornement
    html += '<div class="dt-ornament"><div class="dt-orn-line"></div><span class="dt-orn-star">✦</span><div class="dt-orn-line"></div></div>';

    // Objectif en cours
    if (focus) {
      html += '<div class="dt-focus-section" onclick="window.location.href=\'quran.html?sourate='+focus.id+'\'">';
      html += '<div class="dt-focus-top"><div class="dt-section-title" style="margin-bottom:0;">'+t('currentFocus')+'</div><div class="dt-focus-cta">'+t('continueLabel')+' <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="9 6 15 12 9 18"/></svg></div></div>';
      html += '<div class="dt-focus-name">'+focus.name+'</div>';
      html += '<div class="dt-focus-bar-track"><div class="dt-focus-bar-fill" style="width:'+focus.pct+'%;"></div></div>';
      html += '<div class="dt-focus-sub">'+focus.done+' / '+focus.total+' · '+focus.pct+'%</div>';
      html += '</div>';
      html += '<div class="dt-ornament"><div class="dt-orn-line"></div><span class="dt-orn-star">✦</span><div class="dt-orn-line"></div></div>';
    }

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

    // Activité récente
    html += '<div class="dt-activity-section">';
    html += '<div class="dt-section-title">'+t('recentActivity')+'</div>';
    if (activity.length === 0) {
      html += '<div class="dt-activity-empty">'+t('noRecentActivity')+'</div>';
    } else {
      html += '<div class="dt-activity-list">';
      activity.forEach(function(ev) {
        var icon = ev.kind === 'surah'
          ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
          : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
        var evLabel = ev.kind === 'surah' ? t('surahMemorizedEvent') : t('duaMemorizedEvent');
        html += '<div class="dt-activity-item">';
        html += '<div class="dt-activity-icon">'+icon+'</div>';
        html += '<div style="flex:1;"><div class="dt-activity-label">'+ev.label+'</div><div class="dt-activity-sub">'+evLabel+'</div></div>';
        html += '<div class="dt-activity-date">'+relativeDayLabel(ev.date)+'</div>';
        html += '</div>';
      });
      html += '</div>';
    }
    html += '</div>';

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
    if (!localStorage.getItem('deentag_onboarding_done')) {
      localStorage.setItem('deentag_onboarding_done', '1');
      var profiles0 = loadProfiles();
      _color = null; _photo = null;
      openProfileForm(profiles0[0] || null, true);
      return;
    }
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
    updateTabbarAvatar();
    if (!profiles.length) { _color = null; _photo = null; openProfileForm(null, true); }
    else { openProfileModal(); }
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
    if (isEdit && !isFirstRun) html += '<button class="dt-delete-btn" onclick="window.DT.deleteProfile(\''+profile.id+'\')">🗑</button>';
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
        ? '<div style="width:44px;height:53px;overflow:hidden;clip-path:path(\''+archClipPath(44,53)+'\');"><img src="'+p.photo+'" style="width:44px;height:53px;object-fit:cover;"></div>'
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
    if (profiles.length && !getActiveId()) { setActiveId(profiles[0].id); }
    injectCSS();
    var n = 0;
    var iv = setInterval(function(){
      n++;
      if (document.querySelector('.app-tabbar')) { clearInterval(iv); injectProfileTab(); }
      else if (n > 30) clearInterval(iv);
    }, 100);
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
