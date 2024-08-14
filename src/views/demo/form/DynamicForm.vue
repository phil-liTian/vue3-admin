<template>
  <PageWrapper title="动态表单">
    <div class="mb-4">
      <PButton>更改字段3label</PButton>
    </div>

    <PCollapseContainer title="动态表单,动态根据表单内其他值变化">
      <PBasicForm @register="register"></PBasicForm>
    </PCollapseContainer>

    <PCollapseContainer title="componentProps动态改变">
      <PBasicForm @register="register1"></PBasicForm>
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
 import { useForm } from '@c/PBase/Form/index' 
 import { dynamicSchemas, dynamicSchemas1 } from './dataSource'
 const [ register ] = useForm({
  schemas: dynamicSchemas,
  labelWidth: 120,
  actionColOptions: { span: 24 }
 })

 const [ register1 ] = useForm({
  schemas: dynamicSchemas1,
  labelWidth: 120,
  actionColOptions: { span: 24 }
 })
</script>
  
<style lang='less' scoped>
  
</style>