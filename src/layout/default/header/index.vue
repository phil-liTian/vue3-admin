<!--
 * @Date: 2024-03-03 10:13:26
 * @LastEditors: phil_litian
-->
<template>
  <Header :class="getHeaderClass">
    <div :class="`${prefixCls}-left`">
      <!-- <AppLogo /> -->
      <LayoutTrigger :sider="false" />
      
      <LayoutBreadCrumb />
    </div>
    <!-- <div :class="`${prefixCls}-menu`">111</div> -->
    <div :class="`${prefixCls}-action`">
      <AppSearch :class="`${prefixCls}-action__item`" />
      <FullScreen :class="`${prefixCls}-action__item`" />
      <AppLocalePicker :class="`${prefixCls}-action__item`" />
      <SettingDrawer :class="`${prefixCls}-action__item`" />
    </div>
  </Header>
</template>
  
<script lang='ts' setup>
import { computed } from 'vue'
import { Layout } from 'ant-design-vue'
import { useDesign } from '@h/web/useDesign'
import { AppLocalePicker, AppLogo, AppSearch } from '@c/Application'
import { LayoutBreadCrumb } from './components/index'
import FullScreen from './components/FullScreen.vue'
import LayoutTrigger from '@/layout/default/trigger/index.vue'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'
const SettingDrawer = createAsyncComponent(()=>import('../setting/index.vue'))
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