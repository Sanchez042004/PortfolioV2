import { data } from '../../data.js'
import { t, changeLanguage } from '../../services/i18n.js'
import i18next from 'i18next'

/**
 * Render the header component with navigation and controls
 * @returns {string} HTML string for the header
 */
export const Header = () => {
  const navLinks = data.nav.map((link, index) =>
    `<li><a href="${link.href}" class="nav-link" onclick="window.closeMobileMenu()">${t(`nav.${['about', 'experience', 'education', 'projects', 'contact'][index]}`)}</a></li>`
  ).join('')

  const currentLang = i18next.language

  // SVG Flags
  const colombiaFlag = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 900 600"><path fill="#ffcd00" d="M0 0h900v600H0z"/><path fill="#003087" d="M0 300h900v300H0z"/><path fill="#c8102e" d="M0 450h900v150H0z"/></svg>`
  const usaFlag = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 7410 3900"><rect width="7410" height="3900" fill="#BB133E"/><path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" stroke-width="300"/><rect width="2964" height="2100" fill="#002664"/><g fill="#ffffff" transform="translate(0,11.458981)"><g id="s18"><g id="s9"><g id="s5"><g id="s4"><path id="s" d="m 247,90 70.53423,217.08204 -184.66101,-134.16408 228.25356,0 -184.66101,134.16408 z"/><use href="#s" y="420"/><use href="#s" y="840"/><use href="#s" y="1260"/></g><use href="#s" y="1680"/></g><use href="#s4" x="247" y="210"/></g><use href="#s9" x="494"/></g><use href="#s18" x="988"/><use href="#s9" x="1976"/><use href="#s5" x="2470"/></g></svg>`
  const portugalFlag = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 600 400"><rect width="600" height="400" fill="#f00"/><rect width="240" height="400" fill="#060"/><circle cx="240" cy="200" r="80" fill="#ff0" stroke="#000" stroke-width="2"/></svg>`

  const currentFlag = currentLang === 'es' ? colombiaFlag : currentLang === 'en' ? usaFlag : portugalFlag

  return `
    <header class="header">
      <div class="container header-content">
        <a href="#" class="logo" onclick="window.closeMobileMenu()">Curriculum Vitae</a>
        
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
                ${colombiaFlag}
                <span class="lang-name">Español</span>
              </div>
              <div class="lang-option ${currentLang === 'en' ? 'selected' : ''}" data-lang="en">
                ${usaFlag}
                <span class="lang-name">English</span>
              </div>
              <div class="lang-option ${currentLang === 'pt' ? 'selected' : ''}" data-lang="pt">
                ${portugalFlag}
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
        
        <!-- Mobile Menu (Checkbox technique) -->
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
                <div id="mobile-lang-dropdown" class="lang-dropdown">
                  <div class="lang-option ${currentLang === 'es' ? 'selected' : ''}" data-lang="es">
                    ${colombiaFlag}
                    <span class="lang-name">Español</span>
                  </div>
                  <div class="lang-option ${currentLang === 'en' ? 'selected' : ''}" data-lang="en">
                    ${usaFlag}
                    <span class="lang-name">English</span>
                  </div>
                  <div class="lang-option ${currentLang === 'pt' ? 'selected' : ''}" data-lang="pt">
                    ${portugalFlag}
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

let languageListenersInitialized = false

export const setupHeaderListeners = (renderCallback) => {
  // Only set up document-level listeners once
  if (!languageListenersInitialized) {
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      const desktopDropdown = document.querySelector('#lang-dropdown')
      const mobileDropdown = document.querySelector('#mobile-lang-dropdown')

      // Check if click is outside both dropdowns and their toggle buttons
      if (!e.target.closest('.lang-selector')) {
        if (desktopDropdown) desktopDropdown.classList.remove('active')
        if (mobileDropdown) mobileDropdown.classList.remove('active')
      }
    })

    languageListenersInitialized = true
  }

  // Desktop language selector
  const toggleBtn = document.querySelector('#lang-toggle-btn')
  const dropdown = document.querySelector('#lang-dropdown')
  const options = document.querySelectorAll('.lang-option')

  if (toggleBtn && dropdown) {
    // Remove old listeners by cloning and replacing
    const newToggleBtn = toggleBtn.cloneNode(true)
    toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn)

    newToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      dropdown.classList.toggle('active')
    })

    // Handle language option clicks
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

  // Mobile language selector
  const mobileToggleBtn = document.querySelector('#mobile-lang-toggle-btn')
  const mobileDropdown = document.querySelector('#mobile-lang-dropdown')
  const mobileOptions = document.querySelectorAll('#mobile-lang-dropdown .lang-option')

  if (mobileToggleBtn && mobileDropdown) {
    // Remove old listeners by cloning and replacing
    const newMobileToggleBtn = mobileToggleBtn.cloneNode(true)
    mobileToggleBtn.parentNode.replaceChild(newMobileToggleBtn, mobileToggleBtn)

    newMobileToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      mobileDropdown.classList.toggle('active')
    })

    // Swipe down to close logic
    let touchStartY = 0
    let touchCurrentY = 0

    mobileDropdown.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY
    }, { passive: true })

    mobileDropdown.addEventListener('touchmove', (e) => {
      touchCurrentY = e.touches[0].clientY
      const diff = touchCurrentY - touchStartY

      // If pulling down, transform the sheet
      if (diff > 0) {
        mobileDropdown.style.transform = `translateY(${diff}px)`
        mobileDropdown.style.transition = 'none'
      }
    }, { passive: true })

    mobileDropdown.addEventListener('touchend', (e) => {
      touchCurrentY = e.changedTouches[0].clientY
      const diff = touchCurrentY - touchStartY

      // Reset transition
      mobileDropdown.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease'

      // If pulled down more than 100px, close it
      if (diff > 100) {
        mobileDropdown.classList.remove('active')
        // Clean up style after animation
        setTimeout(() => {
          mobileDropdown.style.transform = ''
        }, 200)
      } else {
        // Otherwise snap back to open
        mobileDropdown.style.transform = ''
      }
    })

    // Handle mobile language option clicks
    mobileOptions.forEach(option => {
      const newOption = option.cloneNode(true)
      option.parentNode.replaceChild(newOption, option)

      newOption.addEventListener('click', (e) => {
        e.stopPropagation()
        const lang = newOption.getAttribute('data-lang')

        // Close dropdown with animation first
        mobileDropdown.classList.remove('active')

        // Wait for animation to finish before updating language
        setTimeout(() => {
          changeLanguage(lang, renderCallback)
        }, 200)
      })
    })
  }
  // Setup mobile menu toggle listener for scroll locking
  const menuCheckbox = document.querySelector('#menu-toggle')
  if (menuCheckbox) {
    menuCheckbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    })
  }
}

/**
 * Close the mobile menu
 * Unchecks the menu toggle checkbox
 */
export const closeMobileMenu = () => {
  const checkbox = document.querySelector('#menu-toggle')
  if (checkbox) {
    checkbox.checked = false
    document.body.style.overflow = ''
  }
}
