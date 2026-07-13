/**
 * Menu mobile
 * 
 * Princípios:
 * - SRP: Controle do menu mobile
 */

import { getElement } from '../utils/helpers.js';

/**
 * Inicializa toggle do menu mobile
 * @param {Object} options
 * @param {string} options.menuBtnSelector
 * @param {string} options.mobileMenuSelector
 * @param {string} options.iconOpenSelector
 * @param {string} options.iconCloseSelector
 */
export function initMobileMenu({
  menuBtnSelector = 'menu-btn',
  mobileMenuSelector = 'mobile-menu',
  iconOpenSelector = 'icon-open',
  iconCloseSelector = 'icon-close'
} = {}) {
  const menuBtn = getElement(menuBtnSelector);
  const mobileMenu = getElement(mobileMenuSelector);
  const iconOpen = getElement(iconOpenSelector);
  const iconClose = getElement(iconCloseSelector);

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (iconOpen) iconOpen.classList.toggle('hidden');
    if (iconClose) iconClose.classList.toggle('hidden');
  });
}

/**
 * Fecha o menu mobile
 */
export function closeMobileMenu(mobileMenuSelector = 'mobile-menu', iconOpenSelector = 'icon-open', iconCloseSelector = 'icon-close') {
  const mobileMenu = getElement(mobileMenuSelector);
  const iconOpen = getElement(iconOpenSelector);
  const iconClose = getElement(iconCloseSelector);

  if (mobileMenu) mobileMenu.classList.add('hidden');
  if (iconOpen) iconOpen.classList.remove('hidden');
  if (iconClose) iconClose.classList.add('hidden');
}
