<template>
    <Transition name="fade">
        <div v-if="!active" class="message" ref="message" :class="props.preset">
            <Icon v-if="props.preset" :icon='icon' width='25' />
            <slot></slot>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
    preset: 'success' | 'danger'
}>()

const icon = computed(() => {
    switch (props.preset) {
        case "success":
            return 'teenyicons:tick-circle-outline'
        case "danger":
            return 'solar:danger-circle-linear'
        default:
            break;
    }
})
const message = ref<HTMLElement | null>(null)

const active = computed(() => {
    return message.value ? message.value.classList.contains('active') : false
})

</script>

<style lang='sass' scoped>
.message
    position: fixed
    display: flex
    gap: 15px
    align-items: center
    left: 50%
    transform: translateX(-50%)
    background: red
    bottom: -100%
    // bottom: 25px
    transition: opacity 0.5s ease, bottom 0.5s ease

    h5
        text-transform: uppercase
        font-size: 1.2rem
        font-weight: bold
        
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
        opacity: 1
        bottom: 25px

.fade-enter-active,
.fade-leave-active
    transition: opacity 0.5s ease, bottom 0.5s ease

.fade-enter
    opacity: 0

.fade-leave-to /* .fade-leave-active in <2.1.8 */
    opacity: 0
</style>
