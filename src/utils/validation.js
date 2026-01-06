/**
 * ========================================
 * VALIDATION UTILITIES
 * ========================================
 */

/**
 * Sanitize input to prevent XSS
 * @param {string} input - Raw input string
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
    // Leverage the browser's own HTML parsing to escape entities
    // safer than custom regex for simple text inputs.
    const div = document.createElement('div')
    div.innerText = input
    return div.innerHTML
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid format
 */
export const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

/**
 * Validate contact form fields
 * @param {Object} data - Form data object { name, email, message }
 * @param {Function} t - Translation function
 * @returns {Object} Validation result { isValid, errors }
 */
export const validateContactForm = (data, t) => {
    const errors = {}
    let isValid = true

    // Name validation
    const nameValue = data.name.trim()
    if (!nameValue) {
        errors.name = t('contact.form.required')
        isValid = false
    } else if (nameValue.length < 2) {
        errors.name = t('contact.form.nameTooShort')
        isValid = false
    } else if (nameValue.length > 100) {
        errors.name = t('contact.form.nameTooLong')
        isValid = false
    }

    // Email validation
    const emailValue = data.email.trim()
    if (!emailValue) {
        errors.email = t('contact.form.required')
        isValid = false
    } else if (!isValidEmail(emailValue)) {
        errors.email = t('contact.form.invalidEmail')
        isValid = false
    }

    // Message validation
    const messageValue = data.message.trim()
    if (!messageValue) {
        errors.message = t('contact.form.required')
        isValid = false
    } else if (messageValue.length < 10) {
        errors.message = t('contact.form.messageTooShort')
        isValid = false
    } else if (messageValue.length > 1000) {
        errors.message = t('contact.form.messageTooLong')
        isValid = false
    }

    return { isValid, errors }
}
