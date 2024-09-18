export function openModal(documentId: string) {
    const modal = document.getElementById(documentId)
    if (modal) {
        modal.classList.add("active")
    } else {
        console.error("No modal component found with the id:", documentId)
    }
}

export function closeModal(documentId: string) {
    const modal = document.getElementById(documentId)

    if (modal) {
        modal.classList.remove("active")
    } else {
        console.error("No modal component found with the id:", documentId)
    }
}

export function toggleModal(documentId: string) {
    const modal = document.getElementById(documentId)

    if (!modal) {
        console.error("No modal component found with the id:", documentId)
        return
    }

    if (modal.classList.contains("active")) {
        modal.classList.remove("active")
    } else {
        modal.classList.add("active")
    }
}
