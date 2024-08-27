<template>
  <div>
    <Tabs v-model:activeKey='formConfig.activeKey'>
      <TabPane :key="1" tab='表单'>
        <FormProps />
      </TabPane>

      <TabPane :key="2" tab='控件'>
        <FormItemProps />
      </TabPane>

      <TabPane :key="3" tab='珊格'>
        <FormItemColumnProps />
      </TabPane>

      <TabPane :key='4' tab='组件'>
        <ComponentProps />
      </TabPane>
    </Tabs>
  </div>
</template>
  
<script lang='ts' setup>
  import { Tabs, TabPane } from 'ant-design-vue'
  import FormProps from '../components/props/FormProps.vue';
  import FormItemProps from '../components/props/FormItemProps.vue';
  import FormItemColumnProps from '../components/props/FormItemColumnProps.vue';
  import ComponentProps from '../components/props/ComponentProps.vue';
  import { useFormDesignState } from '../../../hooks/useFormDesignState'
  const { formConfig } = useFormDesignState()
</script>
  
<style lang='less' scoped>
  :deep(.ant-tabs) {
    form {
      width: 100%;
      height: 80vh;
      overflow: hidden auto;

      .ant-form-item {
        margin-left: 10px;
        margin-right: 20px;
        margin-bottom: 0;
      }
    }
  }
</style>