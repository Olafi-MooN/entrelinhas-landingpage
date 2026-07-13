/**
 * Efeito de scroll na navbar
 * 
 * Princípios:
 * - SRP: Apenas controla aparência da navbar no scroll
 */

import { getElement } from '../utils/helpers.js';

/**
 * Inicializa efeito de scroll na navbar
 * @param {Object} options 
 * @param {number} options.threshold 
 * @param {string} options.addClasses
 * @param {string} options.removeClasses
 */
export function initNavbar({ 
  threshold = 60,
  addClasses = ['bg-creme', 'shadow-sm'],
  removeClasses = ['bg-transparent']
} = {}) {
  const navbar = getElement('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    const shouldActivate = window.scrollY > threshold;
    
    addClasses.forEach(cls => {
      navbar.classList.toggle(cls, shouldActivate);
    });
    
    removeClasses.forEach(cls => {
      navbar.classList.toggle(cls, !shouldActivate);
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Estado inicial
}
