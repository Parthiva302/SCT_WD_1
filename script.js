const header = document.getElementById('siteHeader');
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('primary-navigation');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.querySelector('.theme-toggle');
const progressBar = document.querySelector('.progress-bar span');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const SECTION_OFFSET = 60;

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
  themeToggle.setAttribute('aria-pressed', theme === 'dark');
  themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '🌙' : '☀️';
  themeToggle.querySelector('.theme-label').textContent = theme === 'dark' ? 'Dark mode' : 'Light mode';
}

function loadTheme() {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    setTheme(storedTheme);
  } else {
    setTheme(prefersDark.matches ? 'dark' : 'light');
  }
}

function updateHeaderState() {
  header.classList.toggle('scrolled', window.scrollY > 60);
}

function updateProgress() {
  const scroll = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const percent = height ? (scroll / height) * 100 : 0;
  progressBar.style.width = `${Math.min(Math.max(percent, 0), 100)}%`;
}

function toggleMenu() {
  const open = document.body.classList.toggle('menu-open');
  navToggle.setAttribute('aria-expanded', open);
  navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
}

function closeMenu() {
  document.body.classList.remove('menu-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation menu');
}

function setActiveLink(entry) {
  navLinks.forEach((link) => {
    const target = link.getAttribute('href');
    const isActive = target === `#${entry.target.id}`;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function initScrollObserver() {
  const sections = document.querySelectorAll('main section[id]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
          setActiveLink(entry);
        }
      });
    },
    {
      root: null,
      threshold: [0.45, 0.65],
      rootMargin: `-${SECTION_OFFSET}px 0px -40% 0px`,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

navToggle.addEventListener('click', toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
});

window.addEventListener('scroll', () => {
  updateHeaderState();
  updateProgress();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

loadTheme();
updateHeaderState();
updateProgress();
initScrollObserver();
