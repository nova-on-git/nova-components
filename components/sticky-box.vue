<template>
    <div class="sticky-box" id="stickyBox">

        <component :is="slotItems[0]" id="stickyContent" ref="stickyContent" />

    </div>
</template>

<script setup lang="ts">
import { Ref, ref, useSlots, onMounted, nextTick } from 'vue';

// Define types
type SlotItemsType = Array<any>
type PropsType = {
    offsetY: number,
    autoHeight: boolean
}

const props = defineProps({
    offsetY: {
        type: Number,
        default: 0
    },
    autoHeight: {
        type: Boolean,
        default: true
    }
})

const slotItems: Ref<SlotItemsType> = ref([])
const slots = useSlots()

let viewportInsideContainer: Boolean
let viewportBelowContainer: Boolean
let viewportAboveContainer: Boolean

function setHeight(): void {
    const stickyBox: HTMLElement | null = document.getElementById('stickyBox');
    if (stickyBox === null) {
        console.error('Element with id "stickyBox" not found.');
        return;
    }

    const parent: HTMLElement | null = stickyBox.previousElementSibling as HTMLElement | null;
    if (parent === null) {
        console.error('Previous sibling element not found.');
        return;
    }

    let parentHeight = parent.clientHeight;
    stickyBox.style.height = `${parentHeight}px`;
}


function handler() {
    const stickyBox = document.getElementById('stickyBox')
    const stickyContent = document.getElementById('stickyContent')

    if (!stickyBox || !stickyContent) return

    const stickyBoxRect = stickyBox.getBoundingClientRect()
    const stickyBoxBottomToTopViewport = stickyBoxRect.bottom
    const stickyBoxBottomToTopPage = window.scrollY + stickyBoxBottomToTopViewport

    const stickyContentRect = stickyContent.getBoundingClientRect()

    // If viewport top is in the box bounds //
    if ((stickyBoxRect.top - props.offsetY) <= 0 && (stickyBoxBottomToTopViewport - stickyContentRect.height - props.offsetY)  >= 0) {
        viewportInsideContainer = true
    } else {
        viewportInsideContainer = false
    }

    // Check if the viewport is below the container
    if (window.scrollY > (stickyBoxBottomToTopPage - (stickyContentRect.height + props.offsetY) )) {
        viewportBelowContainer = true
    } else {
        viewportBelowContainer = false
    }

    // Check if the viewport is above the container
    if ( stickyBoxRect.top > 0) {
        viewportAboveContainer = true
    } else {
        viewportAboveContainer = false
    }

    // Add styles based on viewport position //
    if (viewportInsideContainer) {
        stickyContent.style.position = 'fixed'
        stickyContent.style.top = `${props.offsetY}px`
        stickyContent.style.height = 'min-content'

    }
    else if (viewportAboveContainer && !viewportInsideContainer) {
        stickyContent.style.position = 'absolute'
        stickyContent.style.top = '0px'
        stickyContent.style.bottom = 'auto'

    } else if (viewportBelowContainer && !viewportInsideContainer) {
        stickyContent.style.position = 'absolute'
        stickyContent.style.bottom = '0px'
        stickyContent.style.top = 'auto'
    } 
}

onMounted(async() => {
    slotItems.value = slots.default ? slots.default() : []

    if (props.autoHeight) {
        console.log("hello")
        setHeight()
    }

    await nextTick()
    handler()

    window.addEventListener('scroll', handler)
})


</script>

<style lang='sass' scoped>
.sticky-box
    position: relative

.sticky-content
    height: min-content
</style>