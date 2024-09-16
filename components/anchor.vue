<template>
    <nuxt-link :class="type" class="anchor">
        <slot />
    </nuxt-link>
</template>


<script setup>
const props = defineProps({
    type: {
        type: String,
        default: ""
    }
})

</script>

<style scoped lang="sass">
.anchor
    color: inherit
    text-decoration: none

    display: flex
    align-items: center
    gap: 10px

    &:hover
        text-decoration: none


// Custom effect properties
.anchor
    display: flex
    align-items: center
    gap: 8px
    white-space: nowrap
    user-select: none
    cursor: pointer

    &.underline
        position: relative
                
        &::after 
            content: ''
            position: absolute
            bottom: -0.3em
            left: 0
            width: 100%
            height: 0.01em
            background: currentColor
            transition: transform 0.3s ease
            transform-origin: left
            transform: scaleX(0)
        
        &:hover::after 
            transform: scaleX(1)    

    // Custom styles
    &.underline-reverse 
        position: relative
                
        &::after 
            content: ''
            position: absolute
            bottom: -5px
            left: 0
            width: 100%
            height: 2px
            background: currentColor
            transition: transform 0.3s ease
            transform-origin: right
            transform: scaleX(1)
        
        &:hover::after 
            transform: scaleX(0)

        
</style>
