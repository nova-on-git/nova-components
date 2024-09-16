<template>
    <div class="burger" @click="handleClick" :class="{ 'active': active }" >
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script setup>
const active = ref(false)

const props = defineProps({
    color: {
        type: String,
        default: "black"
    },
    width: {
        type: String,
        default: "24px"
    },
    weight: {
        type: String,
        default: "2px"
    },
    duration: {
        type: String,
        default: "0.3s"
    },
    manualToggle: {
        type: String,
        default: "false"
    }
})
function handleClick() {
    if (props.manualToggle) {
        return
    }
    toggleActive()
}
function toggleActive() {

    active.value = !active.value
}
defineExpose({
    toggleActive
})

</script>

<style lang='sass' scoped>
.burger
    position: relative
    width: v-bind(width)
    height: v-bind(width)
    user-select: none
    cursor: pointer
    margin: 10px

span
    position: absolute
    left: 0
    background: v-bind(color)
    height: v-bind(weight)
    width: v-bind(width)
    border-radius: 2px

    &:nth-child(1)
        top: calc(0px + 10%)
        left: -20%
        transition: v-bind(duration) rotate
        transform-origin: top right
        rotate: 0deg

    &:nth-child(2)
        left: -20%
        transform-origin: right
        transition: calc(v-bind(duration) / 2) transform
        top: calc((v-bind(width) / 3) + 10%)

    &:nth-child(3)
        left: -20%
        top: calc((v-bind(width) / 3 * 2) + 10%)
        transition: v-bind(duration) rotate
        transform-origin: bottom right
        rotate: 0deg

.burger
    &.active
        span
            &:nth-child(1)
                rotate: -45deg

            &:nth-child(2)
                transform: scale(0)

            &:nth-child(3)
                rotate: 45deg

</style>
