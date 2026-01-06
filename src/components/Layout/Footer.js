import { t } from '../../services/i18n.js'
import { data } from '../../data.js'

/**
 * Render the footer component
 * @returns {string} HTML string for the footer
 */
export const Footer = () => {
  return `
    <footer class="footer">
      <div class="container flex justify-center items-center">
        <span class="footer-content">${t('footer.copyright', { year: new Date().getFullYear(), name: data.profile.name.replace(/_/g, ' ') })}</span>
      </div>
    </footer>
  `
}
