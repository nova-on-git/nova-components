<template>
    <div class="counter" :class="type">


        <button @click="decrement">
            -
        </button>

        <input class="number" v-model="internalCount" @input="onInput" :placeholder="internalCount"></input>

        <button @click="increment">
            +
        </button>


    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
const internalCount = ref(null)

const props = defineProps({
    maxValue: [Number, String],
    minValue: {
        type: [Number, String],
        default: 0
    },
    modelValue: {
        type: Number,
        default: 0,
        required: false
    },
    type: {
        type: String,
        default: "default"
    }
})

const emit = defineEmits(['update:modelValue'])

watch(() => props.modelValue, (newValue) => {
    internalCount.value = newValue
})

watch(() => internalCount.value, newValue => {
    if (newValue > props.maxValue) internalCount.value = props.maxValue
    if (newValue < props.minValue) internalCount.value = props.minValue
    emit('update:modelValue', internalCount.value);

})

function onInput(event) {
    let value = parseInt(event.target.value)
    if (!isNaN(value)) {
        if (value > props.maxValue) {
            value = props.maxValue
        } else if (value < props.minValue) {
            value = props.minValue
        }
        internalCount.value = value
    } else {
        internalCount.value = props.minValue
    }

    emit('update:modelValue', internalCount.value)
}

// Function to increment the count
function increment() {
    if (internalCount.value >= props.maxValue) return
    internalCount.value++

    emit('update:modelValue', internalCount.value)
}

// Function to decrement the count
function decrement() {
    if (internalCount.value <= props.minValue) return
    internalCount.value--

    emit('update:modelValue', internalCount.value)
}

onMounted(() => {
    internalCount.value = props.modelValue
})
</script>

<style lang='sass' scoped>

.counter
    display: flex
    align-items: center
    gap: 3px

    input
        border: none
        min-width: 15px
        max-width: 20px

        &:focus
            outline: none

    &.default
        button
            display: flex
            align-items: center
            justify-content: center
            background: rgba(0,0,0,0.05)
            border-radius: 50%
            height: 22px
            width: 22px

            font-size: 1.1rem
            line-height: 1


</style>