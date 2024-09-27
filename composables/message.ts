import { h, render } from "vue"
import message from "../components/message.vue"

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
export function createMessage({ preset, duration = 3, content }) {
    const div = document.createElement("div")
    document.body.appendChild(div)

    const vNode = h(
        message,
        {
            preset,
            onRemove: () => {
                // Remove the message after animation ends
                render(null, div)
                document.body.removeChild(div)
            },
        },
        {
            default: () => content, // Function-based slot
        }
    )

    render(vNode, div)

    // Close the message after the specified duration
    setTimeout(() => {
        if (vNode.component && vNode.component.exposed) {
            vNode.component.exposed.close() // Trigger fade-out
        }
    }, duration * 1000)

    // Listen for transition end to remove the component from the DOM
    const removeAfterTransition = () => {
        vNode.component.exposed.close() // Ensure close is triggered
        render(null, div) // Unmount the component
        document.body.removeChild(div) // Remove the container div
    }

    // Wait for the transition to finish before removing it from the DOM
    div.addEventListener("transitionend", removeAfterTransition, { once: true })
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
