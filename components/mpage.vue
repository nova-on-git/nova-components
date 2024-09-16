<template>
    <div class="mpage">
        <slot />
    </div>
</template>

<style lang='sass' scoped>
.mpage
    max-width: 1600px
    width: 100%
    margin-inline: auto
    padding-inline: clamp(10px, 10px + 3vw, 50px)

</style>