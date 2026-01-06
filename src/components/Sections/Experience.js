import { t } from '../../services/i18n.js'
import { ICONS } from '../../utils/icons.js'

export const Experience = () => {
  const experienceItems = t('experience.items', { returnObjects: true })

  return `
    <section id="experience" class="section container">
      <h2 class="terminal-section-title"><span>></span> ${t('experience.title')}</h2>
      <div class="terminal-window experience-terminal">
        <!-- Header -->
        <div class="terminal-header">
          <div class="flex items-center gap-2" style="display: flex; align-items: center; gap: 0.5rem;">
            <div class="terminal-controls">
              <div class="terminal-dot red"></div>
              <div class="terminal-dot yellow"></div>
              <div class="terminal-dot green"></div>
            </div>
            <span class="terminal-title">
              ${t('terminal.exp_path')}
            </span>
          </div>
          <span class="terminal-subtitle">zsh</span>
        </div>

        <!-- Body -->
        <div class="terminal-body">
          <!-- Background grid -->
          <div class="terminal-grid"></div>

          <div class="command-line mb-4" style="padding-top: 0.5rem;">
             <span class="prompt-user" style="color: #22c55e;">${t('terminal.user_sys')}:</span><span class="prompt-path" style="color: #3b82f6;">~</span>$ ${t('terminal.exp_cat')}<span class="typing-cursor"></span>
          </div>

          <div class="experience-list">
            ${experienceItems.map((exp) => `
              <div class="experience-item">
                <div class="experience-card">
                  <!-- Header: Role and Date -->
                  <div class="experience-header-row">
                    <h3 class="experience-role">
                      ${exp.role}
                    </h3>
                    <span class="experience-date-badge">
                      ${exp.dates}
                    </span>
                  </div>

                  <!-- Company -->
                  <p class="experience-company">
                    @ ${exp.company}
                    ${exp.link && exp.link !== '#' ? ` · <a href="${exp.link}" target="_blank" rel="noopener noreferrer" class="company-link" style="color: inherit; text-decoration: underline;"> Link</a>` : ''}
                  </p>

                  <!-- Details Box -->
                  <div class="experience-details-box">
                    <ul class="experience-description">
                        ${Array.isArray(exp.description)
      ? exp.description.map(desc => `<li>${desc}</li>`).join('')
      : `<li>${exp.description}</li>`
    }
                    </ul>

                    ${exp.tags ? `
                        <div class="experience-tags">
                        ${exp.tags.map(tag => `
                            <span class="experience-tag">
                            ${tag}
                            </span>
                        `).join('')}
                        </div>
                    ` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `
}
