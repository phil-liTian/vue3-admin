<!--
 * @Date: 2024-03-03 10:13:26
 * @LastEditors: phil_litian
-->
<template>
  <Header :class="getHeaderClass">
    <div :class="`${prefixCls}-left`">
      <!-- <AppLogo /> -->
      <LayoutTrigger :sider="false" />
      <LayoutBreadCrumb v-if="getShowBreadcrumb" />
    </div>
    <!-- <div :class="`${prefixCls}-menu`">111</div> -->
    <div :class="`${prefixCls}-action`">
      <AppSearch :class="`${prefixCls}-action__item`" />
      <FullScreen :class="`${prefixCls}-action__item`" />
      <AppLocalePicker :class="`${prefixCls}-action__item`" />
      <Notify :class="`${prefixCls}-action__item`"/>
      <UserDropdown />
      <SettingDrawer :class="`${prefixCls}-action__item`" />
    </div>
  </Header>
</template>
  
<script lang='ts' setup>
import { computed } from 'vue'
import { Layout } from 'ant-design-vue'
import { useDesign } from '@h/web/useDesign'
import { useRootSetting } from '@h/setting/useRootSetting'
import { AppLocalePicker, AppLogo, AppSearch } from '@c/Application'
import { LayoutBreadCrumb } from './components/index'
import FullScreen from './components/FullScreen.vue'
import Notify from './components/Notify/index.vue'
import LayoutTrigger from '@/layout/default/trigger/index.vue'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'
import { UserDropdown } from './components/index'
const SettingDrawer = createAsyncComponent(()=>import('../setting/index.vue'))
const Header = Layout.Header

const { prefixCls } = useDesign('layout-header')
const { getShowBreadcrumb } = useRootSetting()
const getHeaderClass = computed(() => {
  return [
    prefixCls
  ]
})
</script>
  
<style lang='less'>
  @import './index.less';
</style>