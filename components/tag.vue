<!-- tag.vue -->
<template>
    <label class="tag"> 
       <slot />
    </label>
</template>

<script setup>
const props = defineProps({
    id: "tag"
})
</script>

<style lang='sass' scoped>

</style>