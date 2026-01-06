import { CONFIG } from './utils/constants.js'

export const data = {
    profile: {
        name: import.meta.env.VITE_PROFILE_NAME || 'Andrés Sánchez',
        location: import.meta.env.VITE_PROFILE_LOCATION || 'Bogotá, Colombia',
        social: {
            email: `mailto:${CONFIG.CONTACT_EMAIL}`,
            github: CONFIG.GITHUB_URL,
            linkedin: CONFIG.LINKEDIN_URL,
        },
        avatar: '/photo1.webp',
        cv: CONFIG.RESUME_PATH
    },
    nav: [
        { href: '#about', label: 'About' },
        { href: '#experience', label: 'Experience' },
        { href: '#education', label: 'Education' },
        { href: '#projects', label: 'Projects' },
        { href: '#contact', label: 'Contact' }
    ],
    skills: {
        backend_data: ['Python', 'SQL', 'BigQuery', 'Looker', 'Java'],
        frontend_tools: ['TypeScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Docker', 'Git']
    }
};