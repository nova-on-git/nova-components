<template>
    <div class="drag-div" id="dragDiv" >
        <slot />
    </div>
</template>

<script setup>

let dragDiv
let isDragging
let offsetX 
let offsetY

function onMouseMove(e) {
    if (isDragging) {
        dragDiv.style.left = `${e.clientX - offsetX + window.scrollX}px`
        dragDiv.style.top = `${e.clientY - offsetY + window.scrollY}px`
    }
}

onMounted(() => {
    dragDiv = document.getElementById('dragDiv')

    document.addEventListener('mouseup', () => {
        isDragging = false
        document.removeEventListener('mousemove', onMouseMove)
    })

    dragDiv.addEventListener('mousedown', (e) => {
        isDragging = true
        offsetX = e.clientX - dragDiv.getBoundingClientRect().left 
        offsetY = e.clientY - dragDiv.getBoundingClientRect().top
        document.addEventListener('mousemove', onMouseMove)
    })
})
</script>

<style lang='sass' scoped>
.drag-div
    position: absolute

</style>