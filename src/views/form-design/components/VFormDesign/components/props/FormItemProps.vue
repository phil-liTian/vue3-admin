<!-- 
 * @description: 表单项属性
-->
<template>
  <div>
    <Empty description="未选择控件" v-if='!formConfig.currentItem?.key' />

    <!-- 控件 控制比如label、对其方式等等 -->
    <Form>
      <!-- <FormItem></FormItem> -->
    </Form>
  </div>
</template>
  
<script lang='ts' setup>
  import { Empty, Form, FormItem } from 'ant-design-vue'
  import { useFormDesignState } from '../../../../hooks/useFormDesignState'
  const { formConfig } = useFormDesignState()
</script>
  
<style lang='less' scoped>
  
</style>