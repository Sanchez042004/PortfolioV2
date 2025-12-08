export const showToast = (message) => {
    // Remove any existing toasts immediately to prevent overlap
    const existingToast = document.querySelector('.toast')
    if (existingToast) {
        existingToast.remove()
    }

    // Create toast container element
    const toast = document.createElement('div')
    toast.className = 'toast'
    // Info icon SVG
    const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor"><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/></svg>`

    toast.innerHTML = `${icon}<span>${message}</span>`

    // Add to document
    document.body.appendChild(toast)

    // Trigger reflow to enable transition
    void toast.offsetWidth

    // Add show class for entrance animation
    toast.classList.add('show')

    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('show')
        // Wait for exit animation to finish
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast)
            }
        }, 300)
    }, 1500)
}
