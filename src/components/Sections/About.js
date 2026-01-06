import { t } from '../../services/i18n.js'
import { data } from '../../data.js'
import { ICONS } from '../../utils/icons.js'

/**
 * Render the about section with skills
 * @returns {string} HTML string for the about section
 */
// About Component (System Info)
export const About = () => {

    const renderSkillGroup = (skillsList) => {
        return skillsList.map(skill => {
            const iconKey = skill.toUpperCase().replace(/ /g, '_')
            const icon = ICONS[iconKey] || ICONS.DEFAULT
            return `
            <div class="skill-module" title="${skill}">
                <span class="skill-icon">${icon}</span>
                <span class="skill-name">${skill}</span>
            </div>
        `
        }).join('')
    }

    const backendSkills = renderSkillGroup(data.skills.backend_data || [])
    const frontendSkills = renderSkillGroup(data.skills.frontend_tools || [])

    return `
    <section id="profile" class="section container about-section">
      <h2 class="terminal-section-title"><span>></span> <span class="section-title-text" data-i18n="about.title">${t('about.title')}</span></h2>
      <div class="terminal-window about-terminal">
        <!-- Terminal Header -->
        <div class="terminal-header">
            <div class="terminal-controls-group">
                <div class="window-controls">
                    <div class="control-dot dot-red"></div>
                    <div class="control-dot dot-yellow"></div>
                    <div class="control-dot dot-green"></div>
                </div>
                <span class="terminal-title" data-i18n="terminal.about_path">${t('terminal.about_path')}</span>
            </div>
            <div class="terminal-shell">zsh</div>
        </div>

        <!-- Terminal Body -->
        <div class="about-grid">
            <!-- Col 1: Description -->
            <div class="about-col-text">
                <div class="command-line mb-4">
                    <span class="prompt-user" data-i18n="terminal.user_sys">${t('terminal.user_sys')}</span>:<span class="prompt-path">~</span>$ <span data-i18n="terminal.about_cat">${t('terminal.about_cat')}</span><span class="typing-cursor"></span>
                </div>
                <div class="text-content">
                    <p data-i18n="about.description">${t('about.description')}</p>
                </div>
            </div>

            <!-- Col 2: Skills -->
            <div class="about-col-skills">
                <!-- Group 1: Backend/Data -->
                <div class="command-line mb-4">
                    <span class="prompt-user" data-i18n="terminal.user_sys">${t('terminal.user_sys')}</span>:<span class="prompt-path">~</span>$ <span data-i18n="terminal.about_list_backend">${t('terminal.about_list_backend')}</span>
                </div>
                <div class="skills-wrapper mb-8">
                    ${backendSkills}
                </div>

                <!-- Group 2: Frontend/Tools -->
                 <div class="command-line mb-4" style="margin-top: 2rem;">
                    <span class="prompt-user" data-i18n="terminal.user_sys">${t('terminal.user_sys')}</span>:<span class="prompt-path">~</span>$ <span data-i18n="terminal.about_list_frontend">${t('terminal.about_list_frontend')}</span>
                </div>
                <div class="skills-wrapper">
                    ${frontendSkills}
                </div>
            </div>
        </div>
      </div>
    </section>
  `
}
