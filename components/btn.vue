<!-- @Nova 
Adds extra functionality to the `<button>` tag.

#### Slots 
```
<btn>
<fore /> 
<slot /> 
<aft /> 
<loader /> 
<drop /> 
<tooltip /> 
</btn>




``` 
-->
<template>
    <button
        ref="btn"
        @click="handleClick()"
        @mouseover="tooltipActive = true"
        @mouseleave="tooltipActive = false"
        class="btn"
        :class="preset"
    >
        <anchor v-show="false" :to="props.to" />
        <!-- Loader -->
        <component
            v-if="props.loading"
            v-for="(component, index) in loaderComponents"
            :is="component"
            :key="index"
        />
        <loader v-if="props.loading && !loaderComponents.length" color="white" width="20px" />

        <!-- Fore -->
        <component
            v-if="!props.loading"
            v-for="(component, index) in foreComponents"
            :is="component"
            :key="index"
        />

        <!-- Content -->
        <component
            v-if="!props.loading && components.length"
            v-for="(component, index) in components"
            :is="component"
            :key="index"
        />
        <div v-if="!props.loading && !components.length">Submit</div>

        <!-- Aft -->
        <component
            v-if="!props.loading"
            v-for="(component, index) in aftComponents"
            :is="component"
            :key="index"
        />

        <!-- Drop -->
        <component
            @click.stop
            class="drop"
            ref="drop"
            v-show="!props.loading && dropActive"
            v-for="(component, index) in dropComponents"
            :is="component"
            :key="index"
        />
        <!-- Tooltip -->
        <component
            @click.stop
            class="tooltip"
            ref="tooltip"
            v-show="!props.loading && tooltipActive"
            v-for="(component, index) in tooltipComponents"
            :is="component"
            :key="index"
        />
    </button>
</template>

<script setup lang="ts">
import { toggleModal } from "../composables/modal"
import { onClickOutside } from "@vueuse/core"

const btn = ref(null)
const drop = ref(null)
const router = useRouter()
const slots = useSlots()
const dropActive = ref(false)
const tooltipActive = ref(false)

interface Props {
    compId?: "btn"

    /** A router link */
    to?: string

    /** Preset styles for the button */
    preset?: "primary" | "secondary" | "success" | "danger" | "info" | "warning" | "light" | "dark"
    useParentSlots?: boolean

    /** Toggles a modal with a given ID */
    modal?: string

    /** Loading state */
    loading?: boolean
}

const props = defineProps<Props>()

function handleClick() {
    toggleDrop()

    if (props.modal) {
        toggleModal(props.modal)
    }

    if (props.to) {
        router.push(props.to)
    }
}

const handleOutsideClick = (event: Event) => {
    if (!dropActive.value) return

    const isClickInsideButton = btn.value && btn.value.contains(event.target)

    if (!isClickInsideButton) {
        console.log("detect")
        closeDrop()
    }
}

onClickOutside(btn, handleOutsideClick)

const components = computed(() => {
    // Get the list of components from slots
    let componentsList = props.useParentSlots
        ? slots.default()[0]?.children || []
        : slots.default() || []

    // Filter out 'fore', 'aft', and 'loader' components
    const filteredComponents = componentsList.filter((component) => {
        return !(
            component.type?.__name === "fore" ||
            component.type?.__name === "aft" ||
            component.type?.__name === "loader" ||
            component.type?.__name === "drop" ||
            component.type?.__name === "tooltip"
        )
    })

    return filteredComponents
})
const tooltipComponents = computed(() => {
    let componentsList

    if (props.useParentSlots) {
        componentsList = slots.default()[0]?.children || []
    } else {
        componentsList = slots.default() || []
    }

    return componentsList.filter((component) => {
        return component.type?.__name === "tooltip"
    })
})
const dropComponents = computed(() => {
    let componentsList

    if (props.useParentSlots) {
        componentsList = slots.default()[0]?.children || []
    } else {
        componentsList = slots.default() || []
    }

    return componentsList.filter((component) => {
        return component.type?.__name === "drop"
    })
})
const foreComponents = computed(() => {
    let componentsList

    if (props.useParentSlots) {
        componentsList = slots.default()[0]?.children || []
    } else {
        componentsList = slots.default() || []
    }

    return componentsList.filter((component) => {
        return component.type?.__name === "fore"
    })
})
const aftComponents = computed(() => {
    let componentsList

    if (props.useParentSlots) {
        componentsList = slots.default()[0]?.children || []
    } else {
        componentsList = slots.default() || []
    }

    return componentsList.filter((component) => {
        return component.type?.__name === "aft"
    })
})
const loaderComponents = computed(() => {
    let componentsList

    if (props.useParentSlots) {
        componentsList = slots.default()[0]?.children || []
    } else {
        componentsList = slots.default() || []
    }

    return componentsList.filter((component) => {
        return component.type?.__name === "loader"
    })
})

function toggleDrop() {
    dropActive.value = !dropActive.value
}
function closeDrop() {
    dropActive.value = false
}
</script>

<style scoped lang="sass">
.btn
    position: relative
    display: flex
    align-items: center
    gap: 5px

    padding: 2px 15px
    min-height: 25px
    min-width: 2rem
    border-radius: 2px
    background: inherit
    border: 1px solid grey
    cursor: pointer
    user-select: none
    color: inherit
    font-size: 1rem


    &.primary
        background: #007bff
        border-color: #007bff
        color: white

        &:hover
            background: lighten(#007bff, 10%)
            border-color: lighten(#007bff, 10%)

    &.secondary
        background: #6c757d
        border-color: #6c757d
        color: white

        &:hover
            background: lighten(#6c757d, 10%)
            border-color: lighten(#6c757d, 10%)

    &.success
        background: #28a745
        border-color: #28a745
        color: white

        &:hover
            background: lighten(#28a745, 10%)
            border-color: lighten(#28a745, 10%)

    &.danger
        background: #dc3545
        border-color: #dc3545
        color: white

        &:hover
            background: lighten(#dc3545, 10%)
            border-color: lighten(#dc3545, 10%)

    &.warning
        background: #ffc107
        border-color: #ffc107
        color: black

        &:hover
            background: lighten(#ffc107, 10%)
            border-color: lighten(#ffc107, 10%)

    &.info
        background: #17a2b8
        border-color: #17a2b8
        color: white

        &:hover
            background: lighten(#17a2b8, 10%)
            border-color: lighten(#17a2b8, 10%)

    &.light
        background: #f8f9fa
        border-color: #f8f9fa
        color: black

        &:hover
            background: lighten(#f8f9fa, 10%)
            border-color: lighten(#f8f9fa, 10%)

    &.dark
        background: #343a40
        border-color: #343a40
        color: white

        &:hover
            background: lighten(#343a40, 10%)
            border-color: lighten(#343a40, 10%)
</style>
