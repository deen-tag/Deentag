/* ============================================================
   kids-profiles.js — Profils dans le mode enfant
   ============================================================ */
(function () {

  var PASTEL_COLORS = ['#FFB3BA','#FFDFBA','#FFFFBA','#BAFFC9','#BAE1FF','#D4BAFF'];

  function loadProfiles() {
    try { return JSON.parse(localStorage.getItem('deentag_profiles')) || []; } catch(e) { return []; }
  }
  function getActiveId()   { return localStorage.getItem('deentag_active_profile') || null; }
  function setActiveId(id) { localStorage.setItem('deentag_active_profile', id); }

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
        '<div class="kids-profile-title">👤 C\'est qui ?</div>' +
        '<div class="kids-profile-grid" id="kidsProfileGrid"></div>' +
        '<button class="kids-profile-add-btn" onclick="kidsAddProfile()">＋ Nouveau profil</button>' +
      '</div>';
    document.body.appendChild(modal);
    return modal;
  }

  /* ── Ouvrir modal ── */
  function openKidsProfileModal() {
    var modal = ensureKidsModalDOM();
    var grid  = document.getElementById('kidsProfileGrid');
    if (!modal || !grid) return;

    var profiles = loadProfiles();
    var activeId = getActiveId();
    grid.innerHTML = '';

    profiles.forEach(function(p) {
      var isActive = p.id === activeId;
      var div = document.createElement('div');
      div.className = 'kids-profile-item' + (isActive ? ' active' : '');
      div.innerHTML =
        '<div class="kids-profile-dome">' + kidsDome(p, 52) + '</div>' +
        '<div class="kids-profile-name">' + p.name + '</div>' +
        (isActive ? '<div class="kids-profile-check">✓</div>' : '');
      div.onclick = function() {
        setActiveId(p.id);
        updateKidsTabAvatar();
        closeKidsProfileModal();
        window.dispatchEvent(new CustomEvent('deentag:profileChanged', { detail:{ id:p.id } }));
      };
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
    var COLORS = ['#C9A84C','#2C4A3E','#4A3728','#3A3060','#5C3A4A'];
    var profiles = loadProfiles();
    var cidx = profiles.length % COLORS.length;
    window._kidsSelColor = COLORS[cidx];

    var dots = COLORS.map(function(c, i) {
      return '<div data-kci="' + i + '" data-color="' + c + '" onclick="kidsPickColor(this,' + i + ')" style="width:26px;height:26px;border-radius:50%;background:' + c + ';cursor:pointer;border:2.5px solid ' + (i === cidx ? '#fff' : 'transparent') + ';transition:border 0.2s;"></div>';
    }).join('');

    box.innerHTML =
      '<div class="kids-profile-title">✨ Nouveau profil</div>' +
      '<div id="kp-dome-preview" style="display:flex;justify-content:center;margin-bottom:14px;">' +
        kidsDome({ id:'preview', name:'?', color: window._kidsSelColor, photo: null }, 52) +
      '</div>' +
      '<div style="display:flex;gap:8px;justify-content:center;margin-bottom:14px;">' + dots + '</div>' +
      '<input id="kp-name" type="text" placeholder="Prénom" maxlength="12" ' +
        'style="width:100%;padding:12px 14px;border-radius:50px;border:2px solid rgba(108,99,255,0.2);' +
        'background:#FFFBF5;font-family:Baloo 2,cursive;font-size:15px;font-weight:700;color:#262B45;' +
        'box-sizing:border-box;margin-bottom:14px;outline:none;text-align:center;">' +
      '<div style="display:flex;gap:10px;">' +
        '<button onclick="closeKidsProfileModal()" style="flex:1;padding:13px;border-radius:50px;border:2px solid rgba(108,99,255,0.2);background:transparent;font-family:Baloo 2,cursive;font-weight:700;font-size:14px;color:#262B45;cursor:pointer;">Annuler</button>' +
        '<button onclick="kidsSaveProfile()" style="flex:2;padding:13px;border-radius:50px;border:none;background:linear-gradient(135deg,var(--gold),var(--violet));color:white;font-family:Baloo 2,cursive;font-weight:800;font-size:14px;cursor:pointer;">Créer ✓</button>' +
      '</div>';

    setTimeout(function() {
      var inp = document.getElementById('kp-name');
      if (inp) {
        inp.focus();
        inp.oninput = function() {
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
    lbl.textContent = 'Profil';

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
    `;
    document.head.appendChild(style);
  }

  /* ── Init ── */

  function kidsPickColor(color, idx) {
    window._kidsSelColor = color;
    document.querySelectorAll('[data-kci]').forEach(function(el){
      el.style.border = '2.5px solid ' + (parseInt(el.dataset.kci) === idx ? '#fff' : 'transparent');
    });
    var inp = document.getElementById('kp-name');
    var preview = document.getElementById('kp-dome-preview');
    if (preview) preview.innerHTML = kidsDome({ id:'preview', name: (inp ? inp.value : '') || '?', color: color, photo: null }, 52);
  }

  function kidsSaveProfile() {
    var inp = document.getElementById('kp-name');
    var name = inp ? inp.value.trim() : '';
    if (!name) { if (inp) inp.style.border = '2px solid #FF6B6B'; return; }
    var profiles = loadProfiles();
    if (profiles.length >= 5) return;
    var PROFILE_COLORS = ['#C9A84C','#2C4A3E','#4A3728','#3A3060','#5C3A4A'];
    var newP = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2,6),
      name: name,
      color: window._kidsSelColor || PROFILE_COLORS[0],
      photo: null,
      created: new Date().toISOString()
    };
    profiles.push(newP);
    localStorage.setItem('deentag_profiles', JSON.stringify(profiles));
    setActiveId(newP.id);
    updateKidsTabAvatar();
    openKidsProfileModal();
    window.dispatchEvent(new CustomEvent('deentag:profileChanged', { detail:{ id:newP.id } }));
  }

  window.openKidsProfileModal  = openKidsProfileModal;
  window.closeKidsProfileModal = closeKidsProfileModal;
  window.kidsAddProfile        = kidsAddProfile;
  window.kidsPickColor         = kidsPickColor;
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
