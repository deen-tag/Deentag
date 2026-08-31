'use client';

export default function ThemeToggle() {
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'day';
    const next = current === 'day' ? 'night' : 'day';
    document.documentElement.setAttribute('data-theme', next);
    document.body.classList.remove('day', 'night');
    document.body.classList.add(next);
    localStorage.setItem('deentag_theme', next);
  }

  return (
    <button className="theme-knob-btn" onClick={toggleTheme} id="theme-circle-btn" aria-label="Changer le thème">
      <div className="theme-knob-btn-inner">
        <svg className="tt-sun" width="18" height="18" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="6" fill="#c8922a"/><g stroke="#c8922a" strokeWidth="2.2" strokeLinecap="round"><line x1="16" y1="3" x2="16" y2="7"/><line x1="16" y1="25" x2="16" y2="29"/><line x1="3" y1="16" x2="7" y2="16"/><line x1="25" y1="16" x2="29" y2="16"/><line x1="6.9" y1="6.9" x2="9.8" y2="9.8"/><line x1="22.2" y1="22.2" x2="25.1" y2="25.1"/><line x1="25.1" y1="6.9" x2="22.2" y2="9.8"/><line x1="9.8" y1="22.2" x2="6.9" y2="25.1"/></g></svg>
        <svg className="tt-moon" width="15" height="15" viewBox="0 0 28 28" fill="none"><path d="M22 17.5A10 10 0 0 1 10.5 6a10 10 0 1 0 11.5 11.5z" fill="#7abf95"/><circle cx="20" cy="8" r="1.5" fill="#c8d8b0" opacity="0.7"/><circle cx="23" cy="12" r="1" fill="#c8d8b0" opacity="0.5"/></svg>
      </div>
    </button>
  );
}
