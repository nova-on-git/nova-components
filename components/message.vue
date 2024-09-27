<template>
    <Transition name="fade">
        <div v-if="active" class="message" :class="[preset, { active: active }]">
            <Icon v-if="preset" :icon="icon" width="25" />
            <slot></slot>
        </div>
    </Transition>
</template>

<script setup>
import { ref, computed, defineExpose } from "vue"
import { Icon } from "@iconify/vue"

const props = defineProps({
    preset: String, // "success" or "danger"
})

const active = ref(true) // Controls the visibility of the message

// Icon computation based on preset
const icon = computed(() => {
    switch (props.preset) {
        case "success":
            return "teenyicons:tick-circle-outline"
        case "danger":
            return "solar:danger-circle-linear"
        default:
            return null
    }
})

// Expose a method to close the message (hide it)
function close() {
    active.value = false
}

defineExpose({
    close,
})
</script>

<style lang="sass" scoped>
.message
    position: fixed
    display: flex
    gap: 15px
    align-items: center
    left: 50%
    transform: translateX(-50%)
    bottom: -100%
    opacity: 1
    z-index: 9999999
    transition: opacity 0.5s ease, bottom 0.5s ease

    &.success
        background: lightgreen
        border: 1px solid green
        padding: 10px 30px 10px 20px
        border-radius: 10px
        color: darkgreen


    &.danger
        background: red
        border: 1px solid red
        padding: 10px 30px 10px 20px
        border-radius: 10px
        color: pink


    &.active
        bottom: 15px
        opacity: 1



.fade-enter-active,
.fade-leave-active
    bottom: 15px
    transition: opacity 0.5s ease, bottom 0.5s ease


.fade-enter, .fade-leave-to
    opacity: 0
    bottom: -100%
</style>
