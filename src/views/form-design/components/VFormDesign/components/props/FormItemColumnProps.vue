<!-- 
  @Descroption: 珊格属性
-->
<template>
  <div class='properties-content'>
    <div class="properties-body">
      <Form>
        <div v-for='item in baseItemColumnProps' :key='item.name'>
          <FormItem :label='item.label'>
            <component 
              v-bind='item.componentProps'
              :is="item.component">
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


</script>
  
<style lang='less' scoped>
  
</style>