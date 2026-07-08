/* ============================================================
   kids-profiles.js — Profils dans le mode enfant
   ============================================================ */
(function () {

  var PASTEL_COLORS = ['#FFB3BA','#FFDFBA','#FFFFBA','#BAFFC9','#BAE1FF','#D4BAFF'];

  var KP_I18N = {
    fr:{ who:'👤 C\'est qui ?', addBtn:'＋ Nouveau profil', newTitle:'✨ Nouveau profil', editTitle:'✏️ Modifier le profil', namePh:'Prénom', cancel:'Annuler', create:'Créer ✓', save:'Sauvegarder ✓', dupName:'Ce prénom existe déjà', onlyOne:'Tu ne peux pas supprimer le seul profil !', confirmDel:function(n){ return 'Supprimer le profil de ' + n + ' ? 😢'; }, deleteBtn:'Supprimer', ok:'Compris', tabLabel:'Profil' },
    en:{ who:'👤 Who is it?', addBtn:'＋ New profile', newTitle:'✨ New profile', editTitle:'✏️ Edit profile', namePh:'First name', cancel:'Cancel', create:'Create ✓', save:'Save ✓', dupName:'This name already exists', onlyOne:'You can\'t delete the only profile!', confirmDel:function(n){ return 'Delete ' + n + '\'s profile? 😢'; }, deleteBtn:'Delete', ok:'Got it', tabLabel:'Profile' },
    es:{ who:'👤 ¿Quién es?', addBtn:'＋ Nuevo perfil', newTitle:'✨ Nuevo perfil', editTitle:'✏️ Editar perfil', namePh:'Nombre', cancel:'Cancelar', create:'Crear ✓', save:'Guardar ✓', dupName:'Este nombre ya existe', onlyOne:'¡No puedes eliminar el único perfil!', confirmDel:function(n){ return '¿Eliminar el perfil de ' + n + '? 😢'; }, deleteBtn:'Eliminar', ok:'Entendido', tabLabel:'Perfil' },
    de:{ who:'👤 Wer ist das?', addBtn:'＋ Neues Profil', newTitle:'✨ Neues Profil', editTitle:'✏️ Profil bearbeiten', namePh:'Vorname', cancel:'Abbrechen', create:'Erstellen ✓', save:'Speichern ✓', dupName:'Dieser Name existiert bereits', onlyOne:'Du kannst das einzige Profil nicht löschen!', confirmDel:function(n){ return 'Profil von ' + n + ' löschen? 😢'; }, deleteBtn:'Löschen', ok:'Verstanden', tabLabel:'Profil' },
    it:{ who:'👤 Chi è?', addBtn:'＋ Nuovo profilo', newTitle:'✨ Nuovo profilo', editTitle:'✏️ Modifica profilo', namePh:'Nome', cancel:'Annulla', create:'Crea ✓', save:'Salva ✓', dupName:'Questo nome esiste già', onlyOne:'Non puoi eliminare l\'unico profilo!', confirmDel:function(n){ return 'Eliminare il profilo di ' + n + '? 😢'; }, deleteBtn:'Elimina', ok:'Ho capito', tabLabel:'Profilo' },
    nl:{ who:'👤 Wie is het?', addBtn:'＋ Nieuw profiel', newTitle:'✨ Nieuw profiel', editTitle:'✏️ Profiel bewerken', namePh:'Voornaam', cancel:'Annuleren', create:'Aanmaken ✓', save:'Opslaan ✓', dupName:'Deze naam bestaat al', onlyOne:'Je kan het enige profiel niet verwijderen!', confirmDel:function(n){ return 'Profiel van ' + n + ' verwijderen? 😢'; }, deleteBtn:'Verwijderen', ok:'Begrepen', tabLabel:'Profiel' },
    pt:{ who:'👤 Quem é?', addBtn:'＋ Novo perfil', newTitle:'✨ Novo perfil', editTitle:'✏️ Editar perfil', namePh:'Nome', cancel:'Cancelar', create:'Criar ✓', save:'Guardar ✓', dupName:'Este nome já existe', onlyOne:'Não podes eliminar o único perfil!', confirmDel:function(n){ return 'Eliminar o perfil de ' + n + '? 😢'; }, deleteBtn:'Eliminar', ok:'Entendido', tabLabel:'Perfil' },
    tr:{ who:'👤 Bu kim?', addBtn:'＋ Yeni profil', newTitle:'✨ Yeni profil', editTitle:'✏️ Profili düzenle', namePh:'İsim', cancel:'İptal', create:'Oluştur ✓', save:'Kaydet ✓', dupName:'Bu isim zaten var', onlyOne:'Tek profili silemezsin!', confirmDel:function(n){ return n + ' profili silinsin mi? 😢'; }, deleteBtn:'Sil', ok:'Anladım', tabLabel:'Profil' }
  };
  function kpLang() { return localStorage.getItem('deentag_lang') || 'fr'; }
  function kpT() { return KP_I18N[kpLang()] || KP_I18N.fr; }

  /* ── Délégation à window.DT (profiles.js) pour tout le stockage ── */
  function loadProfiles() {
    if (window.DT && window.DT._loadProfiles) return window.DT._loadProfiles();
    try { return JSON.parse(localStorage.getItem('deentag_profiles')) || []; } catch(e) { return []; }
  }
  function getActiveId() {
    if (window.DT && window.DT._getActiveId) return window.DT._getActiveId();
    return localStorage.getItem('deentag_active_profile') || null;
  }
  function setActiveId(id) {
    if (window.DT && window.DT._setActiveId) { window.DT._setActiveId(id); return; }
    localStorage.setItem('deentag_active_profile', id);
  }

  /* ── Dôme kids coloré ── */
  function kidsDome(profile, size) {
    size = size || 52;
    var h       = Math.round(size * 1.15);
    var cx      = size / 2;
    var color   = profile.color || '#C9A84C';
    var initial = (profile.name || '?').charAt(0).toUpperCase();

    if (profile.photo) {
      return '<svg width="'+size+'" height="'+h+'" viewBox="0 0 '+size+' '+h+'" fill="none">' +
        '<defs><clipPath id="clip-'+profile.id+'"><path d="M'+cx+' 1 C'+cx+' 1 2 '+(h*0.25)+' 2 '+(h*0.45)+' L2 '+(h-4)+' C2 '+(h-1.5)+' 3.5 '+h+' 5 '+h+' L'+(size-5)+' '+h+' C'+(size-3.5)+' '+h+' '+(size-2)+' '+(h-1.5)+' '+(size-2)+' '+(h-4)+' L'+(size-2)+' '+(h*0.45)+' C'+(size-2)+' '+(h*0.25)+' '+cx+' 1 '+cx+' 1Z"/></clipPath></defs>' +
        '<image href="'+profile.photo+'" x="0" y="0" width="'+size+'" height="'+h+'" clip-path="url(#clip-'+profile.id+')" preserveAspectRatio="xMidYMid slice"/>' +
        '<path d="M'+cx+' 1 C'+cx+' 1 2 '+(h*0.25)+' 2 '+(h*0.45)+' L2 '+(h-4)+' C2 '+(h-1.5)+' 3.5 '+h+' 5 '+h+' L'+(size-5)+' '+h+' C'+(size-3.5)+' '+h+' '+(size-2)+' '+(h-1.5)+' '+(size-2)+' '+(h-4)+' L'+(size-2)+' '+(h*0.45)+' C'+(size-2)+' '+(h*0.25)+' '+cx+' 1 '+cx+' 1Z" fill="none" stroke="white" stroke-width="2"/>' +
        '</svg>';
    }

    return '<svg width="'+size+'" height="'+h+'" viewBox="0 0 '+size+' '+h+'" fill="none">' +
      '<path d="M'+cx+' 1 C'+cx+' 1 2 '+(h*0.25)+' 2 '+(h*0.45)+' L2 '+(h-4)+' C2 '+(h-1.5)+' 3.5 '+h+' 5 '+h+' L'+(size-5)+' '+h+' C'+(size-3.5)+' '+h+' '+(size-2)+' '+(h-1.5)+' '+(size-2)+' '+(h-4)+' L'+(size-2)+' '+(h*0.45)+' C'+(size-2)+' '+(h*0.25)+' '+cx+' 1 '+cx+' 1Z" fill="'+color+'" stroke="white" stroke-width="2"/>' +
      '<circle cx="'+cx+'" cy="2" r="2" fill="white" opacity="0.8"/>' +
      '<text x="'+cx+'" y="'+(h*0.7)+'" text-anchor="middle" font-family="Baloo 2,cursive" font-weight="800" font-size="'+(size*0.38)+'" fill="white">'+initial+'</text>' +
      '</svg>';
  }

  /* ── Construire le modal s'il n'existe pas déjà dans la page ──
     (permet au profil enfant de fonctionner sur N'IMPORTE QUELLE page,
     même si le HTML de la page ne contient pas le modal en dur, comme
     c'était le cas sur quran-kids.html) */
  function ensureKidsModalDOM() {
    injectKidsCSS();
    var modal = document.getElementById('kidsProfileModal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'kidsProfileModal';
    modal.className = 'kids-profile-modal';
    modal.style.display = 'none';
    modal.onclick = function () { closeKidsProfileModal(); };
    modal.innerHTML =
      '<div class="kids-profile-box" onclick="event.stopPropagation()">' +
        '<div class="kids-profile-title">' + kpT().who + '</div>' +
        '<div class="kids-profile-grid" id="kidsProfileGrid"></div>' +
        '<button class="kids-profile-add-btn" onclick="kidsAddProfile()">' + kpT().addBtn + '</button>' +
      '</div>';
    document.body.appendChild(modal);
    return modal;
  }

  /* ── Ouvrir modal ── */
  function openKidsProfileModal() {
    var modal = ensureKidsModalDOM();
    var grid  = document.getElementById('kidsProfileGrid');
    if (!modal || !grid) return;

    var titleEl = modal.querySelector('.kids-profile-title');
    var addBtnEl = modal.querySelector('.kids-profile-add-btn');
    if (titleEl) titleEl.textContent = kpT().who;
    if (addBtnEl) addBtnEl.textContent = kpT().addBtn;

    var profiles = loadProfiles();
    var activeId = getActiveId();
    grid.innerHTML = '';

    profiles.forEach(function(p) {
      var isActive = p.id === activeId;
      var div = document.createElement('div');
      div.className = 'kids-profile-item' + (isActive ? ' active' : '');
      div.style.cssText = 'position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;';

      var domeEl  = document.createElement('div');
      domeEl.className = 'kids-profile-dome';
      domeEl.style.cursor = 'pointer';
      domeEl.innerHTML = kidsDome(p, 52);

      var nameEl  = document.createElement('div');
      nameEl.className = 'kids-profile-name';
      nameEl.style.cursor = 'pointer';
      nameEl.textContent = p.name;

      var actionsEl = document.createElement('div');
      actionsEl.style.cssText = 'display:flex;gap:4px;margin-top:2px;';

      var editBtn = document.createElement('button');
      editBtn.textContent = '✏️';
      editBtn.style.cssText = 'background:#BAE1FF;border:none;border-radius:20px;padding:3px 8px;font-size:11px;font-family:Baloo 2,cursive;font-weight:700;color:#1a4a6e;cursor:pointer;';

      var delBtn = document.createElement('button');
      delBtn.textContent = '🗑️';
      delBtn.style.cssText = 'background:#FFB3BA;border:none;border-radius:20px;padding:3px 8px;font-size:11px;font-family:Baloo 2,cursive;font-weight:700;color:#8B1a1a;cursor:pointer;';

      if (isActive) {
        var checkEl = document.createElement('div');
        checkEl.className = 'kids-profile-check';
        checkEl.textContent = '✓';
        div.appendChild(checkEl);
      }

      actionsEl.appendChild(editBtn);
      actionsEl.appendChild(delBtn);
      div.appendChild(domeEl);
      div.appendChild(nameEl);
      div.appendChild(actionsEl);

      // Événements
      (function(pid) {
        domeEl.addEventListener('click', function() {
          setActiveId(pid);
          updateKidsTabAvatar();
          closeKidsProfileModal();
          window.dispatchEvent(new CustomEvent('deentag:profileChanged', { detail:{ id:pid } }));
        });
        nameEl.addEventListener('click', function() {
          setActiveId(pid);
          updateKidsTabAvatar();
          closeKidsProfileModal();
          window.dispatchEvent(new CustomEvent('deentag:profileChanged', { detail:{ id:pid } }));
        });
        editBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          kidsEditProfile(pid);
        });
        delBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          kidsDeleteProfile(pid);
        });
      })(p.id);
      grid.appendChild(div);
    });

    modal.style.display = 'flex';
    requestAnimationFrame(function(){
      modal.querySelector('.kids-profile-box').style.transform = 'scale(1) translateY(0)';
      modal.querySelector('.kids-profile-box').style.opacity   = '1';
    });
  }

  function closeKidsProfileModal() {
    var modal = document.getElementById('kidsProfileModal');
    if (!modal) return;
    var box = modal.querySelector('.kids-profile-box');
    if (box) {
      box.style.transform = 'scale(0.85) translateY(10px)';
      box.style.opacity   = '0';
    }
    setTimeout(function(){ modal.style.display = 'none'; }, 250);
  }

  function kidsAddProfile() {
    var box = document.querySelector('.kids-profile-box');
    if (!box) return;
    var profiles = loadProfiles();
    var cidx = profiles.length % PASTEL_COLORS.length;
    window._kidsSelColor = PASTEL_COLORS[cidx];

    var dots = PASTEL_COLORS.map(function(c, i) {
      return '<div class="kids-profile-color-dot' + (i === cidx ? ' selected' : '') + '" data-kci="' + i + '" data-color="' + c + '" onclick="kidsPickColor(\'' + c + '\',' + i + ')" style="background:' + c + ';"></div>';
    }).join('');

    box.innerHTML =
      '<div class="kids-profile-title">' + kpT().newTitle + '</div>' +
      '<div id="kp-dome-preview" class="kids-profile-form-preview">' +
        kidsDome({ id:'preview', name:'?', color: window._kidsSelColor, photo: null }, 52) +
      '</div>' +
      '<div class="kids-profile-colors">' + dots + '</div>' +
      '<input id="kp-name" class="kids-profile-input" type="text" placeholder="' + kpT().namePh + '" maxlength="12">' +
      '<div class="kids-profile-actions">' +
        '<button class="kids-profile-btn" onclick="closeKidsProfileModal()">' + kpT().cancel + '</button>' +
        '<button class="kids-profile-btn kids-profile-btn-primary" onclick="kidsSaveProfile()">' + kpT().create + '</button>' +
      '</div>';

    setTimeout(function() {
      var inp = document.getElementById('kp-name');
      if (inp) {
        inp.oninput = function() {
          inp.classList.remove('error');
          var preview = document.getElementById('kp-dome-preview');
          if (preview) preview.innerHTML = kidsDome({ id:'preview', name: inp.value || '?', color: window._kidsSelColor, photo: null }, 52);
        };
      }
    }, 100);
  }

  /* ── Avatar dans la tabbar kids ── */
  function updateKidsTabAvatar() {
    var btn = document.getElementById('kids-profile-tab');
    if (!btn) return;
    var profiles = loadProfiles();
    var activeId = getActiveId();
    var p = profiles.find(function(x){ return x.id === activeId; }) || profiles[0];
    var icon = btn.querySelector('.tab-icon');
    var lbl  = btn.querySelector('span');
    if (icon && p) {
      icon.innerHTML = '<div style="width:44px;height:50px;display:flex;align-items:center;justify-content:center;">'+kidsDome(p, 38)+'</div>';
      icon.style.background = 'transparent';
    }
    if (lbl && p) lbl.textContent = p.name.split(' ')[0];
  }

  /* ── Injecter dans la tabbar kids ── */
  function injectKidsProfileTab() {
    if (document.getElementById('kids-profile-tab')) return;
    var tabbar = document.querySelector('.app-tabbar');
    if (!tabbar) return;

    var btn = document.createElement('a');
    btn.id        = 'kids-profile-tab';
    btn.href      = '#';
    btn.className = 'tab';
    btn.onclick   = function(e){ e.preventDefault(); openKidsProfileModal(); };

    var icon = document.createElement('div');
    icon.className = 'tab-icon';
    icon.style.cssText = 'background:transparent;overflow:visible;border-radius:0;';

    var lbl = document.createElement('span');
    lbl.textContent = kpT().tabLabel;

    btn.appendChild(icon);
    btn.appendChild(lbl);
    tabbar.appendChild(btn);

    updateKidsTabAvatar();
  }

  /* ── CSS kids profil ── */
  function injectKidsCSS() {
    if (document.getElementById('kids-profile-css')) return;
    var style = document.createElement('style');
    style.id  = 'kids-profile-css';
    style.textContent = `
      .kids-profile-modal {
        position: fixed; inset: 0; z-index: 200;
        background: rgba(17,22,58,.75);
        backdrop-filter: blur(4px);
        display: none;
        align-items: center; justify-content: center;
        padding: 24px;
      }
      .kids-profile-box {
        width: 100%; max-width: 340px;
        background: var(--paper);
        border-radius: 28px;
        box-shadow: var(--kids-shadow);
        padding: 28px 20px 24px;
        text-align: center;
        transform: scale(0.85) translateY(10px);
        opacity: 0;
        transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease;
      }
      .kids-profile-title {
        font-family: 'Baloo 2', cursive; font-weight: 800; font-size: 20px;
        color: var(--ink); margin-bottom: 20px;
      }
      .kids-profile-grid {
        display: flex; flex-wrap: wrap;
        gap: 14px; justify-content: center;
        margin-bottom: 20px;
      }
      .kids-profile-item {
        display: flex; flex-direction: column; align-items: center; gap: 6px;
        cursor: pointer; position: relative;
        padding: 10px 10px 8px;
        border-radius: 20px;
        border: 2.5px solid transparent;
        background: var(--paper-warm);
        transition: all 0.2s;
        min-width: 72px;
      }
      .kids-profile-item.active {
        border-color: var(--gold);
        background: rgba(232,184,75,0.08);
      }
      .kids-profile-item:active { transform: scale(0.94); }
      .kids-profile-dome { display: flex; align-items: center; justify-content: center; }
      .kids-profile-name {
        font-family: 'Baloo 2', cursive; font-weight: 700; font-size: 12px;
        color: var(--ink);
      }
      .kids-profile-check {
        position: absolute; top: -6px; right: -6px;
        width: 20px; height: 20px; border-radius: 50%;
        background: var(--gold); color: white;
        font-size: 11px; font-weight: 800;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 2px 6px rgba(232,184,75,0.5);
      }
      .kids-profile-add-btn {
        width: 100%; padding: 14px;
        border-radius: 50px; border: none;
        background: linear-gradient(135deg, var(--gold), var(--violet));
        color: white;
        font-family: 'Baloo 2', cursive; font-weight: 800; font-size: 15px;
        cursor: pointer;
        box-shadow: 0 6px 16px rgba(108,99,255,0.28);
        transition: transform 0.15s;
      }
      .kids-profile-add-btn:active { transform: scale(0.97); }

      /* ── Formulaire ajout / modification ── */
      .kids-profile-form-preview {
        display: flex; justify-content: center; margin-bottom: 18px;
      }
      .kids-profile-colors {
        display: flex; gap: 12px; justify-content: center;
        margin-bottom: 20px; flex-wrap: wrap;
      }
      .kids-profile-color-dot {
        width: 30px; height: 30px; border-radius: 50%;
        cursor: pointer; border: 3px solid transparent;
        box-shadow: 0 2px 6px rgba(0,0,0,0.12);
        transition: transform 0.15s ease, border-color 0.15s ease;
      }
      .kids-profile-color-dot:active { transform: scale(0.9); }
      .kids-profile-color-dot.selected {
        border-color: var(--ink);
        transform: scale(1.15);
        box-shadow: 0 3px 10px rgba(0,0,0,0.22);
      }
      .kids-profile-input {
        width: 100%; padding: 13px 16px; border-radius: 50px;
        border: 2px solid var(--line);
        background: var(--paper-warm);
        font-family: 'Baloo 2', cursive; font-size: 15px; font-weight: 700;
        color: var(--ink); box-sizing: border-box; margin-bottom: 18px;
        outline: none; text-align: center;
        transition: border-color 0.15s ease;
      }
      .kids-profile-input:focus { border-color: var(--gold); }
      .kids-profile-input.error { border-color: #FF6B6B; }
      .kids-profile-actions { display: flex; gap: 10px; }
      .kids-profile-btn {
        flex: 1; padding: 13px; border-radius: 50px;
        border: 2px solid var(--line); background: transparent;
        font-family: 'Baloo 2', cursive; font-weight: 700; font-size: 14px;
        color: var(--ink); cursor: pointer; transition: transform 0.15s ease;
      }
      .kids-profile-btn:active { transform: scale(0.97); }
      .kids-profile-btn-primary {
        flex: 2; border: none; color: white; font-weight: 800;
        background: linear-gradient(135deg, var(--gold), var(--violet));
        box-shadow: 0 6px 16px rgba(108,99,255,0.28);
      }

      /* ── Popup alert/confirm custom (remplace alert()/confirm()) ── */
      .kp-confirm-overlay {
        position: fixed; inset: 0; z-index: 250;
        background: rgba(17,22,58,.75);
        backdrop-filter: blur(4px);
        display: none;
        align-items: center; justify-content: center;
        padding: 24px;
      }
      .kp-confirm-overlay.open { display: flex; }
      .kp-confirm-box {
        width: 100%; max-width: 320px;
        background: var(--paper);
        border-radius: 28px;
        box-shadow: var(--kids-shadow);
        padding: 28px 22px 22px;
        text-align: center;
        transform: scale(0.85) translateY(10px);
        opacity: 0;
        transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease;
      }
      .kp-confirm-overlay.open .kp-confirm-box { transform: scale(1) translateY(0); opacity: 1; }
      .kp-confirm-emoji { font-size: 44px; margin-bottom: 8px; line-height: 1; }
      .kp-confirm-text {
        font-family: 'Baloo 2', cursive; font-weight: 700; font-size: 16px;
        color: var(--ink); line-height: 1.4; margin-bottom: 22px;
      }
      .kp-confirm-actions { display: flex; gap: 10px; }
      .kids-profile-btn-danger {
        flex: 2; border: none; color: white; font-weight: 800;
        background: linear-gradient(135deg, #FF6B6B, #FF8A65);
        box-shadow: 0 6px 16px rgba(255,107,107,0.3);
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Popup alert custom : un seul bouton ── */
  function kpAlert(message) {
    injectKidsCSS();
    var overlay = document.getElementById('kpConfirmOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'kpConfirmOverlay';
      overlay.className = 'kp-confirm-overlay';
      document.body.appendChild(overlay);
    }
    overlay.innerHTML =
      '<div class="kp-confirm-box" onclick="event.stopPropagation()">' +
        '<div class="kp-confirm-emoji">🙈</div>' +
        '<div class="kp-confirm-text">' + message + '</div>' +
        '<div class="kp-confirm-actions">' +
          '<button class="kids-profile-btn kids-profile-btn-primary" id="kpAlertOk">' + kpT().ok + '</button>' +
        '</div>' +
      '</div>';
    overlay.onclick = function () { overlay.classList.remove('open'); };
    document.getElementById('kpAlertOk').onclick = function () { overlay.classList.remove('open'); };
    requestAnimationFrame(function(){ overlay.classList.add('open'); });
  }

  /* ── Popup confirm custom : Annuler / Supprimer ── */
  function kpConfirm(message, onConfirm) {
    injectKidsCSS();
    var overlay = document.getElementById('kpConfirmOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'kpConfirmOverlay';
      overlay.className = 'kp-confirm-overlay';
      document.body.appendChild(overlay);
    }
    overlay.innerHTML =
      '<div class="kp-confirm-box" onclick="event.stopPropagation()">' +
        '<div class="kp-confirm-emoji">😢</div>' +
        '<div class="kp-confirm-text">' + message + '</div>' +
        '<div class="kp-confirm-actions">' +
          '<button class="kids-profile-btn" id="kpConfirmCancel">' + kpT().cancel + '</button>' +
          '<button class="kids-profile-btn kids-profile-btn-danger" id="kpConfirmOk">' + kpT().deleteBtn + '</button>' +
        '</div>' +
      '</div>';
    overlay.onclick = function () { overlay.classList.remove('open'); };
    document.getElementById('kpConfirmCancel').onclick = function () { overlay.classList.remove('open'); };
    document.getElementById('kpConfirmOk').onclick = function () {
      overlay.classList.remove('open');
      onConfirm();
    };
    requestAnimationFrame(function(){ overlay.classList.add('open'); });
  }

  /* ── Init ── */

  function kidsPickColor(color, idx) {
    window._kidsSelColor = color;
    document.querySelectorAll('[data-kci]').forEach(function(el){
      el.classList.toggle('selected', parseInt(el.dataset.kci) === idx);
    });
    var inp = document.getElementById('kp-name');
    var preview = document.getElementById('kp-dome-preview');
    if (preview) preview.innerHTML = kidsDome({ id:'preview', name: (inp ? inp.value : '') || '?', color: color, photo: null }, 52);
  }

  function kidsSaveProfile() {
    var inp = document.getElementById('kp-name');
    var name = inp ? inp.value.trim() : '';
    if (!name) { if (inp) inp.classList.add('error'); return; }
    var profiles = loadProfiles();
    if (profiles.length >= 10) return;
    // Vérification doublon de nom (insensible à la casse)
    var nameLower = name.toLowerCase();
    if (profiles.some(function(p){ return p.name.toLowerCase() === nameLower; })) {
      if (inp) { inp.classList.add('error'); inp.placeholder = kpT().dupName; }
      return;
    }
    var newP = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2,6),
      name: name,
      color: window._kidsSelColor || PASTEL_COLORS[0],
      photo: null,
      created: new Date().toISOString()
    };
    profiles.push(newP);
    localStorage.setItem('deentag_profiles', JSON.stringify(profiles));
    setActiveId(newP.id);
    updateKidsTabAvatar();
    // Fermer le modal
    var oldModal = document.getElementById('kidsProfileModal');
    if (oldModal) oldModal.remove();
    window.dispatchEvent(new CustomEvent('deentag:profileChanged', { detail:{ id:newP.id } }));
    // Message de bienvenue
    setTimeout(function() {
      if (typeof showWelcomeToast === 'function') showWelcomeToast(newP.name);
    }, 400);
  }

  /* ── Modifier un profil ── */
  function kidsEditProfile(id) {
    var profiles = loadProfiles();
    var p = profiles.find(function(x){ return x.id === id; });
    if (!p) return;
    var box = document.querySelector('.kids-profile-box');
    if (!box) return;
    var cidx = PASTEL_COLORS.indexOf(p.color);
    if (cidx === -1) cidx = 0;
    window._kidsSelColor = p.color;

    var dots = PASTEL_COLORS.map(function(c, i) {
      return '<div class="kids-profile-color-dot' + (i === cidx ? ' selected' : '') + '" data-kci="' + i + '" data-color="' + c + '" onclick="kidsPickColor(\'' + c + '\',' + i + ')" style="background:' + c + ';"></div>';
    }).join('');

    box.innerHTML =
      '<div class="kids-profile-title">' + kpT().editTitle + '</div>' +
      '<div id="kp-dome-preview" class="kids-profile-form-preview">' +
        kidsDome(p, 52) +
      '</div>' +
      '<div class="kids-profile-colors">' + dots + '</div>' +
      '<input id="kp-name" class="kids-profile-input" type="text" value="' + p.name + '" maxlength="12">' +
      '<div class="kids-profile-actions">' +
        '<button class="kids-profile-btn" onclick="closeKidsProfileModal();openKidsProfileModal();">' + kpT().cancel + '</button>' +
        '<button class="kids-profile-btn kids-profile-btn-primary" onclick="kidsSaveEdit(\'' + id + '\')">' + kpT().save + '</button>' +
      '</div>';

    setTimeout(function() {
      var inp = document.getElementById('kp-name');
      if (inp) {
        inp.oninput = function() {
          inp.classList.remove('error');
          var preview = document.getElementById('kp-dome-preview');
          if (preview) preview.innerHTML = kidsDome({ id:'preview', name: inp.value || '?', color: window._kidsSelColor, photo: null }, 52);
        };
      }
    }, 100);
  }

  /* ── Sauvegarder modification ── */
  function kidsSaveEdit(id) {
    var inp = document.getElementById('kp-name');
    var name = inp ? inp.value.trim() : '';
    if (!name) { if (inp) inp.classList.add('error'); return; }
    var profiles = loadProfiles();
    var nameLower = name.toLowerCase();
    if (profiles.some(function(p){ return p.name.toLowerCase() === nameLower && p.id !== id; })) {
      if (inp) { inp.classList.add('error'); inp.placeholder = kpT().dupName; }
      return;
    }
    profiles = profiles.map(function(p) {
      return p.id === id ? Object.assign({}, p, { name: name, color: window._kidsSelColor || p.color }) : p;
    });
    localStorage.setItem('deentag_profiles', JSON.stringify(profiles));
    updateKidsTabAvatar();
    var oldModal = document.getElementById('kidsProfileModal');
    if (oldModal) oldModal.remove();
    openKidsProfileModal();
    window.dispatchEvent(new CustomEvent('deentag:profileChanged', { detail:{ id: id } }));
  }

  /* ── Supprimer un profil ── */
  function kidsDeleteProfile(id) {
    var profiles = loadProfiles();
    if (profiles.length <= 1) {
      kpAlert(kpT().onlyOne);
      return;
    }
    var p = profiles.find(function(x){ return x.id === id; });
    if (!p) return;
    kpConfirm(kpT().confirmDel(p.name), function() {
      var remaining = loadProfiles().filter(function(x){ return x.id !== id; });
      localStorage.setItem('deentag_profiles', JSON.stringify(remaining));
      // Si c'était le profil actif, basculer sur le premier
      if (getActiveId() === id) setActiveId(remaining[0].id);
      updateKidsTabAvatar();
      var oldModal = document.getElementById('kidsProfileModal');
      if (oldModal) oldModal.remove();
      openKidsProfileModal();
      window.dispatchEvent(new CustomEvent('deentag:profileChanged', { detail:{ id: getActiveId() } }));
    });
  }

  /* ── Toast de bienvenue de secours ──
     Sur certaines pages (ex: quran-kids.html), kids.js n'est pas chargé,
     donc showWelcomeToast() n'existe pas. On la fournit ici si besoin,
     avec sa propre mini-animation de confettis. */
  function fallbackLaunchConfetti() {
    var container = document.getElementById('confettiContainer');
    if (!container) return;
    container.innerHTML = '';
    var colors = ['#FF6B6B','#6C63FF','#00B4D8','#52B788','#F4A261','#FFD166','#06D6A0'];
    for (var i = 0; i < 60; i++) {
      var piece = document.createElement('div');
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
    setTimeout(function(){ container.innerHTML = ''; }, 4000);
  }

  if (typeof window.showWelcomeToast !== 'function') {
    window.showWelcomeToast = function(name) {
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
        '<button onclick="document.getElementById(\'kidsWelcomeToast\').remove();" style="background:linear-gradient(135deg,#C9A84C,#e8c96d);border:none;border-radius:50px;padding:10px 28px;font-family:Baloo 2,cursive;font-weight:800;font-size:14px;color:#fff;cursor:pointer;">C\'est parti ! ✨</button>';

      document.body.appendChild(toast);
      fallbackLaunchConfetti();

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
          setTimeout(function() {
            if (toast.parentNode) toast.remove();
          }, 400);
        }
      }, 5000);
    };
  }

  window.openKidsProfileModal  = openKidsProfileModal;
  window.closeKidsProfileModal = closeKidsProfileModal;
  window.kidsAddProfile        = kidsAddProfile;
  window.kidsPickColor         = kidsPickColor;
  window.kidsEditProfile       = kidsEditProfile;
  window.kidsSaveEdit          = kidsSaveEdit;
  window.kidsDeleteProfile     = kidsDeleteProfile;
  window.kidsSaveProfile       = kidsSaveProfile;

  function init() {
    injectKidsCSS();
    var n = 0;
    var iv = setInterval(function(){
      n++;
      if (document.querySelector('.app-tabbar')) {
        clearInterval(iv);
        injectKidsProfileTab();
      } else if (n > 30) clearInterval(iv);
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
