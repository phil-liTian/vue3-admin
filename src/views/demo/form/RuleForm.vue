<!--
 * @Date: 2024-08-13 22:24:34
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="表单校验">
    <div class="mb-4">
      <PButton @click="validateForm" class="mr-2">手动校验表单</PButton>
      <PButton @click="resetValidate" class="mr-2">清空校验表单</PButton>
      <PButton @click="getFormValues" class="mr-2">获取表单值</PButton>
      <PButton @click="setFormValues" class="mr-2">设置表单值</PButton>
      <PButton @click="resetFields" class="mr-2">重置</PButton>
    </div>
    <PCollapseContainer title="表单校验">
      <PBasicForm @register='register' @submit="handleSubmit" />
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { useForm } from '@c/PBase/Form/index'
  import { useMessage } from '@h/web/useMessage'
  import { ruleSchemas } from './dataSource'
  
  const { createMessage } = useMessage()
  const [ register, { 
    validateFields, 
    clearValidate, 
    getFieldsValue,
    setFieldsValue,
    resetFields } ] = useForm({
    schemas: ruleSchemas,
    labelWidth: 120
  })

  async function validateForm() {
    try {
      const res = await validateFields()
      console.log('passing', res);
    } catch(error) {
      console.log('not passing', error);
    }
  }

  const resetValidate = () => {
    clearValidate()
  }

  const getFormValues = () => {
    const value = getFieldsValue()
    createMessage.success(`form values: ${JSON.stringify(value)}`)
  }

  const setFormValues = ()  => {
    setFieldsValue({
      field1: '123',
      field2: '456',
      id: 'phil'
    })
  }

  const handleSubmit = (values: any) => {
    console.log('values', values)
  }
</script>
  
<style lang='less' scoped>
  
</style>