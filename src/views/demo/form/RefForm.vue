<template>
  <PageWrapper title="RefForm">
    <div class="mb-4">
      <PButton class="mr-2" @click="setProps({ labelWidth: 120 })">更改labelWidth</PButton>
      <PButton class="mr-2" @click="setProps({ labelWidth: 100 })">还原labelWidth</PButton>
      <PButton class="mr-2" @click="setProps({ size: 'large' })">更改size</PButton>
      <PButton class="mr-2" @click="setProps({ size: 'default' })">还原size</PButton>
      <PButton class="mr-2" @click="setProps({ disabled: true })">禁用表单</PButton>
      <PButton class="mr-2" @click="setProps({ disabled: false })">解除禁用</PButton>
      <PButton class="mr-2" @click="setProps({ readonly: true })">只读表单</PButton>
      <PButton class="mr-2" @click="setProps({ readonly: false })">解除只读</PButton>
      <PButton class="mr-2" @click="setProps({ compact: true })">紧凑表单</PButton>
      <PButton class="mr-2" @click="setProps({ compact: false })">还原正常间距</PButton>
      <PButton class="mr-2" @click="setProps({ actionColOptions: { span: 8 } })">操作按钮位置</PButton>
    </div>

    <div class='mb-4'>
      <PButton class="mr-2" @click="setProps({ showActionButtonGroup: false })">隐藏操作按钮</PButton>
      <PButton class="mr-2" @click="setProps({ showActionButtonGroup: true })">显示操作按钮</PButton>
      <PButton class="mr-2" @click="setProps({ showResetButton: false })">隐藏重置按钮</PButton>
      <PButton class="mr-2" @click="setProps({ showResetButton: true })">显示重置按钮</PButton>
      <PButton class="mr-2" @click="setProps({ showSubmitButton: false })">隐藏查询按钮</PButton>
      <PButton class="mr-2" @click="setProps({ showSubmitButton: true })">显示查询按钮</PButton>
      <PButton class="mr-2" @click="setProps({ submitButtonOptions: { loading: true } })">修改查询按钮</PButton>
      <PButton class="mr-2" @click="setProps({ resetButtonOptions: { text: 'new reset', disabled: true } })">修改重置按钮</PButton>
    </div>
    
    <PCollapseContainer title="使用ref调用表单内部函数">
      <PBasicForm 
        :schemas="refSchemas"
        :labelWidth="100"
        :actionColOptions='{ span: 24 }'
        @submit='handleSubmit'
        ref="formElRef" />
    </PCollapseContainer>
    
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { FormProps } from '@c/PBase/Form';
  import { nextTick, ref, unref } from 'vue';
  import { refSchemas } from './dataSource'
  import { useMessage } from '@h/web/useMessage'
  const { createMessage } = useMessage()
  const formElRef = ref(null)

  const handleSubmit = (values: any) => {
    createMessage.success(`submit values: ${JSON.stringify(values)}`)
  }

  const setProps = async (props: FormProps) => {
    const formEl = unref(formElRef)
    if ( !formEl ) return
    await nextTick();
    formEl.setProps(props)
  }
</script>
  
<style lang='less' scoped>
  
</style>