<template>
  <div ref="modal" class="modal-background" @click="toggleModal">
    
    <div class="modal-position">
      <div @click.stop>
        <slot />
      </div>
    </div>

  </div>
</template>

<script setup>
const modal = ref(null);

const close = () => {
    if (modal.value) {
        modal.value.style.display = 'none';
    }
}
const open = () => {
    if (!modal.value) {
        modal.value.style.display = 'block';
    }
}

defineExpose({
  close,
  open
})

const toggleModal = () => {
  console.log('here');
  if (modal.value) {
    modal.value.style.display = modal.value.style.display === 'block' ? 'none' : 'block';
  }
};



</script>

<style lang='sass' scoped>
.modal-background
    position: fixed
    top: 0
    left: 0
    height: 100%
    width: 100%
    z-index: 1000
    background: rgba(0, 0, 0, 0.3)
    backdrop-filter: blur(5px)
    display: none

    .modal-position
        display: flex
        align-items: center
        justify-content: center
        height: 100%
        width: 100%
</style>
