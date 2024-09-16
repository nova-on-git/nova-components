<template>
    
    <sticky-box :offsetY="offsetY">
        <sticky-content>

            <div class="blognav">
                <a 
                    class="header" 
                    v-for="header in headers" 
                    :class="{'active-header' : activeHeaderIds.includes(header.id) }" 
                    :href='`#${header.id}`'>{{ header.innerText }}
                </a>    
            </div>

        </sticky-content>
    </sticky-box>

</template>

<script setup>
const headers = ref([])
const activeHeaderIds = ref([])

const props = defineProps({
    offsetY: {
        type: Number,
        default: 0
    }
})

onMounted(async () => {
    initHeaders()
    initObservers()
})

function initHeaders() {
    const allHeadingsWithId = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')

    allHeadingsWithId.forEach((header) => {
        header.style.scrollMarginTop = '50px'
        headers.value.push(header)

    })
}

function initObservers() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeHeaderIds.value.push(entry.target.id)
            } else if (!entry.isIntersecting && activeHeaderIds.value.includes(entry.target.id)) {
                activeHeaderIds.value = activeHeaderIds.value.filter(id => id !== entry.target.id)
            }
        })
    }, observerOptions)

    headers.value.forEach(header => {
        observer.observe(header)
    })
}

</script>

<style lang='sass' scoped>


.blognav
    display: flex
    flex-direction: column

</style>