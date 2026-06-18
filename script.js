
// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const menuLinks = document.querySelectorAll('.menu-link');

const setMenuState = (isOpen) => {
  sidebar.classList.toggle('active', isOpen);
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
};

menuToggle.addEventListener('click', () => {
  setMenuState(!sidebar.classList.contains('active'));
});

menuLinks.forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

document.addEventListener('click', (event) => {
  if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
    setMenuState(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenuState(false);
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    setMenuState(false);
  }
});
