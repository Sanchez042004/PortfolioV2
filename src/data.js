export const data = {
    profile: {
        name: import.meta.env.VITE_PROFILE_NAME || 'Tu Nombre',
        location: import.meta.env.VITE_PROFILE_LOCATION || 'Tu Ciudad, País',
        social: {
            email: `mailto:${import.meta.env.VITE_PROFILE_EMAIL || 'tu@email.com'}`,
            github: import.meta.env.VITE_PROFILE_GITHUB || 'https://github.com/',
            linkedin: import.meta.env.VITE_PROFILE_LINKEDIN || 'https://linkedin.com/',
            twitter: import.meta.env.VITE_PROFILE_TWITTER || 'https://twitter.com/'
        }
    },
    nav: [
        { href: '#about', label: 'About' },
        { href: '#experience', label: 'Experience' },
        { href: '#education', label: 'Education' },
        { href: '#projects', label: 'Projects' },
        { href: '#contact', label: 'Contact' }
    ],
    skills: [
        'HTML', 'CSS', 'Git', 'Python', 'SQL', 'BigQuery',
        'Looker', 'Java', 'Office', 'Business Intelligence'
    ]
};