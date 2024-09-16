<template>
    <Icon icon='ic:baseline-whatsapp' class="whatsapp icon"/>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>

<style lang='sass' scoped>
.whatsapp
    transition: 0.4s color
    cursor: pointer
    
    &:hover
        color: #25D366
</style>