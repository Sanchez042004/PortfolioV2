import { t } from '../../services/i18n.js'
import { ICONS } from '../../utils/icons.js'

export const EducationAndCertifications = () => {
    const educationItems = t('education.items', { returnObjects: true })
    const certItems = t('certifications.items', { returnObjects: true })

    // Helper function to get the right icon for each certification
    const getCertIcon = (certName) => {
        const name = certName.toLowerCase()
        if (name.includes('cisco') || name.includes('data analytics')) return ICONS.CISCO
        if (name.includes('ef set') || name.includes('english')) return ICONS.EFSET
        if (name.includes('power bi') || name.includes('powerbi')) return ICONS.POWERBI
        if (name.includes('web') || name.includes('desarrollo')) return ICONS.WEBDEV
        return ICONS.CERTIFICATE
    }

    // --- Education Part (Left Side - Timeline Style) ---
    const educationList = educationItems.map((edu) => `
        <li class="timeline-item">
            <span class="timeline-icon">
                ${ICONS.CALENDAR}
            </span>
            <time class="timeline-date-badge">${edu.dates}</time>
            <h3 class="timeline-title">${edu.school}</h3>
            <p class="timeline-description" style="margin-bottom: 0.5rem; font-weight: 500; color: var(--color-primary);">${edu.degree}</p>
        </li>
      `).join('')

    // Helper function to get icon class name
    const getIconClass = (certName) => {
        const name = certName.toLowerCase()
        if (name.includes('cisco') || name.includes('data analytics')) return 'cisco-icon'
        return ''
    }

    // --- Certifications Part (Right Side) ---
    const certList = certItems.map(cert => `
    <div class="cert-item-compact">
        <div class="cert-icon-compact ${getIconClass(cert.name)}">
             ${getCertIcon(cert.name)}
        </div>
        <div class="cert-info-compact">
            <h4 class="cert-title-compact">${cert.name}</h4>
            <div class="cert-meta-compact">
                <span class="cert-issuer-compact">${cert.issuer}</span>
                <span class="cert-year-compact">• ${cert.year}</span>
            </div>
        </div>
        ${cert.pdf && cert.pdf !== '#' ? `
            <button class="cert-link-compact" onclick="window.openModal('${cert.pdf}'); event.stopPropagation()" aria-label="${t('certifications.viewCertificate')}">
                ${ICONS.EXTERNAL_LINK}
            </button>
        ` : ''}
    </div>
  `).join('')

    return `
    <section id="education" class="section container">
       <h2 class="section-title">${t('education_certifications.title')}</h2>
       
       <div class="edu-cert-grid">
          <div class="edu-column">
             <ol class="timeline" style="margin-top: 0;">
                ${educationList}
             </ol>
          </div>

          <div class="cert-column">
             <div class="cert-list-compact">
                ${certList}
             </div>
          </div>
       </div>
    </section>
  `
}
