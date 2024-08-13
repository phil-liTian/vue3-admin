<!--
 * @Date: 2024-08-13 22:24:34
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="表单校验">
    <div class="mb-4">
      <PButton>手动校验表单</PButton>
    </div>
    <PCollapseContainer title="表单校验">
      <PBasicForm @register='register' />
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { useForm } from '@c/PBase/Form/index'
  import { ruleSchemas } from './dataSource'
  
  const [ register ] = useForm({
    schemas: ruleSchemas
  })
</script>
  
<style lang='less' scoped>
  
</style>