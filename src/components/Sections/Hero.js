import { t } from '../../services/i18n.js'
import { data } from '../../data.js'

/**
 * Render the hero section
 * @returns {string} HTML string for the hero section
 */
export const Hero = () => {
    // Adobe Acrobat Reader PDF icon
    const pdfIcon = `<svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M23.63 15.3c-.71-.745-2.166-1.17-4.224-1.17-1.1 0-2.377.106-3.761.354a19.443 19.443 0 0 1-2.307-2.661c-.532-.71-.994-1.49-1.42-2.236.817-2.484 1.207-4.507 1.207-5.962 0-1.632-.603-3.336-2.342-3.336-.532 0-1.065.32-1.349.781-.78 1.384-.425 4.4.923 7.381a60.277 60.277 0 0 1-1.703 4.507c-.568 1.349-1.207 2.733-1.917 4.01C2.834 18.53.314 20.34.03 21.758c-.106.533.071 1.03.462 1.42.142.107.639.533 1.49.533 2.59 0 5.323-4.188 6.707-6.707 1.065-.355 2.13-.71 3.194-.994a34.963 34.963 0 0 1 3.407-.745c2.732 2.448 5.145 2.839 6.352 2.839 1.49 0 2.023-.604 2.2-1.1.32-.64.106-1.349-.213-1.704zm-1.42 1.03c-.107.532-.64.887-1.384.887-.213 0-.39-.036-.604-.071-1.348-.32-2.626-.994-3.903-2.059a17.717 17.717 0 0 1 2.98-.248c.746 0 1.385.035 1.81.142.497.106 1.278.426 1.1 1.348zm-7.524-1.668a38.01 38.01 0 0 0-2.945.674 39.68 39.68 0 0 0-2.52.745 40.05 40.05 0 0 0 1.207-2.555c.426-.994.78-2.023 1.136-2.981.354.603.745 1.207 1.135 1.739a50.127 50.127 0 0 0 1.987 2.378zM10.038 1.46a.768.768 0 0 1 .674-.425c.745 0 .887.851.887 1.526 0 1.135-.355 2.874-.958 4.861-1.03-2.768-1.1-5.074-.603-5.962zM6.134 17.997c-1.81 2.981-3.549 4.826-4.613 4.826a.872.872 0 0 1-.532-.177c-.213-.213-.32-.461-.249-.745.213-1.065 2.271-2.555 5.394-3.904Z"/></svg>`

    return `
    <section class="hero container animate-fade-in">
      <div class="hero-content">
        <span class="hero-role">${t('profile.role')}</span>
        <h1>${t('hero.greeting')} ${data.profile.name}.</h1>
 <p class="hero-bio">${t('profile.bio')}</p>
 <div class="hero-contact-info">
          <a href="https://www.google.com/maps/place/Bogot%C3%A1,+Bogota/data=!4m2!3m1!1s0x8e3f9bfd2da6cb29:0x239d635520a33914?sa=X&ved=1t:242&ictx=111" target="_blank" rel="noopener noreferrer" class="hero-contact-item hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 930 1280" fill="currentColor" class="hero-contact-icon location">
              <path d="M4335 12789 c-1496 -104 -2843 -915 -3635 -2190 -232 -373 -414 -787 -529 -1204 -305 -1107 -197 -2278 305 -3295 191 -387 372 -660 676 -1020 34 -41 753 -976 1596 -2077 918 -1199 1555 -2022 1588 -2052 186 -170 442 -170 628 0 33 30 670 853 1588 2052 843 1101 1562 2036 1596 2077 304 360 485 633 676 1020 566 1147 629 2502 174 3695 -353 923 -967 1689 -1798 2242 -825 549 -1864 821 -2865 752z m559 -2254 c224 -29 398 -81 601 -180 553 -268 931 -756 1062 -1374 25 -116 27 -145 28 -366 0 -267 -10 -345 -70 -555 -161 -561 -586 -1032 -1130 -1253 -201 -82 -365 -120 -592 -139 -294 -25 -593 23 -878 139 -544 221 -969 692 -1130 1253 -60 210 -70 288 -70 555 1 221 3 250 28 366 112 527 406 965 842 1252 177 116 437 227 637 271 209 46 467 58 672 31z" transform="scale(0.1 0.1)"/>
            </svg>
            ${data.profile.location}
          </a>

        </div>
        <div class="flex gap-sm hero-actions">
          <a href="#projects" class="btn btn-primary">${t('hero.viewWork')}</a>
          <a href="#contact" class="btn btn-outline">${t('hero.contactMe')}</a>
          <a href="/CV/Ing_Andres_Sanchez_CV.pdf" download class="btn btn-cv" aria-label="Download CV">
            ${pdfIcon}
            <span class="cv-text">${t('hero.downloadCV')}</span>
          </a>
        </div>
      </div>
    </section>
  `
}
