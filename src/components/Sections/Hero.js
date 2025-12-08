import { t } from '../../services/i18n.js'
import { data } from '../../data.js'
import { ICONS } from '../../utils/icons.js'

/**
 * Render the hero section
 * @returns {string} HTML string for the hero section
 */
export const Hero = () => {
  return `
    <section class="hero container animate-fade-in">
      <div class="hero-content">
        <span class="hero-role">${t('profile.role')}</span>
        <h1>${t('hero.greeting')} ${data.profile.name}.</h1>
        <p class="hero-bio">${t('profile.bio')}</p>
        
        <div class="hero-contact-info">
          <a href="https://www.google.com/maps/place/Bogot%C3%A1,+Bogota/data=!4m2!3m1!1s0x8e3f9bfd2da6cb29:0x239d635520a33914?sa=X&ved=1t:242&ictx=111" target="_blank" rel="noopener noreferrer" class="hero-contact-item hover:text-primary transition-colors">
            ${ICONS.LOCATION}
            ${data.profile.location}
          </a>
        </div>
        
        <div class="flex gap-sm hero-actions">
          <a href="#projects" class="btn btn-primary">${t('hero.viewWork')}</a>
          <a href="#contact" class="btn btn-outline">${t('hero.contactMe')}</a>
          <a href="/CV/Ing_Andres_Sanchez_CV.pdf" download class="btn btn-cv" aria-label="Download CV">
            ${ICONS.PDF}
            <span class="cv-text">${t('hero.downloadCV')}</span>
          </a>
        </div>
      </div>
    </section>
  `
}
