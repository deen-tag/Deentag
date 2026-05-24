// ===== DEENTAG — THEMES-TEST.JS =====
// Fichier temporaire — à supprimer après choix du thème final

const THEMES = [
  // Verts islamiques
  'islam','foret','jade','sauge','emeraude',
  // Terres & désert
  'sable','argile','dune','ocre','silex',
  // Nuits & bleus
  'nuit','mosquee','lapis','turquoise','fajr',
  // Sombres
  'encre','charbon','ebene','anthracite','qadr',
  // Violets & spirituels
  'soufi','amethyste','prune','lavande','indigo',
  // Clairs & lumineux
  'nacre','aurore','peche','ivoire','or-blanc'
];

const THEME_COLORS = {
  islam:      '#1B6B3A',
  foret:      '#2D5A3D',
  jade:       '#4A7A6A',
  sauge:      '#7D9E7A',
  emeraude:   '#1A6B5A',
  sable:      '#C8A96E',
  argile:     '#B07850',
  dune:       '#D4A85A',
  ocre:       '#C8823A',
  silex:      '#8A7A60',
  nuit:       '#2A4A8A',
  mosquee:    '#3A6A9A',
  lapis:      '#1A3A7A',
  turquoise:  '#2A8A8A',
  fajr:       '#5A7AAA',
  encre:      '#1A1A2A',
  charbon:    '#2A2A2A',
  ebene:      '#1A2A1A',
  anthracite: '#2A2A3A',
  qadr:       '#1A1A3A',
  soufi:      '#6A3A8A',
  amethyste:  '#8A4AAA',
  prune:      '#5A2A5A',
  lavande:    '#8A6AAA',
  indigo:     '#3A2A7A',
  nacre:      '#F0EEE8',
  aurore:     '#E8C0B0',
  peche:      '#E8A890',
  ivoire:     '#F0E8D8',
  'or-blanc': '#E8D8B8'
};

function applyColorTheme(name) {
  document.body.setAttribute('data-color-theme', name);
  localStorage.setItem('deentag_color_theme', name);
  document.querySelectorAll('.ct-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.ct === name);
  });
}

function injectThemePicker() {
  if (document.querySelector('.ct-picker')) return;

  const picker = document.createElement('div');
  picker.className = 'ct-picker';

  THEMES.forEach(t => {
    const dot = document.createElement('button');
    dot.className = 'ct-dot';
    dot.dataset.ct = t;
    dot.title = t;
    dot.style.background = THEME_COLORS[t];
    dot.addEventListener('click', () => applyColorTheme(t));
    picker.appendChild(dot);
  });

  // Injection — cherche toutes les topbars possibles
  const bar = document.querySelector('.index-topbar, .inv-topbar, .shop-topbar');
  if (bar) {
    // Wrap dans un container scrollable horizontal
    const wrap = document.createElement('div');
    wrap.className = 'ct-wrap';
    wrap.appendChild(picker);
    bar.insertAdjacentElement('afterend', wrap);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  injectThemePicker();
  const saved = localStorage.getItem('deentag_color_theme') || 'islam';
  applyColorTheme(saved);
});

// ===== SÉRIE 2 =====
const THEMES2 = [
  'brutalist','neon-mosque','verre','manuscript','aurora',
  'mono-green','marble','terminal','dusk','paper',
  'carbon','zellij','rose-gold','void','sage-milk',
  'ink-wash','copper','frost','obsidian','matcha',
  'cinema','sand-dune','deep-sea','spring','charcoal-rose',
  'solar','pewter','abyssal','clay-mint','celestial'
];

function applyColorTheme2(name) {
  document.body.setAttribute('data-color-theme2', name);
  document.body.removeAttribute('data-color-theme');
  localStorage.setItem('deentag_color_theme2', name);
  localStorage.removeItem('deentag_color_theme');
  document.querySelectorAll('.ct-dot').forEach(d => d.classList.remove('active'));
  document.querySelectorAll('.ct2-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.ct2 === name);
  });
}

function injectThemePicker2() {
  if (document.querySelector('.ct2-picker')) return;
  const picker = document.createElement('div');
  picker.className = 'ct-picker';

  THEMES2.forEach(t => {
    const dot = document.createElement('button');
    dot.className = 'ct-dot ct2-dot';
    dot.dataset.ct2 = t;
    dot.title = t;
    dot.addEventListener('click', () => applyColorTheme2(t));
    picker.appendChild(dot);
  });

  const wrap = document.querySelector('.ct-wrap');
  if (wrap) {
    const sep = document.createElement('div');
    sep.style.cssText = 'width:1px;height:16px;background:rgba(128,128,128,0.3);flex-shrink:0;align-self:center';
    wrap.querySelector('.ct-picker').appendChild(sep);
    THEMES2.forEach(t => {
      const dot = document.createElement('button');
      dot.className = 'ct-dot ct2-dot';
      dot.dataset.ct2 = t;
      dot.title = t;
      dot.addEventListener('click', () => applyColorTheme2(t));
      wrap.querySelector('.ct-picker').appendChild(dot);
    });
  }
}

// Init série 2
const savedT2 = localStorage.getItem('deentag_color_theme2');
if (savedT2) {
  document.addEventListener('DOMContentLoaded', () => {
    injectThemePicker2();
    applyColorTheme2(savedT2);
  });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    injectThemePicker2();
  });
}
