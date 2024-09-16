<template>
    <nova-input 
        id="name"
        :required="required"
        type="text" 
        name="name" 
        @input="$emit('input', $event)" 
        v-model="input"
        :parentSlots="slots"
        :validation="validation"
        :placeholder="$attrs.placeholder || 'Name'"
    />
</template>

<script setup>
const success = ref(false)
const input = ref("")

const emits = defineEmits(['input'])
const slots = useSlots()

const props = defineProps({
    id: "name",
    validation: {
        type: Boolean,
        default: false
    },
    required: Boolean
})

</script>

<style lang='sass' scoped>

</style>