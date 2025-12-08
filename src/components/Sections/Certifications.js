import { t } from '../../services/i18n.js'

/**
 * Render the certifications section
 * @returns {string} HTML string for the certifications section
 */
export const Certifications = () => {
    const certItems = t('certifications.items', { returnObjects: true })

    const certList = certItems.map(cert => `
    <div class="card cert-card">
      <h4 class="card-title">${cert.name}</h4>
      <p class="card-meta">${cert.issuer} • ${cert.year}</p>
      ${cert.pdf && cert.pdf !== '#' ? `<button onclick="window.openModal('${cert.pdf}')" class="btn btn-sm btn-outline cert-button">${t('certifications.viewCertificate')}</button>` : ''}
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
