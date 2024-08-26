<!-- 
  右侧属性面板: 表单属性面板
-->
<template>
  <div class='properties-content'>
    <Form layout='vertical'>
      <FormItem label='表单布局'>
        <RadioGroup v-model:value="formConfig.layout" button-style="solid">
          <RadioButton value='horizontal'>水平</RadioButton>
          <RadioButton value='vertical'>垂直</RadioButton>
          <RadioButton value='inline'>行内</RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem label='标签布局'>
        <RadioGroup v-model:value="formConfig.labelLayout" button-style="solid">
          <RadioButton value='flex'>固定</RadioButton>
          <RadioButton value='Grid'>栅格</RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem label='标签宽度(px)'>
        <InputNumber v-model:value='formConfig.labelWidth' :style='{ width: "100%" }' :min=0 />
      </FormItem>

      <FormItem label='表单属性'>
        <Col>
          <Checkbox v-model:checked='formConfig.colon'>label后面显示冒号</Checkbox>
        </Col>
        <Col>
          <Checkbox v-model:checked='formConfig.disabled'>禁用</Checkbox>
        </Col>
        <Col>
          <Checkbox v-model:checked='formConfig.hideRequiredMark'>隐藏必选标记</Checkbox>
        </Col>
      </FormItem>
    </Form>
  </div>
</template>
  
<script lang='ts' setup>
  import { Form, FormItem, RadioGroup, RadioButton, InputNumber, Col, Checkbox } from 'ant-design-vue'
  import { useFormDesignState } from '../../../../hooks/useFormDesignState'
  const { formConfig } = useFormDesignState()
</script>
  
<style lang='less' scoped>
  
</style>