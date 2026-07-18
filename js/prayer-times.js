// ===== DEENTAG — HORAIRES DE PRIÈRE + CALENDRIER =====
// API gratuite Aladhan (sans clé). Méthode 3 = Ligue Islamique Mondiale.
// Reverse geocoding gratuit BigDataCloud (sans clé) pour le nom de ville.
(function () {

  var PRAYER_ORDER = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  var CACHE_KEY   = 'deentag_prayer_today_v2';
  var LOC_KEY     = 'deentag_prayer_loc';
  var MONTH_CACHE_PREFIX = 'deentag_prayer_month_v2_';
  var METHOD = 3; // Muslim World League

  var currentTimings = null; // today's timings (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha)
  var tickerId = null;
  var countdownTimeoutId = null;
  var nextPrayerTarget = null; // Date object: exact moment of the next prayer
  var userLoc = null; // {lat, lon}
  var calState = { year: null, month: null }; // currently displayed month in panel

  // ---------- i18n ----------
  var MSG_ERROR = {
    fr: "Impossible de récupérer les horaires. Réessayez.",
    en: "Couldn't load prayer times. Try again.",
    es: "No se pudieron cargar los horarios. Inténtalo de nuevo.",
    de: "Gebetszeiten konnten nicht geladen werden. Erneut versuchen.",
    it: "Impossibile caricare gli orari. Riprova.",
    nl: "Kon gebedstijden niet laden. Probeer opnieuw.",
    pt: "Não foi possível carregar os horários. Tente novamente.",
    tr: "Namaz vakitleri yüklenemedi. Tekrar deneyin."
  };
  var MSG_PERMISSION = {
    fr: "Localisation refusée. Activez-la pour voir les horaires de votre ville.",
    en: "Location denied. Enable it to see your city's prayer times.",
    es: "Ubicación denegada. Actívala para ver los horarios de tu ciudad.",
    de: "Standort abgelehnt. Aktivieren Sie ihn für die Gebetszeiten Ihrer Stadt.",
    it: "Posizione negata. Attivala per vedere gli orari della tua città.",
    nl: "Locatie geweigerd. Schakel dit in voor de gebedstijden van jouw stad.",
    pt: "Localização negada. Ative-a para ver os horários da sua cidade.",
    tr: "Konum reddedildi. Şehrinizin namaz vakitlerini görmek için etkinleştirin."
  };
  var DOW_LABELS = {
    fr: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
    en: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    es: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
    de: ['So','Mo','Di','Mi','Do','Fr','Sa'],
    it: ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],
    nl: ['Zo','Ma','Di','Wo','Do','Vr','Za'],
    pt: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
    tr: ['Paz','Pzt','Sal','Çar','Per','Cum','Cmt']
  };
  var HIJRI_MONTHS = {
    fr: ['Mouharram','Safar','Rabi al-Awwal','Rabi al-Thani','Joumada al-Oula','Joumada al-Thania','Rajab','Chaabane','Ramadan','Chawwal','Dhou al-Qi\u2018da','Dhou al-Hijja'],
    en: ['Muharram','Safar','Rabi al-Awwal','Rabi al-Thani','Jumada al-Awwal','Jumada al-Thani','Rajab','Sha\u2018ban','Ramadan','Shawwal','Dhu al-Qi\u2018dah','Dhu al-Hijjah'],
    es: ['Muharram','Safar','Rabi al-Awwal','Rabi al-Zani','Yumada al-Ula','Yumada al-Zania','Rayab','Sha\u2018ban','Ramad\u00e1n','Shawwal','Du al-Qa\u2019da','Du al-Hiyya'],
    de: ['Muharram','Safar','Rabi al-Awwal','Rabi ath-Thani','Dschumada al-Ula','Dschumada ath-Thania','Rajab','Schaaban','Ramadan','Schawwal','Dhu l-Qi\u2018da','Dhu l-Hiddscha'],
    it: ['Muharram','Safar','Rabi al-Awwal','Rabi al-Thani','Jumada al-Awwal','Jumada al-Thani','Rajab','Sha\u2018ban','Ramadan','Shawwal','Dhu al-Qi\u2018da','Dhu al-Hijja'],
    nl: ['Moeharram','Safar','Rabi al-Awwal','Rabi al-Thani','Jumada al-Oela','Jumada al-Thania','Rajab','Sha\u2018ban','Ramadan','Sjawwal','Dhoe al-Qi\u2018da','Dhoe al-Hijja'],
    pt: ['Muharram','Safar','Rabi al-Awwal','Rabi al-Thani','Jumada al-Awwal','Jumada al-Thani','Rajab','Sha\u2018ban','Ramad\u00e3o','Shawwal','Dhu al-Qi\u2018dah','Dhu al-Hijjah'],
    tr: ['Muharrem','Safer','Rebi\u00fclevvel','Rebi\u00fclahir','Cem\u00e2ziyelevvel','Cem\u00e2ziyelahir','Recep','\u015eaban','Ramazan','\u015eevval','Zilkade','Zilhicce']
  };
  var GREG_MONTHS = {
    fr: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    es: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    de: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    it: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
    nl: ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'],
    pt: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    tr: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık']
  };
  var ARABIC_DIGITS = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];

  function lang() {
    return (window.getLang ? window.getLang() : (localStorage.getItem('deentag_lang') || 'fr'));
  }
  function toArabicDigits(n) {
    return String(n).split('').map(function (d) { return ARABIC_DIGITS[+d] || d; }).join('');
  }

  // ---------- helpers stockage ----------
  function loadJSON(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); }
    catch (e) { return null; }
  }
  function saveJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); }
    catch (e) {}
  }
  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
  function cleanTime(t) { return (t || '--:--').split(' ')[0]; }
  function minutesFromTime(t) {
    var p = cleanTime(t).split(':');
    return (+p[0]) * 60 + (+p[1]);
  }

  // ---------- UI helpers ----------
  function setError(msg) {
    var el = document.getElementById('prayerError');
    if (!el) return;
    if (msg) { el.textContent = msg; el.style.display = 'block'; }
    else { el.style.display = 'none'; }
  }
  function showLocateBtn(show) {
    var btn = document.getElementById('prayerLocateBtn');
    if (btn) btn.style.display = show ? 'inline-flex' : 'none';
  }

  // ---------- jauge segmentée ----------
  function buildTrackSkeleton() {
    var track = document.getElementById('pgTrack');
    if (!track) return;
    track.innerHTML = '';
    PRAYER_ORDER.forEach(function (key) {
      var seg = document.createElement('div');
      seg.className = 'pg-seg';
      seg.setAttribute('data-key', key);
      var fill = document.createElement('div');
      fill.className = 'pg-seg-fill';
      fill.style.width = '0%';
      var pt = document.createElement('div');
      pt.className = 'pg-pt';
      var label = document.createElement('div');
      label.className = 'pg-label';
      label.textContent = prayerLabel(key, lang());
      var time = document.createElement('div');
      time.className = 'pg-label-time';
      time.textContent = '--:--';
      seg.appendChild(fill);
      seg.appendChild(pt);
      seg.appendChild(label);
      seg.appendChild(time);
      track.appendChild(seg);
    });
  }

  var PRAYER_LABELS_MAP = {
    fr: { Fajr:'Fajr', Dhuhr:'Dhuhr', Asr:'Asr', Maghrib:'Maghrib', Isha:'Isha' },
    en: { Fajr:'Fajr', Dhuhr:'Dhuhr', Asr:'Asr', Maghrib:'Maghrib', Isha:'Isha' },
    es: { Fajr:'Fayr', Dhuhr:'Dhuhr', Asr:'Asr', Maghrib:'Magrib', Isha:'Isha' },
    de: { Fajr:'Fajr', Dhuhr:'Dhuhr', Asr:'Asr', Maghrib:'Maghrib', Isha:'Isha' },
    it: { Fajr:'Fajr', Dhuhr:'Dhuhr', Asr:'Asr', Maghrib:'Maghrib', Isha:'Isha' },
    nl: { Fajr:'Fajr', Dhuhr:'Dhuhr', Asr:'Asr', Maghrib:'Maghrib', Isha:'Isha' },
    pt: { Fajr:'Fajr', Dhuhr:'Dhuhr', Asr:'Asr', Maghrib:'Magrebe', Isha:'Isha' },
    tr: { Fajr:'İmsak', Dhuhr:'Öğle', Asr:'İkindi', Maghrib:'Akşam', Isha:'Yatsı' }
  };
  function prayerLabel(key, L) {
    return (PRAYER_LABELS_MAP[L] && PRAYER_LABELS_MAP[L][key]) || key;
  }

  var COUNTDOWN_PREFIX = {
    fr: 'dans', en: 'in', es: 'en', de: 'in', it: 'tra', nl: 'over', pt: 'em'
    // tr: géré à part dans formatCountdown() — le mot se place après l'heure, pas avant
  };

  function updateGauge(timings) {
    if (!document.getElementById('pgTrack')) return;
    if (!document.querySelector('.pg-seg')) buildTrackSkeleton();

    var now = new Date();
    var nowMin = now.getHours() * 60 + now.getMinutes();
    var bounds = PRAYER_ORDER.map(function (k) { return minutesFromTime(timings[k]); });

    // On travaille sur une timeline relative au Fajr du jour (0 = Fajr, 1440 = Fajr du lendemain).
    // Ça évite de confondre "avant Isha ce midi" et "après minuit, avant Fajr" — les deux cas où
    // l'heure actuelle est "avant" l'heure d'Isha en minutes brutes, mais qui sont très différents.
    var fajrAbs = bounds[0];
    // On rend rel[] strictement croissant : en été aux latitudes élevées (ex. Bretagne),
    // Isha (et parfois Maghrib) peut tomber après minuit, donc numériquement AVANT Fajr.
    // Sans ce "déroulement", les segments Maghrib/Isha se cassent et s'affichent comme
    // "en cours" n'importe quand dans la journée.
    var rel = [0];
    for (var ri = 1; ri < bounds.length; ri++) {
      var diff = bounds[ri] - fajrAbs;
      while (diff <= rel[ri - 1]) diff += 24 * 60;
      rel.push(diff);
    }
    var nowRel = nowMin - fajrAbs;
    if (nowRel < 0) nowRel += 24 * 60;

    var segs = document.querySelectorAll('.pg-seg');
    var nextKey = null;
    var L = lang();

    segs.forEach(function (seg, i) {
      var key = PRAYER_ORDER[i];
      var start = rel[i];
      var end = (i < rel.length - 1) ? rel[i + 1] : 24 * 60; // Isha -> Fajr du lendemain
      var fill = seg.querySelector('.pg-seg-fill');
      var pt = seg.querySelector('.pg-pt');
      var label = seg.querySelector('.pg-label');
      var timeEl = seg.querySelector('.pg-label-time');

      var pct;
      if (nowRel >= end) { pct = 100; }
      else if (nowRel <= start) { pct = 0; }
      else { pct = Math.round(((nowRel - start) / (end - start)) * 100); }

      fill.style.width = pct + '%';
      pt.classList.toggle('done', pct >= 100);
      seg.classList.toggle('done-last', i === segs.length - 1 && pct >= 100);

      var isNow = pct > 0 && pct < 100;
      pt.classList.toggle('now', isNow);
      if (label) {
        label.classList.toggle('now-label', isNow);
        label.textContent = prayerLabel(key, L);
      }
      if (timeEl) {
        timeEl.classList.toggle('now-label', isNow);
        timeEl.textContent = cleanTime(timings[key]);
      }
      if (isNow && !nextKey) {
        // la prière "prochaine" est celle qui MARQUE LA FIN de ce segment,
        // pas celle qui l'a commencé — donc l'élément suivant (avec retour à Fajr après Isha).
        var nextIdx = (i + 1) % PRAYER_ORDER.length;
        nextKey = PRAYER_ORDER[nextIdx];
      }
    });

    if (!nextKey) nextKey = 'Fajr'; // toutes les prières du jour sont passées

    var idx = PRAYER_ORDER.indexOf(nextKey);
    // Cible précise (avec secondes) pour le compte à rebours : l'heure de la prochaine
    // prière aujourd'hui, ou demain si elle est déjà passée.
    var targetParts = cleanTime(timings[nextKey]).split(':');
    var target = new Date();
    target.setHours(+targetParts[0], +targetParts[1], 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    nextPrayerTarget = target;

    var nameEl = document.getElementById('pgNextName');
    if (nameEl) nameEl.textContent = prayerLabel(nextKey, L);
    scheduleCountdown();
  }

  function formatCountdown(diffMs, L) {
    if (diffMs < 0) diffMs = 0;
    var totalSec = Math.floor(diffMs / 1000);
    var h = Math.floor(totalSec / 3600);
    var m = Math.floor((totalSec % 3600) / 60);
    var s = totalSec % 60;
    // Sous 1h restante : précision à la seconde (mm:ss). Au-delà : juste h + minutes,
    // pas besoin des secondes quand il reste plusieurs heures.
    var timeStr = (h > 0) ? (h + 'h' + String(m).padStart(2, '0'))
                           : (String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0'));
    if (L === 'tr') return timeStr + ' sonra'; // en turc, le mot se place après l'heure
    var prefix = COUNTDOWN_PREFIX[L] || COUNTDOWN_PREFIX.fr;
    return (prefix ? prefix + ' ' : '') + timeStr;
  }

  function tickCountdown() {
    var cdEl = document.getElementById('pgCountdownText') || document.getElementById('pgCountdown');
    if (!cdEl || !nextPrayerTarget) return;
    cdEl.textContent = formatCountdown(nextPrayerTarget - new Date(), lang());
  }

  // Planification adaptative : tick chaque seconde seulement sous 1h restante,
  // sinon toutes les 30s (aligné sur le rafraîchissement des données) — pas de travail inutile.
  function scheduleCountdown() {
    if (countdownTimeoutId) clearTimeout(countdownTimeoutId);
    tickCountdown();
    if (!nextPrayerTarget) return;
    var diff = nextPrayerTarget - new Date();
    var delay = diff < 3600000 ? 1000 : 30000;
    countdownTimeoutId = setTimeout(scheduleCountdown, delay);
  }

  function startTicker() {
    if (tickerId) clearInterval(tickerId);
    tickerId = setInterval(function () {
      if (currentTimings) updateGauge(currentTimings);
    }, 30000);
  }

  // ---------- API Aladhan ----------
  function fetchMonthCalendar(year, month, lat, lon) {
    // latitudeAdjustmentMethod=3 (Angle Based) : évite les horaires de Fajr/Isha aberrants
    // en été aux latitudes élevées (nuits courtes), recommandé pour l'Europe.
    var url = 'https://api.aladhan.com/v1/calendar/' + year + '/' + month +
      '?latitude=' + lat + '&longitude=' + lon + '&method=' + METHOD +
      '&latitudeAdjustmentMethod=3';
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('network');
      return res.json();
    }).then(function (json) {
      if (json.code !== 200) throw new Error('api');
      return json.data;
    });
  }

  function getMonthData(year, month, lat, lon) {
    var cacheKey = MONTH_CACHE_PREFIX + lat + '_' + lon + '_' + year + '_' + month;
    var cached = loadJSON(cacheKey);
    if (cached) return Promise.resolve(cached);
    return fetchMonthCalendar(year, month, lat, lon).then(function (data) {
      saveJSON(cacheKey, data);
      return data;
    });
  }

  // ---------- ville (reverse geocoding gratuit) ----------
  function resolveCityName(lat, lon) {
    var url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + lat + '&longitude=' + lon + '&localityLanguage=' + lang();
    fetch(url).then(function (r) { return r.json(); }).then(function (d) {
      var name = d.city || d.locality || d.principalSubdivision || '';
      var el = document.getElementById('pgCityName');
      if (el && name) el.textContent = name;
    }).catch(function () {});
  }

  // ---------- chargement du jour ----------
  function loadToday(lat, lon) {
    setError(null);
    var today = todayStr();
    var cache = loadJSON(CACHE_KEY);
    if (cache && cache.date === today && cache.lat === lat && cache.lon === lon) {
      currentTimings = cache.timings;
      updateGauge(currentTimings);
      startTicker();
      showLocateBtn(false);
      return;
    }
    var now = new Date();
    getMonthData(now.getFullYear(), now.getMonth() + 1, lat, lon).then(function (monthData) {
      var day = now.getDate();
      var entry = monthData[day - 1];
      if (!entry) throw new Error('noday');
      currentTimings = entry.timings;
      saveJSON(CACHE_KEY, { date: today, lat: lat, lon: lon, timings: currentTimings });
      updateGauge(currentTimings);
      startTicker();
      showLocateBtn(false);
    }).catch(function () {
      setError(MSG_ERROR[lang()] || MSG_ERROR.fr);
      showLocateBtn(true);
    });
  }

  function requestLocation() {
    setError(null);
    if (!navigator.geolocation) {
      setError(MSG_ERROR[lang()] || MSG_ERROR.fr);
      showLocateBtn(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        var lat = +pos.coords.latitude.toFixed(3);
        var lon = +pos.coords.longitude.toFixed(3);
        userLoc = { lat: lat, lon: lon };
        saveJSON(LOC_KEY, userLoc);
        resolveCityName(lat, lon);
        loadToday(lat, lon);
      },
      function () {
        setError(MSG_PERMISSION[lang()] || MSG_PERMISSION.fr);
        showLocateBtn(true);
      },
      { timeout: 10000 }
    );
  }

  // ============================================================
  // PANEL CALENDRIER
  // ============================================================
  function ensureCalPanel() {
    if (document.getElementById('calPanel')) return;

    var overlay = document.createElement('div');
    overlay.className = 'cal-panel-overlay';
    overlay.id = 'calPanelOverlay';
    overlay.onclick = closeCalendar;

    var panel = document.createElement('div');
    panel.className = 'cal-panel';
    panel.id = 'calPanel';
    panel.innerHTML =
      '<button class="cal-panel-close" onclick="DT_closePrayerCalendar()" title="Fermer">\u2715</button>' +
      '<div class="cal-panel-nav">' +
        '<button class="cal-arrow-btn" id="calPrevBtn" onclick="DT_calShiftMonth(-1)">' +
          '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>' +
        '</button>' +
        '<div class="cal-panel-month-block">' +
          '<div class="cal-panel-month" id="calMonthLabel">\u2014</div>' +
          '<div class="cal-panel-hijri" id="calHijriLabel">\u2014</div>' +
        '</div>' +
        '<button class="cal-arrow-btn" id="calNextBtn" onclick="DT_calShiftMonth(1)">' +
          '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>' +
        '</button>' +
      '</div>' +
      '<div id="calPanelContent"><div class="cal-panel-loading">\u2026</div></div>';

    document.body.appendChild(overlay);
    document.body.appendChild(panel);
  }

  function openCalendar() {
    ensureCalPanel();
    document.getElementById('calPanelOverlay').classList.add('open');
    document.getElementById('calPanel').classList.add('open');
    var now = new Date();
    if (calState.year == null) {
      calState.year = now.getFullYear();
      calState.month = now.getMonth() + 1;
    }
    renderCalMonth();
  }

  function closeCalendar() {
    var ov = document.getElementById('calPanelOverlay');
    var p = document.getElementById('calPanel');
    if (ov) ov.classList.remove('open');
    if (p) p.classList.remove('open');
  }

  function shiftMonth(delta) {
    var m = calState.month + delta;
    var y = calState.year;
    if (m < 1) { m = 12; y -= 1; }
    if (m > 12) { m = 1; y += 1; }
    calState.month = m;
    calState.year = y;
    renderCalMonth();
  }

  function renderCalMonth() {
    var content = document.getElementById('calPanelContent');
    var monthLabel = document.getElementById('calMonthLabel');
    var hijriLabel = document.getElementById('calHijriLabel');
    if (!content) return;

    var L = lang();
    var loc = userLoc || loadJSON(LOC_KEY);
    if (!loc) {
      content.innerHTML = '<div class="cal-panel-err">' + (MSG_PERMISSION[L] || MSG_PERMISSION.fr) + '</div>';
      return;
    }

    var gregMonths = GREG_MONTHS[L] || GREG_MONTHS.fr;
    if (monthLabel) monthLabel.textContent = gregMonths[calState.month - 1] + ' ' + calState.year;

    content.innerHTML = '<div class="cal-panel-loading">\u2026</div>';
    var reqYear = calState.year, reqMonth = calState.month;

    getMonthData(reqYear, reqMonth, loc.lat, loc.lon).then(function (monthData) {
      if (calState.year !== reqYear || calState.month !== reqMonth) return; // l'utilisateur a changé de mois entre-temps
      buildCalTable(monthData, L, hijriLabel, content);
    }).catch(function () {
      content.innerHTML = '<div class="cal-panel-err">' + (MSG_ERROR[L] || MSG_ERROR.fr) + '</div>';
    });
  }

  function buildCalTable(monthData, L, hijriLabel, content) {
    if (!monthData || !monthData.length) {
      content.innerHTML = '<div class="cal-panel-err">' + (MSG_ERROR[L] || MSG_ERROR.fr) + '</div>';
      return;
    }
    var hijriMonths = HIJRI_MONTHS[L] || HIJRI_MONTHS.en;
    var dowLabels = DOW_LABELS[L] || DOW_LABELS.fr;

    // Libellé hijri du mois : utilise le hijri du milieu de mois (peut chevaucher 2 mois hijri)
    var midEntry = monthData[Math.floor(monthData.length / 2)];
    if (hijriLabel && midEntry) {
      var hMonthIdx = (+midEntry.date.hijri.month.number) - 1;
      hijriLabel.textContent = (hijriMonths[hMonthIdx] || '') + ' ' + midEntry.date.hijri.year + ' H';
    }

    var todayD = new Date();
    var todayStr2 = todayD.getFullYear() + '-' + (todayD.getMonth() + 1) + '-' + todayD.getDate();

    var rows = monthData.map(function (entry) {
      var g = entry.date.gregorian;
      var h = entry.date.hijri;
      var gDay = +g.day;
      var gMonth = +g.month.number;
      var gYear = +g.year;
      var dow = new Date(gYear, gMonth - 1, gDay).getDay();
      var isFriday = dow === 5;
      var rowDateStr = gYear + '-' + gMonth + '-' + gDay;
      var isToday = rowDateStr === todayStr2;
      var t = entry.timings;

      return '<tr class="' + (isToday ? 'today' : (isFriday ? 'friday' : '')) + '">' +
        '<td class="cpt-date"><div class="cpt-g"><span class="cpt-g-num">' + gDay + '</span><span class="cpt-g-dow">' + dowLabels[dow] + '</span></div><span class="cpt-h-num">' + toArabicDigits(h.day) + '</span></td>' +
        '<td class="cpt-val">' + cleanTime(t.Fajr) + '</td>' +
        '<td class="cpt-val">' + cleanTime(t.Sunrise) + '</td>' +
        '<td class="cpt-val">' + cleanTime(t.Dhuhr) + '</td>' +
        '<td class="cpt-val">' + cleanTime(t.Asr) + '</td>' +
        '<td class="cpt-val">' + cleanTime(t.Maghrib) + '</td>' +
        '<td class="cpt-val">' + cleanTime(t.Isha) + '</td>' +
      '</tr>';
    }).join('');

    content.innerHTML =
      '<div class="cal-panel-table-wrap"><table class="cal-panel-table">' +
        '<thead><tr><th class="date-col">Date</th>' +
        '<th>Fajr</th><th>' + sunriseLabel(L) + '</th><th>Dhuhr</th><th>Asr</th><th>Maghrib</th><th>Isha</th></tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
      '</table></div>';
  }

  function sunriseLabel(L) {
    var map = { fr:'Lever', en:'Sunrise', es:'Amanecer', de:'Aufg.', it:'Alba', nl:'Zon op', pt:'Nascer', tr:'Güneş' };
    return map[L] || map.fr;
  }

  // ---------- hooks globaux ----------
  window.DT_requestPrayerLocation = requestLocation;
  window.DT_openPrayerCalendar = openCalendar;
  window.DT_closePrayerCalendar = closeCalendar;
  window.DT_calShiftMonth = shiftMonth;
  window.DT_refreshPrayerLang = function () {
    if (currentTimings) updateGauge(currentTimings);
    if (document.getElementById('calPanel') && document.getElementById('calPanel').classList.contains('open')) {
      renderCalMonth();
    }
  };

  function init() {
    if (!document.getElementById('prayerGauge')) return;
    buildTrackSkeleton();
    var saved = loadJSON(LOC_KEY);
    if (saved && saved.lat != null) {
      userLoc = saved;
      resolveCityName(saved.lat, saved.lon);
      loadToday(saved.lat, saved.lon);
    } else {
      requestLocation();
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
