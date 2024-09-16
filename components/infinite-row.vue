
<template>
    <div id='container' class="infinite-row" :style="{ '--duration' : duration}">

        <div class='scroll' id='scroll-one'>
            <component :is="item" v-for="(item, index) in slotItems" :key="index" class="item" />
        </div>

        <div class='scroll' id='scroll-two'>
            <component :is="item" v-for="(item, index) in slotItems" :key="index" class="item" />
        </div>

    </div>
</template>

<script setup>
const slotItems = ref([])
const slots = useSlots()
const props = defineProps({
    duration: {
        type: String, 
        default: "20s"
    }
})
onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []
})

</script>

<style lang="sass" scoped>

#container 
    position: relative
    width: 100%
    overflow: hidden
    white-space: nowrap
    
    display: flex
    align-items: center
    
    .scroll 
        display: flex
        align-items: center
        justify-content: space-around        
        position: absolute

    #scroll-one 
        animation: loop1 var(--duration) linear infinite

    #scroll-two 
        transform: translateX(100%)
        animation: loop2 var(--duration) linear infinite
    

@keyframes loop1 
    0% 
        transform: translateX(0%)

    49.9999999999999%
        transform: translateX(-100%)

    50% 
        transform: translateX(100%)

    100%
        transform: translateX(00%)
        
    
@keyframes loop2
    0% 
        transform: translateX(100%)
    100% 
        transform: translateX(-100%)
</style>

