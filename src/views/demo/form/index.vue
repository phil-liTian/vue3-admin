<!--
 * @Date: 2024-05-27 14:29:41
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="表单基础示例">
    <PCollapseContainer title='基础示例'>
      <PBasicForm 
        :schemas="schemas"
        :labelWidth="200"
        @submit="handleSubmit"
        @reset="handleReset">
      </PBasicForm>
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { computed, ref, unref } from 'vue';
  import { Select } from 'ant-design-vue'
  import { cloneDeep } from 'lodash-es'
  import { useMessage } from '@h/web/useMessage'
  import { schemas } from './dataSource'

  const { createMessage } = useMessage()
  const options = ref([])
  const valueSelectA = ref<string[]>([])
  const valueSelectB = ref<string[]>([])
  for (let i = 0; i < 10; i++) { options.value.push({ label: `选项${i}`, value: i }) };
  const optionsA = computed(() => {
    return cloneDeep(unref(options)).map(op => {
      op.disabled = valueSelectB.value.indexOf(op.value as string) !== -1;
      return op
    })
  })

  // 重置
  const handleReset = () => {
    console.log('handleReset');
  }

  // 提交
  const handleSubmit = (values: any) => {
    console.log('handleSubmit', values);
    createMessage.success('click search, values: ' + JSON.stringify(values) )
  }
</script>
  
<style lang='less' scoped>
  
</style>