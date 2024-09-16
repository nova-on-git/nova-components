<template>
    <div 
        :class="{
            'disabled': props.disabled,
            '_text-input-box': ['text', 'password'].includes(props.type),
            '_checkbox-input-box': ['checkbox'].includes(props.type)
        }"
    >

        <!-- Label -->
        <tag v-if="tagComponents == false" :for="props.id" class="tag">{{ props.id }}:</tag>
        <component 
            v-else
            v-for="(component, index) in tagComponents"
            :is="component"
            :key="index"
            class="tag"
        />

        <div class="input-container" 
            :class="{
                'success': success && _validation && showValidation,
                'error': success === false && _validation && showValidation,

            }"
        >
            <!-- fore -->
            <component 
                v-for="(component, index) in foreComponents"
                :is="component"
                :key="index"
            />

            <!-- Input -->
            <input 
                v-bind="$attrs"
                :type="props.type" 
                :name="props.id"
                @input="$emit('input', $event), simEmit(), updateStore($event)" 
                v-model="input"
            >

                
            <component 
                v-if="props.loading"
                v-for="(component, index) in loaderComponents"
                :is="component" 
                :key="index" 
            />

            <loader v-if="props.loading && !loaderComponents.length" width="15px"/>
            
            <!-- aft -->
            <component 
                v-if="!props.loading"
                v-for="(component, index) in aftComponents"
                :is="component" 
                :key="index" 
            />
        </div>

        <!-- Success -->
        <Success v-if="!successComponents.length && success && _validation && showValidation">Password looks great</Success>
        <component
            v-if="success && props.validation" 
            v-for="(component, index) in successComponents"
            :is="component" 
            :key="index" 
        />

        <!-- Error -->
        <error v-if="!errorComponents.length && !success && _validation && showValidation" >This is a default message</error>
        <component
            v-if="!success && props.validation"
            v-for="(component, index) in errorComponents"
            :is="component" 
            :key="index" 
        />

    </div>
</template>

<script setup>
const input = ref('')
const showValidation = ref(false)
const formStore = useFormStore()
const componentId = generateId()
const emits = defineEmits(['input'])
let initialized = false

function simEmit() {
    console.log("init emitting")
}

const props = defineProps({
    id: String,
    loading: Boolean,
    validateFunction: Function,
    validateFunctionData: {},
    validation: [Boolean, String],
    validationBehaviour: String,
    disabled: Boolean,
    parentSlots: {},
    successMessage: String,
    errorMessage: String,
    formId: [Number, String],
    
    hideValidState: {
        type: Boolean,
        default: true
    },

    type: {
        type: String,
        default: "text"
    },
})

watch(formStore.getFormState(props.formId), () => {
    validateInput()
})

const success = computed(() => {
    return formStore.getValidState(props.formId, props.id, componentId)
})

function initComponent() {
    if (initialized) return
    initialized = true

    formStore.updateField(props.formId, componentId, props.id, "")
    emits('input')
}

const _validation = computed(() => {
    if (typeof props.validation === 'boolean') {
        return props.validation
    }
    if (typeof props.validation === 'string') {
        return props.validation.toLowerCase() === 'true'
    }
    return true
})


function updateStore(event) {
    formStore.updateField(props.formId, componentId, props.id, event.target.value)
}

const tagComponents = computed(() => {
    return (props.parentSlots.default && typeof props.parentSlots.default === 'function')
        ? props.parentSlots.default().filter((component) => component.type.__name === 'tag')
        : []
})

const foreComponents = computed(() => {
    return (props.parentSlots.default && typeof props.parentSlots.default === 'function')
        ? props.parentSlots.default().filter((component) => component.type.__name === 'fore')
        : []
})

const loaderComponents = computed(() => {
    return (props.parentSlots.default && typeof props.parentSlots.default === 'function')
        ? props.parentSlots.default().filter((component) => component.type.__name === 'loader')
        : []
})

const aftComponents = computed(() => {
    return (props.parentSlots.default && typeof props.parentSlots.default === 'function')
        ? props.parentSlots.default().filter((component) => component.type.__name === 'aft')
        : []
})

const successComponents = computed(() => {
    return (props.parentSlots.default && typeof props.parentSlots.default === 'function')
        ? props.parentSlots.default().filter((component) => component.type.__name === 'success')
        : []
})

const errorComponents = computed(() => {
    return (props.parentSlots.default && typeof props.parentSlots.default === 'function')
        ? props.parentSlots.default().filter((component) => component.type.__name === 'error')
        : []
})

onMounted(() => {
    initComponent()
})

function validateInput() {
    if (props.validationBehaviour === 'none' || !props.validation || !props.validateFunction) {
        showValidation.value = false
        return
    }

    const eventType = formStore.getEventType(props.formId)

    if (props.validationBehaviour === 'eager') {
        showValidation.value = true
    }

    if (props.validationBehaviour === 'lazy' && eventType === 'submit') {
        showValidation.value = true
    }
    
    formStore.resetFormValidationState(props.formId)

    const state = props.validateFunction(input.value, props.validateFunctionData)
    formStore.updateFieldState(props.formId, props.id, componentId, state)
}

</script>

<style lang='sass' scoped>
._text-input-box
    .input-container
        display: flex
        position: relative
        align-items: center
        gap: 5px
        background: inherit
        width: min-content
        padding: 10px 10px
        margin: 5px 0
        border-radius: 3px
        border: 1px solid lightgrey
        width: 300px
        
        &:focus-within
            // border-color: transparentize($primary, 0.5)

        input
            flex-grow: 1
            background: inherit
            box-shadow: none
            border: none

            &:focus 
                outline: none



        &.success
            border: 1px solid green

        &.error
            border: 1px solid red

._checkbox-input-box
    display: flex

    .input-container
        display: flex
        gap: 5px
    
.input-box
    position: relative

    &.disabled
        &::after
            z-index: 2
            content: ""
            height: 100%
            width: 100%
            position: absolute
            top: 0
            left: 0
            background: rgba(255,255,255,0.75)

.tag
    text-transform: capitalize
</style>