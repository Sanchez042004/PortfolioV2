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
      <h2 class="terminal-section-title"><span>></span> <span class="section-title-text" data-i18n="contact.title">${t('contact.title')}</span></h2>
      
      <div class="terminal-window">
        <!-- Terminal Header -->
        <div class="terminal-header">
            <div class="terminal-controls-group">
                <div class="window-controls">
                    <div class="control-dot dot-red"></div>
                    <div class="control-dot dot-yellow"></div>
                    <div class="control-dot dot-green"></div>
                </div>
                <span class="terminal-title" data-i18n="terminal.contact_path">${t('terminal.contact_path')}</span>
            </div>
            <div class="terminal-shell">sh</div>
        </div>

        <div class="terminal-body contact-terminal-body">
            <div class="contact-grid">
                <!-- Left Column: Info & Social -->
                <div class="contact-info-column">
                    <h3 class="contact-branding" data-i18n="terminal.contact_branding">${t('terminal.contact_branding')}</h3>
                    <p class="contact-subtitle" data-i18n="contact.description">${t('contact.description')}</p>
                    
                    <div class="contact-methods">
                        <div class="contact-method-item">
                            <div class="contact-icon-wrapper">
                                ${ICONS.EMAIL}
                            </div>
                            <span class="contact-method-text">${data.profile.social.email.replace('mailto:', '')}</span>
                        </div>
                        <div class="contact-method-item">
                            <div class="contact-icon-wrapper">
                                ${ICONS.LOCATION}
                            </div>
                            <span class="contact-method-text">${data.profile.location}</span>
                        </div>
                    </div>

                    <div class="contact-social-boxes">
                        <a href="${data.profile.social.github}" target="_blank" rel="noopener noreferrer" class="contact-social-box" aria-label="GitHub">
                            ${ICONS.GITHUB}
                        </a>
                        <a href="${data.profile.social.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-social-box" aria-label="LinkedIn">
                            ${ICONS.LINKEDIN}
                        </a>
                        <a href="${data.profile.social.email}" class="contact-social-box" aria-label="Email">
                            ${ICONS.EMAIL}
                        </a>
                    </div>
                </div>

                <!-- Right Column: Form -->
                <div class="contact-form-column">
                    <form id="contact-form" class="terminal-contact-form">
                        <div class="form-row">
                            <div class="contact-form-group">
                                <label for="contact-name" class="contact-terminal-label">> <span data-i18n="contact.form.name">${t('contact.form.name')}</span></label>
                                <input 
                                    type="text" 
                                    id="contact-name" 
                                    name="from_name" 
                                    class="contact-terminal-input" 
                                    placeholder="${t('contact.form.namePlaceholder')}"
                                    data-i18n-attr="placeholder"
                                    data-i18n="contact.form.namePlaceholder"
                                    autocomplete="off"
                                    required
                                >
                                <span class="form-error" id="name-error"></span>
                            </div>
                            
                            <div class="contact-form-group">
                                <label for="contact-email" class="contact-terminal-label">> <span data-i18n="contact.form.email">${t('contact.form.email')}</span></label>
                                <input 
                                    type="email" 
                                    id="contact-email" 
                                    name="from_email" 
                                    class="contact-terminal-input" 
                                    placeholder="${t('contact.form.emailPlaceholder')}"
                                    data-i18n-attr="placeholder"
                                    data-i18n="contact.form.emailPlaceholder"
                                    autocomplete="off"
                                    required
                                >
                                <span class="form-error" id="email-error"></span>
                            </div>
                        </div>
                        
                        <div class="contact-form-group">
                            <label for="contact-message" class="contact-terminal-label">> <span data-i18n="contact.form.message">${t('contact.form.message')}</span></label>
                            <textarea 
                                id="contact-message" 
                                name="message" 
                                class="contact-terminal-textarea" 
                                rows="3" 
                                placeholder="${t('contact.form.messagePlaceholder')}"
                                data-i18n-attr="placeholder"
                                data-i18n="contact.form.messagePlaceholder"
                                required
                            ></textarea>
                            <span class="form-error" id="message-error"></span>
                        </div>
                        
                        <button type="submit" class="contact-terminal-submit" id="submit-btn">
                            <span data-i18n="contact.form.send">${t('contact.form.send')}</span>
                        </button>
                        
                        <div id="form-message" class="form-message"></div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </section>
  `
}
