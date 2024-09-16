<template>
    <div 
        class="drop"
        :class="{
            'bottom': props.bottom,
            'top': props.top,
            'right': props.right,
            'left': props.left,
        }"
    >
        <slot />
    </div>
</template>

<script setup>
const props = defineProps({
    id: "drop",
    left: Boolean,
    top: Boolean,
    right: Boolean,
    bottom: Boolean
})
</script>

<style lang='sass' scoped>
.drop
    position: absolute
    z-index: 10

    &.top
        bottom: 100%
        left: 50%
        transform: translateX(-50%)

    &.right
        top: 50%
        left: 100%
        transform: translateY(-50%)

    &.bottom
        top: 100% 
        left: 50%
        transform: translateX(-50%)

    &.left
        top: 50%
        right: 100%
        transform: translateY(-50%)

</style>