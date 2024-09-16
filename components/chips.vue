<template>
    <div class="chips">
        <component :is="item" v-for="(item, index) in slotItems" :key="index" />
    </div>
</template>

<script setup>
const slots = useSlots()
const slotItems = ref([])

onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []
})

watch(slots.default, () => {
    slotItems.value = slots.default ? slots.default() : []
}, { immediate: true })
</script>

<style lang="sass" scoped>
.chips
    display: flex
    align-items: center
    flex-wrap: wrap
    
    gap: 5px
</style>
