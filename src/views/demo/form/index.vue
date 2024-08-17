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
        :actionColOptions="{ span: 24 }"
        @submit="handleSubmit"
        @reset="handleReset">
        <template #selectA="{ model, field }">
          <Select 
            mode='multiple'
            v-model:value='model[field]'
            @change='valueSelectA = model[field]'
            :options='optionsA' />
        </template>

        <template #selectB="{ model, field }">
          <Select 
            mode='multiple'
            v-model:value='model[field]'
            @change='valueSelectB = model[field]'
            :options='optionsB' />
        </template>

        <template #localSearch="{ model, field }">
          <ApiSelect 
            v-model:value='model[field]'
            :api='getOptionsApi'
            showSearch />
        </template>

      </PBasicForm>
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { computed, ref, unref } from 'vue';
  import { Select } from 'ant-design-vue'
  import ApiSelect from '@c/PBase/Form/src/components/ApiSelect.vue'
  import { cloneDeep } from 'lodash-es'
  import { useMessage } from '@h/web/useMessage'
  import { schemas } from './dataSource'
  import { getOptionsApi } from '@a/demo/select'

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

  const optionsB = computed(() => {
    return cloneDeep(unref(options)).map(op => {
      op.disabled = valueSelectA.value.indexOf(op.value as string) !== -1;
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