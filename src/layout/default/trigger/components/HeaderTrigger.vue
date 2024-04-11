<!--
 * @Date: 2024-04-02 16:51:25
 * @LastEditors: phil_litian
-->
<template>
  <span :class="[ prefixCls ]" @click="toggleCollpased">
    <MenuUnfoldOutlined v-if="getCollapsed" />
    <MenuFoldOutlined v-else />
  </span>
</template>
  
<script lang='ts' setup>
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
  import { useDesign } from '@h/web/useDesign'
  import { useMenuSetting } from '@h/setting/useMenuSetting'
  const { prefixCls } = useDesign('layout-header-trigger')

  const { getCollapsed, toggleCollpased } = useMenuSetting()
</script>
  
<style lang='less' scoped>
  
</style>