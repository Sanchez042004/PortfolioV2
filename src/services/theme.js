import { t } from './i18n.js'
import { ICONS } from '../utils/icons.js'

/**
 * Get the system's preferred color scheme
 * @returns {string} 'dark' or 'light'
 */
export const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

/**
 * Get the saved theme preference from localStorage
 * @returns {string} Theme preference ('light', 'dark', or 'system')
 */
export const getSavedTheme = () => {
    const saved = localStorage.getItem('theme')
    return saved ? saved : 'system'
}

/**
 * Apply the selected theme to the document
 * Updates theme icons and document attributes
 * @param {string} theme - Theme to apply ('light', 'dark', or 'system')
 */
export const applyTheme = (theme) => {
    const effectiveTheme = theme === 'system' ? getSystemTheme() : theme
    document.documentElement.setAttribute('data-theme', effectiveTheme)

    // Update icon
    // Since we are vanilla JS, we manually update viewBox and innerHTML
    // to switch between Sun (24x24) and Moon/System (640x640) icons.
    let iconContent = ''
    let viewBox = '0 0 24 24'

    if (theme === 'light') {
        viewBox = '0 0 24 24'
        iconContent = ICONS.THEME_LIGHT
    } else if (theme === 'dark') {
        viewBox = '0 0 640 640'
        iconContent = ICONS.THEME_DARK
    } else {
        viewBox = '0 0 640 640'
        iconContent = ICONS.THEME_SYSTEM
    }

    // Update theme buttons (desktop and mobile)
    const themeButtons = document.querySelectorAll('#theme-toggle-btn, #mobile-theme-toggle-btn')
    themeButtons.forEach(btn => {
        const svg = btn.querySelector('svg')
        if (svg) {
            svg.setAttribute('viewBox', viewBox)
            svg.innerHTML = iconContent
        }
    })

    // Trigger animation (only once, not per icon)
    const icons = document.querySelectorAll('.theme-icon')
    if (icons.length > 0) {
        // Remove any existing animation
        icons.forEach(icon => {
            icon.style.transition = 'none'
            icon.style.transform = 'rotate(0deg)'
        })



        // Trigger reflow to restart animation
        // This 'void' access forces the browser to calculate layout,
        // effectively resetting the CSS transition state.
        void icons[0].offsetWidth

        // Apply animation
        icons.forEach(icon => {
            icon.style.transition = 'transform 0.3s ease-in-out'
            icon.style.transform = 'rotate(360deg)'
        })

        // Reset after animation
        setTimeout(() => {
            icons.forEach(icon => {
                icon.style.transition = 'none'
                icon.style.transform = 'rotate(0deg)'
            })
        }, 500)
    }
}

/**
 * Toggle between light, dark, and system themes
 * Cycles through: light → dark → system → light
 */
export const toggleTheme = () => {
    const current = getSavedTheme()
    const next = current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light'

    localStorage.setItem('theme', next)
    applyTheme(next)
    // showToast(t(`themes.${next}`))
}
