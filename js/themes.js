// ===== DEENTAG — THEME SWITCHER v1 =====

const THEMES = [
  { id: 1,  name: 'Islamic Gold',    bg: '#FAF7F0', top: '#FAF7F0', accent: '#C9A84C', text: '#0d0a04', emoji: '🕌' },
  { id: 2,  name: 'Space Nebula',    bg: '#050510', top: '#080818', accent: '#9D7AFF', text: '#E0D8FF', emoji: '🌌' },
  { id: 3,  name: 'Emerald Palace',  bg: '#F2FBF6', top: '#0A2415', accent: '#1A9A5A', text: '#0A2415', emoji: '💚' },
  { id: 4,  name: 'Rose Quartz',     bg: '#FFF5F8', top: '#FFF5F8', accent: '#D4547A', text: '#2A0A12', emoji: '🌸' },
  { id: 5,  name: 'Neon Cyber',      bg: '#000008', top: '#000008', accent: '#00FFCC', text: '#00FFCC', emoji: '⚡' },
  { id: 6,  name: 'Marble Noir',     bg: '#F8F8F6', top: '#0A0A08', accent: '#3A3A30', text: '#0A0A08', emoji: '🖤' },
  { id: 7,  name: 'Aurora',          bg: '#010A12', top: '#010A12', accent: '#40FFAA', text: '#88FFEE', emoji: '🌿' },
  { id: 8,  name: 'Sand Dunes',      bg: '#F5EDD8', top: '#2A1A08', accent: '#B8882A', text: '#2A1A08', emoji: '🏜️' },
  { id: 9,  name: 'Ice Crystal',     bg: '#EEF6FF', top: '#FFFFFF', accent: '#2080C8', text: '#081828', emoji: '❄️' },
  { id: 10, name: 'Brutalist',       bg: '#FFEB00', top: '#000000', accent: '#FFEB00', text: '#000000', emoji: '⬛' },
  { id: 11, name: 'Vintage Parchmt', bg: '#F4EDD0', top: '#1C1008', accent: '#C09050', text: '#1C1008', emoji: '📜' },
  { id: 12, name: 'Lava Flow',       bg: '#0A0200', top: '#0A0200', accent: '#FF5500', text: '#FFB880', emoji: '🌋' },
  { id: 13, name: 'Glassmorphism',   bg: '#1A1035', top: 'rgba(255,255,255,0.08)', accent: '#FFE064', text: '#FFFFFF', emoji: '💎' },
  { id: 14, name: 'Electric Violet', bg: '#080012', top: '#080012', accent: '#CC44FF', text: '#E8D0FF', emoji: '💜' },
  { id: 15, name: 'Arctic Minimal',  bg: '#FAFCFF', top: '#FAFCFF', accent: '#3060C0', text: '#080C18', emoji: '🏔️' },
  { id: 16, name: 'Fire & Smoke',    bg: '#0D0808', top: '#0D0808', accent: '#FF6620', text: '#F0D0B0', emoji: '🔥' },
  { id: 17, name: 'Midnight Blue',   bg: '#040820', top: '#040820', accent: '#4080E0', text: '#C8D8F8', emoji: '🌊' },
  { id: 18, name: 'Cherry Blossom',  bg: '#FFF8FA', top: '#FFF8FA', accent: '#CC4488', text: '#1A0810', emoji: '🌺' },
  { id: 19, name: 'Dark Academia',   bg: '#1A1510', top: '#0E0B08', accent: '#D4AA60', text: '#DDD8C8', emoji: '📚' },
  { id: 20, name: 'Matrix Green',    bg: '#000A00', top: '#000A00', accent: '#00FF44', text: '#00DD00', emoji: '🟢' },
  { id: 21, name: 'Sultan Ottoman',  bg: '#F5EFE0', top: '#3A0010', accent: '#D4A040', text: '#0D0508', emoji: '🏛️' },
  { id: 22, name: 'Ocean Depth',     bg: '#020C18', top: '#020C18', accent: '#0098CC', text: '#B0E8FF', emoji: '🌊' },
  { id: 23, name: 'Calligraphy Ink', bg: '#F8F5EE', top: '#060402', accent: '#555555', text: '#060402', emoji: '✒️' },
  { id: 24, name: 'Tropical',        bg: '#F0FFF4', top: '#00A855', accent: '#00A855', text: '#041A0C', emoji: '🌴' },
  { id: 25, name: 'Steampunk',       bg: '#1C1208', top: '#0A0600', accent: '#C87820', text: '#E8C888', emoji: '⚙️' },
  { id: 26, name: 'Cotton Candy',    bg: '#FEF6FF', top: 'linear-gradient(135deg,#FFD0F0,#D8B0FF,#B0D8FF)', accent: '#A060D8', text: '#180820', emoji: '🍭' },
  { id: 27, name: 'Sunset Dusk',     bg: '#0A0510', top: '#180020', accent: '#FF8020', text: '#FFD8A0', emoji: '🌅' },
  { id: 28, name: 'Mecca Sacred',    bg: '#050300', top: '#050300', accent: '#D4A836', text: '#F8EDD0', emoji: '🕋' },
  { id: 29, name: 'Swiss Bauhaus',   bg: '#F5F500', top: '#0000CC', accent: '#F5F500', text: '#000000', emoji: '🎨' },
  { id: 30, name: 'Lunar Silver',    bg: '#F4F4F6', top: '#1C1C2C', accent: '#9090B8', text: '#080810', emoji: '🌙' },
  { id: 31, name: 'Coral Reef',      bg: '#FFF5F0', top: '#FF7050', accent: '#E84020', text: '#1A0808', emoji: '🪸' },
  { id: 32, name: 'Noir Cinéma',     bg: '#080808', top: '#080808', accent: '#E8E8E8', text: '#E8E8E8', emoji: '🎬' },
  { id: 33, name: 'Rainforest',      bg: '#F0F8EE', top: '#0A2000', accent: '#4A8020', text: '#0A1408', emoji: '🌿' },
  { id: 34, name: 'Arctic Storm',    bg: '#E8F4FF', top: '#0040A0', accent: '#1860D0', text: '#040C18', emoji: '⛄' },
  { id: 35, name: 'Topaz Med.',      bg: '#FAFFF8', top: '#F0FFEE', accent: '#20A880', text: '#040C08', emoji: '💠' },
  { id: 36, name: 'Burgundy',        bg: '#F8F0F2', top: '#180408', accent: '#900028', text: '#180408', emoji: '🍷' },
  { id: 37, name: 'Artisan Indigo',  bg: '#F0F0FF', top: '#050520', accent: '#3030D0', text: '#050520', emoji: '🔷' },
  { id: 38, name: 'Copper & Rust',   bg: '#1C0A06', top: '#0A0402', accent: '#CC6020', text: '#F0C8A0', emoji: '🔶' },
  { id: 39, name: 'Soft Sage',       bg: '#F4F7F2', top: '#F4F7F2', accent: '#5A7840', text: '#0C100A', emoji: '🍃' },
  { id: 40, name: 'Bauhaus Geo',     bg: '#F5F5F5', top: '#000000', accent: '#CC0000', text: '#000000', emoji: '⬜' },
  { id: 41, name: 'Holographic',     bg: '#0A0A0A', top: '#0A0A0A', accent: '#FF80FF', text: '#FFFFFF', emoji: '✨' },
  { id: 42, name: 'Islamic Teal',    bg: '#F0FAFA', top: '#041820', accent: '#0090A0', text: '#041820', emoji: '🌀' },
  { id: 43, name: 'Pastel Brutal',   bg: '#FFE8D8', top: '#FFE8D8', accent: '#000000', text: '#000000', emoji: '🧱' },
  { id: 44, name: 'Sacred Gold',     bg: '#FFFBEE', top: '#1A1400', accent: '#DDB800', text: '#0A0800', emoji: '⭐' },
  { id: 45, name: 'Candy Neon',      bg: '#0C0010', top: '#0C0010', accent: '#FF40FF', text: '#FFE0FF', emoji: '🌈' },
  { id: 46, name: 'Sepia Film',      bg: '#F0E8D8', top: '#180C04', accent: '#886030', text: '#180C04', emoji: '📷' },
  { id: 47, name: 'Electric Teal',   bg: '#020C0C', top: '#020C0C', accent: '#00DDC0', text: '#A0FFE8', emoji: '⚡' },
  { id: 48, name: 'Royal Amethyst',  bg: '#F8F2FF', top: '#0C0018', accent: '#7020C8', text: '#0C0018', emoji: '👑' },
  { id: 49, name: 'Japanese Zen',    bg: '#F8F5EE', top: '#F8F5EE', accent: '#8B3030', text: '#0A0808', emoji: '⛩️' },
  { id: 50, name: 'Pure Light',      bg: '#FFFFFF', top: '#FFFFFF', accent: '#888888', text: '#000000', emoji: '☀️' },
];

let currentTheme = parseInt(localStorage.getItem('deentag_theme') || '1');

function renderThemeSwatchColor(t) {
  // Topbar gradient on left, accent on right, bg as bg
  const bg    = t.bg.startsWith('#') ? t.bg : '#1A1035';
  const top   = t.top.startsWith('#') ? t.top : '#2A1A35';
  const acc   = t.accent;
  const txt   = t.text.startsWith('#') ? t.text : '#FFFFFF';

  return `background: linear-gradient(135deg, ${top} 50%, ${acc} 50%);`;
}

function openThemePanel() {
  let panel = document.getElementById('themePanel');
  let overlay = document.getElementById('themePanelOverlay');
  if (!panel) {
    buildThemePanel();
    panel = document.getElementById('themePanel');
    overlay = document.getElementById('themePanelOverlay');
  }
  overlay.classList.add('open');
  panel.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
}

function closeThemePanel() {
  const panel = document.getElementById('themePanel');
  const overlay = document.getElementById('themePanelOverlay');
  if (panel) panel.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
}

function buildThemePanel() {
  // Overlay
  const overlay = document.createElement('div');
  overlay.id = 'themePanelOverlay';
  overlay.className = 'theme-panel-overlay';
  overlay.addEventListener('click', closeThemePanel);
  document.body.appendChild(overlay);

  // Panel
  const panel = document.createElement('div');
  panel.id = 'themePanel';
  panel.className = 'theme-panel';
  panel.innerHTML = `
    <div class="theme-panel-handle"><div class="theme-panel-bar"></div></div>
    <div class="theme-panel-header">
      <div class="theme-panel-title">✦ Thèmes Visuels ✦</div>
      <div class="theme-panel-sub">50 ambiances uniques</div>
    </div>
    <div class="theme-panel-scroll">
      <div class="theme-grid" id="themeGrid"></div>
    </div>
  `;
  document.body.appendChild(panel);

  // Swipe to close
  let startY = 0;
  panel.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
  panel.addEventListener('touchend', e => {
    const dy = e.changedTouches[0].clientY - startY;
    if (dy > 80) closeThemePanel();
  }, { passive: true });

  renderThemeGrid();
}

function renderThemeGrid() {
  const grid = document.getElementById('themeGrid');
  if (!grid) return;
  grid.innerHTML = '';
  THEMES.forEach(t => {
    const sw = document.createElement('div');
    sw.className = 'theme-swatch' + (t.id === currentTheme ? ' active' : '');
    sw.dataset.themeId = t.id;
    sw.innerHTML = `
      <div class="theme-swatch-circle" style="${renderThemeSwatchColor(t)}"></div>
      <div class="theme-swatch-label">${t.emoji}<br>${t.name}</div>
    `;
    sw.addEventListener('click', () => selectTheme(t.id));
    grid.appendChild(sw);
  });
}

function selectTheme(id) {
  // Remove old theme class
  for (let i = 1; i <= 50; i++) {
    document.body.classList.remove('theme-' + i);
  }

  // Apply new
  if (id !== 1) {
    document.body.classList.add('theme-' + id);
  }
  currentTheme = id;
  localStorage.setItem('deentag_theme', id);

  // Update active swatch
  document.querySelectorAll('.theme-swatch').forEach(sw => {
    sw.classList.toggle('active', parseInt(sw.dataset.themeId) === id);
  });

  // Update theme btn visual feedback
  updateThemeBtn(id);

  // Close after short delay
  setTimeout(closeThemePanel, 280);
}

function updateThemeBtn(id) {
  const btn = document.getElementById('theme-palette-btn');
  if (!btn) return;
  const t = THEMES.find(t => t.id === id);
  if (t) {
    btn.title = t.name;
  }
}

function applyStoredTheme() {
  const stored = parseInt(localStorage.getItem('deentag_theme') || '1');
  currentTheme = stored;
  if (stored !== 1) {
    document.body.classList.add('theme-' + stored);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  applyStoredTheme();
});
