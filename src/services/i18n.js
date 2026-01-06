import i18next from 'i18next'
import esTranslations from '../locales/es.json' with { type: 'json' }
import enTranslations from '../locales/en.json' with { type: 'json' }
import ptTranslations from '../locales/pt.json' with { type: 'json' }
import { EVENTS, dispatchEvent } from '../core/events.js'

/**
 * Initialize i18next library with language resources
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
 * Change the application language
 * @param {string} lang - Language code (es, en, or pt)
 */
export const changeLanguage = (lang) => {
    i18next.changeLanguage(lang)
    localStorage.setItem('language', lang)

    // Notify the rest of the app that language changed
    // This triggers a re-render in main.js to update the UI
    dispatchEvent(EVENTS.LANGUAGE_CHANGED, { language: lang })
}

/**
 * Translation helper function
 * @param {string} key - Translation key
 * @param {Object} options - i18next options
 * @returns {string} Translated string
 */
export const t = (key, options) => i18next.t(key, options)
