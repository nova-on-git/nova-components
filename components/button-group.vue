<template>
    <div class="button-group" :class="type">

        <div 
        class="selection" 
        ref="selection" 
        :style="{
            width: buttonWidth + 'px',
            left: selectionLeft + 'px',
            height: buttonHeight + 'px'
        }"/>
        
        <component
            :class="{'active' : activeButton === index, 'inactive' : activeButton != index}" 
            class="button"
            :style="{minWidth: buttonWidth + 'px',}"
            @click="updateActive(index)" 
            v-for="(item, index) in slotItems" 
            :is="item" 
            :key="index"
        />

    </div>
</template>

<script setup>

const slots = useSlots()
const slotItems = ref([])
const buttonWidth = ref(0)
const buttonHeight = ref(0)
const activeButton = ref(0)
const selectionLeft = ref(0)

function updateActive(index) {
  activeButton.value = index
  updateSelectionPosition()
}

function updateSelectionPosition() {
  const activeBtn = document.querySelectorAll('.button')[activeButton.value]
  if (activeBtn) {
    selectionLeft.value = activeBtn.offsetLeft
  }
}

const props = defineProps({
    type: {
        type: String,
        default: "",
        validator: defineInputs(["default"])
    },
  
    selection: {
        type: String,
        default: "single",
        validator: defineInputs(["single", "multiple"])
    }
})

onMounted(async () => {
  slotItems.value = slots.default ? slots.default() : []

  await nextTick()
  const firstButton = document.querySelector('.button')
  if (firstButton) {
        buttonWidth.value = firstButton.offsetWidth
        buttonHeight.value = firstButton.offsetHeight
        updateSelectionPosition()   
  }
})

watch(slots.default, () => {
    slotItems.value = slots.default ? slots.default() : []
}, { immediate: true })

</script>
<style lang='sass' scoped>
.button-group
    display: flex
    position: relative
    width: min-content
    .selection
        position: absolute
        z-index: 1
        background: white
        transition: 0.2s all


    :deep(.button)
        position: relative
        z-index: 2
        background: transparent

    &.default
        border-radius: 5px
        padding: 5px
        background: lightgrey


</style>