<!--
 * @Date: 2024-08-13 20:58:47
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title='可折叠表单'>
    <PCollapseContainer title='基础折叠'>
      <PBasicForm @register='register' />
    </PCollapseContainer>

    <PCollapseContainer title='超过三行自动收起,折叠时保留两行' class="mt-4">
      <PBasicForm @register="register1" />
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { FormSchema, useForm } from '@c/PBase/Form/index'
  import { refSchemas } from './dataSource'

  const [ register ] = useForm({
    schemas: refSchemas,
    labelWidth: 120,
    showAdvancedButton: true,
    actionColOptions: { span: 24 }
  })
  const otherSchemas = []
  for(let i = 0; i < 10; i++) {
    otherSchemas.push({
      field: `field${i + 10}`,
      component: 'Input',
      label: `字段${i + 10}`,
      colProps: {
        span: 8
      }
    })
  }

  const [ register1 ] = useForm({
    schemas: [
      ...((refSchemas || []) as FormSchema[]),
      ...otherSchemas
    ],
    labelWidth: 120,
    alwaysShowLines: 2,
    showAdvancedButton: true,
    actionColOptions: { span: 24 }
  })
</script>
  
<style lang='less' scoped>
  
</style>