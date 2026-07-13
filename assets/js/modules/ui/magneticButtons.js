/**
 * Botões magnéticos
 * 
 * Princípios:
 * - SRP: Efeito magnético nos botões
 */

/**
 * Inicializa efeito magnético nos botões
 * @param {string} selector 
 */
export function initMagneticButtons(selector = '.btn-primary, .btn-outline, .whatsapp-float-btn') {
  document.querySelectorAll(selector).forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}
