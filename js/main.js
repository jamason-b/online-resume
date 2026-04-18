// Set copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// ─── Theme toggle ────────────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
html.setAttribute('data-theme', savedTheme ?? (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ─── Scroll-triggered fade-up animations ─────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-up').forEach((el) => {
  const siblings = el.parentElement.querySelectorAll('.fade-up');
  siblings.forEach((sib, idx) => {
    sib.style.transitionDelay = `${idx * 80}ms`;
  });
  observer.observe(el);
});

// ─── Nav border on scroll ─────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 10
    ? 'var(--border)'
    : 'transparent';
}, { passive: true });

// ─── Active nav highlighting ──────────────────────────────
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--ink-dark)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => sectionObserver.observe(s));
