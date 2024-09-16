
<template>
  <div class="tab">
    <slot />
  </div>
</template>

<script setup>
const registerTab = inject('registerTab');
const slots = useSlots();
const slotItems = ref([])

onMounted(() => {
    nextTick(() => {
    
    slotItems.value = slots.default ? slots.default() : []
    const headerComponent = slotItems.value[0]
    const contentComponent = slotItems.value[1]

    if (headerComponent && contentComponent) {
        registerTab(headerComponent, contentComponent)
    }
  })
})
</script>

<style lang='sass' scoped>
.hidden
    display: none
</style>