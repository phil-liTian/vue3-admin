<!-- 
 * @description: 表单项属性
-->
<template>
  <div class="properties-content">
    <div class="properties-body">
      <Empty description="未选择控件" v-if='!formConfig.currentItem?.key' />
      <!-- 控件 控制比如label、对其方式等等 -->
      <Form layout="vertical" v-else>
        <div v-for="item in baseFormItemProps" :key="item.name">
          <FormItem :label="item.label">
            <component
              v-if="item.component"
              :is="item.component"
              v-bind="item.componentProps"
              v-model:value="formConfig.currentItem[item.name]" />
          </FormItem>
        </div>

        <div v-for="item in advanceFormItemProps" :key="item.name">
          <FormItem :label="item.label">
            <component
              v-if="item.component"
              :is="item.component"
              v-bind="item.componentProps"
              v-model:value="formConfig.currentItem.itemProps[item.name]" />
          </FormItem>
        </div>

        <div v-for="item in advanceFormItemColProps" :key="item.name">
          <FormItem :label="item.label">
            <component
              v-if="item.component"
              :is="item.component"
              v-bind="item.componentProps"
              v-model:value="formConfig.currentItem.itemProps[item.name]['span']" />
          </FormItem>
        </div>

        <FormItem label="控制属性">
          <Col v-for="item in controlPropsList" :key="item.name">
            <Checkbox v-model:checked="formConfig.currentItem.itemProps[item.name]">{{ item.label }}</Checkbox>
          </Col>
        </FormItem>

        <FormItem label="是否必选">
          <Switch v-model:checked="formConfig.currentItem.itemProps['required']" />
          <Input 
            v-if="formConfig.currentItem.itemProps['required']" 
            placeholder="请输入必选提示"
            v-model:value="formConfig.currentItem.itemProps['message']" />
        </FormItem>

        <FormItem label="校验规则">
          <RuleProps />
        </FormItem>
      </Form>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, watch } from 'vue';
  import { Empty, Form, FormItem, Col, Checkbox, Switch, Input, RadioGroup, Slider } from 'ant-design-vue'
  import { useFormDesignState } from '../../../../hooks/useFormDesignState'
  import { 
    baseFormItemControlAttrs,
    baseFormItemProps, 
    advanceFormItemProps, 
    advanceFormItemColProps } from '../../config/formItemPropsConfig'
  import { isArray } from '@/utils/is';
  import RuleProps from './RuleProps.vue';
  const { formConfig } = useFormDesignState()

  watch(() => formConfig.value, () => {
    if ( formConfig.value.currentItem ) {
      const { itemProps } = formConfig.value.currentItem
      formConfig.value.currentItem.itemProps = itemProps || {}
      formConfig.value.currentItem.itemProps.labelCol = itemProps.labelCol || {}
      formConfig.value.currentItem.itemProps.wrapperCol = itemProps.wrapperCol || {} 
    }
  }, { immediate: true, deep: true })

  const showProps = (excludes: String[] | undefined) => {
    const { component } = formConfig.value.currentItem
    if ( !excludes ) return true
    return isArray(excludes) ? !excludes.includes(component) : true
  }

  const controlPropsList = computed(() => {
    return baseFormItemControlAttrs.filter(item => showProps(item.excludes))
  })
</script>
  
<style lang='less' scoped>
  
</style>