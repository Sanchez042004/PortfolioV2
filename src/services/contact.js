import { t } from './i18n.js'
import { validateContactForm, sanitizeInput } from '../utils/validation.js'
import { EmailService, ReCaptchaService } from './api.js'

// Rate limiting: Track last submission time
// Kept in memory (reset on refresh) to prevent accidental spam in a single session.
// For stricter persistence, use localStorage or cookies.
let lastSubmissionTime = 0
const RATE_LIMIT_MS = 60000 // 1 minute

/**
 * Setup contact form integration
 * Handles UI interactions, validation feedback, and delegates to services
 */
export const setupContactForm = async () => {
    const form = document.getElementById('contact-form')
    if (!form) return

    // Initialize services
    EmailService.init()

    // Defer reCAPTCHA loading until user is near the contact section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                ReCaptchaService.load().catch(err => console.warn('ReCaptcha deferred load failed:', err))
                observer.unobserve(form)
            }
        })
    }, { rootMargin: '100px' }) // Start loading when 100px away

    observer.observe(form)

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        // UI Elements
        const formMessage = document.getElementById('form-message')
        const submitBtn = document.getElementById('submit-btn')
        const originalBtnText = submitBtn.textContent

        // Reset UI
        document.querySelectorAll('.form-error').forEach(el => el.textContent = '')
        formMessage.textContent = ''
        formMessage.className = 'form-message'

        // 1. Rate Limiting Check
        const now = Date.now()
        const timeSinceLastSubmission = now - lastSubmissionTime

        if (lastSubmissionTime > 0 && timeSinceLastSubmission < RATE_LIMIT_MS) {
            const remainingSeconds = Math.ceil((RATE_LIMIT_MS - timeSinceLastSubmission) / 1000)
            showFeedback(formMessage, t('contact.form.rateLimitError', { seconds: remainingSeconds }), 'error')
            return
        }

        // 2. Gather Data
        const formData = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            message: document.getElementById('contact-message').value
        }

        // 3. Validate
        const { isValid, errors } = validateContactForm(formData, t)

        if (!isValid) {
            if (errors.name) document.getElementById('name-error').textContent = errors.name
            if (errors.email) document.getElementById('email-error').textContent = errors.email
            if (errors.message) document.getElementById('message-error').textContent = errors.message
            return
        }

        // 4. Send
        submitBtn.textContent = t('contact.form.sending')
        submitBtn.disabled = true

        try {
            const token = await ReCaptchaService.getToken()
            const timestamp = new Date().toLocaleString('es-CO', {
                dateStyle: 'full', timeStyle: 'short', timeZone: 'America/Bogota'
            })

            const emailPayload = {
                from_name: sanitizeInput(formData.name),
                from_email: sanitizeInput(formData.email),
                message: sanitizeInput(formData.message),
                sent_at: timestamp,
                recaptcha_token: token || 'not_available'
            }

            await EmailService.send(emailPayload)

            // Success
            lastSubmissionTime = Date.now()
            showFeedback(formMessage, t('contact.form.success')
                .replace(/\[\s*OK\s*\]/g, '<span class="log-ok">[ OK ]</span>')
                .replace(/\[\s*INFO\s*\]/g, '<span class="log-info">[ INFO ]</span>'), 'success')

            // Explicitly clear form fields
            document.getElementById('contact-name').value = ''
            document.getElementById('contact-email').value = ''
            document.getElementById('contact-message').value = ''

        } catch (error) {
            console.error('Submission failed:', error)
            showFeedback(formMessage, t('contact.form.error')
                .replace(/\[\s*ERR\s*\]/g, '<span class="log-err">[ ERR ]</span>')
                .replace(/\[\s*INFO\s*\]/g, '<span class="log-info">[ INFO ]</span>'), 'error')
        } finally {
            submitBtn.textContent = originalBtnText
            submitBtn.disabled = false
        }
    })
}

/**
 * Helper to show feedback messages and scroll into view
 */
const showFeedback = (element, html, type) => {
    element.innerHTML = html
    element.className = `form-message ${type}`
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

