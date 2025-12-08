import { t } from '../../services/i18n.js'
import { data } from '../../data.js'
import { ICONS } from '../../utils/icons.js'

/**
 * Render the about section with skills
 * @returns {string} HTML string for the about section
 */
export const About = () => {
  const skills = data.skills.map(skill => {
    // Convert skill name to uppercase constant format (e.g. "Business Intelligence" -> "BUSINESS_INTELLIGENCE")
    const iconKey = skill.toUpperCase().replace(/ /g, '_')
    const icon = ICONS[iconKey] || ICONS.DEFAULT
    return `
        <div class="skill-item" aria-label="${skill}">
            <div class="skill-icon">${icon}</div>
            <span class="skill-name">${skill}</span>
        </div>
        `
  }).join('')

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
