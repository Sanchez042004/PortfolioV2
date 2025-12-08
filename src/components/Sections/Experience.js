import { t } from '../../services/i18n.js'
import { ICONS } from '../../utils/icons.js'

export const Experience = () => {
  const experienceItems = t('experience.items', { returnObjects: true })

  return `
    <section id="experience" class="section container">
      <h2 class="section-title">${t('experience.title')}</h2>
      <ol class="timeline">
        ${experienceItems.map((exp) => `
          <li class="timeline-item">
            <span class="timeline-icon">
                ${ICONS.CALENDAR}
            </span>
            <time class="timeline-date-badge">${exp.dates}</time>
            <div class="timeline-header">
                <h3 class="timeline-title">${exp.role}</h3>
                <span class="timeline-company">
                     ${exp.link && exp.link !== '#' ? `<a href="${exp.link}" target="_blank" rel="noopener noreferrer" class="company-link">${exp.company}</a>` : exp.company}
                </span>
            </div>
            <p class="timeline-description">${exp.description}</p>
          </li>
        `).join('')}
      </ol>
    </section>
  `
}
