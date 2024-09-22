<template>
    <div
        class="tooltip"
        :class="{
            _top: props.top,
            _bottom: props.bottom,
            _right: props.right,
            _left: props.left,
        }"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    id: "tooltip"

    left: boolean
    top: boolean
    bottom: boolean
    right: boolean
}>()
</script>

<style lang="sass" scoped>
.tooltip
    position: absolute
    color: black

    &._top
        top: -100%
        transform: translateY(-50%)

    &._right
        right: -100%
        transform: translate(10%, -100%)

    &._bottom
        bottom: -100%
        transform: translateY(50%)

    &._left
        left: -100%
        transform: translate(-10%, -100%)
</style>
