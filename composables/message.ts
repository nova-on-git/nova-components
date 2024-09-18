export function toggleMessage(documentId: string, duration: number = 3) {
    const message = document.getElementById(documentId)

    if (message) {
        message.classList.add("active")
        setTimeout(() => {
            message.classList.remove("active")
        }, duration * 1000)
    } else {
        console.error("No message component found with the id:", documentId)
    }
}

export function openMessage(documentId: string) {
    const message = document.getElementById(documentId)
    if (message) {
        message.classList.add("active")
    } else {
        console.error("No message component found with the id:", documentId)
    }
}

export function closeMessage(documentId: string) {
    const message = document.getElementById(documentId)

    if (message) {
        message.classList.remove("active")
    } else {
        console.error("No message component found with the id:", documentId)
    }
}
