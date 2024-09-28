<!-- @PopDoc
 # Field  wafafddddwwwaaddawdsdxda
 A description of the component, how it works, and what it's used for. Describe @important things that the user should know about the component. 
 
 ## Props 
 /** 
  * The `exampleProp` prop is an example of a prop that you can pass to the component. Use this format to describe the prop. 
  */ 
 exampleProp?: string; 
 
 ## Emits 
 - exampleEmit: (value: any) => void. emitted when an example event happens 
 
 ## Slots 
 - example list of slotfffffffffs 
 
 ## Examples 
 ```vue 
<script lang="ts" setup> 
 
</script> 
 
<template>
 <div>Test</div> 
</template> 
 ``` 
 
 -->
<template>
    <div class="field" :class="{ error: error }">
        to="../../veloris-cms/components"
        <input v-bind="$attrs" @input="handleInput" @blur="handleBlur" v-model="modelValue" />{{
            error
        }}
    </div>
</template>

<script setup lang="ts">
const modelValue = ref("")
const error = ref<boolean>(false)
// Define the props interface
interface Props {
    /** Validator function for the input. */
    validator?: (value: string) => boolean

    /** Defines when the validation function will run. */
    validateOn?: "input" | "blur"
}

// Define the emit types
interface Emits {
    /** Emit an event when the model value changes. */
    (event: "update:modelValue", value: string): void
    /** Emit an event when the error state changes. */
    (event: "update:error", error: boolean): void
}
// Define props using the Props interface
const props = defineProps<Props>()

// Define emits using the Emits interface
const emit = defineEmits<Emits>()

watch(error, (newValue) => {
    emit("update:error", newValue)
})

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
</script>

<style lang="sass" scoped>

.field
    margin: 50px
    input
        background: inherit


    &.error
        outline: 1px solid rgba(255, 0, 0, 0.4)
</style>
