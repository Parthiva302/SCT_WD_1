const header = document.getElementById('siteHeader');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.nav-link');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}

function setNavState(open) {
  document.body.classList.toggle('menu-open', open);
  navToggle.setAttribute('aria-expanded', open);
  navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  siteNav.setAttribute('aria-hidden', !open);
}

function toggleMenu() {
  const open = !document.body.classList.contains('menu-open');
  setNavState(open);
}

function closeMenu() {
  setNavState(false);
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

setNavState(false);
updateHeader();
