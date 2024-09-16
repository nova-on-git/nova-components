<template>
    <div class="right-button">
        <slot />
    </div>
</template>

<script setup>
// For component identification only. //
const props = defineProps({
    rightButton: {
        type: String,
        default: "true"
    }
})
</script>

<style lang='sass' scoped>

</style>