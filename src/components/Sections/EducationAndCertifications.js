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

  // Helper function to get icon class name
  const getIconClass = (certName) => {
    const name = certName.toLowerCase()
    if (name.includes('cisco') || name.includes('data analytics')) return 'cisco-icon'
    return ''
  }

  return `
    <section id="education" class="section container">
      <h2 class="terminal-section-title"><span>></span> ${t('education_certifications.title')}</h2>
      <div class="terminal-window">
        <!-- Header -->
        <div class="terminal-header">
          <div class="flex items-center gap-2" style="display: flex; align-items: center; gap: 0.5rem;">
            <div class="terminal-controls">
              <div class="terminal-dot red"></div>
              <div class="terminal-dot yellow"></div>
              <div class="terminal-dot green"></div>
            </div>
            <span class="terminal-title">
              ${t('terminal.edu_path')}
            </span>
          </div>
          <span class="terminal-subtitle">zsh</span>
        </div>

        <!-- Body -->
        <div class="terminal-body">
          <!-- Background grid -->
          <div class="terminal-grid"></div>

          <div class="command-line mb-4" style="padding-top: 0.5rem;">
             <span class="prompt-user">${t('terminal.user_sys')}:</span><span class="prompt-path">~</span>$ ${t('terminal.edu_cat')}<span class="typing-cursor"></span>
          </div>

          <!-- Two Column Layout -->
          <div class="edu-cert-container">
            
            <!-- Left Column: Education History -->
            <div class="edu-history-column">
              <h3 class="edu-cert-section-title">
                <span class="edu-title-icon token-keyword">${ICONS.EDUCATION}</span> ${t('education.sectionTitle')}
              </h3>
              
              <div class="edu-timeline">
                ${educationItems.map((edu, index) => `
                  <div class="edu-timeline-item">
                    <div class="edu-timeline-marker ${index === 0 ? 'active' : ''}"></div>
                    <div class="edu-timeline-content">
                      <div class="edu-dates-badge">${edu.dates}</div>
                      <h4 class="edu-degree">${edu.degree}</h4>
                      <p class="edu-school">${edu.school}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Right Column: Active Certifications -->
            <div class="cert-history-column">
              <h3 class="edu-cert-section-title">
                <span class="cert-title-icon" style="color: #22c55e;">${ICONS.CHECK}</span> ${t('certifications.sectionTitle')}
              </h3>
              
              <div class="cert-grid-2col">
                ${certItems.map(cert => `
                  <div class="cert-card-compact">
                    <div class="cert-card-header">
                      <div class="cert-icon-wrapper ${getIconClass(cert.name)}">
                        ${getCertIcon(cert.name)}
                      </div>
                      <span class="cert-year-badge">${cert.year}</span>
                    </div>
                    
                    <div class="cert-card-body">
                      <h4 class="cert-card-title">${cert.name}</h4>
                      <p class="cert-card-issuer">${cert.issuer}</p>
                    </div>

                    ${cert.pdf && cert.pdf !== '#' ? `
                      <button class="cert-view-btn" data-action="open-modal" data-url="${cert.pdf}" aria-label="${t('certifications.viewCertificate')}">
                        ${ICONS.EXTERNAL_LINK}
                      </button>
                    ` : ''}
                  </div>
                `).join('')}
              </div>

              <!-- Skills Code Section -->
              <div class="skills-code-section">
                <pre class="skills-code"><span class="token-keyword">const</span> <span class="token-property">userSkills</span> <span class="token-operator">=</span> <span class="token-bracket">{</span>
  <span class="token-string">"${t('skills.technical')}"</span><span class="token-operator">:</span> [${t('skills.technical_list', { returnObjects: true }).map(s => `<span class="token-string">"${s}"</span>`).join(', ')}],
  <span class="token-string">"${t('skills.soft_skills')}"</span><span class="token-operator">:</span> [${t('skills.soft_skills_list', { returnObjects: true }).map(s => `<span class="token-string">"${s}"</span>`).join(', ')}],
  <span class="token-string">"${t('skills.focus')}"</span><span class="token-operator">:</span> <span class="token-string">"${t('skills.focus_value')}"</span>
<span class="token-bracket">}</span>;</pre>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  `
}
