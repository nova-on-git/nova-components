

<template>
    <Icon icon='mdi:github' class="github icon"/>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>

<style lang='sass' scoped>
.github
    transition: 0.4s color
    cursor: pointer
    
    &:hover
        color: grey
</style>