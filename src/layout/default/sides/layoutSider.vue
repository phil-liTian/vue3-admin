<!--
 * @Date: 2024-03-03 10:44:48
 * @LastEditors: phil_litian
-->
<template>
  <!-- <div></div> -->
  <Sider 
    :width="210"
    :class="getSideBarClass">
    <layout-menu />
  </Sider>
</template>
  
<script lang='ts' setup>
import { Layout } from 'ant-design-vue'
import { computed } from 'vue'
import { useDesign } from '@h/web/useDesign'
import layoutMenu from '../menu/index.vue'
const Sider = Layout.Sider

const { prefixCls } = useDesign('layout-sider')
const getSideBarClass = computed(() => {
  return [
    prefixCls,
  ]
})

</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-layout-sider';

  .@{prefix-cls} {
    height: 100%;
  }

</style>