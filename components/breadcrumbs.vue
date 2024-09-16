<template>
    <div class="breadcrumbs">

        <anchor 
            v-for="(link, index) in props.links"
            :to="link.url"
        >
            <div :class="{'hover': index != props.links.length - 1, 'no-link': index === props.links.length - 1}">{{ link.name }}</div>

            <span 
                v-if="index != props.links.length - 1"
                class="delimiter"
            >
                {{ props.delimiter }}
            </span>
        </anchor>    

    </div>
</template>

<script setup>
const props = defineProps({
    id: "breadcrumbs",
    delimiter: {
        type: String,
        default: "/"
    },
    links: Array
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