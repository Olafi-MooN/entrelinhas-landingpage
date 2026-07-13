/**
 * Navegação lateral por pontos
 * 
 * Princípios:
 * - SRP: Destaca seção ativa nos dots laterais
 */

/**
 * Inicializa navegação por dots
 * @param {string} dotSelector 
 */
export function initSectionDots(dotSelector = '.dot-thread') {
  const sectionDots = document.querySelectorAll(dotSelector);
  if (!sectionDots.length) return;

  const dotSections = Array.from(sectionDots)
    .map((dot) => document.querySelector(dot.getAttribute('href')))
    .filter(Boolean);

  if (!dotSections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        sectionDots.forEach((dot) => {
          dot.classList.toggle('active', dot.getAttribute('href') === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  dotSections.forEach((section) => observer.observe(section));
}
