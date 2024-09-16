<template>
    <div class="flareframe" :style="{ '--gradient': gradient, '--background': background, '--thickness': thickness }">
        <slot />
    </div>
</template>

<script setup>
const props = defineProps({
    gradient: {
        type: String,
        default: "linear-gradient(to bottom right, #665DCD 0%, #5FA4E6 45%, #D2AB67 100%)"
    },
    background: {
        type: String,
        default: "transparent"
    },
    thickness: {
        type: String,
        default: "2px"
    }
})
</script>


<style lang='sass' scoped>
.flareframe
    background: transparent
    border: var(--thickness) solid transparent
    
    border-image: var(--gradient) 1
    
</style>