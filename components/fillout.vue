<!-- fillout.vue -->
<template>
    <form class="fillout" @submit.prevent="null" :class="{ 'form-loading': props.loading }">

            <component 
                v-for="(component, index) in $slots.default()"
                :is="component"
                :key="index"
                :formId="formId"
                :validationBehaviour="props.validationBehaviour"
                ref="componentRefs"
                @input="updateFormData(), formStore.triggerValidation(formId, 'input')"
                @submit="formStore.triggerValidation(formId, 'submit')"
            />

            <loader v-if="props.loading"/>

    </form>

</template>

<script setup>
import { useFormStore } from '~/stores/forms'

const emit = defineEmits(['update:modelValue'])
const formStore = useFormStore()
const formId = generateId()

const props = defineProps({
    loading: [Boolean, String],
    validationBehaviour: String
})

function updateFormData() {
    emit('update:modelValue', formStore.getForm(formId))
}

onBeforeUnmount(() => {
    formStore.clearForm(formId)
})

</script>

<style lang='sass' scoped>
.loader
    position: absolute
    top: 50%
    left: 46%
    transform: translate(-50%, -50%)
    z-index: 5

.fillout
    position: relative

    &.form-loading
        &::after
            content: ""
            height: 100%
            width: 100%
            position: absolute
            top: 0
            left: 0
            background: rgba(255,255,255, 0.8)
        


    &.default
        display: flex
        flex-direction: column
        width: min-content
        gap: 25px

    &.light
        background: white
        align-items: center
        padding: 50px 40px
        

</style>