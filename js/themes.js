/* ===================================================
   DEENTAG — SYSTÈME DE THÈMES — Menu déroulant
=================================================== */

const THEMES = [
  { id: 'day',                     name: 'Jour Doré',        emoji: '☀️', bg: '#FAF7F0', accent: '#C9A84C' },
  { id: 'night',                   name: 'Nuit Dorée',       emoji: '🌙', bg: '#0F0D08', accent: '#F0C040' },
  { id: 'theme-medina',            name: 'Médina Nacre',     emoji: '🕌', bg: '#FAF8F4', accent: '#C9A258' },
  { id: 'theme-mekka',             name: 'Mekka Minuit',     emoji: '🌑', bg: '#0A0806', accent: '#FFD060' },
  { id: 'theme-andalousie',        name: 'Andalousie',       emoji: '🌿', bg: '#F0F7F2', accent: '#2A8040' },
  { id: 'theme-desert',            name: 'Désert Safran',    emoji: '🏜️', bg: '#FFF8EC', accent: '#D4820A' },
  { id: 'theme-perse',             name: 'Nuit Persane',     emoji: '🔮', bg: '#0E0814', accent: '#E0A030' },
  { id: 'theme-ottoman',           name: 'Ottoman',          emoji: '🧿', bg: '#F4FDFF', accent: '#006888' },
  { id: 'theme-ramadan',           name: 'Ramadan',          emoji: '⭐', bg: '#060D1A', accent: '#C8D8F8' },
  { id: 'theme-bagdad',            name: 'Bagdad',           emoji: '🌴', bg: '#071410', accent: '#D4A820' },
  { id: 'theme-qairawan',          name: 'Qaïrawan',         emoji: '🏺', bg: '#FEF5F0', accent: '#C0602A' },
  { id: 'theme-istanbul',          name: 'Istanbul',         emoji: '🌉', bg: '#F8F8F8', accent: '#B89840' },
  { id: 'theme-lapis',             name: 'Lapis Lazuli',     emoji: '💙', bg: '#F8F4EC', accent: '#1A4890' },
  { id: 'theme-onyx',              name: 'Onyx Argenté',    emoji: '⬛', bg: '#0A0A0A', accent: '#A8A8A8' },
  { id: 'theme-sultanat',          name: 'Sultanat',         emoji: '👑', bg: '#1A0508', accent: '#D4A830' },
  { id: 'theme-oasis',             name: 'Oasis',            emoji: '🌵', bg: '#FAFAFA', accent: '#487848' },
  { id: 'theme-damas',             name: 'Ambre Damas',      emoji: '🟡', bg: '#FFF8EC', accent: '#D08A00' },
  { id: 'theme-soufi',             name: 'Soufi Doré',       emoji: '✨', bg: '#FFFFF8', accent: '#C8A000' },
  { id: 'theme-crepuscule',        name: 'Crépuscule',       emoji: '🌅', bg: '#110810', accent: '#FF8820' },
  { id: 'theme-calligraphie',      name: 'Calligraphie',     emoji: '✍️', bg: '#F8F0E0', accent: '#805000' },
  { id: 'theme-cordoue',           name: 'Cordoue',          emoji: '💜', bg: '#F0F2FF', accent: '#7060C0' },
  { id: 'theme-platine',           name: 'Platine Céleste',  emoji: '🩵', bg: '#F4F8FC', accent: '#4888C0' },
  { id: 'theme-aurore',            name: 'Aurore',           emoji: '🌸', bg: '#FFF0F8', accent: '#C04880' },
  { id: 'theme-kufique',           name: 'Kufique',          emoji: '📐', bg: '#F0EFEC', accent: '#A07840' },
  { id: 'theme-jardin',            name: 'Jardin Secret',    emoji: '🌱', bg: '#F2F7F0', accent: '#5A8A3A' },
  { id: 'theme-caire',             name: 'Topaze Caire',     emoji: '🟠', bg: '#FFF5E8', accent: '#C86010' },
  { id: 'theme-grenade',           name: 'Nuit Grenade',     emoji: '🍷', bg: '#0C0608', accent: '#E02828' },
  { id: 'theme-musee',             name: 'Musée Islam.',     emoji: '🏛️', bg: '#F5EDDF', accent: '#986020' },
  { id: 'theme-samarcande',        name: 'Samarcande',       emoji: '🔵', bg: '#08101C', accent: '#60A8E8' },
  { id: 'theme-cornaline',         name: 'Cornaline',        emoji: '🔴', bg: '#FFF8F5', accent: '#C04820' },
  { id: 'theme-cobalt',            name: 'Cobalt',           emoji: '🕍', bg: '#EEF4FF', accent: '#1838B0' },
  { id: 'theme-prophete',          name: "Or du Prophète",   emoji: '☪️', bg: '#FFFCF0', accent: '#D4A000' },
  { id: 'theme-emeraude',          name: 'Émeraude Royale',  emoji: '💎', bg: '#041A0C', accent: '#50C878' },
  { id: 'theme-foret',             name: 'Forêt Médine',     emoji: '🌲', bg: '#F5FAF5', accent: '#3A7A3A' },
  { id: 'theme-jade',              name: 'Jade Perse',       emoji: '🍃', bg: '#F0FBF5', accent: '#28A870' },
  { id: 'theme-kaki',              name: 'Minaret Kaki',     emoji: '🏰', bg: '#F2F0E8', accent: '#788050' },
  { id: 'theme-saoudi',            name: 'Nuit Saoudite',    emoji: '🟩', bg: '#002010', accent: '#00A850' },
  { id: 'theme-menthe',            name: 'Menthe Maghreb',   emoji: '🌿', bg: '#F4FDF7', accent: '#18B858' },
  { id: 'theme-olive',             name: 'Olive Andalouse',  emoji: '🫒', bg: '#FAF8F0', accent: '#808020' },
  { id: 'theme-sarcelle',          name: 'Bosphore Nuit',    emoji: '🌊', bg: '#061618', accent: '#30C8A8' },
  { id: 'theme-pistache',          name: 'Pistache Dorée',   emoji: '🟢', bg: '#F8FCF4', accent: '#90B840' },
  { id: 'theme-mousse',            name: 'Mousse Kairouan',  emoji: '🍵', bg: '#F4F5EE', accent: '#607040' },
  { id: 'theme-vert-prophetique',  name: 'Vert Prophétique', emoji: '☪️', bg: '#FAFFFC', accent: '#008040' },
  { id: 'theme-cedre',             name: 'Cèdre Liban',      emoji: '🌳', bg: '#F5F8F4', accent: '#507830' },
  { id: 'theme-malachite',         name: 'Malachite',        emoji: '💚', bg: '#080E08', accent: '#48E848' },
  { id: 'theme-roseau',            name: 'Roseau de Rumi',   emoji: '🎋', bg: '#F2FBF8', accent: '#20A878' },
  { id: 'theme-palme',             name: 'Palme Verte',      emoji: '🌴', bg: '#FFF9EC', accent: '#6A9810' },
  { id: 'theme-abbasside',         name: 'Vert Abbasside',   emoji: '👑', bg: '#08100C', accent: '#509860' },
  { id: 'theme-turquoise-nuit',    name: 'Turquoise Nuit',   emoji: '🩵', bg: '#061418', accent: '#20C8C8' },
  { id: 'theme-vert-soufi',        name: 'Vert Soufi',       emoji: '✨', bg: '#FAFDF8', accent: '#689848' },
  { id: 'theme-almohade',          name: 'Vert Almohade',    emoji: '⚔️', bg: '#F8FFF8', accent: '#009000' },
  { id: 'theme-eden',              name: 'Éden Islamique',   emoji: '🌺', bg: '#FDFFF8', accent: '#40C860' },
];

const ALL_THEME_CLASSES = THEMES.map(t => t.id).filter(id => id !== 'day' && id !== 'night');

let themeMenuOpen = false;

function applyTheme(themeId) {
  document.body.classList.remove(...ALL_THEME_CLASSES, 'day', 'night');
  document.body.classList.add(themeId === 'night' ? 'night' : themeId === 'day' ? 'day' : themeId);
  localStorage.setItem('deentag_active_theme', themeId);
  // Mettre à jour la puce active
  document.querySelectorAll('.dt-theme-item').forEach(item => {
    item.classList.toggle('dt-active', item.dataset.themeId === themeId);
  });
  closeThemeMenu();
}

function toggleThemeMenu(e) {
  e && e.stopPropagation();
  themeMenuOpen ? closeThemeMenu() : openThemeMenu();
}

function openThemeMenu() {
  const menu = document.getElementById('dt-theme-menu');
  if (!menu) return;
  themeMenuOpen = true;
  menu.style.display = 'block';
  requestAnimationFrame(() => menu.classList.add('dt-open'));
}

function closeThemeMenu() {
  const menu = document.getElementById('dt-theme-menu');
  if (!menu) return;
  themeMenuOpen = false;
  menu.classList.remove('dt-open');
  setTimeout(() => { if (!themeMenuOpen) menu.style.display = 'none'; }, 250);
}

function buildThemeMenu() {
  // Injecter le CSS du menu déroulant
  const style = document.createElement('style');
  style.textContent = `
    #dt-theme-menu {
      display: none;
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      width: 220px;
      max-height: 60vh;
      overflow-y: auto;
      background: var(--bg, #FAF7F0);
      border: 1.5px solid var(--gold, #C9A84C);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18);
      z-index: 999;
      opacity: 0;
      transform: translateY(-8px) scale(0.97);
      transition: opacity 0.22s ease, transform 0.22s ease;
      padding: 6px 0;
    }
    #dt-theme-menu.dt-open {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    #dt-theme-menu::-webkit-scrollbar { width: 3px; }
    #dt-theme-menu::-webkit-scrollbar-thumb { background: var(--gold, #C9A84C); border-radius: 3px; }

    .dt-theme-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 14px;
      cursor: pointer;
      border-radius: 10px;
      margin: 2px 6px;
      transition: background 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .dt-theme-item:active { background: rgba(201,168,76,0.15); }
    .dt-theme-item.dt-active { background: rgba(201,168,76,0.18); }

    .dt-swatch {
      width: 28px; height: 28px;
      border-radius: 50%;
      border: 1.5px solid rgba(0,0,0,0.10);
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; flex-shrink: 0;
    }
    .dt-item-name {
      font-family: 'Cinzel', serif;
      font-size: 9px;
      letter-spacing: 0.10em;
      color: var(--text, #1A1400);
      text-transform: uppercase;
    }
    .dt-theme-sep {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold, #C9A84C), transparent);
      opacity: 0.3;
      margin: 4px 10px;
    }

    /* Wrapper relatif pour positionner le menu */
    #dt-theme-btn-wrapper {
      position: relative;
    }
  `;
  document.head.appendChild(style);

  // Construire le menu
  const menu = document.createElement('div');
  menu.id = 'dt-theme-menu';

  const activeId = localStorage.getItem('deentag_active_theme') || 'day';

  THEMES.forEach((theme, i) => {
    // Séparateur avant les verts
    if (i === 32) {
      const sep = document.createElement('div');
      sep.className = 'dt-theme-sep';
      menu.appendChild(sep);
    }

    const item = document.createElement('div');
    item.className = 'dt-theme-item' + (theme.id === activeId ? ' dt-active' : '');
    item.dataset.themeId = theme.id;
    item.innerHTML = `
      <div class="dt-swatch" style="background:${theme.bg};border-color:${theme.accent}66;">
        <span>${theme.emoji}</span>
      </div>
      <span class="dt-item-name">${theme.name}</span>
    `;
    item.onclick = () => applyTheme(theme.id);
    menu.appendChild(item);
  });

  // Fermer si on clique ailleurs
  document.addEventListener('click', (e) => {
    if (themeMenuOpen && !menu.contains(e.target) && e.target.id !== 'dt-theme-btn') {
      closeThemeMenu();
    }
  });

  return menu;
}

window.addEventListener('DOMContentLoaded', function () {
  // Trouver le bouton thème existant
  const themeBtn = document.getElementById('theme-circle-btn') ||
                   document.querySelector('.circle-btn[onclick="toggleTheme()"]');

  if (!themeBtn) return;

  // Remplacer le onclick
  themeBtn.id = 'dt-theme-btn';
  themeBtn.textContent = '🎨';
  themeBtn.removeAttribute('onclick');
  themeBtn.onclick = toggleThemeMenu;

  // Wrapper relatif pour que le menu se positionne correctement
  const wrapper = document.createElement('div');
  wrapper.id = 'dt-theme-btn-wrapper';
  themeBtn.parentNode.insertBefore(wrapper, themeBtn);
  wrapper.appendChild(themeBtn);

  // Ajouter le menu dans le wrapper
  const menu = buildThemeMenu();
  wrapper.appendChild(menu);

  // Restaurer thème sauvegardé
  const saved = localStorage.getItem('deentag_active_theme');
  if (saved && saved !== 'day') applyTheme(saved);
});
