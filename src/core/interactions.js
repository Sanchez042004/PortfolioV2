/**
 * ========================================
 * EVENT DELEGATION ROUTER
 * ========================================
 * Centralizes all click-based interactions using data-action attributes
 * Eliminates the need for global window functions
 */

import { toggleTheme } from '../services/theme.js'
import { openModal, closeModal } from '../components/UI/Modal.js'
import { data } from '../data.js'
import { t } from '../services/i18n.js'
import { ICONS } from '../utils/icons.js'

/**
 * Scroll to top of the page smoothly
 */
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

/**
 * Action handlers mapped to data-action values
 */
const actionHandlers = {
    'toggle-theme': () => toggleTheme(),
    'open-modal': (target) => {
        const pdfUrl = target.dataset.url
        if (pdfUrl) openModal(pdfUrl)
    },
    'close-modal': () => closeModal(),
    'scroll-top': () => scrollToTop(),
    'open-email': () => {
        window.location.href = `mailto:${data.profile.social.email}`
    },
    'copy-email': (target) => {
        const email = data.profile.social.email
        navigator.clipboard.writeText(email).then(() => {
            const originalTitle = target.getAttribute('title')
            const originalHTML = target.innerHTML

            target.setAttribute('title', t('contact.copied'))
            target.classList.add('copied')
            target.innerHTML = ICONS.CHECK

            setTimeout(() => {
                target.setAttribute('title', originalTitle)
                target.classList.remove('copied')
                target.innerHTML = originalHTML
            }, 2000)
        })
    }
}

/**
 * Setup centralized event delegation for all interactive elements
 * Uses data-action attributes instead of inline onclick handlers
 */
export const setupEventDelegation = () => {
    document.addEventListener('click', (e) => {
        // Find the closest element with data-action attribute
        // Using event delegation allows us to handle clicks on elements that
        // might be re-rendered (dynamic content) without re-attaching listeners
        const target = e.target.closest('[data-action]')
        if (!target) return

        const action = target.dataset.action

        // Special handling for modal backdrop (only close if clicking the backdrop itself)
        if (action === 'close-modal' && target.id === 'pdf-modal') {
            if (e.target === target) {
                e.preventDefault()
                closeModal()
            }
            return
        }

        const handler = actionHandlers[action]

        if (handler) {
            e.preventDefault()
            handler(target)
        }
    })
}
