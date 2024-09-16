<template>
    
        <div class="cardgrid">
            <div class="left">
                <component :is="item" :class="getClassLeft(index)" class="cardgrid-item" v-for="(item, index) in leftSlotItems" :key="index" />
            </div>

            <div class="right">
                <component :is="item" :class="getClassRight(index)" class="cardgrid-item" v-for="(item, index) in rightSlotItems" :key="index"/>
            </div> 
        </div>
    
</template>

<script setup>
const slots = useSlots()
const slotItems = ref([])


onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []
})

function getClassLeft(index) {
    return {
        'top-left': index == 0,
        'bottom-left': index == 1,
    }
}

function getClassRight(index) {
    return {
        'top-right': index == 0,
        'bottom-right': index == 1
    }
}

const leftSlotItems = computed(() => slotItems.value.slice(0, 2))
const rightSlotItems = computed(() => slotItems.value.slice(2, 4))

</script>

<style lang='sass' scoped>

.cardgrid 
    display: flex
    flex-wrap: wrap
    gap: 25px
    
.left
    flex: 1 1 500px
    display: grid
    grid-template-rows: 4fr 5fr
    grid-gap: 25px

    height: 100%
    width: 100%

    &.top-left
        height: 100%
        width: 100%

    &.bottom-left
        height: 100%
        width: 100%

.right
    flex: 1 1 500px
    display: grid
    grid-template-rows: 5fr 4fr
    grid-gap: 25px

    height: 100%
    width: 100%

    &.top-right
        height: 100%
        width: 100%

    &.bottom-right
        height: 100%
        width: 100%
        
</style>
