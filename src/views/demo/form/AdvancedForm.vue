<!--
 * @Date: 2024-08-13 20:58:47
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title='可折叠表单'>
    <PCollapseContainer title='基础折叠'>
      <PBasicForm @register='register'></PBasicForm>
    </PCollapseContainer>

    <PCollapseContainer title='超过三行自动收起,折叠时保留两行' class="mt-4">
      <PBasicForm></PBasicForm>
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { useForm } from '@c/PBase/Form/index'
  import { refSchemas } from './dataSource'

  const [ register ] = useForm({
    schemas: refSchemas,
    labelWidth: 120,
    showAdvancedButton: true,
  })
</script>
  
<style lang='less' scoped>
  
</style>