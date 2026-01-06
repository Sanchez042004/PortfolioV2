/**
 * ========================================
 * API SERVICE
 * ========================================
 * Wrapper for external integrations (EmailJS, ReCaptcha)
 */

/**
 * Service to handle email sending via EmailJS
 */
export class EmailService {
    /**
     * Initialize EmailJS with Public Key
     * @returns {void}
     */
    static init() {
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        if (PUBLIC_KEY && window.emailjs) {
            window.emailjs.init(PUBLIC_KEY)
        }
    }

    /**
     * Send email using EmailJS
     * @param {Object} data - Cleaned form data
     * @returns {Promise<any>} Response from EmailJS
     */
    static async send(data) {
        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

        if (!window.emailjs) {
            throw new Error('EmailJS SDK not loaded')
        }

        return window.emailjs.send(SERVICE_ID, TEMPLATE_ID, data)
    }
}

/**
 * Service to handle Google ReCaptcha
 */
export class ReCaptchaService {
    /**
     * Load reCAPTCHA script dynamically
     * @returns {Promise<boolean>} True if loaded successfully
     */
    static load() {
        return new Promise((resolve, reject) => {
            const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
            if (!siteKey) {
                resolve(false)
                return
            }
            // Check if already loaded to avoid duplicate script tags on navigation
            if (window.grecaptcha) {
                resolve(true)
                return
            }
            const script = document.createElement('script')
            script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
            script.async = true
            script.defer = true
            script.onload = () => resolve(true)
            script.onerror = () => reject(new Error('Failed to load reCAPTCHA'))
            document.head.appendChild(script)
        })
    }

    /**
     * Get reCAPTCHA token
     * @returns {Promise<string|null>} reCAPTCHA token or null
     */
    static async getToken() {
        const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
        if (!siteKey || !window.grecaptcha) {
            return null
        }
        try {
            return await window.grecaptcha.execute(siteKey, { action: 'submit' })
        } catch (error) {
            console.warn('ReCaptcha execution failed:', error)
            return null
        }
    }
}
