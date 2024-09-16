<!-- email.vue -->
<template>

    <nova-input 
        id="email"
        name="email" 
        :validateFunction="isEmailValid"
        @input="$emit('input', $event)" 
        v-model="input"
        :formId="formId"
        :parentSlots="slots"
        :validation="props.validation"
        errorMessage="Email looking good"
        successMessage="Not a valid email"
    />

</template>

<script setup>
const input = ref("")

const emits = defineEmits(['input'])
const slots = useSlots()

const props = defineProps({
    id: "email",
    formId: [Number, String],
    validation: {
        type: [Boolean, String],
        default: true
    },
})


</script>
