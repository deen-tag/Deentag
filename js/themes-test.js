// ===== DEENTAG — THEMES-TEST.JS =====
// Fichier temporaire — supprimer après choix du thème final

const THEMES1 = [
  'islam','foret','jade','sauge','emeraude',
  'sable','argile','dune','ocre','silex',
  'nuit','mosquee','lapis','turquoise','fajr',
  'encre','charbon','ebene','anthracite','qadr',
  'soufi','amethyste','prune','lavande','indigo',
  'nacre','aurore','peche','ivoire','or-blanc'
];
const COLORS1 = {
  islam:'#1B6B3A',foret:'#2D5A3D',jade:'#4A7A6A',sauge:'#7D9E7A',emeraude:'#1A6B5A',
  sable:'#C8A96E',argile:'#B07850',dune:'#D4A85A',ocre:'#C8823A',silex:'#8A7A60',
  nuit:'#2A4A8A',mosquee:'#3A6A9A',lapis:'#1A3A7A',turquoise:'#2A8A8A',fajr:'#5A7AAA',
  encre:'#1A1A2A',charbon:'#3A3A3A',ebene:'#1A2A1A',anthracite:'#3A3A4A',qadr:'#2A1A4A',
  soufi:'#6A3A8A',amethyste:'#8A4AAA',prune:'#5A2A5A',lavande:'#8A6AAA',indigo:'#3A2A7A',
  nacre:'#E0D8C8',aurore:'#D8A898',peche:'#D89878',ivoire:'#D8C8A8','or-blanc':'#C8B898'
};

const THEMES2 = [
  'brutalist','neon-mosque','verre','manuscript','aurora',
  'mono-green','marble','terminal','dusk','paper',
  'carbon','zellij','rose-gold','void','sage-milk',
  'ink-wash','copper','frost','obsidian','matcha',
  'cinema','sand-dune','deep-sea','spring','charcoal-rose',
  'solar','pewter','abyssal','clay-mint','celestial'
];
const COLORS2 = {
  brutalist:'#1A1A1A','neon-mosque':'#00CC66',verre:'#2A8060',manuscript:'#8B6040',
  aurora:'#18B890','mono-green':'#008844',marble:'#2A6A50',terminal:'#00CC44',
  dusk:'#5A9870',paper:'#4A7040',carbon:'#78CC44',zellij:'#1A7890',
  'rose-gold':'#C87868',void:'#6038C8','sage-milk':'#5A8860','ink-wash':'#3A6848',
  copper:'#A06030',frost:'#1A8888',obsidian:'#5A48A8',matcha:'#5A9830',
  cinema:'#309850','sand-dune':'#808020','deep-sea':'#008858',spring:'#28A838',
  'charcoal-rose':'#3A8858',solar:'#187858',pewter:'#4A7860',abyssal:'#008858',
  'clay-mint':'#2A9870',celestial:'#18A888'
};

function applyTheme1(name) {
  document.body.setAttribute('data-color-theme', name);
  document.body.removeAttribute('data-color-theme2');
  localStorage.setItem('deentag_color_theme', name);
  localStorage.removeItem('deentag_color_theme2');
  document.querySelectorAll('.ct-dot').forEach(d => d.classList.remove('active'));
  const a = document.querySelector(`.ct-dot[data-ct="${name}"]`);
  if (a) a.classList.add('active');
}

function applyTheme2(name) {
  document.body.setAttribute('data-color-theme2', name);
  document.body.removeAttribute('data-color-theme');
  localStorage.setItem('deentag_color_theme2', name);
  localStorage.removeItem('deentag_color_theme');
  document.querySelectorAll('.ct-dot').forEach(d => d.classList.remove('active'));
  const a = document.querySelector(`.ct-dot[data-ct2="${name}"]`);
  if (a) a.classList.add('active');
}

function makeDot(num, label, color, onClick, attr, val) {
  const dot = document.createElement('button');
  dot.className = 'ct-dot';
  dot.title = `${num} — ${label}`;
  dot.style.cssText = `width:26px;height:26px;border-radius:50%;border:2px solid transparent;cursor:pointer;flex-shrink:0;position:relative;-webkit-tap-highlight-color:transparent;transition:transform 0.18s,box-shadow 0.18s;padding:0;background:${color};`;
  dot.dataset[attr] = val;
  const lbl = document.createElement('span');
  lbl.textContent = num;
  lbl.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:7.5px;font-weight:700;font-family:sans-serif;color:rgba(255,255,255,0.9);pointer-events:none;text-shadow:0 1px 2px rgba(0,0,0,0.7);line-height:1;';
  dot.appendChild(lbl);
  dot.addEventListener('click', onClick);
  return dot;
}

function injectPicker() {
  if (document.querySelector('.ct-wrap')) return;

  const style = document.createElement('style');
  style.textContent = `.ct-wrap::-webkit-scrollbar{display:none}.ct-dot.active{transform:scale(1.28)!important;box-shadow:0 0 0 2px var(--bg,#0F0D08),0 0 0 4px rgba(255,255,255,0.65)!important}.ct-dot:active{transform:scale(0.82)!important}`;
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.className = 'ct-wrap';
  wrap.style.cssText = 'width:100%;background:var(--bg,#0F0D08);border-bottom:1px solid rgba(128,128,128,0.15);padding:8px 16px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;position:sticky;top:57px;z-index:190;';

  const picker = document.createElement('div');
  picker.className = 'ct-picker';
  picker.style.cssText = 'display:flex;gap:6px;width:max-content;padding:2px 0;align-items:center;';

  THEMES1.forEach((t, i) => {
    const dot = makeDot(i+1, t, COLORS1[t], () => applyTheme1(t), 'ct', t);
    picker.appendChild(dot);
  });

  const sep = document.createElement('div');
  sep.style.cssText = 'width:2px;height:18px;background:rgba(128,128,128,0.35);flex-shrink:0;border-radius:2px;margin:0 4px;';
  picker.appendChild(sep);

  THEMES2.forEach((t, i) => {
    const dot = makeDot(i+31, t, COLORS2[t], () => applyTheme2(t), 'ct2', t);
    picker.appendChild(dot);
  });

  wrap.appendChild(picker);
  const bar = document.querySelector('.index-topbar, .inv-topbar, .shop-topbar');
  if (bar) bar.insertAdjacentElement('afterend', wrap);
}

window.addEventListener('DOMContentLoaded', () => {
  injectPicker();
  const s2 = localStorage.getItem('deentag_color_theme2');
  const s1 = localStorage.getItem('deentag_color_theme');
  if (s2) applyTheme2(s2);
  else applyTheme1(s1 || 'islam');
});
