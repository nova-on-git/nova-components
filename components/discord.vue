<template>
    <Icon icon='ic:baseline-discord' class="discord icon"/>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>

<style lang='sass' scoped>
.discord
    transition: 0.4s color
    cursor: pointer
    
    &:hover
        color: #7289da
</style>