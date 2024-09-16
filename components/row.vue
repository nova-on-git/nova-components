<template>
    <div class="row">
        <slot />
    </div>
</template>

<script setup>
const props = defineProps({
    id: "row"
})
</script>

<style lang='sass' scoped></style>