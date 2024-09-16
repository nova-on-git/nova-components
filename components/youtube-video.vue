<template>
    <iframe
      class="youtube-video"
      :src="iframeSrc"
      frameborder="0"
      allowfullscreen
    />
</template>

<script setup lang="ts">

const props = defineProps({
    videoId: {
        type: String,
        required: false
    },
    autoplay: {
        type: Boolean,
        default: false
    },
    controls: {
        type: Boolean,
        default: true
    },
});

const iframeSrc = computed(() => {
    const autoplayParam = props.autoplay ? 'autoplay=1' : 'autoplay=0';
    const controlsParam = props.controls ? 'controls=1' : 'controls=0';
    return `https://www.youtube.com/embed/${props.videoId}?${autoplayParam}&${controlsParam}`;
})
</script>

<style lang="sass" scoped>
.youtube-video
    border: 0
</style>
