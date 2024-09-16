<!-- email.vue -->
<template>

    <nova-input 
        id="password"
        name="password" 
        type="password"
        v-model="input"
        errorMessage="Password is not strong enough"
        successMessage="Password looks good"
        @input="$emit('input', $event)" 
        :validateFunction="isPasswordValid"
        :validation="props.validation"
        :parentSlots="slots"
        :placeholder="$attrs.placeholder || 'Password'"
        :formId="formId"
        
        :validateFunctionData="{
            passwordStrength: props.strength,
            formId: props.formId,
        }"
    />

</template>

<script setup>

const input = ref("")
const slots = useSlots()

const props = defineProps({
    id: "password",
    
    required: Boolean,
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
