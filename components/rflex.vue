<!-- @PopDoc 
 ### Rflex Hello 
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
    <div ref="reference" class="rflex">
        <slot />
    </div>
</template>

<style scoped lang="sass">
.rflex
    display: flex
    align-items: center
</style>
