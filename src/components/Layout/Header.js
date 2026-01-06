import { data } from '../../data.js'
import { t, changeLanguage } from '../../services/i18n.js'
import { ICONS } from '../../utils/icons.js'
import i18next from 'i18next'

// ==========================================
// COMPONENT RENDER
// ==========================================

/**
 * Render the header component with navigation and controls
 * @param {boolean} isMenuOpen - Current state of the mobile menu
 * @returns {string} HTML string for the header
 */
export const Header = (isMenuOpen = false) => {
  const currentLang = i18next.language

  // Define nav items mapping
  const navItems = [
    { key: 'home', label: '/home', href: '#' },
    { key: 'profile', label: '/profile', href: '#profile' },
    { key: 'experience', label: '/experience', href: '#experience' },
    { key: 'education', label: '/education', href: '#education' },
    { key: 'projects', label: '/projects', href: '#projects' },
    { key: 'contact', label: '/contact', href: '#contact' }
  ]

  // Generate Navigation Links (Desktop)
  const renderNavLinks = (isMobile = false) => navItems.map(link => {
    return `<a href="${link.href}" class="nav-link js-close-menu" data-i18n="nav.${link.key}">${t(`nav.${link.key}`)}</a>`
  }).join('')

  return `
    <header class="header">
      <div class="header-content">
        <!-- Left: Logo System -->
        <a href="#" class="header-logo-link" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
            <div class="header-logo-section">
                <div class="logo-icon">
                    <span class="material-symbols-outlined text-xl">terminal</span>
                </div>
                <div class="logo-text">
                    <span class="logo-title">&gt;_ AS_SYSTEM</span>
                    <span class="logo-subtitle">v2.4.0-stable</span>
                </div>
            </div>
        </a>
        
        <!-- Center: Desktop Navigation -->
        <nav class="desktop-nav">
           ${renderNavLinks(false)}
        </nav>
          
        <!-- Right: Controls -->
        <div class="header-controls">
            <!-- Language Selection (Desktop) -->
            <div class="lang-selector desktop-only">
                <button id="lang-toggle-btn" class="lang-toggle" aria-label="Change language">
                    [ ${currentLang.toUpperCase()} ▼ ]
                </button>
                <div id="lang-dropdown" class="lang-dropdown">
                    <div class="lang-option ${currentLang === 'es' ? 'active' : ''}" data-lang="es">Español</div>
                    <div class="lang-option ${currentLang === 'en' ? 'active' : ''}" data-lang="en">English</div>
                    <div class="lang-option ${currentLang === 'pt' ? 'active' : ''}" data-lang="pt">Português</div>
                </div>
            </div>

            <button id="theme-toggle-btn" class="theme-toggle" aria-label="Toggle dark/light theme" data-action="toggle-theme">
                <svg class="theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"></svg>
            </button>
            
            <!-- Mobile Menu Toggle -->
            <div class="mobile-menu-wrapper">
                <input type="checkbox" id="menu-toggle" class="menu-toggle-checkbox" aria-label="Toggle mobile menu" ${isMenuOpen ? 'checked' : ''}>
                <label for="menu-toggle" class="menu-toggle-label">
                    <span class="material-symbols-outlined text-[20px]">menu</span>
                </label>

                <!-- Mobile Nav Overlay -->
                <nav class="mobile-nav">
                    <ul class="mobile-nav-list">
                         ${navItems.map(link => `<li><a href="${link.href}" class="nav-link js-close-menu" data-i18n="nav.${link.key}">${t(`nav.${link.key}`)}</a></li>`).join('')}
                    </ul>
                    
                    <div class="mobile-controls">
                        <!-- Theme Toggle (Mobile) -->
                        <button id="mobile-theme-toggle-btn" class="theme-toggle" aria-label="Toggle theme" data-action="toggle-theme">
                            <svg class="theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"></svg>
                        </button>

                        <!-- Mobile Lang Selector logic reused -->
                         <div class="lang-selector">
                            <button id="mobile-lang-toggle-btn" class="lang-toggle" aria-label="Change language">
                                [ ${currentLang.toUpperCase()} ]
                            </button>
                         </div>
                    </div>
                </nav>
            </div>
        </div>
      </div>
    </header>

    <!-- Mobile Language Dropdown (outside header to avoid containing block issues) -->
    <div id="mobile-lang-backdrop" class="mobile-lang-backdrop"></div>
    <div id="mobile-lang-dropdown" class="lang-dropdown mobile-lang-dropdown-fixed">
        <div class="lang-option ${currentLang === 'es' ? 'active' : ''}" data-lang="es">Español</div>
        <div class="lang-option ${currentLang === 'en' ? 'active' : ''}" data-lang="en">English</div>
        <div class="lang-option ${currentLang === 'pt' ? 'active' : ''}" data-lang="pt">Português</div>
    </div>
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
  const options = document.querySelectorAll('.lang-selector.desktop-only .lang-option')

  if (!toggleBtn || !dropdown) return

  // Clean listeners by replacement
  // Cloning the node and replacing it is a surefire way to remove all existing event listeners
  // (both named and anonymous) before attaching new ones. Useful for our re-render strategy.
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
    // Scroll Lock and Body Class
    menuCheckbox.addEventListener('change', (e) => {
      document.body.style.overflow = e.target.checked ? 'hidden' : ''
      if (e.target.checked) {
        document.body.classList.add('mobile-menu-open')
      } else {
        document.body.classList.remove('mobile-menu-open')
      }
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
    document.body.classList.remove('mobile-menu-open')
  }
}
