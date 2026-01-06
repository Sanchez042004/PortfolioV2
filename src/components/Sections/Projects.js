import { t } from '../../services/i18n.js'
import { ICONS } from '../../utils/icons.js'

/**
 * Render the projects section
 * @returns {string} HTML string for the projects section
 */
export const Projects = () => {
  const projects = t('projects.items', { returnObjects: true })

  const projectCards = projects.map(project => `
    <article class="project-card-v2">
      <img 
        src="${project.image || '/projects/default.png'}" 
        alt="${project.title}" 
        class="project-card-image-v2"
        style="${project.imageStyle || ''}"
        loading="lazy"
        onerror="this.src='https://placehold.co/600x400/1e293b/ffffff?text=Project'"
      >
      <div class="project-card-content-v2">
        <div class="project-card-header-v2">
          <h3 class="project-card-title-v2">${project.title}</h3>
        </div>
        
        <p class="project-description-v2">${project.description}</p>
        
        <hr class="project-separator-v2">
        
        <div class="project-tags-v2">
          ${project.tags.map(tag => `<span class="project-tag-v2">${tag}</span>`).join('')}
        </div>

        <div class="project-links-v2">
          ${project.link && project.link !== '#' ? `
            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link-v2" title="${t('projects.viewCode')}">
              ${ICONS.GITHUB}
            </a>
          ` : ''}
          
          ${project.deploy && project.deploy !== '#' ? `
            <a href="${project.deploy}" target="_blank" rel="noopener noreferrer" class="project-link-v2" title="Demo">
              ${ICONS.EXTERNAL_LINK}
            </a>
          ` : ''}
        </div>
      </div>
    </article>
  `).join('')

  return `
    <section id="projects" class="section container">
      <h2 class="terminal-section-title"><span>></span> ${t('projects.title')}</h2>
      <div class="project-grid-v2">
        ${projectCards}
      </div>
    </section>
  `
}
