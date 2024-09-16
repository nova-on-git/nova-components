<template>
    <div class="loader" :class="type" />
</template>

<script setup>
const props = defineProps({
    id: "loader",
    type: {
        type: String,
        default: "default"
    },

    width: {
        type: String,
        default: "24px"
    },

    weight: {
        type: String,
        default: "2px"
    },

    color: {
        type: String,
        default: "black"
    },
    
    duration: {
        type: String,
        default: "1s"
    }
})
</script>

<style lang='sass' scoped>

.loader 

    &.bispinner
        width: 50px
        aspect-ratio: 1
        border-radius: 50%
        border: 8px solid
        border-color: #000 #0000
        animation: l1 1s infinite

        @keyframes l1 
            to
                transform: rotate(.5turn)

                
    &.default 
        width: v-bind(width)
        height: v-bind(width)
        border: v-bind(weight) solid v-bind(color)
        border-bottom-color: transparent
        border-radius: 50%
        display: inline-block
        box-sizing: border-box
        animation: rotation v-bind(duration) linear infinite
    
        @keyframes rotation 
            0% 
                transform: rotate(0deg)

            100% 
                transform: rotate(360deg)



</style>