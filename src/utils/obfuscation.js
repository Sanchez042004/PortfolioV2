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
 * Uses RTL direction to show reversed text correctly
 */
export const protectEmail = (email) => {
    const reversed = email.split('').reverse().join('');
    return `<span style="unicode-bidi: bidi-override; direction: rtl; user-select: none !important; pointer-events: none;">${reversed}</span>`;
};
