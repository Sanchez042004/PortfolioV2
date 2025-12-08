import i18next from 'i18next'
import esTranslations from '../locales/es.json' with { type: 'json' }
import enTranslations from '../locales/en.json' with { type: 'json' }
import ptTranslations from '../locales/pt.json' with { type: 'json' }

/**
 * Initialize i18next library with language resources
 * @async
 * @returns {Promise<void>}
 */
export const initI18next = async () => {
    if (!i18next.isInitialized) {
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
}

/**
 * Get the saved language from localStorage
 * @returns {string} Language code (es, en, or pt)
 */
export const getSavedLanguage = () => localStorage.getItem('language') || 'es'

/**
 * Change the application language
 * @param {string} lang - Language code (es, en, or pt)
 * @param {Function} onLanguageChanged - Callback to execute after language change (usually render)
 */
export const changeLanguage = (lang, onLanguageChanged) => {
    i18next.changeLanguage(lang)
    localStorage.setItem('language', lang)
    if (onLanguageChanged) onLanguageChanged()
}

/**
 * Translation helper function
 * @param {string} key - Translation key
 * @param {Object} options - i18next options
 * @returns {string} Translated string
 */
export const t = (key, options) => i18next.t(key, options)
