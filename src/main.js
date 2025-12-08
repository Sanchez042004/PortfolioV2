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
import './styles/sections.css'
import { initI18next } from './services/i18n.js'
import { getSavedTheme, applyTheme, toggleTheme } from './services/theme.js'
import { setupContactForm } from './services/contact.js'
import { setupScrollSpy } from './utils/scrollSpy.js'

// Components
import { Header, setupHeaderListeners, closeMobileMenu } from './components/Layout/Header.js'
import { Footer } from './components/Layout/Footer.js'
import { Hero } from './components/Sections/Hero.js'
import { About } from './components/Sections/About.js'
import { Experience } from './components/Sections/Experience.js'
import { Education } from './components/Sections/Education.js'
import { Projects } from './components/Sections/Projects.js'
import { Certifications } from './components/Sections/Certifications.js'
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
      ${Education()}
      ${Certifications()}
      ${Projects()}
      ${Contact()}
    </main>
    ${Footer()}
    ${Modal()}
  `
}

/**
 * Re-renders the application and re-attaches event listeners
 * Called on initialization and when language changes
 */
const updateApp = () => {
  // Check if mobile menu is open before re-rendering
  const menuToggle = document.querySelector('#menu-toggle')
  const isMenuOpen = menuToggle ? menuToggle.checked : false

  render()
  applyTheme(getSavedTheme())

  // Restore mobile menu state
  const newMenuToggle = document.querySelector('#menu-toggle')
  if (newMenuToggle && isMenuOpen) {
    newMenuToggle.checked = true
    document.body.style.overflow = 'hidden' // Restore scroll lock
  }

  // Re-attach listeners because DOM was replaced
  setupHeaderListeners(updateApp)
  setupContactForm()
  setupScrollSpy()
}

/**
 * Initialize the application
 */
const init = async () => {
  await initI18next()

  // Initial render
  updateApp()

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getSavedTheme() === 'system') {
      applyTheme('system')
    }
  })
}

// Expose global functions required by inline HTML onclick handlers
window.toggleTheme = toggleTheme
window.closeMobileMenu = closeMobileMenu
window.openModal = openModal
window.closeModal = closeModal

// Start the app
init()
