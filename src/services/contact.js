import { t } from './i18n.js'
import { sanitizeInput, isValidEmail } from '../utils/helpers.js'

// Rate limiting: Track last submission time
let lastSubmissionTime = 0
const RATE_LIMIT_MS = 60000 // 1 minute between submissions

/**
 * Load reCAPTCHA script dynamically
 * @returns {Promise<boolean>} True if loaded successfully
 */
export const loadRecaptcha = () => {
    return new Promise((resolve, reject) => {
        const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
        if (!siteKey) {
            resolve(false)
            return
        }
        // Check if already loaded
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
export const getRecaptchaToken = async () => {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
    if (!siteKey || !window.grecaptcha) {
        return null
    }
    try {
        const token = await window.grecaptcha.execute(siteKey, { action: 'submit' })
        return token
    } catch (error) {
        return null
    }
}

/**
 * Setup contact form with EmailJS integration
 * Handles form submission, validation, and user feedback
 * Includes rate limiting, input sanitization, and reCAPTCHA
 */
export const setupContactForm = async () => {
    const form = document.getElementById('contact-form')
    if (!form) return

    // Initialize EmailJS with Public Key from environment variables
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    // Validate that environment variables are loaded
    if (!PUBLIC_KEY) {
        return
    }

    // Use window.emailjs if available (loaded via CDN)
    if (window.emailjs) {
        window.emailjs.init(PUBLIC_KEY)
    }

    // Load reCAPTCHA
    try {
        await loadRecaptcha()
    } catch (error) {
        // reCAPTCHA failed to load, continue without it
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        // Get form elements
        const nameInput = document.getElementById('contact-name')
        const emailInput = document.getElementById('contact-email')
        const messageInput = document.getElementById('contact-message')
        const submitBtn = document.getElementById('submit-btn')
        const formMessage = document.getElementById('form-message')

        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(el => el.textContent = '')
        formMessage.textContent = ''
        formMessage.className = 'form-message'

        // Rate limiting check
        const now = Date.now()
        const timeSinceLastSubmission = now - lastSubmissionTime

        if (lastSubmissionTime > 0 && timeSinceLastSubmission < RATE_LIMIT_MS) {
            const remainingSeconds = Math.ceil((RATE_LIMIT_MS - timeSinceLastSubmission) / 1000)
            formMessage.textContent = t('contact.form.rateLimitError', { seconds: remainingSeconds })
            formMessage.className = 'form-message error'
            // Scroll to error message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' })
            return
        }

        // Validate fields
        let isValid = true

        // Name validation
        const nameValue = nameInput.value.trim()
        if (!nameValue) {
            document.getElementById('name-error').textContent = t('contact.form.required')
            isValid = false
        } else if (nameValue.length < 2) {
            document.getElementById('name-error').textContent = t('contact.form.nameTooShort')
            isValid = false
        } else if (nameValue.length > 100) {
            document.getElementById('name-error').textContent = t('contact.form.nameTooLong')
            isValid = false
        }

        // Email validation
        const emailValue = emailInput.value.trim()
        if (!emailValue) {
            document.getElementById('email-error').textContent = t('contact.form.required')
            isValid = false
        } else if (!isValidEmail(emailValue)) {
            document.getElementById('email-error').textContent = t('contact.form.invalidEmail')
            isValid = false
        }

        // Message validation
        const messageValue = messageInput.value.trim()
        if (!messageValue) {
            document.getElementById('message-error').textContent = t('contact.form.required')
            isValid = false
        } else if (messageValue.length < 10) {
            document.getElementById('message-error').textContent = t('contact.form.messageTooShort')
            isValid = false
        } else if (messageValue.length > 1000) {
            document.getElementById('message-error').textContent = t('contact.form.messageTooLong')
            isValid = false
        }

        if (!isValid) return

        // Show loading state
        const originalText = submitBtn.textContent
        submitBtn.textContent = t('contact.form.sending')
        submitBtn.disabled = true

        try {
            // Get reCAPTCHA token
            const recaptchaToken = await getRecaptchaToken()

            // Load credentials from environment variables
            const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
            const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

            // Get current date and time
            const currentDate = new Date()
            const timestamp = currentDate.toLocaleString('es-CO', {
                dateStyle: 'full',
                timeStyle: 'short',
                timeZone: 'America/Bogota'
            })

            // Sanitize inputs before sending
            const sanitizedData = {
                from_name: sanitizeInput(nameValue),
                from_email: sanitizeInput(emailValue),
                message: sanitizeInput(messageValue),
                sent_at: timestamp,
                recaptcha_token: recaptchaToken || 'not_available'
            }

            // Send email using EmailJS
            if (window.emailjs) {
                await window.emailjs.send(SERVICE_ID, TEMPLATE_ID, sanitizedData)
            } else {
                console.error("EmailJS not loaded")
                throw new Error("EmailJS not loaded")
            }

            // Update last submission time (only on success)
            lastSubmissionTime = Date.now()

            // Show success message
            formMessage.textContent = t('contact.form.success')
            formMessage.className = 'form-message success'

            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' })

            // Clear form
            form.reset()
        } catch (error) {
            console.error(error)
            formMessage.textContent = t('contact.form.error')
            formMessage.className = 'form-message error'
            // Scroll to error message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' })
        } finally {
            // Restore button state
            submitBtn.textContent = originalText
            submitBtn.disabled = false
        }
    })
}
