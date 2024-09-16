<template>
    <div class="trigrid" id="trigrid" ref="trigrid" :class="{'broken' : aboveBreakpoint}" >

        <component v-for="(item, index) in slotItems" :is="item" :class="getClass(index)"/>

    </div>
</template>

<script setup>
const slots = useSlots()
const slotItems = ref([])
const aboveBreakpoint = ref(false)
const trigrid = ref(null)

const props = defineProps({
    breakpoint: {
        type: String,
        default: "768px"
    }
})

const getClass = (index) => {
    return {
        'first': index == 0,
        'second': index == 1,
        'third' : index == 2
    }
}

const updateBreakpoint = (event) => {
    aboveBreakpoint.value = !event.matches
}

const setBreakpointListener = () => {
    const mediaQueryList = window.matchMedia(`(max-width: ${props.breakpoint})`)
    updateBreakpoint(mediaQueryList) // Initialize the value

    mediaQueryList.addEventListener('change', updateBreakpoint)

    // Cleanup listener on component unmount
    onUnmounted(() => {
        mediaQueryList.removeEventListener('change', updateBreakpoint)
    })
}

onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []
    setBreakpointListener()
})

</script>

<style lang='sass' scoped>
.trigrid
    display: grid
    grid-template-rows: 1fr 

    &.broken
        grid-template-rows: 1fr
        grid-template-columns: 1fr 1fr 1fr

</style>