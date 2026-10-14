
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
    document.querySelectorAll('.social-link.is-tooltip-open').forEach((link) => {
      link.classList.remove('is-tooltip-open');
    });
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    setMenuState(false);
  }
});

// Touch devices do not have hover, so a first tap reveals the social-link label
// and a second tap follows the existing external link.
document.querySelectorAll('.social-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (!window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    if (!link.classList.contains('is-tooltip-open')) {
      event.preventDefault();
      document.querySelectorAll('.social-link.is-tooltip-open').forEach((openLink) => {
        openLink.classList.remove('is-tooltip-open');
      });
      link.classList.add('is-tooltip-open');
    }
  });
});

// Pointer dot stays direct while the outlined bubble eases behind it.
const cursorBubble = document.querySelector('.cursor-bubble');
const cursorDot = document.querySelector('.cursor-dot');
const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (supportsFinePointer) {
  let pointerX = 0;
  let pointerY = 0;
  let bubbleX = 0;
  let bubbleY = 0;
  let hasPointerPosition = false;
  let animationFrame = 0;

  const moveBubble = () => {
    const easing = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.16;
    bubbleX += (pointerX - bubbleX) * easing;
    bubbleY += (pointerY - bubbleY) * easing;
    cursorBubble.style.left = `${bubbleX}px`;
    cursorBubble.style.top = `${bubbleY}px`;

    if (Math.abs(pointerX - bubbleX) > 0.1 || Math.abs(pointerY - bubbleY) > 0.1) {
      animationFrame = requestAnimationFrame(moveBubble);
    } else {
      animationFrame = 0;
    }
  };

  document.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!hasPointerPosition) {
      bubbleX = pointerX;
      bubbleY = pointerY;
      hasPointerPosition = true;
    }
    cursorDot.style.left = `${pointerX}px`;
    cursorDot.style.top = `${pointerY}px`;
    cursorBubble.classList.add('is-visible');
    cursorDot.classList.add('is-visible');

    if (!animationFrame) {
      animationFrame = requestAnimationFrame(moveBubble);
    }
  });

  document.addEventListener('pointerleave', () => {
    cursorBubble.classList.remove('is-visible');
    cursorDot.classList.remove('is-visible');
  });
}
