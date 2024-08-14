<!--
 * @Date: 2024-08-13 19:17:13
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="标签页+多级field表单" v-loading="loading">
    <div class="mb-5">
      <PButton class="mr-2" @click="handleResetValues">重置表单</PButton>
      <PButton class="mr-2" @click="handleSetValues">设置默认值</PButton>
      <PButton class="mr-2" type="primary" @click="handleSubmit">提交表单</PButton>
    </div>

    <PCollapseContainer title="标签页 + 多级field表单">
      <Tabs v-model:activeKey="activeKey">
        <TabPane forceRender v-for="item in tabsFormSchema" :tab="item.tab" :key="item.key" :name="item.key">
          <PBasicForm @register="item.Form[0]" />
        </TabPane>
      </Tabs>
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { ref, unref } from 'vue'
  import { Tabs } from 'ant-design-vue'
  import { useMessage } from '@h/web/useMessage'
  import { FormSchema, useForm, FormProps } from '@/components/PBase/Form';
  import { schemas } from './dataSource';
  import { deepMerge } from '@/utils';

  const TabPane = Tabs.TabPane
  const { createMessage } = useMessage()
  type TabsFormType = {
    key: string,
    tab: string,
    Form: any
  }

  const baseFormConfig: Partial<FormProps> = {
    showActionButtonGroup: false,
    labelWidth: 120
  }
  const loading = ref(false)
  const activeKey = ref('tabs1')
  let mockDefaultValue: Recordable = {}
  const tabsFormSchema: TabsFormType[] = []

  for (let i = 1; i <= 5; i++) {
    const tabsKey = `tabs${i}`
    const schemas: FormSchema[] = []
    const row: Recordable = {}
    
    for (let j = 1; j <= 8; j++) {
      schemas.push({
        field: `field${i}${j}`,
        label: `field${i}${j}`,
        component: 'Input',
        colProps: { span: 24 }
      })
      row[`field${i}${j}`] = `field${i}${j} field=value:`
    }

    mockDefaultValue[tabsKey] = row
    
    tabsFormSchema.push({
      key: tabsKey,
      tab: `tabs${i}`,
      Form: useForm({ schemas, ...baseFormConfig })
    })
  }

  const handleSetValues = () => {
    for (const item of tabsFormSchema) {
      const { setFieldsValue } = item.Form[1]
      setFieldsValue(mockDefaultValue[item.key])
    }
  }

  const handleResetValues = () => {
    for (const item of tabsFormSchema) {
      const { resetFields } = item.Form[1]
      resetFields()
    }
  }

  const handleSubmit = () => {
    loading.value = true
    let lastKey = ''
    try {
      let values: Recordable = {}
      for (const item of tabsFormSchema) {
        lastKey = item.key
        const { getFieldsValue } = item.Form[1]
        values = deepMerge(values, getFieldsValue(), 'union')
      }

      createMessage.success(`submit values: ${JSON.stringify(values)}`)
    } catch (err) {
      // 切换到有异常的tab
      activeKey.value = lastKey
      console.log('error', err);
    } finally {
      loading.value = false
    }
  }

</script>
  
<style lang='less' scoped>
  
</style>