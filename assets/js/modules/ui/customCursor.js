/**
 * Cursor personalizado
 * 
 * Princípios:
 * - SRP: Apenas cursor customizado
 */

/**
 * Inicializa cursor personalizado
 * @param {Object} options
 */
export function initCustomCursor({
  ringSelector = 'cursor-ring',
  dotSelector = 'cursor-dot',
  hoverTargets = 'a, button, input, textarea, select, [role="button"], .dot-thread'
} = {}) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const ring = document.getElementById(ringSelector);
  const dot = document.getElementById(dotSelector);
  if (!ring || !dot) return;

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let ringPos = { x: mouse.x, y: mouse.y };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
  });

  document.addEventListener('mouseleave', () => {
    ring.style.opacity = '0';
    dot.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    ring.style.opacity = '1';
    dot.style.opacity = '1';
  });

  function animateRing() {
    ringPos.x += (mouse.x - ringPos.x) * 0.18;
    ringPos.y += (mouse.y - ringPos.y) * 0.18;
    ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }

  animateRing();

  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });
}
