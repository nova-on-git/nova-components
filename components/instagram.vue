<template>
    <Icon icon='mdi:instagram' class="instagram icon"/>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>

<style lang='sass' scoped>
.instagram
    transition: 0.4s color
    cursor: pointer
    
    &:hover
        color: #c13584
</style>