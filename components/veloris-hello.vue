<!-- @PopDoc 
 ### Component name
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
    <mflex>
        <h1>Veloris CMS</h1>
        <btn to="/admin" preset="dark">Dashboard</btn>
    </mflex>
</template>

<script setup lang="ts"></script>

<style lang="sass" scoped>
.mflex
    height: 100vh

    h1
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
        font-size: 5rem
        font-weight: 100
</style>
