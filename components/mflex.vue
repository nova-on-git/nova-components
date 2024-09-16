<template>
    <div ref="reference" class="mflex">
        <slot />
    </div>
</template>

<style scoped lang="sass">
.mflex
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

</style>
