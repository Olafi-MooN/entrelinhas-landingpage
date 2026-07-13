/**
 * Configurações globais da aplicação
 * 
 * Princípios:
 * - SRP: Apenas constantes e configurações centralizadas
 * - OCP: Valores podem ser estendidos sem modificar a lógica
 */

export const APP_CONFIG = {
  // Google reCAPTCHA v3
  RECAPTCHA_SITE_KEY: '6Ld-glEtAAAAAN6DkBemOTueImBlD7WzTHeFxzHJ',
  RECAPTCHA_ACTION: 'submit',

  // Google Apps Script Web App URL (ofuscada por partes)
  SCRIPT_URL_PARTS: [
    'https://script.google.com',
    '/macros/s/',
    'AKfycbx9mb1a3X0LXbR0oQXBrsIz9eFiyb62So3D9iLb',
    'nXal_SoG_eVgGLH9DU8FpOqRXYDZRQ',
    '/exec'
  ],

  // WhatsApp
  WHATSAPP_PHONE: '5531971326953',
  WHATSAPP_MESSAGE_TEMPLATE: 'Olá! Gostaria de agendar uma consulta.\n\n',

  // Rate limiting front-end (ms)
  MIN_SUBMIT_INTERVAL: 3000,

  // Validação
  MAX_FIELD_LENGTH: 500,
  MIN_PHONE_LENGTH: 10,
  MAX_AGE: 120,

  // Seletores DOM
  SELECTORS: {
    CONTACT_FORM: 'contact-form',
    PHONE_INPUT: 'phone',
    AGE_INPUT: 'age',
    EMAIL_INPUT: 'email',
    EMAIL_ICON: 'email-icon',
    SUBMIT_BTN: 'submit-btn',
    BTN_TEXT: 'btn-text',
    FORM_SUCCESS: 'form-success',
    HONEYPOT: 'website',
    NAVBAR: 'navbar',
    MENU_BTN: 'menu-btn',
    MOBILE_MENU: 'mobile-menu',
    ICON_OPEN: 'icon-open',
    ICON_CLOSE: 'icon-close',
    SCROLL_THREAD: 'scroll-thread',
    CURSOR_RING: 'cursor-ring',
    CURSOR_DOT: 'cursor-dot',
    THREAD_CURSOR: 'thread-cursor'
  }
};

/**
 * Verifica se a aplicação está rodando em localhost
 * @returns {boolean}
 */
export function isLocalhost() {
  return window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';
}

/**
 * Obtém a URL completa do Google Apps Script
 * @returns {string}
 */
export function getScriptUrl() {
  return APP_CONFIG.SCRIPT_URL_PARTS.join('');
}
