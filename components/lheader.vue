<template>
    <header class="lheader" :class="{ 'broken': aboveBreakpoint }">
        <slot />
    </header>
</template>

<script setup>
const aboveBreakpoint = ref(false)

const props = defineProps({
    breakpoint: {
        type: String,
    },
    breakTo: {
        type: String,
        default: "left"
    }
})

const updateBreakpoint = (event) => {
    aboveBreakpoint.value = !event.matches
}

const setBreakpointListener = () => {
    if (!props.breakpoint) {
        return
    }
    const mediaQueryList = window.matchMedia(`(max-width: ${props.breakpoint})`)
    updateBreakpoint(mediaQueryList) 

    mediaQueryList.addEventListener('change', updateBreakpoint)

    onUnmounted(() => {
        mediaQueryList.removeEventListener('change', updateBreakpoint)
    })

}
const alignItemsComputed = computed(() => {
    switch (props.breakTo) {
        case 'left':
            return 'flex-start'
        case 'center':
            return 'center'
        case 'right':
            return 'flex-end'
        default:
            return 'left' // Default to left if an unknown value is passed
    }
})

onMounted(() => {
    setBreakpointListener()
})
</script>


<style scoped lang="sass">
.lheader
    display: flex
    flex-direction: column
    align-items: flex-start
    text-align: left
    transition: all 0.2s

    &.broken  
        
        align-items: v-bind(alignItemsComputed)
        text-align: v-bind(breakTo)
</style>
