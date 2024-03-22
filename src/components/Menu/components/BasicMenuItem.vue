<!--
 * @Date: 2024-03-03 22:15:24
 * @LastEditors: phil_litian
-->
<template>
  <MenuItem :key="item.path">
    <MenuItemContent :item="item"></MenuItemContent>
  </MenuItem>
</template>
  
<script lang='ts' setup>
  import { Menu } from 'ant-design-vue'
  import { itemProps } from '../props'
  import MenuItemContent from './MenuItemContent.vue';
  const MenuItem = Menu.Item

  
  defineProps(itemProps)
</script>
  
<style lang='less' scoped>
  
</style>