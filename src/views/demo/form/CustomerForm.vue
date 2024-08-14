<template>
  <PageWrapper title="自定义组件">
    <PCollapseContainer title="自定义表单">
      <PBasicForm @register="register" />
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { useForm } from '@c/PBase/Form/index'
  import { customerSchemas } from './dataSource'
  const [ register ] = useForm({
    schemas: customerSchemas,
    labelWidth: 120,
    actionColOptions: { span: 24 }
  })
</script>
  
<style lang='less' scoped>
  
</style>