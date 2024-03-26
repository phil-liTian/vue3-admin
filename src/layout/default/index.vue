<!--
 * @Date: 2024-02-26 19:42:21
 * @LastEditors: phil_litian
-->
<template>
  <Layout :class="prefixCls">
    <LayoutHeader />

    <Layout :class="[`${prefixCls}-out`]">
      <!-- 左侧菜单部分 -->
      <LayoutSiderBar />

      <Layout :class="`${prefixCls}-main`">
        <LayoutMultipleHeader />
        <!-- 内容区域 -->
        <LayoutContent />
        <!-- 页脚 -->
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
</template>
  
<script lang='ts' setup>
  import { Layout } from 'ant-design-vue'
  import LayoutHeader from './header/index.vue'
  import LayoutMultipleHeader from './header/multipleHeader.vue'
  import LayoutSiderBar from './sides/index.vue'
  import LayoutContent from './content/index.vue'
  import LayoutFooter from './footer/index.vue'

  import { useDesign } from '@h/web/useDesign'
  const { prefixCls } = useDesign('layout')
  
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-layout';

  .@{prefix-cls} {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    background-color: @content-bg;
    &-out {
      width: 100%;
    }

    &-main {
      width: 100%;
      margin-left: 1px;
    }
  }
</style>