/**
 * Efeitos de scroll
 * 
 * Princípios:
 * - SRP: Smooth scroll e barra de progresso
 */

/**
 * Inicializa smooth scroll para âncoras
 * @param {Object} options
 * @param {number} options.offset
 */
export function initSmoothScroll({ offset = 80 } = {}) {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/**
 * Inicializa barra de progresso de rolagem
 * @param {string} selector 
 */
export function initScrollProgress(selector = 'scroll-thread') {
  const scrollThread = document.getElementById(selector);
  if (!scrollThread) return;

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    scrollThread.style.width = pct + '%';
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}
