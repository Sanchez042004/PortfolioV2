/**
 * Surgical obfuscation utilities
 */

export const decodeInfo = (encoded) => {
    try {
        return atob(encoded);
    } catch (e) {
        return encoded;
    }
};

/**
 * Returns a protected HTML representation of the email
 * Uses RTL direction and injections to confuse scrapers
 */
export const protectEmail = (email) => {
    const parts = email.split('@');
    if (parts.length !== 2) return email;

    const [user, domain] = parts;
    const reversedUser = user.split('').reverse().join('');
    const reversedDomain = domain.split('').reverse().join('');

    // Inject hidden noise between characters to break simple text scrapers
    const injectNoise = (str) => {
        return str.split('').map(char =>
            `${char}<span style="display:none !important">_noise_</span>`
        ).join('');
    };

    return `
        <span class="protected-email" style="unicode-bidi: bidi-override; direction: rtl; user-select: none !important;">
            <span>${injectNoise(reversedDomain)}</span>@<span>${injectNoise(reversedUser)}</span>
        </span>
    `.replace(/\s+/g, ' ').trim();
};
