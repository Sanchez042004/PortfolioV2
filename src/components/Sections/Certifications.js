import { t } from '../../services/i18n.js'
import { ICONS } from '../../utils/icons.js'

/**
 * Render the certifications section
 * @returns {string} HTML string for the certifications section
 */
export const Certifications = () => {
  const certItems = t('certifications.items', { returnObjects: true })

  const certList = certItems.map(cert => `
    <div class="cert-card">
      ${cert.image ? `<div class="cert-bg-image" style="background-image: url('${cert.image}')"></div>` : ''}
      <div class="cert-content relative z-10 h-full flex flex-col">
        <div class="cert-header">
          <div class="cert-icon-wrapper">
            ${ICONS.CERTIFICATE}
          </div>
          <span class="cert-year-badge">${cert.year}</span>
        </div>
        
        <div class="cert-body">
          <h4 class="cert-title">${cert.name}</h4>
          <p class="cert-issuer">${cert.issuer}</p>
        </div>

        ${cert.pdf && cert.pdf !== '#' ? `
        <div class="cert-footer">
          <button class="cert-link" onclick="window.openModal('${cert.pdf}'); event.stopPropagation()">
            ${t('certifications.viewCertificate')}
            ${ICONS.EXTERNAL_LINK}
          </button>
        </div>
        ` : ''}
      </div>
    </div>
  `).join('')

  return `
    <section id="certifications" class="section container">
      <h2 class="section-title">${t('certifications.title')}</h2>
      <div class="grid grid-cols-2 gap-sm">
        ${certList}
      </div>
    </section>
  `
}
