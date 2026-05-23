/* ===================================================
   DEENTAG — SYSTÈME DE 30 THÈMES
=================================================== */

const THEMES = [
  { id: 'day',              name: 'Jour Doré',       emoji: '☀️', bg: '#FAF7F0', accent: '#C9A84C' },
  { id: 'night',            name: 'Nuit Dorée',      emoji: '🌙', bg: '#0F0D08', accent: '#F0C040' },
  { id: 'theme-medina',     name: 'Médina Nacre',    emoji: '🕌', bg: '#FAF8F4', accent: '#C9A258' },
  { id: 'theme-mekka',      name: 'Mekka Minuit',    emoji: '🌑', bg: '#0A0806', accent: '#FFD060' },
  { id: 'theme-andalousie', name: 'Andalousie',      emoji: '🌿', bg: '#F0F7F2', accent: '#2A8040' },
  { id: 'theme-desert',     name: 'Désert Safran',   emoji: '🏜️', bg: '#FFF8EC', accent: '#D4820A' },
  { id: 'theme-perse',      name: 'Nuit Persane',    emoji: '🔮', bg: '#0E0814', accent: '#E0A030' },
  { id: 'theme-ottoman',    name: 'Ottoman',         emoji: '🧿', bg: '#F4FDFF', accent: '#006888' },
  { id: 'theme-ramadan',    name: 'Ramadan',         emoji: '⭐', bg: '#060D1A', accent: '#C8D8F8' },
  { id: 'theme-bagdad',     name: 'Bagdad',          emoji: '🌴', bg: '#071410', accent: '#D4A820' },
  { id: 'theme-qairawan',   name: 'Qaïrawan',        emoji: '🏺', bg: '#FEF5F0', accent: '#C0602A' },
  { id: 'theme-istanbul',   name: 'Istanbul',        emoji: '🌉', bg: '#F8F8F8', accent: '#B89840' },
  { id: 'theme-lapis',      name: 'Lapis Lazuli',    emoji: '💙', bg: '#F8F4EC', accent: '#1A4890' },
  { id: 'theme-onyx',       name: 'Onyx Argenté',   emoji: '⬛', bg: '#0A0A0A', accent: '#A8A8A8' },
  { id: 'theme-sultanat',   name: 'Sultanat',        emoji: '👑', bg: '#1A0508', accent: '#D4A830' },
  { id: 'theme-oasis',      name: 'Oasis',           emoji: '🌵', bg: '#FAFAFA', accent: '#487848' },
  { id: 'theme-damas',      name: 'Ambre Damas',     emoji: '🟡', bg: '#FFF8EC', accent: '#D08A00' },
  { id: 'theme-soufi',      name: 'Soufi Doré',      emoji: '✨', bg: '#FFFFF8', accent: '#C8A000' },
  { id: 'theme-crepuscule', name: 'Crépuscule',      emoji: '🌅', bg: '#110810', accent: '#FF8820' },
  { id: 'theme-calligraphie',name:'Calligraphie',    emoji: '✍️', bg: '#F8F0E0', accent: '#805000' },
  { id: 'theme-cordoue',    name: 'Cordoue',         emoji: '💜', bg: '#F0F2FF', accent: '#7060C0' },
  { id: 'theme-platine',    name: 'Platine Céleste', emoji: '🩵', bg: '#F4F8FC', accent: '#4888C0' },
  { id: 'theme-aurore',     name: 'Aurore',          emoji: '🌸', bg: '#FFF0F8', accent: '#C04880' },
  { id: 'theme-kufique',    name: 'Kufique',         emoji: '📐', bg: '#F0EFEC', accent: '#A07840' },
  { id: 'theme-jardin',     name: 'Jardin Secret',   emoji: '🌱', bg: '#F2F7F0', accent: '#5A8A3A' },
  { id: 'theme-caire',      name: 'Topaze Caire',    emoji: '🟠', bg: '#FFF5E8', accent: '#C86010' },
  { id: 'theme-grenade',    name: 'Nuit Grenade',    emoji: '🍷', bg: '#0C0608', accent: '#E02828' },
  { id: 'theme-musee',      name: 'Musée Islam.',    emoji: '🏛️', bg: '#F5EDDF', accent: '#986020' },
  { id: 'theme-samarcande', name: 'Samarcande',      emoji: '🔵', bg: '#08101C', accent: '#60A8E8' },
  { id: 'theme-cornaline',  name: 'Cornaline',       emoji: '🔴', bg: '#FFF8F5', accent: '#C04820' },
  { id: 'theme-cobalt',     name: 'Cobalt',          emoji: '🕍', bg: '#EEF4FF', accent: '#1838B0' },
  { id: 'theme-prophete',   name: "Or du Prophète",  emoji: '☪️', bg: '#FFFCF0', accent: '#D4A000' }
];

const ALL_THEME_CLASSES = THEMES.map(t => t.id).filter(id => id !== 'day' && id !== 'night');

function applyTheme(themeId) {
  document.body.classList.remove(...ALL_THEME_CLASSES, 'day', 'night');
  const theme = THEMES.find(t => t.id === themeId);
  if (!theme) return;
  document.body.classList.add(themeId === 'night' ? 'night' : themeId === 'day' ? 'day' : themeId);
  localStorage.setItem('deentag_active_theme', themeId);
  document.querySelectorAll('.theme-chip').forEach(chip => {
    const isActive = chip.dataset.themeId === themeId;
    chip.classList.toggle('active', isActive);
    chip.style.borderColor = isActive ? theme.accent : '';
  });
}

function openThemePanel() {
  document.getElementById('dt-theme-panel').classList.add('open');
  const ov = document.getElementById('dt-theme-overlay'); ov.classList.add('open'); ov.style.pointerEvents = 'all';
}

function closeThemePanel() {
  document.getElementById('dt-theme-panel').classList.remove('open');
  const ov2 = document.getElementById('dt-theme-overlay'); ov2.classList.remove('open'); ov2.style.pointerEvents = 'none'; ov2.style.display = 'none'; setTimeout(()=>{ ov2.style.display=''; }, 50);
}

function buildThemePanel() {
  // Overlay — z-index 480 pour ne PAS bloquer le bottom-sheet existant (z-index 400+)
  const overlay = document.createElement('div');
  overlay.id = 'dt-theme-overlay';
  overlay.className = 'theme-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.50);z-index:280;display:none;pointer-events:none;';
  overlay.onclick = closeThemePanel;
  document.body.appendChild(overlay);

  // Panel
  const panel = document.createElement('div');
  panel.id = 'dt-theme-panel';
  panel.className = 'theme-panel';
  panel.style.zIndex = '290';

  const activeId = localStorage.getItem('deentag_active_theme') || 'day';

  let chipsHTML = '';
  THEMES.forEach(theme => {
    const isActive = theme.id === activeId;
    chipsHTML += `
      <div class="theme-chip${isActive ? ' active' : ''}"
           data-theme-id="${theme.id}"
           onclick="applyTheme('${theme.id}'); setTimeout(closeThemePanel, 280);"
           style="${isActive ? 'border-color:' + theme.accent : ''}">
        <div class="theme-swatch" style="background:${theme.bg};border-color:${theme.accent}55;">
          <span>${theme.emoji}</span>
        </div>
        <span class="theme-chip-name">${theme.name}</span>
      </div>`;
  });

  panel.innerHTML = `
    <div class="theme-panel-handle"><div class="theme-panel-bar"></div></div>
    <p class="theme-panel-title">Choisir un Thème</p>
    <div class="islamic-sep">
      <div class="islamic-sep-line"></div>
      <span class="islamic-sep-star">✦ ☪ ✦</span>
      <div class="islamic-sep-line"></div>
    </div>
    <div class="theme-grid">${chipsHTML}</div>
  `;

  document.body.appendChild(panel);
}

// Init
window.addEventListener('DOMContentLoaded', function() {
  buildThemePanel();

  // Restaurer thème sauvegardé
  const saved = localStorage.getItem('deentag_active_theme');
  if (saved) applyTheme(saved);

  // Remplacer le bouton ☀️ par 🎨
  const themeBtn = document.getElementById('theme-circle-btn');
  if (themeBtn) {
    themeBtn.textContent = '🎨';
    themeBtn.removeAttribute('onclick');
    themeBtn.onclick = openThemePanel;
  }

  // Autres pages
  document.querySelectorAll('.circle-btn[onclick="toggleTheme()"]').forEach(btn => {
    btn.textContent = '🎨';
    btn.removeAttribute('onclick');
    btn.onclick = openThemePanel;
  });
});

// ===== 20 NOUVEAUX THÈMES VERTS =====
// Ajoutés dynamiquement à la liste THEMES
(function() {
  const greens = [
    { id: 'theme-emeraude',         name: 'Émeraude Royale',   emoji: '💎', bg: '#041A0C', accent: '#50C878' },
    { id: 'theme-foret',            name: 'Forêt Médine',      emoji: '🌲', bg: '#F5FAF5', accent: '#3A7A3A' },
    { id: 'theme-jade',             name: 'Jade Perse',        emoji: '🍃', bg: '#F0FBF5', accent: '#28A870' },
    { id: 'theme-kaki',             name: 'Minaret Kaki',      emoji: '🏰', bg: '#F2F0E8', accent: '#788050' },
    { id: 'theme-saoudi',           name: 'Nuit Saoudite',     emoji: '🇸🇦', bg: '#002010', accent: '#00A850' },
    { id: 'theme-menthe',           name: 'Menthe Maghreb',    emoji: '🌿', bg: '#F4FDF7', accent: '#18B858' },
    { id: 'theme-olive',            name: 'Olive Andalouse',   emoji: '🫒', bg: '#FAF8F0', accent: '#808020' },
    { id: 'theme-sarcelle',         name: 'Bosphore Nuit',     emoji: '🌊', bg: '#061618', accent: '#30C8A8' },
    { id: 'theme-pistache',         name: 'Pistache Dorée',    emoji: '🟢', bg: '#F8FCF4', accent: '#90B840' },
    { id: 'theme-mousse',           name: 'Mousse Kairouan',   emoji: '🍵', bg: '#F4F5EE', accent: '#607040' },
    { id: 'theme-vert-prophetique', name: 'Vert Prophétique',  emoji: '☪️', bg: '#FAFFFC', accent: '#008040' },
    { id: 'theme-cedre',            name: 'Cèdre Liban',       emoji: '🌳', bg: '#F5F8F4', accent: '#507830' },
    { id: 'theme-malachite',        name: 'Malachite',         emoji: '🔋', bg: '#080E08', accent: '#48E848' },
    { id: 'theme-roseau',           name: 'Roseau de Rumi',    emoji: '🎋', bg: '#F2FBF8', accent: '#20A878' },
    { id: 'theme-palme',            name: "Palme d'Or Verte",  emoji: '🌴', bg: '#FFF9EC', accent: '#6A9810' },
    { id: 'theme-abbasside',        name: 'Vert Abbasside',    emoji: '👑', bg: '#08100C', accent: '#509860' },
    { id: 'theme-turquoise-nuit',   name: 'Turquoise Nuit',    emoji: '🩵', bg: '#061418', accent: '#20C8C8' },
    { id: 'theme-vert-soufi',       name: 'Vert Soufi',        emoji: '✨', bg: '#FAFDF8', accent: '#689848' },
    { id: 'theme-almohade',         name: 'Vert Almohade',     emoji: '⚔️', bg: '#F8FFF8', accent: '#009000' },
    { id: 'theme-eden',             name: 'Éden Islamique',    emoji: '🌺', bg: '#FDFFF8', accent: '#40C860' },
  ];
  greens.forEach(t => THEMES.push(t));
  // Mettre à jour la liste des classes à supprimer
  greens.forEach(t => ALL_THEME_CLASSES.push(t.id));
})();
