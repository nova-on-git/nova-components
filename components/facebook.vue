<template>
    <Icon icon='fe:facebook' class="facebook icon"/>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>

<style lang='sass' scoped>
.facebook
    transition: 0.4s color
    cursor: pointer
    
    &:hover
        color: #1877F2
</style>