/**
 * Contador animado
 * 
 * Princípios:
 * - SRP: Animação de contadores com Intersection Observer
 */

/**
 * Anima contador até o valor alvo
 * @param {HTMLElement} el 
 */
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  if (isNaN(target)) return;

  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString('pt-BR');
  }

  requestAnimationFrame(tick);
}

/**
 * Inicializa contadores animados
 * @param {string} selector 
 */
export function initCounters(selector = '.count-up') {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  elements.forEach((el) => observer.observe(el));
}
