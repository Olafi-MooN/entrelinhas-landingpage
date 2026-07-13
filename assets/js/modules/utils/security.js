/**
 * Funções de segurança
 * 
 * Princípios:
 * - SRP: Cada função tem uma responsabilidade de segurança específica
 * - Defense in depth: Múltiplas camadas de proteção
 */

/**
 * Rate limiting simples baseado em tempo
 */
export class RateLimiter {
  #lastSubmitTime = 0;
  #minInterval;

  constructor(minInterval) {
    this.#minInterval = minInterval;
  }

  /**
   * Verifica se ainda está dentro do intervalo de espera
   * @returns {{allowed: boolean, remainingTime: number}}
   */
  check() {
    const now = Date.now();
    const elapsed = now - this.#lastSubmitTime;
    
    if (elapsed < this.#minInterval) {
      return {
        allowed: false,
        remainingTime: Math.ceil((this.#minInterval - elapsed) / 1000)
      };
    }

    this.#lastSubmitTime = now;
    return { allowed: true, remainingTime: 0 };
  }

  reset() {
    this.#lastSubmitTime = 0;
  }
}

/**
 * Verifica honeypot field (campo oculto que bots preenchem)
 * @param {HTMLInputElement|null} honeypotElement 
 * @returns {boolean}
 */
export function isHoneypotFilled(honeypotElement) {
  return Boolean(honeypotElement && honeypotElement.value);
}

/**
 * Ofusca logs sensíveis
 * @param {string} token 
 * @param {number} visibleLength 
 * @returns {string}
 */
export function maskToken(token, visibleLength = 50) {
  if (!token) return 'no-token';
  return token.length > visibleLength 
    ? token.substring(0, visibleLength) + '...' 
    : token;
}
