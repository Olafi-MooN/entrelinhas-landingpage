/**
 * Módulo do formulário de contato
 * 
 * Princípios:
 * - SRP: Responsável apenas pela submissão do formulário
 * - OCP: Fácil estender com novos provedores de envio
 * - DIP: Depende de abstrações (validators, helpers) não de implementações concretas
 */

import { APP_CONFIG, getScriptUrl } from '../../config/app.config.js';
import { buildWhatsAppUrl, getElement, sanitize } from '../utils/helpers.js';
import { RateLimiter, isHoneypotFilled } from '../utils/security.js';
import { validateAllFields } from './validators.js';

/**
 * Classe responsável pelo envio do formulário
 */
export class ContactFormSender {
  #rateLimiter;
  #config;

  constructor(config = APP_CONFIG) {
    this.#config = config;
    this.#rateLimiter = new RateLimiter(config.MIN_SUBMIT_INTERVAL);
  }

  /**
   * Inicializa o formulário
   * @param {HTMLFormElement} form 
   */
  init(form) {
    if (!form) return;
    form.addEventListener('submit', (e) => this.#handleSubmit(e, form));
  }

  /**
   * Processa a submissão do formulário
   * @param {Event} e 
   * @param {HTMLFormElement} form 
   */
  async #handleSubmit(e, form) {
    e.preventDefault();

    const submitBtn = getElement(this.#config.SELECTORS.SUBMIT_BTN);
    const btnText = getElement(this.#config.SELECTORS.BTN_TEXT);
    const successMsg = getElement(this.#config.SELECTORS.FORM_SUCCESS);
    const honeypot = getElement(this.#config.SELECTORS.HONEYPOT);

    // Rate limiting
    const rateCheck = this.#rateLimiter.check();
    if (!rateCheck.allowed) {
      alert(`Por favor, aguarde ${rateCheck.remainingTime} segundos antes de enviar novamente.`);
      return;
    }

    // Honeypot check
    if (isHoneypotFilled(honeypot)) {
      console.warn('🚫 Bot detectado via honeypot');
      this.#simulateSuccess(form, successMsg);
      return;
    }

    // Coletar e sanitizar dados
    const rawData = {
      name: getElement('name')?.value || '',
      phone: getElement('phone')?.value || '',
      age: getElement('age')?.value || '',
      email: getElement('email')?.value || '',
      area: getElement('area')?.value || '',
      message: getElement('message')?.value || ''
    };

    const data = {
      name: sanitize(rawData.name, this.#config.MAX_FIELD_LENGTH),
      phone: sanitize(rawData.phone, this.#config.MAX_FIELD_LENGTH),
      age: sanitize(rawData.age, this.#config.MAX_FIELD_LENGTH),
      email: sanitize(rawData.email, this.#config.MAX_FIELD_LENGTH),
      area: sanitize(rawData.area, this.#config.MAX_FIELD_LENGTH),
      message: sanitize(rawData.message, this.#config.MAX_FIELD_LENGTH)
    };

    // Validação
    const validation = validateAllFields(data);
    if (!validation.valid) {
      alert(validation.message);
      if (submitBtn) submitBtn.disabled = false;
      this.#rateLimiter.reset();
      return;
    }

    // UI loading state
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Verificando...';

    // Executar reCAPTCHA v3 em todos os ambientes
    this.#executeRecaptcha(form, data, submitBtn, btnText, successMsg);
  }

  /**
   * Executa reCAPTCHA v3
   */
  #executeRecaptcha(form, data, submitBtn, btnText, successMsg) {
    if (typeof grecaptcha === 'undefined') {
      console.error('reCAPTCHA não carregado');
      alert('Erro na verificação de segurança. Por favor, tente novamente.');
      this.#resetButton(submitBtn, btnText);
      return;
    }

    grecaptcha.ready(() => {
      grecaptcha.execute(this.#config.RECAPTCHA_SITE_KEY, {
        action: this.#config.RECAPTCHA_ACTION
      }).then((token) => {
        this.#sendToSheets(form, data, token, submitBtn, btnText, successMsg);
      }).catch(() => {
        alert('Erro na verificação de segurança. Por favor, tente novamente.');
        this.#resetButton(submitBtn, btnText);
      });
    });
  }

  /**
   * Envia dados para Google Sheets usando iframe (contorna CORS)
   */
  #sendToSheets(form, data, token, submitBtn, btnText, successMsg) {
    if (btnText) btnText.textContent = 'Enviando...';

    const scriptURL = getScriptUrl();
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.name = 'hidden-form';
    document.body.appendChild(iframe);

    const tempForm = document.createElement('form');
    tempForm.action = scriptURL;
    tempForm.method = 'POST';
    tempForm.target = 'hidden-form';

    const fields = {
      name: data.name,
      phone: data.phone,
      age: data.age,
      email: data.email,
      area: data.area,
      message: data.message,
      recaptchaToken: token,
      origin: window.location.origin
    };

    for (const [key, value] of Object.entries(fields)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      tempForm.appendChild(input);
    }

    document.body.appendChild(tempForm);
    tempForm.submit();

    // Aguardar o iframe carregar indica que o servidor respondeu
    let processingComplete = false;

    const finalizeSubmission = () => {
      if (processingComplete) return;
      processingComplete = true;

      if (document.body.contains(tempForm)) document.body.removeChild(tempForm);
      if (document.body.contains(iframe)) document.body.removeChild(iframe);

      this.#redirectToWhatsApp(data);
      this.#resetForm(form, successMsg, submitBtn, btnText);
    };

    iframe.addEventListener('load', finalizeSubmission);

    iframe.addEventListener('error', finalizeSubmission);

    // Fallback: redireciona após timeout mesmo sem confirmação
    setTimeout(() => {
      if (!processingComplete) finalizeSubmission();
    }, 4000);
  }

  /**
   * Redireciona para WhatsApp
   */
  #redirectToWhatsApp(data) {
    const url = buildWhatsAppUrl(data, this.#config.WHATSAPP_PHONE, this.#config.WHATSAPP_MESSAGE_TEMPLATE);
    const win = window.open(url, '_blank');
    if (!win) {
      window.location.href = url;
    }
  }

  /**
   * Reseta formulário após envio
   */
  #resetForm(form, successMsg, submitBtn, btnText) {
    if (successMsg) successMsg.classList.remove('hidden');
    if (form) form.reset();

    setTimeout(() => {
      if (successMsg) successMsg.classList.add('hidden');
    }, 4000);

    this.#resetButton(submitBtn, btnText);
  }

  /**
   * Simula sucesso para bots detectados
   */
  #simulateSuccess(form, successMsg) {
    if (successMsg) successMsg.classList.remove('hidden');
    if (form) form.reset();
    setTimeout(() => {
      if (successMsg) successMsg.classList.add('hidden');
    }, 4000);
  }

  /**
   * Reseta estado do botão
   */
  #resetButton(submitBtn, btnText) {
    if (submitBtn) submitBtn.disabled = false;
    if (btnText) btnText.textContent = 'Agendar Consulta';
  }
}
