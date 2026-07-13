/**
 * Animações de "fios" (threads)
 * 
 * Princípios:
 * - SRP: Animações dos elementos thread
 */

/**
 * Observa elementos thread-divider e timeline-thread para animação
 * @param {string} selector 
 */
export function initThreadReveal(selector = '.thread-divider-wrap, .timeline-thread') {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  elements.forEach((el) => observer.observe(el));
}
