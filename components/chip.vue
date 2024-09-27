<template>
    <mflex :class="type" class="chip">
        <slot />
    </mflex>
</template>

<script>
import { defineComponent } from "vue"

/** This is my nice component documentation */
export default defineComponent({
    name: "chip",
    setup() {
        // your code
    },
})
</script>

<style lang="sass" scoped>
.chip
    font-size: 1.1rem

    &.border
        border: 1px solid white
</style>
