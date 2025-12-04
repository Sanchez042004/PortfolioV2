/**
 * ========================================
 * PORTFOLIO WEBSITE - MAIN APPLICATION
 * ========================================
 * Author: Andrés
 * Description: Multi-language portfolio with theme switching
 * Features: i18next for translations, responsive design, dark/light/system themes
 */

import './style.css'
import { data } from './data.js'
import esTranslations from './locales/es.json' with { type: 'json' }
import enTranslations from './locales/en.json' with { type: 'json' }
import ptTranslations from './locales/pt.json' with { type: 'json' }

/* ========================================
   INTERNATIONALIZATION (i18next)
   ======================================== */

/**
 * Initialize i18next library with language resources
 * @async
 * @returns {Promise<void>}
 */
const initI18next = async () => {
  await i18next.init({
    lng: localStorage.getItem('language') || 'es',
    fallbackLng: 'es',
    resources: {
      es: { translation: esTranslations },
      en: { translation: enTranslations },
      pt: { translation: ptTranslations }
    }
  })
}

/* ========================================
   LANGUAGE MANAGEMENT
   ======================================== */

/**
 * Get the saved language from localStorage
 * @returns {string} Language code (es, en, or pt)
 */
const getSavedLanguage = () => localStorage.getItem('language') || 'es'

/**
 * Change the application language
 * @param {string} lang - Language code (es, en, or pt)
 */
const changeLanguage = (lang) => {
  i18next.changeLanguage(lang)
  localStorage.setItem('language', lang)
  render()
  applyTheme(getSavedTheme()) // Restore theme icons after re-render
  setupLanguageSelector() // Re-setup event listeners
  setupContactForm() // Re-setup contact form listeners
  setupScrollSpy() // Re-setup scroll spy
}

/**
 * Setup event listeners for language selector dropdowns
 * Handles both desktop and mobile language selectors
 * Uses event delegation to prevent duplicate listeners
 */
let languageListenersInitialized = false

const setupLanguageSelector = () => {
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
        changeLanguage(lang)
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

    // Handle mobile language option clicks
    mobileOptions.forEach(option => {
      const newOption = option.cloneNode(true)
      option.parentNode.replaceChild(newOption, option)

      newOption.addEventListener('click', (e) => {
        e.stopPropagation()
        const lang = newOption.getAttribute('data-lang')
        changeLanguage(lang)
        mobileDropdown.classList.remove('active')
      })
    })
  }
}


/* ========================================
   CONTACT FORM MANAGEMENT
   ======================================== */
// Rate limiting: Track last submission time
let lastSubmissionTime = 0
const RATE_LIMIT_MS = 60000 // 1 minute between submissions
/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized input
 */
const sanitizeInput = (input) => {
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}
/**
 * Validate email with robust regex
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
const isValidEmail = (email) => {
  // More robust email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email) && email.length <= 254 // RFC 5321
}
/**
 * Load reCAPTCHA script dynamically
 * @returns {Promise<boolean>} True if loaded successfully
 */
const loadRecaptcha = () => {
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
const getRecaptchaToken = async () => {
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
const setupContactForm = async () => {
  const form = document.getElementById('contact-form')
  if (!form) return
  // Initialize EmailJS with Public Key from environment variables
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  // Validate that environment variables are loaded
  if (!PUBLIC_KEY) {
    return
  }

  emailjs.init(PUBLIC_KEY)
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
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, sanitizedData)
      // Update last submission time (only on success)
      lastSubmissionTime = Date.now()
      // Show success message
      formMessage.textContent = t('contact.form.success')
      formMessage.className = 'form-message success'
      // Clear form
      form.reset()
    } catch (error) {
      formMessage.textContent = t('contact.form.error')
      formMessage.className = 'form-message error'
    } finally {
      // Restore button state
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }
  })
}


/* ========================================
   THEME MANAGEMENT
   ======================================== */

/**
 * Get the system's preferred color scheme
 * @returns {string} 'dark' or 'light'
 */
const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

/**
 * Get the saved theme preference from localStorage
 * @returns {string} Theme preference ('light', 'dark', or 'system')
 */
const getSavedTheme = () => {
  const saved = localStorage.getItem('theme')
  return saved ? saved : 'system'
}

/**
 * Apply the selected theme to the document
 * Updates theme icons and document attributes
 * @param {string} theme - Theme to apply ('light', 'dark', or 'system')
        */
const applyTheme = (theme) => {
  const effectiveTheme = theme === 'system' ? getSystemTheme() : theme
  document.documentElement.setAttribute('data-theme', effectiveTheme)

  // Update icon
  let iconPath = ''
  let viewBox = '0 0 24 24'

  if (theme === 'light') {
    iconPath = `<path d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z" fill="#1C274C"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25ZM4.39861 4.39861C4.6915 4.10572 5.16638 4.10572 5.45927 4.39861L5.85211 4.79145C6.145 5.08434 6.145 5.55921 5.85211 5.85211C5.55921 6.145 5.08434 6.145 4.79145 5.85211L4.39861 5.45927C4.10572 5.16638 4.10572 4.6915 4.39861 4.39861ZM19.6011 4.39887C19.894 4.69176 19.894 5.16664 19.6011 5.45953L19.2083 5.85237C18.9154 6.14526 18.4405 6.14526 18.1476 5.85237C17.8547 5.55947 17.8547 5.0846 18.1476 4.79171L18.5405 4.39887C18.8334 4.10598 19.3082 4.10598 19.6011 4.39887ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12ZM18.1476 18.1476C18.4405 17.8547 18.9154 17.8547 19.2083 18.1476L19.6011 18.5405C19.894 18.8334 19.894 19.3082 19.6011 19.6011C19.3082 19.894 18.8334 19.894 18.5405 19.6011L18.1476 19.2083C17.8547 18.9154 17.8547 18.4405 18.1476 18.1476ZM5.85211 18.1479C6.145 18.4408 6.145 18.9157 5.85211 19.2086L5.45927 19.6014C5.16638 19.8943 4.6915 19.8943 4.39861 19.6014C4.10572 19.3085 4.10572 18.8336 4.39861 18.5407L4.79145 18.1479C5.08434 17.855 5.55921 17.855 5.85211 18.1479ZM12 20.25C12.4142 20.25 12.75 20.5858 12.75 21V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V21C11.25 20.5858 11.5858 20.25 12 20.25Z" fill="#1C274C"/>`
  } else if (theme === 'dark') {
    iconPath = `<path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>`
  } else {
    viewBox = '0 0 48 48'
    iconPath = '<path d="M41,6H7A2,2,0,0,0,5,8V32a2,2,0,0,0,2,2H41a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2Z"/><path d="M44,42H4a2,2,0,0,1,0-4H44a2,2,0,0,1,0,4Z"/>'
  }

  // Update theme buttons (desktop and mobile)
  const themeButtons = document.querySelectorAll('#theme-toggle-btn, #mobile-theme-toggle-btn')
  themeButtons.forEach(btn => {
    const svg = btn.querySelector('svg')
    if (svg) {
      svg.setAttribute('viewBox', viewBox)
      svg.innerHTML = iconPath
    }
  })

  // Trigger animation
  const icons = document.querySelectorAll('.theme-icon')
  icons.forEach(icon => {
    icon.style.transform = 'rotate(360deg)'
    setTimeout(() => icon.style.transform = 'rotate(0deg)', 500)
  })
}

/**
 * Toggle between light, dark, and system themes
 * Cycles through: light → dark → system → light
 */
const toggleTheme = () => {
  const current = getSavedTheme()
  const next = current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light'

  localStorage.setItem('theme', next)
  applyTheme(next)
}

const app = document.querySelector('#app')

/**
 * Translation helper function
 * @param {string} key - Translation key
 * @param {Object} options - i18next options
 * @returns {string} Translated string
 */
const t = (key, options) => i18next.t(key, options)

/* ========================================
   UI COMPONENTS
   ======================================== */

/**
 * Render the header component with navigation and controls
 * @returns {string} HTML string for the header
 */
const Header = () => {
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
        <a href="#" class="logo">Curriculum Vitae</a>
        
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
              <div class="lang-option" data-lang="es">
                ${colombiaFlag}
                <span class="lang-name">Español</span>
              </div>
              <div class="lang-option" data-lang="en">
                ${usaFlag}
                <span class="lang-name">English</span>
              </div>
              <div class="lang-option" data-lang="pt">
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
                  <div class="lang-option" data-lang="es">
                    ${colombiaFlag}
                    <span class="lang-name">Español</span>
                  </div>
                  <div class="lang-option" data-lang="en">
                    ${usaFlag}
                    <span class="lang-name">English</span>
                  </div>
                  <div class="lang-option" data-lang="pt">
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

/**
 * Render the hero section
 * @returns {string} HTML string for the hero section
 */
const Hero = () => {
  return `
    <section class="hero container animate-fade-in">
      <div class="hero-content">
        <span class="hero-role">${t('profile.role')}</span>
        <h1>${t('hero.greeting')} ${data.profile.name}.</h1>
<p class="hero-bio">${t('profile.bio')}</p>
<div class="hero-contact-info">
          <span class="hero-contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 930 1280" fill="currentColor" class="hero-contact-icon location">
              <path d="M4335 12789 c-1496 -104 -2843 -915 -3635 -2190 -232 -373 -414 -787 -529 -1204 -305 -1107 -197 -2278 305 -3295 191 -387 372 -660 676 -1020 34 -41 753 -976 1596 -2077 918 -1199 1555 -2022 1588 -2052 186 -170 442 -170 628 0 33 30 670 853 1588 2052 843 1101 1562 2036 1596 2077 304 360 485 633 676 1020 566 1147 629 2502 174 3695 -353 923 -967 1689 -1798 2242 -825 549 -1864 821 -2865 752z m559 -2254 c224 -29 398 -81 601 -180 553 -268 931 -756 1062 -1374 25 -116 27 -145 28 -366 0 -267 -10 -345 -70 -555 -161 -561 -586 -1032 -1130 -1253 -201 -82 -365 -120 -592 -139 -294 -25 -593 23 -878 139 -544 221 -969 692 -1130 1253 -60 210 -70 288 -70 555 1 221 3 250 28 366 112 527 406 965 842 1252 177 116 437 227 637 271 209 46 467 58 672 31z" transform="scale(0.1 0.1)"/>
            </svg>
            ${data.profile.location}
          </span>
          <span class="hero-contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 997 1280" fill="currentColor" class="hero-contact-icon phone">
              <path d="M3045 12782 c-27 -10 -230 -122 -450 -248 -220 -127 -506 -291 -635 -364 -301 -171 -350 -219 -382 -374 -23 -106 -15 -124 273 -615 480 -820 1464 -2453 1505 -2500 54 -59 132 -106 213 -127 113 -28 117 -27 650 279 262 151 553 318 648 371 236 134 298 204 325 370 21 129 12 151 -211 521 -1045 1729 -1554 2566 -1580 2597 -73 87 -245 131 -356 90z M1193 11440 c-530 -152 -892 -537 -1069 -1139 -285 -967 -66 -2490 601 -4181 675 -1710 1696 -3334 2810 -4469 954 -971 1864 -1506 2775 -1632 127 -18 508 -18 625 -1 218 33 412 85 604 161 86 35 177 76 189 86 5 4 -872 1531 -975 1695 -105 168 -311 504 -630 1030 -170 279 -140 257 -293 219 -128 -31 -394 -34 -545 -5 -331 61 -711 251 -1050 523 -139 111 -397 363 -527 513 -197 228 -397 506 -563 785 -101 170 -151 270 -218 440 -168 426 -272 819 -323 1220 -25 198 -23 540 5 722 53 353 178 647 377 890 30 36 52 68 50 72 -2 3 -56 95 -120 204 -168 286 -414 732 -816 1477 -492 914 -776 1420 -795 1419 -5 0 -56 -13 -112 -29z M7690 4686 c-19 -8 -237 -130 -485 -273 -247 -143 -533 -306 -635 -363 -199 -113 -268 -169 -308 -251 -51 -105 -48 -215 7 -313 701 -1244 1679 -2927 1734 -2984 18 -18 61 -48 97 -65 59 -29 73 -32 160 -32 l96 0 159 92 c88 50 385 220 660 377 275 158 512 299 528 314 41 38 76 95 98 160 22 63 26 199 7 253 -6 19 -100 185 -208 369 -109 184 -403 688 -655 1120 -656 1125 -854 1460 -887 1502 -18 23 -55 50 -96 70 -57 28 -78 33 -152 35 -53 2 -98 -3 -120 -11z" transform="scale(0.1 0.1)"/>
            </svg>
            ${data.profile.phone}
          </span>
        </div>
        <div class="flex gap-sm hero-actions">
          <a href="#projects" class="btn btn-primary">${t('hero.viewWork')}</a>
          <a href="#contact" class="btn btn-outline">${t('hero.contactMe')}</a>
        </div>
      </div>
    </section>
  `
}

/**
 * Render the about section with skills
 * @returns {string} HTML string for the about section
 */
const About = () => {
  const skills = data.skills.map(skill =>
    `<span class="tag">${skill}</span>`
  ).join('')

  return `
    <section id="about" class="section container">
      <h2 class="section-title">${t('about.title')}</h2>
      <div class="grid grid-cols-2 gap-md">
        <div>
          <p>${t('about.description')}</p>
        </div>
        <div>
          <h3 class="skills-title">${t('skills.title')}</h3>
          <div class="flex skills-container">
            ${skills}
          </div>
        </div>
      </div>
    </section>
  `
}

/**
 * Render the education section
 * @returns {string} HTML string for the education section
 */
const Education = () => {
  const educationItems = t('education.items', { returnObjects: true })

  const educationList = educationItems.map(edu => `
    <article class="card">
      <div class="card-content">
        <h3 class="card-title">${edu.school}</h3>
        <p class="card-subtitle">${edu.degree}</p>
        <p class="card-meta">${edu.dates}</p>
      </div>
    </article>
  `).join('')

  return `
    <section id="education" class="section container">
      <h2 class="section-title">${t('education.title')}</h2>
      <div class="grid grid-cols-2 gap-md">
        ${educationList}
      </div>
    </section>
  `
}

/**
 * Render the experience section
 * @returns {string} HTML string for the experience section
 */
const Experience = () => {
  const experienceItems = t('experience.items', { returnObjects: true })

  const experienceList = experienceItems.map(exp => `
    <article class="card">
      <div class="card-content">
        <h3 class="card-title">${exp.role}</h3>
        <p class="card-subtitle">${exp.company}</p>
        <p class="card-meta">${exp.dates}</p>
        <p class="card-description">${exp.description}</p>
      </div>
    </article>
  `).join('')

  return `
    <section id="experience" class="section container">
      <h2 class="section-title">${t('experience.title')}</h2>
      <div class="grid grid-cols-2 gap-md">
        ${experienceList}
      </div>
    </section>
  `
}


/* ========================================
   MODAL FUNCTIONS
   ======================================== */

/**
 * Render the PDF modal component
 * @returns {string} HTML string for the modal
 */
const Modal = () => {
  return `
    <div id="pdf-modal" class="modal" onclick="if(event.target === this) window.closeModal()">
      <div class="modal-content">
        <button class="close-btn" onclick="window.closeModal()">&times;</button>
        <iframe id="pdf-frame" src="" width="100%" height="100%"></iframe>
      </div>
    </div>
  `
}

/**
 * Open the PDF modal with the specified URL
 * @param {string} pdfUrl - URL of the PDF to display
 */
window.openModal = (pdfUrl) => {
  const modal = document.getElementById('pdf-modal')
  const frame = document.getElementById('pdf-frame')
  if (modal && frame) {
    frame.src = pdfUrl
    modal.classList.add('active')
    document.body.style.overflow = 'hidden'
  }
}

/**
 * Close the PDF modal
 */
window.closeModal = () => {
  const modal = document.getElementById('pdf-modal')
  const frame = document.getElementById('pdf-frame')
  if (modal && frame) {
    modal.classList.remove('active')
    frame.src = ''
    document.body.style.overflow = ''
  }
}

/**
 * Render the certifications section
 * @returns {string} HTML string for the certifications section
 */
const Certifications = () => {
  const certItems = t('certifications.items', { returnObjects: true })

  const certList = certItems.map(cert => `
    <div class="card cert-card">
      <h4 class="card-title">${cert.name}</h4>
      <p class="card-meta">${cert.issuer} • ${cert.year}</p>
      ${cert.pdf && cert.pdf !== '#' ? `<button onclick="window.openModal('${cert.pdf}')" class="btn btn-sm btn-outline cert-button">${t('certifications.viewCertificate')}</button>` : ''}
    </div>
  `).join('')

  return `
    <section id="certifications" class="section container">
      <h2 class="section-title">${t('certifications.title')}</h2>
      <div class="grid grid-cols-2 gap-sm">
        ${certList}
      </div>
    </section>
  `
}

/**
 * Render the projects section
 * @returns {string} HTML string for the projects section
 */
const Projects = () => {
  const projects = t('projects.items', { returnObjects: true })

  const projectCards = projects.map(project => `
    <article class="card">
      <div class="card-content">
        <h3 class="card-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="flex project-tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="flex items-center justify-between">
          <p class="project-dates">${project.dates}</p>
          ${project.link && project.link !== '#' ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="nav-link project-link">${t('projects.viewProject')} &rarr;</a>` : ''}
        </div>
      </div>
    </article>
  `).join('')

  return `
    <section id="projects" class="section container">
      <h2 class="section-title">${t('projects.title')}</h2>
      <div class="grid grid-cols-2 gap-md">
        ${projectCards}
      </div>
    </section>
  `
}

/**
 * Render the contact section with interactive form and social links
 * @returns {string} HTML string for the contact section
 */
const Contact = () => {
  const githubIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="40px" height="40px" fill="currentColor"><path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"/></svg>`

  const linkedinIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="40px" height="40px" fill="currentColor"><path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"/></svg>`

  const twitterIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="40px" height="40px" fill="currentColor"><path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"/></svg>`

  return `
    <section id="contact" class="section container contact-section">
      <h2 class="contact-title">${t('contact.title')}</h2>
      <p class="contact-description">
        ${t('contact.description')}
      </p>
      
      <!-- Contact Form -->
      <form id="contact-form" class="contact-form">
        <div class="form-group">
          <label for="contact-name" class="form-label">${t('contact.form.name')}</label>
          <input 
            type="text" 
            id="contact-name" 
            name="from_name" 
            class="form-input" 
            placeholder="${t('contact.form.namePlaceholder')}"
            autocomplete="off"
            required
          >
          <span class="form-error" id="name-error"></span>
        </div>
        
        <div class="form-group">
          <label for="contact-email" class="form-label">${t('contact.form.email')}</label>
          <input 
            type="email" 
            id="contact-email" 
            name="from_email" 
            class="form-input" 
            placeholder="${t('contact.form.emailPlaceholder')}"
            autocomplete="off"
            required
          >
          <span class="form-error" id="email-error"></span>
        </div>
        
        <div class="form-group">
          <label for="contact-message" class="form-label">${t('contact.form.message')}</label>
          <textarea 
            id="contact-message" 
            name="message" 
            class="form-textarea" 
            rows="5" 
            placeholder="${t('contact.form.messagePlaceholder')}"
            required
          ></textarea>
          <span class="form-error" id="message-error"></span>
        </div>
        
        <button type="submit" class="btn btn-primary form-button" id="submit-btn">
          ${t('contact.form.send')}
        </button>
        
        <div id="form-message" class="form-message"></div>
        <div class="recaptcha-notice">
  ${t('contact.form.recaptchaNotice')}
</div>
      </form>
      
      <!-- Social Links -->
      <div class="flex gap-md contact-social-links">
        <a href="${data.profile.social.github}" target="_blank" rel="noopener noreferrer" class="contact-social-icon" aria-label="GitHub profile">${githubIcon}</a>
        <a href="${data.profile.social.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-social-icon" aria-label="LinkedIn profile">${linkedinIcon}</a>
        <a href="${data.profile.social.twitter}" target="_blank" rel="noopener noreferrer" class="contact-social-icon" aria-label="Twitter profile">${twitterIcon}</a>
      </div>
    </section>
  `
}

/**
 * Render the footer component
 * @returns {string} HTML string for the footer
 */
const Footer = () => {
  return `
    <footer class="footer">
      <div class="container flex justify-between items-center">
        <span class="footer-content">${t('footer.copyright', { year: new Date().getFullYear(), name: data.profile.name })}</span>
      </div>
    </footer>
  `
}

/* ========================================
   APPLICATION LIFECYCLE
   ======================================== */

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

/* ========================================
   SCROLL SPY - ACTIVE NAVIGATION
   ======================================== */

/**
 * Setup scroll spy to highlight active navigation links
 * Uses Intersection Observer to detect which section is visible
 */
const setupScrollSpy = () => {
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]')
  const hero = document.querySelector('.hero')

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id')

        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'))

        // Only add active class if it's not the hero section
        if (sectionId && entry.target.classList.contains('hero') === false) {
          const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
          if (activeLink) {
            activeLink.classList.add('active')
          }
        }
      }
    })
  }, observerOptions)

  // Observe all sections including hero (to deactivate links when scrolling to hero)
  sections.forEach(section => observer.observe(section))
  if (hero) observer.observe(hero)
}

/**
 * Initialize the application
 * Sets up i18next, theme, and event listeners
 * @async
 */
const init = async () => {
  await initI18next()
  render()
  applyTheme(getSavedTheme())
  setupLanguageSelector()
  await setupContactForm() // ← Ahora es async
  setupScrollSpy() // ← Activar scroll spy

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getSavedTheme() === 'system') {
      applyTheme('system')
    }
  })
}

// Expose functions to window for onclick handlers
window.toggleTheme = toggleTheme

/**
 * Close the mobile menu
 * Unchecks the menu toggle checkbox
 */
window.closeMobileMenu = () => {
  const checkbox = document.querySelector('#menu-toggle')
  if (checkbox) {
    checkbox.checked = false
  }
}

// Start the app
init()
