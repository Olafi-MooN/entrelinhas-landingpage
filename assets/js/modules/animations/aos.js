/**
 * Inicialização do AOS (Animate On Scroll)
 * 
 * Princípios:
 * - SRP: Apenas inicializa a biblioteca AOS
 */

/**
 * Inicializa AOS
 * @param {Object} options 
 */
export function initAOS(options = { once: true, easing: 'ease-out-cubic' }) {
  if (typeof AOS !== 'undefined') {
    AOS.init(options);
  } else {
    console.warn('AOS não está carregado');
  }
}
