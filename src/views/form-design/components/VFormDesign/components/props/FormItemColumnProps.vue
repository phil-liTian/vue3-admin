<!-- 
  @Descroption: 珊格属性
-->
<template>
  <div class='properties-content'>
    <div class="properties-body" v-if="formConfig.currentItem">
      <Empty description="未选择控件" v-if="!formConfig.currentItem.key" />
      <Form v-else layout="vertical">
        <div v-for='item in baseItemColumnProps' :key='item.name'>
          <FormItem :label='item.label'>
            <component
              v-if="item.component && formConfig.currentItem.colProps"
              v-bind='item.componentProps'
              :is="item.component"
              v-model:value="formConfig.currentItem.colProps[item.name]">
            </component>
          </FormItem>
        </div>
      </Form>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
  import { Form, FormItem, Slider, Empty } from 'ant-design-vue'
  import { baseItemColumnProps } from '../../config/formItemPropsConfig';
  import { useFormDesignState } from '../../../../hooks/useFormDesignState'
  const { formConfig } = useFormDesignState()
</script>
  
<style lang='less' scoped>
  
</style>