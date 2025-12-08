import { t } from '../../services/i18n.js'
import { ICONS } from '../../utils/icons.js'

/**
 * Render the education section
 * @returns {string} HTML string for the education section
 */
export const Education = () => {
  const educationItems = t('education.items', { returnObjects: true })

  return `
    <section id="education" class="section container">
      <h2 class="section-title">${t('education.title')}</h2>
      <ol class="timeline">
        ${educationItems.map((edu) => `
          <li class="timeline-item">
            <span class="timeline-icon">
                ${ICONS.CALENDAR}
            </span>
            <time class="timeline-date-badge">${edu.dates}</time>
            <h3 class="timeline-title">${edu.school}</h3>
            <p class="timeline-description" style="margin-bottom: 0.5rem; font-weight: 500; color: var(--color-primary);">${edu.degree}</p>
          </li>
        `).join('')}
      </ol>
    </section>
  `
}
