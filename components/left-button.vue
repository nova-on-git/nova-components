<template>
    <div class="left-button">
        <slot />
    </div>
</template>

<script setup>
// For component identification only. //
const props = defineProps({
    leftButton: {
        type: String,
        default: "true"
    }
})
</script>

<style lang='sass' scoped>

</style>