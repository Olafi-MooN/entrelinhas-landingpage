/**
 * Helpers utilitários genéricos
 * 
 * Princípios:
 * - SRP: Funções pequenas e específicas
 * - DRY: Reutilizáveis em toda a aplicação
 */

/**
 * Sanitiza string para prevenir XSS
 * @param {string} str 
 * @param {number} maxLength 
 * @returns {string}
 */
export function sanitize(str, maxLength = 500) {
  if (!str || typeof str !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML.substring(0, maxLength);
}

/**
 * Limita a execução de uma função em intervalos
 * @param {Function} func 
 * @param {number} limit 
 * @returns {Function}
 */
export function throttle(func, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Seleciona elemento do DOM de forma segura
 * @param {string} selector 
 * @returns {Element|null}
 */
export function getElement(selector) {
  return document.getElementById(selector) || document.querySelector(selector);
}

/**
 * Constrói URL do WhatsApp com mensagem
 * @param {Object} data 
 * @param {string} phone 
 * @param {string} template 
 * @returns {string}
 */
export function buildWhatsAppUrl(data, phone, template) {
  let text = template;
  text += `*Nome:* ${data.name}\n`;
  text += `*Telefone:* ${data.phone}\n`;
  text += `*Idade:* ${data.age}\n`;
  if (data.email) text += `*E-mail:* ${data.email}\n`;
  if (data.area) text += `*Área de interesse:* ${data.area}\n`;
  if (data.message) text += `*Mensagem:* ${data.message}\n`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
