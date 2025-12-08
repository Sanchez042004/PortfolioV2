import { t } from '../../services/i18n.js'

export const Experience = () => {
    const experienceItems = t('experience.items', { returnObjects: true })

    const experienceList = experienceItems.map(exp => `
    <article class="card">
      <div class="card-content">
        <h3 class="card-title">${exp.role}</h3>
        <p class="card-subtitle">
          ${exp.link && exp.link !== '#'
            ? `<a href="${exp.link}" target="_blank" rel="noopener noreferrer" class="company-link">${exp.company}</a>`
            : exp.company}
        </p>
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
