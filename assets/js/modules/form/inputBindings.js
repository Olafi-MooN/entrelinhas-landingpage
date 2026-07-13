/**
 * Liga os formatadores aos elementos do DOM
 * 
 * Princípios:
 * - SRP: Apenas conecta inputs aos formatadores
 * - Separation of Concerns: Separa lógica de formatação da lógica de DOM
 */

import { formatPhone, formatAge, isValidEmailFormat } from './formatters.js';
import { getElement } from '../utils/helpers.js';

/**
 * Inicializa máscara de telefone
 * @param {string} selector 
 */
export function initPhoneMask(selector = 'phone') {
  const phoneInput = getElement(selector);
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    e.target.value = formatPhone(e.target.value);
  });
}

/**
 * Inicializa máscara de idade
 * @param {string} selector 
 */
export function initAgeMask(selector = 'age') {
  const ageInput = getElement(selector);
  if (!ageInput) return;

  ageInput.addEventListener('input', (e) => {
    e.target.value = formatAge(e.target.value);
  });
}

/**
 * Inicializa validação visual de email
 * @param {string} inputSelector 
 * @param {string} iconSelector 
 */
export function initEmailValidation(inputSelector = 'email', iconSelector = 'email-icon') {
  const emailInput = getElement(inputSelector);
  const emailIcon = getElement(iconSelector);
  
  if (!emailInput) return;

  const setValid = () => {
    emailInput.style.borderColor = '#059669';
    emailInput.style.backgroundColor = '#f0fdf4';
    if (emailIcon) {
      emailIcon.style.color = '#059669';
      emailIcon.classList.remove('hidden');
    }
  };

  const setInvalid = () => {
    emailInput.style.borderColor = '#dc2626';
    emailInput.style.backgroundColor = '#fef2f2';
    if (emailIcon) emailIcon.classList.add('hidden');
  };

  const reset = () => {
    emailInput.style.borderColor = '';
    emailInput.style.backgroundColor = '';
    if (emailIcon) emailIcon.classList.add('hidden');
  };

  emailInput.addEventListener('blur', () => {
    const email = emailInput.value.trim();
    if (!email) {
      reset();
    } else if (isValidEmailFormat(email)) {
      setValid();
    } else {
      setInvalid();
    }
  });

  emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim();
    if (email && isValidEmailFormat(email)) {
      setValid();
    } else if (email) {
      if (emailIcon) emailIcon.classList.add('hidden');
    }
  });

  emailInput.addEventListener('focus', () => {
    if (!emailInput.value.trim()) reset();
  });
}

/**
 * Inicializa todos os bindings de input
 */
export function initInputBindings() {
  initPhoneMask();
  initAgeMask();
  initEmailValidation();
}
