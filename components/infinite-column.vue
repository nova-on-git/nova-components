
<template>
  <div class="infinite-column">
    <div id="container" :style="{ '--duration': duration }">
      <div class="scroll" :id="scrollOneId">
        <component :is="item" v-for="(item, index) in slotItems" :key="index" class="item" />
      </div>
      <div class="scroll" :id="scrollTwoId">
        <component :is="item" v-for="(item, index) in slotItems" :key="index" class="item" />
      </div>
    </div>
    <div class="shadow top-shadow" :style="{ '--shadow-color': shadowColor }"></div>
    <div class="shadow bottom-shadow" :style="{ '--shadow-color': shadowColor }"></div>
  </div>
</template>



<script setup>
const slotItems = ref([])
const slots = useSlots()
const props = defineProps({
    duration: {
        type: String, 
        default: "20s"
    },
    shadowColor: {
        type: String,
        default: "transparent"
    },
    direction: {
        type: String,
        default: "down"
    }
})

onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []
})

const scrollOneId = computed(() => (props.direction === 'down' ? 'scroll-reverse-one' : 'scroll-one'))
const scrollTwoId = computed(() => (props.direction === 'down' ? 'scroll-reverse-two' : 'scroll-two'))

watch(slots.default, () => {
    slotItems.value = slots.default ? slots.default() : []
}, { immediate: true })
</script>

<style lang="sass" scoped>
.infinite-column
  position: relative
  overflow: hidden

#container
  position: relative
  overflow: hidden
  white-space: nowrap
  z-index: 1
  height: 100%

.scroll
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-around        
  position: absolute
  width: min-content

#scroll-one
    animation: loop1 var(--duration) linear infinite

#scroll-two
    transform: translateY(100%)
    animation: loop2 var(--duration) linear infinite

#scroll-reverse-one
    animation: loop-reverse1 var(--duration) linear infinite

#scroll-reverse-two
    transform: translateY(100%)
    animation: loop-reverse2 var(--duration) linear infinite

.shadow
    position: absolute
    left: 0
    width: 100%
    pointer-events: none
    z-index: 1
    height: 100px

.top-shadow
    top: 0
    background: linear-gradient(to bottom, var(--shadow-color), transparent)

.bottom-shadow
    bottom: 0
    background: linear-gradient(to top, var(--shadow-color), transparent)

@keyframes loop1
    0%
        transform: translateY(0%)
    49.9999999999999%
        transform: translateY(-100%)
    50%
        transform: translateY(100%)
    100%
        transform: translateY(0%)

@keyframes loop2
    0%
        transform: translateY(100%)
    100%
        transform: translateY(-100%)

@keyframes loop-reverse1
    0%
        transform: translateY(0%)
    49.9999999999999%
        transform: translateY(100%)
    50%
        transform: translateY(-100%)
    100%
        transform: translateY(0%)

@keyframes loop-reverse2
    0%
        transform: translateY(-100%)
    100%
        transform: translateY(100%)
</style>

