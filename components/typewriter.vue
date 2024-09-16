<template>
    <div class="typewriter">
        <div class="typewriter-content" ref="textTarget">
            <slot />
        </div>     
    </div>
</template>

<script setup>
const props = defineProps({
    speed: {
        type: String,
        default: "10"
    },

    delay: {
        type: String,
        default: "0"
    }
})
const showCursor = ref(true)
const textTarget = ref(null);
const array = ref([])
const slots = useSlots()
const text = slots.default()[0].children
const animated = ref(false)

function createTextArray() {
    for (let letter of text) {
        array.value.push(letter)
    }
    textTarget.value.innerHTML = '' 
    
}

function write() {

    if (animated.value == true) {
        return
    }

    let tagType = slots.default()[0].type
    
    // Convert the Symbol to a string for comparison
    if (typeof tagType === 'symbol') {
        tagType = tagType.toString();
    }

    // Check if the tagType is 'Symbol(v-txt)' and reassign it if true
    if (tagType === 'Symbol(v-txt)') {
        tagType = 'p';
    }


    const target = textTarget.value

    if (target) {
      

        let index = 0
        const tag = document.createElement(tagType)

        target.appendChild(tag)
        
        const interval = setInterval(() => {
            
        if (index < array.value.length) {
            
            tag.textContent += array.value[index]
        
            index++
            
        } else {
            clearInterval(interval)
        }
        }, props.speed)
    }

    animated.value = true
}


onMounted(() => {
    createTextArray()
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
            
            if (entry.intersectionRatio > 0) {
                setTimeout(() => {
                    write()
                }, parseInt(props.delay))
            }
        })
    })
    observer.observe(textTarget.value)
    
})
</script>



<style scoped lang="sass">
.cursor
    display: inline-block

</style>

