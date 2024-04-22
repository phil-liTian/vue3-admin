<!--
 * @Date: 2024-04-19 10:46:36
 * @LastEditors: phil_litian
-->
<template>
  <PBasicModal @register="register">
    modalRef{{ modalRef.content }} {{ modalRef.info }}
  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import { useModalInner } from '@c/PBase/Modal/index'
  const modalRef = ref<{ content?: string, info?: string }>({})
  const [ register ] = useModalInner(data => {
    if ( data ) {
      modalRef.value = data
    }
  })
</script>
  
<style lang='less' scoped>
  
</style>