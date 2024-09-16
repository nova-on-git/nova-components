<template>
    <section>

        <div class="shadow-box">

            <cflex :class="[directionClass]" :style="scrollStyle">

                <cflex class="scrolling-item" v-for="(item, index) in slotItems" :key="index">
                    <component :is="item" />
                </cflex>
                
            </cflex>
        </div>
    </section>
</template>

<script setup>

const slotItems = ref([])
const slots = useSlots()
onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []
})

const props = defineProps({
    speed: {
        type: String,
        default: "20s",
        required: false
    },
    direction: {
        type: String,
        default: "down",
        validator: value => ['up', 'down'].includes(value),
        required: false
    },
    gap: {
        type: String,
        default: "25px",
        required: false
    },
    height: {
        type: String,
        default: "750px",
        required: false
    }
})

const scrollStyle = computed(() => ({
    animationDuration: props.speed,
    gap: props.gap,
    height: props.height
}))

const directionClass = computed(() => {
    return props.direction === 'up' ? 'scroll-up' : 'scroll-down'
})

</script>

<style scoped lang="sass">


.shadow-box
    position: relative
    overflow: hidden

    &::before
        content: ""
        position: absolute
        top: 0
        left: 0
        right: 0
        z-index: 10

        height: 100%
        width: 100%

        background: linear-gradient(to bottom, white 0%, transparent 35%)

    &::after
        content: ""
        position: absolute
        bottom: 0
        left: 0
        right: 0
        z-index: 100

        height: 100%
        width: 100%

        background: linear-gradient(to top, white 0%, transparent 35%)

.scroll-down
    animation:  scrollDown linear 15s infinite

.scroll-up
    animation: scrollUp linear infinite


@keyframes scrollUp 
    0% 
        transform: translateY(-25%)

    50%
         transform: translateY(-75%)

    100%
        transform: translateY(-25%)

@keyframes scrollDown
    0% 
        transform: translateY(-75%)

    50%
        transform: translateY(-25%)
    
    100%
        transform: translateY(-75%)

</style>