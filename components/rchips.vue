<template>
    <rflex class="chips">
        <div v-for="(item, index) in slotItems" :key="index" >
            <component :is="item" />
        </div>
    </rflex>
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

<style lang='sass' scoped>
.rflex
    flex-wrap: wrap
    gap: 15px
    justify-content: flex-end
    
</style>