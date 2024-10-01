<!-- @Nova 
### Error 
A semantic component. Used only for its meaning in other components.
 ``` 
 
 -->

<template>
    <div class="error">
        <slot />
    </div>
</template>

<script setup>
const props = defineProps({ id: "error" })
</script>

<style lang="sass" scoped>
.error
    color: red
</style>
