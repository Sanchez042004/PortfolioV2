/**
 * Setup scroll spy to highlight active navigation links
 * Uses Intersection Observer to detect which section is visible
 */
export const setupScrollSpy = () => {
    // Wait for DOM to be populated? Usually called after render.
    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]')
    const hero = document.querySelector('.hero')

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id')

                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'))

                // Only add active class if it's not the hero section
                // (assuming hero doesn't have a specific nav link or relies on home)
                if (sectionId && entry.target.classList.contains('hero') === false) {
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
                    if (activeLink) {
                        activeLink.classList.add('active')
                    }
                }
            }
        })
    }, observerOptions)

    // Observe all sections including hero (to deactivate links when scrolling to hero)
    sections.forEach(section => observer.observe(section))
    if (hero) observer.observe(hero)
}
