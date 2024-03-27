<!--
 * @Date: 2024-03-03 10:13:26
 * @LastEditors: phil_litian
-->
<template>
  <Header :class="getHeaderClass">
    <div :class="`${prefixCls}-left`">
      <!-- <AppLogo /> -->
      <LayoutBreadCrumb />
    </div>
    <!-- <div :class="`${prefixCls}-menu`">111</div> -->
    <div :class="`${prefixCls}-action`">

      <AppLocalePicker />
    </div>
  </Header>
</template>
  
<script lang='ts' setup>
import { computed } from 'vue'
import { Layout } from 'ant-design-vue'
import { useDesign } from '@h/web/useDesign'
import { AppLocalePicker, AppLogo } from '@c/Application'
import { LayoutBreadCrumb } from './components/index'
const Header = Layout.Header

const { prefixCls } = useDesign('layout-header')
const getHeaderClass = computed(() => {
  return [
    prefixCls
  ]
})
</script>
  
<style lang='less' scoped>
  @import './index.less';
</style>