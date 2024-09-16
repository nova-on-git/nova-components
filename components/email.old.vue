<!-- email.vue -->
<template>

    <!-- Label -->
    <tag v-if="tagComponents == false">Email:</tag>
    <component 
        v-else
        v-for="(component, index) in tagComponents"
        :is="component" 
        :key="index"
    />
    <div class="input-container" :class="{'success': success, 'error': !success}" >
        <!-- fore -->
        <component 
            v-for="(component, index) in foreComponents"
            :is="component" 
            :key="index" 
        />

        <!-- Input -->
        <input 
            :required="required"
            type="text" 
            name="email" 
            @input="$emit('input', $event), validate()" 
            v-model="input"
        >

        <!-- aft -->
        <component 
            v-for="(component, index) in aftComponents"
            :is="component" 
            :key="index" 
        />
    </div>

    <!-- Success -->
    <Success v-if="successComponents == false && success">This is a default message</Success>
    <component
        v-if="success"
        v-for="(component, index) in successComponents"
        :is="component" 
        :key="index" 
    />

    <!-- Error -->
    <error v-if="errorComponents == false && !success" >This is a default message</error>
    <component
        v-if="!success"
        v-for="(component, index) in errorComponents"
        :is="component" 
        :key="index" 
    />

</template>

<script setup>

const success = ref(false)
const input = ref("")

const emits = defineEmits(['input'])
const slots = useSlots()

const tagComponents = getComponentById(slots, "tag") 
const foreComponents = getComponentById(slots, "fore") 
const aftComponents = getComponentById(slots, "aft") 
const successComponents = getComponentById(slots, "success") 
const errorComponents = getComponentById(slots, "error") 

const props = defineProps({
    id: "email",
    validation: {
        type: Boolean,
        default: true
    },
    required: Boolean
})

function validate() {
    success.value = isEmailValid(input.value)
}

onMounted(() => {
    console.log(props)
})

</script>

<style lang='sass' scoped>
.input-container
    display: flex
    align-items: center
    gap: 5px
    background: grey
    width: min-content
    padding: 5px

    input
        background: inherit
        box-shadow: none
        border: none

    &.success
        border: 1px solid green
    &.error
        border: 1px solid red

        &:focus 
            outline: none


</style>