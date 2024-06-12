<!--
 * @Date: 2024-05-27 14:29:41
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="表单基础示例">
    <PBasicForm :schemas="schemas">
      <template #selectA>
        <Select :options="optionsA" />
      </template>
    </PBasicForm>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { FormSchema } from '@/components/PBase/Form';
  import { Select } from 'ant-design-vue'
  import { cloneDeep } from 'lodash-es'
  import { computed, ref, unref } from 'vue';

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

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
      colProps: {
        span: 24
      }
    },
    {
      field: 'field1',
      component: 'Input',
      label: () => {
        return `字段1`
      }
    },
    {
      field: 'field2',
      component: 'Input',
      label: '带后缀',
      defaultValue: '111',
      suffix: '天'
    },
    {
      field: 'selectA',
      slot: 'selectA',
      label: '普通SelectA'
    }
  ]
</script>
  
<style lang='less' scoped>
  
</style>