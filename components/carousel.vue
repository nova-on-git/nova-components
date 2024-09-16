<template>
    <div class="carousel" ref="carousel">
        
        <div class="controls" :style="{ order: props.buttons === 'below' ? 2 : 1 }" :class="{'buttons-inline': props.buttons === 'inline' }">
            <component
                @click="move('left')"
                :is="item"
                class="arrow-button"
                v-for="(item, index) in leftButton"
                :key="index"
            />
            
            <component
                @click="move('right')"
                class="arrow-button"
                :is="item"
                v-for="(item, index) in rightButton"
                :key="index"
            />
        </div>

        <div class="carousel-items"
        >
            <component
                :class="{ inactive: isInactive(index) }"
                class="carousel-item"
                :is="item"
                ref="carouselItem"
                v-for="(item, index) in carouselItems"
                :key="index"
                :style="{ flex: `0 0 ${itemWidth}px`, transform: `translateX(${position}px)`}"
            />
        </div>
    </div>
</template>

<script setup>
const slots = useSlots()
const slotItems = ref([])
const leftButton = ref([])
const rightButton = ref([])
const carouselItems = ref([])
const carousel = ref(null)
const carouselItem = ref(null)

const position = ref(0)
const carouselWidth = ref(0)
const itemWidth = ref(0)
const itemMargin = ref(0)

const activeItems = ref([])

function move(direction) {
    const slideByNumber = Number(props.slideBy)
    const itemWidthNumber = Number(itemWidth.value)
    const itemMarginNumber = Number(itemMargin.value)
    const maxPosition = (itemWidth.value + itemMarginNumber) * carouselItems.value.length - ((Number(props.itemsShown) + 1) * itemWidth.value + itemMarginNumber) 

    if (direction === 'left' && !position.value <= 0) {
        position.value += (slideByNumber * itemWidthNumber + itemMarginNumber)

        activeItems.value.pop()
        activeItems.value.unshift(activeItems.value[0] - 1)   

    }

    if (direction === 'right' && position.value >= -maxPosition) {
        position.value -= (slideByNumber * itemWidthNumber + itemMarginNumber)

        activeItems.value.shift()
        activeItems.value.push(activeItems.value[activeItems.value.length - 1] + 1)
    }
}

function isInactive(index) {
    return !activeItems.value.includes(index)
}

const props = defineProps({
    slideBy: {
        type: [String, Number],
        default: 1,
    },
    itemsShown: {
        type: String,
        default: "3",
    },
    buttons: {
        type: String,
        default: "above"
    }
})
onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []

    slotItems.value.forEach((item) => {
        if (item.type.__name === "left-button") {
            leftButton.value.push(item)
        } else if (item.type.__name === "right-button") {
            rightButton.value.push(item)
        } else {
            carouselItems.value.push(item)
        }
    })

    for (let i = 0; i < Number(props.itemsShown); i++) {
        activeItems.value.push(i)
    }

    carouselWidth.value = carousel.value.getBoundingClientRect().width

    nextTick(() => {
        // Calculate the carousel width
        carouselWidth.value = carousel.value.getBoundingClientRect().width
        itemWidth.value = carouselWidth.value / Number(props.itemsShown)
        
        // Fetch the computed style for margin dynamically
        if (carouselItem.value && carouselItem.value.length > 0) {
            const computedStyle = window.getComputedStyle(carouselItem.value[0])
            const marginLeft = parseFloat(computedStyle.marginLeft) || 0
            const marginRight = parseFloat(computedStyle.marginRight) || 0
            itemMargin.value = (marginLeft + marginRight);
        }
        itemWidth.value = (carouselWidth.value / Number(props.itemsShown)) - (itemMargin.value)
    })
})

</script>

<style lang="sass" scoped>
.carousel
    display: flex
    flex-direction: column
    position: relative
    max-width: 100%

.carousel-items
    display: flex
    align-items: center
    
    order: 1
    
:deep(.carousel-item)
    transition: transform 0.2s ease-in-out
    
:deep(.inactive)
    transition: all 0.3s ease-out
    opacity: 0
    pointer-events: none

:deep(img)
    max-width: 100%

.controls
    display: flex
    place-content: center

:deep(.buttons-inline)
    z-index: 10

    .left-button
        position: absolute
        left: -100px
        top: 50%
        transform: translateY(-50%)

    .right-button
        position: absolute
        right: -100px
        top: 50%
        transform: translateY(-50%)
</style>
