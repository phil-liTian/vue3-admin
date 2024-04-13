<!--
 * @Date: 2024-04-12 16:22:51
 * @LastEditors: phil_litian
-->
<template>
  <PBasicModal @register="register">
    
  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { useModal } from '@c/PBase/Modal/src/hooks/useModal'

  const { register } = useModal()
  
</script>
  
<style lang='less' scoped>
  
</style>