<template>
    <div class="grid" 
        :style="gridStyle"
    >

        <component 
        v-for="(component, index) in rows" 
        :is="component" 
        :key="index" 
        />

        <component 
        v-for="(component, index) in columns" 
        :is="component" 
        :key="index" 
        />
        
    </div>
</template>

<script setup>
const slots = useSlots()



const columns = computed(() => {
    return slots.default().filter((component) => {
        return component.type?.__name === 'column'
    })
})


const rows = computed(() => {
    return slots.default().filter((component) => {
        return component.type?.__name === 'row'
    })
})

const gridStyle = computed(() => {
  const numRows = rows.value.length
  const numColumns = columns.value.length
  return {
    'grid-template-rows': `repeat(${numRows}, 1fr)`,
    'grid-template-columns': `repeat(${numColumns}, 1fr)`
  }
})

console.log(rows.value)
</script>

<style lang='sass' scoped>
.grid
    display: grid
</style>