<template>
    <cflex>
        <div class="pages">
            <component :is="item" v-for="(item, index) in activeCards" :key="index" />
        </div>

        <div class="pagination-controls">
            <div :class="{'invisible': currentPage === 1 }"  @click="pagedown">
                <slot name="left">
                    <button><Icon icon='material-symbols:arrow-back-rounded' /></button>
                </slot>
            </div>

            <rflex class="numbers">
                <div v-for="index in totalPages" :key="index">
                    <button 
                        :class="{ 'active-page-number': currentPage === index }" 
                        v-if="shouldShowButton(index)" 
                        @click="changePage(index)">
                        {{ index }}
                    </button>
                    <span v-else-if="shouldShowEllipsis(index)">..</span>
                </div>
            </rflex>

            <div :class="{' invisible' : currentPage === totalPages}" type="" @click="pageup">
                <slot name="right">
                    <button><Icon icon='material-symbols:arrow-forward-rounded' /></button>
                </slot>
                
            </div>     
        </div>
    </cflex>
</template>

<style lang="sass" scoped>
.pages
    display: flex
    gap: 25px
    flex-wrap: wrap
    justify-content: center

.pagination-controls
    display: flex
    align-items: center
    justify-content: center
    gap: 25px
    
    user-select: none
    

.numbers
    display: flex
    justify-content: center
    min-width: 200px
    margin-top: 25px

button, .numbers span
    width: 30px 
    text-align: center

.invisible
    visibility: hidden
</style>

<script setup>
import { Icon } from '@iconify/vue'
const slots = useSlots()
const slotItems = ref([])

const props = defineProps({
    itemsPerPage: {
        type: String,
        default: "4",
    },
})

const currentPage = ref(1)

onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []
})
function pagedown() {
    if (currentPage.value != 1) {
        currentPage.value -= 1
    }
}

function changePage(pageNumber) {
    currentPage.value = pageNumber
}

function pageup() {
    if (currentPage.value < Math.ceil(slotItems.value.length / Number(props.itemsPerPage))) {
        currentPage.value += 1
    }
}
const activeCards = computed(() => {
    return slotItems.value.slice(
        (currentPage.value - 1) * Number(props.itemsPerPage),
        currentPage.value * Number(props.itemsPerPage)
    )
})
const totalPages = computed(() => {
    return Math.ceil(slotItems.value.length / Number(props.itemsPerPage))
})

function shouldShowButton(index) {
    return index === 1 ||
           index === totalPages.value ||
           Math.abs(currentPage.value - index) <= 1 ||
           (index >= 1 && index <= 2) ||
           (index > totalPages.value - 2 && index <= totalPages.value);
}

function shouldShowEllipsis(index) {
    return index === 3 && currentPage.value > 4 || 
           index === totalPages.value - 2 && currentPage.value < totalPages.value - 3;
}
</script>
