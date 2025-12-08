import { t } from '../../services/i18n.js'
import { data } from '../../data.js'
import { ICONS } from '../../utils/icons.js'

/**
 * Render the contact section with interactive form and social links
 * @returns {string} HTML string for the contact section
 */
export const Contact = () => {
  return `
    <section id="contact" class="section container contact-section">
      <h2 class="contact-title">${t('contact.title')}</h2>
      <p class="contact-description">
        ${t('contact.description')}
      </p>
      
      <!-- Contact Form -->
      <form id="contact-form" class="contact-form">
        <div class="form-group">
          <label for="contact-name" class="form-label">${t('contact.form.name')}</label>
          <input 
            type="text" 
            id="contact-name" 
            name="from_name" 
            class="form-input" 
            placeholder="${t('contact.form.namePlaceholder')}"
            autocomplete="off"
            required
          >
          <span class="form-error" id="name-error"></span>
        </div>
        
        <div class="form-group">
          <label for="contact-email" class="form-label">${t('contact.form.email')}</label>
          <input 
            type="email" 
            id="contact-email" 
            name="from_email" 
            class="form-input" 
            placeholder="${t('contact.form.emailPlaceholder')}"
            autocomplete="off"
            required
          >
          <span class="form-error" id="email-error"></span>
        </div>
        
        <div class="form-group">
          <label for="contact-message" class="form-label">${t('contact.form.message')}</label>
          <textarea 
            id="contact-message" 
            name="message" 
            class="form-textarea" 
            rows="5" 
            placeholder="${t('contact.form.messagePlaceholder')}"
            required
          ></textarea>
          <span class="form-error" id="message-error"></span>
        </div>
        
        <button type="submit" class="btn btn-primary form-button" id="submit-btn">
          ${t('contact.form.send')}
        </button>
        
        <div id="form-message" class="form-message"></div>
        <div class="recaptcha-notice">
  ${t('contact.form.recaptchaNotice')}
</div>
      </form>
      
      <!-- Social Links -->
      <div class="flex gap-md contact-social-links">
        <a href="${data.profile.social.github}" target="_blank" rel="noopener noreferrer" class="contact-social-icon" aria-label="GitHub profile">${ICONS.GITHUB}</a>
        <a href="${data.profile.social.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-social-icon" aria-label="LinkedIn profile">${ICONS.LINKEDIN}</a>      </div>
    </section>
  `
}
