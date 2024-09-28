<!-- @PopDoc 
 ### Aft 
 This is a short description of how to use the component. 
 
 ### Props 
 - example list of props 
 
 ### Emits 
 - example list of events 
 
 ### Slots 
 - example list of slots 
 
 ### Examples 
 ```vue 
<template>
 <div>Test</div> 
</template> 
 ``` 
 
 -->

<template>
    <div class="aft">
        <slot />
    </div>
</template>

<script setup>
const props = defineProps({
    id: "aft",
})
</script>

<style lang="sass" scoped></style>
