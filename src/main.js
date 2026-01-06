/**
 * ========================================
 * PORTFOLIO WEBSITE - MAIN APPLICATION
 * ========================================
 * Author: Andrés
 * Description: Multi-language portfolio with theme switching
 */

import './styles/variables.css'
import './styles/reset.css'
import './styles/utilities.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/forms.css'
import './styles/hero.css'
import './styles/about.css'
import './styles/education.css'
import './styles/projects.css'
import './styles/contact.css'
import './styles/effects.css'
import './styles/experience.css'
import { initI18next, t } from './services/i18n.js'
import { getSavedTheme, applyTheme, toggleTheme } from './services/theme.js'
import { setupContactForm } from './services/contact.js'
import { setupScrollSpy } from './utils/scrollSpy.js'
import { ICONS } from './utils/icons.js'
import { setupEventDelegation } from './core/interactions.js'

// Components
import { Header, setupHeaderListeners, closeMobileMenu } from './components/Layout/Header.js'
import { Footer } from './components/Layout/Footer.js'
import { Hero } from './components/Sections/Hero.js'
import { About } from './components/Sections/About.js'
import { Experience } from './components/Sections/Experience.js'
import { EducationAndCertifications } from './components/Sections/EducationAndCertifications.js'
import { Projects } from './components/Sections/Projects.js'
import { Contact } from './components/Sections/Contact.js'
import { Modal, openModal, closeModal } from './components/UI/Modal.js'

const app = document.querySelector('#app')

/**
 * Render the entire application
 * Updates the DOM with all components
 */
const render = () => {
  app.innerHTML = `
    ${Header()}
    <main>
      ${Hero()}
      ${About()}
      ${Experience()}
      ${EducationAndCertifications()}
      ${Projects()}
      ${Contact()}
    </main>
    ${Footer()}
    ${Modal()}
    <button id="scroll-top-btn" class="scroll-top-btn" data-action="scroll-top">
      ${ICONS.CHEVRON_UP}
    </button>
  `
}

/**
 * Re-renders the application and re-attaches event listeners
 * Called on initialization and when language changes
 * @param {boolean} skipRender - If true, skip full re-render (for language changes)
 */
const updateApp = (skipRender = false) => {
  // Check if mobile menu is open before re-rendering
  const menuToggle = document.querySelector('#menu-toggle')
  const isMenuOpen = menuToggle ? menuToggle.checked : false

  // Check for contact form state to preserve
  const nameInput = document.querySelector('#contact-name')
  const emailInput = document.querySelector('#contact-email')
  const messageInput = document.querySelector('#contact-message')

  const formState = {
    name: nameInput ? nameInput.value : '',
    email: emailInput ? emailInput.value : '',
    message: messageInput ? messageInput.value : ''
  }

  if (!skipRender) {
    // Preserve scroll position
    const scrollPos = window.scrollY

    // TODO: This full re-render is an expensive operation.
    // Consider moving to a component-based update system (e.g., reactive state) 
    // to avoid destroying and recreating the entire DOM on every language change.
    render()
    applyTheme(getSavedTheme())

    // Restore scroll position
    window.scrollTo(0, scrollPos)

    // Restore mobile menu state
    const newMenuToggle = document.querySelector('#menu-toggle')
    if (newMenuToggle && isMenuOpen) {
      newMenuToggle.checked = true
      document.body.style.overflow = 'hidden' // Restore scroll lock
    }

    // Restore contact form state
    const newNameInput = document.querySelector('#contact-name')
    const newEmailInput = document.querySelector('#contact-email')
    const newMessageInput = document.querySelector('#contact-message')

    if (newNameInput) newNameInput.value = formState.name
    if (newEmailInput) newEmailInput.value = formState.email
    if (newMessageInput) newMessageInput.value = formState.message
  }

  // Re-attach listeners because DOM was replaced (or language changed)
  // This is a necessary side-effect of the destructive render strategy
  setupHeaderListeners(updateApp)

  // Only setup contact form and scroll spy if we did a full render
  if (!skipRender) {
    setupContactForm()
    setupScrollSpy()
  }
}

/**
 * Handle scroll to top button visibility
 */
const handleScrollTopVisibility = () => {
  const scrollTopBtn = document.querySelector('#scroll-top-btn')
  if (!scrollTopBtn) return

  // Only show when truly at the bottom (within 10px tolerance for precision)
  // TODO: Add debounce here if scroll performance becomes an issue
  const isNearBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 10)

  if (isNearBottom) {
    scrollTopBtn.classList.add('visible')
  } else {
    scrollTopBtn.classList.remove('visible')
  }
}




/**
 * Initialize the application
 */
const init = async () => {
  await initI18next()

  // Initial render
  updateApp()

  // Setup event delegation
  setupEventDelegation()

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getSavedTheme() === 'system') {
      applyTheme('system')
    }
  })

  // Global scroll listener for back-to-top button
  window.addEventListener('scroll', handleScrollTopVisibility)
}

// Note: Global functions removed - now using event delegation via data-action attributes

import { EVENTS, on } from './core/events.js'

// Subscribe to language changes
on(EVENTS.LANGUAGE_CHANGED, () => {
  updateApp()
})

// Start the app
init()
