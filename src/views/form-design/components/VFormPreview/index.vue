<template>
  <PBasicModal
    :width="800"
    @close='handleClose'
    title="预览(支持布局)"
    :open="visible">
    
    <VFormCreate>

    </VFormCreate>

  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import VFormCreate from '../VFormCreate/index.vue'
  const visible = ref(false)

  const showModal = () => {
    visible.value = true
  }

  const handleClose = ()  => {
    visible.value = false
  }


  defineExpose({ showModal })
</script>
  
<style lang='less' scoped>
  
</style>