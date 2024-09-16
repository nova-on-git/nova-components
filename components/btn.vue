<template>
    <button @click="toggleDrop(), toggleModal()" class="btn">

        <!-- Loader -->
        <component 
            v-if="props.loading"
            v-for="(component, index) in loaderComponents" 
            :is="component" :key="index" 
        />
        <loader v-if="props.loading && !loaderComponents.length" color="white" width="20px"/>

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
            class="drop"
            v-show="!props.loading && dropActive" 
            v-for="(component, index) in dropComponents" 
            :is="component" 
            :key="index"
        />
    </button>



</template>

<script setup>

const slots = useSlots()
const dropActive = ref(false)

const props = defineProps({
    id: "btn",
    type: String,
    useParentSlots: {
        type: Boolean,
        default: false
    },

    // Toggles a given ID //
    modal: {
        type: String,
        default: "",
    },

    loading: {
        type: Boolean,
        default: false
    }
})


const components = computed(() => {
    // Get the list of components from slots
    let componentsList = props.useParentSlots 
        ? slots.default()[0]?.children || []
        : slots.default() || [];
    
    // Filter out 'fore', 'aft', and 'loader' components
    const filteredComponents = componentsList.filter((component) => {
        return !(
            component.type?.__name === 'fore' ||
            component.type?.__name === 'aft' ||
            component.type?.__name === 'loader' ||
            component.type?.__name === 'drop' 

        );
    });
    
    return filteredComponents;
});
const dropComponents = computed(() => {
    let componentsList

    if (props.useParentSlots) {
        componentsList = slots.default()[0]?.children || []
    } else {
        componentsList = slots.default() || []
    }

    return componentsList.filter((component) => {
        return component.type?.__name === 'drop'
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
        return component.type?.__name === 'fore'
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
        return component.type?.__name === 'aft'
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
        return component.type?.__name === 'loader'
    })
})

const toggleModal = () => {
    const modal = document.getElementById(props.modal)
    if (modal) {
        if (modal.style.display === "block") {
            modal.style.display = "none"
        } else {
            modal.style.display = "block"
        }
    }
}

function toggleDrop() {
    dropActive.value = !dropActive.value
}

// console.log(dropComponents.value[0].props)
</script>



<style scoped lang="sass">
.btn
    position: relative
    display: flex
    align-items: center
    gap: 5px

    padding: 4px 20px
    border-radius: 5px
    background: inherit
    border: 1px solid grey
    cursor: pointer
    user-select: none
    color: inherit
    font-size: 1rem
    
    &:active
        transform: translate(1px, 1px)  

.drop
    position: absolute
    background: pink
</style>
