<!--
 * @Date: 2024-08-13 19:17:13
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="标签页+多级field表单">
    <div class="mb-5">
      <PButton class="mr-2">重置表单</PButton>
      <PButton class="mr-2" @click="handleSetValues">设置默认值</PButton>
      <PButton class="mr-2">提交表单</PButton>
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
  import { FormSchema, useForm, FormProps } from '@/components/PBase/Form';
  import { schemas } from './dataSource';

  const TabPane = Tabs.TabPane
  type TabsFormType = {
    key: string,
    tab: string,
    Form: any
  }

  const baseFormConfig: Partial<FormProps> = {
    showActionButtonGroup: false,
    labelWidth: 120
  }
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
    console.log('mock', mockDefaultValue[unref(activeKey)]);
    for (const item of tabsFormSchema) {
      const { setFieldsValue } = item.Form[1]
      setFieldsValue(mockDefaultValue[unref(activeKey)])
    }
  }

</script>
  
<style lang='less' scoped>
  
</style>