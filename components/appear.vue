

<template>
    <!--
        triggered on click
        @event click
        @property {object} demo - example
        @property {number} called - test called
    -->
    <div
        ref="appear"
        class="appear"
        :class="state.overriddenDirection"
        :style="{
            '--duration': state.overriddenDuration,
            '--delay': state.overriddenDelay,
            '--distance': state.overriddenDistance,
        }"
    >
    
        <slot />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import { getCustomProperty } from "./custom-css.js"

const appear = ref(null)

const props = defineProps({
    /** The transition direction. */
    direction: {
        type: String,
        default: "bottom",
    },
    /** The transition distance. */
    distance: {
        type: String,
        default: "100px",
    },
    /** The duration of the transition. */
    duration: {
        type: String,
        default: "1s",
    },
    /** Amount of the div that needs to be in the viewport to initiate the transition. */
    threshold: {
        type: String,
        default: "0.5",
    },
    /** The delay before starting the transition after the div threshold has been reached. */
    delay: {
        type: String,
        default: "0s",
    },

})
const state = reactive({
    overriddenDuration: '',
    overriddenDistance: '',
    overriddenDelay: '',
    overriddenThreshold: '',
    overriddenDirection: ''
});

function handleCustomCss() {
    if (appear.value) {
        const directionCss = getCustomProperty(appear, '--direction') || props.direction;
        const durationCss = getCustomProperty(appear, '--duration') || props.duration;
        const distanceCss = getCustomProperty(appear, '--distance') || props.distance;
        const delayCss = getCustomProperty(appear, '--delay') || props.delay;
        const thresholdCss = getCustomProperty(appear, '--threshold') || props.threshold;

        state.overriddenDirection = directionCss;
        state.overriddenDuration = durationCss;
        state.overriddenDistance = distanceCss;
        state.overriddenDelay = delayCss;
        state.overriddenThreshold = thresholdCss;


    }
}

onMounted(async () => {
    await nextTick()
    handleCustomCss()

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible")
                    entry.target.classList.remove("invisible")
                }
            })
        },
        {
            threshold: parseFloat(state.overriddenThreshold),
        }
    )

    observer.observe(appear.value)

    return () => {
        observer.unobserve(appear.value)
        observer.disconnect()
    }
})
</script>

<style lang="sass" scoped>
.appear
    position: relative
    z-index: 0
    opacity: 0
    transition: opacity var(--duration) ease

    &.visible
        position: relative

        &.bottom
            animation: appear-bottom var(--duration) both var(--delay)

        &.left
            animation: appear-left var(--duration) both var(--delay)

        &.right
            animation: appear-right var(--duration) both var(--delay)

        &.top
            animation: appear-top var(--duration) both var(--delay)

@keyframes appear-bottom
    0%
        transform: translateY(var(--distance, 0))
        opacity: 0
    100%
        transform: translateY(0)
        opacity: 1

@keyframes appear-left
    0%
        transform: translateX(calc(-1 * var(--distance, 0)))
        opacity: 0
    100%
        transform: translateX(0)
        opacity: 1

@keyframes appear-right
    0%
        transform: translateX(var(--distance, 0))
        opacity: 0
    100%
        transform: translateX(0)
        opacity: 1


@keyframes appear-top
    0%
        transform: translateY(calc(-1 * var(--distance, 0)))
        opacity: 0

    100%
        transform: translateY(0)
        opacity: 1


</style>
