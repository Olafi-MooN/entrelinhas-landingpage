/**
 * Efeitos 3D nos cards
 * 
 * Princípios:
 * - SRP: Inclinação suave dos cards ao seguir cursor
 */

/**
 * Inicializa efeito 3D nos cards
 * @param {string} selector 
 */
export function initCardTilt(selector = '.area-card, .testimonial-card') {
  document.querySelectorAll(selector).forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -6;
      const rotateY = ((x / rect.width) - 0.5) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
