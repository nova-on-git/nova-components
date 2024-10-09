<!-- @Nova 
### Search
A quick search input.

To change the background color use :deep(.search)
 --> 


<template>
    <div class="search" :class="{ inputTrue: searchQuery }">
        <Icon icon="material-symbols:search" width="20" color="#777" />
        <input
            v-bind="$attrs"
            type="search"
            v-model="searchQuery"
            @input="updateValue($event.target.value)"
        />
        <Icon
            class="cross-icon"
            v-if="modelValue"
            @click="clearSearch"
            icon="material-symbols:close"
            width="25"
        />
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
const searchQuery = ref("")

interface Props {
    id: string
    modelValue: string
}

const props = defineProps<Props>()


const emit = defineEmits(["update:modelValue"])

const updateValue = (value) => {
    emit("update:modelValue", value)
}
const clearSearch = () => {
    searchQuery.value = ""
    emit("update:modelValue", "")
}
</script>

<style lang="sass" scoped>
.search
    display: flex
    align-items: center
    border: 1px solid rgba(0, 0, 0, 0.15)
    background: white
    border-radius: 25px
    overflow: hidden
    padding-inline: 10px
    transition: all 0.3s
    width: 240px
    position: relative

    &.inputTrue
        width: 260px

    input
        background: inherit
        padding-inline: 5px
        padding-block: 2px
        margin: 3px
        border: none !important
        outline: none

        &:focus
            outline: none

    .cross-icon
        position: absolute
        right: 10px
        border-radius: 50%
        padding: 3px
        cursor: pointer
        &:hover
            background: rgba(0, 0, 0, 0.05)

input[type="search"]::-webkit-search-cancel-button
    -webkit-appearance: none
</style>
