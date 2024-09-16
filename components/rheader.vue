<template>
    <header class="rheader" ref="rheader" :class="{ 'broken': aboveBreakpoint }">
        <slot />
    </header>
</template>


<script setup>
const rheader = ref(null)
const aboveBreakpoint = ref(null)

const props = defineProps({
    breakpoint: {
        type: String, 
        default: "768px"
    }
})



const updateBreakpoint = (event) => {
    aboveBreakpoint.value = !event.matches
}

const setBreakpointListener = () => {
    const mediaQueryList = window.matchMedia(`(max-width: ${props.breakpoint})`)
    updateBreakpoint(mediaQueryList) 

    mediaQueryList.addEventListener('change', updateBreakpoint)

    onUnmounted(() => {
        mediaQueryList.removeEventListener('change', updateBreakpoint)
    })
}

onMounted(() => {
    setBreakpointListener()
})

</script>

<style scoped lang="sass">
.rheader
    display: flex
    flex-direction: column
    align-items: center
    margin-block: 50px
    text-align: center

    &.broken  
        align-items: flex-end
        text-align: right
</style>