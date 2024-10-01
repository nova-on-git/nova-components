<!-- @Nova
### Field 
A drop in replacement for the input tag.

Pass a validation function to the component for automatic error state handling.

 -->
<template>
    <div class="field" :class="{ error: error }">
        <input v-bind="$attrs" @input="handleInput" @blur="handleBlur" v-model="modelValue" />

        <!-- Error -->
        <component
            class="error-component"
            v-if="error"
            v-for="(component, index) in errorComponents"
            :is="component"
            :key="index"
        />
    </div>
</template>

<script setup lang="ts">
const error = ref<boolean>(false)
const slots = useSlots()

interface Props {
    /** Validator function to handle error state */
    validator?: (value: string) => boolean

    /** Defines when the validation function will run. */
    validateOn?: "input" | "blur"

    modelValue: string
}

interface Emits {
    (event: "update:modelValue", value: string): void

    /** Hook for error state */
    (event: "update:error", error: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const modelValue = ref(props.modelValue)

watch(error, (newValue) => {
    emit("update:error", newValue)
})

watch(
    () => props.modelValue,
    (newVal) => {
        modelValue.value = newVal
    }
)

function handleBlur() {
    if (!props.validator) return

    if (props.validateOn === "blur") {
        error.value = props.validator(modelValue.value)
    }
}

function handleInput() {
    emit("update:modelValue", modelValue.value)

    if (!props.validator) return

    if (!props.validateOn) {
        error.value = props.validator(modelValue.value)
    } else if (props.validateOn === "input") {
        error.value = props.validator(modelValue.value)
    }
}

const components = computed(() => {
    // Get the list of components from slots
    if (!slots.default || typeof slots.default !== "function") return []

    // Get the components from the default slot, which should return an array of VNodes
    const componentsList = slots.default() as VNode[]

    // Define the types you want to filter out
    const excludedTypes = ["fore", "aft", "loader", "drop", "tooltip"]

    // Filter out specific components based on their type.__name
    const filteredComponents = componentsList.filter((component: VNode) => {
        const name = component.type && (component.type as any).__name
        return !excludedTypes.includes(name)
    })

    return filteredComponents
})

const errorComponents = computed(() => {
    if (!slots.default || typeof slots.default !== "function") return []
    const componentsList = slots.default() as VNode[]

    return componentsList.filter((component) => {
        return component.type.__name === "error"
    })
})
</script>

<style lang="sass" scoped>

.field
    position: relative
    input
        width: 100%
        background: transparent

        &:focus
            outline: none

    &.error
        outline: 1px solid rgba(230, 0, 0, 0.8)

:deep(.error-component)
    position: absolute !important
    bottom: -30px !important
    left: 0px
</style>
