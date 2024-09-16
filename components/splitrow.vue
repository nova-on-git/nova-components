<template>
    <div 
        class="splitrow"
    >
        <component 
            :is="item" 
            :class="getClass(index)"  
            v-for="(item, index) in components" 
            :key="index"/>
    </div>
</template>


<script setup>

const slots = useSlots()

const components = computed(() => {
    return slots.default()
})


const getClass = (index) => {
    return {
        'left': index === 0,
        'right': index === 1,
    }
}

</script>
<style scoped lang="sass">
.splitrow
    display: flex
    flex-direction: row
    flex-wrap: wrap
    gap: 25px
    align-items: center

    .left
        flex-grow: 1  

    .right
        flex-grow: 1
</style>
