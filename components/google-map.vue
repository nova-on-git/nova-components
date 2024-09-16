<template>
    <iframe title="google map embed" class="google-map" ref="googleMap" :src="mapSource" frameborder="0"></iframe>
</template>

<script setup lang="ts">



const props = defineProps({
    address: {
        type: String,
        default: "dublin",
    },
    zoom: {
        type: [String, Number],
        default: 4
    },
    mapType: {
        type: String,
        default: 'm' // m for map, k for satellite, h for hybrid, p for terrain, r for street view
    },
    language: {
        type: String,
        default: 'en'
    },
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '400px'
    },
    border: {
        type: String,
        default: '0'
    }
});

const googleMap = ref(null)

const encodedAddress = encodeURIComponent(props.address)

const mapSource = computed(() => {
  return `https://maps.google.com/maps?&hl=${props.language}&q=${encodedAddress}&t=${props.mapType}&z=${props.zoom}&ie=UTF8&iwloc=B&output=embed`
})


// useHead({
//     link: [{ rel: 'preconnect', href: mapSource.value}]
// })
</script>

<style lang='sass' scoped>
.google-map 
  width: 100%
  height: 400px
  border: 0

</style>
