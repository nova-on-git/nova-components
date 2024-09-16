<template>
    <nav class="trinav" ref="trinav">
        <div ref="content" class="nav-content">
            <rflex v-for="(item, index) in slotItems" :class="getClass(index)" :key="index">
                <component :is="item" />
            </rflex>
        </div>
    </nav>
</template>

<script setup>
const slots = useSlots()
const slotItems = ref([])
const trinav = ref(null)
const content = ref(null)

onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []

    const contentWidth = getComputedStyle(trinav.value).getPropertyValue('--content-width')
    content.value.style.maxWidth = contentWidth
    
})

function getClass(index) {
    return {
        "left": index === 0,
        "center": index === 1,
        "right": index === 2,
    }
}
</script>

<style scoped lang="sass">
.trinav 
    width: 100%
    
    
.nav-content
    display: flex
    align-items: center
    padding-block: 25px
    user-select: none
    padding-inline: clamp(10px, 10px + 3vw, 50px)
    

    // custom
    max-width: 100%
    width: 100%
    margin-inline: auto

    .left
        flex: 1 1 100px
        justify-content: flex-start
        
    .center
        flex: 1 1 100px
        justify-content: center

    .right
        flex: 1 1 100px
        justify-content: flex-end
        

</style>
