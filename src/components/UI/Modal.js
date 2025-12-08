/**
 * Render the PDF modal component
 * @returns {string} HTML string for the modal
 */
export const Modal = () => {
    return `
    <div id="pdf-modal" class="modal" onclick="if(event.target === this) window.closeModal()">
      <div class="modal-content">
        <button class="close-btn" onclick="window.closeModal()">&times;</button>
        <iframe id="pdf-frame" src="" width="100%" height="100%"></iframe>
      </div>
    </div>
  `
}

/**
 * Open the PDF modal with the specified URL
 * @param {string} pdfUrl - URL of the PDF to display
 */
export const openModal = (pdfUrl) => {
    const modal = document.getElementById('pdf-modal')
    const frame = document.getElementById('pdf-frame')
    if (modal && frame) {
        frame.src = pdfUrl
        modal.classList.add('active')
        document.body.style.overflow = 'hidden'
    }
}

/**
 * Close the PDF modal
 */
export const closeModal = () => {
    const modal = document.getElementById('pdf-modal')
    const frame = document.getElementById('pdf-frame')
    if (modal && frame) {
        modal.classList.remove('active')
        frame.src = ''
        document.body.style.overflow = ''
    }
}
