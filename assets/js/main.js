/**
 * Entry point da aplicação
 * 
 * Princípios:
 * - SRP: Apenas orquestra a inicialização dos módulos
 * - DIP: main.js depende das abstrações dos módulos
 */

import { APP_CONFIG } from './config/app.config.js';
import { getElement } from './modules/utils/helpers.js';

import { initInputBindings } from './modules/form/inputBindings.js';
import { ContactFormSender } from './modules/form/contactForm.js';

import { initNavbar } from './modules/ui/navbar.js';
import { initMobileMenu } from './modules/ui/mobileMenu.js';
import { initSmoothScroll, initScrollProgress } from './modules/ui/scrollEffects.js';
import { initCardTilt } from './modules/ui/cards.js';
import { initMagneticButtons } from './modules/ui/magneticButtons.js';
import { initCustomCursor } from './modules/ui/customCursor.js';
import { initDynamicTitle } from './modules/ui/pageTitle.js';

import { initAOS } from './modules/animations/aos.js';
import { initCounters } from './modules/animations/counter.js';
import { initThreadCursor } from './modules/animations/threadCursor.js';
import { initSectionDots } from './modules/animations/sectionDots.js';
import { initThreadReveal } from './modules/animations/threadAnimations.js';

/**
 * Inicializa todos os módulos quando o DOM estiver pronto
 */
function initApp() {
  // Animações
  initAOS();
  initCounters();
  initThreadCursor();
  initSectionDots();
  initThreadReveal();

  // UI geral
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollProgress();
  initCardTilt();
  initMagneticButtons();
  initCustomCursor();
  initDynamicTitle();

  // Formulário
  initInputBindings();
  const contactForm = getElement(APP_CONFIG.SELECTORS.CONTACT_FORM);
  if (contactForm) {
    const sender = new ContactFormSender();
    sender.init(contactForm);
  }
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
