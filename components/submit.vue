<template>

    <btn 
        :useParentSlots="true" 
        type='' 
        class="submit" 
        @click="$emit('submit')"
        :loading="props.loading"    
    >
        <component v-for="(slot, index) in slotItems" :key="index" :is="slot"/>
    </btn>
</template>

<script setup>
const emits = defineEmits(['submit'])
const props = defineProps({
    id: "submit",
    loading: {
        type: Boolean,
        default: false
    }
})
const slots = useSlots()

const slotItems = computed(() => {
    return slots.default()
})


onMounted(() => {
})
</script>

<style lang='sass' scoped>

</style>