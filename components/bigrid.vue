<template>
    <div class="bigrid" :class="{'broken' : aboveBreakpoint}" >

        <slot v-for="(item, index) in slotItems" 
            :name="item.name" 
            :class="getClass(index)">
        </slot>

    </div>
</template>

<script setup>
const slots = useSlots()
const aboveBreakpoint = ref(false)
const slotItems = ref(Object.keys(slots).map(name => ({ name })))

const props = defineProps({
    breakpoint: {
        type: String,
        default: "768px"
    }
})

const getClass = (index) => {
    return {
        'first': index == 0,
        'second' : index == 1
    }
}

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

<style lang='sass' scoped>
.bigrid
    display: grid
    grid-template-rows: 1fr 

    &.broken
        grid-template-rows: 1fr
        grid-template-columns: 1fr 1fr

</style>