<!--
 * @Date: 2024-03-03 10:44:48
 * @LastEditors: phil_litian
-->
<template>
  <!-- <div></div> -->
  <Sider 
    :width="getMenuWidth"
    collapsible
    :collapsed="getCollapsed"
    :collapsed-width="getMiniWidthNumber"
    :class="getSideBarClass">
    <layout-menu />
  </Sider>
</template>
  
<script lang='ts' setup>
import { Layout } from 'ant-design-vue'
import { computed } from 'vue'
import { useDesign } from '@h/web/useDesign'
import { useMenuSetting } from '@h/setting/useMenuSetting'
import layoutMenu from '../menu/index.vue'

const Sider = Layout.Sider

const { getCollapsed, getMenuWidth, getMiniWidthNumber } = useMenuSetting()
const { prefixCls } = useDesign('layout-sider')
const getSideBarClass = computed(() => {
  return [
    prefixCls,
  ]
})

</script>
  
<style lang='less'>
  @prefix-cls: ~'@{namespace}-layout-sider';

  .@{prefix-cls} {
    height: 100vh;

    &.ant-layout-sider-dark {
      background-color: @sider-dark-bg-color;
    }
  }

</style>