<template>
  <div class="tabs">

    <div class="tab-headers">
        <component :is="item.component" v-for="(item, index) in headers" :key="index" :class="{ 'active': index === activeTab }" @click="changeTab(index)" class="tab-header" />
    </div>

    <div class="tab-contents">
        <div v-for="(item, index) in contents">
            
            <component v-if="!transition" :is="item.component" :key="index" class="tab-content" />

            <transition :name="transition" v-else :style="{'--duration': duration}"  mode="out-in"> 
                <component v-if="index === activeTab" :is="item.component" :key="index" class="tab-content" />
            </transition>
        </div>
    </div>

    <div class="hide" ><slot /></div>

  </div>
</template>

<script setup>
const activeTab = ref(0)
const headers = reactive([])
const contents = ref([])
const props = defineProps({
    transition: {
        type: String,
        default: ""
    },
    duration: {
        type: String,
        default: "0.3s"
    }
})
const registerTab = (headerComponent, contentComponent) => {   
    headers.push({ component: headerComponent })
    contents.value.push({ component: contentComponent })
}

const changeTab = (index) => {
    activeTab.value = index
}
provide('registerTab', registerTab)
onMounted(() => {
    console.log(contents.value[activeTab.value])
})
</script>

<style lang='sass' scoped>
.tabs
    display: flex
    flex-direction: column
    flex-wrap: wrap

.tab-headers
    display: flex
    align-items: center
    gap: 25px
    cursor: pointer
    user-select: none

.tab-content
    opacity: 1
    transition: opacity var(--duration)


:deep(.tab-content)
    &.fade-enter-from, &.fade-leave-from
        transition: opacity var(--duration)
    &.fade-enter-active, &.fade-leave-active
        opacity: 0

.hide
    display: none
</style>
