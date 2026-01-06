/**
 * ========================================
 * CORE EVENTS
 * ========================================
 * Central definition of system-wide events for Pub/Sub pattern.
 */

export const EVENTS = {
    LANGUAGE_CHANGED: 'app:language-changed',
    THEME_CHANGED: 'app:theme-changed',
    CONTACT_FORM_SUBMITTED: 'app:contact-submitted'
}

/**
 * Helper to dispatch custom events on the document
 * Using Native CustomEvent API avoids third-party dependencies for simple pub/sub
 * @param {string} eventName - Name of the event from EVENTS object
 * @param {any} detail - Optional data to pass with the event
 */
export const dispatchEvent = (eventName, detail = null) => {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
}

/**
 * Helper to listen for custom events
 * @param {string} eventName - Name of the event from EVENTS object
 * @param {Function} callback - Function to execute when event triggers
 */
export const on = (eventName, callback) => {
    document.addEventListener(eventName, callback);
}
