<template>
  <PBasicModal
    title='JSON数据'
    @close='handleClose'
    :open='visible'>
    
  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue';

  const visible = ref(false)

  const showModal = () => {
    visible.value = true
  }

  const handleClose = () => {
    visible.value = false
  }

  defineExpose({ showModal })
</script>
  
<style lang='less' scoped>
  
</style>