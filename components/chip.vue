<template>
    <mflex :class="type" class="chip" >
        <slot />
    </mflex>
</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default: ""
    }
})
</script>

<style lang='sass' scoped>
.chip
    font-size: 1.1rem

    &.border
        border: 1px solid white
</style>