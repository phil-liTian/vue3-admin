<!--
 * @Date: 2024-04-17 21:31:51
 * @LastEditors: phil_litian
-->
<template>
  <PBasicModal
    :helpMessage="['提示1', '提示2']"
    title="内外均可关闭的modal"
    @register="register">
    <!-- <template #title>测试自定义title</template> -->
    
    <template #insertFooter>
      <PButton type="primary">insert button</PButton>
    </template>

    <PButton type="primary" class="mr-2" @click="closeModal()">内部关闭弹窗</PButton>
    <PButton @click="setModalProps({ title: '内部修改的title---setModalProps' })" >从内部修改title</PButton>
  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { useModal } from '@c/PBase/Modal/index'
  const [ register, { closeModal, setModalProps } ] = useModal()
</script>
  
<style lang='less' scoped>
  
</style>