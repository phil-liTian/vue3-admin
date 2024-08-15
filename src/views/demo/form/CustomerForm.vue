<template>
  <PageWrapper title="自定义组件">
    <PCollapseContainer title="自定义表单">
      <PBasicForm @register="register" @submit="handleSubmit">
        <template #f3="{ model, field, disabled }">
          <Input v-model:value="model[field]" :disabled="disabled" placeholder="自定义slot"></Input>
        </template>

        <template #field5_colSlot="{ model, field, disabled }">
          <FormItem :name="field" label="自定义colSlot">
            <Input v-model:value="model[field]" :disabled="disabled"></Input>
          </FormItem>
        </template>
      </PBasicForm>
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { Input, FormItem } from 'ant-design-vue'
  import { useForm } from '@c/PBase/Form/index'
  import { useMessage } from '@h/web/useMessage'
  import { customerSchemas } from './dataSource'
  const { createMessage } = useMessage()
  const [ register ] = useForm({
    schemas: customerSchemas,
    labelWidth: 120,
    actionColOptions: { span: 24 }
  })

  const handleSubmit = (values) => {
    createMessage.success(`submit values: ${JSON.stringify(values)}`)
  }
</script>
  
<style lang='less' scoped>
  
</style>