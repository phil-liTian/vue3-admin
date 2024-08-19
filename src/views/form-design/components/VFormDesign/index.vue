<template>
  <Layout :style="{ height: '100%' }">
    <!-- 控件 -->
    <LayoutSider
      :class="`${prefixCls}-sider`">
      
    </LayoutSider>
    
    <!-- 设计样式 -->
    <LayoutContent>
      
    </LayoutContent>

    <!-- 控件样式自定义 -->
    <LayoutSider
      :class="`${prefixCls}-sider`">
      
    </LayoutSider>
  </Layout>
</template>
  
<script lang='ts' setup>
  import { Layout, LayoutSider, LayoutContent } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  const { prefixCls } = useDesign('form-design')
</script>
  
<style lang='less'>
  @prefix-cls: ~'@{namespace}-form-design';

  

  [data-theme='dark'] {
    .@{prefix-cls}-sider {
      background-color: #1f1f1f;
    }
  }

  [data-theme='light'] {
    .@{prefix-cls}-sider {
      background-color: #fff;
    }
  }
</style>