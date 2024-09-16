<template>
    <div class="acc">
        <component
            @click="trigger === 'click' ? toggleAccordion() : null"
            @mouseover="trigger === 'hover' ? toggleAccordion() : null"
            v-for="(item, index) in headerItems"
            :is="item"
            :key="index"
            class="acc-header"
        />

        <div
            class="acc-content"
            ref="content"
            :style="{ '--duration': duration, '--bezier': bezier }"
        >
            <component :is="item" v-for="(item, index) in contentItems" :key="index" />
        </div>
    </div>
</template>

<script setup>
const slots = useSlots()
const slotItems = ref([])
const item = ref(null)
const content = ref([])


const contentItems = ref([])
const headerItems = ref([])

const props = defineProps({
    duration: {
        type: String,
        default: "50ms",
    },
    bezier: {
        type: String,
        default: "ease-in-out",
    },
    trigger: {
        type: String,
        default: "click",
    },
})
onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []

    // Separate header and content items
    slotItems.value.forEach((item, index) => {
        if (index == 0) {
            headerItems.value.push(item)
        } else if (index == 1) {
            contentItems.value.push(item)
        }
    })
})

function toggleAccordion() {
    content.value.classList.toggle("active")
}

watch(slots.default, () => {
    slotItems.value = slots.default ? slots.default() : []
}, { immediate: true })      

</script>

<style lang="sass" scoped>
.acc
    overflow: hidden

.acc-content
    display: grid
    grid-template-rows: 0fr
    transition: grid-template-rows var(--duration) var(--bezier)

    :first-child
        overflow: hidden

    &.active
        grid-template-rows: 1fr

:deep(.acc-header)
    cursor: pointer
    user-select: none
</style>
