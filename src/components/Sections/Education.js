import { t } from '../../services/i18n.js'

/**
 * Render the education section
 * @returns {string} HTML string for the education section
 */
export const Education = () => {
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
