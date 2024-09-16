<template>

    <div class="mnav">
        
        <component :is="item" v-for="(item, index) in filterOut('aside')" :key="index" :class="getClass(index)" @click="toggleNav(index)" />
    

        <div class="aside-box"  ref="asideRef" :class="[direction, {'active': navActive}]" @click="toggleNav(1)">
            <component 
                :is="item" 
                v-for="(item, index) in filter('aside')" 
                :key="index"/>
        </div>

    </div>

</template>

<script setup>
const props = defineProps({
    direction: {
        type: String,
        default: "left"
    },
    duration: {
        type: String,
        default: "0.3s"
    },
    bezier: {
        type: String,
        default: "ease-in-out"
    }
})

const emit = defineEmits([
    'navigation-toggled'
])


const asideRef = ref(null)
const navActive = ref(false)
const slotItems = ref([])
const slots = useSlots()

function filter(tag){
    return slotItems.value.filter(item => item.type === tag)
}

function filterOut(tag) {
    return slotItems.value.filter(item => item.type !== tag)
}

function getClass(index) {
    return {
        'left': index === 0,
        'right': index === 1,
    }
}

function toggleNav(index) {
    if (index !== 1) {
        return
    }
    navActive.value = !navActive.value
    emit('navigation-toggled')
}

onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []
})

</script>


<style lang='sass' scoped>
.mnav
    display: flex
    align-items: center
    justify-content: space-between
    position: relative
    

.aside-box
    position: fixed

    &.left
        top: 0
        left: -100%
        bottom: 0
        transition: left v-bind(duration) v-bind(bezier)

        &.active
            left: 0  

    &.right
        top: 0
        right: -100%
        bottom: 0
        transition: right v-bind(duration) v-bind(bezier)

        &.active
            right: 0  

    &.top
        top: -100%
        right: 0
        left: 0
        transition: top v-bind(duration) v-bind(bezier)

        &.active
            top: 0  

    &.bottom
        bottom: -100%
        right: 0
        left: 0
        transition: bottom v-bind(duration) v-bind(bezier)

        &.active
            bottom: 0  

</style>
