<template>
    <transition name="alert">

        <div 
            v-if="alertActive"
            class="alert"
        >
            <slot />
            
        </div>

    </transition>

  
</template>

<script setup>
const alertActive = ref(false)

const props = defineProps({
    id: "alert",
    duration: {
        type: Number,
        default: 2
    }
})

const open = () => {
    alertActive.value = true
}

const close = () => {
    alertActive.value = false
}

const trigger = () => {
    alertActive.value = true

    setTimeout(() => {
        alertActive.value = false    
        console.log("triggered")
    }, props.duration * 1000)
    
}

defineExpose({
    open,
    close,
    trigger
})
</script>

<style lang='sass' scoped>
.alert 
    position: fixed
    left: 50%
    transform: translateX(-50%)
    bottom: 25px

    background: green
    padding: 25px
    border-radius: 10px
    color: white

.alert-enter-from, .alert-leave-to
    opacity: 0
    bottom: -100%

.alert-enter-active, .alert-leave-active
    transition: opacity 0.1s, bottom 0.14s

.alert-enter-to, .alert-leave-from
    opacity: 1
    bottom: 25px

</style>