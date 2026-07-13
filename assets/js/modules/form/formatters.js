/**
 * Formatadores e máscaras de campos
 * 
 * Princípios:
 * - SRP: Cada formatador cuida de um tipo específico
 * - OCP: Novos formatadores podem ser adicionados sem alterar os existentes
 */

/**
 * Remove caracteres não numéricos
 * @param {string} value 
 * @returns {string}
 */
function digitsOnly(value) {
  return value.replace(/\D/g, '');
}

/**
 * Aplica máscara de telefone brasileiro
 * @param {string} value 
 * @returns {string}
 */
export function formatPhone(value) {
  let digits = digitsOnly(value);
  
  if (digits.length > 11) digits = digits.slice(0, 11);
  
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/**
 * Limita idade a apenas números (máximo 3 dígitos)
 * @param {string} value 
 * @returns {string}
 */
export function formatAge(value) {
  let digits = digitsOnly(value);
  if (digits.length > 3) digits = digits.slice(0, 3);
  return digits;
}

/**
 * Verifica se email tem formato válido
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmailFormat(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Formata nome removendo espaços extras
 * @param {string} value 
 * @returns {string}
 */
export function formatName(value) {
  return value.replace(/\s+/g, ' ').trim();
}
