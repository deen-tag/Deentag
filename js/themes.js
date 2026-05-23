/* ===================================================
   DEENTAG — SYSTÈME DE 30 THÈMES
=================================================== */

const THEMES = [
  {
    id: 'day',
    name: 'Jour Doré',
    emoji: '☀️',
    bg: '#FAF7F0',
    accent: '#C9A84C',
    built_in: true
  },
  {
    id: 'night',
    name: 'Nuit Dorée',
    emoji: '🌙',
    bg: '#0F0D08',
    accent: '#F0C040',
    built_in: true
  },
  {
    id: 'theme-medina',
    name: 'Médina Nacre',
    emoji: '🕌',
    bg: '#FAF8F4',
    accent: '#C9A258'
  },
  {
    id: 'theme-mekka',
    name: 'Mekka Minuit',
    emoji: '🌑',
    bg: '#0A0806',
    accent: '#FFD060'
  },
  {
    id: 'theme-andalousie',
    name: 'Andalousie',
    emoji: '🌿',
    bg: '#F0F7F2',
    accent: '#2A8040'
  },
  {
    id: 'theme-desert',
    name: 'Désert Safran',
    emoji: '🏜️',
    bg: '#FFF8EC',
    accent: '#D4820A'
  },
  {
    id: 'theme-perse',
    name: 'Nuit Persane',
    emoji: '🔮',
    bg: '#0E0814',
    accent: '#E0A030'
  },
  {
    id: 'theme-ottoman',
    name: 'Ottoman',
    emoji: '🧿',
    bg: '#F4FDFF',
    accent: '#006888'
  },
  {
    id: 'theme-ramadan',
    name: 'Ramadan',
    emoji: '⭐',
    bg: '#060D1A',
    accent: '#C8D8F8'
  },
  {
    id: 'theme-bagdad',
    name: 'Bagdad',
    emoji: '🌴',
    bg: '#071410',
    accent: '#D4A820'
  },
  {
    id: 'theme-qairawan',
    name: 'Qaïrawan',
    emoji: '🏺',
    bg: '#FEF5F0',
    accent: '#C0602A'
  },
  {
    id: 'theme-istanbul',
    name: 'Istanbul',
    emoji: '🌉',
    bg: '#F8F8F8',
    accent: '#B89840'
  },
  {
    id: 'theme-lapis',
    name: 'Lapis Lazuli',
    emoji: '💙',
    bg: '#F8F4EC',
    accent: '#1A4890'
  },
  {
    id: 'theme-onyx',
    name: 'Onyx Argenté',
    emoji: '⬛',
    bg: '#0A0A0A',
    accent: '#A8A8A8'
  },
  {
    id: 'theme-sultanat',
    name: 'Sultanat',
    emoji: '👑',
    bg: '#1A0508',
    accent: '#D4A830'
  },
  {
    id: 'theme-oasis',
    name: 'Oasis',
    emoji: '🌵',
    bg: '#FAFAFA',
    accent: '#487848'
  },
  {
    id: 'theme-damas',
    name: 'Ambre Damas',
    emoji: '🟡',
    bg: '#FFF8EC',
    accent: '#D08A00'
  },
  {
    id: 'theme-soufi',
    name: 'Soufi Doré',
    emoji: '✨',
    bg: '#FFFFF8',
    accent: '#C8A000'
  },
  {
    id: 'theme-crepuscule',
    name: 'Crépuscule',
    emoji: '🌅',
    bg: '#110810',
    accent: '#FF8820'
  },
  {
    id: 'theme-calligraphie',
    name: 'Calligraphie',
    emoji: '✍️',
    bg: '#F8F0E0',
    accent: '#805000'
  },
  {
    id: 'theme-cordoue',
    name: 'Cordoue',
    emoji: '💜',
    bg: '#F0F2FF',
    accent: '#7060C0'
  },
  {
    id: 'theme-platine',
    name: 'Platine Céleste',
    emoji: '🩵',
    bg: '#F4F8FC',
    accent: '#4888C0'
  },
  {
    id: 'theme-aurore',
    name: 'Aurore',
    emoji: '🌸',
    bg: '#FFF0F8',
    accent: '#C04880'
  },
  {
    id: 'theme-kufique',
    name: 'Kufique',
    emoji: '📐',
    bg: '#F0EFEC',
    accent: '#A07840'
  },
  {
    id: 'theme-jardin',
    name: 'Jardin Secret',
    emoji: '🌱',
    bg: '#F2F7F0',
    accent: '#5A8A3A'
  },
  {
    id: 'theme-caire',
    name: 'Topaze Caire',
    emoji: '🟠',
    bg: '#FFF5E8',
    accent: '#C86010'
  },
  {
    id: 'theme-grenade',
    name: 'Nuit Grenade',
    emoji: '🍷',
    bg: '#0C0608',
    accent: '#E02828'
  },
  {
    id: 'theme-musee',
    name: 'Musée Islam.',
    emoji: '🏛️',
    bg: '#F5EDDF',
    accent: '#986020'
  },
  {
    id: 'theme-samarcande',
    name: 'Samarcande',
    emoji: '🔵',
    bg: '#08101C',
    accent: '#60A8E8'
  },
  {
    id: 'theme-cornaline',
    name: 'Cornaline',
    emoji: '🔴',
    bg: '#FFF8F5',
    accent: '#C04820'
  },
  {
    id: 'theme-cobalt',
    name: 'Cobalt',
    emoji: '🕍',
    bg: '#EEF4FF',
    accent: '#1838B0'
  },
  {
    id: 'theme-prophete',
    name: "Or du Prophète",
    emoji: '☪️',
    bg: '#FFFCF0',
    accent: '#D4A000'
  }
];

// Classes à retirer lors du changement de thème
const ALL_THEME_CLASSES = THEMES.map(t => t.id).filter(id => id !== 'day' && id !== 'night');

// Appliquer un thème
function applyTheme(themeId) {
  // Retirer tous les thèmes custom
  document.body.classList.remove(...ALL_THEME_CLASSES, 'day', 'night', 'kids');

  const theme = THEMES.find(t => t.id === themeId);
  if (!theme) return;

  if (themeId === 'day') {
    document.body.classList.add('day');
    updateThemeCircleBtnIfExists();
  } else if (themeId === 'night') {
    document.body.classList.add('night');
    updateThemeCircleBtnIfExists();
  } else {
    document.body.classList.add(themeId);
    // Mettre à jour le bouton emoji de la topbar
    updateThemeCircleBtnIfExists();
  }

  // Sauvegarder
  localStorage.setItem('deentag_active_theme', themeId);

  // Mettre à jour les chips actifs
  document.querySelectorAll('.theme-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.themeId === themeId);
    if (chip.dataset.themeId === themeId) {
      chip.style.setProperty('--current-accent', theme.accent);
      chip.style.borderColor = theme.accent;
    } else {
      chip.style.borderColor = '';
    }
  });
}

function updateThemeCircleBtnIfExists() {
  // Mettre à jour l'icône du bouton thème dans la topbar si c'est day/night
  const btn = document.getElementById('theme-selector-btn');
  if (btn) return; // Le sélecteur 30 thèmes est là, pas besoin
  // Sinon, mise à jour des anciens boutons
  const isNight = document.body.classList.contains('night');
  document.querySelectorAll('#theme-circle-btn, .circle-btn[onclick="toggleTheme()"]').forEach(b => {
    b.innerHTML = isNight ? '🌙' : '☀️';
  });
}

// Construire et afficher le panel
function buildThemePanel() {
  // Créer l'overlay
  const overlay = document.createElement('div');
  overlay.className = 'theme-overlay';
  overlay.id = 'theme-overlay';
  overlay.onclick = closeThemePanel;
  document.body.appendChild(overlay);

  // Créer le panel
  const panel = document.createElement('div');
  panel.className = 'theme-panel';
  panel.id = 'theme-panel';

  panel.innerHTML = `
    <div class="theme-panel-handle">
      <div class="theme-panel-bar"></div>
    </div>
    <p class="theme-panel-title">Choisir un Thème</p>
    <div class="islamic-sep">
      <div class="islamic-sep-line"></div>
      <span class="islamic-sep-star">✦ ☪ ✦</span>
      <div class="islamic-sep-line"></div>
    </div>
    <div class="theme-grid" id="theme-grid"></div>
  `;

  document.body.appendChild(panel);

  // Remplir la grille
  const grid = panel.querySelector('#theme-grid');
  const activeThemeId = localStorage.getItem('deentag_active_theme') || 'day';

  THEMES.forEach(theme => {
    const chip = document.createElement('div');
    chip.className = 'theme-chip' + (theme.id === activeThemeId ? ' active' : '');
    chip.dataset.themeId = theme.id;
    if (theme.id === activeThemeId) {
      chip.style.borderColor = theme.accent;
      chip.style.setProperty('--current-accent', theme.accent);
    }

    chip.innerHTML = `
      <div class="theme-swatch" style="background:${theme.bg}; border-color:${theme.accent}40;">
        <span>${theme.emoji}</span>
      </div>
      <span class="theme-chip-name">${theme.name}</span>
    `;

    chip.onclick = () => {
      applyTheme(theme.id);
      // Animation légère
      chip.style.transform = 'scale(0.93)';
      setTimeout(() => { chip.style.transform = ''; }, 150);
      // Fermer après un court délai
      setTimeout(closeThemePanel, 300);
    };

    grid.appendChild(chip);
  });
}

function openThemePanel() {
  document.getElementById('theme-panel').classList.add('open');
  document.getElementById('theme-overlay').classList.add('open');
}

function closeThemePanel() {
  const panel = document.getElementById('theme-panel');
  const overlay = document.getElementById('theme-overlay');
  if (panel) panel.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

// Init au chargement
window.addEventListener('DOMContentLoaded', () => {
  buildThemePanel();

  // Restaurer le thème sauvegardé
  const saved = localStorage.getItem('deentag_active_theme');
  if (saved) {
    applyTheme(saved);
  }

  // Remplacer l'ancien bouton jour/nuit par le sélecteur 30 thèmes
  const oldThemeBtn = document.getElementById('theme-circle-btn');
  if (oldThemeBtn) {
    oldThemeBtn.innerHTML = '🎨';
    oldThemeBtn.id = 'theme-selector-btn';
    oldThemeBtn.removeAttribute('onclick');
    oldThemeBtn.onclick = openThemePanel;
  }

  // Aussi remplacer les autres boutons toggleTheme sur les autres pages
  document.querySelectorAll('.circle-btn[onclick="toggleTheme()"]').forEach(btn => {
    btn.innerHTML = '🎨';
    btn.removeAttribute('onclick');
    btn.onclick = openThemePanel;
  });
});
