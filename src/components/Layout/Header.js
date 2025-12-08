import { data } from '../../data.js'
import { t, changeLanguage } from '../../services/i18n.js'
import { ICONS } from '../../utils/icons.js'
import i18next from 'i18next'

// ==========================================
// COMPONENT RENDER
// ==========================================

/**
 * Render the header component with navigation and controls
 * @returns {string} HTML string for the header
 */
export const Header = () => {
  const currentLang = i18next.language
  const currentFlag = currentLang === 'es' ? ICONS.COLOMBIA_FLAG : currentLang === 'en' ? ICONS.USA_FLAG : ICONS.PORTUGAL_FLAG

  // Generate Navigation Links
  const navLinks = data.nav.map((link, index) => {
    const translationKey = `nav.${['about', 'experience', 'education', 'projects', 'contact'][index]}`
    return `<li><a href="${link.href}" class="nav-link js-close-menu">${t(translationKey)}</a></li>`
  }).join('')

  return `
    <header class="header">
      <div class="container header-content">
        <a href="#" class="logo js-close-menu">Curriculum Vitae</a>
        
        <!-- Desktop Navigation -->
        <nav class="desktop-nav flex items-center gap-md">
          <ul class="flex gap-md nav-list">
            ${navLinks}
          </ul>
          
          <div class="lang-selector">
            <button id="lang-toggle-btn" class="lang-toggle" aria-label="Change language">
              ${currentFlag}
            </button>
            <div id="lang-dropdown" class="lang-dropdown">
              <div class="lang-option ${currentLang === 'es' ? 'selected' : ''}" data-lang="es">
                ${ICONS.COLOMBIA_FLAG}
                <span class="lang-name">Español</span>
              </div>
              <div class="lang-option ${currentLang === 'en' ? 'selected' : ''}" data-lang="en">
                ${ICONS.USA_FLAG}
                <span class="lang-name">English</span>
              </div>
              <div class="lang-option ${currentLang === 'pt' ? 'selected' : ''}" data-lang="pt">
                ${ICONS.PORTUGAL_FLAG}
                <span class="lang-name">Português</span>
              </div>
            </div>
          </div>
          
          <button id="theme-toggle-btn" class="theme-toggle" aria-label="Toggle dark/light theme" onclick="window.toggleTheme()">
            <svg class="theme-icon" viewBox="0 0 24 24" fill="currentColor">
              <!-- Icon set dynamically -->
            </svg>
          </button>
        </nav>
        
        <!-- Mobile Menu -->
        <div class="mobile-menu-wrapper">
          <input type="checkbox" id="menu-toggle" class="menu-toggle-checkbox" aria-label="Toggle mobile menu">
          <label for="menu-toggle" class="menu-toggle-label" aria-label="Menu button">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </label>
          
          <nav class="mobile-nav">
            <ul class="mobile-nav-list">
              ${navLinks}
            </ul>
            
            <div class="mobile-controls">
              <div class="lang-selector">
                <button id="mobile-lang-toggle-btn" class="lang-toggle" aria-label="Change language">
                  ${currentFlag}
                </button>
                <div id="mobile-lang-backdrop" class="mobile-lang-backdrop"></div>
                <div id="mobile-lang-dropdown" class="lang-dropdown">
                  <div class="lang-option ${currentLang === 'es' ? 'selected' : ''}" data-lang="es">
                    ${ICONS.COLOMBIA_FLAG}
                    <span class="lang-name">Español</span>
                  </div>
                  <div class="lang-option ${currentLang === 'en' ? 'selected' : ''}" data-lang="en">
                    ${ICONS.USA_FLAG}
                    <span class="lang-name">English</span>
                  </div>
                  <div class="lang-option ${currentLang === 'pt' ? 'selected' : ''}" data-lang="pt">
                    ${ICONS.PORTUGAL_FLAG}
                    <span class="lang-name">Português</span>
                  </div>
                </div>
              </div>
              
              <button id="mobile-theme-toggle-btn" class="theme-toggle" aria-label="Toggle dark/light theme" onclick="window.toggleTheme()">
                <svg class="theme-icon" viewBox="0 0 24 24" fill="currentColor">
                  <!-- Icon set dynamically -->
                </svg>
              </button>
            </div>
            
            <div class="mobile-copyright">
              &copy; ${new Date().getFullYear()} Andrés
            </div>
          </nav>
        </div>
      </div>
    </header>
  `
}

// ==========================================
// BEHAVIOR SETUP
// ==========================================

let languageListenersInitialized = false

export const setupHeaderListeners = (renderCallback) => {
  setupGlobalListeners()
  setupDesktopLanguageSelector(renderCallback)
  setupMobileLanguageSelector(renderCallback)
  setupMobileMenuBehavior()
}

/**
 * Set up global document listeners (only once)
 */
const setupGlobalListeners = () => {
  if (languageListenersInitialized) return

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    const desktopDropdown = document.querySelector('#lang-dropdown')
    // Mobile dropdown is handled by its backdrop, so no global listener needed for it

    // Check if click is outside desktop dropdown
    if (!e.target.closest('.lang-selector')) {
      if (desktopDropdown) desktopDropdown.classList.remove('active')
    }
  })

  languageListenersInitialized = true
}

/**
 * Configure Desktop Language Selector behavior
 */
const setupDesktopLanguageSelector = (renderCallback) => {
  const toggleBtn = document.querySelector('#lang-toggle-btn')
  const dropdown = document.querySelector('#lang-dropdown')
  const options = document.querySelectorAll('.desktop-nav .lang-option')

  if (!toggleBtn || !dropdown) return

  // Clean listeners by replacement
  const newToggleBtn = toggleBtn.cloneNode(true)
  toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn)

  newToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    dropdown.classList.toggle('active')
  })

  // Setup options
  options.forEach(option => {
    const newOption = option.cloneNode(true)
    option.parentNode.replaceChild(newOption, option)

    newOption.addEventListener('click', (e) => {
      e.stopPropagation()
      const lang = newOption.getAttribute('data-lang')
      changeLanguage(lang, renderCallback)
      dropdown.classList.remove('active')
    })
  })
}

/**
 * Configure Mobile Language Selector behavior (includes backdrop and swipe)
 */
const setupMobileLanguageSelector = (renderCallback) => {
  const mobileToggleBtn = document.querySelector('#mobile-lang-toggle-btn')
  const mobileDropdown = document.querySelector('#mobile-lang-dropdown')
  const mobileBackdrop = document.querySelector('#mobile-lang-backdrop')

  if (!mobileToggleBtn || !mobileDropdown || !mobileBackdrop) return

  // Helper to toggle menu disabled state
  const setMenuDisabled = (disabled) => {
    const checkbox = document.querySelector('#menu-toggle')
    if (checkbox) checkbox.disabled = disabled
  }

  // Clone elements
  const newMobileToggleBtn = mobileToggleBtn.cloneNode(true)
  const newMobileDropdown = mobileDropdown.cloneNode(true)
  const newMobileBackdrop = mobileBackdrop.cloneNode(true)

  // Replace in DOM
  mobileToggleBtn.parentNode.replaceChild(newMobileToggleBtn, mobileToggleBtn)
  mobileDropdown.parentNode.replaceChild(newMobileDropdown, mobileDropdown)
  mobileBackdrop.parentNode.replaceChild(newMobileBackdrop, mobileBackdrop)

  // Toggle Action
  newMobileToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    const isActive = newMobileDropdown.classList.contains('active')
    if (isActive) {
      newMobileDropdown.classList.remove('active')
      newMobileBackdrop.classList.remove('active')
      setMenuDisabled(false)
    } else {
      newMobileDropdown.classList.add('active')
      newMobileBackdrop.classList.add('active')
      setMenuDisabled(true)
    }
  })

  // Backdrop Action
  newMobileBackdrop.addEventListener('click', (e) => {
    e.stopPropagation()
    newMobileDropdown.classList.remove('active')
    newMobileBackdrop.classList.remove('active')
    setMenuDisabled(false)
  })

  // Swipe Action
  setupSwipeBehavior(newMobileDropdown, newMobileBackdrop, setMenuDisabled)

  // Options Action
  const newMobileOptions = newMobileDropdown.querySelectorAll('.lang-option')
  newMobileOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation()
      const lang = option.getAttribute('data-lang')

      newMobileDropdown.classList.remove('active')
      newMobileBackdrop.classList.remove('active')
      setMenuDisabled(false)

      setTimeout(() => {
        changeLanguage(lang, renderCallback)
      }, 200)
    })
  })
}

/**
 * Setup Swipe Down behavior for mobile dropdown
 */
const setupSwipeBehavior = (element, backdrop, setDisabledFn) => {
  let touchStartY = 0
  let touchCurrentY = 0

  element.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY
  }, { passive: true })

  element.addEventListener('touchmove', (e) => {
    touchCurrentY = e.touches[0].clientY
    const diff = touchCurrentY - touchStartY

    if (diff > 0) {
      element.style.transform = `translateY(${diff}px)`
      element.style.transition = 'none'
    }
  }, { passive: true })

  element.addEventListener('touchend', (e) => {
    touchCurrentY = e.changedTouches[0].clientY
    const diff = touchCurrentY - touchStartY

    element.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, visibility 0s linear'

    if (diff > 100) {
      element.classList.remove('active')
      backdrop.classList.remove('active')
      setDisabledFn(false)
      setTimeout(() => { element.style.transform = '' }, 200)
    } else {
      element.style.transform = ''
    }
  })
}

/**
 * Setup General Mobile Menu behavior (scroll locking and closing on link click)
 */
const setupMobileMenuBehavior = () => {
  const menuCheckbox = document.querySelector('#menu-toggle')
  if (menuCheckbox) {
    // Scroll Lock
    menuCheckbox.addEventListener('change', (e) => {
      document.body.style.overflow = e.target.checked ? 'hidden' : ''
    })

    // Close on link click
    const closeLinks = document.querySelectorAll('.js-close-menu')
    closeLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu)
    })

    // Reset on desktop resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && menuCheckbox.checked) {
        closeMobileMenu()
      }
    })
  }
}

/**
 * Close the mobile menu helper
 * Exported for global usage if needed
 */
export const closeMobileMenu = () => {
  const checkbox = document.querySelector('#menu-toggle')
  if (checkbox) {
    checkbox.checked = false
    document.body.style.overflow = ''
  }
}
