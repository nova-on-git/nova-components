<!-- email.vue -->
<template>

    <nova-input 
        id="confirmPassword"
        name="confirm-password" 
        type="password"
        v-model="input"
        @input="$emit('input', $event)"
        :validation="props.validation"
        :parentSlots="slots"
        :placeholder="$attrs.placeholder || 'Confirm Password'"
        errorMessage="Passwords do not match"
        successMessage="Password looks good."
        :validateFunction="formStore.doPasswordsMatchFunction(props.formId)"
        :validateFunctionData="{
            passwordStrength: props.strength,
            formId: props.formId,
        }"

        :formId="formId"
    />

</template>

<script setup>
import { useFormStore } from '../stores/forms'


const formStore = useFormStore()
const input = ref("")
const emits = defineEmits(['input'])
const slots = useSlots()

const props = defineProps({
    id: "confirmPassword",
    formId: [Number, String],
    validation: {
        type: Boolean,
        default: true
    },
    strength: {
        type: Number,
        default: 1
    },
})


</script>
