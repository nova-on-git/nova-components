<template>
    <div class="content">
    
        <slot />
    
    </div>
</template>

<script setup>

const props = defineProps({
    id: "content"
})
</script>