const root = document.documentElement;
const themeButton = document.getElementById('theme');
try { const saved = localStorage.getItem('psp-theme'); if (saved === 'light' || saved === 'dark') root.dataset.theme = saved; } catch {}
function isDark() { return root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; }
function updateThemeLabel() { themeButton.setAttribute('aria-label', `Switch to ${isDark() ? 'light' : 'dark'} theme`); }
updateThemeLabel();
themeButton.addEventListener('click', () => { const next = isDark() ? 'light' : 'dark'; root.dataset.theme = next; try { localStorage.setItem('psp-theme', next); } catch {} updateThemeLabel(); });
const menuButton = document.getElementById('menu');
const nav = document.getElementById('navigation');
function closeMenu() { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); }
menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) { nav.querySelectorAll('a').forEach(link => { if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
document.getElementById('year').textContent = new Date().getFullYear();
