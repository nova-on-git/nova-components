<template>
    <div class="success">
       <slot />
    </div>
</template>

<script setup>
const props = defineProps({ id: "success" })
</script>

<style lang='sass' scoped>
.success
    color: green
</style>