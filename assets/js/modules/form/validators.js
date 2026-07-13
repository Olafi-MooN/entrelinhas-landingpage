/**
 * Validações de formulário
 * 
 * Princípios:
 * - SRP: Cada validador testa uma regra específica
 * - ISP: Interface pequena e focada
 */

/**
 * Resultado padrão de validação
 * @typedef {{valid: boolean, message: string}} ValidationResult
 */

/**
 * Valida nome
 * @param {string} name 
 * @returns {ValidationResult}
 */
export function validateName(name) {
  if (!name || name.length < 2) {
    return { valid: false, message: 'Por favor, insira um nome válido.' };
  }
  return { valid: true, message: '' };
}

/**
 * Valida telefone brasileiro
 * @param {string} phone 
 * @returns {ValidationResult}
 */
export function validatePhone(phone) {
  if (!phone) {
    return { valid: false, message: 'Por favor, insira um telefone válido.' };
  }

  const phoneRegex = /^[\d\s\(\)\-]{10,}$/;
  if (!phoneRegex.test(phone)) {
    return { valid: false, message: 'Por favor, insira um telefone válido (apenas números).' };
  }

  return { valid: true, message: '' };
}

/**
 * Valida idade
 * @param {string|number} age 
 * @returns {ValidationResult}
 */
export function validateAge(age) {
  const ageNum = Number(age);
  if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
    return { valid: false, message: 'Por favor, insira uma idade válida.' };
  }
  return { valid: true, message: '' };
}

/**
 * Valida email (opcional)
 * @param {string} email 
 * @returns {ValidationResult}
 */
export function validateEmail(email) {
  if (!email) return { valid: true, message: '' }; // Email é opcional
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Por favor, insira um email válido.' };
  }
  return { valid: true, message: '' };
}

/**
 * Valida todos os campos do formulário
 * @param {Object} fields 
 * @returns {{valid: boolean, message: string}}
 */
export function validateAllFields(fields) {
  const validations = [
    validateName(fields.name),
    validatePhone(fields.phone),
    validateAge(fields.age),
    validateEmail(fields.email)
  ];

  const firstError = validations.find(v => !v.valid);
  if (firstError) {
    return { valid: false, message: firstError.message };
  }

  return { valid: true, message: '' };
}
