/**
 * Título da aba reage ao blur/focus
 * 
 * Princípios:
 * - SRP: Apenas controle do título da página
 */

/**
 * Inicializa título dinâmico
 * @param {string} awayTitle 
 */
export function initDynamicTitle(awayTitle = '🧵 Ainda estamos aqui...') {
  const originalTitle = document.title;

  window.addEventListener('blur', () => {
    document.title = awayTitle;
  });

  window.addEventListener('focus', () => {
    document.title = originalTitle;
  });
}
