<template>
    <div class="cursor-tooltip" v-if="active"><slot /> {{ active }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
    /** Time in ms */
    delay?: number
}>()

const active = ref(false)

const timeoutId = ref<number | null>(null)

const handleMouseEnter = (): void => {
    timeoutId.value = window.setTimeout(() => {
        active.value = true
    }, props.delay ?? 1)
}

const handleMouseLeave = (): void => {
    if (timeoutId.value !== null) {
        clearTimeout(timeoutId.value)
        timeoutId.value = null
    }
    active.value = false
}
onMounted(() => {
    const parentElement = document.querySelector(".cursor-tooltip")?.parentNode
    if (parentElement) {
        parentElement.addEventListener("mouseenter", handleMouseEnter)
        parentElement.addEventListener("mouseleave", handleMouseLeave)
    }

    onUnmounted(() => {
        if (parentElement) {
            parentElement.removeEventListener("mouseenter", handleMouseEnter)
            parentElement.removeEventListener("mouseleave", handleMouseLeave)
        }
    })
})
</script>

<style lang="sass" scoped>
.cursor-tooltip
    position: absolute
    background: red
</style>
