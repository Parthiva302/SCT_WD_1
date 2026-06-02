const header = document.getElementById('siteHeader');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 40);
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

navToggle.addEventListener('click', toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('scroll', updateHeader);
window.addEventListener('resize', () => {
  if (window.innerWidth > 720) {
    closeMenu();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

updateHeader();
