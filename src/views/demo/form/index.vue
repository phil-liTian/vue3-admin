<!--
 * @Date: 2024-05-27 14:29:41
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="表单基础示例">
    <PCollapseContainer title='基础示例'>
      <PBasicForm 
        :schemas="schemas"
        @submit="handleSubmit"
        @reset="handleReset">
        <!-- <template #selectA>
          <Select :options="optionsA" />
        </template> -->
      </PBasicForm>
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { computed, ref, unref } from 'vue';
  import { Select } from 'ant-design-vue'
  import { cloneDeep } from 'lodash-es'
  import { FormSchema } from '@/components/PBase/Form';
  import { useMessage } from '@h/web/useMessage'

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
      defaultValue: "123",
      label: () => {
        return `字段1`
      },
      colProps: {
        span: 8
      },
      componentProps: () => {
        return {
          placeholder: '自定义placeholder',
          onChange: (e: any) => {
            console.log('e--->', e);
          }
        }
      },

      renderComponentContent: () => {
        return {
          prefix: () => 'prefix',
          suffix: () => 'suffix'
        }
      }
    },
    {
      field: 'field2',
      component: 'Input',
      label: '带后缀',
      defaultValue: '111',
      suffix: '天',
      colProps: {
        span: 8
      }
    },
    {
      field: 'fieldSc',
      component: 'Upload',
      label: '上传',
      colProps: {
        span: 8
      }
    },
    {
      field: 'selectA',
      slot: 'selectA',
      label: '普通SelectA',
      colProps: {
        span: 8
      }
    }
  ]

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