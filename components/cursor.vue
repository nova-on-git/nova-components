<template>
  <div class="cursor" :class="type" :style="{top: `${y}px`, left: `${x}px`}" />
</template>


<script setup>

const mouseX = ref(0)
const mouseY = ref(0)
const scrollX = ref(0)
const scrollY = ref(0)
const x = ref(0)
const y = ref(0)

const props = defineProps({
    type: {
        type: String,
        default: ""
    },
})

const updatePosition = () => {
    x.value = mouseX.value + scrollX.value
    y.value = mouseY.value + scrollY.value
}

const updateScroll = () => {
    scrollX.value = window.scrollX
    scrollY.value = window.scrollY
    updatePosition()
}

const updateMouse = (e) => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
    updatePosition()
}

onMounted(() => {
    updateScroll() // Initialize the scroll position
    window.addEventListener('scroll', updateScroll)
    window.addEventListener('mousemove', updateMouse)
})

// Clean up event listener when component is unmounted
onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
    window.removeEventListener('mousemove', updateMouse)
})
</script>


<style lang='sass'>
.cursor
    position: absolute
    pointer-events: none
    height: 50px
    width: 50px
    border-radius: 50%
    background: red
    transform: translate(-50%, -50%)

    &.nuxt
        height: 500px
        width: 500px
        -webkit-filter: blur(100px)

</style>
