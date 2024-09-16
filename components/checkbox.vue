<template>

    <nova-input 
        id="checkbox"
        name="checkbox"
        type="checkbox"
        v-model="input"
        @input="$emit('input', $event)"
        :formId="formId"
        :parentSlots="slots"
        :validation="props.validation"
        errorMessage="Email looking good"
        successMessage="Not a valid email"
    />

</template>

<script setup>
const input = ref("")
// const emits = defineEmits(['input'])
const slots = useSlots()

const props = defineProps({
    id: "checkbox",
    formId: [Number, String],
    validation: {
        type: [Boolean, String],
        default: true
    },
})
</script>

<style lang='sass' scoped>

</style>