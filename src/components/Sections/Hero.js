import { t } from '../../services/i18n.js'
import { data } from '../../data.js'
import { ICONS } from '../../utils/icons.js'

/**
 * Render the hero section
 * @returns {string} HTML string for the hero section
 */
export const Hero = () => {
    return `
    <section class="hero container" id="home">
      <div class="terminal-window hero-terminal-window">
        <!-- Header -->
        <div class="terminal-header">
            <div class="terminal-controls-group">
                <div class="window-controls">
                    <div class="control-dot dot-red"></div>
                    <div class="control-dot dot-yellow"></div>
                    <div class="control-dot dot-green"></div>
                </div>
                <span class="terminal-title" data-i18n="terminal.hero_path">${t('terminal.hero_path')}</span>
            </div>
            <div class="terminal-shell">bash</div>
        </div>

        <div class="hero-grid">
             <!-- Background Pattern -->
            <div class="hero-bg-pattern"></div>

            <!-- Avatar Column -->
                <div class="hero-profile-col">
                     <div class="profile-glow-container">
                        <div class="profile-glow"></div>
                        <div class="profile-image-wrapper">
                            <img 
                                src="${data.profile.avatar}" 
                                alt="${data.profile.name}" 
                                class="profile-image" 
                                width="192" 
                                height="192"
                                fetchpriority="high"
                                decoding="sync"
                            >
                        </div>
                         <div class="status-indicator-wrapper">
                            <span class="status-ping"></span>
                            <span class="status-indicator"></span>
                        </div>
                    </div>

                     <div class="status-pill">
                        <span class="status-dot"></span>
                        <span class="status-text" data-i18n="profile.status">${t('profile.status') || 'AVAILABLE FOR HIRE'}</span>
                    </div>
                </div>

                <!-- Text Column -->
                <div class="hero-content-col">
                    <div>
                        <p class="typing-line typing-cursor" data-i18n="hero.greeting">&gt; ${t('hero.greeting')}</p>
                        <h1 class="hero-title">
                            ${data.profile.name.toUpperCase()}
                            <span class="visually-hidden"> - Junior Software Engineer</span>
                        </h1>
                         <h2 class="hero-subtitle" data-i18n="profile.role">${t('profile.role')}</h2>
                    </div>

                    <!-- Bio Code Block -->
                <div class="bio-code-block">
                    <span class="token-keyword">const</span> <span class="token-property">profile</span> = {<br/>
                    <div style="padding-left: 1rem;">
                        <span class="token-obj-key">stack:</span> [<span class="token-string">"Java"</span>, <span class="token-string">"SQL"</span>, <span class="token-string">"Python"</span>],<br/>
                        <span class="token-obj-key">data_tools:</span> [<span class="token-string">"BigQuery"</span>, <span class="token-string">"Looker"</span>],<br/>
                        <span class="token-obj-key">focus:</span> <span class="token-string" data-i18n="profile.focus">"${t('profile.focus')}"</span>,<br/>
                        <span class="token-obj-key">methods:</span> [<span class="token-string" data-i18n="profile.methods">"${t('profile.methods')}"</span>, <span class="token-string">"Git"</span>]<br/>
                    </div>
                    };
                </div>

                    <!-- Actions -->
                    <div class="hero-actions">
                         <a href="#projects" class="btn btn-primary group">
                            ${ICONS.ROCKET}
                            <span data-i18n="hero.viewWork">${t('hero.viewWork')}</span>
                            <span class="btn-arrow">-&gt;</span>
                        </a>

                        <a href="${data.profile.cv}" class="btn btn-outline" download target="_blank" rel="noopener noreferrer">
                            ${ICONS.DOWNLOAD}
                            <span data-i18n="hero.downloadCV">${t('hero.downloadCV')}</span>
                        </a>

                        <a href="#contact" class="btn btn-ghost">
                            ${ICONS.MAIL}
                            <span data-i18n="hero.contactMe">${t('hero.contactMe')}</span>
                        </a>
                    </div>
                </div>
        </div>

      </div>
      
      <a href="#profile" class="scroll-indicator">
        <span class="scroll-text" data-i18n="terminal.hero_scroll">${t('terminal.hero_scroll')}</span>
        <div class="animate-bounce">
            ${ICONS.CHEVRON_DOWN}
        </div>
      </a>
    </section>
    `
}
