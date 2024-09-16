<template>
    <div class="binav" ref="binav">   

        <div class="nav-content" ref="content">
            <component :is="item" v-for="(item, index) in slotItems" :class="getClass(index)" :key="index" />
        </div>  

    </div>
</template>

<script setup>

const slots = useSlots()
const slotItems = ref([])
const content = ref(null)
const binav = ref(null)


onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []

    const contentWidth = getComputedStyle(binav.value).getPropertyValue('--content-width')
    content.value.style.maxWidth = contentWidth  
})

function getClass(index) {
    return {
        'left': index === 0,
        'right': index === 1,
    }
}

</script>

<style scoped lang="sass">
.binav
    display: flex
    align-items: center
    user-select: none
    width: 100%
    
    .nav-content
        display: flex
        justify-content: space-between
        align-items: center
        padding-inline: 50px

        // custom
        max-width: 100%
        width: 100%
        margin-inline: auto

        .left
            justify-content: flex-start
                
        .right
            justify-content: flex-end
</style>
