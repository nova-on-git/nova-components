<template>
    <div class="error"> 
       <slot />
    </div>
</template>

<script setup>
const props = defineProps({ id: "error" })
</script>

<style lang='sass' scoped>
.error
    color: red
</style>