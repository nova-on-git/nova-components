<template>
    <div class="breadcrumbs">

        <anchor 
            v-for="(link, index) in path"
            :to="link.url"
            :key="index"
        >
            <div :class="{'hover': index != path.length - 1, 'no-link': index === path.length - 1}">{{ link.name }}</div>

            <span 
                v-if="index != path.length - 1"
                class="delimiter"
            >
                {{ props.delimiter }}
            </span>
        </anchor>    

    </div>
</template>

<script setup lang="ts">
const router = useRouter() 

const props = defineProps({
    id: "breadcrumbs",
    delimiter: {
        type: String,
        default: "/"
    },
    links: {
        type: Array as () => Array<{ name: string, url: string }>,
        default: () => []
    }
})


const path = computed(() => {
    
    if (props.links.length > 0) return props.links

    const currentPath = router.currentRoute.value.path
    const segments = currentPath.split(props.delimiter).filter(segment => segment)

    return segments.map((segment, index) => ({
        name: segment,
        url: `/${segments.slice(0, index + 1).join(props.delimiter)}` 
    }))
})

</script>

<style lang='sass' scoped>
.breadcrumbs
    display: flex
    gap: 5px
    text-transform: capitalize
    font-size: 0.9rem
    margin-bottom: 5px
    opacity: 0.8

    .no-link
        cursor: auto
        user-select: auto

    .hover
        &:hover
            text-decoration: underline 

.delimiter
    opacity: 0.7
</style>